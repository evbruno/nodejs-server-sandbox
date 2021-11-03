FROM node:17
EXPOSE 8000

WORKDIR /app

COPY ./ ./

RUN yarn install && yarn run build

CMD [ "node", "build/index.js" ]