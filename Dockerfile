FROM node:20-slim

WORKDIR /code/

EXPOSE 3000
COPY ./package*.json ./

RUN npm install
# ENV GOOGLE_APPLICATION_CREDENTIALS=/code/application_default_credentials.json
COPY . .
RUN npm run build

CMD [ "node", "./.output/server/index.mjs" ]