---
title: Debugging - Getting Started
layout: docs.hbs
---

# Debugging Guide

This guide will help you get started debugging your Node.js apps and scripts.

## Enable Inspector

**NOTE**: The `--inspect` option and [Inspector Protocol][] are _experimental_ and may change.

When started with the **--inspect** switch, a Node.js process listens via WebSockets
for diagnostic commands as defined by the [Inspector Protocol][],
by default at host and port 127.0.0.1:9229. Each process is also assigned a
unique [UUID][] (e.g. `0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`).

Inspector clients must know and specify host address, port, and UUID to connect
to the WebSocket interface. The full URL is
`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`, of course dependent
on actual host and port and with the correct UUID for the instance.

Inspector also includes an HTTP endpoint to serve metadata about the debuggee,
including its WebSocket URL, UUID, and Chrome DevTools URL. Get this metadata
by sending an HTTP request to `http://[host:port]/json/list`.  This returns a
JSON object like the following; use the `webSocketDebuggerUrl` property as the
URL to connect directly to Inspector.

<!-- eslint-skip -->
```javascript
{
  "description": "node.js instance",
  "devtoolsFrontendUrl": "chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
  "faviconUrl": "https://nodejs.org/static/favicon.ico",
  "id": "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
  "title": "node",
  "type": "node",
  "url": "file://",
  "webSocketDebuggerUrl": "ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e"
}
```

A Node.js process started *without* `--inspect` can also be instructed to start
listening for debugging messages by signaling it with `SIGUSR1` (on Linux and
OS X). As of Node 7 this activates the legacy Debugger API; in Node 8 and later
it will activate the Inspector API.

---

## Inspector Clients

Several commercial and open source tools can connect to Node's Inspector. Basic
info on these follows:

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
* **Option 3**: Install the Chrome Extension NIM (Node Inspector Manager):
  https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

#### [VS Code](https://github.com/microsoft/vscode) 1.10+

* In the Debug panel, click the settings icon to open `.vscode/launch.json`.
  Select "Node.js" for initial setup.

#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ and other JetBrains IDEs

* Create a new Node.js debug configuration and hit Debug. `--inspect` will be used
  by default for Node.js 7+. To disable uncheck `js.debugger.node.use.inspect` in
  the IDE Registry.

#### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* Library to ease connections to Inspector Protocol endpoints.

---

## Command-line options

The following table lists the impact of various runtime flags on debugging:

<table cellpadding=0 cellspacing=0>
  <tr><th>Flag</th><th>Meaning</th></tr>
  <tr>
    <td>--inspect</td>
    <td>
      <ul>
        <li>Enable inspector agent</li>
        <li>Listen on default port (9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect=<i>port</i></td>
    <td>
      <ul>
        <li>Enable inspector agent</li>
        <li>Listen on port <i>port</i></li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk</td>
    <td>
      <ul>
        <li>Enable inspector agent</li>
        <li>Listen on default port (9229)</li>
        <li>Break before user code starts</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk=<i>port</i></td>
    <td>
      <ul>
        <li>Enable inspector agent</li>
        <li>Listen on port <i>port</i></li>
        <li>Break before user code starts</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect <i>script.js</i></code></td>
    <td>
      <ul>
        <li>Spawn child process to run user's script under --inspect flag;
            and use main process to run CLI debugger.</li>
      </ul>
    </td>
  </tr>
</table>

---

## Legacy Debugger

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
