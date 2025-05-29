# 🥋 BrawlTech – Front-end

**BrownTech** é uma plataforma interativa focada no mundo das **lutas**, combinando informação, entretenimento, redes sociais e até um jogo inspirado em Street Fighter. Este repositório contém **apenas o front-end** do projeto.

---

## 📸 Visão Geral

- **Tela de Loading Animada**: Animação inicial que prepara a experiência do usuário.
- **Mapa 3D Interativo**: Um globo terrestre em 3D com pontos vermelhos indicando onde ocorrem lutas ao redor do mundo.
- **Páginas de Lutas**: Ao clicar em um ponto do globo, o usuário é redirecionado para uma página específica da luta selecionada.
- **Sistema de Chat e Interação**:
  - Login e Cadastro
  - Publicações
  - Comentários
  - Likes
  - Enquetes
- **Medalhas Olímpicas**:
  - Slider com modelos 3D das medalhas
  - Linha do tempo com a evolução das lutas ao longo da história
- **Jogo Estilo Street Fighter**:
  - Suporte para teclado e controle
  - Lutas interativas integradas ao site

---

## 🧪 Tecnologias Utilizadas

### ⚙️ Principais

- **React** – Biblioteca para criação de interfaces reativas
- **Vite** – Ferramenta de build e desenvolvimento rápido
- **TypeScript** – Superset do JavaScript com tipagem estática
- **Tailwind CSS** – Framework utilitário para estilização

### 🎮 Gráficos & Interatividade

- **Three.js** – Para renderização 3D do globo, medalhas e cenas
- **GSAP (GreenSock Animation Platform)** – Para animações fluidas e responsivas

### 🔗 Integração com Back-end

- **Axios** – Cliente HTTP para comunicação com a API do back-end
- **Fast Reading** – Otimizações na leitura e carregamento de dados

---

## 🧭 Estrutura do Projeto

```bash
📁 src/
 ┣ 📁 components/       # Componentes reutilizáveis (botões, cards, sliders, etc.)
 ┣ 📁 pages/            # Páginas principais (Home, Lutas, Chat, Jogo, etc.)
 ┣ 📁 assets/           # Imagens, modelos 3D, ícones
 ┣ 📁 services/         # Serviços de API (Axios configurado)
 ┣ 📁 hooks/            # Hooks customizados
 ┣ 📁 contexts/         # Contextos de autenticação, tema, etc.
 ┣ 📁 utils/            # Funções utilitárias
 ┗ 📄 main.tsx          # Ponto de entrada do app
