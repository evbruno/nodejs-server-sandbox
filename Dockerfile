FROM node:16-alpine3.14
EXPOSE 8000

WORKDIR /app

COPY ./ ./

RUN yarn install && yarn run build

CMD [ "node", "build/index.js" ]