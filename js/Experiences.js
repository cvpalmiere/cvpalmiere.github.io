// ============================================================
// EXPERIENCES.JS — Renderiza as experiências profissionais
// ============================================================

// Monta a linha do tempo de experiências a partir de uma lista de dados.
function initExperiences() {
    const container = document.getElementById('experiencias-container');
    if (!container) return;

    // Lista em ordem de exibição; novas experiências entram apenas como novos objetos aqui.
    const experiencias = [
        {
            empresa: 'VHF Bank',
            cargo: 'Automação de Chatbots e Análise de Requisitos',
            periodo: '16 meses',
            resumo: 'Automação de atendimento com modelos de linguagem, transformando processos manuais em fluxos contínuos.',
            pontos: [
                'Criação de fluxos de conversa para filtrar e qualificar clientes, eliminando a necessidade de atendentes humanos em várias etapas.',
                'Integração de ChatGPT e Gemini em chatbots que apresentavam a empresa, explicavam o negócio e respondiam perguntas em tempo real, 24 horas por dia.',
                'Levantamento e análise de requisitos para definir o que automatizar em cada etapa do atendimento.',
            ],
            stack: ['Python', 'ChatGPT', 'Gemini', 'APIs de IA'],
        },
    ];

    // Cria o item da linha do tempo com empresa, cargo, período, destaques e tecnologias.
    function renderExperiencia(exp) {
        const item = document.createElement('article');
        item.className = 'exp-item';

        item.innerHTML = `
            <p class="exp-empresa">${exp.empresa}</p>
            <h3 class="exp-cargo">${exp.cargo}</h3>
            <p class="exp-periodo">${exp.periodo}</p>
            <p class="exp-resumo">${exp.resumo}</p>
            <ul class="exp-pontos">
                ${exp.pontos.map((ponto) => `<li>${ponto}</li>`).join('')}
            </ul>
            <div class="chips">
                ${exp.stack.map((tech) => `<span>${tech}</span>`).join('')}
            </div>
        `;

        return item;
    }

    // Agrupa os itens na lista com linha vertical e entrada animada no scroll.
    const lista = document.createElement('div');
    lista.className = 'exp-lista reveal';
    experiencias.forEach((exp) => lista.appendChild(renderExperiencia(exp)));
    container.appendChild(lista);
}