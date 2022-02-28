---
layout: about.hbs
title: Sobre nosaltres
trademark: Trademark
---

# Sobre Node.js®

Nascut com a un entorn d'execució de JavaScript orientat a esdeveniments asíncrons, Node.js està
dissenyat per a crear aplicacions en xarxa de manera escalable. En la següent aplicació d'exemple
"hola món", es pot manegar moltes connexions concurrents. Per a cada connexió el callback serà
executat, no obstant si no hi hagués tasques pendents per a fer, Node.js romandrà adormit.

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Món');
});

server.listen(port, hostname, () => {
  console.log(`El servidor s'està executant en http://${hostname}:${port}/`);
});
```

Això contrasta amb el model de concurrència més comú d'avui dia, o es fan servir els
fils del Sistema Operatiu. Les operacions en xarxes basades en fils són relativament
ineficients i són molt més complicades de fer servir. A més a més, els usuaris de
Node.js no han d'estar preocupats quant als bloquejos dels processos ja que són
inexistents. Gairebé cap funció en Node.js realitza I/O directament, d'aquesta manera
el procés mai és bloquejat. A raó de què no hi ha bloquejos, és més raonable desenvolupar
sistemes escalables en Node.js.

Si cap d'aquests termes no li és familiar, hi ha un article complet en
[Blocking vs Non-Blocking][].

---

Node té un disseny similar i està influenciat per sistemes com [Event Machine][]
de Ruby o [Twisted][] de Python. Node porta el model d'esdeveniments una mica
més enllà, aquest presenta un [bucle d'esdeveniments][] com un entorn en comptes d'una llibreria.
En altres sistemes sempre existeix una trucada que bloqueja per iniciar el bucle d'esdeveniments.
El comportament és típicament definit a través de *callbacks* a l'inici del script i al final
s'inicia el servidor mitjançant una trucada de bloqueig com `EventMachine::run()`. En Node no
existeix aquesta trucada. Node simplement ingressa el bucle d'esdeveniments després d'executar
el script d'entrada. Node surt del bucle d'esdeveniments quan no hi ha més *callbacks* que executar.
s comporta d'una forma similar a JavaScript al navegador - el bucle d'esdeveniments està ocult a l'usuari.

HTTP es ciutadà de primera classe en Node, disenyat amb operacions de streaming y baixa latència
en ment. Això no fa a Node candidat per ser la base d'una llibrería o un framework web.

Solament perquè Node està dissenyat sense fils, no significa que vostè no pot aprofitar els
múltiples cores del seu sistema. Processos fills poden ser llençats usant la nostra API
[`child_process.fork()`][], la qual està dissenyada per comunicar-se fàcilment amb el procés
principal. Construïda sobre la mateixa interfície està el mòdul [`cluster`][], el qual permet
compartir sockets entre processos per activar el balanceig de càrregues en els seus múltiples cores.

[Blocking vs Non-Blocking]: https://nodejs.org/ca/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[bucle d'esdeveniments]: https://github.com/nodejs/node/blob/master/doc/topics/event-loop-timers-and-nexttick.md
[Event Machine]: https://github.com/eventmachine/eventmachine
[Twisted]: https://twistedmatrix.com/trac/
