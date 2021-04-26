---
title: Node.js Web アプリケーションを Docker 化する
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
# Node.js Web アプリケーションを Docker 化する

この例の目的は、Node.js アプリケーションを Docker コンテナに取り込む方法を説明することです。
このガイドは開発を目的としており、
本番展開を目的と*していません*。
このガイドでは、正常に [Docker がインストール](https://docs.docker.com/engine/installation/)され、
Node.js アプリケーションがどのように構成されているかについての基本的な知識があることも前提としています。

このガイドの最初の部分では、Node.js で単純な Web アプリケーションを作成してから、
そのアプリケーション用の Docker イメージを作成し、
最後にそのイメージをコンテナとして実行します。

Docker を使用すると、ソフトウェア開発用に、コンテナと呼ばれる標準化された単位に
すべての依存関係を持つアプリケーションをパッケージ化できます。
コンテナは、Linux オペレーティングシステムの基本バージョンを削除したものです。
イメージはコンテナにロードするソフトウェアです。

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
## Node.js アプリケーションを作成する

まず、すべてのファイルを配置する新しいディレクトリを作成します。
このディレクトリにあなたのアプリケーションとその依存関係を記述する `package.json` ファイルを作成してください：

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

新しい `package.json` ファイルを使って、`npm install` を実行してください。
バージョン 5 以降の `npm` を使っているなら、
これは Docker イメージにコピーされる `package-lock.json` ファイルを生成します。

それから、[Express.js](https://expressjs.com/) フレームワークを使って
Web アプリケーションを定義する `server.js` ファイルを作成します。

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

次のステップでは、公式の Docker イメージを使用して
Docker コンテナ内でこのアプリケーションを実行する方法を見ていきます。
まず、アプリケーションの Docker イメージを作成する必要があります。

<!--
## Creating a Dockerfile

Create an empty file called `Dockerfile`:

```markup
touch Dockerfile
```

Open the `Dockerfile` in your favorite text editor

The first thing we need to do is define from what image we want to build from.
Here we will use the latest LTS (long term support) version `12` of `node`
available from the [Docker Hub](https://hub.docker.com/):

```docker
FROM node:12
```

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
# RUN npm install --only=production
```

Note that, rather than copying the entire working directory, we are only copying
the `package.json` file. This allows us to take advantage of cached Docker
layers. bitJudo has a good explanation of this
[here](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/).

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

Last but not least, define the command to run your app using `CMD` which defines
your runtime. Here we will use `node server.js` to start your server:

```docker
CMD [ "node", "server.js" ]
```

Your `Dockerfile` should now look like this:

```docker
FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
```

-->
## Dockerfile を作成する

`Dockerfile` という名前の空のファイルを作ります。

```markup
touch Dockerfile
```

お気に入りのテキストエディタで `Dockerfile` を開きます

最初にしなければならないことは、どのイメージから構築したいかを定義することです。
ここでは[Docker Hub](https://hub.docker.com/)から入手できる
`node` の最新の LTS (long term support) バージョン `12` を使います。

```docker
FROM node:12
```

次に、イメージ内にアプリケーションコードを入れるディレクトリを作成します。
アプリケーションの作業ディレクトリになります。

```docker
# アプリケーションディレクトリを作成する
WORKDIR /usr/src/app
```

このイメージには Node.js と NPM が既にインストールされていますので、
次に必要な作業は `npm` バイナリを使ってアプリケーションの依存関係をインストールすることです。
`npm` バージョン 4 以前を使用している場合、
`package-lock.json` ファイルは*生成されない*ことに注意してください。

```docker
# アプリケーションの依存関係をインストールする
# ワイルドカードを使用して、package.json と package-lock.json の両方が確実にコピーされるようにします。
# 可能であれば (npm@5+)
COPY package*.json ./

RUN npm install
# 本番用にコードを作成している場合
# RUN npm install --only=production
```

作業ディレクトリ全体をコピーするのではなく、
`package.json` ファイルだけをコピーしていることに注意してください。
これにより、キャッシュされた Docker レイヤーを利用することができます。
bitJudo は[このこと](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/)についてよく説明しています。

アプリケーションのソースコードを Docker イメージ内にバンドルするには、`COPY`
命令を使います。

```docker
# アプリケーションのソースをバンドルする
COPY . .
```

アプリケーションは `8080` ポートにバインドされているので `EXPOSE` 命令を使って
`docker` デーモンによってマッピングされるでしょう：

```docker
EXPOSE 8080
```

最後に重要なことを言い忘れましたが、ランタイムを定義する `CMD` を使ってアプリケーションを実行するためのコマンドを定義してください。
ここでサーバを起動するために `node server.js` を実行する
基本的な `npm start` を使います：

```docker
CMD [ "node", "server.js" ]
```

`Dockerfile` はこのようになっているはずです。

```docker
FROM node:12

# アプリケーションディレクトリを作成する
WORKDIR /usr/src/app

# アプリケーションの依存関係をインストールする
# ワイルドカードを使用して、package.json と package-lock.json の両方が確実にコピーされるようにします。
# 可能であれば (npm@5+)
COPY package*.json ./

RUN npm install
# 本番用にコードを作成している場合
# RUN npm install --only=production

# アプリケーションのソースをバンドルする
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
## .dockerignore ファイル

以下の内容で `Dockerfile` と同じディレクトリに `.dockerignore` ファイルを
作成してください：

```
node_modules
npm-debug.log
```

これにより、ローカルモジュールとデバッグログが Docker イメージにコピーされたり、
イメージ内にインストールされているモジュールが上書きされたりするのを防ぐことができます。

<!--
## Building your image

Go to the directory that has your `Dockerfile` and run the following command to
build the Docker image. The `-t` flag lets you tag your image so it's easier to
find later using the `docker images` command:

```bash
docker build . -t <your username>/node-web-app
```

Your image will now be listed by Docker:

```bash
$ docker images

# Example
REPOSITORY                      TAG        ID              CREATED
node                            12         1934b0b038d1    5 days ago
<your username>/node-web-app    latest     d64d3505b0d2    1 minute ago
```

-->
## 自分のイメージを構築する

`Dockerfile` があるディレクトリに行き、次のコマンドを実行して Docker イメージを構築してください。
`-t` フラグを使うとイメージにタグを付けることができるので、
後で `docker images` コマンドを使って見つけやすくなります。

```bash
docker build . -t <your username>/node-web-app
```

あなたのイメージは Docker によって表示されます。

```bash
$ docker images

# 例
REPOSITORY                      TAG        ID              CREATED
node                            12         1934b0b038d1    5 days ago
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
## イメージの実行

イメージを `-d` で実行するとコンテナは分離モードで実行され、バックグラウンドで実行されたままになります。
`-p` フラグはパブリックポートをコンテナ内のプライベートポートにリダイレクトします。
以前に構築したイメージを実行します。

```bash
docker run -p 49160:8080 -d <your username>/node-web-app
```

アプリの出力をプリントします。

```bash
# コンテナ ID を取得する
$ docker ps

# アプリ出力をプリントする
$ docker logs <container id>

# 例
Running on http://localhost:8080
```

コンテナの中に入る必要があるなら、`exec` コマンドを使うことができます。

```bash
# コンテナに入る
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
## テスト

アプリケーションをテストするには、Docker がマッピングしたアプリケーションのポートを取得します。

```bash
$ docker ps

# 例
ID            IMAGE                                COMMAND    ...   PORTS
ecce33b30ebf  <your username>/node-web-app:latest  npm start  ...   49160->8080
```

上の例では、Docker はコンテナの内側の `8080` ポートをマシンの `49160` ポートに
マッピングしました。

これで `curl` (必要ならばインストールしてください: `sudo apt-get
install curl`) を使ってアプリを呼び出すことができます：

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

このチュートリアルが、Docker 上で簡単な Node.js アプリケーションを立ち上げて実行するのに
役立つことを願います。

Docker および Docker 上の Node.js に関する詳細は、
次の場所にあります。

* [公式 Node.js Docker イメージ](https://hub.docker.com/_/node/)
* [Node.js Docker ベストプラクティスガイド](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)
* [公式 Docker ドキュメント](https://docs.docker.com/)
* [Docker Tag on Stack Overflow](https://stackoverflow.com/questions/tagged/docker)
* [Docker Subreddit](https://reddit.com/r/docker)
