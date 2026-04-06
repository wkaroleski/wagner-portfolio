export interface Env {
    AI: any;
    RATE_LIMITER: KVNamespace; // Nossa nova variável de banco de dados
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const { request, env } = context;

        // 1. Identificar o "criminoso" (ou recrutador) pelo IP
        const ip = request.headers.get('cf-connecting-ip') || 'ip-desconhecido';

        // 2. Verificar quantas requisições esse IP já fez
        const requestCountStr = await env.RATE_LIMITER.get(ip);
        let requestCount = requestCountStr ? parseInt(requestCountStr) : 0;

        // Limite de 10 perguntas por IP. 
        if (requestCount >= 10) {
            return new Response(
                JSON.stringify({
                    choices: [{ message: { content: "Ops! Você atingiu o limite de testes diários para esta demonstração. Volte amanhã ou me mande um e-mail em contato@wmk.dev.br!" } }]
                }),
                { status: 429, headers: { 'content-type': 'application/json' } }
            );
        }

        // 3. Incrementar o uso e salvar no banco (expira automaticamente em 24h = 86400 segundos)
        await env.RATE_LIMITER.put(ip, (requestCount + 1).toString(), { expirationTtl: 86400 });

        const body = await request.json() as { prompt: string };
        const prompt = body.prompt;

        const contextoWagner = `Você é o assistente virtual técnico do portfólio de Wagner Karoleski.
Use estritamente as informações abaixo para responder. NÃO invente dados.

- Identidade: Wagner Karoleski, nascido em maio de 1989, casado e pai de uma menina, QA Engineer, Analista de Sistemas e estudante de DevOps, residente em São Leopoldo, RS.
- Regra de Contato: Se o usuário pedir para entrar em contato, indique EXCLUSIVAMENTE o email contato@wmk.dev.br ou a aba "Contato" do site. NUNCA invente números de telefone ou outros emails.
- Trabalho atual: Analista de Sistemas de Automação / QA Tester na SKA Automação de Engenharias (desde janeiro de 2024).
- Experiência em TI: Trabalhou como Software QA Engineer na Atlas Technologies (fev/2022 - set/2023), atuando em squads ágeis com BDD, TDD, testes de API (Postman/Insomnia), Cypress, Docker e bancos de dados (MySQL/SQL Server).
- Background: Antes da transição para TI, construiu uma sólida carreira (2007-2019) na indústria metalúrgica e de usinagem (como operador de máquinas e auxiliar de produção), o que lhe confere resiliência e forte capacidade de resolver problemas lógicos complexos.
- Formação: Certificado Profissional em Quality Engineering/QA Tester pela EBAC e atualmente cursando Tecnólogo em DevOps pela UNOPAR.
- Stack Atual e Especialidades: Automação E2E avançada com Playwright, CI/CD (GitHub Actions) e Testes de Performance em APIs via Postman (simulando cargas Fixed, Ramp Up, Spike e Peak para análise de Throughput e latência).
- Regra de Código: Se o usuário enviar um trecho de código HTML, atue como um QA Sênior e devolva um script de teste E2E em TypeScript usando Playwright com boas práticas.
- Regra de Postura: Responda sempre em Português do Brasil, de forma profissional, direta e amigável. Se perguntarem algo fora deste contexto, diga que não possui essa informação.`;

        // O novo motor "peso-leve" e inteligente
        const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
            messages: [
                { role: 'system', content: contextoWagner },
                { role: 'user', content: prompt },
            ],
        });

        return new Response(JSON.stringify(response), {
            headers: { 'content-type': 'application/json' },
        });

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};