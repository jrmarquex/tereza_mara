# Script para instalar GitHub CLI no Windows
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  INSTALAÇÃO DO GITHUB CLI (gh)" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se já está instalado
Write-Host "🔍 Verificando se GitHub CLI já está instalado..." -ForegroundColor Yellow
$ghInstalled = Get-Command gh -ErrorAction SilentlyContinue

if ($ghInstalled) {
    Write-Host "✅ GitHub CLI já está instalado!" -ForegroundColor Green
    gh --version
    Write-Host ""
    Write-Host "💡 Para autenticar, execute: gh auth login" -ForegroundColor Cyan
    exit 0
}

Write-Host "❌ GitHub CLI não encontrado. Iniciando instalação..." -ForegroundColor Red
Write-Host ""

# Verificar se é Administrador
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "⚠️  ATENÇÃO: Execute o PowerShell como Administrador!" -ForegroundColor Yellow
    Write-Host "   Clique com botão direito no PowerShell > Executar como administrador" -ForegroundColor Gray
    Write-Host ""
    $continue = Read-Host "Continuar mesmo assim? (s/n)"
    if ($continue -ne "s") {
        exit 1
    }
}

# Tentar instalar com Winget
Write-Host "📦 Tentando instalar com Winget..." -ForegroundColor Yellow
$winget = Get-Command winget -ErrorAction SilentlyContinue

if ($winget) {
    Write-Host "✅ Winget encontrado. Instalando..." -ForegroundColor Green
    winget install --id GitHub.cli --accept-package-agreements --accept-source-agreements
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅✅✅ Instalação concluída com sucesso! ✅✅✅" -ForegroundColor Green
        Write-Host ""
        Write-Host "📝 Próximos passos:" -ForegroundColor Yellow
        Write-Host "   1. Feche e reabra o terminal" -ForegroundColor White
        Write-Host "   2. Execute: gh auth login" -ForegroundColor Cyan
        Write-Host "   3. Siga as instruções na tela" -ForegroundColor White
        Write-Host "   4. Depois execute: .\FAZER_PUSH.ps1" -ForegroundColor Cyan
        exit 0
    }
}

# Tentar com Chocolatey
Write-Host ""
Write-Host "📦 Tentando instalar com Chocolatey..." -ForegroundColor Yellow
$choco = Get-Command choco -ErrorAction SilentlyContinue

if ($choco) {
    Write-Host "✅ Chocolatey encontrado. Instalando..." -ForegroundColor Green
    choco install gh -y
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅✅✅ Instalação concluída com sucesso! ✅✅✅" -ForegroundColor Green
        Write-Host ""
        Write-Host "📝 Próximos passos:" -ForegroundColor Yellow
        Write-Host "   1. Feche e reabra o terminal" -ForegroundColor White
        Write-Host "   2. Execute: gh auth login" -ForegroundColor Cyan
        Write-Host "   3. Siga as instruções na tela" -ForegroundColor White
        Write-Host "   4. Depois execute: .\FAZER_PUSH.ps1" -ForegroundColor Cyan
        exit 0
    }
}

# Se nenhum gerenciador de pacotes foi encontrado
Write-Host ""
Write-Host "❌ Nenhum gerenciador de pacotes encontrado (Winget ou Chocolatey)" -ForegroundColor Red
Write-Host ""
Write-Host "📥 INSTALAÇÃO MANUAL:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Acesse: https://github.com/cli/cli/releases/latest" -ForegroundColor White
Write-Host "2. Baixe o arquivo .msi para Windows" -ForegroundColor White
Write-Host "3. Execute o instalador" -ForegroundColor White
Write-Host "4. Feche e reabra o terminal" -ForegroundColor White
Write-Host "5. Execute: gh auth login" -ForegroundColor Cyan
Write-Host ""
Write-Host "OU instale o Winget primeiro:" -ForegroundColor Yellow
Write-Host "   Acesse: https://aka.ms/getwinget" -ForegroundColor Cyan
Write-Host ""

