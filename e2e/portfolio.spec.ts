import { test, expect } from '@playwright/test';

test('deve carregar o portfólio e encontrar a seção de projetos', async ({ page }) => {
    // Entra na página inicial
    await page.goto('/');

    // Verifica se o título da aba contém o seu nome (ajuste se no seu index.html estiver diferente)
    await expect(page).toHaveTitle(/Wagner/i);

    // Verifica se o seu projeto principal está renderizando na tela
    const projetoYTM = page.getByText('Cosmic YTM');
    await expect(projetoYTM).toBeVisible();
});