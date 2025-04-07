let novelCount = 0;
const novels = [];
let currentNovelIndex = null;

function showMainPage() {
    document.getElementById('main-page').style.display = 'block';
    document.getElementById('add-novel-page').style.display = 'none';
    document.getElementById('settings-page').style.display = 'none';
    document.getElementById('novel-count').innerText = `${novelCount} Novelas en la Lista`;
    resetForm();
    renderNovels();
}

function showAddNovelPage() {
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('add-novel-page').style.display = 'block';
    document.getElementById('status-message').innerText = '';
}

function resetForm() {
    document.getElementById('novel-title').value = '';
    document.getElementById('chapters').value = '';
    document.getElementById('volumes').value = '';
    document.getElementById('status').value = 'Ongoing';
    document.getElementById('rating').value = '1';
    document.getElementById('novel-link').value = '';
    document.getElementById('novel-tags').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('novel-image').value = '';
}

function addNovel() {
    const title = document.getElementById('novel-title').value;
    const image = document.getElementById('novel-image').files[0];

    if (title) {
        const imageUrl = image ? URL.createObjectURL(image) : null;
        novels.push({
            title,
            chapters: document.getElementById('chapters').value,
            volumes: document.getElementById('volumes').value,
            status: document.getElementById('status').value,
            rating: document.getElementById('rating').value,
            link: document.getElementById('novel-link').value,
            tags: document.getElementById('novel-tags').value,
            notes: document.getElementById('notes').value,
            image: imageUrl,
        });
        novelCount++;
        document.getElementById('status-message').innerText = `¡Novela "${title}" añadida!`;
        resetForm();
    } else {
        document.getElementById('status-message').innerText = 'Por favor, ingresa un título.';
    }
    renderNovels();
}

function renderNovels() {
    const novelList = document.getElementById('novel-list');
    novelList.innerHTML = '';
    novels.forEach((novel, index) => {
        const novelItem = document.createElement('div');
        novelItem.className = 'novel-item';
        const imageHtml = novel.image ? `<img src="${novel.image}" alt="Imagen de la Novela" width="50" style="margin-right: 10px; border-radius: 5px;">` : '';
        novelItem.innerHTML = `
            <span>${imageHtml}<a href="${novel.link}" target="_blank">${novel.title}</a></span>
            <button class="menu-button" onclick="toggleMenu(${index})">⋮</button>
            <div id="menu-${index}" class="menu">
                <div class="menu-item" onclick="openEditModal(${index})">Editar</div>
                <div class="menu-item" onclick="deleteNovel(${index})">Eliminar</div>
            </div>
        `;
        novelList.appendChild(novelItem);
    });
}

function toggleMenu(index) {
    const menu = document.getElementById(`menu-${index}`);
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        hideAllMenus();
        menu.style.display = 'block';
    }
}

function hideAllMenus() {
    const menus = document.querySelectorAll('.menu');
    menus.forEach(menu => {
        menu.style.display = 'none';
    });
}

function openEditModal(index) {
    currentNovelIndex = index;
    const novel = novels[index];
    document.getElementById('edit-novel-title').value = novel.title;
    document.getElementById('edit-chapters').value = novel.chapters;
    document.getElementById('edit-volumes').value = novel.volumes;
    document.getElementById('edit-status').value = novel.status;
    document.getElementById('edit-rating').value = novel.rating;
    document.getElementById('edit-novel-link').value = novel.link;
    document.getElementById('edit-novel-tags').value = novel.tags;
    document.getElementById('edit-notes').value = novel.notes;
    document.getElementById('edit-modal').style.display = 'flex';
}

function saveEdits() {
    if (currentNovelIndex !== null) {
        novels[currentNovelIndex] = {
            title: document.getElementById('edit-novel-title').value,
            chapters: document.getElementById('edit-chapters').value,
            volumes: document.getElementById('edit-volumes').value,
            status: document.getElementById('edit-status').value,
            rating: document.getElementById('edit-rating').value,
            link: document.getElementById('edit-novel-link').value,
            tags: document.getElementById('edit-novel-tags').value,
            notes: document.getElementById('edit-notes').value,
            image: novels[currentNovelIndex].image,
        };
        document.getElementById('edit-modal').style.display = 'none';
        renderNovels();
    }
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function deleteNovel(index) {
    novels.splice(index, 1);
    novelCount--;
    document.getElementById('novel-count').innerText = `${novelCount} Novelas en la Lista`;
    renderNovels();
    document.getElementById('status-message').innerText = 'Novela eliminada correctamente.';
}

function showSettingsPage() {
    document.getElementById('main-page').style.display = 'none';
    document.getElementById('add-novel-page').style.display = 'none';
    document.getElementById('settings-page').style.display = 'block';
}

function exportData() {
    alert('Función para exportar datos aún no implementada.');
}

function importData() {
    alert('Función para importar datos aún no implementada.');
}

function removeAllData() {
    if (confirm('¿Estás seguro de que deseas eliminar todos los datos?')) {
        novels.length = 0;
        novelCount = 0;
        document.getElementById('novel-count').innerText = '0 Novelas en la Lista';
        renderNovels();
        document.getElementById('status-message').innerText = 'Todos los datos han sido eliminados.';
    }
}

// Inicializa la página principal al cargar
window.onload = showMainPage;
