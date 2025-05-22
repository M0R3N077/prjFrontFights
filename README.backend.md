
# MartialWorld Backend Setup

Este guia vai te ajudar a configurar e rodar o backend da aplicação MartialWorld. O backend é construído usando Node.js, Express, MongoDB e suporta upload de imagens com Cloudinary.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn
- MongoDB Atlas conta (para banco de dados em nuvem)
- Cloudinary conta (para armazenamento de imagens)

## Passo 1: Configurar o MongoDB Atlas

1. Crie uma conta gratuita em [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Crie um novo cluster (a opção gratuita é suficiente)
3. Clique em "Connect" no seu cluster
4. Selecione "Connect your application"
5. Copie a string de conexão (algo como `mongodb+srv://username:password@cluster.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)

## Passo 2: Configurar o Cloudinary

1. Crie uma conta gratuita em [Cloudinary](https://cloudinary.com/users/register/free)
2. No dashboard, você encontrará:
   - Cloud Name
   - API Key
   - API Secret

## Passo 3: Configurar as variáveis de ambiente

1. Na pasta `backend`, crie um arquivo `.env` baseado no arquivo `.env.example`
2. Preencha as variáveis:
   ```
   PORT=5000
   MONGO_URI=sua_string_de_conexao_do_mongodb_atlas
   JWT_SECRET=uma_string_secreta_para_tokens_jwt
   JWT_EXPIRES_IN=24h
   CLOUDINARY_CLOUD_NAME=seu_cloud_name
   CLOUDINARY_API_KEY=sua_api_key
   CLOUDINARY_API_SECRET=seu_api_secret
   ```

## Passo 4: Instalar dependências e iniciar o servidor

1. Abra o terminal e navegue até a pasta `backend`:
   ```
   cd backend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Inicie o servidor em modo de desenvolvimento:
   ```
   npm run dev
   ```

   Ou, se preferir iniciar em modo de produção:
   ```
   npm start
   ```

## Passo 5: Configurar o Frontend para usar a API

1. No frontend, crie um arquivo `.env.local` na raiz do projeto com:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

2. Inicie o frontend em outra janela do terminal:
   ```
   npm run dev
   ```

## Estrutura do Projeto

- `models/` - Definições de esquemas MongoDB
- `controllers/` - Lógica de negócio para as rotas
- `routes/` - Definição de rotas API
- `middleware/` - Funções middleware (auth, upload, etc.)
- `utils/` - Funções utilitárias
- `uploads/` - Pasta temporária para uploads
- `server.js` - Ponto de entrada da aplicação

## Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login de usuário
- `GET /api/auth/me` - Obter dados do usuário atual (autenticado)

### Posts
- `GET /api/posts/martial-art/:martialArtId` - Obter posts de uma arte marcial
- `POST /api/posts` - Criar novo post (requer autenticação)
- `POST /api/posts/:postId/reaction` - Adicionar/remover reação (requer autenticação)
- `POST /api/posts/:postId/comment` - Adicionar comentário (requer autenticação)
- `DELETE /api/posts/:postId` - Deletar post (requer autenticação, apenas o dono)

## Solução de Problemas

- **Erro de conexão com MongoDB**: Verifique se sua string de conexão está correta e se seu IP está na lista de IPs permitidos no MongoDB Atlas
- **Erros de CORS**: Verifique se o middleware CORS está configurado corretamente
- **Falha no upload de imagens**: Verifique suas credenciais do Cloudinary e certifique-se de que a pasta de uploads é gravável
