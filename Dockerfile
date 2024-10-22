# مرحلة البناء
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY . .

RUN npm install --legacy-peer-deps

# مرحلة الإنتاج
FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["npx", "turbo", "dev"]

