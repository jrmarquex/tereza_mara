# Script para fazer push para GitHub
Write-Host "🚀 Conectando ao repositório GitHub..." -ForegroundColor Green

# Verificar se está no diretório correto
Write-Host "📁 Diretório atual: $(Get-Location)" -ForegroundColor Yellow

# Verificar se git está inicializado
if (-not (Test-Path .git)) {
    Write-Host "❌ Git não está inicializado. Inicializando..." -ForegroundColor Red
    git init
}

# Configurar remote
Write-Host "🔗 Configurando repositório remoto..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/jrmarquex/tereza_mara.git

# Verificar remote
Write-Host "✅ Remote configurado:" -ForegroundColor Green
git remote -v

# Adicionar todos os arquivos
Write-Host "`n📦 Adicionando arquivos..." -ForegroundColor Yellow
git add .

# Verificar status
Write-Host "`n📋 Status:" -ForegroundColor Yellow
git status --short

# Fazer commit se houver alterações
$status = git status --porcelain
if ($status) {
    Write-Host "`n💾 Fazendo commit..." -ForegroundColor Yellow
    git commit -m "Initial commit - Site do Museu responsivo"
} else {
    Write-Host "`n✅ Nenhuma alteração para commitar" -ForegroundColor Green
}

# Renomear branch para main
Write-Host "`n🌿 Configurando branch main..." -ForegroundColor Yellow
git branch -M main

# Mostrar branches
Write-Host "`n📌 Branches:" -ForegroundColor Yellow
git branch

# Fazer push
Write-Host "`n📤 Fazendo push para GitHub..." -ForegroundColor Yellow
Write-Host "   Repositório: https://github.com/jrmarquex/tereza_mara.git" -ForegroundColor Cyan
Write-Host "   Branch: main" -ForegroundColor Cyan
Write-Host ""

$result = git push -u origin main 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ SUCESSO! Código enviado para GitHub!" -ForegroundColor Green
    Write-Host "`n📝 Próximos passos:" -ForegroundColor Yellow
    Write-Host "   1. Acesse: https://github.com/jrmarquex/tereza_mara" -ForegroundColor White
    Write-Host "   2. Vá em Settings > Pages" -ForegroundColor White
    Write-Host "   3. Source: GitHub Actions" -ForegroundColor White
    Write-Host "   4. Aguarde o deploy (alguns minutos)" -ForegroundColor White
    Write-Host "   5. Site estará em: https://jrmarquex.github.io/tereza_mara/" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Erro ao fazer push:" -ForegroundColor Red
    Write-Host $result -ForegroundColor Red
    Write-Host "`n💡 Possíveis soluções:" -ForegroundColor Yellow
    Write-Host "   - Verifique se você está autenticado no GitHub" -ForegroundColor White
    Write-Host "   - Use: gh auth login (se tiver GitHub CLI)" -ForegroundColor White
    Write-Host "   - Ou configure credenciais: git config --global user.name 'Seu Nome'" -ForegroundColor White
    Write-Host "   - E: git config --global user.email 'seu@email.com'" -ForegroundColor White
}

Write-Host ""

