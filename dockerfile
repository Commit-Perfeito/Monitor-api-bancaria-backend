FROM node:20-alpine AS prod

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production

COPY . .

EXPOSE ${PORT}

ENTRYPOINT ["sh", "-c", "yarn migration:run && yarn seed:run && yarn start"]
