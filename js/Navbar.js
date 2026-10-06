// ============================================================
// NAVBAR.JS — Barra de navegação fixa com menu mobile
// ============================================================

// Monta a navbar e seus eventos; depende de ICONES (Ui.js) para o botão do menu.
function initNavbar() {
    const header = document.getElementById('navbar');
    if (!header) return;

    // Estrutura HTML da navbar, injetada via JS para manter o index.html enxuto.
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

                <button class="navbar-hamburguer" id="hamburguer" aria-label="Abrir menu" aria-expanded="false">
                    <span id="hamburguer-icon">${ICONES.menu}</span>
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

    const nav = document.getElementById('nav');
    const hamburguer = document.getElementById('hamburguer');
    const hamburguerIcon = document.getElementById('hamburguer-icon');
    const mobileMenu = document.getElementById('navbar-mobile');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    // Troca o ícone e o estado acessível do botão conforme o menu abre ou fecha.
    function atualizarMenu(aberto) {
        mobileMenu.classList.toggle('open', aberto);
        hamburguerIcon.innerHTML = aberto ? ICONES.fechar : ICONES.menu;
        hamburguer.setAttribute('aria-expanded', String(aberto));
    }

    // Aplica fundo desfocado após rolar a página para manter o contraste do menu.
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 30);
    });

    // Alterna o menu mobile ao clicar no botão.
    hamburguer.addEventListener('click', () => {
        atualizarMenu(!mobileMenu.classList.contains('open'));
    });

    // Fecha o menu ao escolher um link para não cobrir a seção de destino.
    mobileLinks.forEach((link) => {
        link.addEventListener('click', () => atualizarMenu(false));
    });
}
