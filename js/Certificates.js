function initCertificates() {
    const container = document.getElementById('certificates-container');
    if (!container) return;

    const categories = [
        { id: 'todos', label: 'Todos', tone: 'ember' },
        { id: 'dev', label: 'Desenvolvimento', tone: 'ember' },
        { id: 'db', label: 'Banco de Dados', tone: 'sky' },
        { id: 'pessoas', label: 'Gestão de Pessoas', tone: 'sage' },
        { id: 'ia', label: 'IA', tone: 'orchid' },
    ];

    const certificates = [
        // ============ 1º — CC50 Harvard ============
        {
            category: 'dev',
            title: 'CC50 — Harvard (em português)',
            issuer: 'Harvard / Fundação Estudar',
            meta: '15 módulos · 90 aulas · Online e gratuito',
            focus: ['C', 'Python', 'SQL', 'JavaScript', 'HTML & CSS', 'Flask'],
            tone: 'ember',
            image: 'assets/certificados/cc50.png',
            summary: 'Versão em português do CS50 de Harvard. O curso mais completo que já fiz: 15 módulos que vão do Scratch ao Flask, com projetos práticos em cada etapa e um projeto final para o portfólio.',
            bullets: [
                {
                    title: 'Módulo 0 — Scratch',
                    text: 'Introdução à lógica de programação com blocos visuais.',
                },
                {
                    title: 'Módulo 1 ao 5 — C, Arrays, Algoritmos, Memória, Estruturas de Dados',
                    text: 'Fundamentos pesados de ciência da computação: loops, ponteiros, ordenação, alocação dinâmica, listas ligadas e árvores.',
                },
                {
                    title: 'Módulo 6 — Python',
                    text: 'De C para Python: scripts, funções, manipulação de arquivos e bibliotecas.',
                },
                {
                    title: 'Módulo 6.5 — Inteligência Artificial',
                    text: 'Fundamentos de IA e como modelos como ChatGPT funcionam por dentro.',
                },
                {
                    title: 'Módulo 7 — SQL',
                    text: 'Banco de dados relacional: consultas, filtros, joins e modelagem.',
                },
                {
                    title: 'Módulo 8 — HTML, CSS e JavaScript',
                    text: 'Desenvolvimento web front-end: estrutura, estilo e interatividade.',
                },
                {
                    title: 'Módulo 9 — Flask',
                    text: 'Back-end com Python: rotas, templates, formulários e APIs.',
                },
                {
                    title: 'Módulo 10 — Ética',
                    text: 'Reflexão sobre responsabilidade, privacidade e o impacto social da tecnologia.',
                },
            ],
        },

        // ============ 2º — Fluência em IA — Anthropic ============
        {
            category: 'ia',
            title: 'Fluência em IA',
            issuer: 'Anthropic',
            meta: 'Engenharia de Prompt · Uso Estratégico · Safety',
            focus: ['Claude', 'Prompt Engineering', 'APIs de IA', 'Safety'],
            tone: 'orchid',
            image: 'assets/certificados/fluencia_em_IA_Anthropic.png',
            summary: 'Certificação oficial da Anthropic com foco em uso profissional e seguro de modelos de IA generativa, alinhada com a prática real em automação de atendimento.',
            bullets: [
                {
                    title: 'Domínio do Claude',
                    text: 'Uso avançado do modelo Claude em tarefas de análise, criação de conteúdo e automação de processos.',
                },
                {
                    title: 'Engenharia de Prompt',
                    text: 'Técnicas para escrever instruções eficazes que melhoram drasticamente a qualidade das respostas dos modelos.',
                },
                {
                    title: 'Uso Estratégico de IA',
                    text: 'Como integrar IA em fluxos de trabalho reais com foco em produtividade, segurança e ética.',
                },
                {
                    title: 'Segurança e Confiabilidade',
                    text: 'Boas práticas para evitar alucinações, vieses e uso inadequado dos modelos em produção.',
                },
            ],
        },

        // ============ 3º — Automação com ChatGPT e Gemini ============
        {
            category: 'ia',
            title: 'Automação com ChatGPT e Gemini',
            issuer: 'Prática profissional · VHF Bank',
            meta: '16 meses · Chatbots e fluxos',
            focus: ['ChatGPT', 'Gemini', 'APIs', 'Python'],
            tone: 'orchid',
            image: null,
            summary: 'Aplicação de modelos de linguagem em fluxos de atendimento reais, eliminando etapas manuais e reduzindo a dependência de atendentes humanos.',
            bullets: [
                {
                    title: 'Integração de APIs de IA',
                    text: 'Conexão de ChatGPT e Gemini a fluxos de atendimento e regras de negócio.',
                },
                {
                    title: 'Desenho de conversas',
                    text: 'Fluxos que entendem intenção, tratam exceções e escalam quando necessário.',
                },
                {
                    title: 'Resultado',
                    text: 'Processos manuais transformados em automação contínua e mensurável.',
                },
            ],
        },

        // ============ 4º — HTML, CSS, JavaScript e Figma ============
        {
            category: 'dev',
            title: 'HTML, CSS, JavaScript e Figma',
            issuer: 'Formação Front-end + Design',
            meta: 'Interfaces · UX/UI · Responsivo',
            focus: ['HTML', 'CSS', 'JavaScript', 'Figma'],
            tone: 'ember',
            image: 'assets/certificados/html-css-figma.png',
            summary: 'Curso que combina design visual com programação front-end — a formação mais comum para quem quer dominar a criação de interfaces, exatamente a área explorada nos meus projetos.',
            bullets: [
                {
                    title: 'Design e Prototipagem (Figma)',
                    text: 'Layouts, protótipos interativos e design systems para planejar a experiência do usuário antes de programar.',
                },
                {
                    title: 'Estrutura e Estilo (HTML e CSS)',
                    text: 'Estrutura semântica e estilização moderna com Flexbox e Grid, com layout responsivo para celulares.',
                },
                {
                    title: 'Interatividade (JavaScript)',
                    text: 'Interações, animações e funcionalidades dinâmicas que respondem ao usuário.',
                },
                {
                    title: 'Ferramentas de Publicação',
                    text: 'Git e GitHub para versionamento e Vite para iniciar projetos modernos, integrando o design do Figma ao código final.',
                },
            ],
        },

        // ============ 5º — Database Foundations — Oracle ============
        {
            category: 'db',
            title: 'Database Foundations',
            issuer: 'Oracle',
            meta: 'Em andamento · Modelagem · SQL · Oracle APEX',
            focus: ['SQL', 'Oracle DB', 'Modelagem', 'APEX'],
            tone: 'sky',
            image: null,
            summary: 'Curso oficial da Oracle com foco em design de banco de dados, modelagem relacional e introdução ao SQL. Currículo orientado a projeto com certificação reconhecida pelo setor.',
            bullets: [
                {
                    title: 'Modelagem de Dados',
                    text: 'Técnicas de design de banco de dados, diagrama entidade-relacionamento (ERD) e refinamento do modelo de dados.',
                },
                {
                    title: 'Oracle SQL Developer Data Modeler',
                    text: 'Ferramenta profissional para criar e mapear modelos físicos a partir de modelos lógicos.',
                },
                {
                    title: 'Introdução ao SQL',
                    text: 'Criação, execução e salvamento de instruções SQL no Oracle Application Express (APEX).',
                },
                {
                    title: 'Certificação Oracle',
                    text: 'Curso preparatório com reconhecimento do setor e exames intermediário, final e cumulativo ao longo de 6 seções.',
                },
            ],
        },

        // ============ 6º — IA e Habilidades Humanas — USP ============
        {
            category: 'pessoas',
            title: 'IA e Habilidades Humanas para Gestão de Equipes',
            issuer: 'USP',
            meta: 'Liderança · Times de tecnologia',
            focus: ['Gestão', 'Soft skills', 'IA no trabalho'],
            tone: 'sage',
            image: 'assets/certificados/gestao_ia_pessoas.png',
            summary: 'Curso com foco no lado humano do desenvolvimento: como conduzir pessoas em times de tecnologia em um mercado transformado pela inteligência artificial.',
            bullets: [
                {
                    title: 'O papel da IA',
                    text: 'Como a inteligência artificial vem sendo usada no mercado hoje e o que muda no dia a dia dos times.',
                },
                {
                    title: 'Gestão de equipes',
                    text: 'Como gerenciar pessoas em um ambiente de desenvolvimento, com foco no lado humano do trabalho.',
                },
                {
                    title: 'Diferencial de portfólio',
                    text: 'Mostra preparo para entender tanto as tecnologias quanto as pessoas que as constroem.',
                },
            ],
        },
    ];

    let activeCategory = 'todos';

    // Abre o lightbox com a imagem
    function abrirLightbox(src) {
        const lightbox = document.getElementById('lightbox');
        const img = document.getElementById('lightbox-img');
        if (!lightbox || !img) return;
        img.src = src;
        lightbox.classList.add('aberto');
    }

    function renderFilters() {
        const filtrosDiv = document.createElement('div');
        filtrosDiv.className = 'cert-filtros';

        categories.forEach((cat) => {
            const btn = document.createElement('button');
            btn.className = 'cert-filtro-btn';
            if (cat.id === activeCategory) {
                btn.classList.add('ativo');
            }
            btn.textContent = cat.label;
            btn.addEventListener('click', () => {
                activeCategory = cat.id;
                renderAll();
            });
            filtrosDiv.appendChild(btn);
        });

        return filtrosDiv;
    }

    function renderCard(cert) {
        const article = document.createElement('article');
        article.className = 'cert-card reveal';

        article.innerHTML = `
            <div class="cert-header">
                <div>
                    <p class="cert-emissor ${cert.tone}">${cert.issuer}</p>
                    <h3>${cert.title}</h3>
                </div>
                <span class="cert-badge">Certificado</span>
            </div>
            <p class="cert-meta">${cert.meta}</p>
            <p class="cert-summary">${cert.summary}</p>
            <div class="cert-bullets">
                ${cert.bullets
                    .map(
                        (b) => `
                    <div class="cert-bullet">
                        <p class="cert-bullet-title">${b.title}</p>
                        <p class="cert-bullet-text">${b.text}</p>
                    </div>
                `
                    )
                    .join('')}
            </div>
            <div class="cert-focus">
                ${cert.focus.map((f) => `<span>${f}</span>`).join('')}
            </div>
            ${cert.image
                ? `<button class="cert-ver-btn" data-img="${cert.image}">Ver certificado</button>`
                : `<span class="cert-ver-btn sem-link" style="pointer-events:none; cursor:default;">Ver certificado</span>`
            }
        `;

        // Evento do botão "Ver certificado"
        const btn = article.querySelector('.cert-ver-btn');
        if (btn && cert.image) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                abrirLightbox(cert.image);
            });
        }

        return article;
    }

    function renderCards() {
        const grid = document.createElement('div');
        grid.className = 'cert-grid';

        const filtered =
            activeCategory === 'todos'
                ? certificates
                : certificates.filter((c) => c.category === activeCategory);

        filtered.forEach((cert) => {
            grid.appendChild(renderCard(cert));
        });

        return grid;
    }

    function renderAll() {
        container.innerHTML = '';
        container.appendChild(renderFilters());
        container.appendChild(renderCards());

        const reveals = container.querySelectorAll('.reveal');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );
        reveals.forEach((el) => observer.observe(el));
    }

    renderAll();
}
