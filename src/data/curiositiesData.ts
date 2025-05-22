import Pankration from "/curiosities/pankration.jpg";
import Kung from "/curiosities/KungFu.png";
import Jiu from "/curiosities/jiu.jpg";
import Mortal from "/curiosities/mortal.jpg";
import Boxe from "/curiosities/boxe.jpg";
import Aikido from "/curiosities/aikido.jpg";
import Fight from "/curiosities/fight.jpg";
import Capoeira from "/curiosities/capoeira.jpg";
import MMA from "/curiosities/MMA.jpg";




interface Curiosidade {
  id: number;
  titulo: string;
  imagem: string;
  descricao: string;
}

export const curiosidades: Curiosidade[] = [
  {
    id: 1,
    titulo: "A Prática de Combate Mais Antiga da Humanidade",
    imagem: Pankration,
    descricao: "O Pankration foi introduzido nos Jogos Olímpicos da Grécia Antiga em 648 a.C. e é considerada a forma mais antiga de arte marcial registrada. Era uma mistura brutal de luta livre e boxe, com pouquíssimas regras — apenas morder e enfiar os dedos nos olhos eram proibidos."
  },
  {
    id: 2,
    titulo: "O Jiu-Jitsu Ensina a Usar o Cérebro, Não a Força",
    imagem: Jiu,
    descricao: "O Jiu-Jitsu Brasileiro é uma arte marcial que valoriza o raciocínio rápido e a técnica sobre a força física. Lutadores aprendem a usar alavancas e o peso do adversário contra ele, tornando possível que alguém mais leve domine oponentes muito mais fortes."
  },
  {
    id: 3,
    titulo: "A Arte do Kung Fu e Sua Inspiração nos Movimentos dos Animais",
    imagem: Kung,
    descricao: "No Kung Fu tradicional, muitos estilos foram inspirados nos movimentos e comportamentos de animais, como o tigre, a serpente, a garça, o macaco e o louva-a-deus. Cada animal representa uma filosofia de luta e habilidades específicas, tornando essa arte uma das mais ricas culturalmente."
  },
  {
    id: 4,
    titulo: "A Influência das Lutas nas Histórias de Filmes e Video Games",
    imagem: Mortal,
    descricao: "Artes marciais influenciaram diretamente o mundo dos jogos eletrônicos e do cinema. Títulos como Street Fighter, Mortal Kombat e Tekken nasceram a partir de estilos reais de luta, e astros como Bruce Lee tornaram-se ícones culturais que levaram o kung fu para o mundo inteiro."
  },
  {
    id: 5,
    titulo: "O Boxe Já Foi Lutado com Mãos Nuas",
    imagem: Boxe,
    descricao: "Antes da padronização das luvas e das regras modernas, o boxe era praticado com os punhos nus, especialmente na Inglaterra dos séculos XVIII e XIX. As lutas podiam durar horas, e os danos físicos eram extremamente severos."
  },
  {
    id: 6,
    titulo: "Lutas Também Trabalham o Equilíbrio Mental",
    imagem: Aikido,
    descricao: "Disciplinas como o Aikido, Tai Chi e até mesmo o Karatê tradicional ensinam que lutar não é apenas bater ou se defender, mas também desenvolver disciplina, foco e equilíbrio emocional. Muitos mestres veem a luta como um caminho espiritual."
  },
  {
    id: 7,
    titulo: "Cada País Tem Sua Própria Luta Tradicional",
    imagem: Fight,
    descricao: "Ao redor do mundo, quase toda cultura desenvolveu sua própria forma de combate: o Muay Thai na Tailândia, o Sambo na Rússia, o Sumô no Japão, a Capoeira no Brasil e o Savate na França. Cada estilo traz consigo valores e tradições únicas."
  },
  {
    id: 8,
    titulo: "Algumas Lutas Foram Proibidas no Passado",
    imagem: Capoeira,
    descricao: "A Capoeira, por exemplo, foi criminalizada no Brasil durante o século XIX, pois era associada à resistência dos escravizados e ao crime. Mesmo assim, os praticantes continuavam treinando escondido, muitas vezes disfarçando os movimentos como dança."
  },
  {
    id: 9,
    titulo: "Lutadores de MMA Treinam Diversas Artes",
    imagem: MMA,
    descricao: "O MMA (Mixed Martial Arts) é o resultado da junção de diversas artes marciais, combinando o que há de mais eficaz em pé (como o boxe e o muay thai) e no chão (como o wrestling e o jiu-jitsu). Isso exige dos atletas um preparo físico e mental intensivo."
  }
];