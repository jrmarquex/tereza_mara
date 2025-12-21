# Script final para fazer push - Execute este arquivo
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PUSH PARA GITHUB - SITE DO MUSEU" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se está no diretório correto
$currentDir = Get-Location
Write-Host "📁 Diretório: $currentDir" -ForegroundColor Gray
Write-Host ""

# 1. Verificar se git está inicializado
if (-not (Test-Path .git)) {
    Write-Host "🔧 Inicializando Git..." -ForegroundColor Yellow
    git init
}

# 2. Configurar remote
Write-Host "🔗 Configurando repositório remoto..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/jrmarquex/tereza_mara.git
Write-Host "✅ Remote configurado" -ForegroundColor Green

# 3. Adicionar arquivos
Write-Host "📦 Adicionando arquivos..." -ForegroundColor Yellow
git add .
$files = (git status --short | Measure-Object -Line).Lines
Write-Host "   $files arquivo(s) adicionado(s)" -ForegroundColor Gray

# 4. Fazer commit
Write-Host "💾 Fazendo commit..." -ForegroundColor Yellow
git commit -m "Initial commit - Site do Museu responsivo" 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Commit realizado" -ForegroundColor Green
} else {
    Write-Host "⚠️  Nenhuma alteração para commitar ou commit já existe" -ForegroundColor Yellow
}

# 5. Configurar branch
Write-Host "🌿 Configurando branch main..." -ForegroundColor Yellow
git branch -M main 2>&1 | Out-Null
Write-Host "✅ Branch main configurada" -ForegroundColor Green

# 6. Tentar push
Write-Host ""
Write-Host "📤 Tentando fazer push..." -ForegroundColor Yellow
Write-Host "   Repositório: https://github.com/jrmarquex/tereza_mara.git" -ForegroundColor Cyan
Write-Host ""

# Tentar push e capturar output
$pushOutput = git push -u origin main 2>&1
$pushSuccess = $LASTEXITCODE -eq 0

if ($pushSuccess) {
    Write-Host ""
    Write-Host "✅✅✅ SUCESSO! Código enviado para GitHub! ✅✅✅" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Próximos passos:" -ForegroundColor Yellow
    Write-Host "   1. Acesse: https://github.com/jrmarquex/tereza_mara" -ForegroundColor White
    Write-Host "   2. Vá em Settings > Pages" -ForegroundColor White
    Write-Host "   3. Source: GitHub Actions" -ForegroundColor White
    Write-Host "   4. Aguarde o deploy (veja em Actions)" -ForegroundColor White
    Write-Host "   5. Site: https://jrmarquex.github.io/tereza_mara/" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Erro ao fazer push. Motivo provável: AUTENTICAÇÃO" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔐 SOLUÇÕES PARA AUTENTICAÇÃO:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "OPÇÃO 1 - GitHub CLI (mais fácil):" -ForegroundColor Cyan
    Write-Host "   gh auth login" -ForegroundColor White
    Write-Host "   (Siga as instruções na tela)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "OPÇÃO 2 - Personal Access Token:" -ForegroundColor Cyan
    Write-Host "   1. Acesse: https://github.com/settings/tokens" -ForegroundColor White
    Write-Host "   2. Generate new token (classic)" -ForegroundColor White
    Write-Host "   3. Marque: repo (todas as permissões)" -ForegroundColor White
    Write-Host "   4. Copie o token" -ForegroundColor White
    Write-Host "   5. Quando pedir senha, use o token" -ForegroundColor White
    Write-Host ""
    Write-Host "OPÇÃO 3 - Configurar credenciais:" -ForegroundColor Cyan
    Write-Host "   git config --global user.name 'Seu Nome'" -ForegroundColor White
    Write-Host "   git config --global user.email 'seu@email.com'" -ForegroundColor White
    Write-Host ""
    Write-Host "💡 Depois de autenticar, execute este script novamente!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📋 Output do erro:" -ForegroundColor Gray
    Write-Host $pushOutput -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

