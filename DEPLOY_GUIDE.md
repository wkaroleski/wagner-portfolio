# Guia de Deploy no Cloudflare Pages

Este guia fornece instruções detalhadas para fazer o deploy do portfólio Wagner Karoleski no Cloudflare Pages e configurar o domínio personalizado `wmk.dev.br`.

## Pré-requisitos

Antes de começar, certifique-se de ter:

- Uma conta no [Cloudflare](https://dash.cloudflare.com/)
- Uma conta no [GitHub](https://github.com/)
- O domínio `wmk.dev.br` já registrado e apontando para Cloudflare
- Acesso ao repositório do projeto no GitHub

## Passo 1: Preparar o Repositório no GitHub

### 1.1 Criar um novo repositório

1. Acesse [GitHub](https://github.com/new)
2. Crie um novo repositório com o nome `wagner-portfolio`
3. Escolha a visibilidade como **Public** (recomendado para portfólio)
4. Não inicialize com README (já temos um)

### 1.2 Fazer push do código

Execute os comandos abaixo no diretório do projeto:

```bash
git init
git add .
git commit -m "Initial commit: Wagner Karoleski portfolio"
git branch -M main
git remote add origin https://github.com/SEU_USERNAME/wagner-portfolio.git
git push -u origin main
```

Substitua `SEU_USERNAME` pelo seu nome de usuário no GitHub.

## Passo 2: Conectar ao Cloudflare Pages

### 2.1 Acessar Cloudflare Pages

1. Faça login no [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Selecione sua conta
3. Navegue até **Pages** na barra lateral esquerda
4. Clique em **Create a project**

### 2.2 Conectar repositório GitHub

1. Clique em **Connect to Git**
2. Selecione **GitHub** como provedor
3. Autorize o Cloudflare a acessar seus repositórios
4. Selecione o repositório `wagner-portfolio`
5. Clique em **Begin setup**

### 2.3 Configurar build e deploy

Na tela de configuração do projeto:

| Campo | Valor |
|-------|-------|
| Project name | `wagner-portfolio` |
| Production branch | `main` |
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Build output directory | `dist` |

Deixe as variáveis de ambiente em branco por enquanto (não temos backend).

### 2.4 Deploy inicial

Clique em **Save and Deploy**. O Cloudflare iniciará o build e o deploy automático. Você pode acompanhar o progresso na página do projeto.

## Passo 3: Configurar Domínio Personalizado

### 3.1 Adicionar domínio

Após o deploy inicial ser concluído:

1. Acesse o projeto no Cloudflare Pages
2. Vá até **Settings** → **Domains**
3. Clique em **Add domain**
4. Digite `wmk.dev.br`

### 3.2 Verificar configuração DNS

O Cloudflare fornecerá instruções para apontar seu domínio. Se o domínio já está registrado com Cloudflare:

1. Vá até **DNS** na barra lateral
2. Adicione um registro CNAME:
   - **Name:** `www`
   - **Target:** `wagner-portfolio.pages.dev`
   - **TTL:** Auto
   - **Proxy status:** Proxied

3. Para a raiz do domínio (`wmk.dev.br`), crie um registro CNAME:
   - **Name:** `@`
   - **Target:** `wagner-portfolio.pages.dev`
   - **TTL:** Auto
   - **Proxy status:** Proxied

### 3.3 Aguardar propagação DNS

A propagação pode levar de 5 minutos a 48 horas. Você pode verificar o status em:

```bash
nslookup wmk.dev.br
```

## Passo 4: Configurações Adicionais (Recomendadas)

### 4.1 Habilitar HTTPS

O Cloudflare Pages fornece HTTPS automaticamente. Verifique se está ativado em **Settings** → **SSL/TLS**.

### 4.2 Configurar redirects

Para redirecionar `www.wmk.dev.br` para `wmk.dev.br`:

1. Vá para **Rules** → **Page Rules**
2. Crie uma regra:
   - **URL:** `www.wmk.dev.br/*`
   - **Forwarding URL:** `301 - Permanent Redirect`
   - **Destino:** `https://wmk.dev.br/$1`

### 4.3 Otimizações de performance

1. Ative **Brotli compression** em **Settings** → **Speed**
2. Ative **Rocket Loader** para otimizar carregamento de JavaScript
3. Configure **Cache Rules** para cache agressivo de assets estáticos

## Passo 5: Monitoramento e Manutenção

### 5.1 Acompanhar deploys

Cada push para a branch `main` no GitHub dispara um novo deploy automaticamente. Você pode acompanhar:

1. No Cloudflare Pages Dashboard
2. Nos logs do GitHub Actions (se configurado)

### 5.2 Reverter para versão anterior

Se algo der errado:

1. Acesse o projeto no Cloudflare Pages
2. Vá para **Deployments**
3. Encontre a versão anterior que funcionava
4. Clique em **Rollback to this deployment**

### 5.3 Verificar performance

Use as ferramentas do Cloudflare para monitorar:

- **Analytics** → Visualizar tráfego e performance
- **Speed** → Verificar Core Web Vitals
- **Security** → Monitorar ataques bloqueados

## Troubleshooting

### Build falha

Se o build falhar:

1. Verifique os logs no Cloudflare Pages
2. Confirme que `npm run build` funciona localmente
3. Verifique se todas as dependências estão no `package.json`

### Domínio não funciona

Se o domínio não resolver:

1. Verifique a configuração DNS no Cloudflare
2. Aguarde propagação DNS (use `nslookup` para verificar)
3. Limpe o cache do navegador (Ctrl+Shift+Delete)
4. Tente em navegador privado/incógnito

### Assets não carregam

Se as imagens não aparecerem:

1. Verifique as URLs dos assets no código
2. Confirme que as URLs CDN estão corretas
3. Verifique a console do navegador (F12) para erros

## Próximos Passos

Após o deploy bem-sucedido:

1. **Compartilhe seu portfólio** com recrutadores e colegas
2. **Monitore o tráfego** usando o Analytics do Cloudflare
3. **Atualize conteúdo** conforme necessário (novos projetos, experiências)
4. **Otimize performance** baseado em métricas reais
5. **Considere adicionar** um formulário de contato funcional (requer backend)

## Referências

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [Cloudflare DNS Management](https://developers.cloudflare.com/dns/)

---

**Última atualização:** Fevereiro 2026  
**Versão:** 1.0
