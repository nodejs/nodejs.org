---
title: Dockerizando uma aplicação web com Node.js
layout: docs.hbs
---

# Dockerizando uma aplicação web com Node.js

O objetivo deste exemplo é mostrar como obter um aplicativo Node.js em um 
contêiner do Docker. O guia é destinado ao desenvolvimento e não a uma 
implantação de produção. O guia também pressupõe que você tenha uma 
[instalação do Docker](https://docs.docker.com/engine/installation/) 
funcionando e um entendimento básico de como um aplicativo Node.js
é estruturado.

Na primeira parte deste guia, criaremos um aplicativo Web simples no Node.js,
criaremos uma imagem do Docker para esse aplicativo e, por último, instanciaremos
um contêiner a partir dessa imagem.

O Docker permite que você empacote um aplicativo com seu ambiente e todas as suas
dependências em uma "caixa", chamada de contêiner. Geralmente, um contêiner consiste
em um aplicativo em execução em uma versão simplificada de um sistema operacional Linux.
Uma imagem é o modelo de um contêiner, um contêiner é uma instância em execução de uma imagem.

## Crie um aplicativo Node.js

Primeiro, crie um novo diretório onde todos os arquivos residam. Nesse diretório,
crie um arquivo `package.json` que descreva seu aplicativo e suas dependências:

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

Com seu novo arquivo `package.json`, rode `npm install`. Se você estiver uzando a versão 
do `npm` 5 ou posterior, isso gerará um `package-lock.json` e o arquivo sera copiado para
sua imagem Docker

Em seguida, crie um arquivo server.js que define um aplicativo Web usando
o framework [Express.js](https://expressjs.com/):

```javascript
'use strict';

const express = require('express');

// Constantes
const PORT = 8080;
const HOST = '0.0.0.0';

// Aplicação
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
```

Nas próximas etapas, veremos como você pode executar esse aplicativo
dentro de um contêiner do Docker usando a imagem oficial do Docker.
Primeiro, você precisará criar uma imagem do Docker do seu aplicativo.

## Criando um arquivo Docker

Crie um arquivo vazio chamado `Dockerfile`:

```markup
touch Dockerfile
```

Abra o `Dockerfile` em seu editor texto favorito

A primeira coisa que precisamos fazer é definir a partir de qual imagem
queremos construir. Aqui vamos usar a versão mais recente LTS 
(apoio a longo prazo) `12` do `node` disponível a partir do [Docker Hub](https://hub.docker.com/):

```docker
FROM node:12
```

Em seguida, criamos um diretório para armazenar o código do aplicativo dentro
da imagem; este será o workspace do seu aplicativo:

```docker
# Crie o diretorio da aplicação
WORKDIR /usr/src/app
```

Essa imagem vem com o Node.js e o NPM já instalados, portanto, a próxima coisa que
precisamos fazer é instalar as dependências do aplicativo usando o binário do `npm`.
Observe que, se você estiver usando a  versão 4 ou anterior do npm, o arquivo `package-lock.json` não será gerado.

```docker
# Instale as dependencias do app
# Um curinga é usado para garantir que o package.json e o package-lock.json sejam copiados
# disponível no (npm@5+)
COPY package*.json ./

RUN npm install
# Se você estiver criando seu código para produção
# RUN npm ci --only=production
```

Observe que, em vez de copiar todo o diretório ativo, estamos apenas copiando o
arquivo `package.json`. Isso nos permite tirar proveito das camadas do Docker em
cache. O bitJudo tem uma boa explicação sobre isso 
[aqui](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/).
Além disso, o comando `npm ci`, especificado nos comentários, ajuda a fornecer builds mais
rápidas, confiáveis e reproduzíveis para ambientes de produção. Você pode
ler mais sobre isso [aqui](https://blog.npmjs.org/post/171556855892/introducing-npm-ci-for-faster-more-reliable).

Para agrupar o código-fonte do seu aplicativo na imagem do Docker, use a instrução `COPY`:

```docker
# Agrupe o código-fonte
COPY . .
```

Seu aplicativo se liga à porta, `8080` para que você use as instruções `EXPOSE`
para que ele seja mapeado pelo `docker` daemon:

```docker
EXPOSE 8080
```
Por último, mas não menos importante, defina o comando para executar seu 
aplicativo usando o `CMD` que define seu tempo de execução. Aqui usaremos 
`node server.js` para iniciar seu servidor:

```docker
CMD [ "node", "server.js" ]
```

Agora seu Dockerfile deve ter esta aparência:

```docker
FROM node:12

# Crie o diretorio da aplicação
WORKDIR /usr/src/app

# Instale as dependencias do app
# Um curinga é usado para garantir que o package.json e o package-lock.json sejam copiados
# disponível no (npm@5+)
COPY package*.json ./

RUN npm install
# Se você estiver criando seu código para produção
# RUN npm ci --only=production

# Agrupe o código-fonte
COPY . .

EXPOSE 8080
CMD [ "node", "server.js" ]
```

## Arquivo .dockerignore

Crie um arquivo `.dockerignore` no mesmo diretorio que seu `Dockerfile`
o seguinte conteúdo:

```
node_modules
npm-debug.log
```

Isso impedirá que os módulos locais e os logs de depuração sejam copiados para a imagem do Docker e possivelmente
substituam os módulos instalados na imagem.

## Construindo sua imagem

Vá para o diretório que possui o seu `Dockerfile` e execute o seguinte comando para criar a imagem 
do Docker. O sinalizador `-t` permite marcar sua imagem para facilitar a localização posterior, usando o 
comando `docker images`:

```bash
docker build -t <your-username>/node-web-app .
```

Sua imagem agora será listada pelo Docker:

```bash
$ docker images

# Example
REPOSITORY                      TAG        ID              CREATED
node                            12         1934b0b038d1    5 days ago
<your username>/node-web-app    latest     d64d3505b0d2    1 minute ago
```

## Execute a imagem

A execução de sua imagem `-d` executa o contêiner no modo desanexado, deixando o contêiner em execução em segundo plano.
O sinalizador -p redireciona uma porta pública para uma porta privada dentro do contêiner. Execute a imagem que você
criou anteriormente:

```bash
docker run -p 49160:8080 -d <your username>/node-web-app
```

Imprima a saída do seu aplicativo:

```bash
# Obtenha o id do container
$ docker ps

# Mostre a saída do aplicativo
$ docker logs <container id>

# Exemplo
Running on http://localhost:8080
```

Se você precisar entrar no container, poderá usar o comando `exec`:

```bash
# Entrar no container
$ docker exec -it <container id> /bin/bash
```

## Teste

Para testar seu aplicativo, obtenha a porta do aplicativo que o Docker mapeou:

```bash
$ docker ps

# Exemplo
ID            IMAGE                                COMMAND    ...   PORTS
ecce33b30ebf  <your username>/node-web-app:latest  npm start  ...   49160->8080
```

No exemplo acima, o Docker mapeou a porta `8080` dentro do contêiner para a porta `49160` da sua máquina.

Agora você pode ligar para seu aplicativo usando `curl` (instale, se necessário, via: `sudo apt-get install curl`):

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

Esperamos que este tutorial tenha ajudado a instalar e executar um aplicativo Node.j simples no Docker.

Você pode encontrar mais informações sobre o Docker e o Node.js no Docker (em inglês) nos seguintes locais:

* [Official Node.js Docker Image](https://hub.docker.com/_/node/)
* [Node.js Docker Best Practices Guide](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)
* [Official Docker documentation](https://docs.docker.com/)
* [Docker Tag on Stack Overflow](https://stackoverflow.com/questions/tagged/docker)
* [Docker Subreddit](https://reddit.com/r/docker)
