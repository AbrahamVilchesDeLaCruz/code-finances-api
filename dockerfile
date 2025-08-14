FROM node:20-slim AS base
WORKDIR /var/www/
COPY package*.json ./
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY src ./src

# Etapa de desarrollo
FROM base AS local
ENV NODE_ENV=local
COPY . .
RUN rm -rf node_modules
RUN npm install
CMD ["npm", "run", "start:dev"]

# Etapa de test
FROM base AS test
ENV NODE_ENV=test
COPY .env.test .env
COPY test ./test
RUN npm install --include=dev
CMD ["npm", "run", "test"]

# Etapa de producción
FROM base AS prod
ENV NODE_ENV=production
RUN npm run build && npm prune --production
CMD ["node", "dist/main.js"]
