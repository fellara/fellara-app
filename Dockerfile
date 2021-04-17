FROM node:alpine

WORKDIR '/app'
COPY package*.json ./

RUN npm install
RUN npm install -g next
RUN npm install -g expo-cli
RUN npm install -g serve

COPY . .


# RUN npm run build -o app
RUN expo build:web
RUN serve -s build