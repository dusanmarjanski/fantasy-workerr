# syntax=docker/dockerfile:1

FROM node:16.14.2-alpine

WORKDIR /app

ENV NODE_ENV=dev

COPY [ "package.json", "yarn.lock*", "./" ]

RUN yarn install --frozen-lockfile --production
COPY . .

# Loading environments
COPY ./src/environment/.env.${NODE_ENV} /app/src/environment/.env

RUN yarn global add @nestjs/cli
RUN yarn build

CMD [ "yarn", "prod" ]