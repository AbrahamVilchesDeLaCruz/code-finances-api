FROM node:20-slim AS base

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Etapa de desarrollo
FROM base AS local
RUN npm install -g @nestjs/cli
ENV NODE_ENV=local
CMD ["npm", "run", "start:dev"]

# Etapa de test
FROM base AS test
ENV NODE_ENV=test
RUN npm run build
CMD ["npm", "run", "test"]

# Etapa de producción
FROM base AS prod
ENV NODE_ENV=production
RUN npm run build && npm prune --production
CMD ["node", "dist/main.js"]
