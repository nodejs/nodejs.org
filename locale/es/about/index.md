---
layout: about.hbs
title: Acerca
trademark: Marca
---

# Acerca de Node.js®

Ideado como un entorno de ejecución de JavaScript orientado a eventos asíncronos, Node.js está diseñado para crear aplicaciones network escalables. En el siguiente ejemplo de "hola mundo", pueden atenderse muchas conexiones  simultáneamente. Por cada conexión, se activa la devolución de llamada o *callback*, pero si no hay trabajo que hacer, Node.js se dormirá.

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo');
});

server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});
```

Esto contrasta con el modelo de concurrencia más común de hoy en día, en el que se emplean hilos del Sistema Operativo. Las redes basadas en hilos son relativamente ineficientes y muy difíciles de usar. Además, los usuarios de Node.js están libres de preocuparse por el bloqueo del proceso, ya que no existe. Casi ninguna función en Node.js realiza I/O directamente, por lo que el proceso nunca se bloquea. Por ello, es muy propicio desarrollar sistemas escalables en Node.js.

Si algo de este lenguaje no le es familiar, hay un artículo completo sobre [Bloqueo vs. No Bloqueo][].

---

Node.js es similar en diseño y está influido por sistemas como la [máquina de eventos][] de Ruby y [Twisted][] de Python. Node.js lleva el modelo de eventos un poco más allá. Presenta un [bucle de eventos][] como una construcción en tiempo de ejecución en lugar de una librería. En otros sistemas, siempre hay una llamada bloqueante para iniciar el bucle de eventos. Típicamente, el comportamiento se define a través de callbacks al principio del script, y al final un servidor se inicia a través de una llamada bloqueante como `EventMachine::run()`. En Node.js no existe tal llamada de inicio del evento. Node.js simplemente entra en el bucle de eventos después de ejecutar el script de entrada. Node.js sale del bucle de eventos cuando no hay más callbacks a realizar. Este comportamiento es como el JavaScript del navegador — el bucle de eventos está oculto para el usuario.

HTTP es un elemento destacado en Node.js, diseñado teniendo en cuenta la transmisión de operaciones con streaming y baja latencia. Esto hace que Node.js sea muy adecuado para la base de una librería o un framework web.

El hecho de que Node.js esté diseñado para trabajar sin hilos, no significa que no pueda aprovechar los múltiples núcleos de su entorno. Los procesos hijos pueden ser generados usando nuestra API [`child_process.fork()`][], y están diseñados para que sea fácil comunicarse con ellos. Desarrollada sobre esa misma interfaz está el módulo [`cluster`][], que le permite compartir sockets entre procesos para permitir el equilibrio de carga sobre sus núcleos.

[Bloqueo vs. No Bloqueo]: /en/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[bucle de eventos]: /en/docs/guides/event-loop-timers-and-nexttick/
[máquina de eventos]: https://github.com/eventmachine/eventmachine
[Twisted]: https://twistedmatrix.com/trac/
