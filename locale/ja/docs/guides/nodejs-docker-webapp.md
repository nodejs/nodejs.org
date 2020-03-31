---
title: Node.js Web アプリケーションを Docker 化する
layout: docs.hbs
---

# Node.js Web アプリケーションを Docker 化する

The goal of this example is to show you how to get a Node.js application into a Docker container. The guide is intended for development, and *not* for a production deployment. The guide also assumes you have a working [Docker installation](https://docs.docker.com/engine/installation/) and a basic understanding of how a Node.js application is structured.

この例の目的は、Node.js アプリケーションを Docker コンテナに取り込む方法を説明することです。 このガイドは開発を目的としており、 本番展開を目的と*していません*。 このガイドでは、正常に [Docker がインストール](https://docs.docker.com/engine/installation/)され、 Node.js アプリケーションがどのように構成されているかについての基本的な知識があることも前提としています。

このガイドの最初の部分では、Node.js で単純な Web アプリケーションを作成してから、 そのアプリケーション用の Docker イメージを作成し、 最後にそのイメージをコンテナとして実行します。

## Node.js アプリケーションを作成する

Docker を使用すると、ソフトウェア開発用に、コンテナと呼ばれる標準化された単位に すべての依存関係を持つアプリケーションをパッケージ化できます。 コンテナは、Linux オペレーティングシステムの基本バージョンを削除したものです。 イメージはコンテナにロードするソフトウェアです。

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

With your new `package.json` file, run `npm install`. If you are using `npm` version 5 or later, this will generate a `package-lock.json` file which will be copied to your Docker image.

まず、すべてのファイルを配置する新しいディレクトリを作成します。 このディレクトリにあなたのアプリケーションとその依存関係を記述する `package.json` ファイルを作成してください：

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

新しい `package.json` ファイルを使って、`npm install` を実行してください。 バージョン 5 以降の `npm` を使っているなら、 これは Docker イメージにコピーされる `package-lock.json` ファイルを生成します。

## Dockerfile を作成する

それから、[Express.js](https://expressjs.com/) フレームワークを使って Web アプリケーションを定義する `server.js` ファイルを作成します。

```markup
touch Dockerfile
```

次のステップでは、公式の Docker イメージを使用して Docker コンテナ内でこのアプリケーションを実行する方法を見ていきます。 まず、アプリケーションの Docker イメージを作成する必要があります。

The first thing we need to do is define from what image we want to build from. Here we will use the latest LTS (long term support) version `10` of `node` available from the [Docker Hub](https://hub.docker.com/):

```docker
FROM node:10
```

`Dockerfile` という名前の空のファイルを作ります。

```docker
# アプリケーションディレクトリを作成する
WORKDIR /usr/src/app
```

お気に入りのテキストエディタで `Dockerfile` を開きます

```docker
# アプリケーションの依存関係をインストールする
# ワイルドカードを使用して、package.json と package-lock.json の両方が確実にコピーされるようにします。
# 可能であれば (npm@5+)
COPY package*.json ./

RUN npm install
# 本番用にコードを作成している場合
# RUN npm install --only=production
```

最初にしなければならないことは、どのイメージから構築したいかを定義することです。 ここでは[Docker Hub](https://hub.docker.com/)から入手できる `node` の最新の LTS (long term support) バージョン `10` を使います。

次に、イメージ内にアプリケーションコードを入れるディレクトリを作成します。 アプリケーションの作業ディレクトリになります。

```docker
# アプリケーションのソースをバンドルする
COPY . .
```

このイメージには Node.js と NPM が既にインストールされていますので、 次に必要な作業は `npm` バイナリを使ってアプリケーションの依存関係をインストールすることです。 `npm` バージョン 4 以前を使用している場合、 `package-lock.json` ファイルは*生成されない*ことに注意してください。

```docker
EXPOSE 8080
```

作業ディレクトリ全体をコピーするのではなく、 `package.json` ファイルだけをコピーしていることに注意してください。 これにより、キャッシュされた Docker レイヤーを利用することができます。 bitJudo は[このこと](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/)についてよく説明しています。

```docker
CMD [ "node", "server.js" ]
```

アプリケーションのソースコードを Docker イメージ内にバンドルするには、`COPY` 命令を使います。

```docker
FROM node:10

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

## .dockerignore ファイル

アプリケーションは `8080` ポートにバインドされているので `EXPOSE` 命令を使って `docker` デーモンによってマッピングされるでしょう：

```
node_modules
npm-debug.log
```

最後に重要なことを言い忘れましたが、ランタイムを定義する `CMD` を使ってアプリケーションを実行するためのコマンドを定義してください。 ここでサーバを起動するために `node server.js` を実行する 基本的な `npm start` を使います：

## 自分のイメージを構築する

`Dockerfile` はこのようになっているはずです。

```bash
docker build -t <your username>/node-web-app .
```

Your image will now be listed by Docker:

```bash
$ docker images

# 例
REPOSITORY                      TAG        ID              CREATED
node                            8          1934b0b038d1    5 days ago
<your username>/node-web-app    latest     d64d3505b0d2    1 minute ago
```

## イメージの実行

以下の内容で `Dockerfile` と同じディレクトリに `.dockerignore` ファイルを 作成してください：

```bash
docker run -p 49160:8080 -d <your username>/node-web-app
```

これにより、ローカルモジュールとデバッグログが Docker イメージにコピーされたり、 イメージ内にインストールされているモジュールが上書きされたりするのを防ぐことができます。

```bash
# コンテナ ID を取得する
$ docker ps

# アプリ出力をプリントする
$ docker logs <container id>

# 例
Running on http://localhost:8080
```

If you need to go inside the container you can use the `exec` command:

```bash
# コンテナに入る
$ docker exec -it <container id> /bin/bash
```

## テスト

`Dockerfile` があるディレクトリに行き、次のコマンドを実行して Docker イメージを構築してください。 `-t` フラグを使うとイメージにタグを付けることができるので、 後で `docker images` コマンドを使って見つけやすくなります。

```bash
$ docker ps

# 例
ID            IMAGE                                COMMAND    ...   PORTS
ecce33b30ebf  <your username>/node-web-app:latest  npm start  ...   49160->8080
```

あなたのイメージは Docker によって表示されます。

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

イメージを `-d` で実行するとコンテナは分離モードで実行され、バックグラウンドで実行されたままになります。 `-p` フラグはパブリックポートをコンテナ内のプライベートポートにリダイレクトします。 以前に構築したイメージを実行します。

アプリの出力をプリントします。

* [公式 Node.js Docker イメージ](https://hub.docker.com/_/node/)
* [Node.js Docker ベストプラクティスガイド](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)
* [公式 Docker ドキュメント](https://docs.docker.com/)
* [Docker Tag on Stack Overflow](https://stackoverflow.com/questions/tagged/docker)
* [Docker Subreddit](https://reddit.com/r/docker)
