FROM node:18-alpine as build

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build:all:production # build all project and migrations

FROM node:18-alpine as release

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/data ./data
COPY --from=build /app/dist ./dist
COPY --from=build /app/dist-migrations ./dist-migrations

RUN npm install --omit=dev --ignore-scripts

# better-sqlite3 needs to be built
COPY --from=build /app/node_modules/better-sqlite3/build ./node_modules/better-sqlite3/build

RUN apk add gettext
RUN envsubst < ./dist/apps/app/web/config.template.json > ./dist/apps/app/web/config.json

ENV NODE_ENV=production

CMD ["npm", "run", "start"]
