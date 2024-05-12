FROM node:20

COPY .env .env

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

CMD [ "node", "dist/main.js" ]
