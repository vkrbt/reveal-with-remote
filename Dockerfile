FROM node:10

ENV appdir /app
COPY / $appdir
WORKDIR $appdir
RUN npm ci

ENV CLIENT_PORT="80" \
    NODE_ENV=${NODE_ENV}

CMD npm run serve
