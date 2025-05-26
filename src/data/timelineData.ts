
export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
  backgroundImage: string;
  fighter: string;
}

export const timelineData: TimelineItem[] = [
  {
    id: 1,
    year: "4000 a.C",
    title: "Luta como forma de sobrevivência",
    description: "Desde os primórdios da humanidade, a luta foi uma ferramenta essencial para a sobrevivência do ser humano. Era utilizada nas caças, nas disputas por território, alimentos e também para garantir a própria integridade física contra ameaças. Essa prática rudimentar de combate se desenvolveu ao longo do tempo, dando origem a várias formas de lutas organizadas.",
    backgroundImage: "ancient-arena.jpg",
    fighter: "/timeline/fighters/fighter-surviver.png"
  },
  {
    id: 2,
    year: "3000 a.C",
    title: "Boxe",
    description: "O boxe é uma das lutas mais antigas registradas, com evidências históricas de sua prática na antiga Suméria por volta de 3000 a.C. Originalmente uma forma bruta de combate, ele passou por diversas transformações até alcançar o formato moderno, renascendo na Inglaterra com regras e equipamentos apropriados. Hoje é uma das lutas mais populares do mundo.",
    backgroundImage: "temple.jpg",
    fighter: "/timeline/fighters/boxing-fighter.png"
  },
  {
    id: 3,
    year: "2500 a.C",
    title: "Jiu Jitsu",
    description: "Originado no Japão, o jiu-jítsu é uma arte marcial baseada em alavancas, torções e imobilizações. Desenvolvido como forma de autodefesa por guerreiros samurais, ele permite que um lutador mais fraco derrote um adversário mais forte por meio da técnica. Sua influência foi decisiva para o surgimento do judô e do jiu-jítsu brasileiro.",
    backgroundImage: "jj.jpg",
    fighter: "/timeline/fighters/kimono1.png"
  },
  {
    id: 4,
    year: "2000 a.C",
    title: "Pancrácio",
    description: "O Pancrácio era uma forma de combate praticada na Grécia antiga que combinava elementos de luta livre e boxe. Era uma das modalidades mais brutais dos Jogos Olímpicos da Antiguidade e envolvia poucos limites nas regras, permitindo socos, chutes e imobilizações. É considerado um dos precursores das artes marciais mistas modernas.",
    backgroundImage: "pancrariogr.jpg",
    fighter: "/timeline/fighters/pancrario-fighter.png"
  },
  {
    id: 5,
    year: "1700 a.C",
    title: "Kung Fu",
    description: "O Kung Fu surgiu na China antiga e é praticado há milênios pelos monges Shaolin. Muito mais do que uma luta, ele é um caminho de disciplina física e espiritual, inspirado nos movimentos de animais como a garça, o tigre, a serpente e o macaco. Seus princípios incluem respeito, equilíbrio, precisão e autoconhecimento.",
    backgroundImage: "kungfu.jpg",
    fighter: "/timeline/fighters/kung-fighter.png"
  },
  {
    id: 6,
    year: "1500 a.C",
    title: "Esgrima",
    description: "A esgrima tem suas raízes na pré-história, quando o homem começou a usar objetos longos como armas. Com o tempo, a evolução dos metais levou à criação de espadas e técnicas específicas de combate corpo a corpo. Inicialmente usada na guerra, tornou-se uma arte de defesa pessoal e, posteriormente, um esporte olímpico elegante e técnico.",
    backgroundImage: "fencing.jpg",
    fighter: "/timeline/fighters/fencing-fighter.png"
  },
  {
    id: 7,
    year: "264 a.C",
    title: "Gladiadores",
    description: "Na Roma antiga, os gladiadores eram guerreiros que lutavam entre si ou contra feras em arenas como o Coliseu. Frequentemente escravos ou prisioneiros, eles se tornavam figuras públicas admiradas pelo povo. Suas lutas eram brutais, muitas vezes até a morte, e faziam parte dos espetáculos oferecidos pelo império para entreter a população.",
    backgroundImage: "coliseu.jpg",
    fighter: "/timeline/fighters/gladiador-fighter.png"
  },
  {
    id: 8,
    year: "90 a.C",
    title: "Taekwondo",
    description: "O taekwondo nasceu na Coreia antiga, com raízes em sistemas de combate utilizados por guerreiros da elite, como os Hwa Rang Do. Ele combina chutes altos, giros e movimentos ágeis com disciplina mental e valores como respeito e coragem. Tornou-se um dos esportes de combate mais praticados no mundo e entrou nos Jogos Olímpicos em 2000.",
    backgroundImage: "taekwondo.jpg",
    fighter: "/timeline/fighters/kimono3.png"
  },
  {
    id: 9,
    year: "1000 d.C",
    title: "Samurais",
    description: "Os samurais foram guerreiros nobres do Japão feudal que seguiam um rígido código de honra chamado Bushido. Treinados em diversas armas, principalmente a katana, eles eram mestres da estratégia, disciplina e da autodefesa. Sua filosofia e estilo de vida influenciaram profundamente as artes marciais japonesas modernas.",
    backgroundImage: "samurai.jpg",
    fighter: "/timeline/fighters/samurai-fighter.png"
  },
  {
    id: 10,
    year: "1600 d.C",
    title: "Capoeira",
    description: "A capoeira surgiu como uma forma de resistência e autodefesa dos escravos africanos no Brasil. Disfarçada de dança para enganar os senhores, ela combina música, acrobacias e movimentos rápidos de ataque e esquiva. Com o tempo, se tornou símbolo da cultura afro-brasileira e uma expressão de luta pela liberdade e identidade.",
    backgroundImage: "capoeira.jpg",
    fighter: "/timeline/fighters/capoeira-fighter.png"
  },
  {
    id: 11,
    year: "1868 d.C",
    title: "Karatê",
    description: "O karatê, em sua forma moderna, ganhou força com o mestre Gichin Funakoshi, que popularizou a arte fora da ilha de Okinawa. Baseado em golpes precisos com mãos e pés, o karatê valoriza o controle, a disciplina e o aprimoramento do corpo e da mente. Hoje é uma prática difundida mundialmente como esporte e filosofia de vida.",
    backgroundImage: "karate.jpg",
    fighter: "/timeline/fighters/karate-fighter.png"
  },
  {
    id: 12,
    year: "1882 d.C",
    title: "Judô",
    description: "O judô foi criado por Jigoro Kano como uma forma mais segura e educacional do jiu-jitsu tradicional. Enfatiza a técnica sobre a força, permitindo que um praticante derrote o adversário com alavancas e quedas. Mais do que um esporte, o judô visa formar o caráter e promover valores como respeito, humildade e perseverança.",
    backgroundImage: "dojo-judo.jpg",
    fighter: "/timeline/fighters/kimono2.png"
  },
  {
    id: 13,
    year: "1896 d.C",
    title: "Primeira olimpíada",
    description: "A primeira edição dos Jogos Olímpicos modernos ocorreu em Atenas, na Grécia, com inspiração nos antigos jogos da era clássica. Os esportes de combate, como a esgrima e as lutas, já faziam parte da competição desde o início. O evento simbolizava a união entre os povos e estabelecia um período de trégua durante as guerras.",
    backgroundImage: "olympic.jpg",
    fighter: "/timeline/fighters/olympic-fighter.png"
  },
  {
    id: 14,
    year: "1898 d.C",
    title: "Bartitsu",
    description: "O Bartitsu é uma arte marcial britânica criada por Edward Barton-Wright, combinando elementos do jiu-jitsu, boxe, savate e luta com bastão. Foi uma das primeiras tentativas no Ocidente de criar um sistema de defesa pessoal verdadeiramente misto. Ficou famoso por ser mencionado como a arte marcial usada por Sherlock Holmes.",
    backgroundImage: "bartitsu.jpg",
    fighter: "/timeline/fighters/bartitsu-fighter.png"
  },
  {
    id: 15,
    year: "1920 d.C",
    title: "Jiu jitsu Brasileiro",
    description: "Desenvolvido a partir do jiu-jitsu japonês, o Jiu-Jitsu Brasileiro (BJJ) foi aperfeiçoado pela família Gracie no Brasil. Seu foco é o combate no solo, utilizando técnicas de submissão e controle para neutralizar o adversário. O BJJ se destacou mundialmente por sua eficácia em torneios de vale-tudo e MMA.",
    backgroundImage: "bjj.jpg",
    fighter: "/timeline/fighters/bjj-fighter.png"
  },
];

