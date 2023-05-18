---
layout: about.hbs
title: Sobre
trademark: Marca registrada
---

# Sobre Node.js®

Como um tempo de execução assíncrono conduzido por eventos de JavaScript, Node.js é projetado para construir aplicativos escaláveis e de rede. No exemplo "hello world" seguinte, muitas conexões podem ser tratadas simultaneamente. Em cada conexão, o callback é acionado, mas se não houver trabalho a ser feito, o Node.js ficará inativo.

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Olá Mundo');
});

server.listen(port, hostname, () => {
  console.log(`Servidor executando em http://${hostname}:${port}/`);
});
```

Observe que isso contrasta com o modelo de concorrência, muito comúm hoje em dia, no qual são usadas as threads do Sistema Operacional. Entretanto, uma rede baseada em threads se torna relativamente ineficiente e muito difícil de usar. Além disso, os usuários do Node.js não precisam se preocupar em bloquear processos, já que não existem bloqueios. Quase nenhuma função no Node.js executa diretamente operações I/O, e por isso, o processo nunca se bloqueia, exceto quando o I/O é realizado usando métodos síncronos de Node.js da biblioteca padrão. Como nada se bloqueia, é razóavel usar Node.js para desenvolver sistemas escaláveis.

Se alguns destes termos não são familiares, há um artigo completo ao respeito: [Bloqueando vs. Não Bloqueando][].

---

Node.js é semelhante no design, e bastante influenciado, por sistemas como os de [Máquina de Eventos][] do Ruby ou como o [Twisted][]do Python. Porém, Node.js leva o modelo de eventos para um pouco mais além. De fato, o Node.js apresenta um [laço de eventos][] como uma construção de tempo de execução em vez de como uma biblioteca. Já em outros sistemas, sempre há uma chamada de bloqueio para iniciar o laço de eventos. Normalmente, o comportamento é definido através de callbacks no início de um script e, no final, um servidor é iniciado através de uma chamada de bloqueio como `EventMachine::run()`. Entretanto, em Node.js não existe essa chamada-inicial-para-o-começo-do-laço. De fato, o Node.js simplesmente entra no laço de eventos após executar o script de entrada. E, posteriormente, o Node.js sai do laço de eventos quando não há mais callbacks para executar. Esse comportamento é como o JavaScript do navegador: o laço de eventos é oculto para o usuário.

O HTTP é um cidadão de primeira classe no Node.js, pois ele é desenhado com fluxo e baixa latência. Isso torna o Node.js bem adequado para a criação de uma biblioteca ‘web’ ou qualquer framework.

O fato do Node.js ser desenhado sem threads não quer dizer que não podamos tirar proveito de um ambiente com múltiplos núcleos. Por exemplo, processos filho podem ser gerados usando nossa API [`child_process.fork()`][], pois foi desenhada para uma fácil comunicação. Por outro lado, o módulo [`cluster`][] foi construido com a mesma interfase. Este módulo permite compartilhar soquetes entre processos para abilitar o equilibro da carga entre os núcleos.

[Bloqueando vs. Não Bloqueando]: /en/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[laço de eventos]: /en/docs/guides/event-loop-timers-and-nexttick/
[Máquina de Eventos]: https://github.com/eventmachine/eventmachine
[Twisted]: https://twistedmatrix.com/trac/
