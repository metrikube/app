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
ENV SMTP_HOST=sandbox.smtp.mailtrap.io
ENV SMTP_PORT=2525
ENV SMTP_USERNAME=3c2381921e16de
ENV SMTP_PASSWORD=9f10ddbbc8d8af

CMD ["npm", "run", "start"]
