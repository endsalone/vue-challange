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
