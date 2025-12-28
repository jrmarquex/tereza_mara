# Como Funciona o Sistema de Edição

## ✅ Sim, todas as alterações refletem no site!

### Como funciona:

1. **Você edita no painel admin** → Os dados são salvos em arquivos JSON na pasta `data/`
2. **O site público carrega dinamicamente** → O JavaScript nas páginas busca os dados atualizados
3. **As alterações aparecem imediatamente** → Sem precisar recarregar ou fazer deploy

### O que é editável:

#### 📄 **Página Inicial (index.html)**
- ✅ Título do Hero
- ✅ Subtítulo do Hero  
- ✅ Descrição do Hero
- ✅ Imagem do Hero
- ✅ Texto de introdução
- ✅ Título da seção Sobre
- ✅ Texto da seção Sobre
- ✅ Imagem da seção Sobre

#### 📖 **Página Sobre (sobre.html)**
- ✅ Título da página
- ✅ Todo o conteúdo de texto
- ✅ Imagem da página

#### 🎨 **Exposições (exposicoes.html)**
- ✅ Criar novas exposições
- ✅ Editar exposições existentes
- ✅ Excluir exposições
- ✅ Ordem automática (mantém visual estético)

#### 🗂️ **Coleções (colecoes.html)**
- ✅ Criar novas coleções
- ✅ Editar coleções existentes
- ✅ Excluir coleções
- ✅ Ordem automática (mantém visual estético)

#### 📅 **Eventos (eventos.html)**
- ✅ Criar novos eventos
- ✅ Editar eventos existentes
- ✅ Excluir eventos
- ✅ Ordem automática (mantém visual estético)

#### 📞 **Contato (contato.html)**
- ✅ Endereço completo
- ✅ Telefones
- ✅ Emails
- ✅ Horário de funcionamento

#### 💬 **WhatsApp**
- ✅ Número do WhatsApp (atualiza o botão flutuante em todas as páginas)

### Como testar:

1. **Edite algo no painel admin**
2. **Salve as alterações**
3. **Abra o site público** (`http://localhost/Site_t/index.html`)
4. **Recarregue a página** (F5 ou Ctrl+F5)
5. **Veja as alterações aparecerem!**

### Observações importantes:

- ⚠️ As alterações são salvas em tempo real
- ⚠️ Não é necessário fazer deploy ou rebuild
- ⚠️ O sistema funciona localmente e em produção
- ⚠️ As imagens podem ser URLs externas ou uploads locais

### Estrutura de dados:

Os dados são salvos em:
- `data/content.json` - Conteúdo das páginas
- `data/exposicoes.json` - Lista de exposições
- `data/colecoes.json` - Lista de coleções  
- `data/eventos.json` - Lista de eventos

Tudo é gerenciado automaticamente pelo sistema!

