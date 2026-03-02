import { test, expect } from '@playwright/test';

test.describe('Portfólio - Fluxos Principais', () => {

    test('deve carregar o portfólio e encontrar a seção de projetos', async ({ page }) => {
        await page.goto('/');

        await expect(page).toHaveTitle(/Wagner/i);

        const projetoYTM = page.getByText('Cosmic YTM');
        await expect(projetoYTM).toBeVisible();
    });

    test('deve alternar o tema (Dark/Light Mode)', async ({ page }) => {
        await page.goto('/');

        const html = page.locator('html');

        // Verifica se a página carregou inicialmente com a classe 'dark'
        const isDarkInicial = await html.evaluate((node) => node.classList.contains('dark'));

        // Agora o Playwright procura o testid e clica no primeiro que estiver visível
        const botaoTema = page.getByTestId('theme-toggle').first();
        await botaoTema.click();

        // Valida se a classe 'dark' foi adicionada ou removida da tag <html> após o clique
        if (isDarkInicial) {
            await expect(html).not.toHaveClass(/dark/);
        } else {
            await expect(html).toHaveClass(/dark/);
        }
    });

    test('deve preencher e enviar o formulário de contato com Mock', async ({ page }) => {
        await page.goto('/');

        // 1. O "Mock": Intercepta a requisição para não gastar o limite do Formspree
        await page.route('https://formspree.io/f/*', async route => {
            // O Playwright finge ser o servidor do Formspree e devolve um "Sucesso (200)" instantâneo
            await route.fulfill({ status: 200, json: { ok: true } });
        });

        // 2. Preenche os campos do formulário
        await page.fill('input[name="name"]', 'Robô do Playwright');
        await page.fill('input[name="email"]', 'qa-automacao@wmk.dev.br');
        await page.fill('textarea[name="message"]', 'Testando o formulário com interceptação de rede via CI/CD!');

        // 3. Submete o formulário
        await page.locator('button[type="submit"]').click();

        // 4. Verifica se o Toast do React disparou a mensagem de sucesso na tela
        const toastMessage = page.getByText(/Mensagem enviada com sucesso/i);
        await expect(toastMessage).toBeVisible();
    });

    test('deve conter os links corretos de redes sociais em várias seções', async ({ page }) => {
        await page.goto('/');

        // As URLs exatas que esperamos encontrar no site
        const urlGithub = 'https://github.com/wkaroleski';
        const urlLinkedin = 'https://linkedin.com/in/karoleski';

        // Localiza todos os links (tags <a>) que apontam para essas URLs
        const linksGithub = page.locator(`a[href="${urlGithub}"]`);
        const linksLinkedin = page.locator(`a[href="${urlLinkedin}"]`);

        // Validação estrita de UX/Segurança: 
        // Pega o primeiro link de cada e garante que eles abrem em uma nova aba (target="_blank")
        await expect(linksGithub.first()).toHaveAttribute('target', '_blank');
        await expect(linksLinkedin.first()).toHaveAttribute('target', '_blank');

        // Validação extra: O link de e-mail do contato deve existir
        const linkEmail = page.locator('a[href="mailto:contato@wmk.dev.br"]');
        expect(await linkEmail.count()).toBeGreaterThanOrEqual(1);
    });

});