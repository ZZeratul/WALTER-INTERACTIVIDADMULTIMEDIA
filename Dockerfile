# Usamos imágenes oficiales desde Docker Hub
FROM node:20 AS build
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node . .

USER node
# Configuración de npm para usar el registro público
RUN npm set registry https://registry.npmjs.org/
RUN npm set strict-ssl false

RUN npm ci
RUN npm run build
RUN npm ci --production --no-optional

# Usamos la imagen oficial de Node en modo Alpine para la fase de release
FROM node:20-alpine AS release
RUN mkdir -p /home/node/app/node_modules && mkdir -p /home/node/app/dist  && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY  --from=build --chown=node:node /home/node/app/node_modules ./node_modules
COPY  --from=build --chown=node:node /home/node/app/dist ./dist
COPY  --from=build --chown=node:node /home/node/app/.env ./.env

USER node
ARG CI_COMMIT_SHORT_SHA
ARG CI_COMMIT_MESSAGE
ARG CI_COMMIT_REF_NAME
ENV CI_COMMIT_SHORT_SHA=${CI_COMMIT_SHORT_SHA} \
    CI_COMMIT_MESSAGE=${CI_COMMIT_MESSAGE} \
    CI_COMMIT_REF_NAME=${CI_COMMIT_REF_NAME}

CMD  ["sh", "-c",  "node dist/src/main"]
EXPOSE 3000
