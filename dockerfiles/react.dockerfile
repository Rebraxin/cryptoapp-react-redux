FROM node:14-alpine as builder

WORKDIR /var/www/html

COPY app/package.json .

RUN npm install

COPY app/ .

RUN npm run build

COPY app/build .