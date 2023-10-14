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

ENV NODE_ENV=production
ENV PORT=6661
ENV SMTP_HOST=mail.infomaniak.com
ENV SMTP_PORT=465
ENV SMTP_USERNAME=metrikube@ik.me
ENV SMTP_PASSWORD=Metrikube123

CMD ["npm", "run", "start"]
