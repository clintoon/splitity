FROM node:12.14.1-alpine

WORKDIR /web

COPY web/ /web/
COPY yarn.lock /yarn.lock
COPY package.json /package.json

RUN yarn install
RUN yarn build

EXPOSE 8080
CMD ["yarn", "serve"]
