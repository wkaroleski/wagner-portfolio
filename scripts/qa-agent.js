const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
    try {
        // 1. Pega os tokens dos Secrets
        const githubToken = process.env.GITHUB_TOKEN;
        const openRouterKey = process.env.OPENROUTER_API_KEY;

        if (!openRouterKey) {
            throw new Error("OPENROUTER_API_KEY não foi encontrada nos secrets.");
        }

        const octokit = github.getOctokit(githubToken);
        const context = github.context;

        // Garante que está a correr dentro de um Pull Request
        if (!context.payload.pull_request) {
            core.info("Isto não é um Pull Request. A abortar.");
            return;
        }

        const prNumber = context.payload.pull_request.number;
        core.info(`A analisar o PR #${prNumber}...`);

        // 2. Captura o Diff do PR (o código que foi alterado)
        const { data: diff } = await octokit.rest.pulls.get({
            owner: context.repo.owner,
            repo: context.repo.repo,
            pull_number: prNumber,
            mediaType: { format: 'diff' }
        });

        // 3. Monta o Prompt para o DeepSeek
        const prompt = `
    Você é um Engenheiro de Automação de QA Sênior. 
    Analise o seguinte git diff (alterações de código) de um Pull Request.
    
    A sua tarefa:
    1. Gere cenários de teste manuais no formato BDD (Gherkin) baseados nestas alterações. Cubra o caminho feliz e casos extremos (edge cases).
    2. Abaixo dos cenários BDD, escreva um snippet de código em Playwright (TypeScript) que automatize o principal cenário identificado.
    
    Seja direto, técnico e não use jargões desnecessários.
    
    Aqui está o git diff:
    ${diff}
    `;

        // 4. Chama a API do OpenRouter (DeepSeek)
        core.info("A chamar a API do OpenRouter (DeepSeek)...");
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${openRouterKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://github.com/wagner/portfolio',
                'X-Title': 'GitHub Actions QA Agent'
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-v4-flash',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.3
            })
        });

        const aiResult = await response.json();

        if (!aiResult.choices || aiResult.choices.length === 0) {
            throw new Error("O OpenRouter não devolveu uma resposta válida.");
        }

        const aiComment = aiResult.choices[0].message.content;

        // 5. Publica o comentário no PR
        core.info("A publicar os cenários de teste no PR...");
        await octokit.rest.issues.createComment({
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: prNumber,
            body: `🤖 **Agente QA Autônomo (Powered by DeepSeek)**\n\nAnalisei as alterações neste Pull Request. Aqui estão as minhas sugestões para validação (Duplo Check):\n\n${aiComment}`
        });

        core.info("Concluído com sucesso!");

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();