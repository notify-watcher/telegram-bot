# syntax=docker/dockerfile:1.0-experimental

FROM node:12.12

ENV PORT=3000
ENV NODE_ENV=production

WORKDIR /telegram-bot

RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x wait-for-it.sh

COPY docker_entrypoint.sh .
RUN chmod +x docker_entrypoint.sh

COPY package.json .
COPY package-lock.json .

RUN --mount=type=secret,id=npmrc,dst=/server/.npmrc npm install

COPY src src

ENTRYPOINT ["./docker_entrypoint.sh"]
