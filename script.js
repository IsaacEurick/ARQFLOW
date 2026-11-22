
const STORAGE_KEY = "wre_projetos_v1";

let projects = [];

try {
    projects = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    if (!Array.isArray(projects)) projects = [];
} catch {
    projects = [];
}

const modal = document.getElementById("projectModal");
const form = document.getElementById("projectForm");
const sidebar = document.getElementById("sidebar");

const pages = {
    dashboard: "Visão geral",
    projects: "Projetos",
    clients: "Clientes",
    briefings: "Briefings"
};

// Navegação
function navigateTo(pageName) {
    if (!pages[pageName]) return;

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(`page-${pageName}`).classList.add("active");

    document.querySelectorAll(".nav-item").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.page === pageName
        );
    });

    document.getElementById("breadcrumbTitle").textContent =
        pages[pageName];

    sidebar.classList.remove("open");

    renderAll();
}

document.querySelectorAll(".nav-item").forEach(button => {
    button.addEventListener("click", () => {
        navigateTo(button.dataset.page);
    });
});

document.querySelectorAll("[data-goto]").forEach(button => {
    button.addEventListener("click", () => {
        navigateTo(button.dataset.goto);
    });
});

// Menu para celular
document.getElementById("mobileMenu").addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

// Modal
function openModal() {
    modal.classList.add("show");
    document.getElementById("clientName").focus();
}

function closeModal() {
    modal.classList.remove("show");
    form.reset();
}

document.getElementById("newProjectButton").addEventListener("click", openModal);
document.getElementById("projectsNewButton").addEventListener("click", openModal);
document.getElementById("emptyNewProject").addEventListener("click", openModal);
document.getElementById("closeModal").addEventListener("click", closeModal);
document.getElementById("cancelModal").addEventListener("click", closeModal);

modal.addEventListener("click", event => {
    if (event.target === modal) closeModal();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
});

// Salvar dados
function saveProjects() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

// Cadastrar projeto
form.addEventListener("submit", event => {
    event.preventDefault();

    const clientName = document.getElementById("clientName").value.trim();
    const clientEmail = document.getElementById("clientEmail").value.trim();
    const projectName = document.getElementById("projectName").value.trim();
    const location = document.getElementById("projectLocation").value.trim();
    const type = document.getElementById("projectType").value;

    if (!clientName || !projectName) {
        alert("Preencha o nome do cliente e o nome do projeto.");
        return;
    }

    const project = {
        id: crypto.randomUUID
            ? crypto.randomUUID()
            : String(Date.now()),
        clientName,
        clientEmail,
        projectName,
        location,
        type,
        status: "Aguardando briefing",
        createdAt: new Date().toISOString()
    };

    projects.unshift(project);

    saveProjects();
    closeModal();
    renderAll();
    navigateTo("projects");

    alert("Projeto cadastrado com sucesso!");
});

// Formatação de data
function formatDate(date) {
    return new Date(date).toLocaleDateString("pt-BR");
}

// Estatísticas
function renderStats() {
    document.getElementById("totalProjects").textContent = projects.length;

    const uniqueClients = new Set(
        projects.map(project => project.clientName.trim().toLowerCase())
    );

    document.getElementById("totalClients").textContent = uniqueClients.size;

    const pending = projects.filter(
        project => project.status !== "Concluído"
    ).length;

    const completed = projects.filter(
        project => project.status === "Concluído"
    ).length;

    document.getElementById("pendingBriefings").textContent = pending;
    document.getElementById("completedBriefings").textContent = completed;
}

// Modelo visual de projeto
function createProjectRow(project) {
    const row = document.createElement("div");
    row.className = "project-row";

    const main = document.createElement("div");
    main.className = "project-main";

    const symbol = document.createElement("div");
    symbol.className = "project-symbol";
    symbol.textContent = "⌂";

    const info = document.createElement("div");
    info.className = "project-info";

    const name = document.createElement("strong");
    name.textContent = project.projectName;

    const details = document.createElement("span");
    details.textContent =
        `${project.clientName} · ${project.location || "Local não informado"}`;

    info.append(name, details);
    main.append(symbol, info);

    const status = document.createElement("span");
    status.className = "project-status";
    status.textContent = project.status;

    row.append(main, status);

    return row;
}

// Projetos recentes
function renderRecentProjects() {
    const container = document.getElementById("recentProjects");
    container.replaceChildren();

    if (projects.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">▤</div>
                <strong>Nenhum projeto cadastrado</strong>
                <p>Comece cadastrando o primeiro projeto do escritório.</p>
                <button class="primary-button small" id="emptyNewProject">
                    Cadastrar projeto
                </button>
            </div>
        `;

        document.getElementById("emptyNewProject")
            .addEventListener("click", openModal);

        return;
    }

    projects.slice(0, 5).forEach(project => {
        container.appendChild(createProjectRow(project));
    });
}

// Todos os projetos
function renderAllProjects() {
    const container = document.getElementById("allProjects");
    container.replaceChildren();

    document.getElementById("projectsCount").textContent =
        `${projects.length} ${projects.length === 1 ? "projeto cadastrado" : "projetos cadastrados"}`;

    if (projects.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">▤</div>
                <strong>Nenhum projeto por aqui</strong>
                <p>Os projetos cadastrados aparecerão nesta área.</p>
            </div>
        `;
        return;
    }

    projects.forEach(project => {
        container.appendChild(createProjectRow(project));
    });
}

// Clientes
function renderClients() {
    const container = document.getElementById("allClients");
    container.replaceChildren();

    const clients = [];

    projects.forEach(project => {
        const key = project.clientName.trim().toLowerCase();

        if (!clients.some(client => client.key === key)) {
            clients.push({
                key,
                name: project.clientName,
                email: project.clientEmail,
                projects: 1
            });
        } else {
            const client = clients.find(item => item.key === key);
            client.projects++;
            if (!client.email && project.clientEmail) {
                client.email = project.clientEmail;
            }
        }
    });

    if (clients.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">♙</div>
                <strong>Nenhum cliente cadastrado</strong>
                <p>Cadastre um projeto para adicionar o primeiro cliente.</p>
            </div>
        `;
        return;
    }

    clients.forEach(client => {
        const row = document.createElement("div");
        row.className = "project-row";

        const main = document.createElement("div");
        main.className = "project-main";

        const avatar = document.createElement("div");
        avatar.className = "project-symbol";
        avatar.textContent = "♙";

        const info = document.createElement("div");
        info.className = "project-info";

        const name = document.createElement("strong");
        name.textContent = client.name;

        const details = document.createElement("span");
        details.textContent =
            client.email || `${client.projects} projeto(s) cadastrado(s)`;

        info.append(name, details);
        main.append(avatar, info);

        const badge = document.createElement("span");
        badge.className = "project-status";
        badge.textContent =
            `${client.projects} ${client.projects === 1 ? "projeto" : "projetos"}`;

        row.append(main, badge);
        container.appendChild(row);
    });
}

// Briefings
function renderBriefings() {
    const container = document.getElementById("allBriefings");
    container.replaceChildren();

    if (projects.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">☷</div>
                <strong>Nenhum briefing disponível</strong>
                <p>Cadastre um projeto para começar a organizar os briefings.</p>
            </div>
        `;
        return;
    }

    projects.forEach(project => {
        const row = document.createElement("div");
        row.className = "project-row";

        const main = document.createElement("div");
        main.className = "project-main";

        const symbol = document.createElement("div");
        symbol.className = "project-symbol";
        symbol.textContent = "☷";

        const info = document.createElement("div");
        info.className = "project-info";

        const name = document.createElement("strong");
        name.textContent = project.projectName;

        const details = document.createElement("span");
        details.textContent = `${project.clientName} · Cadastrado em ${formatDate(project.createdAt)}`;

        info.append(name, details);
        main.append(symbol, info);

        const status = document.createElement("span");
        status.className = "project-status";
        status.textContent = project.status;

        row.append(main, status);
        container.appendChild(row);
    });
}

// Atualização geral
function renderAll() {
    renderStats();
    renderRecentProjects();
    renderAllProjects();
    renderClients();
    renderBriefings();
}

// Iniciar painel
renderAll();
