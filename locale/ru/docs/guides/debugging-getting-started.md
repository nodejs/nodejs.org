---
title: Отладка - Начало работы
layout: docs.hbs
---

# Руководство по отладке

Это руководство призвано помочь вам в отладке вашего Node.js Приложения или скрипта.

## Включение 'Инспектора'

При запуске с параметром `--inspect`,  Node.js Начинает прослушку 
клиента отладки. По умолчанию он будет прослушивать хост 127.0.0.1 на порту 9229.
Каждому процессу присваивается уникальный [UUID][].

В клиенте инспектора вы должны знать и указывать адрес хоста, порт и UUID для соединения.
Полный URL будет выглядеть примерно так:
`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`.

Node.js также начнет прослушивание сообщений отладки если он получит
Сигнал `SIGUSR1` (`SIGUSR1` Не доступен в Windows) В Node.js 7 и
ранее, он активирует старый API отладчика. В Node.js 8  и позже, он будет
активировать API инспектора.

---
## Последствия для безопасности

Так как отладчик имеет полный доступ к Node.js, то
злоумышленник, способный подключиться к этому порту, может выполнить произвольный
код от имени процесса Node.js. Важно понимать, безопасность 
предоставления порта отладчика в общих и частных сетях.

### Публичное предоставление порта отладки небезопасно

Если отладчик привязан к вашему публичному IP адрессу, или к 0.0.0.0, другие клиенты дошедшие до вашего IP адресса смогут без проблем подключиться к вашему отладчику без каких либо ограничений, и смогут запускать произвольный код.

По умолчанию `node --inspect` привязан к 127.0.0.1. Вы предоставив публичный
IP адресс или 0.0.0.0, и тп., обеспечив возсожность внешнего подключения.
Обеспечте соответствующие брандмауэры и контроль доступа на месте,
чтобы предотвратить угрозу безопасности.

См. раздел "[включение сценариев удаленной отладки](#enabling-remote-debugging-scenarios)' с некоторыми советами о том, как
чтобы благоразумно разрешить клиентам удаленную отладку.

### Локальные приложения имеют полный доступ к инспектору

Даже если вы привязываете порт инспектора к 127.0.0.1 (по умолчанию), любые приложения
запускаемые локально на вашем компьютере будут иметь неограниченный доступ. Это
для того, чтобы местные отладчики могли иметь возможность без труда присоедениться.

### Браузер, WebSockets и правило ограничения домена

Веб-сайты открытые в браузере могут открывать WebSocket и делать HTTP запросы модели 
безопасности браузера. Начальное HTTP-соединение необходимо для получения
уникального id сеанса отладчика. Правило ограничения домена запрещает веб-сайтам
возможность сделать это HTTP-соединение. Для дополнительной безопасности против
[Атаки повторной привязки DNS](https://ru.wikipedia.org/wiki/DNS_rebinding), Node.js
проверяет, что заголовки 'Host' для подключения 
укажите IP-адрес либо "localhost" или "localhost6".

Эта политика безопасности запрещает подключение к удаленному серверу отладки
через указание имени хоста. Это ограничение можно обойти, указав
либо IP-адрес, либо с помощью SSH-туннелей, как описано ниже.

## Клиенты Инспектора

Список нескольких коммерческих инструментов, и инструментов с открытым исходным кодом которые имеют возможность подключаться к инспектору.
Основная информация о них следующая:

#### [node-inspect](https://github.com/nodejs/node-inspect)

* CLI Debugger supported by the Node.js Foundation which uses the [Inspector Protocol][].
* A version is bundled with Node and can be used with `node inspect myscript.js`.
* The latest version can also be installed independently (e.g. `npm install -g node-inspect`)
  and used with `node-inspect myscript.js`.

#### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* **Option 1**: Open `chrome://inspect` in a Chromium-based
  browser. Click the Configure button and ensure your target host and port
  are listed.
* **Option 2**: Copy the `devtoolsFrontendUrl` from the output of `/json/list`
  (see above) or the --inspect hint text and paste into Chrome.

#### [Visual Studio Code](https://github.com/microsoft/vscode) 1.10+

* In the Debug panel, click the settings icon to open `.vscode/launch.json`.
  Select "Node.js" for initial setup.

#### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* Choose "Debug > Start Debugging" from the menu or hit F5.
* [Detailed instructions](https://github.com/Microsoft/nodejstools/wiki/Debugging).

#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ and other JetBrains IDEs

* Create a new Node.js debug configuration and hit Debug. `--inspect` will be used
  by default for Node.js 7+. To disable uncheck `js.debugger.node.use.inspect` in
  the IDE Registry.

#### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* Library to ease connections to Inspector Protocol endpoints.

#### [Gitpod](https://www.gitpod.io)

* Start a Node.js debug configuration from the `Debug` view or hit `F5`. [Detailed instructions](https://medium.com/gitpod/debugging-node-js-applications-in-theia-76c94c76f0a1)

---

## Опции командной строки

В следующей таблице показано влияние различных флагов на отладку:

<table cellpadding="0" cellspacing="0">
  <tr><th>Флаг</th><th>Значение</th></tr>
  <tr>
    <td>--inspect</td>
    <td>
      <ul>
        <li>Включить инспектора</li>
        <li>Прослушивание адреса и порта по умолчанию (127.0.0.1:9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect=<i>[host:port]</i></td>
    <td>
      <ul>
        <li>Включить инспектора</li>
        <li>Привязать к хосту или порту <i>host</i> (default: 127.0.0.1)</li>
        <li>Прослушивать порт <i>port</i> (default: 9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk</td>
    <td>
      <ul>
        <li>Включить инспектора</li>
        <li>Прослушать дефолтный хост и порт (127.0.0.1:9229)</li>
        <li>Останавливает перед исполнением пользовательского кода</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk=<i>[host:port]</i></td>
    <td>
      <ul>
        <li>Включить инспектора</li>
        <li>Привязать к хосту или порту <i>host</i> (default: 127.0.0.1)</li>
        <li>Прослушивать порт <i>port</i> (default: 9229)</li>
        <li>Останавливает перед исполнением пользовательского кода</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect <i>script.js</i></code></td>
    <td>
      <ul>
        <li>Породит дочерний процесс, чтобы запустить пользовательские скрипты при флаге --inspect;
             и использовать основной процесс для ClI отладчика</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect --port=xxxx <i>script.js</i></code></td>
    <td>
      <ul>
        <li>Породит дочерний процесс, чтобы запустить пользовательские скрипты при флаге --inspect;
             и использовать основной процесс для ClI отладчика</li>
        <li>Прослушивать порт <i>port</i> (default: 9229)</li>
      </ul>
    </td>
  </tr>
</table>

---

## Включение сценариев удаленной отладки

Мы рекомендуем не использовать публичный IP адресс для отладки. Если
необходимо разрешить удаленную отладку соединений используйте ssh
туннели. Мы приводим следующий пример только в демонстративных целях.
Пожалуйста, осознайте опасность удалённого обслуживания.

Допустим, вы используете node.js на удаленной машине, remote.example.com, вы
хотите иметь возможность отладки. На этой машине следует запустить процесс node.js
с инспектором, прослушивая только localhost (по умолчанию).

```bash
$ node --inspect server.js
```

Теперь на локальном компьютере, с которого вы хотите запустить клиент отладки, 
вы можете настроить ssh туннель:

```bash
$ ssh -L 9221:localhost:9229 user@remote.example.com
```

Это запускает сеанс туннеля ssh, где соединение с портом 9221 на локальном компьютере,
машина будет перенаправлена к порту 9229, а как следствие, к remote.example.com. Теперь вы можете прикрепить
отладчик, например Chrome DevTools или Visual Studio Code к localhost: 9221,
который должен быть в состоянии отладки, как если бы node.js приложение выполнялось локально.

---

## Старый отладчик

**The legacy debugger has been deprecated as of Node 7.7.0. Please use --inspect
and Inspector instead.**

When started with the **--debug** or **--debug-brk** switches in version 7 and
earlier, Node.js listens for debugging commands defined by the discontinued
V8 Debugging Protocol on a TCP port, by default `5858`. Any debugger client
which speaks this protocol can connect to and debug the running process; a
couple popular ones are listed below.

The V8 Debugging Protocol is no longer maintained or documented.

#### [Built-in Debugger](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Start `node debug script_name.js` to start your script under Node's builtin
command-line debugger. Your script starts in another Node process started with
the `--debug-brk` option, and the initial Node process runs the `_debugger.js`
script and connects to your target.

#### [node-inspector](https://github.com/node-inspector/node-inspector)

Debug your Node.js app with Chrome DevTools by using an intermediary process
which translates the Inspector Protocol used in Chromium to the V8 Debugger
protocol used in Node.js.

<!-- refs -->

[Inspector Protocol]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122

