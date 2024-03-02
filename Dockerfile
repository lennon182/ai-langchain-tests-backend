FROM node:alpine

RUN npm install -g typescript

WORKDIR /app
COPY . .
RUN npm install
RUN tsc

CMD [ "node", "dist/index.js" ]