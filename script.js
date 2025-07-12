// Cache dos textos da interface
const textCache = new Map();

// Configuração de cores dos temas
const themeColors = {
    light: {
        background: '#ffffff',
        header: '#f8f8f8',
        text: '#333',
        shadow: 'rgba(0,0,0,0.1)',
        hoverBg: '#f0f0f0'
    },
    dark: {
        background: '#1a1a1a',
        header: '#2d2d2d',
        text: '#ffffff',
        shadow: 'rgba(0,0,0,0.3)',
        hoverBg: '#333333'
    }
};

// Links das redes sociais
const socialLinks = {
    instagram: 'https://instagram.com/carolcondeco', // Substitua pelo link real
    linkedin: 'https://linkedin.com/in/carolcondeco'  // Substitua pelo link real
};

// Cache dos projetos
const projectsCache = new Map();
const totalProjects = 10;

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', async () => {
    await initializeApp();
});

async function initializeApp() {
    try {
        // Carregar textos da interface
        await loadInterfaceTexts();
        
        // Configurar tema inicial
        setupThemeSystem();
        
        // Configurar links sociais
        setupSocialLinks();
        
        // Carregar todos os projetos em cache
        await loadAllProjectsToCache();
        
        // Criar grid de projetos
        createProjectsGrid();
        
        // Configurar eventos de hover
        setupHoverEffects();
        
        // Atualizar textos da página
        updatePageTexts();
        
        console.log('Aplicação carregada com sucesso!');
    } catch (error) {
        console.error('Erro ao inicializar aplicação:', error);
        showErrorMessage('Erro ao carregar o portfolio. Verifique se todos os arquivos estão no local correto.');
    }
}

// Sistema de temas
function setupThemeSystem() {
    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');

    // Aplicar tema salvo
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    // Configurar variáveis CSS
    updateThemeColors();
    
    // Atualizar título do header baseado no tema inicial
    const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateHeaderTitle(initialTheme);

    // Event listener para mudança de tema
    toggleSwitch.addEventListener('change', switchTheme);
}

function switchTheme(e) {
    const theme = e.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeColors();
    updateHeaderTitle(theme);
}

function updateHeaderTitle(theme) {
    const headerTitle = document.getElementById('header-title');
    const textKey = theme === 'dark' ? 'index_titulo_dark' : 'index_titulo';
    const text = textCache.get(textKey) || '[TITULO_PRINCIPAL]';
    headerTitle.textContent = text;
}

function updateThemeColors() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const colors = themeColors[currentTheme];
    
    const root = document.documentElement;
    root.style.setProperty('--hover-bg', colors.hoverBg);
}

// Sistema de cache
async function loadAllProjectsToCache() {
    const loadPromises = [];
    
    for (let i = 1; i <= totalProjects; i++) {
        loadPromises.push(loadProjectData(i));
    }
    
    await Promise.all(loadPromises);
    console.log(`${projectsCache.size} projetos carregados em cache`);
}

async function loadProjectData(projectNumber) {
    const projectName = `projeto${projectNumber}`;
    const basePath = `projetos/${projectName}`;
    
    try {
        // Carregar nome do projeto
        const name = await loadTextFile(`${basePath}/nome/projetoNome.txt`);
        
        // Carregar descrição do projeto
        const description = await loadTextFile(`${basePath}/texto/projetoDescricao.txt`);
        
        // Carregar lista de imagens (simulado - em produção seria uma API)
        const images = await loadProjectImages(basePath);
        
        // Armazenar no cache
        projectsCache.set(projectName, {
            name: name || `Projeto ${projectNumber}`,
            description: description || `Descrição do projeto ${projectNumber}`,
            images: images,
            currentImageSet: 0 // Para controle do carrossel
        });
        
    } catch (error) {
        console.warn(`Erro ao carregar ${projectName}:`, error);
        // Adicionar dados padrão se houver erro
        projectsCache.set(projectName, {
            name: `Projeto ${projectNumber}`,
            description: `Descrição do projeto ${projectNumber}`,
            images: [],
            currentImageSet: 0
        });
    }
}

async function loadTextFile(filePath) {
    try {
        const response = await fetch(filePath, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const text = await response.text();
        return text.trim().replace(/[^\x20-\x7E\u00C0-\u017F]/g, ''); // Remove caracteres problemáticos
    } catch (error) {
        console.warn(`Erro ao carregar ${filePath}:`, error);
        return '';
    }
}

async function loadProjectImages(basePath) {
    // Tentar carregar mais imagens (até 10)
    const commonImageNames = [
        'image1.png', 'image2.png', 'image3.png', 'image4.png', 'image5.png',
        'image6.png', 'image7.png', 'image8.png', 'image9.png', 'image10.png'
    ];
    const images = [];
    
    for (const imageName of commonImageNames) {
        const imagePath = `${basePath}/imagens/${imageName}`;
        try {
            // Verificar se a imagem existe tentando carregá-la
            const img = new Image();
            img.src = imagePath;
            
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                setTimeout(reject, 1000); // Timeout de 1s
            });
            
            images.push(imagePath);
        } catch (error) {
            // Imagem não existe ou não carregou
            continue;
        }
    }
    
    return images;
}

// Criação da interface
function createProjectsGrid() {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    
    for (let i = 1; i <= totalProjects; i++) {
        const projectName = `projeto${i}`;
        const projectData = projectsCache.get(projectName);
        
        if (projectData) {
            const projectElement = createProjectElement(projectData, i - 1);
            container.appendChild(projectElement);
        }
    }
}

function createProjectElement(projectData, index) {
    const projectRow = document.createElement('div');
    projectRow.className = 'project-row';
    projectRow.dataset.projectIndex = index;
    
    // Título do projeto
    const title = document.createElement('h2');
    title.className = 'project-title';
    title.textContent = projectData.name;
    
    // Container de imagens
    const imagesContainer = document.createElement('div');
    imagesContainer.className = 'project-images-wrapper';
    
    // Criar 3 slots de imagem
    for (let i = 0; i < 3; i++) {
        const currentImageIndex = projectData.currentImageSet * 3 + i;
        const imageSrc = projectData.images[currentImageIndex];
        const imageElement = createImageElement(imageSrc, i, index, currentImageIndex);
        imagesContainer.appendChild(imageElement);
    }
    
    // Adicionar seta do carrossel se há mais de 3 imagens
    if (projectData.images.length > 3) {
        const carouselArrow = createCarouselArrow(index);
        imagesContainer.appendChild(carouselArrow);
        
        // Indicador de posição
        const indicator = createCarouselIndicator(projectData);
        imagesContainer.appendChild(indicator);
    }
    
    // Descrição do projeto
    const description = document.createElement('p');
    description.className = 'project-description';
    description.textContent = projectData.description;
    
    // Montar elemento
    projectRow.appendChild(title);
    projectRow.appendChild(imagesContainer);
    projectRow.appendChild(description);
    
    return projectRow;
}

function createImageElement(imageSrc, imageIndex, projectIndex, actualImageIndex) {
    if (imageSrc) {
        const img = document.createElement('img');
        img.className = 'project-image';
        img.src = imageSrc;
        img.alt = `Imagem ${actualImageIndex + 1} do projeto`;
        img.dataset.imageIndex = imageIndex;
        img.dataset.actualIndex = actualImageIndex;
        
        // Definir estado inicial (visibilidade e cor)
        const isVisible = calculateVisibleImageIndex(projectIndex) === imageIndex;
        img.classList.add(isVisible ? 'visible' : 'hidden');
        img.classList.add('grayscale'); // Todas começam em PB
        
        return img;
    } else {
        // Placeholder para imagem não encontrada
        const placeholder = document.createElement('div');
        placeholder.className = 'project-image image-placeholder hidden';
        placeholder.textContent = 'Imagem não encontrada';
        placeholder.dataset.imageIndex = imageIndex;
        return placeholder;
    }
}

function createCarouselArrow(projectIndex) {
    const arrow = document.createElement('button');
    arrow.className = 'carousel-arrow';
    arrow.innerHTML = '→';
    arrow.dataset.projectIndex = projectIndex;
    
    arrow.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar trigger do hover
        nextImageSet(projectIndex);
    });
    
    return arrow;
}

function createCarouselIndicator(projectData) {
    const indicator = document.createElement('div');
    indicator.className = 'carousel-indicator';
    updateIndicatorText(indicator, projectData);
    return indicator;
}

function updateIndicatorText(indicator, projectData) {
    const totalSets = Math.ceil(projectData.images.length / 3);
    const currentSet = projectData.currentImageSet + 1;
    indicator.textContent = `${currentSet}/${totalSets}`;
}

function nextImageSet(projectIndex) {
    const projectName = `projeto${projectIndex + 1}`;
    const projectData = projectsCache.get(projectName);
    
    if (!projectData || projectData.images.length <= 3) return;
    
    const totalSets = Math.ceil(projectData.images.length / 3);
    projectData.currentImageSet = (projectData.currentImageSet + 1) % totalSets;
    
    // Atualizar as imagens
    updateProjectImages(projectIndex);
}

function updateProjectImages(projectIndex) {
    const projectName = `projeto${projectIndex + 1}`;
    const projectData = projectsCache.get(projectName);
    const projectRow = document.querySelector(`[data-project-index="${projectIndex}"]`);
    
    if (!projectRow || !projectData) return;
    
    const images = projectRow.querySelectorAll('.project-image');
    const indicator = projectRow.querySelector('.carousel-indicator');
    
    // Atualizar cada slot de imagem
    images.forEach((img, slotIndex) => {
        const currentImageIndex = projectData.currentImageSet * 3 + slotIndex;
        const imageSrc = projectData.images[currentImageIndex];
        
        if (imageSrc && img.tagName === 'IMG') {
            img.src = imageSrc;
            img.alt = `Imagem ${currentImageIndex + 1} do projeto`;
            img.dataset.actualIndex = currentImageIndex;
            img.style.opacity = '0';
            
            // Animação de fade in
            setTimeout(() => {
                img.style.opacity = '1';
            }, 150);
        } else if (!imageSrc) {
            // Esconder slot se não há imagem
            img.style.opacity = '0';
        }
    });
    
    // Atualizar indicador
    if (indicator) {
        updateIndicatorText(indicator, projectData);
    }
}

// Sistema de hover
function setupHoverEffects() {
    const projectRows = document.querySelectorAll('.project-row');
    
    projectRows.forEach((row, index) => {
        row.addEventListener('mouseenter', () => updateProjectStates(index));
        row.addEventListener('mouseleave', () => updateProjectStates(-1));
    });
}

function updateProjectStates(hoveredIndex) {
    const projectRows = document.querySelectorAll('.project-row');
    
    projectRows.forEach((row, index) => {
        const isHovered = index === hoveredIndex;
        setProjectHoverState(row, isHovered, index);
    });
}

function setProjectHoverState(projectRow, isHovered, projectIndex) {
    // Gerenciar visibilidade e cor das imagens
    setImageStates(projectRow, isHovered, projectIndex);
    
    // Gerenciar visibilidade da descrição
    setDescriptionState(projectRow, isHovered);
}

function setImageStates(projectRow, isHovered, projectIndex) {
    const images = projectRow.querySelectorAll('.project-image');
    const visibleImageIndex = calculateVisibleImageIndex(projectIndex);
    
    images.forEach((img, imageIndex) => {
        // Remover todas as classes de estado
        img.classList.remove('visible', 'hidden', 'grayscale', 'colored');
        
        if (isHovered) {
            // Projeto com hover: todas as imagens visíveis e coloridas
            img.classList.add('visible', 'colored');
        } else {
            // Projeto sem hover: apenas uma imagem visível em PB
            if (imageIndex === visibleImageIndex) {
                img.classList.add('visible', 'grayscale');
            } else {
                img.classList.add('hidden', 'grayscale');
            }
        }
    });
}

function setDescriptionState(projectRow, isVisible) {
    const description = projectRow.querySelector('.project-description');
    
    if (isVisible) {
        description.classList.add('visible');
    } else {
        description.classList.remove('visible');
    }
}

// Utilitários
function calculateVisibleImageIndex(projectIndex) {
    // Padrão diagonal: projeto 0 -> imagem 0, projeto 1 -> imagem 1, etc.
    return projectIndex % 3;
}

function showErrorMessage(message) {
    const container = document.getElementById('projects-container');
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-color);">
            <h3>Erro ao carregar portfolio</h3>
            <p>${message}</p>
        </div>
    `;
}

function setupSocialLinks() {
    const instagramLink = document.getElementById('instagram-link');
    const linkedinLink = document.getElementById('linkedin-link');
    
    if (instagramLink) {
        instagramLink.href = socialLinks.instagram;
    }
    
    if (linkedinLink) {
        linkedinLink.href = socialLinks.linkedin;
    }
}

// Sistema de carregamento de textos
async function loadInterfaceTexts() {
    const textFiles = [
        'index_titulo.txt',
        'index_titulo_dark.txt',
        'index_link_aboutme.txt',
        'index_link_instagram.txt',
        'index_link_linkedin.txt',
        'index_copyright.txt'
    ];
    
    const loadPromises = textFiles.map(async (filename) => {
        try {
            const response = await fetch(`ur_Info/${filename}`);
            if (response.ok) {
                const text = await response.text();
                textCache.set(filename.replace('.txt', ''), text.trim());
            }
        } catch (error) {
            console.warn(`Erro ao carregar ${filename}:`, error);
        }
    });
    
    await Promise.all(loadPromises);
    console.log('Textos da interface carregados:', textCache.size);
}

// Atualizar textos da página
function updatePageTexts() {
    // Atualizar link About Me
    const aboutMeLink = document.querySelector('.about-me-link span:last-child');
    if (aboutMeLink) {
        aboutMeLink.textContent = textCache.get('index_link_aboutme') || '[LINK_ABOUTME]';
    }
    
    // Atualizar links sociais
    const instagramLink = document.querySelector('#instagram-link');
    const linkedinLink = document.querySelector('#linkedin-link');
    
    if (instagramLink) {
        instagramLink.textContent = textCache.get('index_link_instagram') || '[LINK_INSTAGRAM]';
    }
    
    if (linkedinLink) {
        linkedinLink.textContent = textCache.get('index_link_linkedin') || '[LINK_LINKEDIN]';
    }
    
    // Atualizar copyright
    const footerText = document.querySelector('.footer-text');
    if (footerText) {
        footerText.textContent = textCache.get('index_copyright') || '[COPYRIGHT_INDEX]';
    }
}
