#FROM node:18-alpine AS build
#WORKDIR /usr/src/app
#COPY . .
#RUN npm install
#RUN npm install sqlite3 --save
#RUN npm run build
#
#FROM node:18-alpine AS release
#ENV NODE_ENV=production
#WORKDIR /app
#COPY --from=build /usr/src/app/ .
#ENTRYPOINT [ "npm", "run", "start" ]


FROM node:18-alpine

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY dist dist

CMD ["npm", "run", "start"]
