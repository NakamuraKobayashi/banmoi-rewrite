FROM node:16.17.0-alpine

WORKDIR /usr/banmoi

COPY package.json .

RUN npm install

COPY . .

VOLUME ["json.sqlite"]

CMD [ "node", "index.js" ]