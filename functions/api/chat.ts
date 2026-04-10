export interface Env {
    OPENROUTER_API_KEY: string;
    RATE_LIMITER: KVNamespace;
    ADMIN_SECRET_CODE: string;
    INFLUX_PASSWORD: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const startTime = Date.now();
    const { request, env } = context;

    // Função auxiliar para enviar logs para o InfluxDB em Background
    const sendTelemetry = async (measurement: string, tags: Record<string, string>, fields: Record<string, any>) => {
        if (!env.INFLUX_PASSWORD) return;

        // Formata os dados para o padrão "Line Protocol" do InfluxDB
        const tagStr = Object.entries(tags).map(([k, v]) => `${k}=${v}`).join(',');
        const fieldStr = Object.entries(fields).map(([k, v]) => `${k}=${typeof v === 'string' ? `"${v}"` : v}`).join(',');
        const line = `${measurement},${tagStr} ${fieldStr}`;

        try {
            await fetch('https://logs.wmk.dev.br/write?db=portifolio', {
                method: 'POST',
                headers: { 'Authorization': 'Basic ' + btoa(`admin:${env.INFLUX_PASSWORD}`) },
                body: line
            });
        } catch (error) {
            console.error("Falha ao enviar telemetria", error);
        }
    };

    try {
        const ip = request.headers.get('cf-connecting-ip') || 'ip-desconhecido';
        const body = await request.json() as { prompt: string; modelTier?: 'free' | 'premium'; selectedModel?: string };
        const prompt = body.prompt || "";
        const modelTier = body.modelTier || 'free';
        const selectedModel = body.selectedModel || 'openrouter/free';

        // CHEAT CODE
        if (env.ADMIN_SECRET_CODE && prompt.trim() === env.ADMIN_SECRET_CODE) {
            if (env.RATE_LIMITER) {
                await env.RATE_LIMITER.delete(`${ip}_free`);
                await env.RATE_LIMITER.delete(`${ip}_premium`);
            }
            context.waitUntil(sendTelemetry('chat_events', { type: 'admin_cheat' }, { value: 1 }));
            return new Response(JSON.stringify({ choices: [{ message: { content: "✅ Cotas resetadas." } }] }), { status: 200, headers: { 'content-type': 'application/json' } });
        }

        // VALIDAÇÃO DE TAMANHO
        const isHTML = prompt.includes('<') && prompt.includes('>');
        const maxLength = isHTML ? 1500 : 240;

        if (prompt.length > maxLength) {
            context.waitUntil(sendTelemetry('chat_events', { type: 'payload_too_large', tier: modelTier }, { value: 1 }));
            return new Response(JSON.stringify({ choices: [{ message: { content: `Ops! Sua mensagem passou do limite.` } }] }), { status: 200, headers: { 'content-type': 'application/json' } });
        }

        // RATE LIMITER DUPLO
        const kvKey = `${ip}_${modelTier}`;
        let requestCount = 0;
        if (env.RATE_LIMITER) {
            const requestCountStr = await env.RATE_LIMITER.get(kvKey);
            requestCount = requestCountStr ? parseInt(requestCountStr) : 0;
        }

        const limiteAtual = modelTier === 'premium' ? 5 : 10;
        if (requestCount >= limiteAtual) {
            context.waitUntil(sendTelemetry('chat_events', { type: 'rate_limit_hit', tier: modelTier }, { value: 1 }));
            return new Response(JSON.stringify({ choices: [{ message: { content: `Ops! Você atingiu o limite de testes diários.` } }] }), { status: 200, headers: { 'content-type': 'application/json' } });
        }

        // PREPARAÇÃO DO CONTEXTO
        const hoje = new Date();
        const anoAtual = hoje.getFullYear();
        const mesAtual = hoje.getMonth();
        let idadeWagner = anoAtual - 1989;
        if (mesAtual < 4) { idadeWagner--; }

        const contextoWagner = `Você é o assistente virtual técnico do portfólio de Wagner Karoleski.
Data de hoje: ${hoje.toLocaleDateString('pt-BR')}.
Use estritamente as informações abaixo para responder. NÃO invente dados.
- Identidade: Wagner Karoleski, nascido em maio de 1989 (atualmente com exatos ${idadeWagner} anos), casado e pai de uma menina, QA Engineer, Analista de Sistemas e estudante de DevOps, residente em São Leopoldo, RS.
- Regra de Contato: Se o usuário pedir para entrar em contato, indique EXCLUSIVAMENTE o email contato@wmk.dev.br ou a aba "Contato" do site. NUNCA invente números de telefone ou outros emails.
- Trabalho atual: Analista de Sistemas de Automação / QA Tester na SKA Automação de Engenharias (desde janeiro de 2024).
- Experiência em TI: Trabalhou como Software QA Engineer na Atlas Technologies (fev/2022 - set/2023), atuando em squads ágeis com BDD, TDD, testes de API (Postman/Insomnia), Cypress, Docker e bancos de dados (MySQL/SQL Server).
- Background: Antes da transição para TI, construiu uma sólida carreira (2007-2019) na indústria metalúrgica e de usinagem.
- Formação: Certificado Profissional em Quality Engineering/QA Tester pela EBAC e atualmente cursando Tecnólogo em DevOps pela UNOPAR.
- Stack Atual e Especialidades: Automação E2E avançada com Playwright, CI/CD (GitHub Actions) e Testes de Performance em APIs via Postman.
- Regra de Código: Se o usuário enviar um trecho de código HTML, atue como um QA Sênior e devolva um script de teste E2E em TypeScript usando Playwright com boas práticas.
- Regra de Postura: Responda sempre em Português do Brasil, de forma profissional, direta e amigável.`;

        // CHAMADA PARA A IA
        const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://wmk.dev.br",
                "X-Title": "Wag-Bot QA"
            },
            body: JSON.stringify({
                model: selectedModel,
                messages: [{ role: "system", content: contextoWagner }, { role: "user", content: prompt }]
            })
        });

        if (openRouterResponse.status === 402) {
            context.waitUntil(sendTelemetry('chat_events', { type: 'payment_required_402', model: selectedModel }, { value: 1 }));
            return new Response(JSON.stringify({ choices: [{ message: { content: "Ops! Estamos sem tokens pagos. Selecione o plano gratuito!" } }] }), { status: 200, headers: { 'content-type': 'application/json' } });
        }

        if (env.RATE_LIMITER) {
            await env.RATE_LIMITER.put(kvKey, (requestCount + 1).toString(), { expirationTtl: 86400 });
        }

        const responseText = await openRouterResponse.text();
        let data;
        try { data = JSON.parse(responseText); }
        catch (e) { return new Response(JSON.stringify({ choices: [{ message: { content: `🤖 Erro crítico JSON.` } }] }), { status: 200, headers: { 'content-type': 'application/json' } }); }

        // Envia as métricas de performance e custo para o Grafana
        const durationMs = Date.now() - startTime;
        const totalTokens = data.usage?.total_tokens || 0;

        context.waitUntil(sendTelemetry('chat_usage',
            { model: selectedModel, tier: modelTier },
            { duration_ms: durationMs, tokens: totalTokens }
        ));

        return new Response(JSON.stringify(data), { headers: { 'content-type': 'application/json' } });

    } catch (error: any) {
        return new Response(JSON.stringify({ choices: [{ message: { content: `🤖 Falha Interna no Worker.` } }] }), { status: 200, headers: { 'content-type': 'application/json' } });
    }
};