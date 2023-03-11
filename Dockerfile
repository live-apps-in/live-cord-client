FROM node:14-alpine
WORKDIR /usr/src/ui_live_cord
COPY package.json ./
COPY package-lock.json ./
COPY . .
RUN npm i -g serve
CMD [ "serve", "-s", "build" ]