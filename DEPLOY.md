# Guia de Deploy na Hostinger

Este guia explica como fazer o deploy do site do museu na Hostinger.

## 📋 Pré-requisitos

1. Conta na Hostinger
2. Acesso ao painel de controle (hPanel)
3. Node.js instalado localmente (para fazer o build)

## 🚀 Passo a Passo

### 1. Build do Projeto

No seu computador local, execute:

```bash
npm install
npm run build
```

Isso criará a pasta `dist/` com os arquivos compilados.

### 2. Preparar Arquivos para Upload

Você precisará fazer upload de:

- **Pasta `dist/`** - Todo o conteúdo (HTML, CSS, JS compilados)
- **Pasta `php/`** - Arquivos PHP para formulários
- **Arquivo `.htaccess`** - Configurações do Apache

### 3. Acessar o File Manager da Hostinger

1. Faça login no hPanel
2. Vá em **File Manager**
3. Navegue até a pasta `public_html` (ou a pasta do seu domínio)

### 4. Upload dos Arquivos

#### Opção A: Via File Manager (Interface Web)

1. No File Manager, clique em **Upload**
2. Faça upload dos arquivos:
   - Todo o conteúdo da pasta `dist/`
   - A pasta `php/`
   - O arquivo `.htaccess`

#### Opção B: Via FTP

1. Use um cliente FTP (FileZilla, WinSCP, etc.)
2. Conecte-se usando as credenciais FTP da Hostinger
3. Faça upload dos arquivos para `public_html`

### 5. Estrutura Final no Servidor

A estrutura deve ficar assim:

```
public_html/
├── index.html
├── sobre.html
├── (outras páginas HTML)
├── assets/
│   ├── css/
│   └── js/
├── php/
│   ├── newsletter.php
│   └── contact.php
├── .htaccess
└── data/ (será criada automaticamente)
```

### 6. Configurar Permissões

1. No File Manager, crie a pasta `data/` se não existir
2. Clique com botão direito na pasta `data/`
3. Selecione **Change Permissions**
4. Defina as permissões como **755** ou **777**
5. Aplique as mesmas permissões para a pasta `php/`

### 7. Ajustar Caminhos (se necessário)

Se o site estiver em uma subpasta (ex: `public_html/museu/`), você precisará ajustar os caminhos:

- Nos arquivos HTML, ajuste os caminhos dos CSS e JS
- Nos arquivos PHP, ajuste os caminhos relativos

### 8. Testar o Site

1. Acesse seu domínio no navegador
2. Teste todas as funcionalidades:
   - Navegação entre páginas
   - Formulário de newsletter
   - Chat widget
   - Menu mobile

### 9. Configurar PHP (se necessário)

A Hostinger geralmente já tem PHP configurado, mas verifique:

1. No hPanel, vá em **Advanced** > **PHP Configuration**
2. Certifique-se de que a versão do PHP é 7.4 ou superior
3. Verifique se as extensões necessárias estão habilitadas

### 10. Configurar SSL (Recomendado)

1. No hPanel, vá em **SSL**
2. Ative o SSL gratuito Let's Encrypt
3. Force HTTPS no `.htaccess` (descomente as linhas no arquivo)

## 🔧 Troubleshooting

### Erro 500 (Internal Server Error)

- Verifique as permissões das pastas
- Verifique o arquivo `.htaccess` por erros de sintaxe
- Verifique os logs de erro no hPanel

### Formulários não funcionam

- Verifique se a pasta `data/` existe e tem permissão de escrita
- Verifique os caminhos dos arquivos PHP
- Teste os arquivos PHP diretamente no navegador

### CSS/JS não carregam

- Verifique os caminhos dos arquivos no HTML
- Limpe o cache do navegador
- Verifique se os arquivos foram enviados corretamente

### Imagens não aparecem

- Verifique se as URLs das imagens estão corretas
- Se estiver usando imagens locais, verifique os caminhos
- Considere usar um CDN para imagens

## 📝 Notas Importantes

1. **Backup**: Sempre faça backup antes de fazer alterações
2. **Versão do PHP**: Use PHP 7.4 ou superior
3. **Permissões**: A pasta `data/` precisa de permissão de escrita
4. **Segurança**: Não deixe arquivos sensíveis acessíveis publicamente
5. **Performance**: Considere usar um CDN para assets estáticos

## 🆘 Suporte

Se encontrar problemas:

1. Verifique os logs de erro no hPanel
2. Teste localmente primeiro
3. Entre em contato com o suporte da Hostinger se necessário

## 🔄 Atualizações Futuras

Para atualizar o site:

1. Faça as alterações localmente
2. Execute `npm run build`
3. Faça upload apenas dos arquivos alterados
4. Limpe o cache do navegador

