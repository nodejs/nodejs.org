---
layout: about.hbs
title: A propos
trademark: Trademark
---

# Informazioni su Node.js®

Come runtime JavaScript guidato da eventi asincroni, Node.js è progettato per
creare applicazioni di rete scalabili. Nel seguente esempio "Hello World",
molte connessioni possono essere gestite contemporaneamente.
Ad ogni connessione viene chiamata la callback, ma se non c'è nulla da fare, Node.js rimarrà inattivo.

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

Ciò è in contrasto con il modello di concorrenza più comune di oggi in cui vengono utilizzati
i thread. Il networking basato su thread è relativamente inefficiente e
molto difficile da utilizzare. Inoltre, gli utenti di Node.js sono liberi da preoccupazioni di
blocco permanente del processo, poiché non ci sono blocchi. Quasi nessuna funzione in Node.js
esegue direttamente I/O, quindi il processo non blocca mai. Dal momento che nulla si blocca,
è molto facile sviluppare sistemi scalabili in Node.js

Se alcuni dei termini utilizzati non ti sono familiari, ecco un articolo completo
 (in inglese) [Bloccante vs Non Bloccante][].

---

Node.js è influenzato da sistemi come la [Event Machine][] di Ruby o [Twisted][] di Python.
 Node.js porta il modello ad eventi un po' oltre.
 Node.js usa un [event loop][] come costrutto di runtime invece che come una libreria. In altri sistemi, c'è sempre una chiamata di blocco per avviare l'event-loop.
In genere il comportamento è definito tramite callback all'inizio di uno script
e alla fine avvia un server attraverso una chiamata di blocco come
`EventMachine::run()`. In Node.js non esiste alcuna chiamata per avviare il ciclo. Node.js
entra semplicemente nel ciclo degli eventi dopo aver eseguito lo script di input. Node.js esce dal
ciclo di eventi quando non ci sono più callback da eseguire. Questo comportamento è simile a
JavaScript in browser: il ciclo degli eventi è nascosto all'utente.

HTTP ha un posto di rilievo in Node.js, che è stato progettato per lo streaming e bassa latenza.
 Ciò rende Node.js una base perfetta per una libreria o un framework web.

Solo perché Node.js è progettato senza thread, non significa che non è possibile sfruttare i multi-core nel proprio ambiente. I processi figlio possono essere generati utilizzando la API [`child_process.fork()`][], con cui è possibile comunicare facilmente. Costruito sulla stessa interfaccia è il modulo [`cluster`][], che consente di condividere i socket tra i processi per consentire il bilanciamento del carico sui core.

[Bloccante vs Non Bloccante]: /en/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[event loop]: /en/docs/guides/event-loop-timers-and-nexttick/
[Event Machine]: http://rubyeventmachine.com/
[Twisted]: https://twistedmatrix.com/trac/
