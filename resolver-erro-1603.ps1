# Script para resolver erro 1603 na instalação do GitHub CLI
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RESOLVENDO ERRO 1603 - GITHUB CLI" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se já está instalado
Write-Host "🔍 Verificando se GitHub CLI já está instalado..." -ForegroundColor Yellow
$ghPath = Get-Command gh -ErrorAction SilentlyContinue

if ($ghPath) {
    Write-Host "✅ GitHub CLI já está instalado em: $($ghPath.Source)" -ForegroundColor Green
    gh --version
    Write-Host ""
    Write-Host "💡 Para autenticar, execute: gh auth login" -ForegroundColor Cyan
    exit 0
}

Write-Host "❌ GitHub CLI não encontrado. Tentando soluções..." -ForegroundColor Red
Write-Host ""

# Solução 1: Limpar instalações anteriores
Write-Host "🧹 Solução 1: Limpando instalações anteriores..." -ForegroundColor Yellow
Write-Host "   Verificando processos do instalador..." -ForegroundColor Gray

# Matar processos do instalador se estiverem rodando
Get-Process | Where-Object {$_.ProcessName -like "*msiexec*" -or $_.ProcessName -like "*GitHub*"} | Stop-Process -Force -ErrorAction SilentlyContinue

Start-Sleep -Seconds 2

# Solução 2: Tentar instalar novamente com mais permissões
Write-Host ""
Write-Host "📦 Solução 2: Tentando instalar novamente..." -ForegroundColor Yellow

# Verificar se é administrador
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "⚠️  Você NÃO está executando como Administrador!" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 SOLUÇÃO:" -ForegroundColor Yellow
    Write-Host "   1. Feche este PowerShell" -ForegroundColor White
    Write-Host "   2. Clique com botão direito no PowerShell" -ForegroundColor White
    Write-Host "   3. Selecione 'Executar como administrador'" -ForegroundColor White
    Write-Host "   4. Execute: winget install --id GitHub.cli" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host "✅ Executando como Administrador" -ForegroundColor Green
    Write-Host "   Tentando instalar com parâmetros adicionais..." -ForegroundColor Gray
    
    # Tentar com --force
    winget install --id GitHub.cli --force --accept-package-agreements --accept-source-agreements
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅✅✅ Instalação concluída! ✅✅✅" -ForegroundColor Green
        Write-Host ""
        Write-Host "📝 Próximos passos:" -ForegroundColor Yellow
        Write-Host "   1. Feche e reabra o terminal" -ForegroundColor White
        Write-Host "   2. Execute: gh auth login" -ForegroundColor Cyan
        exit 0
    } else {
        Write-Host ""
        Write-Host "❌ Ainda com erro. Tentando método alternativo..." -ForegroundColor Red
    }
}

# Solução 3: Download manual
Write-Host ""
Write-Host "📥 Solução 3: Download Manual (Recomendado)" -ForegroundColor Yellow
Write-Host ""
Write-Host "O erro 1603 geralmente indica problema com o instalador do winget." -ForegroundColor Gray
Write-Host "A melhor solução é baixar e instalar manualmente:" -ForegroundColor Gray
Write-Host ""
Write-Host "1. Acesse: https://github.com/cli/cli/releases/latest" -ForegroundColor White
Write-Host "2. Baixe: gh_X.X.X_windows_amd64.msi" -ForegroundColor White
Write-Host "3. Execute o arquivo .msi como Administrador" -ForegroundColor White
Write-Host "4. Siga o assistente de instalação" -ForegroundColor White
Write-Host "5. Feche e reabra o terminal" -ForegroundColor White
Write-Host "6. Execute: gh auth login" -ForegroundColor Cyan
Write-Host ""

# Tentar abrir o navegador
$abrir = Read-Host "Deseja abrir a página de download agora? (s/n)"
if ($abrir -eq "s" -or $abrir -eq "S") {
    Start-Process "https://github.com/cli/cli/releases/latest"
    Write-Host "✅ Página aberta no navegador!" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

