// ============================================================
// MAIN.JS — Orquestra todo o portfólio
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initSphere();
    initNavbar();
    initCertificates();
    initRevealAnimations();
    initSmoothScroll();
    initLightbox();
});

// ============================================================
// 1. ESFERA 3D NO FUNDO
// ============================================================
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
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const fecharBtn = document.getElementById('lightbox-fechar');

    if (!lightbox) return;

    function fecharLightbox() {
        lightbox.classList.remove('aberto');
        if (lightboxImg) {
            lightboxImg.src = '';
        }
    }

    // Fecha no X
    if (fecharBtn) {
        fecharBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            fecharLightbox();
        });
    }

    // Fecha clicando no fundo escuro
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            fecharLightbox();
        }
    });

    // Fecha com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('aberto')) {
            fecharLightbox();
        }
    });
}

// ============================================================
// 3. REVEAL ANIMATIONS (Scroll)
// ============================================================
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    reveals.forEach((el) => observer.observe(el));
}

// ============================================================
// 4. SMOOTH SCROLL (para links internos)
// ============================================================
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