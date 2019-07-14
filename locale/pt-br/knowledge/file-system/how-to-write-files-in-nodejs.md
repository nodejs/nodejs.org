---
title: Como eu escrevo arquivos no node.js?
date: '2011-08-26T10:08:50.000Z'
tags:
  - filesystem
difficulty: 2
layout: knowledge-post.hbs
---

Escrever em um arquivo é outra das tarefas básicas da programação que um desenvolvedor normalmente precisa conhecer - por sorte, esta tarefa é muito simples no Node.js.  Nós podemos usar o conveniente método `writeFile` do módulo `fs` da biblioteca padrão, que pode economizar todo tipo de problemas e tempo.

    fs = require('fs');
    fs.writeFile(filename, data, [encoding], [callback])

`file = (string)` caminho do arquivo a ser lido

`data = (string or buffer)` os dados que você quer escrever no arquivo

`encoding = (optional string)` a codificação de `data`. Codificações possíveis são 'ascii', 'utf8', e 'base64'. Se nenhuma codificação for passada, então será assumida a 'utf8'.

`callback = (optional function (err) {})` Se não houver erro, `err === null`, se houver `err` conterá a mensagem de erro.

Então, se nós quisermos escrever "Hello World" em `helloworld.txt`:

    fs = require('fs');
    fs.writeFile('helloworld.txt', 'Hello World!', function (err) {
      if (err) return console.log(err);
      console.log('Hello World > helloworld.txt');
    });

    [contents of helloworld.txt]:
    Hello World!

Se nós propositalmente quisermos causar um erro, nós podemos tentar escrever em um arquivo que nós não temos permissão de acesso:

    fs = require('fs')
    fs.writeFile('/etc/doesntexist', 'abc', function (err,data) {
      if (err) {
        return console.log(err);
      }
      console.log(data);
    });

    { stack: [Getter/Setter],
      arguments: undefined,
      type: undefined,
      message: 'EACCES, Permission denied \'/etc/doesntexist\'',
      errno: 13,
      code: 'EACCES',
      path: '/etc/doesntexist' }
