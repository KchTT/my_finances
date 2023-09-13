FROM node:14

WORKDIR /api

COPY /api/package.json .

RUN npm install

COPY /api .

EXPOSE 3556

CMD [ "node", "index.js" ]