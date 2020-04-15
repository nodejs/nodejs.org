---
title: Como eu crio um servidor HTTP?
date: '2011-08-26T10:08:50.000Z'
tags:
  - http
difficulty: 1
layout: knowledge-post.hbs
---

<!-- Making a simple HTTP server in Node.js has become the de facto 'hello world' for the platform.  On the one hand, Node.js provides extremely easy-to-use HTTP APIs; on the other hand, a simple web server also serves as an excellent demonstration of Node's asynchronous strengths. -->

Fazer um pequeno servidor HTTP no Node.js tornou-se o 'Olá Mundo!' padrão para a plataforma. Por um lado, o Node.js fornece APIs HTTP extremamente fáceis de usar; por outro lado, um servidor web simples também serve como uma excelente demonstração dos pontos fortes assíncronos do Node.

<!-- Let's take a look at a very simple example: -->

Vamos dar uma olhada em um exemplo muito simples:

```javascript
const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(8080);
```

<!-- Save this in a file called `server.js` - run `node server.js`, and your program will hang there... it's waiting for connections to respond to, so you'll have to give it one if you want to see it do anything.  Try opening up a browser, and typing `localhost:8080` into the location bar.  If everything has been set up correctly, you should see your server saying hello! -->

Salve este script em um arquivo chamado `server.js` - execute a linha de comando `node server.js`, o seu programa ficará em espera... está aguardando por conexões para responder, então você terá que dar uma conexão se quiser ver o programa fazer alguma coisa. Tente abrir um navegador e digite `localhost:8080` na barra de endereços. Se você configurou tudo corretamente, você deverá ver o seu servidor dizendo hello!

<!-- Also, from your terminal you should be able to get the response using curl: -->

Além disso, no seu terminal, você poderá obter a resposta usando curl:

```
curl localhost:8080
```

<!-- Let's take a more in-depth look at what the above code is doing.  First, a function is defined called `requestListener` that takes a request object and a response object as parameters. -->

Vamos dar uma olhada mais aprofundada no que o código acima está fazendo. Primeiro, a função é definida como `requestListener` que recebe um objeto da requisição e um objeto da resposta como parâmetros.

<!-- The request object contains things such as the requested URL, but in this example we ignore it and always return "Hello World". -->

O objeto da requisição contém itens como a URL solicitada, mas neste exemplo estamos ignorando isso e retornando sempre "Hello World".

<!-- The response object is how we send the headers and contents of the response back to the user making the request. Here we return a 200 response code (signaling a successful response) with the body "Hello World". Other headers, such as `Content-type`, would also be set here. -->

O objeto da resposta é como nós enviamos `headers` e `contents` na resposta de volta ao usuário que solicitou a requisição. Aqui retornamos um código de resposta 200 (sinalizando uma resposta bem-sucedida) com o `body` "Hello World". Outros `headers`, como o `Content-type`, também poderiam ser definidos aqui.

<!-- Next, the `http.createServer` method creates a server that calls `requestListener` whenever a request comes in. The next line, `server.listen(8080)`, calls the `listen` method, which causes the server to wait for incoming requests on the specified port - 8080, in this case. -->

A seguir, o método `http.createServer` cria um servidor que executa a função `requestListener` sempre que recebe uma nova requisição. A próxima linha `server.listen(8080)`, executa o método `listen` o que nesse caso faz com que o servidor aguarde por novas requisições na porta especificada - 8080.

<!-- There you have it - your most basic Node.js HTTP server. -->

Pronto - agora você tem um servidor básico HTTP Node.js.
