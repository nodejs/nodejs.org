FROM node:latest

RUN git clone https://github.com/PWilkosz99/nodejs.org.git
WORKDIR /nodejs.org/

RUN npm i rsync
RUN npm i rsyncwrapper
RUN npm install --save --legacy-peer-deps
