// --- DATABASE: CONTEÚDO MODULAR ---
const DATA = {
    problems: [
        { title: "Aquecimento Global", desc: "Aumento da temperatura média do planeta devido à emissão de gases estufa." },
        { title: "Acidificação dos Oceanos", desc: "A absorção de CO2 pelos mares altera o pH, destruindo recifes de corais." },
        { title: "Desmatamento", desc: "A perda de florestas tropicais reduz a biodiversidade e acelera a crise climática." },
        { title: "Poluição Plástica", desc: "Milhões de toneladas de microplásticos entram na cadeia alimentar anualmente." }
    ],
    solutions: [
        "Transição imediata para Energias Renováveis",
        "Restauração ativa de Biomas Nativos",
        "Implementação de Economia Circular nas cidades",
        "Proteção estrita de áreas marinhas"
    ],
    faq: [
        { q: "O que é o efeito estufa?", a: "É um processo natural que mantém a Terra aquecida, mas que foi intensificado pela atividade humana." },
        { q: "Como reduzir minha pegada?", a: "Diminuindo o consumo de carne, evitando plásticos de uso único e optando por transporte sustentável." }
    ]
};

// --- RENDERIZAÇÃO DINÂMICA ---
const initApp = () => {
    renderProblems();
    renderCarousel();
    renderFAQ();
    initA11y();
    initScrollReveal();
};

function renderProblems() {
    const grid = document.getElementById('problems-grid');
    grid.innerHTML = DATA.problems.map(p => `
        <article class="card reveal">
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
        </article>
    `).join('');
}

function renderCarousel() {
    const track = document.getElementById('carousel-track');
    track.innerHTML = DATA.solutions.map(s => `
        <div class="carousel-item">
            <h3>${s}</h3>
        </div>
    `).join('');
    setupCarouselLogic();
}

function renderFAQ() {
    const container = document.getElementById('accordion-group');
    container.innerHTML = DATA.faq.map((f, i) => `
        <div class="accordion-item">
            <button class="accordion-trigger" aria-expanded="false" aria-controls="faq-desc-${i}">
                ${f.q}
            </button>
            <div id="faq-desc-${i}" class="accordion-content">
                <p style="padding-bottom: 1.5rem">${f.a}</p>
            </div>
        </div>
    `).join('');
    setupAccordionLogic();
}

// --- LÓGICA DE COMPONENTES ---

function setupCarouselLogic() {
    const track = document.getElementById('carousel-track');
    let index = 0;
    
    document.getElementById('next-btn').onclick = () => {
        index = (index + 1) % DATA.solutions.length;
        track.style.transform = `translateX(-${index * 100}%)`;
    };
    document.getElementById('prev-btn').onclick = () => {
        index = (index - 1 + DATA.solutions.length) % DATA.solutions.length;
        track.style.transform = `translateX(-${index * 100}%)`;
    };
}

function setupAccordionLogic() {
    document.querySelectorAll('.accordion-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !isExpanded);
            const content = btn.nextElementSibling;
            content.style.maxHeight = isExpanded ? "0" : content.scrollHeight + "px";
        });
    });
}

// --- ACESSIBILIDADE (FONTE E CONTRASTE) ---
function initA11y() {
    let zoom = 100;
    const root = document.documentElement;

    document.getElementById('font-up').onclick = () => {
        if(zoom < 150) { zoom += 10; root.style.fontSize = `${zoom}%`; }
    };
    document
