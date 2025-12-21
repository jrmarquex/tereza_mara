# 🚀 Instruções para Subir no GitHub Pages

## Passo 1: Criar Repositório no GitHub

1. Acesse https://github.com e faça login
2. Clique no botão **+** (canto superior direito) → **New repository**
3. Preencha:
   - **Repository name:** `museu-site` (ou outro nome de sua escolha)
   - **Description:** Site do Museu - Responsivo
   - **Visibility:** Public (para GitHub Pages gratuito)
   - **NÃO marque** "Add a README file"
   - **NÃO marque** "Add .gitignore"
   - **NÃO marque** "Choose a license"
4. Clique em **Create repository**

## Passo 2: Conectar e Fazer Push

No terminal, execute os comandos abaixo (substitua `SEU_USUARIO` e `SEU_REPOSITORIO`):

```bash
# Verificar se já está inicializado
git status

# Se não estiver inicializado, execute:
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit - Site do Museu"

# Adicionar o repositório remoto (SUBSTITUA pelos seus dados)
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

# Renomear branch para main (se necessário)
git branch -M main

# Fazer push
git push -u origin main
```

**Exemplo:**
Se seu usuário for `joaosilva` e o repositório `museu-site`:
```bash
git remote add origin https://github.com/joaosilva/museu-site.git
```

## Passo 3: Configurar GitHub Pages

1. No repositório do GitHub, clique em **Settings** (Configurações)
2. No menu lateral esquerdo, clique em **Pages**
3. Em **Source**, selecione **GitHub Actions**
4. Salve as configurações

## Passo 4: Aguardar Deploy

1. Vá em **Actions** (no menu superior do repositório)
2. Você verá o workflow "Deploy to GitHub Pages" rodando
3. Aguarde alguns minutos até completar (ícone verde ✅)
4. Seu site estará disponível em:
   ```
   https://SEU_USUARIO.github.io/SEU_REPOSITORIO/
   ```

## Passo 5: Atualizar o Site (Futuro)

Sempre que fizer alterações:

```bash
# Fazer alterações nos arquivos...

# Adicionar alterações
git add .

# Fazer commit
git commit -m "Descrição das alterações"

# Fazer push (deploy automático)
git push origin main
```

## ⚠️ Importante: PHP não funciona no GitHub Pages

O GitHub Pages é estático e **não executa PHP**. Os formulários não funcionarão automaticamente.

**Soluções:**
1. Use serviços externos como [Formspree](https://formspree.io) ou [Netlify Forms](https://www.netlify.com/products/forms/)
2. Hospede em servidor com PHP (veja [DEPLOY.md](./DEPLOY.md) para Hostinger)

## 🐛 Problemas Comuns

### Erro: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
```

### Erro: "failed to push"
- Verifique se você tem permissão no repositório
- Verifique se digitou a URL correta
- Tente usar autenticação via token do GitHub

### Site não aparece
- Aguarde 5-10 minutos após o push
- Verifique se o GitHub Actions completou com sucesso
- Verifique se o Pages está configurado para usar GitHub Actions

## 📞 Precisa de Ajuda?

- [Documentação GitHub Pages](https://docs.github.com/en/pages)
- [GitHub Actions](https://docs.github.com/en/actions)

