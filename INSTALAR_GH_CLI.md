# Como Instalar GitHub CLI no Windows

O GitHub CLI (gh) é a forma mais fácil de autenticar e fazer push para o GitHub.

## 🚀 Métodos de Instalação

### Método 1: Winget (Recomendado - Windows 10/11)

1. Abra o PowerShell como **Administrador**
2. Execute:
```powershell
winget install --id GitHub.cli
```

3. Feche e reabra o terminal
4. Verifique a instalação:
```powershell
gh --version
```

### Método 2: Chocolatey

Se você tem Chocolatey instalado:

```powershell
choco install gh
```

### Método 3: Download Manual

1. Acesse: https://github.com/cli/cli/releases/latest
2. Baixe o arquivo `.msi` para Windows (ex: `gh_X.X.X_windows_amd64.msi`)
3. Execute o instalador
4. Siga as instruções na tela
5. Feche e reabra o terminal

### Método 4: Scoop

Se você usa Scoop:

```powershell
scoop install gh
```

## ✅ Verificar Instalação

Após instalar, verifique:

```powershell
gh --version
```

Deve mostrar algo como:
```
gh version 2.XX.X (YYYY-MM-DD)
```

## 🔐 Autenticar no GitHub

Após instalar, autentique:

```powershell
gh auth login
```

Siga as instruções:
1. Escolha **GitHub.com**
2. Escolha o protocolo: **HTTPS** (recomendado)
3. Escolha como autenticar: **Login with a web browser** (mais fácil)
4. Pressione Enter para abrir o navegador
5. Autorize o GitHub CLI
6. Volte ao terminal e confirme

## 📤 Depois de Autenticar

Após autenticar, você pode fazer push normalmente:

```powershell
git push -u origin main
```

Ou use o script:
```powershell
.\FAZER_PUSH.ps1
```

## 🆘 Problemas?

### "gh: command not found"
- Feche e reabra o terminal
- Verifique se o caminho está no PATH
- Reinicie o computador se necessário

### Erro de permissão
- Execute o PowerShell como Administrador
- Verifique se o antivírus não está bloqueando

### Não consegue autenticar
- Tente: `gh auth login --web`
- Ou use token: `gh auth login --with-token < token.txt`

## 📚 Documentação

- Site oficial: https://cli.github.com/
- Documentação: https://cli.github.com/manual/

