# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Production stage
FROM nginx:alpine

# Copiar configuração personalizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar build da aplicação
COPY --from=build /app/dist /usr/share/nginx/html

# Expor porta 80
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]