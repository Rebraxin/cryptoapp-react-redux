FROM node:14-alpine as builder

WORKDIR /app

COPY app/package.json .

RUN npm install

COPY app/ .

RUN npm run build

WORKDIR /var/www/html

COPY app/build .