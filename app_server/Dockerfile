FROM node:14

WORKDIR /app_server

COPY /app/package.json .

RUN npm install

COPY /app_server .

EXPOSE 3555

CMD [ "node", "index.js" ]