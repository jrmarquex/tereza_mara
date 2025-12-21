#!/bin/bash

# Script de deploy para GitHub Pages

echo "🚀 Iniciando deploy para GitHub Pages..."

# Build do projeto
echo "📦 Fazendo build do projeto..."
npm run build

# Verifica se o build foi bem-sucedido
if [ $? -ne 0 ]; then
    echo "❌ Erro no build. Abortando deploy."
    exit 1
fi

echo "✅ Build concluído com sucesso!"
echo ""
echo "📝 Próximos passos:"
echo "1. Faça commit das alterações:"
echo "   git add ."
echo "   git commit -m 'Deploy para GitHub Pages'"
echo ""
echo "2. Faça push para o repositório:"
echo "   git push origin main"
echo ""
echo "3. O GitHub Actions irá fazer o deploy automaticamente"
echo "   Verifique em: https://github.com/SEU_USUARIO/SEU_REPOSITORIO/actions"

