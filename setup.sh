
#!/bin/bash

# Instalando dependências do frontend
echo "Instalando dependências do frontend..."
npm install axios

# Entrando na pasta do backend
echo "Configurando backend..."
mkdir -p backend
cd backend

# Instalando dependências do backend
echo "Instalando dependências do backend..."
npm init -y
npm install bcryptjs cloudinary cors dotenv express jsonwebtoken mongoose multer
npm install --save-dev nodemon

# Criando .env a partir do exemplo
echo "Criando arquivo .env no backend..."
if [ -f .env.example ]; then
  cp .env.example .env
  echo "Arquivo .env criado. Por favor, preencha as variáveis de ambiente adequadas."
else
  echo "PORT=5000" > .env
  echo "MONGO_URI=mongodb://localhost:27017/martialworld" >> .env
  echo "JWT_SECRET=your_jwt_secret_key_here" >> .env
  echo "JWT_EXPIRES_IN=24h" >> .env
  echo "CLOUDINARY_CLOUD_NAME=your_cloud_name" >> .env
  echo "CLOUDINARY_API_KEY=your_api_key" >> .env
  echo "CLOUDINARY_API_SECRET=your_api_secret" >> .env
  echo "Arquivo .env criado. Por favor, preencha as variáveis de ambiente adequadas."
fi

# Voltando para a pasta raiz
cd ..

echo "Setup concluído!"
echo "Para iniciar o backend, execute: cd backend && npm run dev"
echo "Para iniciar o frontend, execute: npm run dev"
