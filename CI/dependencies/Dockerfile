FROM node:latest

RUN git clone https://github.com/nodejs/nodejs.org
WORKDIR /nodejs.org/

RUN npm install --save --legacy-peer-deps
RUN npm install --save-dev eslint@7 eslint-plugin-promise@4 eslint-plugin-import@2 eslint-plugin-node@11 @typescript-eslint/eslint-plugin@4 eslint-config-standard-with-typescript