---
title: Como criar e usar um REPL customizado
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - repl
difficulty: 2
layout: knowledge-post.hbs
---

O Node permite aos usuários criarem seus próprios REPLs com o [módulo `repl`](https://nodejs.org/dist/latest/docs/api/repl.html). A forma de uso mais básica se parece com isso:

```js
const repl = require('repl');

repl.start(prompt, stream);
```

No exemplo acima, o `prompt` é uma string que é usada para o prompt do seu REPL, que tem por padrão o "> ". `stream` é um stream que o repl escuta e tem por padrão o `process.stdin`. Quando você executa o comando `node` pelo prompt de comando, o que ele faz nos bastidores é executar `repl.start()` para fornecer o REPL padrão.

Entretanto, o repl é bem flexível. Abaixo segue um exemplo que demonstra isso:

```js
#!/usr/bin/env node

const net = require('net');
const repl = require('repl');

const mood = function () {
  const m = ['^__^', '-___-;', '>.<', '<_>'];
  return m[Math.floor(Math.random() * m.length)];
};

// Aqui um exemplo de um repl remoto que você pode fazer uma conexão telnet!
net
  .createServer(function (socket) {
    const remote = repl.start('node::remote> ', socket);
    // Adicionando "mood" e "bonus" para o contexto remoto do REPL.
    remote.context.mood = mood;
    remote.context.bonus = 'DESBLOQUEADO';
  })
  .listen(5001);

console.log('REPL remoto iniciou na porta 5001.');

// Aqui temos um nó do repl "local" com um prompt customizado
const local = repl.start('node::local> ');

// Expondo a função "mood" para o contexto local do REPL.
local.context.mood = mood;
```

Este script cria *dois* REPLs: Um é normal, exceto pelo prompt customizado. Porém o *outro* é exposto através do módulo net de forma que se possa fazer a conexão telnet para ele! Além disso, ele usa a propriedade `context` para expor a função "mood" para os dois REPLs, e a string "bonus" apenas para o REPL remoto. Como você verá, essa forma de tentar expor objetos em um REPL e não no outro *não funciona*.

Além disso, todos os objetos no escopo global também serão acessíveis para os seus REPLs.

Aqui é o que acontece quando você executa o script:

```shell
$ node repl.js
REPL remoto iniciou na porta 5001.
node::local> .exit
# <ctrl>-C

$ node repl.js
REPL remoto iniciou na porta 5001.
node::local> mood()
'^__^'
node::local> bonus
ReferenceError: bonus is not defined
```

Como podem notar, a função `mood` é usada junto do REPL local. Mas a string `bonus` não. Isso é esperado.

Observem agora o que acontece quando fazemos um telnet para a porta 5001:

```shell
$ telnet localhost 5001
Trying ::1...
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
node::remote> mood()
'>.<'
node::remote> bonus
'DESBLOQUEADO'
```

Como você pode ver, a função `mood` *também* é disponibilizada através da telnet! Além disso `bonus` também é.

Outro ponto interessante das minhas ações é que bonus agora também é definida no REPL local:

```shell
node::local> bonus
'DESBLOQUEADO'
```

Parece que nós "desbloqueamos" a string `bonus` no REPL local também. Como parece ser, quaisquer variáveis criadas em um REPL também estão disponíveis no outro:

```shell
node::local> var node = "INCRÍVEL!"

node::remote> node
'INCRÍVEL!'
```

Como você pode ver, o REPL do node é poderoso e flexível.
