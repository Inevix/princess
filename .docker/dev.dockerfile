FROM node:latest

RUN mkdir -p /princess/bot
WORKDIR /princess

COPY ./package.json ./
COPY ./bot ./bot/

RUN npm i

CMD ["npm", "run", "dev"]