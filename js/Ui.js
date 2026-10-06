// ============================================================
// UI.JS — Ícones SVG e comportamento de acordeão compartilhados
// ============================================================

// Gera um ícone SVG a partir dos traçados, evitando repetir os atributos em cada ícone.
function criarIcone(tracados, classeExtra = '') {
    return `<svg class="icone ${classeExtra}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${tracados}</svg>`;
}

// Biblioteca central de ícones para manter o visual consistente e sem emojis.
const ICONES = {
    chevron: criarIcone('<path d="m6 9 6 6 6-6"/>', 'icone-chevron'),
    externo: criarIcone('<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'),
    menu: criarIcone('<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>'),
    fechar: criarIcone('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'),
};

// Liga um botão a um painel para expandir/recolher, mantendo o estado acessível via aria-expanded.
function vincularAcordeao(botao, painel) {
    botao.addEventListener('click', () => {
        const aberto = painel.classList.toggle('aberto');
        botao.classList.toggle('aberto', aberto);
        botao.setAttribute('aria-expanded', String(aberto));
    });
}
