---
title: Inspector Help
layout: docs.hbs
---

# Debugging Node.js Apps

Many tools and libraries are available to help you debug your Node.js apps. Some
of these are listed below.

To connect manually rather than with a tool, pass the **--inspect** flag and
connect to the printed URL.

If a process was started without `--inspect`, signal it with SIGUSR1 to
activate the debugger and print the connection URL.

---

## Inspector Tools & Clients

These commercial and open source tools make debugging Node.js apps easier.

### [node-inspect](https://github.com/nodejs/node-inspect)

* A CLI debugger developed at <https://github.com/nodejs/node-inspect>.
* Bundled with Node and invoked with `node inspect myscript.js`.
* Can also be installed independently with `npm install -g node-inspect`
  and invoked with `node-inspect myscript.js`.

### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend)

* **Option 1**: Open `chrome://inspect` in a Chromium-based
  browser. Click the "Open dedicated DevTools for Node" link.
* **Option 2**: Install the Chrome Extension NIM (Node Inspector Manager):
  https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

### [VS Code](https://github.com/microsoft/vscode) 1.10+

* In the Debug panel, click the settings icon to open `.vscode/launch.json`.
  Select "Node.js" for initial setup.

### [Visual Studio](https://github.com/Microsoft/nodejstools)

* Choose "Debug > Start Debugging" from the menu or hit F5.
* [Detailed instructions](https://github.com/Microsoft/nodejstools/wiki/Debugging).

### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ and other JetBrains IDEs

* Create a new Node.js debug configuration and hit Debug.

### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

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
        <li>Listen on default address and port (127.0.0.1:9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect=<i>[host:port]</i></td>
    <td>
      <ul>
        <li>Enable inspector agent</li>
        <li>Bind to address or hostname <i>host</i> (default: 127.0.0.1)</li>
        <li>Listen on port <i>port</i> (default: 9229)</li>
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
    <td>--inspect-brk=<i>[host:port]</i></td>
    <td>
      <ul>
        <li>Enable inspector agent</li>
        <li>Bind to address or hostname <i>host</i> (default: 127.0.0.1)</li>
        <li>Listen on port <i>port</i> (default: 9229)</li>
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
  <tr>
    <td><code>node inspect --port=xxxx <i>script.js</i></code></td>
    <td>
      <ul>
        <li>Spawn child process to run user's script under --inspect flag;
            and use main process to run CLI debugger.</li>
        <li>Listen on port <i>port</i> (default: 9229)</li>
      </ul>
    </td>
  </tr>
</table>
