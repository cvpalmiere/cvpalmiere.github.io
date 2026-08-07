// ============================================================
// NAVBAR.JS — Barra de navegação fixa com menu mobile
// ============================================================

function initNavbar() {
    const header = document.getElementById('navbar');
    if (!header) return;

    // Estrutura HTML da navbar
    header.innerHTML = `
        <nav class="navbar" id="nav">
            <div class="navbar-inner">
                <a href="#hero" class="navbar-logo">
                    <span class="navbar-logo-icon">C</span>
                    <span>Carla Palmiere</span>
                </a>

                <div class="navbar-links" id="navbar-links">
                    <a href="#sobre">Sobre</a>
                    <a href="#projetos">Projetos</a>
                    <a href="#certificados">Certificados</a>
                    <a href="#contato">Contato</a>
                </div>

                <a href="mailto:carlavick07@gmail.com" class="navbar-cta">Fale comigo</a>

                <button class="navbar-hamburguer" id="hamburguer" aria-label="Abrir menu">
                    <span id="hamburguer-icon">☰</span>
                </button>
            </div>

            <div class="navbar-mobile" id="navbar-mobile">
                <a href="#sobre">Sobre</a>
                <a href="#projetos">Projetos</a>
                <a href="#certificados">Certificados</a>
                <a href="#contato">Contato</a>
                <a href="mailto:carlavick07@gmail.com">Fale comigo</a>
            </div>
        </nav>
    `;

    // Elementos
    const nav = document.getElementById('nav');
    const hamburguer = document.getElementById('hamburguer');
    const hamburguerIcon = document.getElementById('hamburguer-icon');
    const mobileMenu = document.getElementById('navbar-mobile');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    // Scroll: adiciona classe quando rola
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Toggle menu mobile
    hamburguer.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        hamburguerIcon.textContent = isOpen ? '✕' : '☰';
    });

    // Fecha menu ao clicar em um link mobile
    mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            hamburguerIcon.textContent = '☰';
        });
    });
}