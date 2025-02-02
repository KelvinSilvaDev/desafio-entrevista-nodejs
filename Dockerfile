# Use a imagem oficial do Node.js como base
FROM node:20.10.0-alpine as build

# Diretório de trabalho dentro do contêiner
WORKDIR /usr/local/app

# Copie os arquivos do seu aplicativo para o diretório de trabalho
# COPY package*.json .
COPY . .
COPY ./.env.production ./.env

RUN npm install -g @nestjs/cli

# Instale as dependências do Node.js
RUN npm install


# Construa o aplicativo Node.js

RUN npm run build


CMD [ "npm", "run", "start:prod" ]
# Exponha a porta do aplicativo Node.js
EXPOSE 8080

# Configuração do Nginx como um proxy reverso para o Node.js
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Comando para iniciar o aplicativo Node.js (ajuste conforme necessário)
# CMD ["node", "dist/apps/api/main.js"]