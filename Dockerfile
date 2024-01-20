# Use a imagem oficial do Node.js como base
FROM node:14

# Diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos do seu aplicativo para o diretório de trabalho
COPY . .

# Instale as dependências do Node.js
RUN npm install

# Exponha a porta do aplicativo Node.js
EXPOSE 3000

# Configuração do Nginx como um proxy reverso para o Node.js
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Comando para iniciar o aplicativo Node.js (ajuste conforme necessário)
CMD ["npm", "start"]
