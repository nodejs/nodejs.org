FROM node:latest

RUN git clone https://github.com/nodejs/nodejs.org
WORKDIR /nodejs.org/

RUN npm install
RUN npm run build

#EXPOSE 8080