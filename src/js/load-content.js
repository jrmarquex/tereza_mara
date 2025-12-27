// Carregar conteúdo dinâmico das páginas
async function loadContent() {
    try {
        const response = await fetch('php/api.php?path=content');
        const result = await response.json();
        if (result.success) {
            const data = result.data;
            
            // Atualizar WhatsApp
            if (data.whatsapp) {
                const whatsappButtons = document.querySelectorAll('.whatsapp-button');
                whatsappButtons.forEach(btn => {
                    btn.href = `https://wa.me/${data.whatsapp}`;
                });
            }
            
            // Atualizar página inicial
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                if (data.index) {
                    const heroTitle = document.querySelector('.hero-title');
                    const heroSubtitle = document.querySelector('.hero-subtitle');
                    const heroDescription = document.querySelector('.hero-description');
                    const heroImage = document.querySelector('.hero-image');
                    const introText = document.querySelector('.intro-text');
                    const aboutTitle = document.querySelector('.about-section h2');
                    const aboutText = document.querySelector('.about-section p');
                    const aboutImage = document.querySelector('.about-image img');
                    
                    if (heroTitle && data.index.hero_title) heroTitle.textContent = data.index.hero_title;
                    if (heroSubtitle && data.index.hero_subtitle) heroSubtitle.textContent = data.index.hero_subtitle;
                    if (heroDescription && data.index.hero_description) heroDescription.textContent = data.index.hero_description;
                    if (heroImage && data.index.hero_image) {
                        heroImage.style.backgroundImage = `url(${data.index.hero_image})`;
                    }
                    if (introText && data.index.intro_text) introText.textContent = data.index.intro_text;
                    if (aboutTitle && data.index.about_title) aboutTitle.textContent = data.index.about_title;
                    if (aboutText && data.index.about_text) aboutText.textContent = data.index.about_text;
                    if (aboutImage && data.index.about_image) aboutImage.src = data.index.about_image;
                }
            }
            
            // Atualizar página sobre
            if (window.location.pathname.includes('sobre.html')) {
                if (data.sobre) {
                    const title = document.querySelector('.about-text h1');
                    const content = document.querySelector('.about-text p');
                    const image = document.querySelector('.about-image img');
                    
                    if (title && data.sobre.title) title.textContent = data.sobre.title;
                    if (content && data.sobre.content) {
                        const paragraphs = data.sobre.content.split('\n');
                        const container = content.parentElement;
                        container.innerHTML = `<h1>${data.sobre.title || 'Sobre'}</h1>`;
                        paragraphs.forEach(p => {
                            if (p.trim()) {
                                const para = document.createElement('p');
                                para.textContent = p.trim();
                                container.appendChild(para);
                            }
                        });
                    }
                    if (image && data.sobre.image) image.src = data.sobre.image;
                }
            }
            
            // Atualizar página contato
            if (window.location.pathname.includes('contato.html')) {
                if (data.contato) {
                    const endereco = document.querySelector('.contact-item:nth-child(1) p');
                    const telefone = document.querySelector('.contact-item:nth-child(2) p');
                    const email = document.querySelector('.contact-item:nth-child(3) p');
                    const horario = document.querySelector('.contact-item:nth-child(4) p');
                    
                    if (endereco && data.contato.endereco) {
                        endereco.innerHTML = data.contato.endereco.replace(/\\n/g, '<br>');
                    }
                    if (telefone && data.contato.telefone) {
                        telefone.innerHTML = data.contato.telefone.replace(/\\n/g, '<br>');
                    }
                    if (email && data.contato.email) {
                        email.innerHTML = data.contato.email.replace(/\\n/g, '<br>');
                    }
                    if (horario && data.contato.horario) {
                        horario.innerHTML = data.contato.horario.replace(/\\n/g, '<br>');
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Carregar exposições dinamicamente
async function loadExposicoes() {
    try {
        const response = await fetch('php/api.php?path=exposicoes');
        const result = await response.json();
        if (result.success && result.data.length > 0) {
            const grid = document.querySelector('.exhibitions-grid');
            if (grid) {
                grid.innerHTML = '';
                result.data.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'exhibition-card';
                    card.innerHTML = `
                        <div class="exhibition-image">
                            <img src="${item.imagem || 'https://images.unsplash.com/photo-1541961018884-2234998574a9?w=800&q=80'}" alt="${item.titulo}">
                            <span class="exhibition-badge">${item.badge || 'Em Exibição'}</span>
                        </div>
                        <div class="exhibition-content">
                            <h2>${item.titulo}</h2>
                            <p class="exhibition-date">${item.data || 'Data não informada'}</p>
                            <p>${item.descricao || ''}</p>
                            <a href="#" class="btn-exhibition">Saiba mais</a>
                        </div>
                    `;
                    grid.appendChild(card);
                });
            }
        }
    } catch (error) {
        console.error('Error loading exposicoes:', error);
    }
}

// Carregar coleções dinamicamente
async function loadColecoes() {
    try {
        const response = await fetch('php/api.php?path=colecoes');
        const result = await response.json();
        if (result.success && result.data.length > 0) {
            const container = document.querySelector('.collections-categories');
            if (container) {
                container.innerHTML = '';
                result.data.forEach((item, index) => {
                    const category = document.createElement('div');
                    category.className = 'collection-category';
                    if (index % 2 === 1) {
                        category.style.direction = 'rtl';
                    }
                    const destaques = item.destaques ? item.destaques.map(d => `<li>${d}</li>`).join('') : '';
                    category.innerHTML = `
                        <div class="category-image">
                            <img src="${item.imagem || 'https://images.unsplash.com/photo-1541961018884-2234998574a9?w=600&q=80'}" alt="${item.titulo}">
                        </div>
                        <div class="category-content">
                            <h2>${item.titulo}</h2>
                            <p>${item.descricao || ''}</p>
                            ${destaques ? `<ul class="collection-highlights">${destaques}</ul>` : ''}
                            <a href="#" class="btn-collection">Explorar coleção</a>
                        </div>
                    `;
                    if (index % 2 === 1) {
                        category.querySelector('.category-content').style.direction = 'ltr';
                    }
                    container.appendChild(category);
                });
            }
        }
    } catch (error) {
        console.error('Error loading colecoes:', error);
    }
}

// Carregar eventos dinamicamente
async function loadEventos() {
    try {
        const response = await fetch('php/api.php?path=eventos');
        const result = await response.json();
        if (result.success && result.data.length > 0) {
            const list = document.querySelector('.events-list');
            if (list) {
                list.innerHTML = '';
                result.data.forEach(item => {
                    const eventItem = document.createElement('div');
                    eventItem.className = 'event-item';
                    eventItem.innerHTML = `
                        <div class="event-date">
                            <span class="event-day">${item.dia || '15'}</span>
                            <span class="event-month">${item.mes || 'MAR'}</span>
                        </div>
                        <div class="event-content">
                            <h2>${item.titulo}</h2>
                            <p class="event-time">${item.horario || '19:00 - 21:00'}</p>
                            <p>${item.descricao || ''}</p>
                            <div class="event-details">
                                <span class="event-location">📍 ${item.local || 'Local não informado'}</span>
                                <span class="event-price">${item.preco || 'Gratuito'}</span>
                            </div>
                            <a href="#" class="btn-event">Inscrever-se</a>
                        </div>
                    `;
                    list.appendChild(eventItem);
                });
            }
        }
    } catch (error) {
        console.error('Error loading eventos:', error);
    }
}

// Carregar conteúdo baseado na página atual
document.addEventListener('DOMContentLoaded', () => {
    loadContent();
    
    if (window.location.pathname.includes('exposicoes.html')) {
        loadExposicoes();
    } else if (window.location.pathname.includes('colecoes.html')) {
        loadColecoes();
    } else if (window.location.pathname.includes('eventos.html')) {
        loadEventos();
    }
});

