FROM node:20-slim

WORKDIR /code/

EXPOSE 3000

COPY ./package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run","dev" ]