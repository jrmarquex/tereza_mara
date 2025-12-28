// Verificar autenticação
async function checkAuth() {
    try {
        const formData = new FormData();
        formData.append('action', 'check');
        const response = await fetch('../php/auth.php', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (!result.logged_in) {
            window.location.href = 'login.html';
        }
    } catch (error) {
        window.location.href = 'login.html';
    }
}

checkAuth();

// Navegação do menu
document.querySelectorAll('.sidebar-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        if (section) {
            // Atualizar hash na URL
            window.location.hash = `section-${section}`;
            showSection(section);
            document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
        } else {
            // Se não tem data-section, pode ser link externo (dashboard)
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#')) {
                window.location.href = href;
            }
        }
    });
});

function showSection(section) {
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });
    const targetSection = document.getElementById(`section-${section}`);
    if (targetSection) {
        targetSection.classList.add('active');
        loadSectionData(section);
    }
}

// Carregar dados da seção
async function loadSectionData(section) {
    try {
        const response = await fetch(`../php/api.php?path=content`);
        const result = await response.json();
        if (result.success) {
            const data = result.data;
            
            if (section === 'inicio') {
                document.getElementById('hero_title').value = data.index?.hero_title || '';
                document.getElementById('hero_subtitle').value = data.index?.hero_subtitle || '';
                document.getElementById('hero_description').value = data.index?.hero_description || '';
                document.getElementById('hero_image').value = data.index?.hero_image || '';
                updateImagePreview('hero_image', data.index?.hero_image);
                document.getElementById('intro_text').value = data.index?.intro_text || '';
                document.getElementById('about_title').value = data.index?.about_title || '';
                document.getElementById('about_text').value = data.index?.about_text || '';
                document.getElementById('about_image').value = data.index?.about_image || '';
                updateImagePreview('about_image', data.index?.about_image);
            } else if (section === 'sobre') {
                document.getElementById('sobre_title').value = data.sobre?.title || '';
                document.getElementById('sobre_content').value = data.sobre?.content || '';
                document.getElementById('sobre_image').value = data.sobre?.image || '';
                updateImagePreview('sobre_image', data.sobre?.image);
            } else if (section === 'contato') {
                document.getElementById('contato_endereco').value = data.contato?.endereco?.replace(/\\n/g, '\n') || '';
                document.getElementById('contato_telefone').value = data.contato?.telefone?.replace(/\\n/g, '\n') || '';
                document.getElementById('contato_email').value = data.contato?.email?.replace(/\\n/g, '\n') || '';
                document.getElementById('contato_horario').value = data.contato?.horario?.replace(/\\n/g, '\n') || '';
            } else if (section === 'whatsapp') {
                document.getElementById('whatsapp_number').value = data.whatsapp || '';
            } else if (section === 'exposicoes') {
                loadExposicoes();
            } else if (section === 'colecoes') {
                loadColecoes();
            } else if (section === 'eventos') {
                loadEventos();
            }
        }
    } catch (error) {
        console.error('Error loading data:', error);
        showAlert('Erro ao carregar dados', 'error');
    }
}

// Upload de imagem
async function uploadImage(input, targetField) {
    if (!input.files || !input.files[0]) return;
    
    const formData = new FormData();
    formData.append('image', input.files[0]);
    
    try {
        const response = await fetch('../php/api.php?path=upload', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (result.success) {
            document.getElementById(targetField).value = result.url;
            updateImagePreview(targetField, result.url);
            showAlert('Imagem enviada com sucesso!', 'success');
        } else {
            showAlert('Erro ao enviar imagem', 'error');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        showAlert('Erro ao enviar imagem', 'error');
    }
}

function updateImagePreview(fieldId, url) {
    if (url) {
        const preview = document.getElementById(`${fieldId}_preview`);
        if (preview) {
            preview.src = url.startsWith('http') ? url : `..${url}`;
            preview.style.display = 'block';
        }
    }
}

// Salvar conteúdo
document.getElementById('formInicio').addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveContent('index', {
        hero_title: document.getElementById('hero_title').value,
        hero_subtitle: document.getElementById('hero_subtitle').value,
        hero_description: document.getElementById('hero_description').value,
        hero_image: document.getElementById('hero_image').value,
        intro_text: document.getElementById('intro_text').value,
        about_title: document.getElementById('about_title').value,
        about_text: document.getElementById('about_text').value,
        about_image: document.getElementById('about_image').value
    });
});

document.getElementById('formSobre').addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveContent('sobre', {
        title: document.getElementById('sobre_title').value,
        content: document.getElementById('sobre_content').value,
        image: document.getElementById('sobre_image').value
    });
});

document.getElementById('formContato').addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveContent('contato', {
        endereco: document.getElementById('contato_endereco').value.replace(/\n/g, '\\n'),
        telefone: document.getElementById('contato_telefone').value.replace(/\n/g, '\\n'),
        email: document.getElementById('contato_email').value.replace(/\n/g, '\\n'),
        horario: document.getElementById('contato_horario').value.replace(/\n/g, '\\n')
    });
});

document.getElementById('formWhatsApp').addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveContent('whatsapp', document.getElementById('whatsapp_number').value);
});

async function saveContent(key, value) {
    try {
        const response = await fetch('../php/api.php?path=content');
        const currentData = await response.json();
        let data = currentData.success ? currentData.data : {};
        
        if (key === 'whatsapp') {
            data.whatsapp = value;
        } else {
            data[key] = value;
        }
        
        const saveResponse = await fetch('../php/api.php?path=content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await saveResponse.json();
        if (result.success) {
            showAlert('Salvo com sucesso!', 'success');
            // Atualizar links do WhatsApp nas páginas
            if (key === 'whatsapp') {
                updateWhatsAppLinks(value);
            }
        } else {
            showAlert('Erro ao salvar', 'error');
        }
    } catch (error) {
        console.error('Error saving:', error);
        showAlert('Erro ao salvar', 'error');
    }
}

function updateWhatsAppLinks(number) {
    // Esta função atualizaria os links do WhatsApp nas páginas HTML
    // Por enquanto, o número é carregado dinamicamente via JavaScript nas páginas
}

// Exposições
async function loadExposicoes() {
    try {
        const response = await fetch('../php/api.php?path=exposicoes');
        const result = await response.json();
        if (result.success) {
            const list = document.getElementById('exposicoesList');
            list.innerHTML = '';
            result.data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'item-card';
                card.innerHTML = `
                    <h3>${item.titulo}</h3>
                    <p><strong>Data:</strong> ${item.data || 'N/A'}</p>
                    <p><strong>Badge:</strong> ${item.badge || 'N/A'}</p>
                    <p>${item.descricao || ''}</p>
                    <div class="item-actions">
                        <button class="btn-edit" onclick="editExposicao('${item.id}')">Editar</button>
                        <button class="btn-danger" onclick="deleteExposicao('${item.id}')">Excluir</button>
                    </div>
                `;
                list.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error loading exposicoes:', error);
    }
}

function showExposicaoForm(id = null) {
    const form = document.getElementById('exposicaoForm');
    const title = document.getElementById('exposicaoFormTitle');
    form.style.display = 'block';
    
    if (id) {
        title.textContent = 'Editar Exposição';
        // Carregar dados
    } else {
        title.textContent = 'Nova Exposição';
        document.getElementById('formExposicao').reset();
        document.getElementById('exposicao_id').value = '';
    }
}

function cancelExposicaoForm() {
    document.getElementById('exposicaoForm').style.display = 'none';
}

document.getElementById('formExposicao').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('exposicao_id').value;
    const data = {
        titulo: document.getElementById('exposicao_titulo').value,
        data: document.getElementById('exposicao_data').value,
        descricao: document.getElementById('exposicao_descricao').value,
        badge: document.getElementById('exposicao_badge').value,
        imagem: document.getElementById('exposicao_imagem').value
    };
    
    if (id) {
        data.id = id;
        await updateExposicao(data);
    } else {
        await createExposicao(data);
    }
});

async function createExposicao(data) {
    try {
        const response = await fetch('../php/api.php?path=exposicoes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.success) {
            showAlert('Exposição criada com sucesso!', 'success');
            cancelExposicaoForm();
            loadExposicoes();
        }
    } catch (error) {
        showAlert('Erro ao criar exposição', 'error');
    }
}

async function updateExposicao(data) {
    try {
        const response = await fetch('../php/api.php?path=exposicoes', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.success) {
            showAlert('Exposição atualizada com sucesso!', 'success');
            cancelExposicaoForm();
            loadExposicoes();
        }
    } catch (error) {
        showAlert('Erro ao atualizar exposição', 'error');
    }
}

async function deleteExposicao(id) {
    if (!confirm('Tem certeza que deseja excluir esta exposição?')) return;
    
    try {
        const response = await fetch(`../php/api.php?path=exposicoes&id=${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        if (result.success) {
            showAlert('Exposição excluída com sucesso!', 'success');
            loadExposicoes();
        }
    } catch (error) {
        showAlert('Erro ao excluir exposição', 'error');
    }
}

function editExposicao(id) {
    // Carregar dados da exposição e preencher formulário
    showExposicaoForm(id);
    // TODO: Implementar carregamento de dados
}

// Coleções (similar a Exposições)
async function loadColecoes() {
    try {
        const response = await fetch('../php/api.php?path=colecoes');
        const result = await response.json();
        if (result.success) {
            const list = document.getElementById('colecoesList');
            list.innerHTML = '';
            result.data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'item-card';
                card.innerHTML = `
                    <h3>${item.titulo}</h3>
                    <p>${item.descricao || ''}</p>
                    <div class="item-actions">
                        <button class="btn-edit" onclick="editColecao('${item.id}')">Editar</button>
                        <button class="btn-danger" onclick="deleteColecao('${item.id}')">Excluir</button>
                    </div>
                `;
                list.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error loading colecoes:', error);
    }
}

function showColecaoForm(id = null) {
    document.getElementById('colecaoForm').style.display = 'block';
    if (!id) {
        document.getElementById('formColecao').reset();
        document.getElementById('colecao_id').value = '';
    }
}

function cancelColecaoForm() {
    document.getElementById('colecaoForm').style.display = 'none';
}

document.getElementById('formColecao').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('colecao_id').value;
    const destaques = document.getElementById('colecao_destaques').value.split('\n').filter(d => d.trim());
    const data = {
        titulo: document.getElementById('colecao_titulo').value,
        descricao: document.getElementById('colecao_descricao').value,
        destaques: destaques,
        imagem: document.getElementById('colecao_imagem').value
    };
    
    if (id) {
        data.id = id;
        await updateColecao(data);
    } else {
        await createColecao(data);
    }
});

async function createColecao(data) {
    try {
        const response = await fetch('../php/api.php?path=colecoes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.success) {
            showAlert('Coleção criada com sucesso!', 'success');
            cancelColecaoForm();
            loadColecoes();
        }
    } catch (error) {
        showAlert('Erro ao criar coleção', 'error');
    }
}

async function updateColecao(data) {
    try {
        const response = await fetch('../php/api.php?path=colecoes', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.success) {
            showAlert('Coleção atualizada com sucesso!', 'success');
            cancelColecaoForm();
            loadColecoes();
        }
    } catch (error) {
        showAlert('Erro ao atualizar coleção', 'error');
    }
}

async function deleteColecao(id) {
    if (!confirm('Tem certeza que deseja excluir esta coleção?')) return;
    try {
        const response = await fetch(`../php/api.php?path=colecoes&id=${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        if (result.success) {
            showAlert('Coleção excluída com sucesso!', 'success');
            loadColecoes();
        }
    } catch (error) {
        showAlert('Erro ao excluir coleção', 'error');
    }
}

function editColecao(id) {
    showColecaoForm(id);
}

// Eventos (similar)
async function loadEventos() {
    try {
        const response = await fetch('../php/api.php?path=eventos');
        const result = await response.json();
        if (result.success) {
            const list = document.getElementById('eventosList');
            list.innerHTML = '';
            result.data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'item-card';
                card.innerHTML = `
                    <h3>${item.titulo}</h3>
                    <p><strong>Data:</strong> ${item.dia || ''} ${item.mes || ''}</p>
                    <p><strong>Horário:</strong> ${item.horario || 'N/A'}</p>
                    <p><strong>Local:</strong> ${item.local || 'N/A'}</p>
                    <p><strong>Preço:</strong> ${item.preco || 'N/A'}</p>
                    <p>${item.descricao || ''}</p>
                    <div class="item-actions">
                        <button class="btn-edit" onclick="editEvento('${item.id}')">Editar</button>
                        <button class="btn-danger" onclick="deleteEvento('${item.id}')">Excluir</button>
                    </div>
                `;
                list.appendChild(card);
            });
        }
    } catch (error) {
        console.error('Error loading eventos:', error);
    }
}

function showEventoForm(id = null) {
    document.getElementById('eventoForm').style.display = 'block';
    if (!id) {
        document.getElementById('formEvento').reset();
        document.getElementById('evento_id').value = '';
    }
}

function cancelEventoForm() {
    document.getElementById('eventoForm').style.display = 'none';
}

document.getElementById('formEvento').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('evento_id').value;
    const data = {
        dia: document.getElementById('evento_dia').value,
        mes: document.getElementById('evento_mes').value,
        titulo: document.getElementById('evento_titulo').value,
        horario: document.getElementById('evento_horario').value,
        descricao: document.getElementById('evento_descricao').value,
        local: document.getElementById('evento_local').value,
        preco: document.getElementById('evento_preco').value
    };
    
    if (id) {
        data.id = id;
        await updateEvento(data);
    } else {
        await createEvento(data);
    }
});

async function createEvento(data) {
    try {
        const response = await fetch('../php/api.php?path=eventos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.success) {
            showAlert('Evento criado com sucesso!', 'success');
            cancelEventoForm();
            loadEventos();
        }
    } catch (error) {
        showAlert('Erro ao criar evento', 'error');
    }
}

async function updateEvento(data) {
    try {
        const response = await fetch('../php/api.php?path=eventos', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.success) {
            showAlert('Evento atualizado com sucesso!', 'success');
            cancelEventoForm();
            loadEventos();
        }
    } catch (error) {
        showAlert('Erro ao atualizar evento', 'error');
    }
}

async function deleteEvento(id) {
    if (!confirm('Tem certeza que deseja excluir este evento?')) return;
    try {
        const response = await fetch(`../php/api.php?path=eventos&id=${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        if (result.success) {
            showAlert('Evento excluído com sucesso!', 'success');
            loadEventos();
        }
    } catch (error) {
        showAlert('Erro ao excluir evento', 'error');
    }
}

function editEvento(id) {
    showEventoForm(id);
}

// Utilitários
function showAlert(message, type) {
    const container = document.getElementById('alertContainer');
    container.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => {
        container.innerHTML = '';
    }, 3000);
}

function logout() {
    const formData = new FormData();
    formData.append('action', 'logout');
    fetch('../php/auth.php', {
        method: 'POST',
        body: formData
    }).then(() => {
        window.location.href = 'login.html';
    });
}

// Verificar hash na URL e mostrar seção correspondente
function checkHashAndShowSection() {
    const hash = window.location.hash;
    if (hash) {
        // Remover #section- do hash
        const section = hash.replace('#section-', '');
        if (section) {
            showSection(section);
            // Atualizar menu ativo
            document.querySelectorAll('.sidebar-menu a').forEach(a => {
                a.classList.remove('active');
                if (a.dataset.section === section || a.getAttribute('href') === hash) {
                    a.classList.add('active');
                }
            });
            return true;
        }
    }
    return false;
}

// Verificar hash ao carregar página
if (!checkHashAndShowSection()) {
    // Se não houver hash, mostrar primeira seção
    showSection('inicio');
    const inicioLink = document.querySelector('.sidebar-menu a[data-section="inicio"]');
    if (inicioLink) {
        inicioLink.classList.add('active');
    }
}

// Escutar mudanças no hash
window.addEventListener('hashchange', () => {
    checkHashAndShowSection();
});

