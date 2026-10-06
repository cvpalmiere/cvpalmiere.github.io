// ============================================================
// MAIN.JS — Orquestra todo o portfólio
// ============================================================

// Inicializa os módulos após o DOM carregar; Projects roda antes do reveal para ter seus elementos observados.
document.addEventListener('DOMContentLoaded', () => {
    initSphere();
    initNavbar();
    initProjects();
    initCertificates();
    initRevealAnimations();
    initSmoothScroll();
    initLightbox();
});

// ============================================================
// 1. ESFERA 3D NO FUNDO
// ============================================================

// Cria a esfera de texto e a anexa ao fundo fixo como elemento puramente visual.
function initSphere() {
    const container = document.getElementById('sphere-bg');
    if (!container) return;

    const sphere = TextSphere({
        word: 'Carla Palmiere',
        color: '#D4A574',
        font: {
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            fontSize: 16,
        },
        speed: 7,
        rotationSide: 'counterclockwise',
        twist: 23,
        letterSpacing: 160,
    });

    sphere.render(container);
}

// ============================================================
// 2. LIGHTBOX
// ============================================================

// Configura o fechamento do lightbox por botão, fundo e tecla ESC para facilitar a saída em qualquer dispositivo.
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const fecharBtn = document.getElementById('lightbox-fechar');

    if (!lightbox) return;

    // Fecha o lightbox e limpa a imagem para não exibir o certificado anterior na próxima abertura.
    function fecharLightbox() {
        lightbox.classList.remove('aberto');
        if (lightboxImg) lightboxImg.src = '';
    }

    if (fecharBtn) {
        fecharBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            fecharLightbox();
        });
    }

    // Fecha ao clicar no fundo escuro, mas não ao clicar na própria imagem.
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) fecharLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('aberto')) {
            fecharLightbox();
        }
    });
}

// ============================================================
// 3. ANIMAÇÃO DE ENTRADA (SCROLL)
// ============================================================

// Revela elementos .reveal ao entrar na tela para dar ritmo à leitura da página.
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    reveals.forEach((el) => {
        observer.observe(el);

        // Exibe de imediato o que já está visível no carregamento, evitando conteúdo invisível no topo.
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) el.classList.add('visible');
    });
}

// ============================================================
// 4. ROLAGEM SUAVE (LINKS INTERNOS)
// ============================================================

// Anima a rolagem até a seção de destino em links âncora para uma navegação mais fluida.
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    });
}
