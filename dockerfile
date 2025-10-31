# ================================
# STAGE 1: produção
# ================================
FROM node:20-alpine AS prod

WORKDIR /usr/src/monitor

# Copia package.json e instala apenas deps de produção
COPY package*.json ./
RUN npm install --production

# Copia código pronto (build se necessário)
COPY . .

# Expõe porta
EXPOSE 3000

# Comando de execução
CMD ["node", "src/server.js"]   # ou "dist/server.js" se houver build

# ================================
# STAGE 2: desenvolvimento
# ================================
FROM node:20-alpine AS dev

WORKDIR /usr/src/monitor

# Instala todas dependências
COPY package*.json ./
RUN npm install

# Copia todo o código
COPY . .

# Instala nodemon globalmente para hot-reload
RUN npm install -g nodemon

EXPOSE 3000

# Comando para dev
CMD ["nodemon", "src/server.js"]
