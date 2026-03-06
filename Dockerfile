FROM node:18-alpine

# Definir o directório de trabalho
WORKDIR /app

# Copiar apenas os ficheiros de definição de pacote
# Isso permite aproveitar a cache do Docker na instalação de dependências
COPY package.json package-lock.json* ./

# Instalar as dependências (incluindo as de desenvolvimento necessárias para Vite)
RUN npm install

# Copiar o resto do código do projeto
COPY . .

# Expor a porta que o Vite utiliza por predefinição
EXPOSE 5173

# Correr o servidor en modo de desenvolvimento com hot-reload ativo
CMD ["npm", "run", "dev"]
