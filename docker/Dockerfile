FROM node:18-alpine as build

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .


FROM node:18-alpine as release

WORKDIR /app
COPY --from=build /app .
RUN apk add gettext
RUN envsubst < ./dist/apps/app/web/config.prod.json > ./dist/apps/app/web/config.json
CMD ["npm", "run", "start"]
