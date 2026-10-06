// ============================================================
// PROJECTS.JS — Renderiza os projetos separados por categoria
// ============================================================

// Monta toda a seção de projetos; depende de ICONES e vincularAcordeao (Ui.js).
function initProjects() {
    const container = document.getElementById('projetos-container');
    if (!container) return;

    // Categorias na ordem de exibição; listas vazias exibem a mensagem "vazio" para manter a estrutura.
    const categorias = [
        {
            titulo: 'Análise de Dados & BI',
            vazio: 'Em breve. Os primeiros painéis em Power BI entram aqui assim que ficarem prontos.',
            projetos: [],
        },
        {
            titulo: 'Python & Automação',
            projetos: [
                {
                    tag: 'Full Stack · Entregue',
                    titulo: 'Mural Fotográfico',
                    resumo: 'Sistema para fotógrafa com upload de 5 mil imagens, autenticação bcrypt, drag and drop e deploy em produção. A cliente reduziu o pós-produção de 2h para 15min.',
                    detalhe: 'O Mural Fotográfico foi criado para permitir que uma fotógrafa entregue suas fotos de forma mais profissional e organizada. O sistema suporta o upload de mais de 5 mil imagens, download em lote via ZIP, montagem automática de grid personalizado e senhas individuais por evento para garantir segurança e privacidade. A cliente reduziu o tempo de pós-produção de 2 horas para apenas 15 minutos.',
                    stack: ['Python', 'Flask', 'SQLite', 'bcrypt'],
                    repo: 'https://github.com/cvpalmiere/mural_fotografico_modelo',
                },
                {
                    tag: 'API · CC50 Harvard',
                    titulo: 'List To Playlist',
                    resumo: 'Transforma listas de músicas em playlists do Spotify com OAuth 2.0 e integração de API.',
                    detalhe: 'O List To Playlist resolve o problema da demora em criar playlists manualmente no Spotify. Basta acessar o site, colar sua lista de músicas, autenticar com OAuth 2.0 via Spotify e pronto — a playlist é criada automaticamente com o nome escolhido direto na sua conta. Simples, rápido e integrado.',
                    stack: ['Python', 'Flask'],
                    repo: 'https://github.com/cvpalmiere/listtoplaylist',
                },
            ],
        },
        {
            titulo: 'Inteligência Artificial',
            projetos: [
                {
                    tag: 'Automação · 16 meses',
                    titulo: 'Automação de Chatbot',
                    resumo: 'Integração de ChatGPT e Gemini para automação de atendimento no VHF Bank.',
                    detalhe: 'Durante 16 meses no VHF Bank, desenvolvi automações que eliminaram a necessidade de atendentes humanos em várias etapas. Criei fluxos de conversa inteligentes para filtrar e qualificar clientes, além de chatbots integrados com ChatGPT e Gemini que apresentavam a empresa, explicavam o negócio e respondiam perguntas em tempo real — tudo automatizado e disponível 24 horas por dia.',
                    stack: ['Python', 'APIs de IA'],
                    repo: null,
                    repoRotulo: 'Projeto corporativo',
                },
            ],
        },
        {
            titulo: 'Banco de Dados',
            vazio: 'Em breve. Projetos de modelagem e SQL entram aqui em paralelo ao curso Database Foundations, da Oracle.',
            projetos: [],
        },
        {
            titulo: 'Front-end & Acadêmico',
            projetos: [
                {
                    tag: 'Frontend · Cliente real',
                    titulo: 'Landing Page MCMV',
                    resumo: 'Site responsivo para construtora do programa MCMV com layout em bento grid.',
                    detalhe: 'Meu primeiro projeto real como desenvolvedora web. Landing page profissional desenvolvida do zero para uma construtora especializada no programa Minha Casa Minha Vida. O projeto passou por todas as etapas: análise de negócios, levantamento de requisitos, design no Figma, codificação e deploy no GitHub Pages. Layout em Bento Grid com tipografia bold, paleta de alto contraste e botão de WhatsApp com animação. Totalmente responsivo.',
                    stack: ['HTML', 'CSS', 'JS'],
                    repo: 'https://github.com/cvpalmiere/construtora',
                },
                {
                    tag: 'React · Projeto pessoal',
                    titulo: 'Palmiere Studio',
                    resumo: 'Sistema de organização acadêmica com plano de estudo e acompanhamento.',
                    detalhe: 'Organizador acadêmico pessoal desenvolvido para gerenciar minha rotina de estudos durante a faculdade de Engenharia de Software. Dashboard com a aula do dia e plano de estudo matinal em 3 blocos de 1 hora, gerenciamento de prazos e provas com contagem regressiva, calendário mensal, estatísticas de progresso e planos de estudo gerados automaticamente. Feito com React 18 e Vite, com persistência em localStorage.',
                    stack: ['React', 'Vite'],
                    repo: 'https://github.com/cvpalmiere/PalmiereStudio',
                },
            ],
        },
    ];

    // Gera o botão de repositório ou um botão desativado quando o projeto não tem link público.
    function renderBotaoRepo(projeto) {
        if (projeto.repo) {
            return `<a href="${projeto.repo}" target="_blank" rel="noreferrer" class="btn-card">Ver repositório ${ICONES.externo}</a>`;
        }
        return `<span class="btn-card desativado">${projeto.repoRotulo || 'Sem repositório'}</span>`;
    }

    // Cria um projeto com visual essencial e detalhes recolhidos em acordeão.
    function renderProjeto(projeto, idDetalhe) {
        const item = document.createElement('article');
        item.className = 'projeto-item';

        item.innerHTML = `
            <span class="projeto-tag">${projeto.tag}</span>
            <h4>${projeto.titulo}</h4>
            <p class="projeto-resumo">${projeto.resumo}</p>
            <div class="acordeao" id="${idDetalhe}">
                <div class="acordeao-interno">
                    <div class="acordeao-conteudo">
                        <p class="projeto-detalhe">${projeto.detalhe}</p>
                        <div class="chips">
                            ${projeto.stack.map((tech) => `<span>${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-acoes">
                <button type="button" class="btn-card btn-card-leve" aria-expanded="false" aria-controls="${idDetalhe}">
                    Ver mais sobre ${ICONES.chevron}
                </button>
                ${renderBotaoRepo(projeto)}
            </div>
        `;

        vincularAcordeao(item.querySelector('button'), item.querySelector('.acordeao'));
        return item;
    }

    // Cria o bloco de uma categoria com cabeçalho numerado e a lista de projetos.
    function renderCategoria(categoria, indice) {
        const bloco = document.createElement('div');
        bloco.className = 'projetos-categoria reveal';

        const numero = String(indice + 1).padStart(2, '0');
        bloco.innerHTML = `
            <div class="categoria-cabecalho">
                <span class="categoria-numero">${numero}</span>
                <h3>${categoria.titulo}</h3>
            </div>
        `;

        if (categoria.projetos.length === 0) {
            const vazio = document.createElement('p');
            vazio.className = 'projeto-vazio';
            vazio.textContent = categoria.vazio;
            bloco.appendChild(vazio);
            return bloco;
        }

        categoria.projetos.forEach((projeto, i) => {
            bloco.appendChild(renderProjeto(projeto, `projeto-detalhe-${indice}-${i}`));
        });
        return bloco;
    }

    categorias.forEach((categoria, indice) => {
        container.appendChild(renderCategoria(categoria, indice));
    });
}
