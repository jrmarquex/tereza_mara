# Painel Administrativo

## Acesso

1. Acesse: `http://seusite.com/admin/login.html`
2. Credenciais padrão:
   - **Usuário:** `admin`
   - **Senha:** `admin123`

⚠️ **IMPORTANTE:** Altere a senha padrão no arquivo `php/config.php` após o primeiro acesso!

## Funcionalidades

### 1. Editar Página Inicial
- Hero (título, subtítulo, descrição, imagem)
- Texto de introdução
- Seção Sobre (título, texto, imagem)

### 2. Editar Página Sobre
- Título
- Conteúdo (texto)
- Imagem

### 3. Gerenciar Exposições
- **Criar:** Adicionar novas exposições
- **Editar:** Modificar exposições existentes
- **Excluir:** Remover exposições
- **Ordem:** As exposições são ordenadas automaticamente pela ordem de criação

### 4. Gerenciar Coleções
- **Criar:** Adicionar novas coleções
- **Editar:** Modificar coleções existentes
- **Excluir:** Remover coleções
- **Ordem:** As coleções são ordenadas automaticamente pela ordem de criação

### 5. Gerenciar Eventos
- **Criar:** Adicionar novos eventos
- **Editar:** Modificar eventos existentes
- **Excluir:** Remover eventos
- **Ordem:** Os eventos são ordenados automaticamente pela ordem de criação

### 6. Editar Informações de Contato
- Endereço
- Telefone
- Email
- Horário de funcionamento

### 7. Configurar WhatsApp
- Número do WhatsApp (formato: código do país + DDD + número)
- Exemplo: `5511999999999` (55 = Brasil, 11 = DDD, 999999999 = número)

## Upload de Imagens

1. Clique no campo de upload de imagem
2. Selecione a imagem desejada
3. A imagem será enviada automaticamente
4. O link será preenchido automaticamente no campo de URL

## Alterações

Todas as alterações feitas no painel administrativo são refletidas imediatamente no site público.

## Segurança

- Altere a senha padrão em `php/config.php`
- Mantenha o arquivo `php/config.php` seguro
- Não compartilhe suas credenciais de acesso

