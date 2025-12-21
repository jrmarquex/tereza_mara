# Deploy no GitHub Pages

Este guia explica como fazer o deploy do site do museu no GitHub Pages.

## 📋 Pré-requisitos

1. Conta no GitHub
2. Git instalado no seu computador
3. Node.js instalado (para fazer o build)

## 🚀 Passo a Passo

### 1. Criar Repositório no GitHub

1. Acesse [GitHub](https://github.com)
2. Clique em **New repository** (ou use o botão +)
3. Dê um nome ao repositório (ex: `museu-site`)
4. **NÃO** inicialize com README, .gitignore ou licença
5. Clique em **Create repository**

### 2. Configurar o Repositório Local

No terminal, execute os seguintes comandos:

```bash
# Inicializar git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit - Site do Museu"

# Adicionar o repositório remoto (substitua SEU_USUARIO e SEU_REPOSITORIO)
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

# Renomear branch para main (se necessário)
git branch -M main

# Fazer push
git push -u origin main
```

### 3. Configurar GitHub Pages

1. No repositório do GitHub, vá em **Settings**
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione **GitHub Actions**
4. Salve as configurações

### 4. Deploy Automático

O GitHub Actions está configurado para fazer deploy automaticamente sempre que você fizer push para a branch `main`.

**Workflow:**
- Toda vez que você fizer `git push`, o GitHub Actions irá:
  1. Instalar dependências
  2. Fazer o build do projeto
  3. Fazer deploy para GitHub Pages

### 5. Acessar o Site

Após o deploy (pode levar alguns minutos), seu site estará disponível em:
```
https://SEU_USUARIO.github.io/SEU_REPOSITORIO/
```

## 🔄 Atualizar o Site

Para atualizar o site:

```bash
# Fazer alterações nos arquivos
# ...

# Adicionar alterações
git add .

# Fazer commit
git commit -m "Descrição das alterações"

# Fazer push (o deploy será automático)
git push origin main
```

## 📝 Configurações Importantes

### Base Path

Se o seu repositório não for o repositório principal do usuário (não for `username.github.io`), você pode precisar ajustar o `base` no `vite.config.js`:

```javascript
const base = process.env.NODE_ENV === 'production' ? '/nome-do-repositorio/' : '/';
```

### Domínio Personalizado

Se você quiser usar um domínio personalizado:

1. Adicione um arquivo `CNAME` na pasta `public/` (crie a pasta se não existir)
2. Dentro do arquivo, coloque apenas o domínio: `seu-dominio.com`
3. Configure o DNS do seu domínio apontando para o GitHub Pages

## 🐛 Troubleshooting

### Build falha

- Verifique se todas as dependências estão no `package.json`
- Execute `npm install` localmente para testar
- Verifique os logs do GitHub Actions

### Site não aparece

- Aguarde alguns minutos após o push
- Verifique se o GitHub Actions completou com sucesso
- Verifique se o Pages está habilitado nas configurações

### Caminhos quebrados

- Certifique-se de que o `base` no `vite.config.js` está correto
- Use caminhos relativos nos HTMLs
- Verifique se os arquivos foram compilados corretamente na pasta `dist/`

## 📚 Recursos

- [Documentação GitHub Pages](https://docs.github.com/en/pages)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)

