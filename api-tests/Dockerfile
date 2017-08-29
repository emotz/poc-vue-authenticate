FROM node

WORKDIR /src/api-tests

COPY package.json .
RUN npm install

COPY . .

CMD npm start
