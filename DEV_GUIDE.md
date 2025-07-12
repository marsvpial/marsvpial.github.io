# Guia de Desenvolvimento - Portfolio Carol Condeço

## Visão Geral do Projeto
Este é um site portfolio para a designer Carol Condeço (Marsvpial). O site apresenta seus projetos de design de forma elegante e profissional.

## Arquitetura do Sistema

### Estrutura de Dados dos Projetos
Cada projeto (projeto1 a projeto10) segue esta estrutura obrigatória:

```
projetoX/
├── imagens/                 # Pasta com imagens PNG dos projetos
├── nome/
│   └── projetoNome.txt     # Nome/título do projeto (uma linha)
└── texto/
    └── projetoDescricao.txt # Descrição completa do projeto
```

### Lógica de Carregamento de Conteúdo
1. O JavaScript deve ler os arquivos `.txt` de cada projeto
2. Carregar dinamicamente as imagens da pasta `imagens/`
3. Criar cards/seções para cada projeto no site
4. Exibir nome e descrição vindos dos arquivos de texto

### Funcionalidades Implementadas
- ✅ Header com nome da designer
- ✅ Toggle de tema claro/escuro
- ✅ Sistema de variáveis CSS para cores
- ✅ Persistência de tema no localStorage

### Funcionalidades a Implementar
- [ ] Grid/galeria de projetos
- [ ] Carregamento dinâmico do conteúdo dos projetos
- [ ] Modal/popup para visualização detalhada dos projetos
- [ ] Animações e transições suaves
- [ ] Sistema de filtros/categorias
- [ ] Navegação entre projetos
- [ ] Responsividade completa

## Padrões de Desenvolvimento

### Convenções de CSS
- Usar variáveis CSS para cores e temas
- Aplicar transições suaves (0.3s ease)
- Manter consistência no design
- Usar unidades relativas (rem, %, vh/vw)

### Convenções de JavaScript
- Usar addEventListener para eventos
- Implementar verificação de erros
- Manter código modular e reutilizável
- Comentar funcionalidades complexas

### Estrutura de Arquivos
- Manter separação clara entre HTML, CSS e JS
- Organizar CSS por seções (globais, componentes, layouts)
- Usar nomes descritivos para classes e IDs

## Fluxo de Dados

### Carregamento de Projetos
1. JavaScript lista as pastas projeto1-projeto10
2. Para cada pasta, lê:
   - `nome/projetoNome.txt` → título do projeto
   - `texto/projetoDescricao.txt` → descrição
   - `imagens/*.png` → lista de imagens
3. Cria elementos HTML dinamicamente
4. Aplica estilos baseados no tema atual

### Gerenciamento de Estado
- Tema atual (claro/escuro) → localStorage
- Projeto ativo/selecionado → variável JavaScript
- Estado do modal → classes CSS

## Diretrizes de Design

### Cores e Temas
- Modo claro: tons neutros, fundo branco
- Modo escuro: tons escuros, contraste adequado
- Cores de destaque: manter consistência

### Layout
- Design limpo e minimalista
- Foco no conteúdo dos projetos
- Navegação intuitiva
- Responsividade em todas as telas

### Tipografia
- Font principal: Arial, sans-serif
- Hierarquia clara de tamanhos
- Boa legibilidade em ambos os temas

## Comandos Úteis para Desenvolvimento

### Estrutura de Pastas (Windows)
```bash
# Criar pastas dos projetos
mkdir projetos\projeto1\imagens projetos\projeto1\nome projetos\projeto1\texto

# Criar arquivos de texto
echo. > projetos\projeto1\nome\projetoNome.txt
echo. > projetos\projeto1\texto\projetoDescricao.txt
```

## Considerações Técnicas

### Performance
- **Sistema de Cache**: Todos os dados dos projetos carregados na inicialização
- **Sem lag**: Dados em memória para hover instantâneo
- Lazy loading para imagens (se necessário)
- Minificação de CSS/JS em produção
- Otimização de imagens

## Sistema de Cache e Performance

### Estrutura do Cache
```javascript
const projectsCache = new Map();
// Estrutura: projectsCache.set('projeto1', { name, description, images })
```

### Carregamento Inicial
1. `loadAllProjectsToCache()` executada no `DOMContentLoaded`
2. Lê todos os `projetoNome.txt` e `projetoDescricao.txt`
3. Lista todas as imagens de cada pasta `imagens/`
4. Armazena tudo em cache para acesso instantâneo

### Variáveis de Cores Dinâmicas
```javascript
// Definidas no início do script.js
const themeColors = {
  light: {
    background: '#ffffff',
    header: '#f8f8f8',
    text: '#333',
    shadow: 'rgba(0,0,0,0.1)',
    hoverBg: '#f0f0f0' // Cor de hover modo claro
  },
  dark: {
    background: '#1a1a1a', 
    header: '#2d2d2d',
    text: '#ffffff',
    shadow: 'rgba(0,0,0,0.3)',
    hoverBg: '#333333' // Cor de hover modo escuro
  }
}
```

### Estados de Hover Completos
1. **Background**: Muda cor da linha com hover
2. **Imagens**: 
   - Projeto com hover: todas visíveis e coloridas
   - Outros projetos: diagonal em preto e branco
3. **Descrição**: Visível apenas no projeto com hover
4. **Transições**: Suaves em todas as mudanças

### Arquitetura de Funções Atualizada
```javascript
// Inicialização
initializeApp()
loadAllProjectsToCache()
setupThemeColors()

// Criação de UI
createProjectsGrid() 
renderProject(projectData, index)

// Gerenciamento de Estados  
setupHoverEffects()
updateProjectStates(hoveredIndex)
setProjectHoverState(project, isHovered)
setImageStates(project, isHovered, visibleIndex)
setDescriptionState(project, isVisible)
setBackgroundState(project, isHovered)

// Utilitários
calculateVisibleImageIndex(index)
getProjectFromCache(projectName)
```

### Acessibilidade
- Alt text para imagens
- Contraste adequado entre cores
- Navegação por teclado
- Semântica HTML correta

### Compatibilidade
- Suporte a navegadores modernos
- Fallbacks para funcionalidades CSS avançadas
- Testes em diferentes dispositivos
