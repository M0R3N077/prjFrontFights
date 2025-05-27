import { Vector3 } from 'three';

// Convert geographic coordinates to 3D position on globe
export const latLngToVector3 = (lat: number, lng: number, radius: number): Vector3 => {
  // Convert latitude and longitude from degrees to radians
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  // Convert spherical coordinates to cartesian
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return new Vector3(x, y, z);
};

interface Fighter {
  name: string;
  record: string;
  country: string;
  image?: string;
}

// Data completa das artes marciais
export const martialArts = [
  {
  id: '1',
  name: 'Capoeira',
  country: 'Brasil',
  coords: { lat: -14.2350, lng: -51.9253 }, // Ponto central do Brasil
  description: 'A Capoeira é uma arte marcial afro-brasileira que mistura elementos de luta, dança, música e acrobacia, desenvolvida por africanos escravizados no Brasil colonial como forma de resistência cultural e física.',
  image: '/martial-arts/capoeira.jpg',
  origin: 'Brasil, século XVI, desenvolvida por africanos escravizados nas regiões de engenho e quilombos.',
  foundedBy: ['Povos africanos escravizados no Brasil'],
  parentArts: ['Lutas africanas tradicionais', 'Dança tribal africana'],
  techniques: [
    'Ginga (movimento base)',
    'Meia-lua de frente',
    'Armada',
    'Bênção',
    'Rabo de arraia',
    'Aú (estrela)',
    'Esquiva',
    'Macaco',
    'Queda de rins',
    'Rolê',
    'Martelo',
    'Ponteira'
  ],
  beltSystem: {
    capoeiraRegional: ['Crua', 'Crua-verde', 'Verde', 'Verde-amarela', 'Amarela', 'Amarela-azul', 'Azul', 'Azul-vermelha', 'Vermelha', 'Vermelha-branca', 'Branca'],
    observação: 'O sistema de graduação varia entre escolas e linhagens. Na Capoeira Angola, muitas vezes não há graduação formal.'
  },
  history: `A Capoeira surgiu no Brasil colonial, criada por africanos escravizados que adaptaram danças e lutas de suas culturas de origem. Para driblar a repressão dos senhores e capatazes, a luta foi disfarçada como dança e acompanhada de música. Após a abolição da escravidão em 1888, a Capoeira foi marginalizada e proibida por décadas, sendo associada ao crime. A legalização começou com o trabalho de figuras como Mestre Bimba, que criou a Capoeira Regional, e Mestre Pastinha, defensor da Capoeira Angola. Hoje, a Capoeira é Patrimônio Cultural Imaterial da Humanidade (UNESCO) e praticada em todo o mundo.`,
  philosophy: `A Capoeira carrega uma filosofia de liberdade, resistência e expressão corporal. É uma arte que valoriza a malícia (mandinga), a improvisação, o respeito ao próximo e à ancestralidade. A prática da Capoeira desenvolve equilíbrio, ritmo, consciência corporal, força e coletividade, além de promover a cultura afro-brasileira por meio do canto, instrumentos e rituais da roda.`,
  howFight: `A luta acontece dentro da roda, formada por capoeiristas, músicos e espectadores. Dois jogadores entram na roda ao som do berimbau e de outros instrumentos, seguindo o ritmo que define o jogo: lento e estratégico na Capoeira Angola; mais rápido e atlético na Regional. Os jogadores trocam movimentos fluidos, esquivas, golpes e acrobacias, buscando expressar domínio, criatividade e controle, sem necessariamente nocautear o oponente.`,
  competitionFormats: ['Apresentações (rodas)', 'Jogos formais', 'Festivais culturais e torneios (com ou sem pontuação)'],
  governingBodies: ['ABCA (Associação Brasileira de Capoeira Angola)', 'Liga Nacional de Capoeira', 'Federação Internacional de Capoeira'],
  famousFighters: [
    {
      name: "Mestre Bimba",
      record: "Criador da Capoeira Regional, responsável pela legalização da Capoeira",
      titles: ["Fundador da primeira escola oficial de Capoeira (1932)"],
      country: "Brasil",
      image: "/fighters/bimba.jpg"
    },
    {
      name: "Mestre Pastinha",
      record: "Guardião da Capoeira Angola",
      titles: ["Fundador do Centro Esportivo de Capoeira Angola (1941)"],
      country: "Brasil",
      image: "/fighters/pastinha.jpg"
    },
    {
      name: "Mestre Suassuna",
      record: "Fundador do Grupo Cordão de Ouro",
      titles: ["Um dos grandes divulgadores internacionais da Capoeira"],
      country: "Brasil",
      image: "/fighters/suassuna.jpg"
    },
    {
      name: "Mestre João Grande",
      record: "Discípulo de Pastinha, referência mundial da Capoeira Angola",
      country: "Brasil",
      image: "/fighters/joaogrande.jpg"
    }
  ],
  influence: {
    cultura: 'A Capoeira é símbolo da cultura afro-brasileira e é reconhecida como Patrimônio Cultural da Humanidade pela UNESCO. Ela está presente em músicas, danças, filmes e nas comunidades brasileiras e estrangeiras.',
    educação: 'A Capoeira é usada como ferramenta educacional e de inclusão social em escolas, ONGs e projetos comunitários.',
    internacional: 'Praticada em mais de 160 países, a Capoeira tornou-se símbolo do Brasil no exterior, influenciando até videogames, filmes e coreografias pop.'
  },
  curiosities: [
    'O principal instrumento da Capoeira é o berimbau, acompanhado por atabaque, pandeiro, agogô e reco-reco.',
    'A palavra "Capoeira" pode ter vindo do tupi-guarani "ka’a puêra", que significa “mato ralo onde se combate”.',
    'Capoeiristas se cumprimentam com o termo "Axé", que significa energia positiva.',
    'Em 2014, a Capoeira foi declarada Patrimônio Cultural Imaterial da Humanidade pela UNESCO.',
    'A Capoeira também é praticada por forças armadas em programas de defesa pessoal no Brasil e no mundo.'
  ]
},
  {
  id: '2',
  name: 'Kung Fu',
  country: 'China',
  coords: { lat: 35.8617, lng: 104.1954 }, // Coordenadas aproximadas da China
  description: 'Kung Fu é o termo genérico ocidental para as artes marciais tradicionais chinesas, que englobam centenas de estilos com diferentes origens, filosofias e técnicas, algumas com séculos ou milênios de existência.',
  image: '/martial-arts/kung-fu.jpg',
  origin: 'China antiga, com raízes espirituais, filosóficas e militares que remontam a mais de 4.000 anos.',
  foundedBy: ['Diversas escolas e mestres ao longo de milênios, incluindo monges do Templo Shaolin'],
  parentArts: ['Lutas tradicionais chinesas', 'Taoismo', 'Confucionismo', 'Budismo'],
  techniques: [
    'Wing Chun (ataques diretos e curtos)',
    'Tai Chi Chuan (movimentos lentos e meditativos)',
    'Shaolin Kung Fu (baseado nos movimentos dos animais)',
    'Hung Gar (estilo do tigre e da garça)',
    'Choy Li Fut (movimentos circulares e explosivos)',
    'Bagua Zhang (movimentação circular)',
    'Xing Yi Quan (linhas retas e força explosiva)',
    'Northern Long Fist',
    'Wushu moderno (estilo esportivo/acrobático)'
  ],
  beltSystem: 'A maioria dos estilos tradicionais não usa faixas, mas algumas escolas modernas adotaram sistemas de graduação com cores semelhantes às artes marciais japonesas ou coreanas.',
  history: `O Kung Fu tem origens profundas na história chinesa, remontando a práticas de combate militar, caça e defesa pessoal da antiguidade. No século V d.C., o monge indiano Bodhidharma teria introduzido exercícios físicos e mentais no Templo Shaolin, o que influenciou significativamente o desenvolvimento das artes marciais chinesas. Com o passar dos séculos, surgiram centenas de estilos diferentes, muitos baseados em movimentos de animais como o tigre, a serpente, o dragão e a garça. O Kung Fu também foi usado por exércitos, por camponeses em revoltas e por grupos religiosos, além de se tornar elemento essencial da cultura chinesa.`,
  philosophy: `Kung Fu é mais do que luta: representa autodisciplina, paciência, equilíbrio e o cultivo do espírito por meio da prática corporal. Muitos estilos incorporam princípios do taoismo (como o fluxo do Qi), do budismo (autoconhecimento e iluminação) e do confucionismo (ética e respeito). A busca pelo domínio de si mesmo é constante, com ênfase na harmonia entre mente, corpo e ambiente.`,
  howFight: `Cada estilo de Kung Fu tem abordagens diferentes para o combate. Alguns enfatizam o combate direto (como o Wing Chun), outros a suavidade e redirecionamento (como o Tai Chi). Muitos estilos utilizam chutes, socos, quedas, torções, acrobacias, armas e estratégias de respiração. Em competições modernas, como o Sanda (boxe chinês), o foco é o combate direto com regras específicas de pontuação e proteção.`,
  competitionFormats: [
    'Sanda (combate esportivo com luvas e quedas)',
    'Wushu (formas acrobáticas e coreografadas)',
    'Duelos tradicionais em escolas de Kung Fu',
    'Demonstrações técnicas em festivais'
  ],
  governingBodies: [
    'IWUF (Federação Internacional de Wushu)',
    'Chinese Wushu Association',
    'Federações nacionais e regionais de artes marciais chinesas'
  ],
  famousFighters: [
    {
      name: "Ip Man",
      record: "Mestre de Wing Chun, mentor de Bruce Lee",
      titles: ["Reconhecido como o maior divulgador do estilo Wing Chun no século XX"],
      country: "China",
      image: "/fighters/ipman.jpg"
    },
    {
      name: "Wong Fei-hung",
      record: "Médico, artista marcial e herói popular",
      titles: ["Lendário mestre do Hung Gar e símbolo da resistência chinesa"],
      country: "China",
      image: "/fighters/wongfei.jpg"
    },
    {
      name: "Bruce Lee",
      record: "Influência global das artes marciais",
      titles: ["Fundador do Jeet Kune Do, revolucionou a imagem do Kung Fu no ocidente"],
      country: "Hong Kong / EUA",
      image: "/fighters/brucelee.jpg"
    },
    {
      name: "Jet Li",
      record: "Múltiplos títulos nacionais de Wushu na juventude",
      titles: ["Ator e campeão nacional de Wushu moderno"],
      country: "China",
      image: "/fighters/jetli.jpg"
    }
  ],
  influence: {
    cultura: 'O Kung Fu influenciou profundamente o cinema, a música, a dança, a filosofia oriental e até a medicina tradicional chinesa. Tornou-se símbolo da identidade cultural chinesa.',
    educação: 'Ensinado em escolas e universidades na China e em academias do mundo inteiro, promove disciplina, saúde física e valores culturais.',
    internacional: 'Graças a filmes, mestres como Bruce Lee e competições internacionais, o Kung Fu é praticado em mais de 150 países.'
  },
  curiosities: [
    'A palavra "Kung Fu" (功夫) originalmente significa "habilidade adquirida com esforço", e não necessariamente arte marcial.',
    'O lendário monge Bodhidharma é considerado o "pai espiritual" do Kung Fu Shaolin.',
    'Estilos de Kung Fu foram desenvolvidos com base em animais como tigre, serpente, águia, macaco e louva-a-deus.',
    'Jet Li foi campeão nacional de Wushu aos 11 anos.',
    'A China considera o Wushu moderno um esporte nacional e o utiliza como ferramenta diplomática cultural.'
  ]
},
  {
  id: '3',
  name: 'Muay Thai',
  country: 'Tailândia',
  coords: { lat: 15.8700, lng: 100.9925 }, // Coordenadas da Tailândia
  description: 'Arte marcial tailandesa conhecida como a "Arte das Oito Armas", que combina golpes com punhos, cotovelos, joelhos e canelas em um sistema de combate em pé altamente eficaz.',
  image: '/martial-arts/muaythai.jpg',
  origin: 'Tailândia, com raízes históricas no século XVI durante o Reino de Ayutthaya.',
  foundedBy: ['Desenvolvido por guerreiros tailandeses como método de combate e defesa'],
  parentArts: ['Muay Boran', 'Kard Chuek', 'Sistemas de combate do sudeste asiático'],
  techniques: [
    'Jabs, cruzados e uppercuts (punhos)',
    'Chutes frontais (teep) e circulares (roundhouse)',
    'Joelhadas voadoras e clinch com joelhadas',
    'Cotoveladas em corte e giratórias',
    'Clinch (controle corpo a corpo e desequilíbrios)',
    'Defesas com cotovelo e joelho',
    'Bloqueios com as canelas'
  ],
  beltSystem: 'Tradicionalmente, o Muay Thai não possui faixas. A progressão é baseada na experiência em lutas e respeito dentro do camp. Algumas academias modernas adaptaram graduações simbólicas para fins educacionais.',
  history: `O Muay Thai surgiu a partir de antigos sistemas de combate militar conhecidos como Muay Boran, usados por soldados do Reino de Ayutthaya no século XVI. Com o tempo, evoluiu para um esporte nacional da Tailândia, mantendo elementos tradicionais como o "Wai Kru Ram Muay" (ritual de respeito antes da luta) e a música tradicional tocada durante os combates. Tornou-se popular mundialmente a partir do século XX, sendo reconhecido como uma das artes marciais mais letais e eficazes no combate em pé.`,
  philosophy: `O Muay Thai valoriza respeito, coragem, disciplina e honra. Os lutadores aprendem desde cedo a importância de reverenciar seus mestres, adversários e tradições. O treinamento exige extremo esforço físico e mental, moldando não apenas o corpo, mas também o caráter. O Wai Kru representa esse espírito de gratidão e humildade que permeia toda a prática.`,
  howFight: `No ringue, o Muay Thai é direto e agressivo. Os lutadores se aproximam com ataques constantes e controle no clinch. É comum o uso de cotoveladas para cortes, joelhadas para desgaste e chutes baixos para enfraquecer as pernas do oponente. A defesa é baseada em bloqueios com as canelas e esquivas curtas.`,
  competitionFormats: [
    'Lutas profissionais em estádios como Lumpinee e Rajadamnern (Tailândia)',
    'Ligas internacionais de Muay Thai profissional (WBC, IFMA)',
    'Competições amadoras com equipamentos de proteção',
    'Eventos de K-1 e MMA com regras adaptadas'
  ],
  governingBodies: [
    'IFMA (Federação Internacional de Muaythai Amador)',
    'WBC Muaythai',
    'WMC (World Muaythai Council)',
    'ONE Championship (liga que promove Muay Thai profissionalmente)'
  ],
  famousFighters: [
    {
      name: "Buakaw Banchamek",
      record: "240-24-12",
      titles: ["Campeão K-1 MAX", "Campeão mundial de Muay Thai"],
      country: "Tailândia",
      image: "/fighters/buakaw.jpg"
    },
    {
      name: "Saenchai",
      record: "299-41-5",
      titles: ["Múltiplos títulos no Lumpinee Stadium", "Reconhecido por sua criatividade e técnica superior"],
      country: "Tailândia",
      image: "/fighters/saenchai.jpg"
    },
    {
      name: "Nong-O Hama",
      record: "264-54-1",
      titles: ["Campeão mundial de Muay Thai (ONE Championship)", "Ícone moderno do Muay Thai técnico"],
      country: "Tailândia",
      image: "/fighters/nongo.jpg"
    }
  ],
  influence: {
    cultura: 'O Muay Thai é considerado um patrimônio cultural da Tailândia. Ele é ensinado em escolas, transmitido em cerimônias religiosas e representa a identidade do povo tailandês.',
    educação: 'É praticado nas forças armadas e em programas sociais para desenvolver disciplina e foco entre jovens.',
    internacional: 'Tornou-se uma das bases fundamentais do MMA moderno, além de ser praticado em mais de 100 países como arte marcial, esporte e forma de condicionamento físico.'
  },
  curiosities: [
    'O termo "Muay Thai" significa literalmente "Boxe Tailandês".',
    'É conhecido como a "Arte das Oito Armas" por usar punhos, cotovelos, joelhos e canelas.',
    'O ritual "Wai Kru" é executado antes das lutas para homenagear os mestres e os ancestrais.',
    'Muay Thai era ensinado como parte da preparação militar no passado.',
    'Lutadores tailandeses frequentemente começam a treinar e competir ainda na infância.'
  ]
},
  {
  id: '4',
  name: 'Taekwondo',
  country: 'Coreia do Sul',
  coords: { lat: 36.2048, lng: 128.2529 }, // Coordenadas aproximadas do centro da Coreia do Sul
  description: 'Arte marcial coreana caracterizada por chutes altos, rápidos e técnicas acrobáticas, que valoriza disciplina, respeito e autocontrole.',
  image: '/martial-arts/taekwondo.jpg',
  origin: 'Coreia do Sul, desenvolvido na década de 1940 e formalizado nos anos 1950.',
  foundedBy: ['Choi Hong Hi (fundador do estilo ITF)', 'Governo sul-coreano (na criação do estilo WT)'],
  parentArts: ['Taekkyeon', 'Karate Shotokan', 'Hwa Rang Do', 'Kung Fu chinês'],
  techniques: [
    'Ap Chagi (chute frontal)',
    'Dollyo Chagi (chute circular)',
    'Yop Chagi (chute lateral)',
    'Dwit Chagi (chute para trás)',
    'Naeryo Chagi (chute descendente)',
    'Chutes giratórios (como o tornado kick)',
    'Técnicas de mão como socos retos (jirugi)',
    'Defesas básicas (makki)',
    'Formas (Poomsae ou Tul)'
  ],
  beltSystem: 'Sistema de faixas coloridas que vão do branco ao preto, com variações de acordo com a federação (WT ou ITF). As graduações são divididas em geups (faixas coloridas) e dans (faixas pretas).',
  history: `Após a libertação da Coreia do domínio japonês em 1945, mestres coreanos começaram a fundir artes tradicionais como o Taekkyeon e técnicas do Karate japonês, desenvolvendo escolas conhecidas como "kwans". Em 1955, o nome "Taekwondo" foi oficialmente adotado. Desde então, a arte evoluiu em duas principais vertentes: a ITF (mais tradicional e com ênfase em formas e técnicas lineares) e a WT (voltada para competição esportiva, com foco em chutes rápidos e pontos). Tornou-se esporte olímpico oficial em 2000 nos Jogos de Sydney.`,
  philosophy: `O Taekwondo é guiado por cinco princípios: cortesia, integridade, perseverança, autocontrole e espírito indomável. A prática busca moldar o caráter do praticante tanto quanto suas habilidades físicas. É uma filosofia de vida baseada no respeito ao próximo, no desenvolvimento pessoal e na paz interior.`,
  howFight: `Nas competições WT (World Taekwondo), o combate é baseado em um sistema de pontos, com ênfase em chutes ao tronco e à cabeça. Os lutadores se movimentam constantemente e utilizam chutes giratórios e acrobáticos. Já o ITF permite o uso de socos ao rosto e apresenta uma abordagem mais técnica e tradicional.`,
  competitionFormats: [
    'Kyorugi (luta esportiva olímpica, estilo WT)',
    'Poomsae (apresentação de formas coreografadas)',
    'Tul (formas no estilo ITF)',
    'Quebramentos (Kyukpa)',
    'Demonstrativos (exibições acrobáticas com chutes e quebras)'
  ],
  governingBodies: [
    'World Taekwondo (WT)',
    'International Taekwon-Do Federation (ITF)',
    'Kukkiwon (sede do Taekwondo moderno, em Seul)',
    'Taekwondo Humanitarian Foundation (THF)'
  ],
  famousFighters: [
    {
      name: "Steven Lopez",
      record: "5x Campeão Mundial",
      titles: ["2x Medalhista Olímpico de Ouro", "1x Medalhista de Bronze"],
      country: "EUA",
      image: "/fighters/steven.jpg"
    },
    {
      name: "Hwang Kyung-seon",
      record: "3x Medalha Olímpica",
      titles: ["2x Ouro Olímpico", "1x Bronze Olímpico", "Campeã Mundial"],
      country: "Coreia do Sul",
      image: "/fighters/hwang.jpg"
    },
    {
      name: "Jade Jones",
      record: "2x Ouro Olímpico",
      titles: ["Campeã Europeia e Mundial"],
      country: "Reino Unido",
      image: "/fighters/jade.jpg"
    }
  ],
  influence: {
    cultura: 'Símbolo nacional da Coreia do Sul, promovido mundialmente como parte da diplomacia cultural coreana.',
    educação: 'É ensinado em escolas, academias e até em programas militares em todo o mundo como meio de disciplina e condicionamento físico.',
    internacional: 'Praticado em mais de 200 países. É um dos esportes olímpicos com maior número de federações filiadas.'
  },
  curiosities: [
    'É o único esporte de combate de origem asiática presente em todos os continentes com federação internacional reconhecida pelo COI.',
    '"Tae" significa "pés", "Kwon" significa "mãos", e "Do" significa "caminho" – ou seja, "o caminho dos pés e das mãos".',
    'As competições WT utilizam sensores eletrônicos em coletes e capacetes para registrar os pontos dos golpes.',
    'Existem mais de 70 milhões de praticantes de Taekwondo ao redor do mundo.',
    'O treinamento inclui gritos (kihap) para liberar energia e intimidar o oponente.'
  ]
},
  {
  id: '5',
  name: 'Brazilian Jiu-Jitsu',
  country: 'Brasil',
  coords: { lat: -15.7939, lng: -47.8828 }, // Brasília
  description: 'Arte marcial e sistema de defesa pessoal brasileiro especializado em combate no solo, controle do oponente e finalizações por alavancas, estrangulamentos e chaves articulares.',
  image: '/martial-arts/jiujitsu.jpg',
  origin: 'Desenvolvido no Brasil no início do século XX, com raízes no Jiu-Jitsu japonês.',
  foundedBy: ['Carlos Gracie', 'Hélio Gracie'],
  parentArts: ['Jiu-Jitsu Japonês', 'Judô Kodokan'],
  techniques: [
    'Estrangulamentos (chokeholds)',
    'Chaves de articulação (armbars, kneebars, omoplata)',
    'Raspagens (sweeps)',
    'Passagens de guarda (guard passes)',
    'Controle de posição (mount, side control, back take)',
    'Quedas (takedowns)',
    'Defesa pessoal'
  ],
  beltSystem: {
    adult: ['Branca', 'Azul', 'Roxa', 'Marrom', 'Preta', 'Coral', 'Vermelha'],
    kids: ['Branca', 'Cinza', 'Amarela', 'Laranja', 'Verde']
  },
  history: `O Brazilian Jiu-Jitsu (BJJ) surgiu no Brasil após a chegada do mestre japonês Mitsuyo Maeda em 1914. Maeda ensinou o Jiu-Jitsu para Carlos Gracie, que junto de seu irmão Hélio Gracie, desenvolveu um estilo mais focado em alavancas e técnicas adaptadas para pessoas menores enfrentarem oponentes maiores. A família Gracie teve papel essencial na difusão do BJJ no Brasil e no mundo. Nos anos 1990, Royce Gracie venceu o primeiro torneio do UFC, demonstrando a eficácia do estilo contra várias outras artes marciais. Desde então, o BJJ se espalhou globalmente e tornou-se base para o MMA.`,
  philosophy: `A filosofia do Brazilian Jiu-Jitsu valoriza a técnica sobre a força, a paciência sobre a impulsividade e a inteligência sobre a brutalidade. O praticante aprende a resolver conflitos com controle, sem machucar desnecessariamente o oponente. O BJJ também promove autoconhecimento, respeito, humildade e constante evolução pessoal.`,
  howFight: `As lutas de BJJ geralmente começam em pé, mas rapidamente evoluem para o combate no solo. O objetivo é controlar o adversário através de posições dominantes e buscar a finalização (submission). Em competições, pontos são atribuídos por ações técnicas como quedas, raspagens e passagens de guarda.`,
  competitionFormats: ['Gi (com kimono)', 'No-Gi (sem kimono)'],
  governingBodies: ['IBJJF', 'CBJJ', 'ADCC', 'JJGF'],
  famousFighters: [
    {
      name: "Rickson Gracie",
      record: "400-0 (não oficial)",
      titles: ["Campeão Vale-Tudo", "Referência no Jiu-Jitsu clássico"],
      country: "Brasil",
      image: "/fighters/rickson.jpg"
    },
    {
      name: "Roger Gracie",
      record: "10-2 (MMA), 10x Campeão Mundial de Jiu-Jitsu",
      titles: ["ADCC Champion", "IBJJF World Champion"],
      country: "Brasil",
      image: "/fighters/roger.jpg"
    },
    {
      name: "Marcus 'Buchecha' Almeida",
      record: "13x Campeão Mundial IBJJF, invicto no MMA (até 2025)",
      country: "Brasil",
      image: "/fighters/buchecha.jpg"
    },
    {
      name: "Royce Gracie",
      record: "Campeão do UFC 1, 2 e 4",
      country: "Brasil",
      image: "/fighters/royce.jpg"
    },
    {
      name: "Mackenzie Dern",
      record: "Campeã Mundial IBJJF, competidora do UFC",
      country: "EUA",
      image: "/fighters/mackenzie.jpg"
    }
  ],
  influence: {
  cultura: 'O BJJ tornou-se um símbolo da cultura brasileira moderna, influenciando filmes, séries e videogames. É associado à filosofia de superação e técnica sobre força bruta.',
  educação: 'É amplamente utilizado em projetos sociais no Brasil e no exterior, promovendo inclusão, disciplina e autoestima, especialmente entre jovens em situação de vulnerabilidade.',
  internacional: 'Praticado em mais de 150 países, o BJJ é uma das artes marciais mais populares do mundo, com academias em todos os continentes e forte presença em competições internacionais.'
},
  curiosities: [
    'O primeiro campeonato mundial de BJJ foi organizado pela IBJJF em 1996.',
    'A faixa preta pode levar mais de 10 anos para ser conquistada.',
    'O BJJ é uma das artes marciais com maior número de praticantes fora de seu país de origem.',
    'O termo "oss" é comumente usado entre praticantes como saudação ou sinal de respeito.'
  ]
},
 {
  id: '6',
  name: 'Krav Maga',
  country: 'Israel',
  coords: { lat: 31.0461, lng: 34.8516 }, // Israel
  description: 'Sistema de defesa pessoal israelense voltado para situações reais de violência, com foco em neutralização rápida de ameaças armadas ou desarmadas.',
  image: '/martial-arts/kravmaga.jpg',
  origin: 'Desenvolvido em Israel nos anos 1930 por Imi Lichtenfeld.',
  foundedBy: ['Imi Lichtenfeld'],
  parentArts: ['Boxe', 'Judô', 'Karate', 'Luta Livre'],
  techniques: [
    'Defesa contra faca',
    'Defesa contra arma de fogo',
    'Técnicas de desarme',
    'Ataques a pontos vitais',
    'Combate corpo a corpo',
    'Uso de objetos comuns como armas',
    'Neutralização de múltiplos oponentes'
  ],
  beltSystem: {
    adult: ['Branca', 'Amarela', 'Laranja', 'Verde', 'Azul', 'Marrom', 'Preta'],
    kids: ['Branca', 'Amarela', 'Laranja', 'Verde']
  },
  history: `O Krav Maga surgiu na década de 1930, quando Imi Lichtenfeld, um atleta e lutador judeu, começou a desenvolver técnicas para defender a comunidade judaica em Bratislava contra grupos antissemitas. Após imigrar para o então recém-criado Estado de Israel, Imi adaptou e refinou o sistema para o treinamento das Forças de Defesa de Israel (IDF). Com o tempo, o Krav Maga foi difundido para civis, forças policiais e militares em todo o mundo, sendo reconhecido como um dos sistemas de defesa pessoal mais eficazes e pragmáticos.`,
  philosophy: `A filosofia do Krav Maga é simples: sobreviver. Baseado em movimentos naturais e reações instintivas, o sistema busca respostas rápidas, práticas e diretas a situações de risco. Não há foco em competição, mas sim em eficiência e preparo emocional para lidar com situações extremas. O Krav Maga promove confiança, controle emocional e a capacidade de tomar decisões sob pressão.`,
  howFight: `As situações de combate são simuladas de forma realista. O praticante aprende a identificar a ameaça, reagir com agressividade controlada e neutralizar o perigo com o mínimo de movimentos. Técnicas incluem defesa contra agressões físicas, armas brancas e armas de fogo, tanto em pé quanto no chão.`,
  competitionFormats: ['Não possui competições formais — é voltado exclusivamente para defesa pessoal.'],
  governingBodies: ['IKMF', 'KMG', 'Krav Maga Global', 'Krav Maga Worldwide'],
  famousFighters: [
    {
      name: "Imi Lichtenfeld",
      record: "Fundador",
      titles: ["Criador do Krav Maga", "Instrutor das Forças de Defesa de Israel"],
      country: "Israel",
      image: "/fighters/imi.jpg"
    },
    {
      name: "Eyal Yanilov",
      record: "Instrutor Chefe Global",
      titles: ["Discípulo direto de Imi", "Fundador da KMG (Krav Maga Global)"],
      country: "Israel",
      image: "/fighters/eyal.jpg"
    }
  ],
 influence: {
  cultura: 'Desenvolvido em Israel, o Krav Maga é parte da identidade nacional israelense e é promovido como símbolo de resiliência e autodefesa.',
  educação: 'É ensinado em escolas, academias e forças de segurança ao redor do mundo, sendo utilizado também em programas de empoderamento feminino e prevenção à violência.',
  internacional: 'Com presença em mais de 60 países, o Krav Maga é reconhecido globalmente como um dos sistemas de autodefesa mais eficazes e práticos.'
},
  curiosities: [
    'Krav Maga significa "combate de contato" em hebraico.',
    'É o sistema oficial de defesa pessoal das Forças de Defesa de Israel.',
    'Muitos agentes da SWAT, FBI e exército americano são treinados em Krav Maga.',
    'Não há competições ou torneios — o foco é 100% em sobrevivência real.',
    'É uma das poucas artes marciais que treina contra armas de fogo de forma sistemática.'
  ]
},
 {
  id: '7',
  name: 'Boxe',
  country: 'Reino Unido',
  coords: { lat: 54.0, lng: -2.0 }, // Reino Unido
  description: 'Arte marcial ocidental focada em golpes com os punhos, combinando técnica, velocidade, resistência e estratégia para dominar o adversário.',
  image: '/martial-arts/boxe.jpg',
  origin: 'Desenvolvido na Inglaterra no século XVIII, com raízes em lutas com as mãos desde a antiguidade.',
  foundedBy: ['Desenvolvido coletivamente ao longo do tempo, sem um fundador único'],
  parentArts: ['Pugilismo antigo', 'Lutas com os punhos da antiguidade'],
  techniques: [
    'Jab (soco direto rápido)',
    'Direto (soco poderoso com a mão traseira)',
    'Gancho (soco lateral curvo)',
    'Cruzado (uppercut ou soco ascendente)',
    'Esquiva (movimentos para evitar golpes)',
    'Footwork (movimentação dos pés)',
    'Bloqueios e defesas'
  ],
  beltSystem: {
    adult: ['Sem sistema de faixas formal, progressão por títulos e categorias de peso'],
    kids: ['Treinamento adaptado para crianças, sem sistema de faixas formal']
  },
  history: `O boxe é uma das formas mais antigas de combate corporal, com registros de lutas com os punhos desde civilizações antigas, como Egito, Grécia e Roma. O boxe moderno, com regras claras, luvas e rounds, surgiu na Inglaterra no século XVIII, popularizado pelo Marquês de Queensberry. Desde então, tornou-se um esporte olímpico e uma modalidade profissional de enorme popularidade mundial, com lendas como Muhammad Ali, Joe Louis e Mike Tyson definindo épocas e estilos.`,
  philosophy: `A filosofia do boxe valoriza disciplina, resistência física e mental, estratégia e respeito pelo adversário. Embora seja um esporte de contato intenso, o boxe também promove autocontrole, foco e preparo para enfrentar desafios dentro e fora do ringue.`,
  howFight: `As lutas são disputadas em rounds, onde os pugilistas buscam pontos por golpes limpos e técnicas, além de tentarem nocautear o adversário. A movimentação dos pés, controle da distância e defesa são tão importantes quanto a força dos socos. A vitória pode vir por decisão dos juízes, nocaute ou desistência.`,
  competitionFormats: ['Amador (com capacete e proteção)', 'Profissional (sem capacete)', 'Boxe Olímpico'],
  governingBodies: ['AIBA', 'WBC', 'WBA', 'IBF', 'WBO'],
  famousFighters: [
    {
      name: "Muhammad Ali",
      record: "56-5",
      titles: ["Campeão Mundial Peso Pesado", "Ativista Social", "Ícone Cultural"],
      country: "EUA",
      image: "/fighters/ali.jpg"
    },
    {
      name: "Mike Tyson",
      record: "50-6",
      titles: ["Campeão Mundial Peso Pesado", "Nocauteador Feroz"],
      country: "EUA",
      image: "/fighters/tyson.jpg"
    },
    {
      name: "Sugar Ray Robinson",
      record: "173-19-6",
      titles: ["Considerado o maior boxeador de todos os tempos"],
      country: "EUA",
      image: "/fighters/robinson.jpg"
    },
    {
      name: "Manny Pacquiao",
      record: "62-7-2",
      titles: ["Campeão Mundial em 8 categorias de peso", "Político nas Filipinas"],
      country: "Filipinas",
      image: "/fighters/pacquiao.jpg"
    }
  ],
  influence: {
  cultura: 'O boxe influenciou profundamente a cultura popular, estando presente em filmes, músicas e literatura. Ícones como Muhammad Ali transcenderam o esporte, tornando-se figuras políticas e sociais.',
  educação: 'Utilizado em programas educacionais e sociais para promover disciplina, foco e autoestima, especialmente em comunidades carentes.',
  internacional: 'Praticado em todo o mundo, o boxe é um dos esportes olímpicos mais antigos e populares, com milhões de praticantes e fãs em todos os continentes.'
},
  curiosities: [
    'O termo "knockout" (nocaute) foi popularizado no boxe e hoje é usado em vários esportes.',
    'Muhammad Ali mudou a forma como os atletas falam sobre ativismo social e política.',
    'O boxe foi um dos primeiros esportes a ter transmissões televisivas regulares.',
    'A Marquês de Queensberry Rules, criadas em 1867, são base para as regras modernas do boxe.',
    'Atualmente, o boxe conta com várias organizações mundiais, cada uma com seus campeões e rankings.'
  ]
},
  {
  id: '8',
  name: 'Judô',
  country: 'Japão',
  coords: { lat: 35.0, lng: 139.0 }, // Japão
  description: 'Arte marcial japonesa focada em arremessos, imobilizações e finalizações, valorizando a técnica, equilíbrio e o uso da força do oponente contra ele mesmo.',
  image: '/martial-arts/judo.jpg',
  origin: 'Uso de técnicas do jiu-jitsu tradicional em uma arte marcial segura e esportiva.',
  foundedBy: ['Jigoro Kano'],
  parentArts: ['Jiu-Jitsu Tradicional'],
  techniques: [
    'Osoto Gari (grande queda externa)',
    'Seoi Nage (arremesso por ombro)',
    'Harai Goshi (varredura de quadril)',
    'Uchi Mata (arremesso interno da coxa)',
    'Juji Gatame (chave de braço)',
    'Imobilizações (Osaekomi-waza)',
    'Estrangulamentos (Shime-waza)'
  ],
  beltSystem: {
    adult: ['Branca', 'Amarela', 'Laranja', 'Verde', 'Azul', 'Marrom', 'Preta', 'Faixas Dan (vermelha e branca, vermelha)'],
    kids: ['Branca', 'Amarela', 'Laranja', 'Verde', 'Azul', 'Marrom']
  },
  history: `Jigoro Kano fundou o Judô em 1882, no Japão, reunindo as técnicas mais eficazes e seguras do jiu-jitsu tradicional para criar uma prática focada tanto no desenvolvimento físico e mental quanto na competição esportiva. O Judô foi o primeiro esporte japonês a ser incluído nas Olimpíadas, em 1964, e tornou-se uma das artes marciais mais populares no mundo, reconhecida por sua filosofia e técnica refinada.`,
  philosophy: `O Judô tem como princípio "Seiryoku Zenyo" (máximo de eficiência com mínimo de esforço) e "Jita Kyoei" (benefício mútuo e prosperidade). A prática desenvolve disciplina, respeito, autocontrole e busca constante pelo aprimoramento físico e moral do praticante.`,
  howFight: `O combate de Judô inicia em pé, com tentativas de desequilibrar o oponente para aplicar arremessos. Caso a luta vá ao solo, buscam-se imobilizações, estrangulamentos e chaves articulares para finalizar o adversário. As vitórias são conquistadas por ippon (ponto máximo), que pode ser dado por um arremesso perfeito, imobilização por 20 segundos ou finalização.`,
  competitionFormats: ['Luta Olímpica', 'Judô Paralímpico', 'Judô Tradicional'],
  governingBodies: ['International Judo Federation (IJF)', 'Confederação Brasileira de Judô (CBJ)'],
  famousFighters: [
    {
      name: "Teddy Riner",
      record: "10x Campeão Mundial, 2x Ouro Olímpico",
      titles: ["Maior judoca da história", "Dominante na categoria peso pesado"],
      country: "França",
      image: "/fighters/riner.jpg"
    },
    {
      name: "Kayla Harrison",
      record: "2x Medalhista de Ouro Olímpica",
      titles: ["Primeira americana campeã olímpica no judô"],
      country: "EUA",
      image: "/fighters/kayla.jpg"
    },
    {
      name: "Yasuhiro Yamashita",
      record: "Ippon invicto por vários anos",
      titles: ["Campeão olímpico em 1984", "Lenda do judô japonês"],
      country: "Japão",
      image: "/fighters/yamashita.jpg"
    },
    {
      name: "Ryoko Tani",
      record: "2x Campeã Olímpica, 7x Campeã Mundial",
      titles: ["Ícone do judô feminino"],
      country: "Japão",
      image: "/fighters/tani.jpg"
    }
  ],
  influence: {
  cultura: 'Criado no Japão, o judô é parte integrante da cultura japonesa e é praticado como forma de desenvolvimento físico e espiritual.',
  educação: 'É amplamente ensinado em escolas e universidades no Japão e em outros países, promovendo valores como respeito, disciplina e autocontrole.',
  internacional: 'Presente em mais de 200 países, o judô é um dos esportes olímpicos mais praticados no mundo, com forte presença em competições internacionais.'
},
  curiosities: [
    'O Judô foi o primeiro esporte asiático a integrar os Jogos Olímpicos, em 1964.',
    'Jigoro Kano também foi um educador e diplomata, contribuindo para a difusão do Judô fora do Japão.',
    'A faixa preta de Judô representa não apenas habilidade técnica, mas também maturidade e responsabilidade.',
    'Teddy Riner é um dos atletas mais dominantes da história do Judô, com múltiplos títulos mundiais consecutivos.'
  ]
},
 {
  id: '9',
  name: 'Karatê',
  country: 'Japão (Okinawa)',
  coords: { lat: 26.0, lng: 128.0 }, // Okinawa, Japão
  description: 'Arte marcial japonesa originária de Okinawa, que utiliza golpes poderosos com mãos, pés, cotovelos e joelhos, combinando técnicas de ataque, defesa, katas e combate.',
  image: '/martial-arts/karate.jpg',
  origin: 'Influenciado por artes marciais chinesas e pela cultura local, com forte ênfase em disciplina e autodefesa.',
  foundedBy: ['Não há um fundador único; Masutatsu Oyama é fundador do estilo Kyokushin'],
  parentArts: ['Te (arte marcial tradicional de Okinawa)', 'Kung Fu Chinês'],
  techniques: [
    'Zuki (socos e golpes com as mãos)',
    'Geri (chutes variados, como mae geri, yoko geri, mawashi geri)',
    'Uke (bloqueios e defesas com os braços)',
    'Katas (sequências coreografadas de técnicas para treino e perfeição)',
    'Kumite (combate esportivo e treino de sparring)'
  ],
  beltSystem: {
    kids: ['Branca', 'Amarela', 'Laranja', 'Verde', 'Azul', 'Roxa', 'Marrom', 'Preta'],
    adult: ['Branca', 'Amarela', 'Laranja', 'Verde', 'Azul', 'Roxa', 'Marrom', 'Preta', 'Faixas Dan (preta avançada)']
  },
  history: `Originado em Okinawa, o Karatê nasceu da necessidade de autodefesa em uma região com restrição ao uso de armas. Influenciado por artes marciais chinesas, o Karatê incorporou golpes rápidos e diretos. No início do século XX, mestres como Gichin Funakoshi levaram o Karatê para o Japão continental, onde ganhou maior estrutura esportiva e se difundiu mundialmente, dando origem a diversos estilos, incluindo Shotokan, Goju-Ryu, Shito-Ryu e Kyokushin.`,
  philosophy: `O Karatê enfatiza valores como respeito, disciplina, autocontrole e busca pelo desenvolvimento integral do praticante, tanto físico quanto mental e espiritual. O dojo kun, preceito dos dojos, reforça a ética, humildade e perseverança.`,
  howFight: `No combate de Karatê, o praticante usa socos, chutes, joelhadas e cotoveladas com precisão e velocidade. O foco é a técnica correta, equilíbrio e timing, combinados com defesa eficaz. Competição pode ser por pontos (kumite) ou por execução perfeita dos katas.`,
  competitionFormats: ['Kumite esportivo', 'Kata competitivo', 'Kumite de contato pleno (Kyokushin)'],
  governingBodies: ['World Karate Federation (WKF)', 'Confederação Brasileira de Karate (CBK)'],
  famousFighters: [
    {
      name: "Masutatsu Oyama",
      record: "Fundador do Kyokushin, conhecido por suas demonstrações de força e combates contra touros",
      titles: ["Pioneiro do Karatê de contato pleno"],
      country: "Japão",
      image: "/fighters/oyama.jpg"
    },
    {
      name: "Lyoto Machida",
      record: "26-12 (MMA)",
      titles: ["Campeão do UFC no peso meio-pesado", "Combina Karatê tradicional com MMA moderno"],
      country: "Brasil",
      image: "/fighters/machida.jpg"
    },
    {
      name: "Gichin Funakoshi",
      record: "Fundador do Karatê Shotokan",
      titles: ["Considerado o pai do Karatê moderno"],
      country: "Japão (Okinawa)",
      image: "/fighters/funakoshi.jpg"
    },
    {
      name: "Rafael Aghayev",
      record: "Multicampeão mundial de Karatê esportivo",
      titles: ["Um dos maiores atletas de kumite da atualidade"],
      country: "Azerbaijão",
      image: "/fighters/aghayev.jpg"
    }
  ],
  influence: {
  cultura: 'Originário de Okinawa, o karatê é símbolo da cultura japonesa e influenciou filmes, séries e outras formas de mídia.',
  educação: 'Ensinado em escolas e academias ao redor do mundo, promove disciplina, respeito e desenvolvimento físico.',
  internacional: 'Praticado em mais de 190 países, o karatê é uma das artes marciais mais populares globalmente e foi incluído nos Jogos Olímpicos de Tóquio 2020.'
},
  curiosities: [
    'O nome Karatê originalmente significava "mão chinesa" e passou a ser escrito como "mão vazia" para simbolizar a luta sem armas.',
    'Masutatsu Oyama ficou famoso por lutar e derrotar touros para provar a eficácia do Karatê.',
    'O Karatê foi incluído nos Jogos Olímpicos pela primeira vez em Tóquio 2020.',
    'Lyoto Machida é conhecido pelo estilo único que une Karatê tradicional com técnicas modernas de MMA.'
  ]
},
 {
  id: '10',
  name: 'Kickboxing',
  country: 'Japão/EUA',
  coords: { lat: 35.0, lng: 135.0 }, // Referência ao Japão
  description: 'Arte marcial híbrida que combina técnicas dinâmicas de socos do boxe com chutes poderosos do karatê, focada em combate de pé.',
  image: '/martial-arts/kickboxing.jpg',
  origin: 'Uma fusão do karatê tradicional e o boxe ocidental, com influências de outras artes marciais de combate em pé.',
  foundedBy: ['Kenji Kurosaki (Japão)', 'Osamu Noguchi (Japão)', 'Desenvolvido por promotores e atletas no Ocidente a partir da década de 1960'],
  parentArts: ['Boxe', 'Karate', 'Muay Thai', 'Taekwondo'],
  techniques: [
    'Jab (soco rápido e direto)',
    'Cruzado (soco potente de rotação)',
    'Chute Frontal (Mae Geri)',
    'Chute Lateral (Yoko Geri)',
    'Chute Circular (Mawashi Geri)'
  ],
  beltSystem: {
  everyoneWithObs: ['Não há sistema de faixas tradicional'],
  observação: 'Algumas academias utilizam faixas coloridas como referência pedagógica, especialmente em programas para iniciantes e crianças, mas isso não é padronizado globalmente.'
},
  rulesOverview: `O Kickboxing é praticado em diversas modalidades, com regras que permitem socos e chutes, geralmente limitando ataques abaixo da cintura e golpes proibidos como cotoveladas ou joelhadas, a depender da organização. O combate é geralmente disputado em rounds de 2 a 3 minutos.`,
  history: `O Kickboxing moderno emergiu na década de 1960-70 a partir do interesse de praticantes japoneses e americanos em combinar a efetividade dos golpes de boxe com os chutes do karatê. Promotores como Osamu Noguchi no Japão e americanos como Joe Lewis foram pioneiros na popularização da modalidade, que rapidamente se expandiu, criando organizações como K-1, GLORY e outras ligas de kickboxing ao redor do mundo.`,
  philosophy: `Kickboxing valoriza resistência física, velocidade, técnica e estratégia no combate. Além do esporte competitivo, é amplamente praticado como atividade fitness por seus benefícios cardiovasculares e fortalecimento corporal.`,
  howFight: `O combate no Kickboxing ocorre em pé, com foco em trocas intensas de socos e chutes. A luta se desenrola em rounds e valoriza combinações rápidas, potência e resistência. Clinches são rapidamente interrompidos pelo árbitro, e o objetivo é pontuar com golpes limpos ou conquistar o nocaute.`,
  competitionFormats: ['K-1 Rules', 'American Kickboxing', 'Muay Thai rules (com joelhadas e cotoveladas em algumas versões)'],
  governingBodies: [
  'WAKO (World Association of Kickboxing Organizations)',
  'ISKA (International Sport Karate Association)',
  'IKF (International Kickboxing Federation)',
  'Glory (liga profissional de kickboxing)',
  'WKA (World Kickboxing Association)'
],
  famousFighters: [
    {
      name: "Peter Aerts",
      record: "106-35-3",
      titles: ["Tricampeão do K-1 World Grand Prix"],
      country: "Holanda",
      image: "/fighters/aerts.jpg"
    },
    {
      name: "Remy Bonjasky",
      record: "99-21-0",
      titles: ["Tricampeão do K-1 World Grand Prix", "Conhecido por sua técnica de chutes voadores"],
      country: "Holanda",
      image: "/fighters/bonjasky.jpg"
    },
    {
      name: "Joe Lewis",
      record: "56-14-4",
      titles: ["Pioneiro do Kickboxing nos EUA", "Campeão de Karate e Kickboxing"],
      country: "EUA",
      image: "/fighters/lewis.jpg"
    },
    {
      name: "Giorgio Petrosyan",
      record: "105-2-2",
      titles: ["Campeão do GLORY e ONE Championship"],
      country: "Itália/Armênia",
      image: "/fighters/petrosyan.jpg"
    }
  ],
  influence: {
  cultura: 'O kickboxing influenciou a cultura pop, estando presente em filmes de ação e videogames, e é associado a um estilo de vida fitness e competitivo.',
  educação: 'Utilizado em academias e programas de condicionamento físico, promovendo saúde, disciplina e autodefesa.',
  internacional: 'Praticado em diversos países, o kickboxing é popular tanto como esporte de combate quanto como atividade física, com competições internacionais e ligas profissionais.'
},
  curiosities: [
    'O nome "kickboxing" surgiu na década de 1960 como uma maneira de diferenciar a modalidade do karatê tradicional e do boxe.',
    'O K-1 é uma das maiores organizações mundiais de kickboxing, criada em 1993 no Japão.',
    'Kickboxing combina a agressividade do boxe com a versatilidade dos chutes do karatê e do muay thai.',
    'Peter Aerts é conhecido como "The Dutch Lumberjack" devido à sua força e técnica.'
  ]
},
 {
  id: '11',
  name: 'Luta Livre',
  country: 'Brasil',
  coords: { lat: -22.0, lng: -43.0 }, // Região do Rio de Janeiro
  description: 'Estilo brasileiro de luta que combina técnicas de wrestling, judô e jiu-jitsu, com foco em quedas, controle no solo e submissões.',
  image: '/martial-arts/lutalivrebrasileira.jpg',
  origin: 'Brasil, anos 1920',
  foundedBy: ['Euclydes Hatem (Tatu)', 'Desenvolvido por lutadores brasileiros no Rio de Janeiro a partir do Catch Wrestling'],
  parentArts: ['Catch Wrestling', 'Jiu-Jitsu', 'Luta Greco-Romana', 'Vale Tudo brasileiro'],
  techniques: [
    'Quedas',
    'Controle de solo',
    'Chaves articulares',
    'Estrangulamentos',
    'Transições e escapes'
  ],
  beltSystem: {
  everyone: ['Branca', 'Amarela', 'Laranja', 'Verde', 'Azul', 'Roxa', 'Marrom', 'Preta'],
  observação: 'O sistema de faixas varia entre federações e equipes. A Luta Livre Esportiva brasileira adotou um sistema de graduação inspirado no Jiu-Jitsu.'
},
  history: `A Luta Livre Brasileira foi fundada por Euclydes "Tatu" Hatem na década de 1920, inicialmente como um sistema de combate e defesa pessoal que misturava técnicas de wrestling europeu, judô e jiu-jitsu. Tornou-se uma modalidade de luta de chão com ênfase em controle e finalizações sem o uso do kimono. Foi uma rival histórica do Brazilian Jiu-Jitsu (BJJ) no cenário de lutas no Brasil, especialmente em eventos e campeonatos regionais e nacionais. Nos anos 1990, a Luta Livre contribuiu para o desenvolvimento do MMA brasileiro com atletas como Marco Ruas, que incorporaram o estilo nas competições internacionais.`,
  philosophy: `A filosofia da Luta Livre valoriza a eficácia prática no combate real, com ênfase no domínio do oponente no solo e finalizações rápidas. A luta é prática, técnica e focada em força, resistência e estratégia para controlar e finalizar adversários sem depender do uso de vestimenta específica.`,
  howFight: `Na Luta Livre Esportiva, o combate pode acontecer em pé ou no solo, com foco em quedas, transições e finalizações. Os lutadores buscam o domínio posicional e a vitória por pontos ou por submissão. É um estilo brasileiro de grappling que mistura técnicas de chão com agressividade e fluidez.`,
  famousFighters: [
    {
      name: "Euclydes Hatem",
      record: "Fundador",
      country: "Brasil",
      image: "/fighters/hatem.jpg",
    },
    {
      name: "Marco Ruas",
      record: "9-4-2 (MMA)",
      country: "Brasil",
      image: "/fighters/ruas.jpg",
    },
    {
      name: "Ebenezer Fontes Braga",
      record: "Pioneiro e treinador",
      country: "Brasil",
      image: "/fighters/braga.jpg",
    }
  ],
  competitionFormats: [
    'Luta Livre esportiva com regras específicas para amadores e profissionais',
    'Eventos de vale-tudo e MMA nos anos 80 e 90',
    'Desafios e campeonatos regionais com foco em finalizações'
  ],
  governingBodies: [
  'FILLB (Federação Internacional de Luta Livre Brasileira)',
  'CBLL (Confederação Brasileira de Luta Livre)',
  'Federações estaduais e academias tradicionais (ex: Luta Livre da Família Brunocilla)'
],
  influence: {
  cultura: 'A Luta Livre é parte da herança cultural brasileira nas artes marciais, embora menos conhecida que o BJJ, e tem influenciado o desenvolvimento do MMA no Brasil.',
  educação: 'Ensinada em academias e projetos sociais, promove disciplina e técnicas de grappling, sendo uma alternativa acessível para o ensino de artes marciais.',
  internacional: 'Apesar de sua origem brasileira, a Luta Livre tem ganhado reconhecimento internacional, especialmente entre praticantes de MMA e grappling.'
},
  curiosities: [
    'O termo "Luta Livre" refere-se à luta sem uso de kimono, diferenciando-se do jiu-jitsu tradicional com quimono.',
    'Marco Ruas ficou famoso como um dos primeiros a usar a expressão "vale tudo" no MMA.',
    'A rivalidade entre Luta Livre e Brazilian Jiu-Jitsu marcou diversas gerações no Brasil, com desafios famosos entre atletas dos dois estilos.',
    'Hoje a Luta Livre também é conhecida como Submission Wrestling ou No-Gi Grappling em competições internacionais.'
  ]
},
  {
  id: '12',
  name: 'MMA',
  country: 'Global',
  coords: { lat: 40.0, lng: -100.0 }, // América do Norte, epicentro da popularização do MMA
  description: 'Artes Marciais Mistas (MMA) é um esporte de combate que combina técnicas de várias artes marciais, incluindo luta em pé, grappling, clinch e luta no solo.',
  image: '/martial-arts/mma.jpg',
  origin: 'Global, anos 1990',
  foundedBy: ['Dana White e os irmãos Fertitta (popularização com o UFC)', 'Art Davie e Rorion Gracie (idealizadores do UFC)', 'Desenvolvido por lutadores e promotores a partir de torneios de Vale Tudo'],
  parentArts: ['Boxe', 'Muay Thai', 'Wrestling', 'Jiu-Jitsu Brasileiro', 'Judô', 'Karate', 'Luta Livre'],
  techniques: [
    'Striking (socos, chutes, joelhadas, cotoveladas)',
    'Wrestling (quedas, controle)',
    'Brazilian Jiu-Jitsu (finalizações e controle no solo)',
    'Clinch (luta corpo a corpo, joelhadas e quedas)',
    'Ground and Pound (golpes no solo)'
  ],
  beltSystem: {
  everyone: ['Sem sistema de faixas formal'],
  observação: 'Como o MMA é uma combinação de estilos, a progressão se dá por desempenho em lutas e conquistas profissionais. Os atletas geralmente mantêm as graduações dos estilos individuais que praticam (como BJJ, Wrestling, etc.).'
},
  history: `O MMA moderno surgiu nos anos 1990 com o lançamento do UFC (Ultimate Fighting Championship) em 1993, que popularizou combates entre lutadores de diferentes estilos para descobrir qual arte marcial era mais eficaz no combate real. Com o passar dos anos, os lutadores passaram a treinar múltiplas disciplinas para se tornarem completos, e o esporte evoluiu para uma modalidade regulamentada, com categorias de peso, regras claras e árbitros. Hoje, o MMA é um dos esportes de combate mais populares do mundo, com eventos globais e atletas de alto nível.`,
  philosophy: `O MMA promove a versatilidade, condicionamento físico extremo e a capacidade de adaptação. Sua filosofia é baseada na eficácia do combate real, unindo o melhor das artes marciais em pé e no solo para garantir a vitória.`,
  howFight: `O MMA mistura diversas artes marciais em combates intensos que podem acontecer em pé ou no chão. Os lutadores alternam entre trocação (boxe, muay thai, etc.) e luta agarrada (wrestling, jiu-jitsu, etc.). A vitória pode vir por nocaute, finalização ou decisão dos juízes, e a estratégia muda conforme o estilo do adversário.`,
  famousFighters: [
    {
      name: "Anderson Silva",
      record: "34-11 (MMA)",
      country: "Brasil",
      image: "/fighters/silva.jpg",
    },
    {
      name: "Georges St-Pierre",
      record: "26-2 (MMA)",
      country: "Canadá",
      image: "/fighters/gsp.jpg",
    },
    {
      name: "Jon Jones",
      record: "26-1 (MMA)",
      country: "EUA",
      image: "/fighters/jones.jpg",
    }
  ],
  competitionFormats: [
    'Eventos sancionados com regras padronizadas internacionalmente',
    'Categorias de peso para segurança e equilíbrio',
    'Rounds de 3 a 5 minutos com tempo variável conforme a organização',
    'Regras de segurança para proteger os atletas'
  ],
  governingBodies: [
  'UFC (Ultimate Fighting Championship)',
  'ONE Championship',
  'Bellator MMA',
  'PFL (Professional Fighters League)',
  'IMMAF (International Mixed Martial Arts Federation — reguladora do MMA amador)'
],
 influence: {
  cultura: 'O MMA revolucionou o cenário das artes marciais, combinando diferentes estilos e atraindo uma audiência global através de eventos como o UFC.',
  educação: 'Academias de MMA oferecem treinamento completo, promovendo condicionamento físico, disciplina e habilidades de autodefesa.',
  internacional: 'Com eventos transmitidos mundialmente e atletas de diversas nacionalidades, o MMA é um dos esportes de combate que mais cresce globalmente.'
},
  curiosities: [
    'O UFC foi criado para testar a eficácia das artes marciais em um ambiente de combate real.',
    'O MMA é regulamentado por comissões atléticas em diversos países, incluindo regras de segurança rigorosas.',
    'Treinadores e academias especializadas em MMA combinam jiu-jitsu, wrestling, boxe, muay thai, judô e outras artes.',
    'Muitos campeões de MMA começaram em uma arte marcial específica antes de se especializarem no esporte.'
  ]
},
 {
  id: '13',
  name: 'Sumô',
  country: 'Japão',
  coords: { lat: 36, lng: 142 },
  description: 'Luta tradicional japonesa onde o objetivo é empurrar o oponente para fora do ringue ou fazê-lo tocar o solo com outra parte do corpo que não os pés.',
  image: '/martial-arts/sumo.jpg',
  origin: 'Japão antigo',
  foundedBy: ['Povos indígenas japoneses', 'Formalizado por monges e nobres japoneses no período Nara'],
  parentArts: ['Sumai (ritual xintoísta de combate)', 'Rituais de purificação japoneses', 'Artes marciais indígenas japonesas'],
  techniques: [
    'Tachi-ai (choque inicial)',
    'Yorikiri (empurrar o oponente para fora do dohyo)',
    'Uwatenage (queda por agarrar o kimono por fora)',
    'Shitatenage (queda por agarrar o kimono por dentro)',
    'Tsukiotoshi (derrubar com empurrão)'
  ],
  beltSystem: {
  everyone: ['Sem faixas; sistema de ranking hierárquico'],
  observação: 'O Sumô utiliza um sistema de classificação chamado **banzuke**, com posições como *Maegashira*, *Komusubi*, *Sekiwake*, *Ozeki* e *Yokozuna* (grau mais alto). A progressão depende de desempenho em torneios.'
},
  history: `O Sumô possui raízes que remontam a mais de 1.500 anos no Japão, com origem ligada a rituais xintoístas de invocação de deuses para boa colheita. Evoluiu para um esporte nacional com regras e cerimônias rígidas. Os lutadores profissionais (rikishi) seguem um estilo de vida disciplinado e fazem parte de uma tradição cultural muito respeitada no Japão.`,
  philosophy: `O Sumô representa não só força física, mas também disciplina, honra e respeito às tradições milenares japonesas. Cada combate é uma demonstração de equilíbrio entre poder e técnica.`,
  howFight: `As lutas de Sumo começam com um embate explosivo onde os rikishi (lutadores) tentam empurrar, desequilibrar ou projetar o adversário para fora do dohyo (arena circular). Não há categorias de peso, e o combate é extremamente curto, com vitórias rápidas por força, técnica ou aproveitamento de falhas do oponente.`,
  competitionFormats: [
  'Honbasho (torneios profissionais oficiais no Japão, realizados seis vezes por ano)',
  'Sumô amador (escolas, universidades e federações internacionais)',
  'Sumô estudantil (realizado em escolas japonesas como formação esportiva)',
  'Exibições e festivais culturais (demonstrativos não competitivos)',
],
  influence: {
  cultura: 'O sumô é profundamente enraizado na cultura japonesa, com rituais e tradições que remontam a séculos, sendo considerado um símbolo nacional.',
  educação: 'Praticado desde a infância no Japão, o sumô ensina valores como respeito, disciplina e perseverança.',
  internacional: 'Embora predominantemente japonês, o sumô tem atraído interesse internacional, com torneios e demonstrações em diversos países.'
},
  governingBodies: [
  'Japan Sumo Association (Nihon Sumo Kyokai)',
  'International Sumo Federation (IFS)',
  'All Japan Sumo Federation',
  'Federações continentais e nacionais de sumô amador'
],
  curiosities: [
    'Os lutadores de sumô seguem uma dieta rica em calorias chamada chanko nabe.',
    'O ringue (dohyo) é sagrado e há rituais xintoístas antes de cada combate.',
    'A vestimenta tradicional dos lutadores inclui uma faixa chamada mawashi.',
    'Sumô é o único esporte onde os lutadores profissionais vivem em comunidades chamadas “heya”.'
  ],
  famousFighters: [
    {
      name: "Hakuho Sho",
      record: "45 Títulos",
      country: "Mongólia/Japão",
      image: "/fighters/hakuho.jpg",
    },
    {
      name: "Taiho Koki",
      record: "32 Títulos",
      country: "Japão",
      image: "/fighters/taiho.jpg",
    }
  ],
  
},
{
  id: '14',
  name: 'Wrestling',
  country: 'Global',
  coords: { lat: 40, lng: -75 },
  description: 'Estilo de luta olímpico baseado em técnicas de queda, controle e imobilização do adversário.',
  image: '/martial-arts/wrestling.jpg',
  origin: 'Antiga Grécia',
  foundedBy: ['Desenvolvido coletivamente por diversas culturas antigas', 'Formalizado por federações esportivas modernas, como a FILA (hoje United World Wrestling)'],
  parentArts: ['Sumai (ritual xintoísta de combate)', 'Rituais de purificação japoneses', 'Artes marciais indígenas japonesas'],
  techniques: [
    'Single Leg (queda na perna única)',
    'Double Leg (queda nas duas pernas)',
    'Suplex (levantamento e queda para trás)',
    'Ankle Pick (queda segurando o tornozelo)',
    'Sprawl (defesa contra quedas)'
  ],
  beltSystem: {
  everyone: ['Sem sistema de faixas'],
  observação: 'O progresso é determinado por idade, categoria de peso e resultados em competições. Não há graduação por cores, apenas classificação atlética e ranqueamento.'
},
  history: `O wrestling é uma das formas mais antigas de combate, praticado desde os Jogos Olímpicos da Grécia Antiga. Com o tempo, evoluiu para estilos modernos como Greco-Romano e Estilo Livre, ambos parte dos Jogos Olímpicos contemporâneos. É base técnica fundamental para muitos lutadores de MMA.`,
  philosophy: `O wrestling enfatiza força, resistência, técnica e estratégia, com foco no domínio do corpo do adversário e no controle total durante o combate.`,
  influence: {
  cultura: 'Com raízes na antiguidade, o wrestling é uma das formas mais antigas de combate e tem influenciado diversas culturas ao longo da história.',
  educação: 'Ensinado em escolas e universidades, especialmente nos EUA e Europa, promove desenvolvimento físico, estratégia e disciplina.',
  internacional: 'Presente em competições internacionais e nos Jogos Olímpicos, o wrestling é praticado em diversos estilos ao redor do mundo.'
},
  howFight: `No Wrestling Olímpico, os atletas usam agarramentos, quedas e projeções para dominar o oponente, com foco na pontuação técnica. Existem duas modalidades principais: Greco-Romano (sem uso das pernas) e Wrestling Livre (com uso das pernas). A luta é intensa, física e baseada em explosão, controle e estratégia.`,
  competitionFormats: [
  'Estilo Livre (Freestyle Wrestling) – permite ataques às pernas e lutas mais dinâmicas',
  'Estilo Greco-Romano – proíbe ataques abaixo da cintura, foco em projeções e tronco'
],
  curiosities: [
    'Aleksandr Karelin, conhecido como “O Monstro de Novosibirsk”, foi invicto por mais de uma década.',
    'O wrestling é um dos esportes com mais medalhas olímpicas distribuídas na história.',
    'O movimento “sprawl” é fundamental para defender ataques de queda, usado amplamente no MMA.',
    'Existem diferentes estilos de wrestling, como o Greco-Romano e o estilo livre, com regras específicas.'
  ],
  governingBodies: [
  'UWW (United World Wrestling — órgão máximo da luta olímpica)',
  'CBLA (Confederação Brasileira de Lutas Associadas)',
  'Federações continentais e nacionais filiadas à UWW'
],
  famousFighters: [
    {
      name: "Jordan Burroughs",
      record: "Campeão Olímpico",
      country: "EUA",
      image: "/fighters/burroughs.jpg",
    },
    {
      name: "Aleksandr Karelin",
      record: "Invicto (Greco-Romano)",
      country: "Rússia",
      image: "/fighters/karelin.jpg",
    }
  ]
}
];
