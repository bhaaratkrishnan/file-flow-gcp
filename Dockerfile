FROM node:20-slim

WORKDIR /code/

EXPOSE 3000
# Dependencies Installation
COPY ./package*.json ./
RUN npm install
# Environment variables 
ENV NUXT_PUBLIC_STUN_URL="stun:34.16.23.24:3478"
ENV NUXT_PUBLIC_TURN_URL="turn:34.16.23.24:3478"
ENV NUXT_PUBLIC_TURN_USERNAME="guest"
ENV NUXT_PUBLIC_TURN_PASSWORD="somepassword"
ENV NUXT_PUBLIC_PROJECT_ID="serverless-web-apis-test"
ENV NUXT_PUBLIC_PROJECT_LOCATION="us-central1"
ENV NUXT_PUBLIC_STORAGE_BUCKET_NAME="test-bucket-code-vipa"
# App Building 
COPY . .
RUN npm run build

CMD [ "node", "./.output/server/index.mjs" ]