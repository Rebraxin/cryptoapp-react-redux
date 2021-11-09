FROM node:14-alpine as builder

WORKDIR /app

COPY app/package.json .

RUN npm install

COPY app/ .

RUN npm run build

COPY app/build /var/www/html