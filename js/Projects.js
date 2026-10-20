// ============================================================
// PROJECTS.JS — Renderiza os projetos separados por categoria
// ============================================================

// Monta toda a seção de projetos; depende de ICONES, vincularAcordeao e abrirLightbox (Ui.js).
function initProjects() {
    const container = document.getElementById('projetos-container');
    if (!container) return;

    // Categorias na ordem de exibição; listas vazias exibem a mensagem "vazio" para manter a estrutura.
    // Cada projeto usa "detalhe" (parágrafo único) ou "blocos" (título e texto);
    // "imagens" (abrem no lightbox), "documentos" (abrem em nova aba) e "rotuloDetalhes" são opcionais.
    const categorias = [
        {
            titulo: 'Análise de Dados & BI',
            projetos: [
                {
                    tag: 'Estudo guiado · Dados reais',
                    titulo: 'Painel de Inflação: IPCA / IBGE',
                    resumo: 'Análise de 6 anos de IPCA com dados reais do IBGE: script em Python, banco normalizado no PostgreSQL, queries em SQL e dashboard no Power BI. A inflação acumulada de 2020 a 2025 foi de 39,15%, com Alimentação e bebidas liderando (53,99%).',
                    rotuloDetalhes: 'Ver dashboard, query e descobertas',
                    blocos: [
                        {
                            titulo: 'Objetivo',
                            texto: 'Responder à pergunta "o que anda pesando no custo de vida e isso mudou ao longo dos anos?", comparando grupos de produtos e períodos com dados reais do IBGE.',
                        },
                        {
                            titulo: 'O que fiz',
                            texto: 'Baixei o IPCA de 2020 a 2025 da tabela 7060 do SIDRA/IBGE por script em Python e organizei os dados em um banco PostgreSQL normalizado no Neon. Escrevi queries em SQL para acumulado, impacto e volatilidade, montei o painel no Power BI e reuni as conclusões em um PDF de análise.',
                        },
                        {
                            titulo: 'Problemas resolvidos',
                            texto: 'A inflação saltou de 4,52% em 2020 para 10,06% em 2021 e desacelerou depois. Alimentação e bebidas foi o grupo que mais subiu e também o que mais pesou no bolso (cerca de 9,09 pontos percentuais de impacto). Vestuário teve a segunda maior alta, mas impacto de só 1,61, por ter peso pequeno na cesta.',
                        },
                        {
                            titulo: 'Aprendizado',
                            texto: 'Percentuais não se somam: em Saúde, a soma simples dava 34,89% e a composição das taxas dá 40,03%. Também aprendi a definir o período de comparação antes de olhar os números e a usar a mediana quando o reajuste se concentra em um mês, como na Educação em fevereiro (média 0,47 contra mediana 0,06).',
                        },
                    ],
                    imagens: [
                        { rotulo: 'Ver query', src: 'assets/projetos/queryInflacao.png' },
                        { rotulo: 'Ver dashboard', src: 'assets/projetos/powerBiInflacao.png' },
                    ],
                    documentos: [
                        { rotulo: 'Ver análise (PDF)', href: 'assets/projetos/analiseInflacaoIBGE.pdf' },
                    ],
                    stack: ['Python', 'SQL', 'PostgreSQL', 'Power BI', 'IBGE / SIDRA'],
                    repo: 'https://github.com/cvpalmiere/exercicios',
                },
                {
                    tag: 'Exercício integrado · Dados',
                    titulo: 'Investigação de Dados: Carmem Sandiego',
                    resumo: 'Limpeza de mais de 2.000 linhas no Excel, 1 suspeita isolada por 8 pistas em PostgreSQL e um dashboard no Power BI que responde perguntas como qual profissão mais gasta.',
                    rotuloDetalhes: 'Ver dashboard, query e problemas resolvidos',
                    blocos: [
                        {
                            titulo: 'Objetivo',
                            texto: 'Treinar o fluxo completo de dados (CSV sujo, limpeza, banco, consulta e visualização) em um mistério com 2.000 suspeitos e 8 pistas.',
                        },
                        {
                            titulo: 'O que fiz',
                            texto: 'Limpei e padronizei mais de 2.000 linhas no Excel: duplicatas, textos, datas em 4 formatos, valores monetários, booleanos e nulos. Carreguei os dados no Neon com um script em Python, isolei a única suspeita com uma query que combina as 8 pistas e montei o dashboard no Power BI a partir dessas tabelas.',
                        },
                        {
                            titulo: 'Problemas resolvidos',
                            texto: 'Identificar 1 suspeita entre 2.000 registros cruzando 8 pistas em uma única query. No dashboard, responder perguntas sobre os dados limpos, como qual profissão mais gasta.',
                        },
                        {
                            titulo: 'Aprendizado',
                            texto: 'Validar por chave (id) em vez de posição de linha, depois de um desalinhamento de datas, e usar mediana e contagem no lugar de soma.',
                        },
                    ],
                    imagens: [
                        { rotulo: 'Ver query', src: 'assets/projetos/carmenQuery.png' },
                        { rotulo: 'Ver dashboard', src: 'assets/projetos/PowerBiCarmen.png' },
                    ],
                    stack: ['Excel', 'SQL', 'PostgreSQL', 'Power BI', 'Python', 'Prisma'],
                    repo: 'https://github.com/cvpalmiere/exercicios',
                },
            ],
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

    // Gera o conteúdo do acordeão: blocos curtos quando existem, ou o parágrafo único como padrão.
    // Os blocos reaproveitam as classes de bullet dos certificados para manter o mesmo visual.
    function renderDetalhe(projeto) {
        if (!projeto.blocos) {
            return `<p class="projeto-detalhe">${projeto.detalhe}</p>`;
        }
        return `
            <div class="cert-bullets">
                ${projeto.blocos
                    .map(
                        (bloco) => `
                    <div class="cert-bullet">
                        <p class="cert-bullet-title">${bloco.titulo}</p>
                        <p class="cert-bullet-text">${bloco.texto}</p>
                    </div>
                `
                    )
                    .join('')}
            </div>
        `;
    }

    // Gera os botões de mídia do projeto: imagens abrem no lightbox e documentos abrem em nova aba.
    function renderMidias(projeto) {
        const botoesImagem = (projeto.imagens || []).map(
            (img) => `<button type="button" class="btn-card" data-imagem="${img.src}">${ICONES.imagem} ${img.rotulo}</button>`
        );
        const linksDocumento = (projeto.documentos || []).map(
            (doc) => `<a href="${doc.href}" target="_blank" rel="noreferrer" class="btn-card">${ICONES.externo} ${doc.rotulo}</a>`
        );

        const botoes = [...botoesImagem, ...linksDocumento];
        if (botoes.length === 0) return '';
        return `<div class="card-acoes">${botoes.join('')}</div>`;
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
                        ${renderDetalhe(projeto)}
                        ${renderMidias(projeto)}
                        <div class="chips">
                            ${projeto.stack.map((tech) => `<span>${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-acoes">
                <button type="button" class="btn-card btn-card-leve" data-acao="detalhes" aria-expanded="false" aria-controls="${idDetalhe}">
                    ${projeto.rotuloDetalhes || 'Ver mais sobre'} ${ICONES.chevron}
                </button>
                ${renderBotaoRepo(projeto)}
            </div>
        `;

        vincularAcordeao(item.querySelector('[data-acao="detalhes"]'), item.querySelector('.acordeao'));

        // Abre cada imagem do projeto no lightbox ao clicar no botão correspondente.
        item.querySelectorAll('[data-imagem]').forEach((botao) => {
            botao.addEventListener('click', () => abrirLightbox(botao.dataset.imagem));
        });

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