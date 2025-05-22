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
    coords: { lat: -14, lng: -53 }, 
    description: 'Arte marcial brasileira que combina luta, dança e música',
    image: '/martial-arts/capoeira.jpg',
    origin: 'Brasil, século XVI',
    techniques: ['Ginga', 'Meia Lua de Frente', 'Armada', 'Bênção', 'Esquiva'],
    history: 'A Capoeira surgiu como forma de resistência durante o período da escravidão no Brasil. Os escravos disfarçavam a luta como dança para enganar seus senhores, desenvolvendo um sistema único que combina elementos musicais, acrobáticos e combativos.',
    philosofy: 'fcgvhbuoicfygvhjbkcfgh bjknhcfgvhjbkhfcxdgcvhjbgfcghj',
    fighters: [
      { name: "Mestre Bimba", record: "Lendário", country: "Brasil", image: "/fighters/bimba.jpg" },
      { name: "Mestre Pastinha", record: "Histórico", country: "Brasil", image: "/fighters/pastinha.jpg" }
    ]
  },
  { 
    id: '2', 
    name: 'Kung Fu', 
    country: 'China', 
    coords: { lat: 35, lng: 105 }, 
    description: 'Termo que se refere a centenas de estilos de artes marciais chinesas',
    image: '/martial-arts/kungfu.jpg',
    origin: 'China antiga',
    techniques: ['Wing Chun', 'Tai Chi', 'Shaolin', 'Hung Gar', 'Choy Li Fut'],
    history: 'O Kung Fu tem origens que remontam há mais de 4.000 anos na China antiga. Foi desenvolvido por monges no mosteiro de Shaolin como forma de autodefesa e desenvolvimento espiritual, tornando-se parte fundamental da cultura chinesa.',
    philosofy: 'fcgvhbuoicfygvhjbkcfgh bjknhcfgvhjbkhfcxdgcvhjbgfcghj',
    fighters: [
      { name: "Ip Man", record: "Mestre", country: "China", image: "/fighters/ipman.jpg" },
      { name: "Wong Fei-hung", record: "Lendário", country: "China", image: "/fighters/wongfei.jpg" }
    ]
  },
  { 
    id: '3', 
    name: 'Muay Thai', 
    country: 'Tailândia', 
    coords: { lat: 15, lng: 100 }, 
    description: 'Arte marcial tailandesa conhecida como a "arte das oito armas"',
    image: '/martial-arts/muaythai.jpg',
    origin: 'Tailândia, século XVI',
    techniques: ['Soco', 'Chute', 'Joelhada', 'Cotovelada', 'Clinch'],
    history: 'Conhecida como a "Arte das Oito Armas", o Muay Thai desenvolveu-se como técnica militar para proteger o reino da Tailândia. Utiliza punhos, cotovelos, joelhos e canelas como armas naturais, e é considerada uma das artes marciais mais eficazes para combate em pé.',
    philosofy: 'fcgvhbuoicfygvhjbkcfgh bjknhcfgvhjbkhfcxdgcvhjbgfcghj',
    fighters: [
      { name: "Buakaw Banchamek", record: "240-24-12", country: "Tailândia", image: "/fighters/buakaw.jpg" },
      { name: "Saenchai", record: "299-41-5", country: "Tailândia", image: "/fighters/saenchai.jpg" }
    ]
  },
  { 
    id: '4', 
    name: 'Taekwondo', 
    country: 'Coreia do Sul', 
    coords: { lat: 36, lng: 128 }, 
    description: 'Arte marcial coreana caracterizada por chutes altos e rápidos',
    image: '/martial-arts/taekwondo.jpg',
    origin: 'Coreia do Sul, anos 1940',
    techniques: ['Ap Chagi', 'Dollyo Chagi', 'Yop Chagi', 'Dwit Chagi', 'Naeryo Chagi'],
    history: 'O Taekwondo foi sistematizado após a Segunda Guerra Mundial, unificando várias escolas de artes marciais coreanas. É caracterizado por seus chutes altos, poderosos e técnicas de salto, tornando-se esporte olímpico em 2000.',
    philosofy: 'fcgvhbuoicfygvhjbkcfgh bjknhcfgvhjbkhfcxdgcvhjbgfcghj',
    fighters: [
      { name: "Steven Lopez", record: "5x Campeão Mundial", country: "EUA", image: "/fighters/steven.jpg" },
      { name: "Hwang Kyung-seon", record: "3x Medalha Olímpica", country: "Coreia do Sul", image: "/fighters/hwang.jpg" }
    ]
  },
  { 
    id: '5', 
    name: 'Jiu-Jitsu', 
    country: 'Japão', 
    coords: { lat: 36, lng: 138 }, 
    description: 'Arte marcial japonesa focada em técnicas de alavanca e imobilização',
    image: '/martial-arts/jiujitsu.jpg',
    origin: 'Japão feudal',
    techniques: ['Estrangulamentos', 'Chaves de Articulação', 'Imobilizações', 'Raspagens', 'Quedas'],
    history: 'O Jiu-Jitsu tradicional surgiu no Japão feudal como forma de combate sem armas para samurais. No início do século XX, Mitsuyo Maeda levou a arte ao Brasil, onde a família Gracie adaptou as técnicas dando origem ao Brazilian Jiu-Jitsu, com foco maior em combate no solo.',
    philosofy: 'fcgvhbuoicfygvhjbkcfgh bjknhcfgvhjbkhfcxdgcvhjbgfcghj',
    fighters: [
      { name: "Rickson Gracie", record: "400-0 (não oficial)", country: "Brasil", image: "/fighters/rickson.jpg" },
      { name: "Roger Gracie", record: "10-2 (MMA), Múltiplo Campeão Mundial", country: "Brasil", image: "/fighters/roger.jpg" }
    ]
  },
  {
    id: '6',
    name: 'Krav Maga',
    country: 'Israel',
    coords: { lat: 31, lng: 35 },
    description: 'Sistema de defesa pessoal desenvolvido para as Forças de Defesa de Israel',
    image: '/martial-arts/kravmaga.jpg',
    origin: 'Israel, anos 1930',
    techniques: ['Defesa contra Faca', 'Defesa contra Arma', 'Combate Corpo a Corpo', 'Técnicas de Desarme', 'Contra-ataques Rápidos'],
    history: 'O Krav Maga foi desenvolvido por Imi Lichtenfeld nos anos 1930 para proteger a comunidade judaica contra grupos fascistas. Posteriormente, tornou-se o sistema oficial das Forças de Defesa de Israel, sendo adaptado para uso civil e militar em todo o mundo.',
    philosofy: 'fcgvhbuoicfygvhjbkcfgh bjknhcfgvhjbkhfcxdgcvhjbgfcghj',
    fighters: [
      { name: "Imi Lichtenfeld", record: "Fundador", country: "Israel", image: "/fighters/imi.jpg" },
      { name: "Eyal Yanilov", record: "Mestre", country: "Israel", image: "/fighters/eyal.jpg" }
    ]
  },
  {
    id: '7',
    name: 'Boxe',
    country: 'Reino Unido',
    coords: { lat: 54, lng: -2 },
    description: 'Arte marcial ocidental focada em golpes com os punhos',
    image: '/martial-arts/boxe.jpg',
    origin: 'Origem antiga, moderno no século XVIII',
    techniques: ['Jab', 'Direto', 'Gancho', 'Cruzado', 'Esquiva'],
    history: 'Embora formas primitivas de boxe existam desde a antiguidade, o boxe moderno com regras surgiu na Inglaterra no século XVIII. Tornou-se um dos esportes de combate mais populares do mundo, com competições olímpicas e profissionais de grande prestígio.',
    philosofy: 'fcgvhbuoicfygvhjbkcfgh bjknhcfgvhjbkhfcxdgcvhjbgfcghj',
    fighters: [
      { name: "Muhammad Ali", record: "56-5", country: "EUA", image: "/fighters/ali.jpg" },
      { name: "Mike Tyson", record: "50-6", country: "EUA", image: "/fighters/tyson.jpg" }
    ]
  },
  {
    id: '8',
    name: 'Judô',
    country: 'Japão',
    coords: { lat: 35, lng: 139 },
    description: 'Arte marcial japonesa baseada em arremessos e imobilizações',
    image: '/martial-arts/judo.jpg',
    origin: 'Japão, 1882',
    techniques: ['Osoto Gari', 'Seoi Nage', 'Harai Goshi', 'Uchi Mata', 'Juji Gatame'],
    history: 'O Judô foi criado em 1882 por Jigoro Kano, que selecionou as melhores técnicas do jiu-jitsu tradicional e removeu elementos perigosos para criar uma forma de treinamento mais segura e esportiva. A palavra Judô significa "caminho suave" ou "caminho da suavidade".',
    philosofy: 'fcgvhbuoicfygvhjbkcfgh bjknhcfgvhjbkhfcxdgcvhjbgfcghj',
    fighters: [
      { name: "Teddy Riner", record: "10x Campeão Mundial", country: "França", image: "/fighters/riner.jpg" },
      { name: "Kayla Harrison", record: "2x Medalhista de Ouro Olímpica", country: "EUA", image: "/fighters/kayla.jpg" }
    ]
  },
  {
    id: '9',
    name: 'Karatê',
    country: 'Japão (Okinawa)',
    coords: { lat: 26, lng: 128 },
    description: 'Arte marcial japonesa que utiliza golpes com mãos, pés, cotovelos e joelhos',
    image: '/martial-arts/karate.jpg',
    origin: 'Okinawa, Japão',
    techniques: ['Zuki (Socos)', 'Geri (Chutes)', 'Uke (Bloqueios)', 'Katas', 'Kumite'],
    history: 'O Karatê originou-se em Okinawa como uma forma de autodefesa, influenciada por artes marciais chinesas. No início do século XX, foi introduzido no Japão continental e posteriormente disseminado para o mundo todo, dividindo-se em vários estilos como Shotokan, Goju-Ryu e Kyokushin.',
    philosofy: 'fcgvhbuoicfygvhjbkcfgh bjknhcfgvhjbkhfcxdgcvhjbgfcghj',
    fighters: [
      { name: "Masutatsu Oyama", record: "Fundador do Kyokushin", country: "Japão", image: "/fighters/oyama.jpg" },
      { name: "Lyoto Machida", record: "26-12 (MMA)", country: "Brasil", image: "/fighters/machida.jpg" }
    ]
  },
  {
    id: '10',
    name: 'Kick Boxing',
    country: 'Japão/EUA',
    coords: { lat: 35, lng: 135 },
    description: 'Arte marcial híbrida que combina técnicas de socos do boxe com chutes do karatê',
    image: '/martial-arts/kickboxing.jpg',
    origin: 'Japão/EUA, anos 1960-70',
    techniques: ['Jab', 'Cruzado', 'Chute Frontal', 'Chute Lateral', 'Chute Circular'],
    history: 'O Kickboxing moderno surgiu nos anos 1960-70 como uma mistura do karatê tradicional com o boxe ocidental. Hoje existem várias organizações e regras diferentes, sendo um dos esportes de combate mais populares tanto para competição quanto para fitness.',
    philosofy: 'fcgvhbuoicfygvhjbkcfgh bjknhcfgvhjbkhfcxdgcvhjbgfcghj',
    fighters: [
      { name: "Peter Aerts", record: "106-35-3", country: "Holanda", image: "/fighters/aerts.jpg" },
      { name: "Remy Bonjasky", record: "99-21-0", country: "Holanda", image: "/fighters/bonjasky.jpg" }
    ]
  },
  {
    id: '11',
    name: 'Luta Livre',
    country: 'Brasil',
    coords: { lat: -22, lng: -43 },
    description: 'Estilo de luta semelhante ao wrestling, popular no Brasil',
    image: '/martial-arts/lutalivrebrasileira.jpg',
    origin: 'Brasil, anos 1920',
    techniques: ['Quedas', 'Controle', 'Submissões', 'Chaves', 'Estrangulamentos'],
    history: 'A Luta Livre Brasileira foi desenvolvida por Euclydes "Tatu" Hatem nos anos 1920. Embora compartilhe o nome com o wrestling profissional, é um estilo legítimo de combate que mistura técnicas de wrestling, judô e jiu-jitsu, sendo rival histórico do Brazilian Jiu-Jitsu.',
    philosofy: 'fcgvhbuoicfygvhjbkcfgh bjknhcfgvhjbkhfcxdgcvhjbgfcghj',
    fighters: [
      { name: "Euclydes Hatem", record: "Fundador", country: "Brasil", image: "/fighters/hatem.jpg" },
      { name: "Marco Ruas", record: "9-4-2 (MMA)", country: "Brasil", image: "/fighters/ruas.jpg" }
    ]
  },
  {
    id: '12',
    name: 'MMA',
    country: 'Global',
    coords: { lat: 40, lng: -100 },
    description: 'Artes Marciais Mistas, combinando técnicas de várias artes marciais',
    image: '/martial-arts/mma.jpg',
    origin: 'Global, anos 1990',
    techniques: ['Striking', 'Wrestling', 'Jiu-Jitsu', 'Clinch', 'Ground and Pound'],
    history: 'O MMA moderno ganhou popularidade com o UFC em 1993, promovendo combates entre praticantes de diferentes artes marciais. Atualmente é um dos esportes de combate mais completos, exigindo que os lutadores sejam versados em luta em pé, clinch e solo.',
    philosofy: 'fcgvhbuoicfygvhjbkcfgh bjknhcfgvhjbkhfcxdgcvhjbgfcghj',
    fighters: [
      { name: "Anderson Silva", record: "34-11 (MMA)", country: "Brasil", image: "/fighters/silva.jpg" },
      { name: "Georges St-Pierre", record: "26-2 (MMA)", country: "Canadá", image: "/fighters/gsp.jpg" }
    ]
  },
  {
    id: '13',
    name: 'Sumô',
    country: 'Japão',
    coords: { lat: 36, lng: 140 },
    description: 'Luta tradicional japonesa onde o objetivo é empurrar o oponente para fora do ringue',
    image: '/martial-arts/sumo.jpg',
    origin: 'Japão antigo',
    techniques: ['Tachi-ai', 'Yorikiri', 'Uwatenage', 'Shitatenage', 'Tsukiotoshi'],
    history: 'O Sumô tem raízes que remontam a mais de 1.500 anos no Japão, originalmente ligado a rituais xintoístas. É considerado o esporte nacional japonês, com tradições rigorosas e um estilo de vida particular para seus praticantes profissionais (rikishi).',
    philosofy: 'fcgvhbuoicfygvhjbkcfgh bjknhcfgvhjbkhfcxdgcvhjbgfcghj',
    fighters: [
      { name: "Hakuho Sho", record: "45 Títulos", country: "Mongólia/Japão", image: "/fighters/hakuho.jpg" },
      { name: "Taiho Koki", record: "32 Títulos", country: "Japão", image: "/fighters/taiho.jpg" }
    ]
  },
  {
    id: '14',
    name: 'Wrestling',
    country: 'Global',
    coords: { lat: 40, lng: -75 },
    description: 'Estilo de luta olímpico baseado em quedas, controle e imobilização',
    image: '/martial-arts/wrestling.jpg',
    origin: 'Antiga Grécia',
    techniques: ['Single Leg', 'Double Leg', 'Suplex', 'Ankle Pick', 'Sprawl'],
    history: 'O Wrestling é uma das formas mais antigas de combate, praticado na Grécia Antiga como parte dos Jogos Olímpicos originais. Hoje é dividido em estilos como Greco-Romano e Estilo Livre, sendo fundamental para muitos lutadores de MMA.',
    philosofy: 'fcgvhbuoicfygvhjbkcfgh bjknhcfgvhjbkhfcxdgcvhjbgfcghj',
    fighters: [
      { name: "Jordan Burroughs", record: "Campeão Olímpico", country: "EUA", image: "/fighters/burroughs.jpg" },
      { name: "Aleksandr Karelin", record: "Invicto (Greco-Romano)", country: "Rússia", image: "/fighters/karelin.jpg" }
    ]
  }
];
