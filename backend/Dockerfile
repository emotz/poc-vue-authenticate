FROM poc-vue-authenticate/frontend as frontend

FROM node

WORKDIR /src/backend

COPY package.json .
RUN npm install

COPY --from=frontend /src/frontend/dist ../frontend/dist
COPY . .

CMD bash entrypoint.sh
