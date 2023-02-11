FROM node:latest

RUN mkdir -p /princess/bot
WORKDIR /princess

COPY ./package.json ./
COPY ./changelog.json ./
COPY ./bot ./bot/

RUN npm i --omit=dev

CMD ["npm", "start"]