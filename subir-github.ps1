# Script para subir o site para GitHub Pages
# Execute este script após criar o repositório no GitHub

Write-Host "🚀 Preparando para subir para GitHub..." -ForegroundColor Green
Write-Host ""

# Verificar se git está inicializado
if (-not (Test-Path .git)) {
    Write-Host "📦 Inicializando repositório Git..." -ForegroundColor Yellow
    git init
}

# Verificar status
Write-Host "📋 Verificando status do repositório..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "INSTRUÇÕES:" -ForegroundColor Yellow
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Crie um repositório no GitHub:" -ForegroundColor White
Write-Host "   - Acesse: https://github.com/new" -ForegroundColor Gray
Write-Host "   - Nome: museu-site (ou outro nome)" -ForegroundColor Gray
Write-Host "   - NÃO marque nenhuma opção de inicialização" -ForegroundColor Gray
Write-Host "   - Clique em 'Create repository'" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Após criar, execute os comandos abaixo (substitua SEU_USUARIO e SEU_REPOSITORIO):" -ForegroundColor White
Write-Host ""
Write-Host "   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git" -ForegroundColor Green
Write-Host "   git push -u origin main" -ForegroundColor Green
Write-Host ""
Write-Host "3. Configure GitHub Pages:" -ForegroundColor White
Write-Host "   - Vá em Settings > Pages" -ForegroundColor Gray
Write-Host "   - Source: GitHub Actions" -ForegroundColor Gray
Write-Host ""
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""

# Perguntar se já criou o repositório
$resposta = Read-Host "Você já criou o repositório no GitHub? (s/n)"

if ($resposta -eq "s" -or $resposta -eq "S") {
    $usuario = Read-Host "Digite seu usuário do GitHub"
    $repositorio = Read-Host "Digite o nome do repositório"
    
    Write-Host ""
    Write-Host "🔗 Conectando ao repositório remoto..." -ForegroundColor Yellow
    
    # Remover remote se já existir
    git remote remove origin 2>$null
    
    # Adicionar novo remote
    git remote add origin "https://github.com/$usuario/$repositorio.git"
    
    Write-Host "✅ Repositório conectado!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📤 Fazendo push para GitHub..." -ForegroundColor Yellow
    
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Sucesso! Código enviado para GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📝 Próximos passos:" -ForegroundColor Yellow
        Write-Host "   1. Vá em Settings > Pages" -ForegroundColor White
        Write-Host "   2. Selecione 'GitHub Actions' como Source" -ForegroundColor White
        Write-Host "   3. Aguarde alguns minutos para o deploy" -ForegroundColor White
        Write-Host "   4. Acesse: https://$usuario.github.io/$repositorio/" -ForegroundColor Cyan
    } else {
        Write-Host ""
        Write-Host "❌ Erro ao fazer push. Verifique:" -ForegroundColor Red
        Write-Host "   - Se o repositório existe no GitHub" -ForegroundColor White
        Write-Host "   - Se você tem permissão" -ForegroundColor White
        Write-Host "   - Se digitou o usuário e repositório corretos" -ForegroundColor White
    }
} else {
    Write-Host ""
    Write-Host "📝 Crie o repositório primeiro e depois execute este script novamente." -ForegroundColor Yellow
    Write-Host "   Ou execute manualmente os comandos acima." -ForegroundColor Yellow
}

Write-Host ""

