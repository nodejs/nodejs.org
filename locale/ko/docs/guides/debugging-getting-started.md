---
title: 디버깅 - 시작하기
layout: docs.hbs
---

<!--
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
-->

# 디버깅 가이드

이 문서는 Node.js 앱과 스크립트의 디버깅을 도울 것입니다.

## 인스펙터 활성화

**NOTE**: `--inspect` 옵션과 [Inspector 프로토콜][]은 _실험 단계_이고 변경될 수 있습니다.

**--inspect** 스위치로 시작하면 Node.js 프로세스가 [Inspector 프로토콜][]에서 정의된
진단 명령어를 웹소켓으로 받습니다. [Inspector 프로토콜][]은 기본적으로 127.0.0.1:9229를
사용합니다. 각 프로세스에는 고유한 [UUID][](예: `0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`)도
할당됩니다.

인스펙터 클라이언트가 웹소켓 인터페이스로 접속하기 위해 호스트 주소, 포트, UUID를 알고 지정해야 합니다.
전체 URL은 `ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`와 같고 당연히
인스턴스의 실제 호스트와 포트, UUID에 따라 달라집니다.

인스펙터도 디버깅 대상에 대한 메타데이터를 제공하는 HTTP 엔드포인트를 가집니다. 이 메타데이터에는
웹소켓 URL, UUID, 크롬 개발자도구 URL이 포함됩니다. `http://[host:port]/json/list`에
HTTP 요청을 보내서 이 메타데이터를 받을 수 있습니다. 이는 다음과 같은 JSON 객체를 반환합니다.
인스펙터에 직접 접속하려면 URL로 `webSocketDebuggerUrl` 프로퍼티를 사용하세요.

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

`--inspect` *없이* 시작된 Node.js 프로세스에도 `SIGUSR1` 신호(Linux와 OS X에서)를 보내서
디버깅 메시지를 받도록 지시할 수 있습니다. Node 7부터는 레거시 디버거 API를 활성화하고
Node 8 부터는 인스펙터 API를 활성화할 것입니다.

---

<!--
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
-->

## 인스펙터 클라이언트

Node 인스펙터에 접속할 수 있는 여러 상용 도구와 오픈소스 도구가 있습니다.
아래에 이러한 도구들을 간략하게 정리했습니다.

#### [node-inspect](https://github.com/nodejs/node-inspect)

* Node.js 재단에서 지원하는 CLI 디버거로 [Inspector 프로토콜][]을 사용합니다.
* Node에 포함되어 있고 `node inspect myscript.js`로 사용할 수 있습니다.
* 최신 버전을 별도로 설치할 수 있고(예시: `npm install -g node-inspect`)
  `node-inspect myscript.js`로 사용할 수 있습니다.

#### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* **방법 1**: 크로미움에 기반을 둔 브라우저에서 `chrome://inspect`를 엽니다.
  Configure 버튼을 눌러서 대상 호스트와 포트 목록을 확인합니다.
* **방법 2**: `/json/list`(상단 참고)의 출력에서 `devtoolsFrontendUrl`을
  복사하거나 --inspect가 알려준 텍스트에서 복사해서 크롬에 붙여넣기를 합니다.

<!--
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
-->

#### [VS Code](https://github.com/microsoft/vscode) 1.10+

* Debug 패널에서 설정 아이콘을 클릭해서 `.vscode/launch.json`을 엽니다.
  초기 설정으로 "Node.js"를 선택하세요.

#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+와 다른 JetBrains IDE

* 새로운 Node.js 디버그 설정을 생성하고 Debug를 누르세요. Node.js 7+에서는
  기본적으로 `--inspect`를 사용할 것입니다. 비활성화하려면 IDE 레지스트리에서
  `js.debugger.node.use.inspect`의 체크를 해제하세요.

#### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* 인스펙터 프로토콜 엔드포인트로의 연결을 쉽게 하는 라이브러리입니다.

---

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
</table>

---
-->

## 명령행 옵션

다음 테이블은 디버깅용 여러 런타임 플래그의 기능을 보여줍니다.

<table cellpadding=0 cellspacing=0>
  <tr><th>플래그</th><th>의미</th></tr>
  <tr>
    <td>--inspect</td>
    <td>
      <ul>
        <li>인스펙터 에이전트 활성화</li>
        <li>기본 포트(9229)를 리스닝합니다</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect=<i>[host:port]</i></td>
    <td>
      <ul>
        <li>인스펙터 에이전트 활성화</li>
        <li><i>port</i> 포트를 리스닝합니다</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk</td>
    <td>
      <ul>
        <li>인스펙터 에이전트 활성화</li>
        <li>기본 포트(9229)를 리스닝합니다</li>
        <li>사용자 코드를 시작하기 전에 멈춥니다</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk=<i>[host:port]</i></td>
    <td>
      <ul>
        <li>인스펙터 에이전트 활성화</li>
        <li><i>port</i> 포트를 리스닝합니다</li>
        <li>사용자 코드를 시작하기 전에 멈춥니다</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect <i>script.js</i></code></td>
    <td>
      <ul>
        <li>사용자의 스크립트를 --inspect 플래그로 실행하는 자식 프로세스를 생성하고
            CLI 디버거 실행에 메인 프로세스를 사용합니다.</li>
      </ul>
    </td>
  </tr>
</table>

---

<!--
## Legacy Debugger

**The legacy debugger has been deprecated as of Node 7.7.0. Please use --inspect
and Inspector instead.**

When started with the **--debug** or **--debug-brk** switches in version 7 and
earlier, Node.js listens for debugging commands defined by the discontinued
V8 Debugging Protocol on a TCP port, by default `5858`. Any debugger client
which speaks this protocol can connect to and debug the running process; a
couple popular ones are listed below.

The V8 Debugging Protocol is no longer maintained or documented.
-->

## 레거시 디버거

**레거시 디버거는 Node 7.7.0부터 폐기되었습니다. 대신 --inspect와 인스펙터를 사용하세요.**

버전 7 이하에서 **--debug**나 **--debug-brk** 스위치로 시작하면 Node.js는
TCP 포트(기본 `5858`)로 지금은 중단된 V8 디버깅 프로토콜에서 정의한 디버깅 명령어를 받습니다.
이 프로토콜을 사용하는 모든 디버거 클라이언트는 실행된 프로세스에 접속하고 디버깅할 수 있습니다.
인기 있는 클라이언트의 목록이 아래 나와 있습니다.

V8 디버깅 프로토콜은 더는 관리되지 않고 문서화도 되지 않습니다.

<!--
#### [Built-in Debugger](https://github.com/nodejs/node/blob/master/lib/_debugger.js)

Start `node debug script_name.js` to start your script under Node's builtin
command-line debugger. Your script starts in another Node process started with
the `--debug-brk` option, and the initial Node process runs the `_debugger.js`
script and connects to your target.

#### [node-inspector](https://github.com/node-inspector/node-inspector)

Debug your Node.js app with Chrome DevTools by using an intermediary process
which translates the Inspector Protocol used in Chromium to the V8 Debugger
protocol used in Node.js.
-->

#### [내장 디버거](https://github.com/nodejs/node/blob/master/lib/_debugger.js)

Node의 내장 명령형 디버거로 스크립트를 실행하려면 `node debug script_name.js`로 실행하세요.
스크립트가 다른 Node 프로세스에서 `--debug-brk` 옵션으로 시작되고 원래의 Node 프로세스는
`_debugger.js`를 실행해서 대상에 접속합니다.

#### [node-inspector](https://github.com/node-inspector/node-inspector)

크로미움에서 사용하는 인스펙터 프로토콜을 Node.js가 사용하는 V8 디버거 프로토콜로 변환하는
중간 프로세스를 사용해서 크롬 개발자도구로 Node.js 애플리케이션을 디버깅합니다.

<!-- refs -->

<!--
[Inspector Protocol]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122
-->

<!-- refs -->

[Inspector 프로토콜]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122
