export interface Env {
    OPENROUTER_API_KEY: string;
    RATE_LIMITER: KVNamespace;
    ADMIN_SECRET_CODE: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const { request, env } = context;

        // 1. Identificar IP e acessar o banco KV
        const ip = request.headers.get('cf-connecting-ip') || 'ip-desconhecido';
        const requestCountStr = await env.RATE_LIMITER.get(ip);
        let requestCount = requestCountStr ? parseInt(requestCountStr) : 0;

        // 2. Coletar a pergunta do usuário PRIMEIRO
        const body = await request.json() as { prompt: string };
        const prompt = body.prompt;

        // 3. O CHEAT CODE DO ADMIN (Antes do bloqueio!)
        if (env.ADMIN_SECRET_CODE && prompt.trim() === env.ADMIN_SECRET_CODE) {
            await env.RATE_LIMITER.delete(ip); // Limpa seu IP
            return new Response(
                JSON.stringify({
                    choices: [{ message: { content: "✅ Autenticação aceita, Chefe! Seu IP foi limpo do firewall e os testes estão liberados." } }]
                }),
                { status: 200, headers: { 'content-type': 'application/json' } }
            );
        }

        // 4. Rate Limit normal (Se não for o Chefe, barra se passar de 5)
        if (requestCount >= 5) {
            return new Response(
                JSON.stringify({
                    choices: [{ message: { content: "Ops! Você atingiu o limite de testes diários para esta demonstração. Volte amanhã ou me mande um e-mail em contato@wmk.dev.br!" } }]
                }),
                { status: 429, headers: { 'content-type': 'application/json' } }
            );
        }

        // 5. Incrementa o contador de uso
        await env.RATE_LIMITER.put(ip, (requestCount + 1).toString(), { expirationTtl: 86400 });

        // 6. O Cérebro
        const contextoWagner = `Você é o assistente virtual técnico do portfólio de Wagner Karoleski.
Use estritamente as informações abaixo para responder. NÃO invente dados.

- Identidade: Wagner Karoleski, nascido em maio de 1989, casado e pai de uma menina, QA Engineer, Analista de Sistemas e estudante de DevOps, residente em São Leopoldo, RS.
- Regra de Contato: Se o usuário pedir para entrar em contato, indique EXCLUSIVAMENTE o email contato@wmk.dev.br ou a aba "Contato" do site. NUNCA invente números de telefone ou outros emails.
- Trabalho atual: Analista de Sistemas de Automação / QA Tester na SKA Automação de Engenharias (desde janeiro de 2024).
- Experiência em TI: Trabalhou como Software QA Engineer na Atlas Technologies (fev/2022 - set/2023), atuando em squads ágeis com BDD, TDD, testes de API (Postman/Insomnia), Cypress, Docker e bancos de dados (MySQL/SQL Server).
- Background: Antes da transição para TI, construiu uma sólida carreira (2007-2019) na indústria metalúrgica e de usinagem, o que lhe confere resiliência e forte capacidade de resolver problemas lógicos.
- Formação: Certificado Profissional em Quality Engineering/QA Tester pela EBAC e atualmente cursando Tecnólogo em DevOps pela UNOPAR.
- Stack Atual e Especialidades: Automação E2E avançada com Playwright, CI/CD (GitHub Actions) e Testes de Performance em APIs via Postman (simulando cargas Fixed, Ramp Up, Spike e Peak para análise de Throughput e latência).
- Regra de Código: Se o usuário enviar um trecho de código HTML, atue como um QA Sênior e devolva um script de teste E2E em TypeScript usando Playwright com boas práticas.
- Regra de Postura: Responda sempre em Português do Brasil, de forma profissional, direta e amigável. Se perguntarem algo fora deste contexto, diga que não possui essa informação.`;

        // 7. Chamada OpenRouter
        const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://wmk.dev.br",
                "X-Title": "Wag-Bot QA"
            },
            body: JSON.stringify({
                model: "qwen/qwen-3.6-plus:free",
                messages: [
                    { role: "system", content: contextoWagner },
                    { role: "user", content: prompt }
                ]
            })
        });

        const data = await openRouterResponse.json();

        return new Response(JSON.stringify(data), {
            headers: { 'content-type': 'application/json' },
        });

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};