FROM node:22-alpine

WORKDIR /app

COPY package* ./

RUN npm install

COPY . .

RUN npm install typescript --save-dev

RUN npm run build

EXPOSE 3001

CMD [ "node" , "dist/index.js" ]