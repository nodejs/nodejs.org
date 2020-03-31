---
layout: about.hbs
title: Sobre
trademark: Trademark
---

# Sobre Node.js®

As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications. In the following "hello world" example, many connections can be handled concurrently. Upon each connection, the callback is fired, but if there is no work to be done, Node.js will sleep.

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Como um ambiente de execução JavaScript assíncrono orientado a eventos, o Node.js é projetado para desenvolvimento de aplicações escaláveis de rede. No exemplo a seguir, diversas conexões podem ser controladas ao mesmo tempo. Em cada conexão a função de _callback_ é chamada. Mas, se não houver trabalho a ser realizado, o Node.js ficará inativo.

If some of this language is unfamiliar, there is a full article on [Blocking vs. Non-Blocking](/en/docs/guides/blocking-vs-non-blocking/).

---

Essa é uma alternativa que contrasta com o modelo de concorrência mais comum, onde são utilizadas _threads_ do SO. Aplicações de rede baseadas em _threads_ são relativamente ineficientes e difíceis de usar. Além disso, os usuários do Node.js não precisam se preocupar com _deadlock_ de processos, pois não existem _locks_. Quase nenhuma função no Node.js realiza diretamente operações de E/S, por essa razão o processo nunca bloqueia. Por não existirem operações bloqueantes, sistemas escaláveis são razoavelmente fáceis de serem desenvolvidos em Node.js.

Se algum desses conceitos não é familiar, dê uma olhada no artigo [Blocking vs Non-Blocking](/en/docs/guides/blocking-vs-non-blocking/).

Node.js é semelhante no projeto, e influenciado por sistemas como [Event Machine](https://github.com/eventmachine/eventmachine) do Ruby ou [Twisted](https://twistedmatrix.com/trac/) do Python. Porém, leva o modelo de eventos um pouco mais além. No Node.js o _[event loop](/en/docs/guides/event-loop-timers-and-nexttick/)_ é exposto como uma parte do ambiente de execução ao invés de uma biblioteca. Em outros sistemas há sempre uma chamada bloqueante para iniciar o _event-loop_. Tipicamente o comportamento esperado é definido através de _callbacks_ no início do _script_, e no final um servidor é iniciado por uma chamada bloqueante como por exemplo `EventMachine::run()`.
