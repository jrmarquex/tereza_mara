# Site do Museu

Site responsivo baseado no template Wix, adaptado para um museu. Totalmente responsivo para mobile, tablet e desktop.

🌐 **Deploy:** [GitHub Pages](https://pages.github.com)

## 🚀 Tecnologias

- HTML5
- CSS3 (com variáveis CSS e Flexbox/Grid)
- JavaScript (ES6+)
- Vite (build tool)
- GitHub Actions (deploy automático)

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd SEU_REPOSITORIO
```

2. Instale as dependências:
```bash
npm install
```

## 🛠️ Desenvolvimento

Para rodar o servidor de desenvolvimento:

```bash
npm run dev
```

O site estará disponível em `http://localhost:3000`

## 🏗️ Build para Produção

Para compilar o projeto para produção:

```bash
npm run build
```

Os arquivos compilados estarão na pasta `dist/`.

## 📤 Deploy no GitHub Pages

O deploy é automático via GitHub Actions. Veja o guia completo em [GITHUB_PAGES.md](./GITHUB_PAGES.md)

### Deploy Manual

1. Faça o build:
```bash
npm run build
```

2. Faça commit e push:
```bash
git add .
git commit -m "Deploy"
git push origin main
```

O GitHub Actions fará o deploy automaticamente.

## ⚠️ Nota sobre PHP

**Importante:** O GitHub Pages é um serviço de hospedagem estática e **não suporta PHP**.

Os arquivos PHP (`php/newsletter.php` e `php/contact.php`) estão incluídos no projeto, mas não funcionarão no GitHub Pages. Para usar formulários funcionais, você tem algumas opções:

1. **Usar um serviço de formulário externo** (Formspree, Netlify Forms, etc.)
2. **Hospedar em servidor com PHP** (Hostinger, etc.) - veja [DEPLOY.md](./DEPLOY.md)
3. **Usar GitHub Pages + API externa** para processar formulários

## 📁 Estrutura do Projeto

```
Site_t/
├── index.html          # Página principal
├── sobre.html          # Página sobre
├── src/
│   ├── css/
│   │   └── style.css   # Estilos principais
│   └── js/
│       └── main.js     # JavaScript principal
├── php/                # Arquivos PHP (não funcionam no GitHub Pages)
│   ├── newsletter.php
│   └── contact.php
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions workflow
├── dist/               # Build de produção (gerado)
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Personalização

### Cores

As cores podem ser alteradas no arquivo `src/css/style.css` nas variáveis CSS:

```css
:root {
    --primary-color: #8B4513;    /* Marrom */
    --secondary-color: #D4AF37;   /* Dourado */
    /* ... */
}
```

### Conteúdo

- Edite `index.html` para alterar textos e conteúdo
- Substitua as imagens pelos seus próprios assets
- Ajuste os links de navegação conforme necessário

### Nome do Museu

Substitua `[Nome]` por todo o site pelo nome real do seu museu.

## 📱 Responsividade

O site é totalmente responsivo com breakpoints em:
- Mobile: até 768px
- Tablet: 768px - 1024px
- Desktop: acima de 1024px

## 🔧 Funcionalidades

- ✅ Menu responsivo com toggle mobile
- ✅ Chat widget flutuante
- ✅ Formulário de newsletter (requer backend para funcionar)
- ✅ Scroll suave
- ✅ Botão voltar ao topo
- ✅ Lazy loading de imagens
- ✅ Validação de formulários
- ✅ Deploy automático via GitHub Actions

## 📝 Notas

- As imagens estão usando URLs do Unsplash como placeholder. Substitua pelos seus próprios assets.
- O chat widget é uma simulação básica. Para funcionalidade real, integre com um serviço de chat.
- Os formulários precisam de um backend para funcionar. No GitHub Pages, considere usar serviços externos.

## 🆘 Suporte

Para dúvidas ou problemas:

1. Verifique se todas as dependências foram instaladas (`npm install`)
2. Verifique os logs do GitHub Actions se o deploy falhar
3. Consulte a documentação do [GitHub Pages](https://docs.github.com/en/pages)

## 📄 Licença

Este projeto foi criado para uso do museu.

## 🔗 Links Úteis

- [Guia de Deploy GitHub Pages](./GITHUB_PAGES.md)
- [Guia de Deploy Hostinger](./DEPLOY.md)
