---
layout: about.hbs
title: Acerca
trademark: Trademark
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

Si alguno de estos términos no le es familiar, hay un artículo completo en [Blocking vs Non-Blocking](https://github.com/nodejs/node/blob/master/doc/topics/blocking-vs-non-blocking.md).

---

Node.js es similar en diseño y está influenciado por sistemas como [Event Machine](https://github.com/eventmachine/eventmachine) de Ruby y [Twisted](https://twistedmatrix.com/trac/) de Python. Pero Node.js lleva el modelo de eventos un poco más allá. Incluye un [bucle de eventos](https://github.com/nodejs/node/blob/master/doc/topics/event-loop-timers-and-nexttick.md) como runtime de ejecución en lugar de una biblioteca. En otros sistemas siempre existe una llamada de bloqueo para iniciar el bucle de eventos. Por lo general, el comportamiento se define mediante devoluciones *callbacks* de llamada al iniciarse un script y al final se inicia un servidor a través de una llamada de bloqueo como `EventMachine::run()`. En Node.js, no existe como tal la llamada de inicio del evento de bucle o *start-the-event-loop*. Node.js simplemente entra en el bucle de eventos después de ejecutar el script de entrada y sale cuando no hay más devoluciones *callbacks* de llamada para realizar. Se comporta de una forma similar a JavaScript en el navegador - el bucle de eventos está oculto al usuario.

HTTP es un elemento destacado en Node.js, diseñado teniendo en cuenta la transmisión de operaciones con streaming y baja latencia. Esto hace que Node.js sea muy adecuado para la base de una librería o un framework web.

Que Node.js esté diseñado para trabajar sin hilos no significa que no pueda aprovechar múltiples núcleos en su entorno. Se pueden generar subprocesos o procesos hijos utilizando nuestra API [`child_process.fork()`](https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options), la cual está diseñada para que la comunicación entre ellos sea fácil mediante su proceso principal. Desarrollada sobre esa misma interfaz está el módulo [`cluster`](https://nodejs.org/api/cluster.html), que le permite compartir sockets entre procesos para permitir el balanceo de carga entre sus múltiples núcleos.
