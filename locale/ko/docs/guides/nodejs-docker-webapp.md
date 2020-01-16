---
title: Node.js 웹 앱의 도커라이징
layout: docs.hbs
---

<!--
# Dockerizing a Node.js web app

The goal of this example is to show you how to get a Node.js application into a
Docker container. The guide is intended for development, and *not* for a
production deployment. The guide also assumes you have a working [Docker
installation](https://docs.docker.com/engine/installation/) and a basic
understanding of how a Node.js application is structured.

In the first part of this guide we will create a simple web application in
Node.js, then we will build a Docker image for that application, and lastly we
will run the image as a container.

Docker allows you to package an application with all of its dependencies into a
standardized unit, called a container, for software development. A container is
a stripped-to-basics version of a Linux operating system. An image is software
you load into a container.
-->

# Node.js 웹 앱의 도커라이징

이 예제에서는 Node.js 애플리케이션을 Docker 컨테이너에 넣는 방법을 보여줍니다. 이 가이드는
개발 목적이지 프로덕션 배포용이 *아닙니다*.
[Docker가 설치](https://docs.docker.com/engine/installation/)되어 있고
Node.js 애플리케이션의 구조에 대한 기본적인 지식이 있어야 합니다.

먼저 간단한 Node.js 웹 애플리케이션을 만든 후에 이 애플리케이션을 위한 Docker 이미지를
만들어서 컨테이너로 실행할 것입니다.

Docker를 사용하면 애플리케이션과 모든 의존성을 소프트웨어 개발에서 컨테이너라고 부르는 표준화된
단위로 패키징할 수 있습니다. 컨테이너는 리눅스 운영체제의 간단 버전입니다.
이미지는 컨테이너에 로드하는 소프트웨어를 말합니다.

<!--
## Create the Node.js app

First, create a new directory where all the files would live. In this directory
create a `package.json` file that describes your app and its dependencies:

```json
{
  "name": "docker_web_app",
  "version": "1.0.0",
  "description": "Node.js on Docker",
  "author": "First Last <first.last@example.com>",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.16.1"
  }
}
```
-->

## Node.js 앱 생성

우선, 모든 파일을 넣은 새로운 디렉터리를 만들겠습니다. 이 디렉터리 안에 애플리케이션과 의존성을
알려주는 `package.json` 파일을 생성하겠습니다.

```json
{
  "name": "docker_web_app",
  "version": "1.0.0",
  "description": "Node.js on Docker",
  "author": "First Last <first.last@example.com>",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.16.1"
  }
}
```

<!--
With your new `package.json` file, run `npm install`. If you are using `npm`
version 5 or later, this will generate a `package-lock.json` file which will be copied
to your Docker image.

Then, create a `server.js` file that defines a web app using the
[Express.js](https://expressjs.com/) framework:

```javascript
'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
```

In the next steps, we'll look at how you can run this app inside a Docker
container using the official Docker image. First, you'll need to build a Docker
image of your app.
-->

`package.json` 파일을 만든 후, `npm install`을 실행하세요. 버전 5 이상의 `npm`을
사용한다면, Docker 이미지에 복사할 `package-lock.json` 파일을 `npm`에서 생성할 것입니다.

이제 [Express.js](https://expressjs.com/) 프레임워크로 웹앱을 정의하는 `server.js`를 만들겠습니다.

```javascript
'use strict';

const express = require('express');

// 상수
const PORT = 8080;
const HOST = '0.0.0.0';

// 앱
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
```

다음 단계에서 공식 Docker 이미지를 사용해서 Docker 컨테이너 안에서 이 앱을 실행하는 방법을
살펴보겠습니다. 먼저 앱의 Docker 이미지를 만들어야 합니다.

<!--
## Creating a Dockerfile

Create an empty file called `Dockerfile`:

```markup
touch Dockerfile
```

Open the `Dockerfile` in your favorite text editor

The first thing we need to do is define from what image we want to build from.
Here we will use the latest LTS (long term support) version `10` of `node`
available from the [Docker Hub](https://hub.docker.com/):

```docker
FROM node:10
```
-->

## Dockerfile 생성

`Dockerfile`이라는 빈 파일을 생성합니다.

```markup
touch Dockerfile
```

선호하는 텍스트 에디터로 `Dockerfile`을 엽니다.

가장 먼저 해야 할 것은 어떤 이미지를 사용해서 빌드할 것인지를 정의하는 것입니다. 여기서는
[Docker Hub](https://hub.docker.com/)에 있는
`node`의 최신 LTS(장기 지원) 버전인 `10`을 사용할 것입니다.

```docker
FROM node:10
```

<!--
Next we create a directory to hold the application code inside the image, this
will be the working directory for your application:

```docker
# Create app directory
WORKDIR /usr/src/app
```

This image comes with Node.js and NPM already installed so the next thing we
need to do is to install your app dependencies using the `npm` binary. Please
note that if you are using `npm` version 4 or earlier a `package-lock.json`
file will *not* be generated.

```docker
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
```
-->

다음으로 이미지 안에 애플리케이션 코드를 넣기 위해 디렉터리를 생성할 것입니다.
이 디렉터리가 애플리케이션의 작업 디렉터리가 됩니다.

```docker
# 앱 디렉터리 생성
WORKDIR /usr/src/app
```

이 이미지에는 이미 Node.js와 NPM이 설치되어 있으므로 `npm` 바이너리로
앱의 의존성을 설치하기만 하면 됩니다. 버전 4 이하의 `npm`은 `package-lock.json`
파일을 생성하지 *않을* 것입니다.

```docker
# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY package*.json ./

RUN npm install
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production
```

<!--
Note that, rather than copying the entire working directory, we are only copying
the `package.json` file. This allows us to take advantage of cached Docker
layers. bitJudo has a good explanation of this
[here](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/).
Furthermore, the `npm ci` command, specified in the comments, helps provide faster, reliable, reproducible builds for production environments.
You can read more about this [here](https://blog.npmjs.org/post/171556855892/introducing-npm-ci-for-faster-more-reliable).

To bundle your app's source code inside the Docker image, use the `COPY`
instruction:

```docker
# Bundle app source
COPY . .
```

Your app binds to port `8080` so you'll use the `EXPOSE` instruction to have it
mapped by the `docker` daemon:

```docker
EXPOSE 8080
```
-->

작업 디렉터리 전체가 아닌 `package.json` 파일만을 복사하고 있는데, 이는 캐시된
Docker 레이어의 장점을 활용하기 위함입니다. bitJudo가 이에 대해
[여기](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/)에
잘 설명해 두었습니다. 추가로, 주석에 언급된 `npm ci` 커맨드는 프로덕션 환경을
위한 더 빠르고, 신뢰할 수 있고, 재현 가능한 빌드를 제공합니다. 이에 대해
[여기](https://blog.npmjs.org/post/171556855892/introducing-npm-ci-for-faster-more-reliable)에서
자세히 알아볼 수 있습니다.

Docker 이미지 안에 앱의 소스코드를 넣기 위해 `COPY` 지시어를 사용합니다.

```docker
# 앱 소스 추가
COPY . .
```

앱이 `8080`포트에 바인딩 되어 있으므로 `EXPOSE` 지시어를 사용해서 `docker` 데몬에 매핑합니다.

```docker
EXPOSE 8080
```

<!--
Last but not least, define the command to run your app using `CMD` which defines
your runtime. Here we will use `node server.js` to start your server:

```docker
CMD [ "node", "server.js" ]
```

Your `Dockerfile` should now look like this:

```docker
FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
```
-->

마지막으로 런타임을 정의하는 `CMD`로 앱을 실행하는 중요 명령어를 정의해야 합니다.
여기서는 서버를 구동하도록 `node server.js`을 실행하는 기본 `npm start`을 사용할 것입니다.

```docker
CMD [ "node", "server.js" ]
```

`Dockerfile`은 다음과 같아야 합니다.

```docker
FROM node:10

# 앱 디렉터리 생성
WORKDIR /usr/src/app

# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY package*.json ./

RUN npm install
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production

# 앱 소스 추가
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
```

<!--
## .dockerignore file

Create a `.dockerignore` file in the same directory as your `Dockerfile`
with following content:

```
node_modules
npm-debug.log
```

This will prevent your local modules and debug logs from being copied onto your
Docker image and possibly overwriting modules installed within your image.
-->

## .dockerignore 파일

`Dockerfile`과 같은 디렉터리에 `.dockerignore` 파일을 다음 내용으로 만드세요.

```
node_modules
npm-debug.log
```

이는 Docker 이미지에 로컬 모듈과 디버깅 로그를 복사하는 것을 막아서 이미지 내에서
설치한 모듈을 덮어쓰지 않게 합니다.

<!--
## Building your image

Go to the directory that has your `Dockerfile` and run the following command to
build the Docker image. The `-t` flag lets you tag your image so it's easier to
find later using the `docker images` command:

```bash
docker build -t <your username>/node-web-app .
```

Your image will now be listed by Docker:

```bash
$ docker images

# Example
REPOSITORY                      TAG        ID              CREATED
node                            8          1934b0b038d1    5 days ago
<your username>/node-web-app    latest     d64d3505b0d2    1 minute ago
```
-->

## 이미지 빌드

작성한 `Dockerfile`이 있는 디렉터리로 가서 Docker 이미지를 빌드하는 다음 명령어를 실행하세요.
`-t` 플래그로 이미지에 태그를 추가할 수 있어 나중에 `docker images` 명령어로
쉽게 찾을 수 있습니다.

```bash
docker build -t <your username>/node-web-app .
```

Docker가 당신이 빌드한 이미지를 보여줄 것입니다.

```bash
$ docker images

# 예시
REPOSITORY                      TAG        ID              CREATED
node                            8          1934b0b038d1    5 days ago
<your username>/node-web-app    latest     d64d3505b0d2    1 minute ago
```

<!--
## Run the image

Running your image with `-d` runs the container in detached mode, leaving the
container running in the background. The `-p` flag redirects a public port to a
private port inside the container. Run the image you previously built:

```bash
docker run -p 49160:8080 -d <your username>/node-web-app
```

Print the output of your app:

```bash
# Get container ID
$ docker ps

# Print app output
$ docker logs <container id>

# Example
Running on http://localhost:8080
```

If you need to go inside the container you can use the `exec` command:

```bash
# Enter the container
$ docker exec -it <container id> /bin/bash
```
-->

## 이미지 실행

`-d`로 이미지를 실행하면 분리 모드로 컨테이너를 실행해서 백그라운드에서 컨테이너가 돌아가도록 합니다.
`-p` 플래그는 공개 포트를 컨테이너 내의 비공개 포트로 리다이렉트합니다. 앞에서 만든 이미지를 실행하세요.

```bash
docker run -p 49160:8080 -d <your username>/node-web-app
```

앱의 로그를 출력하세요.

```bash
# 컨테이너 아이디를 확인합니다
$ docker ps

# 앱 로그를 출력합니다
$ docker logs <container id>

# 예시
Running on http://localhost:8080
```

컨테이너 안에 들어가 봐야 한다면 `exec` 명령어를 사용할 수 있습니다.

```bash
# 컨테이너에 들어갑니다
$ docker exec -it <container id> /bin/bash
```

<!--
## Test

To test your app, get the port of your app that Docker mapped:

```bash
$ docker ps

# Example
ID            IMAGE                                COMMAND    ...   PORTS
ecce33b30ebf  <your username>/node-web-app:latest  npm start  ...   49160->8080
```

In the example above, Docker mapped the `8080` port inside of the container to
the port `49160` on your machine.

Now you can call your app using `curl` (install if needed via: `sudo apt-get
install curl`):

```bash
$ curl -i localhost:49160

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 12
ETag: W/"c-M6tWOb/Y57lesdjQuHeB1P/qTV0"
Date: Mon, 13 Nov 2017 20:53:59 GMT
Connection: keep-alive

Hello world
```
-->

## 테스트

앱을 테스트하려면 Docker 매핑된 앱 포트를 확인합니다.

```bash
$ docker ps

# 예시
ID            IMAGE                                COMMAND    ...   PORTS
ecce33b30ebf  <your username>/node-web-app:latest  npm start  ...   49160->8080
```

위 예시에서 Docker가 컨테이너 내의 `8080` 포트를 머신의 `49160` 포트로 매핑했습니다.

이제 `curl`로 앱을 호출할 수 있습니다.(필요하다면 `sudo apt-get install curl`로 설치하세요.)

```bash
$ curl -i localhost:49160

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 12
ETag: W/"c-M6tWOb/Y57lesdjQuHeB1P/qTV0"
Date: Mon, 13 Nov 2017 20:53:59 GMT
Connection: keep-alive

Hello world
```

<!--
We hope this tutorial helped you get up and running a simple Node.js application
on Docker.

You can find more information about Docker and Node.js on Docker in the
following places:

* [Official Node.js Docker Image](https://hub.docker.com/_/node/)
* [Node.js Docker Best Practices Guide](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)
* [Official Docker documentation](https://docs.docker.com/)
* [Docker Tag on Stack Overflow](https://stackoverflow.com/questions/tagged/docker)
* [Docker Subreddit](https://reddit.com/r/docker)
-->

간단한 Node.js 애플리케이션을 Docker로 실행하는데 이 튜토리얼이 도움되었길 바랍니다.

다음 링크에서 Docker와 Docker에서의 Node.js에 대한 정보를 더 자세히 볼 수 있습니다.

* [공식 Node.js Docker 이미지](https://hub.docker.com/_/node/)
* [Node.js Docker 사용사례 문서](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)
* [공식 Docker 문서](https://docs.docker.com/)
* [Stack Overflow에 Docker 태그로 올라온 질문](https://stackoverflow.com/questions/tagged/docker)
* [Docker 레딧](https://reddit.com/r/docker)
