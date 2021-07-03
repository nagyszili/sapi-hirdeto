FROM node:12.21.0-alpine3.10

WORKDIR /app


COPY . .

RUN yarn

RUN yarn build

CMD yarn prod
