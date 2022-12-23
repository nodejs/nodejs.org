---
title: Como usar o fs.createWriteStream?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - streams
  - fs
difficulty: 3
layout: knowledge-post.hbs
---

A função `fs.createWriteStream()` cria um fluxo corrente de uma maneira muito simples. Depois de chamar a função `fs.createWriteStream` com o caminho da pasta, você tem um fluxo corrente. Os objetos de respostas (assim como a solicitação) são fluxos. Então vamos transmitir os dados `POST` para o arquivo `output`. Como o código é simples, é muito fácil lê-lo e comentar por que cada linha é necessária.

```javascript
var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
  // Isso abre o fluxo corrente para `output`
  var writeStream = fs.createWriteStream('./output');

  // O pipe leva os dados POST para o arquivo
  req.pipe(writeStream);

  // Depois de todos os dados serem salvos, responde com um simples formulário html para que eles possam postar mais dados
  req.on('end', function () {
    res.writeHead(200, {"content-type":"text/html"});
    res.end('<form method="POST"><input name="test" /><input type="submit"></form>');
  });

  // Caso algum erro ocorra
  writeStream.on('error', function (err) {
    console.log(err);
  });
}).listen(8080);
```
