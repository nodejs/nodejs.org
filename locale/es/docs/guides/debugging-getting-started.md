---
title: Depuración - Empezando
layout: docs.hbs
---

# Guía de Depuración

Esta guía lo ayudará a comenzar a depurar sus aplicaciones y scripts de Node.js.

## Habilitar Inspector

Cuando se inicia con el modificador `--inspect`, un proceso de Node.js escucha a un cliente de depuración. De forma predeterminada, escuchará en el host y el puerto 127.0.0.1:9229. A cada proceso también se le asigna un [UUID](https://tools.ietf.org/html/rfc4122) único.

Los clientes de Inspector deben conocer y especificar la dirección de host, el puerto y el UUID para conectarse. Una URL completa se verá algo así como `ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`.

Node.js también comenzará a escuchar mensajes de depuración si recibe una señal `SIGUSR1`. (`SIGUSR1` no está disponible en Windows). En Node.js 7 y versiones anteriores, esto activa la API de depuración heredada. En Node.js 8 y posteriores, activará la API Inspector.

---
## Implicaciones de Seguridad

Dado que el depurador tiene acceso completo al entorno de ejecución de Node.js, un actor malintencionado que pueda conectarse a este puerto puede ejecutar código arbitrario en nombre del proceso de Node.js. Es importante comprender las implicaciones de seguridad de exponer el puerto del depurador en redes públicas y privadas.

### Exponer el puerto de depuración públicamente no es seguro

Si el depurador está vinculado a una dirección IP pública, o a 0.0.0.0, cualquier cliente que pueda llegar a su dirección IP podrá conectarse al depurador sin ninguna restricción y podrá ejecutar código arbitrario.

Por defecto, `node --inspect` se une a 127.0.0.1. Debe proporcionar explícitamente una dirección IP pública o 0.0.0.0, etc., si pretende permitir conexiones externas al depurador. Hacerlo puede exponerlo a una amenaza de seguridad potencialmente significativa. Le sugerimos que se asegure de contar con firewalls y controles de acceso adecuados para evitar una exposición a la seguridad.

Consulte la sección sobre '[Habilitación de escenarios de depuración remota](#enabling-remote-debugging-scenarios)' para obtener algunos consejos sobre cómo permitir que los clientes del depurador remoto se conecten de forma segura.

### Las aplicaciones locales tienen acceso completo al inspector

Incluso si vincula el puerto del inspector a 127.0.0.1 (el valor predeterminado), cualquier aplicación que se ejecute localmente en su máquina tendrá acceso sin restricciones. Esto está diseñado para permitir que los depuradores locales puedan conectarse cómodamente.

### Navegadores, WebSockets y política del mismo origen

Los sitios web abiertos en un navegador web pueden realizar solicitudes WebSocket y HTTP bajo el modelo de seguridad del navegador. Es necesaria una conexión HTTP inicial para obtener un ID de sesión de depurador único. La política del mismo origen evita que los sitios web puedan realizar esta conexión HTTP. Para mayor seguridad contra [ataques de rebinding de DNS](https://es.wikipedia.org/wiki/DNS_rebinding), Node.js verifica que los encabezados 'Host' para la conexión especifiquen una dirección IP o `localhost` o` localhost6 `precisamente.

Estas políticas de seguridad no permiten la conexión a un servidor de depuración remoto especificando el nombre de host. Puede solucionar esta restricción especificando la dirección IP o utilizando túneles ssh como se describe a continuación.

## Clientes inspectores

Varias herramientas comerciales y de código abierto se pueden conectar al Inspector de Node.js. Información básica sobre estos a continuación:

### [inspección de nodo](https://github.com/nodejs/node-inspect)

* Depurador de CLI compatible con Node.js Foundation que utiliza el [Protocolo de inspector](https://chromedevtools.github.io/debugger-protocol-viewer/v8/).
* Se incluye una versión con Node.js y se puede usar con `node inspect myscript.js`.
* La última versión también se puede instalar de forma independiente (por ejemplo, `npm install -g node-inspect`) y usarse con` node-inspect myscript.js`.

### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+, [Microsoft Edge](https://www.microsoftedgeinsider.com)

* **Opción 1**: Abra `chrome://inspect` en un navegador basado en Chromium o` edge://inspect` en Edge. Haga clic en el botón Configurar y asegúrese de que su host y puerto de destino estén en la lista.
* **Opción 2**: Copie `devtoolsFrontendUrl` de la salida de` /json/list` (ver arriba) o el texto de sugerencia --inspect y péguelo en Chrome.

### [Código de Visual Studio](https://github.com/microsoft/vscode) 1.10+

* En el panel Depurar, haga clic en el icono de configuración para abrir `.vscode/launch.json`. Seleccione "Node.js" para la configuración inicial.

### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* Elija "Depurar> Iniciar depuración" en el menú o presione F5.
* [Instrucciones detalladas](https://github.com/Microsoft/nodejstools/wiki/Debugging).

### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ y otros IDE de JetBrains

* Cree una nueva configuración de depuración de Node.js y presione Debug. `--inspect` se utilizará de forma predeterminada para Node.js 7+. Para deshabilitar, desmarque `js.debugger.node.use.inspect` en el Registro IDE.

### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* Biblioteca para facilitar las conexiones a los puntos finales del Inspector Protocol.

### [Gitpod](https://www.gitpod.io)

* Inicie una configuración de depuración de Node.js desde la vista `Depurar` o presione` F5`. [Instrucciones detalladas](https://medium.com/gitpod/debugging-node-js-applications-in-theia-76c94c76f0a1)

### [Eclipse IDE](https://eclipse.org/eclipseide) con la extensión Eclipse Wild Web Developer

* Desde un archivo .js, elija "Depurar como ...> Programa de Node", o
* Cree una configuración de depuración para adjuntar el depurador a la aplicación Node.js en ejecución (ya se inició con `--inspect`).

---

## Opciones de la línea de comandos

La siguiente tabla enumera el impacto de varios indicadores de tiempo de ejecución en la depuración:

<table class="table-no-border-no-padding">
  <tr><th>Bandera</th><th>Significado</th></tr>
  <tr>
    <td>--inspect</td>
    <td>
      <ul>
        <li>Habilitar agente inspector</li>
        <li>Escuche en la dirección y el puerto predeterminados (127.0.0.1:9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect=<em>[host:port]</em></td>
    <td>
      <ul>
        <li>Habilitar agente inspector</li>
        <li>Vincular a la dirección o al nombre de host <em>host</em> (default: 127.0.0.1)</li>
        <li>Escuche en el puerto <em>port</em> (default: 9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk</td>
    <td>
      <ul>
        <li>Habilitar agente inspector</li>
        <li>Escuche en la dirección y el puerto predeterminados (127.0.0.1:9229)</li>
        <li>Romper antes de que comience el código de usuario</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk=<em>[host:port]</em></td>
    <td>
      <ul>
        <li>Habilitar agente inspector</li>
        <li>Vincular a la dirección o al nombre de host <em>host</em> (default: 127.0.0.1)</li>
        <li>Escuche en el puerto <em>port</em> (default: 9229)</li>
        <li>Romper antes de que comience el código de usuario</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect <em>script.js</em></code></td>
    <td>
      <ul>
        <li>Genera un proceso hijo para ejecutar el script del usuario bajo el indicador --inspect;
            y utilice el proceso principal para ejecutar el depurador CLI.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect --port=xxxx <em>script.js</em></code></td>
    <td>
      <ul>
        <li>Genera un proceso hijo para ejecutar el script del usuario bajo el indicador --inspect;
            y utilice el proceso principal para ejecutar el depurador CLI.</li>
        <li>Escuche en el puerto <em>port</em> (default: 9229)</li>
      </ul>
    </td>
  </tr>
</table>

---

## Habilitación de escenarios de depuración remota

Recomendamos que nunca haga que el depurador escuche en una dirección IP pública. Si necesita permitir conexiones de depuración remota, le recomendamos el uso de túneles ssh en su lugar. Proporcionamos el siguiente ejemplo solo con fines ilustrativos. Comprenda el riesgo de seguridad de permitir el acceso remoto a un servicio privilegiado antes de continuar.

Supongamos que está ejecutando Node.js en una máquina remota, remote.example.com, que desea poder depurar. En esa máquina, debe iniciar el proceso del nodo con el inspector escuchando solo a localhost (el predeterminado).

```bash
node --inspect server.js
```

Ahora, en su máquina local desde donde desea iniciar una conexión de cliente de depuración, puede configurar un túnel ssh:

```bash
ssh -L 9221:localhost:9229 user@remote.example.com
```

Esto inicia una sesión de túnel ssh donde una conexión al puerto 9221 en su máquina local será reenviada al puerto 9229 en remote.example.com. Ahora puede adjuntar un depurador como Chrome DevTools o Visual Studio Code a localhost:9221, que debería poder depurar como si la aplicación Node.js se estuviera ejecutando localmente.

---

## Depurador heredado

**El depurador heredado ha quedado obsoleto a partir de Node.js 7.7.0. En su lugar, utilice `--inspect` e Inspector. **

Cuando se inicia con los conmutadores **--debug** o **-- debug-brk** en la versión 7 y anteriores, Node.js escucha los comandos de depuración definidos por el protocolo de depuración V8 descontinuado en un puerto TCP, por defecto `5858`. Cualquier cliente depurador que habla este protocolo puede conectarse y depurar el proceso en ejecución; a continuación se enumeran un par de populares.

El protocolo de depuración V8 ya no se mantiene ni se documenta.

### [Depurador integrado](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Inicie `node debug script_name.js` para iniciar su secuencia de comandos bajo el depurador de línea de comandos incorporado. Su secuencia de comandos comienza en otro proceso de Node.js que comenzó con la opción `--debug-brk`, y el proceso inicial de Node.js ejecuta la secuencia de comandos `_debugger.js` y se conecta a su objetivo.

### [inspector de nodos](https://github.com/node-inspector/node-inspector)

Depura tu aplicación Node.js con Chrome DevTools mediante un proceso intermediario que traduce el protocolo Inspector utilizado en Chromium al protocolo V8 Debugger utilizado en Node.js.

<!-- refs -->
