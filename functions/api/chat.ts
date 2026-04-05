export interface Env {
    // Isso avisa o TypeScript que aquela variável no painel existe!
    AI: any;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const { request, env } = context;

        // Pega a mensagem que o usuário digitou no frontend
        const body = await request.json() as { prompt: string };
        const prompt = body.prompt;

        // Chama o motor da IA (Gemma) na placa de vídeo da Cloudflare
        const response = await env.AI.run('@cf/google/gemma-7b-it-lora', {
            messages: [
                {
                    role: 'system',
                    content: 'Você é o assistente virtual técnico do portfólio de Wagner Karoleski. Você é especialista em Engenharia de Qualidade (QA), automação com Playwright, e DevOps (CI/CD, Docker, Cloudflare). Se o usuário enviar um trecho de código HTML, atue como um QA Sênior e devolva um script de teste E2E em TypeScript usando Playwright. Para outras perguntas, seja direto, profissional e responda em Português do Brasil.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        });

        // Devolve a resposta da IA para a tela do usuário
        return new Response(JSON.stringify(response), {
            headers: { 'content-type': 'application/json' },
        });

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};