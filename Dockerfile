FROM node:18-alpine as front

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package*.json ./yarn.lock ./

RUN yarn install

COPY ./ .
RUN yarn build

ENV DEBUGGER=true
ENV PORT=80
EXPOSE 80

FROM cypress/included:10.11.0 as cypress

WORKDIR /e2e
COPY ./package*.json ./yarn.lock ./

RUN yarn install

COPY . .
ENTRYPOINT sleep 10; yarn run test:e2e
