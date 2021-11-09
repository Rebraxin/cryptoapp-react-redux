FROM node:14-alpine as builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

WORKDIR /var/www/html

COPY /app/build .