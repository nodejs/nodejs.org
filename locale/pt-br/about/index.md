---
layout: about.hbs
title: Sobre
trademark: Trademark
---
# Sobre Node.js&reg;
<!--
As an asynchronous event driven JavaScript runtime, Node is designed to build
scalable network applications. In the following "hello world" example, many
connections can be handled concurrently. Upon each connection the callback is
fired, but if there is no work to be done, Node will sleep.
-->

Como um ambiente de execução Javascript assíncrono orientado a eventos, o Node
é projetado para desenvolvimento de aplicações escaláveis de rede. No exemplo a
seguir, diversas conexões podem ser controladas ao mesmo tempo. Em cada conexão
a função de _callback_ é chamada. Mas, se não houver trabalho a ser realizado,
o Node ficará inativo.

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

<!--
This is in contrast to today's more common concurrency model where OS threads
are employed. Thread-based networking is relatively inefficient and very
difficult to use. Furthermore, users of Node are free from worries of
dead-locking the process, since there are no locks. Almost no function in Node
directly performs I/O, so the process never blocks. Because nothing blocks,
scalable systems are very reasonable to develop in Node.

If some of this language is unfamiliar, there is a full article on
[Blocking vs Non-Blocking][].
-->

Essa é uma alternativa que contrasta com o modelo de concorrência mais comum, onde são
utilizadas _threads_ do SO. Aplicações de rede baseadas em _threads_ são relativamente
ineficientes e difíceis de usar. Além disso, os usuários do Node não precisam
se preocupar com _deadlock_ de processos, pois não existem _locks_. Quase nenhuma função
no Node realiza diretamente operações de E/S, por essa razão o processo nunca bloqueia.
Por não existirem operações bloqueantes, sistemas escaláveis são razoavelmente fáceis
de serem desenvolvidos em Node.

Se algum desses conceitos não é familiar, dê uma olhada no artigo [Blocking vs Non-Blocking][].

---

<!--
Node is similar in design to, and influenced by, systems like Ruby's
[Event Machine][] or Python's [Twisted][]. Node takes the event model a bit
further. It presents an [event loop][] as a runtime construct instead of as a library.
In other systems there is always a blocking call to start the event-loop.
Typically behavior is defined through callbacks at the beginning of a script
and at the end starts a server through a blocking call like
`EventMachine::run()`. In Node there is no such start-the-event-loop call. Node
simply enters the event loop after executing the input script. Node exits the
event loop when there are no more callbacks to perform. This behavior is like
browser JavaScript — the event loop is hidden from the user.
-->
Node é semelhante no projeto, e influenciado por sistemas como [Event Machine][] do Ruby
ou [Twisted][] do Python. Porém, leva o modelo de eventos um pouco mais além. No Node o _[event loop][]_
é exposto como uma parte do ambiente de execução ao invés de uma biblioteca. Em outros sistemas há
sempre uma chamada bloqueante para iniciar o _event-loop_. Tipicamente o comportamento esperado é
definido através de _callbacks_ no início do _script_, e no final um servidor é iniciado por uma
chamada bloqueante como por exemplo `EventMachine::run()`.

<!--
HTTP is a first class citizen in Node, designed with streaming and low latency
in mind. This makes Node well suited for the foundation of a web library or
framework.
-->
Em Node, HTTP é um cidadão de primeira classe, projetado para que tenha um alta
taxa de fluxo e baixa latência. Isso torna o Node uma ótima escolha para servir como base para
uma biblioteca web ou para um _framework_.

<!--
Just because Node is designed without threads, doesn't mean you cannot take
advantage of multiple cores in your environment. Child processes can be spawned
by using our [`child_process.fork()`][] API, and are designed to be easy to
communicate with. Built upon that same interface is the [`cluster`][] module,
which allows you to share sockets between processes to enable load balancing
over your cores.
-->
Embora Node seja projetado sem a utilização de _threads_, isso não quer dizer que
você não possa tirar vantagens de múltiplos núcleos de processamento em seu ambiente.
Processos filhos podem ser criados utilizando a API [`child_process.fork()`][], e foram
desenvolvidos para que a comunicação entre eles seja fácil. Da mesma maneira foi o módulo
[`cluster`][], que permite o compartilhamento de _sockets_ entre os processos, a fim de
permitir o balanceamento de carga entre os núcleos.

[Blocking vs Non-Blocking]: https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[event loop]: https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
[Event Machine]: https://github.com/eventmachine/eventmachine
[Twisted]: http://twistedmatrix.com/
