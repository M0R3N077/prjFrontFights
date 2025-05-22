
export interface OlympicSport {
  id: string;
  name: string;
  description: string;
  history: string;
  modelPath: string;
  olympicYear: string;
  backgroundTexture?: string;
}

export const olympicCombatSports: OlympicSport[] = [
  {
    id: "boxing",
    name: "Boxe",
    description:
      "O boxe é um esporte de combate em que os atletas utilizam apenas os punhos para atingir o adversário, com foco em técnica, agilidade e resistência. Os combates são divididos por categorias de peso e ocorrem dentro de um ringue.",
    history:
      "O boxe estreou nos Jogos Olímpicos em St. Louis 1904 e tem sido uma presença constante desde então. A participação feminina foi oficialmente incluída em Londres 2012, e em Tóquio 2020 o número de categorias femininas aumentou para cinco.",
    olympicYear: "1904",
    modelPath: "/models/ring_box_-_fight_-_pelea.glb",
    backgroundTexture: "/textures/boxing-ring.jpg"
  },
  {
    id: "judo",
    name: "Judô",
    description:
      "O judô é uma arte marcial japonesa baseada em arremessos, imobilizações e estrangulamentos. O esporte valoriza o uso inteligente da força e do equilíbrio para subjugar o oponente, sempre com respeito e disciplina.",
    history:
      "Criado por Jigoro Kano em 1882, o judô entrou no programa olímpico em Tóquio 1964. O Brasil é uma das potências da modalidade, com destaques como Aurélio Miguel, Rogério Sampaio, Rafaela Silva e Sarah Menezes.",
    olympicYear: "1964",
    modelPath: "/models/dojo-judo.glb",
    backgroundTexture: "/textures/judo-tatami.jpg"
  },
  {
    id: "wrestling",
    name: "Luta Olímpica",
    description:
      "A luta olímpica se divide em dois estilos: o estilo livre, que permite o uso das pernas no ataque e na defesa, e o greco-romano, que restringe os ataques à parte superior do corpo. O objetivo é imobilizar o adversário ou vencer por pontos.",
    history:
      "Presente desde os Jogos Olímpicos da antiguidade, a luta foi incluída na era moderna em Atenas 1896. A versão feminina foi adicionada em Atenas 2004, promovendo maior inclusão na modalidade.",
    olympicYear: "1896",
    modelPath: "/models/olympic_logo.glb",
    backgroundTexture: "/textures/wrestling-mat.jpg"
  },
  {
    id: "taekwondo",
    name: "Taekwondo",
    description:
      "O taekwondo é uma arte marcial coreana caracterizada por chutes rápidos, giros e ataques acrobáticos. Nos combates olímpicos, os pontos são marcados com base na precisão, força e técnica dos golpes.",
    history:
      "Após participações como esporte de demonstração em Seul 1988 e Barcelona 1992, o taekwondo tornou-se modalidade oficial nos Jogos de Sydney 2000. Desde então, é disputado por homens e mulheres em várias categorias de peso.",
    olympicYear: "2000",
    modelPath: "/models/taekwondoin_kick.glb",
    backgroundTexture: "/textures/taekwondo-aren.jpg"
  },
  {
    id: "fencing",
    name: "Esgrima",
    description:
      "A esgrima é um esporte de combate com armas brancas modernas: florete, espada e sabre. Cada tipo possui regras distintas sobre as áreas válidas de toque, formas de pontuação e prioridade nos ataques.",
    history:
      "Presente em todas as edições dos Jogos Olímpicos modernos desde Atenas 1896, a esgrima é um dos esportes mais tradicionais do evento, com forte presença europeia e crescente diversidade internacional.",
    olympicYear: "1896",
    modelPath: "/models/fencing.glb",
    backgroundTexture: "/textures/fencing-arena.jpg"
  },
  {
    id: "karate",
    name: "Karatê",
    description:
      "O karatê olímpico é dividido em duas modalidades: kata (demonstração de formas e movimentos) e kumite (combate direto entre dois atletas). A pontuação é baseada na técnica, controle e eficácia dos golpes.",
    history:
      "O karatê estreou oficialmente nos Jogos de Tóquio 2020, após longa trajetória como esporte de demonstração. Apesar de sua importância cultural no Japão, não foi incluído no programa de Paris 2024.",
    olympicYear: "2020",
    modelPath: "/models/dojo.glb",
    backgroundTexture: "/textures/karate-dojo.jpg"
  }
];

