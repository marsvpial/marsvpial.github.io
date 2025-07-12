// JavaScript para a página About Me

// Cache dos textos da interface
const textCache = new Map();

// Links das redes sociais
const socialLinks = {
    instagram: 'https://instagram.com/carolcondeco', // Substitua pelo link real
    linkedin: 'https://linkedin.com/in/carolcondeco'  // Substitua pelo link real
};

// Inicialização da página About Me
document.addEventListener('DOMContentLoaded', () => {
    initializeAboutPage();
});

function initializeAboutPage() {
    // Carregar textos da interface
    loadInterfaceTexts().then(() => {
        // Configurar tema inicial
        setupThemeSystem();
        
        // Configurar links sociais
        setupSocialLinks();
        
        // Configurar imagem de perfil
        setupProfileImage();
        
        // Atualizar textos da página
        updatePageTexts();
        
        console.log('Página About Me carregada com sucesso!');
    });
}

// Sistema de temas (mesmo do index)
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
    
    // Event listener para mudança de tema
    toggleSwitch.addEventListener('change', switchTheme);
}

function switchTheme(e) {
    const theme = e.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeColors();
}

function updateThemeColors() {
    // Configuração de cores dos temas (mesmo do index)
    const themeColors = {
        light: {
            hoverBg: '#f0f0f0'
        },
        dark: {
            hoverBg: '#333333'
        }
    };
    
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const colors = themeColors[currentTheme];
    
    const root = document.documentElement;
    root.style.setProperty('--hover-bg', colors.hoverBg);
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

function setupProfileImage() {
    const profileImage = document.getElementById('profile-image');
    const placeholder = document.getElementById('image-placeholder');
    
    // Verificar se a imagem existe
    if (profileImage) {
        profileImage.onerror = function() {
            // Se a imagem não carregar, mostrar placeholder
            profileImage.style.display = 'none';
            placeholder.style.display = 'flex';
        };
        
        profileImage.onload = function() {
            // Se a imagem carregar, esconder placeholder
            placeholder.style.display = 'none';
            profileImage.style.display = 'block';
        };
    }
}

// Sistema de carregamento de textos
async function loadInterfaceTexts() {
    const textFiles = [
        'aboutme_titulo.txt',
        'aboutme_link_portfolio.txt',
        'aboutme_nome.txt',
        'aboutme_descricao.txt',
        'aboutme_secao_habilidades.txt',
        'skill1_titulo.txt',
        'skill1_descricao.txt',
        'skill1_emoji.txt',
        'skill2_titulo.txt',
        'skill2_descricao.txt',
        'skill2_emoji.txt',
        'skill3_titulo.txt',
        'skill3_descricao.txt',
        'skill3_emoji.txt',
        'skill4_titulo.txt',
        'skill4_descricao.txt',
        'skill4_emoji.txt',
        'skill5_titulo.txt',
        'skill5_descricao.txt',
        'skill5_emoji.txt',
        'skill6_titulo.txt',
        'skill6_descricao.txt',
        'skill6_emoji.txt',
        'aboutme_secao_experiencia.txt',
        'exp1_data.txt',
        'exp1_cargo.txt',
        'exp1_descricao.txt',
        'exp2_data.txt',
        'exp2_cargo.txt',
        'exp2_descricao.txt',
        'exp3_data.txt',
        'exp3_cargo.txt',
        'exp3_descricao.txt',
        'contato_titulo.txt',
        'contato_descricao.txt',
        'contato_email.txt',
        'contato_telefone.txt',
        'contato_email_emoji.txt',
        'contato_telefone_emoji.txt',
        'aboutme_copyright.txt'
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

function updatePageTexts() {
    // Atualizar título do header
    const headerTitle = document.getElementById('header-title');
    if (headerTitle) {
        headerTitle.textContent = textCache.get('aboutme_titulo') || '[TITULO_ABOUTME]';
    }
    
    // Atualizar link do portfolio
    const backLink = document.querySelector('.back-link span:last-child');
    if (backLink) {
        backLink.textContent = textCache.get('aboutme_link_portfolio') || '[LINK_PORTFOLIO]';
    }
    
    // Atualizar nome
    const introTitle = document.querySelector('.intro-text h2');
    if (introTitle) {
        introTitle.textContent = textCache.get('aboutme_nome') || '[NOME_APRESENTACAO]';
    }
    
    // Atualizar descrição
    const introDescription = document.querySelector('.intro-description');
    if (introDescription) {
        introDescription.textContent = textCache.get('aboutme_descricao') || '[DESCRICAO_PESSOAL]';
    }
    
    // Atualizar seção de habilidades
    const skillsTitle = document.querySelector('.skills-section h3');
    if (skillsTitle) {
        skillsTitle.textContent = textCache.get('aboutme_secao_habilidades') || '[TITULO_HABILIDADES]';
    }
    
    // Atualizar habilidades individuais
    updateSkills();
    
    // Atualizar seção de experiência
    const expTitle = document.querySelector('.experience-section h3');
    if (expTitle) {
        expTitle.textContent = textCache.get('aboutme_secao_experiencia') || '[TITULO_EXPERIENCIA]';
    }
    
    // Atualizar experiências individuais
    updateExperiences();
    
    // Atualizar seção de contato
    const contactTitle = document.querySelector('.contact-section h3');
    if (contactTitle) {
        contactTitle.textContent = textCache.get('contato_titulo') || '[TITULO_CONTATO]';
    }
    
    const contactDesc = document.querySelector('.contact-section p');
    if (contactDesc) {
        contactDesc.textContent = textCache.get('contato_descricao') || '[DESCRICAO_CONTATO]';
    }
    
    // Atualizar informações de contato
    updateContactInfo();
    
    // Atualizar emojis de contato
    updateContactEmojis();
    
    // Atualizar copyright
    const footerText = document.querySelector('.footer-text');
    if (footerText) {
        footerText.textContent = textCache.get('aboutme_copyright') || '[COPYRIGHT_TEXTO]';
    }
}

function updateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        const skillNumber = index + 1;
        const emojiElement = item.querySelector('.skill-icon');
        const titleElement = item.querySelector('h4');
        const descElement = item.querySelector('p');
        
        if (emojiElement) {
            emojiElement.textContent = textCache.get(`skill${skillNumber}_emoji`) || `[EMOJI_SKILL${skillNumber}]`;
        }
        
        if (titleElement) {
            titleElement.textContent = textCache.get(`skill${skillNumber}_titulo`) || `[TITULO_SKILL${skillNumber}]`;
        }
        
        if (descElement) {
            descElement.textContent = textCache.get(`skill${skillNumber}_descricao`) || `[DESCRICAO_SKILL${skillNumber}]`;
        }
    });
}

function updateExperiences() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const expNumber = index + 1;
        const dateElement = item.querySelector('.timeline-date');
        const titleElement = item.querySelector('h4');
        const descElement = item.querySelector('p');
        
        if (dateElement) {
            dateElement.textContent = textCache.get(`exp${expNumber}_data`) || `[DATA_EXP${expNumber}]`;
        }
        
        if (titleElement) {
            titleElement.textContent = textCache.get(`exp${expNumber}_cargo`) || `[CARGO_EXP${expNumber}]`;
        }
        
        if (descElement) {
            descElement.textContent = textCache.get(`exp${expNumber}_descricao`) || `[DESCRICAO_EXP${expNumber}]`;
        }
    });
}

function updateContactEmojis() {
    const emailIcon = document.querySelector('.contact-link .contact-icon');
    const phoneIcon = document.querySelectorAll('.contact-link .contact-icon')[1];
    
    if (emailIcon) {
        emailIcon.textContent = textCache.get('contato_email_emoji') || '[EMOJI_EMAIL]';
    }
    
    if (phoneIcon) {
        phoneIcon.textContent = textCache.get('contato_telefone_emoji') || '[EMOJI_TELEFONE]';
    }
}

function updateContactInfo() {
    const emailText = document.querySelector('.contact-link span:last-child');
    const phoneText = document.querySelectorAll('.contact-link span:last-child')[1];
    
    if (emailText) {
        emailText.textContent = textCache.get('contato_email') || '[EMAIL_CONTATO]';
    }
    
    if (phoneText) {
        phoneText.textContent = textCache.get('contato_telefone') || '[TELEFONE_CONTATO]';
    }
}
