FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

VOLUME ["/config"]

CMD [ "node", "index.js" ]