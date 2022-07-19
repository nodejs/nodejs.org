---
title: შეცდომების აღმოჩენა/აღმოფხვრა - პირველი ნაბიჯები
layout: docs.hbs
---

# Debugging Guide

წინამდებარე სახელმძღვანელო დაგეხმარებათ შეისწავლოთ Node.js-აპლიკაციებისა და სკრიპტების გამართვა.

## ინსპექტორის გააქტიურება

როდესაც `--inspect` არგუმენტით ეშვება, Node.js პროცესი უსმენს შეცდომათა აღმომჩენ
(გამმართავ) კლიენტს. ნაგულისხმევად, იგი მოუსმენს შემდეგ ჰოსტზე (*მასპინძელზე*) და პორტზე: 127.0.0.1:9229.
თითოეულ პროცესს ასევე ენიჭება უნიკალური [UUID][].

კავშირის დასამყარებლად ინსპექტორმა კლიენტებმა უნდა იცოდნენ და მიუთითონ ჰოსტის მისამართი, პორტი და UUID.
სრული URL დაახლოებით ასე უნდა გამოიყურებოდეს:
`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`.

Node.js ასევე დაიწყებს გამართვის შეტყობინებათა მოსმენას, თუკი იგი მიიღებს `SIGUSR1` სიგნალს
(`SIGUSR1` ხელმისაწვდომი არ არის Windows-ის გარემოში). Node.js-ის მე-7 და უფრო ძველ ვერსიებში
ეს გაააქტიურებს მოძველებულ Debugger API-ს. Node.js-ის მე-8 და უფრო ახალ ვერსიებში Inspector API
გააქტიურდება.

---
## გავლენა უსაფრთხოების დონეზე

რამდენადაც გამმართველს სრული წვდომა აქვს Node.js გამშვებ გარემოზე, ბოროტმოქმედს,
რომელსაც შეუძლია ამ პორტთან დაკავშირება, შესაძლებლობა ეძლევა Node.js პროცესის სახელით
გაუშვას თვითნებური კოდი. აქედან გამომდინარე, მნიშვნელოვანია გვესმოდეს გამმართველის პორტის
საჯარო ან კერძო ქსელში გამჟღავნების [უარყოფითი] გავლენა უსაფრთხოების დონეზე.

### გამართვის (debug) პორტის გასაჯაროება სახიფათოა

If the debugger is bound to a public IP address, or to 0.0.0.0, any clients that
can reach your IP address will be able to connect to the debugger without any
restriction and will be able to run arbitrary code.

By default `node --inspect` binds to 127.0.0.1. You explicitly need to provide a
public IP address or 0.0.0.0, etc., if you intend to allow external connections
to the debugger. Doing so may expose you to a potentially significant security
threat. We suggest you ensure appropriate firewalls and access controls in place
to prevent a security exposure.

See the section on '[Enabling remote debugging scenarios](#enabling-remote-debugging-scenarios)' on some advice on how
to safely allow remote debugger clients to connect.

### Local applications have full access to the inspector

Even if you bind the inspector port to 127.0.0.1 (the default), any applications
running locally on your machine will have unrestricted access. This is by design
to allow local debuggers to be able to attach conveniently.

### Browsers, WebSockets and same-origin policy

Websites open in a web-browser can make WebSocket and HTTP requests under the
browser security model. An initial HTTP connection is necessary to obtain a
unique debugger session id. The same-origin-policy prevents websites from being
able to make this HTTP connection. For additional security against
[DNS rebinding attacks](https://en.wikipedia.org/wiki/DNS_rebinding), Node.js
verifies that the 'Host' headers for the connection either
specify an IP address or `localhost` or `localhost6` precisely.

These security policies disallow connecting to a remote debug server by
specifying the hostname. You can work-around this restriction by specifying
either the IP address or by using ssh tunnels as described below.

## Inspector Clients

A minimal CLI debugger is available with `node inspect myscript.js`.
Several commercial and open source tools can also connect to the Node.js Inspector.

### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+, [Microsoft Edge](https://www.microsoftedgeinsider.com)

* **Option 1**: Open `chrome://inspect` in a Chromium-based
  browser or `edge://inspect` in Edge. Click the Configure button and ensure your target host and port
  are listed.
* **Option 2**: Copy the `devtoolsFrontendUrl` from the output of `/json/list`
  (see above) or the --inspect hint text and paste into Chrome.

> Note that the Node.js and the Chrome need to be run on the same platform.

### [Visual Studio Code](https://github.com/microsoft/vscode) 1.10+

* In the Debug panel, click the settings icon to open `.vscode/launch.json`.
  Select "Node.js" for initial setup.

### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017+

* Choose "Debug > Start Debugging" from the menu or hit F5.
* [Detailed instructions](https://github.com/Microsoft/nodejstools/wiki/Debugging).

### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) and other JetBrains IDEs

* Create a new Node.js debug configuration and hit Debug. `--inspect` will be used
  by default for Node.js 7+. To disable uncheck `js.debugger.node.use.inspect` in
  the IDE Registry. To learn more about running and debugging Node.js in WebStorm and other JetBrains IDEs,
  check out [WebStorm online help](https://www.jetbrains.com/help/webstorm/running-and-debugging-node-js.html).

### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* Library to ease connections to [Inspector Protocol][] endpoints.

### [Gitpod](https://www.gitpod.io)

* Start a Node.js debug configuration from the `Debug` view or hit `F5`. [Detailed instructions](https://medium.com/gitpod/debugging-node-js-applications-in-theia-76c94c76f0a1)

### [Eclipse IDE](https://eclipse.org/eclipseide) with Eclipse Wild Web Developer extension

* From a .js file, choose "Debug As... > Node program", or
* Create a Debug Configuration to attach debugger to running Node.js application (already started with `--inspect`).

---

## Command-line options

The following table lists the impact of various runtime flags on debugging:

<table class="table-no-border-no-padding">
  <tr><th>Flag</th><th>Meaning</th></tr>
  <tr>
    <td>--inspect</td>
    <td>
      <ul>
        <li>Enable inspector agent</li>
        <li>Listen on default address and port (127.0.0.1:9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect=<em>[host:port]</em></td>
    <td>
      <ul>
        <li>Enable inspector agent</li>
        <li>Bind to address or hostname <em>host</em> (default: 127.0.0.1)</li>
        <li>Listen on port <em>port</em> (default: 9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk</td>
    <td>
      <ul>
        <li>Enable inspector agent</li>
        <li>Listen on default address and port (127.0.0.1:9229)</li>
        <li>Break before user code starts</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk=<em>[host:port]</em></td>
    <td>
      <ul>
        <li>Enable inspector agent</li>
        <li>Bind to address or hostname <em>host</em> (default: 127.0.0.1)</li>
        <li>Listen on port <em>port</em> (default: 9229)</li>
        <li>Break before user code starts</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect <em>script.js</em></code></td>
    <td>
      <ul>
        <li>Spawn child process to run user's script under --inspect flag;
            and use main process to run CLI debugger.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect --port=xxxx <em>script.js</em></code></td>
    <td>
      <ul>
        <li>Spawn child process to run user's script under --inspect flag;
            and use main process to run CLI debugger.</li>
        <li>Listen on port <em>port</em> (default: 9229)</li>
      </ul>
    </td>
  </tr>
</table>

---

## Enabling remote debugging scenarios

We recommend that you never have the debugger listen on a public IP address. If
you need to allow remote debugging connections we recommend the use of ssh
tunnels instead. We provide the following example for illustrative purposes only.
Please understand the security risk of allowing remote access to a privileged
service before proceeding.

Let's say you are running Node.js on a remote machine, remote.example.com, that
you want to be able to debug. On that machine, you should start the node process
with the inspector listening only to localhost (the default).

```bash
node --inspect server.js
```

Now, on your local machine from where you want to initiate a debug client
connection, you can setup an ssh tunnel:

```bash
ssh -L 9221:localhost:9229 user@remote.example.com
```

This starts a ssh tunnel session where a connection to port 9221 on your local
machine will be forwarded to port 9229 on remote.example.com. You can now attach
a debugger such as Chrome DevTools or Visual Studio Code to localhost:9221,
which should be able to debug as if the Node.js application was running locally.

---

## Legacy Debugger

**The legacy debugger has been deprecated as of Node.js 7.7.0. Please use
`--inspect` and Inspector instead.**

When started with the **--debug** or **--debug-brk** switches in version 7 and
earlier, Node.js listens for debugging commands defined by the discontinued
V8 Debugging Protocol on a TCP port, by default `5858`. Any debugger client
which speaks this protocol can connect to and debug the running process; a
couple popular ones are listed below.

The V8 Debugging Protocol is no longer maintained or documented.

### [Built-in Debugger](https://nodejs.org/dist/{#var currentVersion}/docs/api/debugger.html)

Start `node debug script_name.js` to start your script under the builtin
command-line debugger. Your script starts in another Node.js process started with
the `--debug-brk` option, and the initial Node.js process runs the `_debugger.js`
script and connects to your target.

### [node-inspector](https://github.com/node-inspector/node-inspector)

Debug your Node.js app with Chrome DevTools by using an intermediary process
which translates the [Inspector Protocol][] used in Chromium to the V8 Debugger
protocol used in Node.js.

<!-- refs -->

[Inspector Protocol]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122
