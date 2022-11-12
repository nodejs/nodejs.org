---
title: Buenas prácticas de Seguridad en Node.js
layout: docs.hbs
---

# Buenas prácticas de seguridad en Node.js


## Propósito

Este documento tiene la intención de extender el [modelo de amenazas][] actual y proporcionar directrices para asegurar una aplicación Node.js.


## Contenido del documento

* Mejores prácticas: Mostramos una forma simplificada y resumida de ver las mejores prácticas. Podemos
usar [this issue][security guidance issue] o [esta guía][nodejs guideline] como punto de partida. Es importante señalar que este documento es específico a Node.js, si está buscando algo amplio, considere 
[OSSF Best Practices][].
* Ataques explicados: ilustrar y documentar con lenguaje sencillo con algunos ejemplos código
 (cuando sea posible) los ataques que estamos mencionando en el modelo de amenazas.
* Librerías de terceros: definir amenazas (ataques typo-squirting, paquetes maliciosos...) y las mejores prácticas con respecto a las dependencias, etc...


## Lista de amenazas


### Denegación de servicio del servidor HTTP (CWE-400)

Este es un ataque en el que la aplicación deja de estar disponible para el propósito que fue diseñada, debido a la forma en que procesa las solicitudes HTTP entrantes. Estas solicitudes no necesitan ser creadas deliberadamente por un actor malicioso: una mala configuración o un cliente con errores también puede enviar un patrón de solicitudes al servidor que resulten en una denegación
de servicio.

Las solicitudes HTTP son recibidas por el servidor HTTP de Node.js y entregadas al código de la aplicación a través de controladores registrados. El servidor no analiza el contenido del cuerpo de la solicitud. Por lo tanto, cualquier ataque DoS causado por el contenido del cuerpo de la petición después de ser entregado al controlador no es una vulnerabilidad de Node.js en si mismo, ya que es responsabilidad del código de la aplicación manejarlo
correctamente.

Asegúrese de que el servidor web maneje los errores de socket correctamente, por ejemplo, cuando un
el servidor se crea sin un manejo de errores, será vulnerable a ataques DoS

```js
const net = require('net');

const server = net.createServer(function(socket) {
  // socket.on('error', console.error) // Esto evita que el proceso se rompa
  socket.write('Echo server\r\n');
  socket.pipe(socket);
});

server.listen(5000, '0.0.0.0');
```

Si se realiza una _mala solicitud_ el servidor podría colapsar.

Un ejemplo de ataque DoS que no es causado por el contenido de la petición es [Slowloris][]. En este ataque, las peticiones HTTP se envían lentamente y de froma fragmentada, enviandose un fragmento a la vez. Hasta que se entregue la solicitud completa, el servidor mantendrá los recursos dedicados a la petición en curso. Si un número suficiente de estas peticiones se envían al mismo tiempo, la cantidad de conexiones concurrentes pronto alcanzará su máximo, dando lugar a una denegación de servicio. Así es como el ataque depende no del contenido de la solicitud, sino de la sincronización y el patrón de las solicitudes que se envían al servidor.

**Mitigaciones**

* Utiliza un proxy inverso para recibir y reenviar las peticiones a la aplicación Node.js.
Los proxies inversos pueden proporcionar caché, balanceo de carga, listas de IPs bloqueadas, etc. que
reducen la probabilidad de que un ataque DoS sea efectivo.
* Configurar correctamente los tiempos de espera del servidor, para que las conexiones que estén inactivas o para cuando las peticiones lleguen demasiado despacio, puedan ser descartadas. Ver los diferentes tiempos de espera en [`http.Server`][], particularmente `headersTimeout`, `requestTimeout`, `timeout`,
y `keepAliveTimeout`.
* Limitar el número de sockets abiertos en total y/o por host. Ver los [docs http][], particularmente `agent.maxSockets`, `agent.maxTotalSockets`, `agent.maxFreeSockets` y `server.maxRequestsPerSocket`.


### DNS Rebinding (CWE-346)

Este es un ataque que puede dirigirse a las aplicaciones Node.js que se ejecutan con el
inspector de depuración habilitado usando el [interruptor --inspect][].

Dado que los sitios web abiertos en un navegador web pueden hacer peticiones WebSocket y HTTP, pueden dirigirse al inspector de depuración que se ejecuta localmente. Esto normalmente se evita con la política de [same-origin][] implementada por los navegadores modernos, que prohíbe a los scripts alcanzar recursos de diferentes orígenes (lo que significa que un sitio web malicioso no puede leer los datos solicitados desde una dirección IP local).

Sin embargo, mediante el reencuadre de DNS, un atacante puede controlar temporalmente el origen de sus peticiones para que parezca que se originan desde una dirección IP local. Esto se hace controlando tanto un sitio web como el servidor DNS utilizado para resolver su dirección IP. Ver [DNS Rebinding wiki][] para más detalles.

**Mitigaciones**

* Desactivar el inspector en la señal _SIGUSR1_ adjuntando un `process.on('SIGUSR1', ...)` a la señal.
* No ejecute el protocolo del inspector en producción.


### Exposición de información sensible a un actor no autorizado (CWE-552)

Todos los archivos y carpetas incluidos en el directorio actual son empujados al registro de Npm durante la publicación del paquete.

Existen algunos mecanismos para controlar este comportamiento definiendo una lista de bloqueo con `.npmignore` y `.gitignore` o asignando una lista permitida de ficheros en el `package.json`.

**Mitigaciones**
* Usando `npm publish --dry-run` listamos todos los archivos a publicar. Asegúrese de revisar el contenido antes de publicar el paquete.
* También es importante crear y mantener los ficheros `.gitignore` y
`.npmignore`. A través de estos archivos, puedes especificar qué archivos/carpetas no deben ser publicados. La propiedad [files][] en `package.json` permite la operación inversa (lista de ficheros y carpetas permitidos).
* En caso de una exposición, asegúrese de [despublicar el paquete][].

### HTTP Request Smuggling (CWE-444)

Este es un ataque que involucra a dos servidores HTTP (normalmente un proxy y una aplicación Node.js
). Un cliente envía una petición HTTP que pasa primero por el servidor front-end (el proxy) y luego es redirigida al servidor back-end (la aplicación). Cuando el front-end y el back-end interpretan las peticiones HTTP ambiguas de forma diferente,
existe la posibilidad de que un atacante envíe un mensaje malicioso que no serán detectados por el front-end, pero sí por el back-end, atravesando el servidor proxy.

Véase el documento [CWE-444][] para una descripción más detallada y observar ejemplos.

Debido a que este ataque depende de que Node.js interprete las peticiones HTTP de forma diferente a un servidor HTTP (arbitrario), un ataque exitoso puede deberse a una vulnerabilidad en Node.js, en el servidor front-end, o en ambos. Si la forma en que Node.js interpreta la petición es consistente con la especificación HTTP (ver [RFC7230][]), entonces no se considera una vulnerabilidad
en Node.js.

**Mitigaciones**

* No utilice la opción `insecureHTTPParser` al crear un servidor HTTP.
* Configurar el servidor front-end para normalizar las peticiones ambiguas.
* Monitorizar continuamente las nuevas vulnerabilidades de tipo HTTP Request Smuggling tanto en
Node.js como en el servidor front-end.
* Utilizar HTTP/2 de extremo a extremo y deshabilitar el downgrade de HTTP si es posible.

### Exposición de información a través de ataques de sincronización (CWE-208)

Se trata de un ataque que permite al atacante conocer información potencialmente sensible, por ejemplo, midiendo el tiempo que tarda la aplicación en responder a una petición. Este ataque no es específico de Node.js y puede dirigirse a casi todos los tiempos de ejecución.

El ataque es posible siempre que la aplicación utilice un secreto en una operación sensible al tiempo (por ejemplo, la bifurcación). Considere el manejo de la autenticación en una aplicación típica. Aquí, un método básico de autenticación incluye el correo electrónico y la contraseña como credenciales. La información del usuario se recupera de la entrada que el usuario ha suministrado desde un
DBMS (idealmente).

Al recuperar la información del usuario, la contraseña se compara con la información del usuario
recuperada de la base de datos. El uso de la comparación de cadenas incorporada en Node.js (built-in) lleva más tiempo para los valores de la misma longitud. Esta comparación, cuando se ejecuta por una cantidad aceptable, aumenta involuntariamente el tiempo de respuesta de la solicitud. Comparando los tiempos de respuesta de la petición, un atacante puede adivinar la longitud y el valor de la contraseña en gran cantidad de peticiones.

**Mitigaciones**

* La API criptográfica expone una función `timingSafeEqual` para comparar valores sensibles reales y valores sensibles esperados utilizando un algoritmo de tiempo constante.
* Para la comparación de contraseñas, se puede utilizar la función [scrypt][] disponible también en el módulo criptográfico nativo.
* De forma más general, evitar el uso de secretos en operaciones de tiempo variable. Esto incluye bifurcarse en secretos y, cuando el atacante podría estar ubicado en la misma infraestructura (por ejemplo, la misma máquina en la nube), utilizar un secreto como índice en la memoria. Escribir código de tiempo constante en JavaScript es difícil (en parte debido al JIT). Para las aplicaciones criptográficas, utilice las API criptográficas integradas o WebAssembly (para los algoritmos no implementados de forma nativa).


### Módulos maliciosos de terceros (CWE-1357)

Actualmente, en Node.js, cualquier paquete puede acceder a recursos potentes como acceso a la red. Además, como también tienen acceso al sistema de archivos, pueden enviar cualquier dato a cualquier lugar.

Todo el código que se ejecuta en un proceso de Node.js tiene la capacidad de cargar y ejecutar código arbitrario adicional utilizando `eval()` o sus equivalentes.
Todo el código con acceso de escritura al sistema de archivos puede lograr lo mismo, escribiendo en archivos nuevos o existentes que se han cargado.

Node.js tiene un [policy mechanism][] que es experimental[¹][experimental-features] para declarar el recurso cargado como no fiable o fiable. Sin embargo, esta política no está habilitada por defecto.

Asegúrate de fijar las versiones de las dependencias y de ejecutar comprobaciones automáticas de vulnerabilidades utilizando flujos de trabajo comunes o através de scripts de Npm.

Antes de instalar un paquete asegúrese de que éste esta mantenido y que incluye todo el contenido que esperaba. Tenga cuidado, ya que el código fuente en Github no siempre es el mismo que el publicado en Npm, valídelo en el _node_modules_.


#### Ataques a la cadena de suministro

Un ataque a la cadena de suministro en una aplicación Node.js, ocurre cuando una de sus dependencias (ya sea directa o transitiva) está comprometida. Esto puede ocurrir debido a que la aplicación es demasiado laxa en la especificación de las dependencias (permitiendo actualizaciones no deseadas) y/o errores comunes en la especificación (vulnerable a [typosquatting][]).

Si un atacante toma el control de un paquete, puede publicar una nueva versión con código malicioso. Si una aplicación Node.js depende de ese paquete sin ser estricta en cuanto a qué versión es segura de usar, compromete la aplicación una vez que el paquete use la última versión diposible (maliciosa).

Las dependencias especificadas en el archivo `package.json` pueden tener un número de versión exacto o un rango. Sin embargo, cuando se fija una dependencia a una versión exacta, sus dependencias transitivas no se fijan. Esto deja a la aplicación vulnerable a actualizaciones no deseadas o inesperadas.


Posibles vectores de ataque:

* Typosquatting attacks
* Lockfile poisoning
* Compromised maintainers
* Malicious Packages
* Dependency Confusions

**Mitigaciones**


* Evitar que npm ejecute scripts arbitrarios con `--ignore-scripts`.
  * Además, puede desactivarlo globalmente con `npm config set ignore-scripts true`.
* Fijar las versiones de las dependencias a una versión específica e inmutable,
  no una mutable o un rango.
* Utilice lockfiles, que fijan cada dependencia (directa y transitiva).
  * Utilice [Mitigaciones para el Lockfile poisoning][].
* Automatice las comprobaciones de nuevas vulnerabilidades usando Integración Continua (CI), con herramientas como [`npm-audit`][].
   * Herramientas como [`Socket`][] pueden ser usadas para analizar paquetes de forma estática
  para encontrar comportamientos de riesgo, como el acceso a la red o al sistema de archivos.
* Utilice [`npm ci`][] en lugar de `npm install`. Esto refuerza el lockfile para que las inconsistencias entre éste y el archivo _package.json_ causen un error (en lugar de ignorar silenciosamente el lockfile en favor de _package.json_).
* Compruebe cuidadosamente el archivo _package.json_ para ver si hay errores/posiciones en los nombres de las dependencias.


### Violación de acceso a la memoria (CWE-284)

Los ataques basados en la memoria o en el heap (pila) dependen de una combinación de errores de gestión de la memoria y un asignador de memoria explotable. Como todos los tiempos de ejecución, Node.js es vulnerable a estos ataques, si tus proyectos se ejecutan en una máquina compartida.

El uso de un heap seguro es útil para evitar que se filtre información sensible debido a la sobrecarga y subcarga de punteros.

Lamentablemente, la pila segura no está disponible en Windows.
Puedes encontrar más información en Node.js [secure-heap documentation][].

**Mitigaciones**

* Utilice `--secure-heap=n` dependiendo de su aplicación donde _n_ es el tamaño de bytes máximo asignado.
* No ejecute su aplicación de producción en una máquina compartida.

### Monkey Patching (CWE-349)

El "Monkey patching" se refiere a la modificación de las propiedades en tiempo de ejecución con el objetivo de cambiar el comportamiento existente. Ejemplo:

```js
// eslint-disable-next-line no-extend-native
Array.prototype.push = function (item) {
  // overriding the global [].push
};
```

**Mitigaciones**

El argumento `--frozen-intrinsics` habilita los intrínsecos experimentales[¹][experimental-features] intrínsecos congelados, lo que significa que todos los objetos y funciones incorporados de JavaScript se congelan recursivamente. Por lo tanto, el siguiente fragmento **no** anulará el comportamiento por defecto de `Array.prototype.push`

```js
// eslint-disable-next-line no-extend-native
Array.prototype.push = function (item) {
  // overriding the global [].push
};

// Uncaught:
// TypeError <Object <Object <[Object: null prototype] {}>>>:
// Cannot assign to read only property 'push' of object ''
```

Sin embargo, es importante mencionar que todavía puede definir nuevos globales y reemplazar
globales existentes utilizando `globalThis`.

```console
> globalThis.foo = 3; foo; // Todavía puede definir nuevos globales
3
> globalThis.Array = 4; Array; // Sin embargo, también puede reemplazar los globales existentes
4
```

Por lo tanto, `Object.freeze(globalThis)` puede utilizarse para garantizar que ningún global será
sustituido.

### Prototype Pollution Attacks (CWE-1321)

La contaminación de prototipos se refiere a la posibilidad de modificar o inyectar propiedades en elementos del lenguaje Javascript, abusando del uso del _\_proto\__, _constructor_, _prototype_ y y otras propiedades heredadas de prototipos incorporados (built-in).

<!-- eslint-skip -->

```js
const a = {"a": 1, "b": 2};
const data = JSON.parse('{"__proto__": { "polluted": true}}');

const c = Object.assign({}, a, data);
console.log(c.polluted); // true

// Potential DoS
const data2 = JSON.parse('{"__proto__": null}');
const d = Object.assign(a, data2);
d.hasOwnProperty('b'); // Uncaught TypeError: d.hasOwnProperty is not a function
```

Esta es una vulnerabilidad potencial heredada del lenguaje JavaScript

**Ejemplos**:

* [CVE-2022-21824][] (Node.js)
* [CVE-2018-3721][] (3rd Party library: Lodash)

**Mitigaciones**

* Evitar [fusiones recursivas inseguras][], ver [CVE-2018-16487][].
* Implementar validaciones de esquema JSON para peticiones externas o no confiables.
* Crear objetos sin prototipo usando `Object.create(null)`.
* Congelar el prototipo: `Object.freeze(MyObject.prototype)`.
* Desactivar la propiedad `Object.prototype.__proto__` usando el argumento `--disable-proto`.
* Comprobar que la propiedad existe directamente en el objeto, no desde el prototipo,
usando `Object.hasOwn(obj, keyFromObj)`.
* Evitar el uso de métodos de `Object.prototype`.


### Uncontrolled Search Path Element (CWE-427)

Node.js carga los módulos siguiendo el [Algoritmo de resolución de módulos][]. Por lo tanto, asume que el directorio en el que se solicita un módulo (require) es de confianza.

Por esto se espera el siguiente comportamiento de la aplicación. Asumiendo la siguiente estructura de directorios:

* _app/_
  * _server.js_
  * _auth.js_
  * _auth_

Si server.js utiliza `require('./auth')` seguirá el algoritmo de resolución de módulos
y cargará _auth_ en lugar de _auth.js_.

**Mitigaciones**

El uso del mecanismo experimental[¹][experimental-features][mecanismo de política con comprobación de integridad][] puede evitar la amenaza anterior. Para el directorio descrito anteriormente, se puede utilizar el siguiente `policy.json`

```json
{
  "resources": {
    "./app/auth.js": {
      "integrity": "sha256-iuGZ6SFVFpMuHUcJciQTIKpIyaQVigMZlvg9Lx66HV8="
    },
    "./app/server.js": {
      "dependencies": {
        "./auth" : "./app/auth.js"
      },
      "integrity": "sha256-NPtLCQ0ntPPWgfVEgX46ryTNpdvTWdQPoZO3kHo0bKI="
    }
  }
}
```

Por lo tanto, al requerir el módulo _auth_, el sistema validará la integridad y lanzará un error si no coincide con el esperado.

```console
» node --experimental-policy=policy.json app/server.js
node:internal/policy/sri:65
      throw new ERR_SRI_PARSE(str, str[prevIndex], prevIndex);
      ^

SyntaxError [ERR_SRI_PARSE]: Subresource Integrity string "sha256-iuGZ6SFVFpMuHUcJciQTIKpIyaQVigMZlvg9Lx66HV8=%" had an unexpected "%" at position 51
    at new NodeError (node:internal/errors:393:5)
    at Object.parse (node:internal/policy/sri:65:13)
    at processEntry (node:internal/policy/manifest:581:38)
    at Manifest.assertIntegrity (node:internal/policy/manifest:588:32)
    at Module._compile (node:internal/modules/cjs/loader:1119:21)
    at Module._extensions..js (node:internal/modules/cjs/loader:1213:10)
    at Module.load (node:internal/modules/cjs/loader:1037:32)
    at Module._load (node:internal/modules/cjs/loader:878:12)
    at Module.require (node:internal/modules/cjs/loader:1061:19)
    at require (node:internal/modules/cjs/helpers:99:18) {
  code: 'ERR_SRI_PARSE'
}
```

Tenga en cuenta que siempre se recomienda el uso de `--policy-integrity` para evitar mutaciones en las políticas.

## Funcionalidades experimentales en producción

No se recomienda el uso de funciones experimentales en producción.

Las características experimentales pueden sufrir cambios de ruptura si se necesitan, y su
funcionalidad no es estable de forma segura. Sin embargo, el feedback es muy apreciado.

[threat model]: https://github.com/nodejs/security-wg/issues/799
[security guidance issue]: https://github.com/nodejs/security-wg/issues/488
[nodejs guideline]: https://github.com/goldbergyoni/nodebestpractices
[OSSF Best Practices]: https://github.com/ossf/wg-best-practices-os-developers
[Slowloris]: https://en.wikipedia.org/wiki/Slowloris_(computer_security)
[`http.Server`]: https://nodejs.org/api/http.html#class-httpserver
[http docs]: https://nodejs.org/api/http.html
[--inspect switch]: https://nodejs.org/en/docs/guides/debugging-getting-started/
[same-origin policy]: https://nodejs.org/en/docs/guides/debugging-getting-started/
[DNS Rebinding wiki]: https://en.wikipedia.org/wiki/DNS_rebinding
[files property]: https://docs.npmjs.com/cli/v8/configuring-npm/package-json#files
[unpublish the package]: https://docs.npmjs.com/unpublishing-packages-from-the-registry
[CWE-444]: https://cwe.mitre.org/data/definitions/444.html
[RFC7230]: https://datatracker.ietf.org/doc/html/rfc7230#section-3
[policy mechanism]: https://nodejs.org/api/permissions.html#policies
[typosquatting]: https://en.wikipedia.org/wiki/Typosquatting
[Mitigations for lockfile poisoning]: https://securenodejsguidelines.ulisesgascon.com/attacks/lockfile-posioned#mitigation
[`npm ci`]: https://docs.npmjs.com/cli/v8/commands/npm-ci
[secure-heap documentation]: https://nodejs.org/dist/latest-v18.x/docs/api/cli.html#--secure-heapn
[CVE-2022-21824]: https://www.cvedetails.com/cve/CVE-2022-21824/
[CVE-2018-3721]: https://www.cvedetails.com/cve/CVE-2018-3721/
[insecure recursive merges]: https://gist.github.com/DaniAkash/b3d7159fddcff0a9ee035bd10e34b277#file-unsafe-merge-js
[CVE-2018-16487]: https://www.cve.org/CVERecord?id=CVE-2018-16487
[scrypt]: https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback
[Module Resolution Algorithm]: https://nodejs.org/api/modules.html#modules_all_together
[policy mechanism with integrity checking]: https://nodejs.org/api/permissions.html#integrity-checks
[experimental-features]: #experimental-features-in-production
[`Socket`]: https://socket.dev/
