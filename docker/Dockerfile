FROM node:18-alpine as build

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .


FROM node:18-alpine as release

WORKDIR /app
COPY --from=build /app .

CMD ["npm", "run", "start"]
