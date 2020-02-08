---
title: Como eu leio arquivos no Node.js?
date: '2011-08-26T10:08:50.000Z'
tags:
  - filesystem
difficulty: 2
layout: knowledge-post.hbs
---

Ler o conteúdo de um arquivo na memória é uma tarefa muito comum na programação, e, como em muitas outras coisas, a API principal do Node.js fornece métodos para tornar isso trivial. Há uma variedade de métodos do sistema de arquivos, todos contidos no módulo `fs`. O modo mais fácil de ler todo o conteúdo de um arquivo é com `fs.readFile`, como segue:

```javascript
fs = require('fs');
fs.readFile(file, [encoding], [callback]);

// file = (string) caminho do arquivo a ser lido
```

`encoding` é um parâmetro opcional que especifica o tipo de codificação para ler o arquivo. As codificações possíveis são 'ascii', 'utf8' e 'base64'. Se nenhuma codificação for fornecida, o valor padrão é `null`.

`callback` é uma função que será chamada quando um arquivo tiver sido lido e o conteúdo estiver pronto - são passados dois argumentos, `err` e `data`. Se não houver erros, `err` será `null` e `data` conterá o conteúdo do arquivo; caso contrário `err` irá conter a mensagem de erro.

Então, se nós quisermos ler o arquivo `/etc/hosts` e imprimí-lo no stdout (como o `cat` no Unix):

```javascript
fs = require('fs')
fs.readFile('/etc/hosts', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});
```

O conteúdo do `/etc/hosts` deve estar visível para você agora, desde que você tenha permissão para ler o arquivo em primeiro lugar.

Vamos agora dar uma olhada em um exemplo do que acontece quando você tenta ler um arquivo inválido - o exemplo mais fácil é um arquivo que não existe.

```javascript
fs = require('fs');
fs.readFile('/doesnt/exist', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});
```

Esta é a saída:

```
{ stack: [Getter/Setter],
  arguments: undefined,
  type: undefined,
  message: 'ENOENT, No such file or directory \'/doesnt/exist\'',
  errno: 2,
  code: 'ENOENT',
  path: '/doesnt/exist' }
```

Este é um [Error object](/pt-br/knowledge/errors/what-is-the-error-object/) básico do Node.js - muitas vezes pode ser útil logar diretamente `err.stack`, uma vez que ele contém uma stack trace para o local no código em que o objeto Error foi criado.
