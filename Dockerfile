FROM node:20-slim

WORKDIR /code/

EXPOSE 3000
# Dependencies Installation
COPY ./package*.json ./

RUN npm install
# App Building 
COPY . .

RUN npm run build

CMD [ "node", "./.output/server/index.mjs" ]