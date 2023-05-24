# init dockerfile for nx project

FROM node:14.15.4-alpine3.12
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm i \
    && npm run build

FROM $DOCKER_HOST/node:$NODE_VERSION as release
ENV NODE_ENV=production
WORKDIR /app
COPY package.json /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
RUN apk upgrade --update --no-cache
ENTRYPOINT [ "npm", "run", "start" ]
