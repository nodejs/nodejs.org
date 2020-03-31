---
title: Como eu crio um servidor HTTP?
date: '2011-08-26T10:08:50.000Z'
tags:
  - http
difficulty: 1
layout: knowledge-post.hbs
---

Fazer um pequeno servidor HTTP no Node.js tornou-se o 'Olá Mundo!' padrão para a plataforma. Por um lado, o Node.js fornece APIs HTTP extremamente fáceis de usar; por outro lado, um servidor web simples também serve como uma excelente demonstração dos pontos fortes assíncronos do Node.

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

Salve este script em um arquivo chamado `server.js` - execute a linha de comando `node server.js`, o seu programa ficará em espera... está aguardando por conexões para responder, então você terá que dar uma conexão se quiser ver o programa fazer alguma coisa. Tente abrir um navegador e digite `localhost:8080` na barra de endereços. Se você configurou tudo corretamente, você deverá ver o seu servidor dizendo hello!

Além disso, no seu terminal, você poderá obter a resposta usando curl:

```
curl localhost:8080
```

Vamos dar uma olhada mais aprofundada no que o código acima está fazendo. Primeiro, a função é definida como `requestListener` que recebe um objeto da requisição e um objeto da resposta como parâmetros.

O objeto da requisição contém itens como a URL solicitada, mas neste exemplo estamos ignorando isso e retornando sempre "Hello World".

O objeto da resposta é como nós enviamos `headers` e `contents` na resposta de volta ao usuário que solicitou a requisição. Aqui retornamos um código de resposta 200 (sinalizando uma resposta bem-sucedida) com o `body` "Hello World". Outros `headers`, como o `Content-type`, também poderiam ser definidos aqui.

A seguir, o método `http.createServer` cria um servidor que executa a função `requestListener` sempre que recebe uma nova requisição. A próxima linha `server.listen(8080)`, executa o método `listen` o que nesse caso faz com que o servidor aguarde por novas requisições na porta especificada - 8080.

Pronto - agora você tem um servidor básico HTTP Node.js.
