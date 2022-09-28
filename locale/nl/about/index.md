---
layout: about.hbs
title: Over Node.js
trademark: Trademark
---

# Over Node.js®

Als een asynchrone event-driven JavaScript runtime is Node.js ontworpen om schaalbare netwerk applicaties te bouwen.
In het volgende "hello world" voorbeeld zien we dat verschillende connecties gelijktijdig afgehandeld kunnen worden.
Bij elke connectie wordt de callback functie opgeroepen, maar als er niets te doen is, dan gaat Node.js ook niet tussenkomen.

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

Dit is in contrast met het meer gangbare concurrency-model (gelijktijdigheidsmodel) van vandaag, waarin OS-threads gebruikt worden.
Thread-based netwerken zijn relatief inefficiënt en moeilijk te gebruiken.
Verder hoeven Node.js gebruikers zich geen zorgen te maken over het proces te dead-locken, omdat er geen locks aanwezig zijn.
Er zijn bijna geen functies in Node.js die rechtstreeks I/O uitvoeren, dus het proces blokkeert nooit,
behalve wanneer de I/O wordt uitgevoerd met synchrone methodes van de Node.js standard library.
Omdat niets blokkeert, is Node.js perfect voor het ontwikkelen van schaalbare systemen.

Als dit u niet bekend is, dan is hier een volledig artikel over [Blocking vs. Non-Blocking][].

---

Node.js is vergelijkbaar in design met, en beïnvloed door, systemen zoals Ruby's [Event Machine][] en Python's [Twisted][].
Node.js breid het event-model verder uit.
Het biedt een [event loop][] aan als een runtime construct in plaats van als een library.
Bij andere systemen is er altijd eerst een blocking-call om de event-loop te starten.
Meestal wordt het gedrag gedefinieerd door callbacks aan het begin van een script, en wordt er vaak
een server gestart aan het einde via een blocking-call zoals `EventMachine::run()`.
Bij Node.js is dit niet zo, er is geen start-the-event-loop oproep.
Node.js betreed simpelweg de even-loop na het uitvoeren van het input script, en verlaat de event-loop wanneer er geen
callbacks meer zijn om uit te voeren.
Dit gedrag is zoals bij browser JavaScript - de event-loop is verborgen voor de gebruiker.

HTTP is een first-class citizen in Node.js, ontworpen met streaming en low-latency in het achterhoofd.
Dit maakt Node.js zeer geschikt als basis voor een web library of framework.

Omdat Node.js is ontworpen zonder threads betekent dit niet dat je geen gebruik kunt maken van multi-cores in uw omgeving.
Child processen kunnen worden gespawend door gebruik te maken van onze [`child_process.fork()`][] API, en zijn ontworpen om makkelijk mee te kunnen communiceren.
Gebouwd op dezelfde interface is de [`cluster`][] module, waarmee je sockets kunt delen tussen processen om load balancing mogelijk te maken over uw cores.

[Blocking vs. Non-Blocking]: /en/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[event loop]: /en/docs/guides/event-loop-timers-and-nexttick/
[Event Machine]: https://github.com/eventmachine/eventmachine
[Twisted]: https://twistedmatrix.com/trac/
