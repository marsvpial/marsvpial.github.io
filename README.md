# Portfolio Designer Carol Condeço

Um site portfolio moderno e profissional para apresentar trabalhos de design de forma elegante e interativa.

## 📋 Resumo do Projeto

Este é um site portfolio completo desenvolvido especialmente para designers que precisam apresentar seus trabalhos de forma profissional. O site inclui:

- **Página principal** com galeria de projetos em grade
- **Página About Me** com informações pessoais, habilidades e experiência
- **Sistema de temas** claro/escuro com alternância automática
- **Design responsivo** que funciona em computadores, tablets e celulares
- **Sistema de carrossel** para visualizar múltiplas imagens de cada projeto
- **Navegação intuitiva** entre as páginas
- **Efeitos visuais** modernos com transições suaves

## 🔧 Explicação Técnica

### Arquitetura do Sistema
- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Estrutura**: Sistema modular com separação de responsabilidades
- **Temas**: CSS Custom Properties com alternância dinâmica
- **Performance**: Sistema de cache para carregamento otimizado
- **Responsividade**: Media queries e layout flexível
- **Acessibilidade**: Semântica HTML adequada e navegação por teclado

### Funcionalidades Implementadas
1. **Sistema de carregamento dinâmico** de conteúdo via fetch API
2. **Cache inteligente** para melhor performance
3. **Gerenciamento de estado** para temas e navegação
4. **Sistema de carrossel** com controles de navegação
5. **Validação automática** de imagens com fallbacks
6. **Persistência** de preferências no localStorage

## 👥 Para Pessoas Sem Conhecimento Técnico

Este site é como um **álbum digital inteligente** para mostrar seus trabalhos de design.

### O que o site faz:
- **Mostra seus projetos** em uma galeria bonita na página principal
- **Apresenta você** na página "About Me" com suas informações pessoais
- **Muda de aparência** - você pode escolher entre modo claro (fundo branco) ou escuro (fundo preto)
- **Funciona em qualquer dispositivo** - computador, tablet ou celular
- **Permite navegar** pelas fotos de cada projeto como se fosse um álbum

### Como funciona:
O site lê automaticamente as informações que você colocar em arquivos de texto simples (como bloco de notas) e mostra na tela de forma bonita. Você não precisa mexer em código - apenas editar textos e trocar imagens!

## 📖 Manual de Utilização - Como Editar o Site

### 🎯 IMPORTANTE - LEIA PRIMEIRO!
- **NUNCA** mude os nomes das pastas
- **NUNCA** mude os nomes dos arquivos .txt
- **SEMPRE** mantenha a estrutura de pastas como está
- **SEMPRE** faça backup antes de qualquer alteração

---

### 📝 Como Alterar os Textos

Todos os textos do site estão salvos em arquivos simples que você pode abrir com o Bloco de Notas do Windows.

#### Passo a passo:
1. **Abra a pasta `ur_Info`**
2. **Encontre o arquivo .txt** que corresponde ao texto que você quer alterar
3. **Clique duas vezes** no arquivo para abrir no Bloco de Notas
4. **Edite o texto** como desejar
5. **Salve o arquivo** (Ctrl+S)
6. **Atualize o site** no navegador (F5) para ver a mudança

#### Lista de arquivos de texto importantes:

**Para a página principal:**
- `index_titulo.txt` - Seu nome no modo claro
- `index_titulo_dark.txt` - Seu nome/apelido no modo escuro
- `index_link_aboutme.txt` - Texto do botão "About Me"

**Para a página About Me:**
- `aboutme_nome.txt` - Sua apresentação (ex: "Olá! Eu sou a Carol")
- `aboutme_descricao.txt` - Sua descrição profissional
- `skill1_titulo.txt` até `skill6_titulo.txt` - Títulos das suas habilidades
- `skill1_descricao.txt` até `skill6_descricao.txt` - Descrições das habilidades
- `exp1_cargo.txt`, `exp2_cargo.txt`, `exp3_cargo.txt` - Seus cargos/trabalhos
- `contato_email.txt` - Seu email
- `contato_telefone.txt` - Seu telefone

**Para projetos:**
- Cada projeto tem uma pasta `projetos/projeto1/`, `projetos/projeto2/`, etc.
- Dentro de cada pasta projeto:
  - `nome/projetoNome.txt` - Nome do projeto
  - `texto/projetoDescricao.txt` - Descrição do projeto

---

### 🖼️ Como Alterar as Imagens

#### Para a foto de perfil:
1. **Prepare sua foto** no formato PNG (recomendado) ou JPG
2. **Redimensione para 400x400 pixels** (quadrada)
3. **Comprima a imagem** para ficar menor que 500KB
4. **Renomeie para `profile.png`** (exatamente assim, sem espaços)
5. **Coloque na pasta `assets/`** substituindo a existente

#### Para imagens dos projetos:
Cada projeto pode ter até 5 imagens que aparecerão no carrossel.

**Regras importantes:**
- **Formato**: PNG (recomendado) ou JPG
- **Nomes obrigatórios**: `image1.png`, `image2.png`, `image3.png`, `image4.png`, `image5.png`
- **Tamanho máximo**: 1MB por imagem (recomendado: 500KB ou menos)
- **Dimensões recomendadas**: 1200x800 pixels (landscape) ou 800x1200 (portrait)

#### Passo a passo para trocar imagens de projetos:
1. **Abra a pasta do projeto** (ex: `projetos/projeto1/imagens/`)
2. **Prepare suas novas imagens**:
   - Redimensione para o tamanho adequado
   - Comprima para reduzir o tamanho do arquivo
   - Renomeie para `image1.png`, `image2.png`, etc.
3. **Substitua as imagens existentes** pelas suas novas imagens
4. **Mantenha os nomes exatos**: `image1.png`, `image2.png`, etc.

#### ⚠️ Dicas importantes para imagens:
- **Use ferramentas online gratuitas** como TinyPNG.com para comprimir suas imagens
- **Imagens muito grandes** fazem o site ficar lento
- **Se você tem menos de 5 imagens** para um projeto, mantenha apenas as que precisa (ex: só `image1.png` e `image2.png`)
- **Qualidade recomendada**: 80-90% na compressão

---

### 🎨 Como Alterar Emojis

Os emojis também podem ser alterados editando arquivos .txt:

- `skill1_emoji.txt` até `skill6_emoji.txt` - Emojis das habilidades
- `contato_email_emoji.txt` - Emoji do email
- `contato_telefone_emoji.txt` - Emoji do telefone

Para trocar um emoji:
1. Copie o emoji desejado de qualquer lugar (Google, redes sociais, etc.)
2. Cole no arquivo .txt correspondente
3. Salve o arquivo

---

### 🚨 Solução de Problemas Comuns

**O texto não mudou após editar:**
- Verifique se salvou o arquivo
- Atualize a página do navegador (F5 ou Ctrl+F5)
- Verifique se editou o arquivo correto

**A imagem não aparece:**
- Verifique se o nome do arquivo está correto (image1.png, image2.png, etc.)
- Verifique se a imagem está na pasta correta
- Confirme se a imagem não está corrompida

**O site está lento:**
- Suas imagens podem estar muito grandes
- Comprima as imagens usando ferramentas online
- Reduza a qualidade das imagens para 80-90%

**Backup recomendado:**
Sempre faça uma cópia da pasta completa do site antes de fazer alterações importantes!

---
