FROM node:14.15-alpine AS build
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest
COPY dist/frontend /usr/share/nginx/html/
