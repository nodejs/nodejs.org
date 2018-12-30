---
layout: about.hbs
title: About
trademark: Trademark
---
# Riguardo a Node.js&reg;

In quanto runtime JavaScript guidato dagli eventi, Node è pensato per creare applicazioni di rete scalabili. Nell'esempio "hello world" seguente, possono essere gestite molte connessioni simultaneamente. Nel momento in cui la callback di ogni connessione è chiamata, ma non c'è lavoro da svolgere, Node rimarrà dormiente.

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
  console.log(`Server in esecuzione all'indirizzo http://${hostname}:${port}/`);
});
```
Ciò è in contrasto con il modello comune del giorno d'oggi, in cui vengono sfruttati i thread del sistema operativo. Il networking basato sui thread è piuttosto inefficiente e molto difficile da usare. Inoltre, gli utenti di Node sono liberi da preoccupazioni di processi che entrano in dead-lock, dal momento in cui non ci sono blocchi. Quasi nessuna funzione in Node esegue direttamente operazioni di I/O, perciò il processo non si blocca mai. Dal momento che nulla si blocca, è molto facile sviluppare sistemi scalabili in Node.

Se qualcosa in questa terminologia ti è poco familiare, qui c'è un articolo completo su [Bloccante vs Non Bloccante][]. 

---

Node è simile in design, e influenzato, da sistemi come la [Event Machine][] di Ruby o [Twisted][] di Python. Node porta il modello ad eventi un po' oltre. Presenta un [loop di eventi][] come un costrutto a runtime invece che come libreria. In altri sistemi c'è sempre una chiamata bloccante per chiamare un Event Loop.

Normalmente il comportamento viene definito tramite callbacks all'inizio di uno script e alla fine viene avviato un server tramite una chiamata bloccante come `EventMachine::run()`.
In Node non c'è un loop d'avvio dell'evento come quello descritto sopra. 
Node semplicemente entra nell'event loop dopo aver eseguito lo script di input. 
Node esce dal loop d'evento quando non ci sono più callbacks da eseguire.
Questo comportamento è simile al JavaScript eseguito nei browser - il loop d'eventi è nascosto all'utente.

HTTP è una classe di primaria importanza in Node, pensata con l'idea di streaming e bassa latenza in mente.
Ciò rende Node adatto alla creazione di una libreria web o di un framework.

Solo perché Node è pensato senza thread, non significa che tu non possa trarre vantaggio dai core multipli nel tuo ambiente. Puoi produrre processi figli utilizzando la nostra API [`child_process.fork()`][], ed essi sono progettati in modo tale da poterci comunicare agevolmente. Creato a partire dalla medesima interfaccia è inoltre il modulo [`cluster`][], il quale ti consente di condividere sockets tra processi per abilitare il load balancing sui tuoi core.

[Bloccante vs Non Bloccante]: https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[loop di eventi]: https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
[Event Machine]: http://rubyeventmachine.com/
[Twisted]: http://twistedmatrix.com/
