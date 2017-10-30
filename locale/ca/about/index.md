---
layout: about.hbs
title: Sobre nosaltres
trademark: Trademark
---
# Sobre Node.js&reg;

Concebit com a un entorne d' execució de JavaScript orientat a events asíncrons, Node està dissenyat
per construir aplicacions en xarxa escalables. En la seguent aplicació de exemple "hola món", es pot
manegar moltes conexions concurrents. Per cada conexió el *callback* serà executat, no obstant això
si no hi ha treball que fer Node estarà dormint.

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Món\n');
});

server.listen(port, hostname, () => {
  console.log(`El servidor s'està executant en http://${hostname}:${port}/`);
});
```
Això contrasta amb el model de concurrència més comú avui dia, on s'usen fils del
Sistema Operatiu. Les operacions de xarxes basades en fils són relativament ineficients
i són molt difícils d'usar. A més, els usuaris de Node són lliures de preocupacions
sobre el bloqueig del procés, ja que no existeix. Gairebé cap funció en Node realitza
I/O directament, així que el procés mai es bloqueja. A causa de que no hi ha bloqueig
és molt raonable desenvolupar sistemes escalables en Node.

Si algú d'aquests termes no li és familiar, hi ha un article complet en
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
s comporta d'una forma similar a Javascript al navegador - el bucle d'esdeveniments està ocult a l'usuari.

HTTP es ciutadà de primera classe en Node, disenyat amb operacions de streaming y baixa latència
en ment. Això no fa a Node candidat per ser la base d'una llibrería o un framework web.

Solament perquè Node està dissenyat sense fils, no significa que vostè no pot aprofitar els
múltiples cores del seu sistema. Processos fills poden ser llençats usant la nostra API
[`child_*process.fork()`][], la qual està dissenyada per comunicar-se fàcilment amb el procés
principal. Construïda sobre la mateixa interfície està el mòdul [`cluster`][], el qual permet
compartir sockets entre processos per activar el balanceig de càrregues en els seus múltiples cores.

[Blocking vs Non-Blocking]: https://github.com/nodejs/node/blob/master/doc/topics/blocking-vs-non-blocking.md
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[bucle de eventos]: https://github.com/nodejs/node/blob/master/doc/topics/event-loop-timers-and-nexttick.md
[Event Machine]: http://rubyeventmachine.com/
[Twisted]: http://twistedmatrix.com/
