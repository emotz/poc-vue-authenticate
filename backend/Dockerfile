FROM poc-vue-authenticate/frontend as frontend
RUN npm run build

FROM node

WORKDIR /src/backend

COPY package.json .
RUN npm install

COPY --from=frontend /src/frontend/dist ../frontend/dist
COPY . .

CMD bash entrypoint.sh
