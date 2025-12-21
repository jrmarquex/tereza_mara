# 📤 Como Subir os Arquivos para o GitHub

Tudo está pronto! Siga estes passos simples:

## ✅ Status Atual

- ✅ Todos os arquivos estão commitados
- ✅ Repositório conectado: https://github.com/jrmarquex/tereza_mara.git
- ✅ Branch configurada: main
- ✅ Pronto para push!

## 🚀 Passos para Subir

### Opção 1: Usando Token do GitHub (Mais Fácil)

1. **Crie um Token:**
   - Acesse: https://github.com/settings/tokens
   - Clique em **"Generate new token (classic)"**
   - Dê um nome: `Site do Museu`
   - Marque a opção **`repo`** (todas as permissões)
   - Clique em **"Generate token"**
   - **COPIE O TOKEN** (você só verá uma vez!)

2. **Execute no PowerShell:**
```powershell
git push -u origin main
```

3. **Quando pedir:**
   - **Username:** `jrmarquex`
   - **Password:** Cole o token que você copiou (não sua senha!)

### Opção 2: Usando GitHub Desktop

1. Baixe: https://desktop.github.com/
2. Instale e faça login
3. Adicione o repositório local
4. Clique em "Push origin"

### Opção 3: Usando Git no Terminal

```powershell
git push -u origin main
```

Se pedir autenticação, use o token (Opção 1).

## 📋 Após o Push

1. Acesse: https://github.com/jrmarquex/tereza_mara
2. Vá em **Settings** → **Pages**
3. Em **Source**, selecione **"GitHub Actions"**
4. Clique em **Save**
5. Aguarde alguns minutos (veja o progresso em **Actions**)
6. Seu site estará em: **https://jrmarquex.github.io/tereza_mara/**

## ⚠️ Importante

- O GitHub Pages **não executa PHP**
- Os formulários precisarão de um serviço externo (Formspree, etc.)
- Ou hospede em servidor com PHP (Hostinger, etc.)

## 🆘 Problemas?

### Erro de autenticação
- Use um Personal Access Token (veja Opção 1 acima)
- Não use sua senha do GitHub

### Erro de permissão
- Verifique se o token tem permissão `repo`
- Verifique se você tem acesso ao repositório

### Site não aparece
- Aguarde 5-10 minutos após o push
- Verifique se o GitHub Actions completou (veja em Actions)
- Verifique se o Pages está configurado para GitHub Actions

## 📁 Arquivos Incluídos

Todos estes arquivos estão prontos para subir:
- ✅ index.html
- ✅ sobre.html
- ✅ src/css/style.css
- ✅ src/js/main.js
- ✅ php/ (arquivos PHP - não funcionam no GitHub Pages)
- ✅ .github/workflows/deploy.yml (deploy automático)
- ✅ package.json
- ✅ vite.config.js
- ✅ README.md
- ✅ E todos os outros arquivos de configuração

---

**Boa sorte! 🚀**


