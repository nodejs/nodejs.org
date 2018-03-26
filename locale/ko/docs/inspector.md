---
title: 인스펙터 도움말
layout: docs.hbs
---

<!--
# Debugging Node.js Apps

Many tools and libraries are available to help you debug your Node.js apps. Some
of these are listed below.

To connect manually rather than with a tool, pass the **--inspect** flag and
connect to the printed URL.

If a process was started without `--inspect`, signal it with SIGUSR1 to
activate the debugger and print the connection URL.

---
-->

# Node.js 애플리케이션 디버깅

Node.js 애플리케이션을 디버그에 도움이 되는 많은 도구와 라이브러리가 있습니다만, 그 중 일부만 소개합니다.

도구를 사용하지 않고 수동으로 연결하려면 **--inspect** 옵션을 사용하여 화면에 나타난 URL로 접속하세요.

`--inspect` 없이 프로세스를 시작했을 경우 SIGUSR1 신호를 보내 디버거를 활성화하면 연결 URL이 화면에 나타납니다.

<!--
## Inspector Tools & Clients

These commercial and open source tools make debugging Node.js apps easier.

### [node-inspect](https://github.com/nodejs/node-inspect)

* A CLI debugger developed at <https://github.com/nodejs/node-inspect>.
* Bundled with Node and invoked with `node inspect myscript.js`.
* Can also be installed independently with `npm install -g node-inspect`
  and invoked with `node-inspect myscript.js`.

### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* **Option 1**: Open `chrome://inspect` in a Chromium-based browser. Click the "Open dedicated DevTools for Node" link.
  are listed. Then select your Node.js app from the list.
* **Option 2**: Install the Chrome Extension NIM (Node Inspector Manager):
  https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj
-->

## 인스펙터 도구와 클라이언트

아래와 같은 상용, 오픈 소스 도구를 사용하면 Node.js 애플리케이션을 더 쉽게 디버깅 할 수 있습니다.

### [node-inspect](https://github.com/nodejs/node-inspect)

* 이 CLI 디버거는 <https://github.com/nodejs/node-inspect>에서 개발되고 있습니다.
* Node에 포함되어 있으며 `node inspect myscript.js`로 실행됩니다.
* 또한, `npm install -g node-inspect`로 직접 설치할 수 있으며, `node-inspect myscript.js`로 사용할 수 있습니다.

### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend)

* **옵션 1**: 크로미움 기반의 브라우저에서 `chrome://inspect`에 접속 후 "Open dedicated DevTools for Node"를 클릭하십시오.
* **옵션 2**: 크롬 확장프로그램 NIM(Node Inspector Manager)을 설치하세요.
  https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

<!--
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
-->

### [VS Code](https://github.com/microsoft/vscode) 1.10+

* 디버그 패널에서 설정 아이콘을 클릭하여 `.vscode/launch.json`을 열고 초기 설정을 위해 "Node.js"를 선택합니다.

### [Visual Studio](https://github.com/Microsoft/nodejstools)

* 메뉴에서 "Debug > Start Debugging"을 선택하거나 F5를 누릅니다.
* 자세한 안내는 [여기](https://github.com/Microsoft/nodejstools/wiki/Debugging)를 참고하세요.


### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ 및 기타 JetBrains IDE

* 새로운 Node.js 디버그 구성을 만들고 Debug를 누릅니다.

### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* 인스펙터 프로토콜 엔드포인트에 쉽게 연결할 수 있는 라이브러리입니다.


<!--
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
        <li>Spawn child process to run user's script under --inspect flag; and use main process to run CLI debugger.</li>
        <li>Listen on port <i>port</i> (default: 9229)</li>
      </ul>
    </td>
  </tr>
</table>
-->

## 커맨드라인 옵션

아래의 표는 다양한 런타임 옵션이 디버깅에 미치는 영향을 나타냅니다.

<table cellpadding=0 cellspacing=0>
  <tr><th>옵션</th><th>의미</th></tr>
  <tr>
    <td>--inspect</td>
    <td>
      <ul>
        <li>인스펙터 에이전트를 활성화합니다</li>
        <li>기본 주소와 포트로 수신합니다 (127.0.0.1:9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect=<i>[host:port]</i></td>
    <td>
      <ul>
        <li>인스펙터 에이전트를 활성화합니다</li>
        <li><i>host</i>에 해당하는 주소나 호스트네임으로 바인딩합니다 (기본값: 127.0.0.1)</li>
        <li><i>port</i>에 해당하는 포트로 수신합니다 (기본값: 9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk</td>
    <td>
      <ul>
        <li>인스펙터 에이전트를 활성화합니다</li>
        <li>기본 주소와 포트로 수신합니다 (127.0.0.1:9229)</li>
        <li>사용자의 코드를 시작하기 전에 중단합니다</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk=<i>[host:port]</i></td>
    <td>
      <ul>
        <li>인스펙터 에이전트를 활성화합니다</li>
        <li><i>host</i>에 해당하는 주소나 호스트네임으로 바인딩합니다 (기본값: 127.0.0.1)</li>
        <li><i>port</i>에 해당하는 포트로 수신합니다 (기본값: 9229)</li>
        <li>사용자의 코드를 시작하기 전에 중단합니다</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect <i>script.js</i></code></td>
    <td>
      <ul>
        <li>--inspect 옵션으로 사용자의 스크립트를 실행하는 하위 프로세스를 생성하고, 메인 프로세스로 CLI 디버거를 실행합니다.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect --port=xxxx <i>script.js</i></code></td>
    <td>
      <ul>
        <li>--inspect 옵션으로 사용자의 스크립트를 실행하는 하위 프로세스를 생성하고, 메인 프로세스로 CLI 디버거를 실행합니다.</li>
        <li><i>port</i>에 해당하는 포트로 수신합니다 (기본값: 9229)</li>
      </ul>
    </td>
  </tr>
</table>