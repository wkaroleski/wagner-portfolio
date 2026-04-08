export interface Env {
    OPENROUTER_API_KEY: string;
    RATE_LIMITER: KVNamespace;
    ADMIN_SECRET_CODE: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const { request, env } = context;

        // 1. Identificar IP
        const ip = request.headers.get('cf-connecting-ip') || 'ip-desconhecido';

        // 2. Coletar payload (Agora o Front-End vai mandar o modelo escolhido e a categoria)
        const body = await request.json() as { prompt: string; modelTier?: 'free' | 'premium'; selectedModel?: string };
        const prompt = body.prompt || "";

        // Valores padrão caso o Front-End ainda não esteja enviando
        const modelTier = body.modelTier || 'free';
        const selectedModel = body.selectedModel || 'openrouter/free';

        // 3. CHEAT CODE
        if (env.ADMIN_SECRET_CODE && prompt.trim() === env.ADMIN_SECRET_CODE) {
            if (env.RATE_LIMITER) {
                await env.RATE_LIMITER.delete(`${ip}_free`);
                await env.RATE_LIMITER.delete(`${ip}_premium`);
            }
            return new Response(
                JSON.stringify({
                    choices: [{ message: { content: "✅ Autenticação aceita, Chefe! Suas cotas Free e Premium foram resetadas." } }]
                }),
                { status: 200, headers: { 'content-type': 'application/json' } }
            );
        }

        // 4. VALIDAÇÃO DE TAMANHO
        const isHTML = prompt.includes('<') && prompt.includes('>');
        const maxLength = isHTML ? 1500 : 240;

        if (prompt.length > maxLength) {
            const tipoMsg = isHTML ? "trechos de código HTML (máximo de 1.500 caracteres)" : "perguntas normais (máximo de 240 caracteres, tipo um tweet)";
            return new Response(
                JSON.stringify({
                    choices: [{ message: { content: `Ops! Sua mensagem é muito longa para ${tipoMsg}. Seu texto atual tem ${prompt.length} caracteres. Reduza um pouco para protegermos nossos tokens!` } }]
                }),
                { status: 200, headers: { 'content-type': 'application/json' } }
            );
        }

        // 5. RATE LIMITER DUPLO
        const kvKey = `${ip}_${modelTier}`;
        let requestCount = 0;

        if (env.RATE_LIMITER) {
            const requestCountStr = await env.RATE_LIMITER.get(kvKey);
            requestCount = requestCountStr ? parseInt(requestCountStr) : 0;
        }

        const limiteAtual = modelTier === 'premium' ? 5 : 10;

        if (requestCount >= limiteAtual) {
            return new Response(
                JSON.stringify({
                    choices: [{ message: { content: `Ops! Você atingiu o limite de ${limiteAtual} testes diários no plano ${modelTier.toUpperCase()}. Volte amanhã ou experimente a outra aba de modelos!` } }]
                }),
                { status: 200, headers: { 'content-type': 'application/json' } } // Status 200 pro React não quebrar
            );
        }

        // 6. O CÉREBRO (Com cálculo de idade exato)
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

        // 7. CHAMADA PARA A IA
        const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://wmk.dev.br",
                "X-Title": "Wag-Bot QA"
            },
            body: JSON.stringify({
                model: selectedModel, // Usa o modelo que veio do Front-End
                messages: [
                    { role: "system", content: contextoWagner },
                    { role: "user", content: prompt }
                ]
            })
        });

        // 8. O TRATAMENTO DE FALTA DE SALDO (402) - FinOps
        if (openRouterResponse.status === 402) {
            return new Response(
                JSON.stringify({
                    choices: [{ message: { content: "Ops! Estamos sem tokens pagos no momento. Por favor, selecione o plano gratuito no menu para continuar testando!" } }]
                }),
                { status: 200, headers: { 'content-type': 'application/json' } }
            );
        }

        // 9. COBRANÇA DA COTA (Só chega aqui se o OpenRouter não deu Erro 402)
        if (env.RATE_LIMITER) {
            await env.RATE_LIMITER.put(kvKey, (requestCount + 1).toString(), { expirationTtl: 86400 });
        }

        // 10. DEVOLVE A RESPOSTA PRO FRONT
        const responseText = await openRouterResponse.text();
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            return new Response(JSON.stringify({
                choices: [{ message: { content: `🤖 Erro crítico: A API não devolveu um JSON válido.` } }]
            }), { status: 200, headers: { 'content-type': 'application/json' } });
        }

        if (data.error) {
            return new Response(JSON.stringify({
                choices: [{ message: { content: `🤖 Erro da API: ${data.error.message || 'Falha na comunicação.'}` } }]
            }), { status: 200, headers: { 'content-type': 'application/json' } });
        }

        return new Response(JSON.stringify(data), {
            headers: { 'content-type': 'application/json' },
        });

    } catch (error: any) {
        return new Response(JSON.stringify({
            choices: [{ message: { content: `🤖 Falha Interna no Worker: ${error.message}` } }]
        }), { status: 200, headers: { 'content-type': 'application/json' } });
    }
};