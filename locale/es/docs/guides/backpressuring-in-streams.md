---
title: Backpressuring en Streams
layout: docs.hbs
---

# Backpressuring en Streams

Hay un problema general que ocurre durante el manejo de datos llamado [ `backpressure` ][] y describe la acumulación de datos en un buffer durante la transferencia de datos. Cuando el receptor de la transferencia tiene operaciones complejas, o es lento por cualquier motivo, existe una tendencia en la que los datos de la fuente se acumulan, como un bloqueo.

Para resolver el problema, debe existir un sistema de delegación para garantizar un flujo fluido de datos desde una fuente a otra. Diferentes comunidades han resuelto este problema únicamente en sus programas, los pipes o tuberías Unix y los sockets TCP son buenos ejemplos de ello, y a menudo se lo conoce como _flow control_ o _control de flujo_. En Node.js, los streams han sido la solución adoptada.

El propósito de esta guía es la de explicar cómo exactamente estas transmisiones se abordan en el código fuente de Node.js. La segunda parte de la guía muestra las mejores prácticas sugeridas para garantizar que el código de su aplicación sea seguro y esté optimizado al implementar streams.

Suponemos que está familiarizado con la definición general de [ ` backpressure ` ][], [`Buffer`][] y [`EventEmitters`][] en Node.js, así como algo de experiencia con [`Stream`][]. Si no ha leído esos documentos, no es una mala idea echarle un vistazo a la documentación de la API primero, ya que le ayudará a entender mucho mejor esta guía.

## El Problema con Data Handling o Manejo de Datos

En un sistema informático, los datos se transfieren de un proceso a otro a través de pipes, sockets y signals. En Node.js, encontramos un mecanismo similar llamado [`Stream`][]. ¡Las transmisiones son geniales! Hacen mucho por Node.js y casi todas las partes del código base interno utilizan ese módulo. Como desarrollador, ¡se le anima a utilizarlos también!

```javascript
const readline = require('readline');

// process.stdin and process.stdout are both instances of Streams.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Why should you use streams? ', (answer) => {
  console.log(`Maybe it's ${answer}, maybe it's because they are awesome! :)`);

  rl.close();
});
```

Un buen ejemplo de por qué el mecanismo backpressure implementado a través de streams es una gran optimización se puede demostrar comparando las herramientas internas del sistema [ Implementación de `Stream`][] de Node.js.

En un escenario, tomaremos un archivo grande (de unos 9gb) y lo comprimiremos utilizando la conocida herramienta [`zip (1)`][].

```
zip The.Matrix.1080p.mkv
```

Si bien eso se demora unos minutos en completarse, en otro shell podemos ejecutar un script que utilice el módulo de Node.js [`zlib`][], que envuelve otra herramienta de compresión, [`gzip (1)`][].

```javascript
const gzip = require('zlib').createGzip();
const fs = require('fs');

const inp = fs.createReadStream('The.Matrix.1080p.mkv');
const out = fs.createWriteStream('The.Matrix.1080p.mkv.gz');

inp.pipe(gzip).pipe(out);
```

Para probar los resultados, intente abrir cada archivo comprimido. El archivo comprimido por la herramienta [`zip (1)`][] mostrará si el archivo está dañado, mientras que la compresión finalizó con [`Stream` ][] se descomprimirá sin errores.

> En este ejemplo, usamos `.pipe()` para obtener la fuente de datos de un extremo al otro. Sin embargo, tenga en cuenta que no se adjuntan controladores de errores adecuados. Si una parte de los datos no se recibe correctamente, la fuente `Readable` o el flujo de `gzip` no se destruirá. [ `pump` ][] es una herramienta de utilidad que destruiría correctamente todas las corrientes en una tubería si uno de ellos falla o se cierra, ¡y es imprescindible en este caso!

[`pump`][] solo es necesario para Node.js 8.xo anterior, como para Node.js 10.xo una versión posterior, [`pipeline`][] es introducido para reemplazar [`pump`][]. Este es un método de módulo para utilizar pipe entre streams, reenviar errores, limpiar adecuadamente y proporcionar un callback cuando se completa el pipeline.

A continuación, se muestra un ejemplo del uso de pipeline:

```javascript
const { pipeline } = require('stream');
const fs = require('fs');
const zlib = require('zlib');

// Utilice la API de pipeline para canalizar fácilmente una serie
// de transmisiones juntas y recibir una notificación cuando la
// pipeline esté completamente terminada.
// Una pipeline para gzip de un archivo de video potencialmente
// enorme de manera eficiente:

pipeline(
  fs.createReadStream('The.Matrix.1080p.mkv'),
  zlib.createGzip(),
  fs.createWriteStream('The.Matrix.1080p.mkv.gz'),
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);
```

También puede llamar a [`promisify`][] en canalización para usarlo con `async`/`await`:

```javascript
const stream = require('stream');
const fs = require('fs');
const zlib = require('zlib');
const util = require('util');

const pipeline = util.promisify(stream.pipeline);

async function run() {
  try {
    await pipeline(
      fs.createReadStream('The.Matrix.1080p.mkv'),
      zlib.createGzip(),
      fs.createWriteStream('The.Matrix.1080p.mkv.gz'),
    );
    console.log('Pipeline succeeded');
  } catch (err) {
    console.error('Pipeline failed', err);
  }
}
```

## Demasiados Datos, Demasiado Rápido

Hay casos en los que una secuencia [`Readable`][] puede proporcionar datos al [`Writable`][] demasiado rápido, mucho más de lo que el consumidor puede manejar!

Cuando eso ocurre, el consumidor comenzará a poner en cola todos los fragmentos de datos para su consumo posterior. La cola de escritura se hará cada vez más larga y, debido a esto, se deben mantener más datos en la memoria hasta que se complete todo el proceso.

Escribir en un disco es mucho más lento que leer desde un disco, por lo tanto, cuando intentamos comprimir un archivo y escribirlo en nuestro disco duro, se producirá una contrapresión porque el disco de escritura no podrá mantener la velocidad de la lectura.

```javascript
// En secreto, la transmisión dice: "¡Espera, espera! ¡Esto es demasiado!"
// Los datos comenzarán a acumularse en el lado de lectura del buffer de 
// datos a medida que "write" intente mantenerse al día con el flujo de 
// datos entrantes.
inp.pipe(gzip).pipe(outputFile);
```

Por eso es importante un mecanismo de contrapresión. Si no hubiera un sistema de contrapresión, el proceso consumiría la memoria de su sistema, ralentizando efectivamente otros procesos y monopolizando una gran parte de su sistema hasta su finalización.

Esto da como resultado algunas cosas:

* Ralentizar todos los demás procesos actuales
* Un recolector de basura con exceso de trabajo
* Agotamiento de la memoria

En los siguientes ejemplos, sacaremos el [valor de retorno][] de la función `.write()` para cambiarla a `true`, lo que efectivamente deshabilita el soporte de backpressure en el núcleo de Node.js. En cualquier referencia al binario 'modificado', estamos hablando de ejecutar el binario `node` sin la línea `return ret;`, y en su lugar con el `return true;`.

## Exceso de arrastre al Garbage Collection

Echemos un vistazo a la siguiente referencia. Usando el mismo ejemplo de arriba, ejecutó algunas pruebas de tiempo para obtener un tiempo medio para ambos binarios.

```
   trial (#)  | `node` binary (ms) | modified `node` binary (ms)
=================================================================
      1       |      56924         |           55011
      2       |      52686         |           55869
      3       |      59479         |           54043
      4       |      54473         |           55229
      5       |      52933         |           59723
=================================================================
average time: |      55299         |           55975
```

Ambos tardan alrededor de un minuto en ejecutarse, por lo que no hay mucha diferencia, pero echemos un vistazo más de cerca para confirmar si nuestras sospechas son correctas. Utilizamos la herramienta de Linux [`dtrace`][] para evaluar lo que está sucediendo con el garbage del V8.

El tiempo medido por GC (recolector de basura) indica los intervalos de un ciclo completo de un solo barrido realizado por el recolector de basura:

```
approx. time (ms) | GC (ms) | modified GC (ms)
=================================================
          0       |    0    |      0
          1       |    0    |      0
         40       |    0    |      2
        170       |    3    |      1
        300       |    3    |      1

         *             *           *
         *             *           *
         *             *           *

      39000       |    6    |     26
      42000       |    6    |     21
      47000       |    5    |     32
      50000       |    8    |     28
      54000       |    6    |     35
```

Si bien los dos procesos comienzan igual y parecen hacer funcionar el GC a la misma velocidad, se hace evidente que después de unos segundos distribuye la carga del GC en intervalos consistentes de 4-8 milisegundos hasta que el final de la transferencia de datos.

Sin embargo, cuando no existe un sistema de contrapresión, la recolección de basura V8 comienza a moverse más lento. El binario normal llamó al GC aproximadamente **75** veces en un minuto, mientras que el binario modificado solo se dispara **36** veces.

Esta es la acumulación lenta y gradual por el uso creciente de la memoria. A medida que se transfieren los datos, sin un sistema de contrapresión en su lugar, se utiliza más memoria para cada transferencia de fragmentos.

Cuanta más memoria se está asignando, más trabajo tiene el GC. Cuanto mayor sea el barrido, más necesita el GC para decidir qué se puede liberar, y la búsqueda de punteros separados en un espacio de memoria más grande consumirá más potencia de cálculo.

## Agotamiento de la memoria

Para determinar el consumo de memoria de cada binario, hemos cronometrado cada proceso con `/usr/bin/time -lp sudo ./node ./backpressure-example/zlib.js` individualmente.

Esta es la salida en el binario normal:

```
Respecting the return value of .write()
=============================================
real        58.88
user        56.79
sys          8.79
  87810048  maximum resident set size
         0  average shared memory size
         0  average unshared data size
         0  average unshared stack size
     19427  page reclaims
      3134  page faults
         0  swaps
         5  block input operations
       194  block output operations
         0  messages sent
         0  messages received
         1  signals received
        12  voluntary context switches
    666037  involuntary context switches
```

El tamaño máximo de bytes que ocupa la memoria virtual resulta ser de aproximadamente 87,81 mb.

Y ahora cambiando el [valor de retorn ][] de la función [ `.write ()` ][], obtenemos:

```
Without respecting the return value of .write():
==================================================
real        54.48
user        53.15
sys          7.43
1524965376  maximum resident set size
         0  average shared memory size
         0  average unshared data size
         0  average unshared stack size
    373617  page reclaims
      3139  page faults
         0  swaps
        18  block input operations
       199  block output operations
         0  messages sent
         0  messages received
         1  signals received
        25  voluntary context switches
    629566  involuntary context switches
```

El tamaño máximo de bytes que ocupa la memoria virtual resulta ser de aproximadamente 1,52 gb.

Sin streams en su lugar para delegar el backpressure, hay un orden de magnitud mayor de espacio de memoria que se está asignando: ¡un gran margen de diferencia entre el mismo proceso!

Este experimento muestra cuán optimizado y rentable es el mecanismo backpressure de Node.js para su sistema informático. ¡Ahora, analicemos cómo funciona!

## ¿Cómo resuelve el Backpressure estos problemas?

Existen diferentes funciones para transferir datos de un proceso a otro. En Node.js, hay una función incorporada interna llamada [`.pipe()`][]. ¡Hay [otros paquetes][] que también puedes usar! Sin embargo, en última instancia, en el nivel básico de este proceso, tenemos dos componentes separados: la _fuente_ de los datos y el _consumidor_.

Cuando [`.pipe()`][] se llama desde la fuente, le indica al consumidor que hay datos para transferir. La función de tubería ayuda a configurar el cierres de backpressures adecuados para los desencadenantes del evento.

En Node.js, la fuente es una secuencia [`Readable`][] y la el consumidor es el [`Writable`][] stream (ambos pueden intercambiarse con un [`Duplex`][] o una secuencia de [`Transform`][], pero eso está fuera del alcance para esta guía).

El momento en que se activa el backpressure se puede reducir exactamente al valor de retorno del método función [ `.write()` ][] de un [`Writable`][]. Este valor de retorno está determinado por algunas condiciones, por supuesto.

En cualquier escenario donde el búfer de datos haya excedido el [`highWaterMark`][] o que la cola de escritura esté ocupada en ese momento, [ `.write()`][] devuelve `false`.

Cuando se devuelve un valor `false`, el sistema backpressure se activa. Pausará la transmisión de cualquier dato desde [ `Readable`][] y espera hasta que el consumidor esté listo nuevamente. Una vez que se vacía el búfer de datos, un evento [`'drenaje'`][] se emitirá y reanudará el flujo de datos entrantes.

Una vez finalizada la cola, el backpressure permitirá que los datos se envíen nuevamente. El espacio en la memoria que se estaba utilizando se liberará y se preparará para el siguiente lote de datos.

Esto permite utilizar una cantidad fija de memoria en un momento dado para la función [`.pipe()`][]. No habrá pérdida de memoria, ni almacenamiento en búfer infinito, ¡y el recolector de basura solo tendrá que lidiar con un área de la memoria!

Entonces, si el backpressure es tan importante, ¿por qué (probablemente) no ha oído hablar de ella? Bueno, la respuesta es simple: Node.js hace todo esto automáticamente por usted.

¡Eso es muy genial! Pero tampoco es tan bueno cuando intentamos comprender cómo implementar nuestras propios streams.

> En la mayoría de las máquinas, hay un tamaño de byte que determina cuando un búfer está lleno (que variará entre diferentes máquinas). Node.js te permite configurar tu propio [`highWaterMark`][], pero, por lo general, el valor predeterminado se establece en 16 kb (16384, o 16 para flujos de ObjectMode). En los casos en los que desee aumentar ese valor, hágalo, ¡pero hágalo con precaución!

## Ciclo de vida de `.pipe()`

Para lograr una mejor comprensión sobre backpressure, aquí hay un diagrama de flujo con el ciclo de vida de un [`Readable`][] stream siendo [piped][] dentro de un [`Writable`][] stream:

```
                                                     +===================+
                         x-->  Piping functions   +-->   src.pipe(dest)  |
                         x     are set up during     |===================|
                         x     the .pipe method.     |  Event callbacks  |
  +===============+      x                           |-------------------|
  |   Your Data   |      x     They exist outside    | .on('close', cb)  |
  +=======+=======+      x     the data flow, but    | .on('data', cb)   |
          |              x     importantly attach    | .on('drain', cb)  |
          |              x     events, and their     | .on('unpipe', cb) |
+---------v---------+    x     respective callbacks. | .on('error', cb)  |
|  Readable Stream  +----+                           | .on('finish', cb) |
+-^-------^-------^-+    |                           | .on('end', cb)    |
  ^       |       ^      |                           +-------------------+
  |       |       |      |
  |       ^       |      |
  ^       ^       ^      |    +-------------------+         +=================+
  ^       |       ^      +---->  Writable Stream  +--------->  .write(chunk)  |
  |       |       |           +-------------------+         +=======+=========+
  |       |       |                                                 |
  |       ^       |                              +------------------v---------+
  ^       |       +-> if (!chunk)                |    Is this chunk too big?  |
  ^       |       |     emit .end();             |    Is the queue busy?      |
  |       |       +-> else                       +-------+----------------+---+
  |       ^       |     emit .write();                   |                |
  |       ^       ^                                   +--v---+        +---v---+
  |       |       ^-----------------------------------<  No  |        |  Yes  |
  ^       |                                           +------+        +---v---+
  ^       |                                                               |
  |       ^               emit .pause();          +=================+     |
  |       ^---------------^-----------------------+  return false;  <-----+---+
  |                                               +=================+         |
  |                                                                           |
  ^            when queue is empty     +============+                         |
  ^------------^-----------------------<  Buffering |                         |
               |                       |============|                         |
               +> emit .drain();       |  ^Buffer^  |                         |
               +> emit .resume();      +------------+                         |
                                       |  ^Buffer^  |                         |
                                       +------------+   add chunk to queue    |
                                       |            <---^---------------------<
                                       +============+
```

> Si está configurando un pipeline para encadenar algunos streams para manipular sus datos, lo más probable es que implemente un [ `Transform`][] stream.

En este caso, su salida del stream [`Readable`][] ingresará en el [`Transform`][] y se conectará al [`Writable`][].

```javascript
Readable.pipe(Transformable).pipe(Writable);
```

Backpressure se aplicará de forma automática, pero tenga en cuenta que tanto el `highWaterMark` entrante como saliente del stream [`Transform`][] puede manipularse y afectará al sistema de backpressure.

## Guías de Backpressure

Desde [Node.js v0.10][], la clase [`Stream`][] ha ofrecido la capacidad de modificar el comportamiento de [ `.read()`][] o [`.write()`][] mediante la versión de subrayado de estas funciones respectivas ([ `._read()`][] y [`._write()`][]).

Existen guías documentadas para [implementar streams Readable][] e [implementar streams Writable][]. Asumiremos que los ha leído y la siguiente sección profundizará un poco más.

## Reglas a seguir al Implementar Streams Personalizadas

La regla de oro de las transmisiones es **respetar siempre la backpressure **. Lo que constituye una buena práctica es una práctica no contradictoria. Siempre que tenga cuidado de evitar comportamientos que entren en conflicto con el soporte de contrapresión interno, puede estar seguro de que está siguiendo las buenas prácticas.

En general,

1. Nunca `.push()` si no se le pregunta.
2. Nunca llame a `.write()` después de que devuelva falso, sino espere a que se descargue.
3. Streams cambia entre las diferentes versiones de Node.js y la biblioteca que usa. Tenga cuidado y pruebe las cosas.

> Con respecto al punto 3, un paquete increíblemente útil para crear streams de navegador es [`legible-stream`][]. Rodd Vagg ha escrito una [excelente publicación][] que describe la utilidad de esta biblioteca. En resumen, proporciona un tipo de degradación elegante y automatizada para [` Readable`][] streams y admite versiones anteriores de navegadores y Node.js.

## Reglas específicas para Readable Streams

Hasta ahora, hemos echado un vistazo a cómo [ `.write()`][] afecta al backpressure y se ha centrado mucho en el stream [ `Writable`][]. Debido a la funcionalidad de Node.js, los datos fluyen técnicamente desde [`Readable`][] a [`Writable `][]. Sin embargo, como podemos observar en cualquier transmisión de datos, materia o energía, la fuente es tan importante como el destino y el stream [La secuencia`Readable`][] es vital para cómo se maneja la backpressure.

Ambos procesos dependen el uno del otro para comunicarse de manera eficiente, si el [`Readable `][] ignora cuando la secuencia [`Writable `][] solicita que detenga el envío de datos, puede ser tan problemático cuando que [`.write()`][] retorne un valor es incorrecto.

Por lo tanto, respetemos también el retorno [`.write()`][], también debemos respetar el valor de retorno de [`.push()` ][] utilizado en el método [ `._read()` ][]. Si [`.push()`][] devuelve un valor `falso`, la secuencia dejará de leer desde la fuente. De lo contrario, continuará sin pausa.

A continuación se muestra un ejemplo de mala práctica al utilizar [`.push()`][]:

```javascript
// This is problematic as it completely ignores return value from push
// which may be a signal for backpressure from the destination stream!
class MyReadable extends Readable {
  _read(size) {
    let chunk;
    while (null !== (chunk = getNextChunk())) {
      this.push(chunk);
    }
  }
}
```

Además, desde fuera del stream personalizado, hay errores por ignorar el backpressure. En este contraejemplo de buena práctica, el código de la aplicación fuerza los datos siempre que están disponibles (señalado por [evento `'data'`][]):

```javascript
// This ignores the backpressure mechanisms Node.js has set in place,
// and unconditionally pushes through data, regardless if the
// destination stream is ready for it or not.
readable.on('data', (data) =>
  writable.write(data)
);
```

## Reglas específicas para Writable Streams

Recuerde que un [`.write()`][] puede devolver verdadero o falso dependiendo de algunas condiciones. Afortunadamente para nosotros, cuando construimos nuestro propio flujo [`Writable`][], la [`máquina de estado del stream`][] manejará nuestras devoluciones de llamada y determinará cuándo manejar el backpressure y optimizar el flujo de datos para nosotros.

Sin embargo, cuando queremos utilizar un [`Writable `][] directamente, se debe respetar el valor que devuelva [`.write()`][] y preste mucha atención a estos condiciones:

* Si la cola de escritura está ocupada, [`.write()`][] retornará falso.
* Si el chunk de datos es demasiado grande, [`.write()`][] retornará falso (el límite lo indica la variable, [`highWaterMark`][]).

<!-- eslint-disable indent -->
```javascript
// This writable is invalid because of the async nature of JavaScript callbacks.
// Without a return statement for each callback prior to the last,
// there is a great chance multiple callbacks will be called.
class MyWritable extends Writable {
  _write(chunk, encoding, callback) {
    if (chunk.toString().indexOf('a') >= 0)
      callback();
    else if (chunk.toString().indexOf('b') >= 0)
      callback();
    callback();
  }
}

// The proper way to write this would be:
    if (chunk.contains('a'))
      return callback();
    if (chunk.contains('b'))
      return callback();
    callback();
```

También hay otros temas a tener en cuenta al implementar [ `._writev()`][]. La función se combina con [`.cork()` ][], pero en estos casos es un error común al escribir:

```javascript
// Using .uncork() twice here makes two calls on the C++ layer, rendering the
// cork/uncork technique useless.
ws.cork();
ws.write('hello ');
ws.write('world ');
ws.uncork();

ws.cork();
ws.write('from ');
ws.write('Matteo');
ws.uncork();

// The correct way to write this is to utilize process.nextTick(), which fires
// on the next event loop.
ws.cork();
ws.write('hello ');
ws.write('world ');
process.nextTick(doUncork, ws);

ws.cork();
ws.write('from ');
ws.write('Matteo');
process.nextTick(doUncork, ws);

// As a global function.
function doUncork(stream) {
  stream.uncork();
}
```

[`.cork()` ][] se puede llamar tantas veces como queramos, solo debemos tener cuidado de llamar a [`.uncork()`][] la misma cantidad de veces para que fluya de nuevo.

## Conclusión

Los Streams son un módulo de uso frecuente en Node.js. Son importantes para la estructura interna y para los desarrolladores, para expandirse y conectarse a través del ecosistema de módulos de Node.js.

Con suerte, ahora podrá solucionar problemas y codificar sus [`Writable`][] y [`Readable`][] de forma segura teniendo en cuenta el backpressure. Comparta sus conocimientos con colegas y amigos.

Asegúrese de leer más sobre [`Stream`][] para otras funcionalidades y la API para ayudarle a mejorar y dar rienda suelta a sus capacidades de transmisión al crear una aplicación con Node.js.

[`Stream`]: https://nodejs.org/api/stream.html

[ Implementación de `Stream`]: https://nodejs.org/api/stream.html

[`Stream` ]: https://nodejs.org/api/stream.html
[`Buffer`]: https://nodejs.org /api/buffer.html
[`EventEmitters`]: https://nodejs.org/api/events.html
[`Writable `]: https://nodejs.org/api/stream.html#stream_writable_streams
[ `Writable`]: https://nodejs.org/api/stream.html#stream_writable_streams
[`Writable`]: https://nodejs.org/api/stream.html#stream_writable_streams
[`Readable`]: https://nodejs.org/api/stream.html #stream_readable_streams
[`Readable`]: https://nodejs.org/api/stream.html#stream_readable_streams
[`Readable `]: https://nodejs.org/api/stream.html#stream_readable_streams
[La secuencia`Readable`]: https://nodejs.org/api/stream.html#stream_readable_streams
[` Readable`]: https://nodejs.org/api/stream.html#stream_readable_streams
[ `Readable`]: https://nodejs.org/api/stream.html#stream_readable_streams
[`Duplex`]: https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams
[ `Transform`]: https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams
[`Transform`]: https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams
[`zlib`]: https://nodejs.org/api/zlib.html
[`'drenaje'`]: https://nodejs.org/api/stream.html#stream_event_drain
[`evento 'data'`]: https://nodejs.org/api/stream.html#stream_event_data
[ `.read()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_read_size
[`.write()`]: https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback
[ `.write ()` ]: https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback
[ `.write()` ]: https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback
[ `.write()`]: https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback
[ `._read()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_read_size_1
[ `._read()` ]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_read_size_1
[`._write()`]: https://nodejs.org/docs/latest/api/stream.html#stream_writable_write_chunk_encoding_callback_1
[ `._writev()`]: https://nodejs.org/api/stream.html#stream_writable_writev_chunks_callback
[`.cork()` ]: https://nodejs.org/api/stream.html#stream_writable_cork
[`.uncork()`]: https://nodejs.org/api/stream.html#stream_writable_uncork

[`.push()` ]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_push_chunk_encoding

[`.push()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_push_chunk_encoding

[implementar streams Writable]: https://nodejs.org/docs/latest/api/stream.html#stream_implementing_a_writable_stream
[implementar streams Readable]: https://nodejs.org/docs/latest/api/stream.html#stream_implementing_a_readable_stream

[otros paquetes]: https://github.com/sindresorhus/awesome-nodejs#streams
[ `backpressure` ]: https://en.wikipedia.org/wiki/Backpressure_routing
[ ` backpressure ` ]: https://en.wikipedia.org/wiki/Backpressure_routing
[Node.js v0.10]: https://nodejs.org/docs/v0.10.0/
[`highWaterMark`]: https://nodejs.org/api/stream.html#stream_buffering
[valor de retorno]: https://github.com/nodejs/node/blob/55c42bc6e5602e5a47fb774009cfe9289cb88e71/lib/_stream_writable.js#L239
[valor de retorn ]: https://github.com/nodejs/node/blob/55c42bc6e5602e5a47fb774009cfe9289cb88e71/lib/_stream_writable.js#L239

[`legible-stream`]: https://github.com/nodejs/readable-stream
[excelente publicación]: https://r.va.gg/2014/06/why-i-dont-use-nodes-core-stream-module.html

[`dtrace`]: http://dtrace.org/blogs/about/
[`zip (1)`]: https://linux.die.net/man/1/zip
[`gzip (1)`]: https://linux.die.net/man/1/gzip
[`máquina de estado del stream`]: https://en.wikipedia.org/wiki/Finite-state_machine

[`.pipe()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_pipe_destination_options
[piped]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_pipe_destination_options
[`pump`]: https://github.com/mafintosh/pump
[ `pump` ]: https://github.com/mafintosh/pump
[`pipeline`]: https://nodejs.org/api/stream.html#stream_stream_pipeline_streams_callback
[`promisify`]: https://nodejs.org/api/util.html#util_util_promisify_original
