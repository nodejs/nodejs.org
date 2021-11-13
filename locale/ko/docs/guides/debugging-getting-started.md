---
title: 디버깅 - 시작하기
layout: docs.hbs
---

<!--
# Debugging Guide

This guide will help you get started debugging your Node.js apps and scripts.

## Enable Inspector

When started with the `--inspect` switch, a Node.js process listens for a
debugging client. By default, it will listen at host and port 127.0.0.1:9229.
Each process is also assigned a unique [UUID][].

Inspector clients must know and specify host address, port, and UUID to connect.
A full URL will look something like
`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`.

Node.js will also start listening for debugging messages if it receives a
`SIGUSR1` signal. (`SIGUSR1` is not available on Windows.) In Node.js 7 and
earlier, this activates the legacy Debugger API. In Node.js 8 and later, it will
activate the Inspector API.

---
-->

# 디버깅 가이드

이 문서는 Node.js 앱과 스크립트의 디버깅을 도울 것입니다.

## 인스펙터 활성화

`--inspect` 스위치로 시작하면 Node.js 프로세스가 디버깅 클라이언트에서 수신을
시작하고 기본 호스트와 포트로 `127.0.0.1:9229`를 사용합니다. 각 프로세스는
고유한 [UUID][]도 할당받습니다.

인스펙터 클라이언트는 호스트 주소, 포트, UUID를 알아야 접속할 수 있습니다. 전체
URL은 `ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e` 같은 형태가
됩니다.

Node.js가 `SIGUSR1` 신호를 받으면 디버깅 메시지도 수신하기
시작합니다.(`SIGUSR1`은 Windows에서는 사용할 수 없습니다.) Node.js 7 이하
버전에서는 레거시 Debugger API가 활성화되고 Node.js 8 이상에서는 Inspector API를
활성화합니다.

---
<!-- ## Security Implications

Since the debugger has full access to the Node.js execution environment, a
malicious actor able to connect to this port may be able to execute arbitrary
code on behalf of the Node process. It is important to understand the security
implications of exposing the debugger port on public and private networks. -->

## 보안 관련

디버거가 Node.js 실행 환경에 완전히 액세스하기 때문에 이 포트에 연결할 수 있는 공격자가 노드 프로세스를 대신하여 임의의 코드를 실행할 수 있습니다. 디버거 포트를 공용 및 개인 네트워크에 노출하는 경우 보안에 미치는 영향을 이해하는 것은 중요합니다.

<!-- ### Exposing the debug port publicly is unsafe

If the debugger is bound to a public IP address, or to 0.0.0.0, any clients that
can reach your IP address will be able to connect to the debugger without any
restriction and will be able to run arbitrary code.

By default `node --inspect` binds to 127.0.0.1. You explicitly need to provide a
public IP address or 0.0.0.0, etc., if you intend to allow external connections
to the debugger. Doing so may expose you a potentially significant security
threat. We suggest you ensure appropriate firewalls and access controls in place
to prevent a security exposure.

See the section on '[Enabling remote debugging scenarios](#enabling-remote-debugging-scenarios)' on some advice on how
to safely allow remote debugger clients to connect. -->

### 디버그 포트를 공개적으로 노출하는 것은 안전하지 않습니다.

디버거가 퍼블릭 IP 주소 또는 0.0.0.0에 바인딩 될 경우 IP 주소에 접근할 수 있는 어떤 클라이언트든 아무 제약 없이 디버거에 접속할 수 있고 임의의 코드를 실행할 수 있습니다.

기본적으로 `node --inspect`는 127.0.0.1에 바인딩 합니다. 디버거에 외부 접속을 허용하려 할 경우 퍼블릭 IP 주소 또는 0.0.0.0 등을 명시적으로 제공해야 합니다. 이렇게 하면 잠재적으로 심각한 보안 위협에 노출될 수 있습니다. 보안 노출을 방지하기 위해 적절한 방화벽과 액세스 제어를 유지하는 것이 좋습니다.

원격 디버거 클라이언트의 접근을 안전하게 허용하는 방법은 '[원격 디버깅 활성화 시나리오](#enabling-remote-debugging-scenarios)' 섹션을 참조하십시오.

<!-- ### Local applications have full access to the inspector

Even if you bind the inspector port to 127.0.0.1 (the default), any applications
running locally on your machine will have unrestricted access. This is by design
to allow local debuggers to be able to attach conveniently. -->

### 로컬 애플리케이션은 인스펙터에 완전히 액세스 할 수 있습니다.

인스펙터 포트를 127.0.0.1(기본값)에 바인딩하더라도 시스템에서 로컬로 실행되는 애플리케이션들은 제한 없이 액세스 할 수 있습니다. 이것은 로컬 디버거를 편리하게 부착할 수 있도록 의도적으로 설계되었습니다.

<!-- ### Browsers, WebSockets and same-origin policy

Websites open in a web-browser can make WebSocket and HTTP requests under the
browser security model. An initial HTTP connection is necessary to obtain a
unique debugger session id. The same-origin-policy prevents websites from being
able to make this HTTP connection. For additional security against
[DNS rebinding attacks](https://en.wikipedia.org/wiki/DNS_rebinding), Node.js
verifies that the 'Host' headers for the connection either
specify an IP address or `localhost` or `localhost6` precisely. -->

### 브라우저, 웹소켓, 동일 출처 정책

웹 브라우저에서 열리는 웹사이트는 브라우저 보안 모델에 따라 웹소켓과 HTTP 요청을 할 수 있습니다. 고유한 디버거 세션 ID를 얻으려면 초기 HTTP 연결이 필요합니다. 동일 출처 정책은 이 HTTP 연결을 만들 수 없도록 합니다. [DNS 리바인딩 공격](https://en.wikipedia.org/wiki/DNS_rebinding)에 대한 추가 보안을 위해 Node.js는 연결의 'Host' 헤더가 IP 주소나 `localhost` 또는 `localhost6`을 정확하게 지정하는지 검증합니다.

<!-- These security policies disallow connecting to a remote debug server by
specifying the hostname. You can work-around this restriction by specifying
either the IP address or by using ssh tunnels as described below. -->

이러한 보안 정책은 호스트 이름을 지정하여 원격 디버그 서버에 접속할 수 없도록 합니다. IP 주소를 지정하거나 아래에 설명된 것과 같이 ssh 터널을 사용하여 이 제한사항을 해결할 수 있습니다.

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

### [node-inspect](https://github.com/nodejs/node-inspect)

* Node.js 재단에서 지원하는 CLI 디버거로 [Inspector 프로토콜][]을 사용합니다.
* Node에 포함되어 있고 `node inspect myscript.js`로 사용할 수 있습니다.
* 최신 버전을 별도로 설치할 수 있고(예시: `npm install -g node-inspect`)
  `node-inspect myscript.js`로 사용할 수 있습니다.

### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* **방법 1**: 크로미움에 기반을 둔 브라우저에서 `chrome://inspect`를 엽니다.
  Configure 버튼을 눌러서 대상 호스트와 포트 목록을 확인합니다.
* **방법 2**: `/json/list`(상단 참고)의 출력에서 `devtoolsFrontendUrl`을
  복사하거나 --inspect가 알려준 텍스트에서 복사해서 크롬에 붙여넣기를 합니다.

<!--
#### [Visual Studio Code](https://github.com/microsoft/vscode) 1.10+

* In the Debug panel, click the settings icon to open `.vscode/launch.json`.
  Select "Node.js" for initial setup.

#### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017+

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

### [Eclipse IDE](https://eclipse.org/eclipseide) with Eclipse Wild Web Developer extension

* From a .js file, choose "Debug As... > Node program", or
* Create a Debug Configuration to attach debugger to running Node application (already started with `--inspect`).

---
-->

### [Visual Studio Code](https://github.com/microsoft/vscode) 1.10+

* Debug 패널에서 설정 아이콘을 클릭해서 `.vscode/launch.json`을 엽니다.
  초기 설정으로 "Node.js"를 선택하세요.

### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017+

* 메뉴에서 "Debug > Start Debugging"을 선택하거나 F5를 누르세요.
* [상세한 설명](https://github.com/Microsoft/nodejstools/wiki/Debugging)

### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+와 다른 JetBrains IDE

* 새로운 Node.js 디버그 설정을 생성하고 Debug를 누르세요. Node.js 7+에서는
  기본적으로 `--inspect`를 사용할 것입니다. 비활성화하려면 IDE 레지스트리에서
  `js.debugger.node.use.inspect`의 체크를 해제하세요.

### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* 인스펙터 프로토콜 엔드포인트로의 연결을 쉽게 하는 라이브러리입니다.

### [Gitpod](https://www.gitpod.io)

* `Debug` 뷰에서 Node.js 디버그 설정을 실행하거나 `F5` 키를 누르세요.
  [자세한 방법은 여기를 참고하세요.](https://medium.com/gitpod/debugging-node-js-applications-in-theia-76c94c76f0a1)

### [Eclipse IDE](https://eclipse.org/eclipseide)와 Eclipse Wild Web Developer 확장 프로그램

* .js 파일에서 "Debug As... > Node program"을 선택하거나,
* 실행 중인 (`--inspect`로 시작한) Node 애플리케이션에 디버거를 연결하는 디버그 설정을 생성하세요.

---

<!--
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
-->

## 명령행 옵션

다음 테이블은 디버깅용 여러 런타임 플래그의 기능을 보여줍니다.

<table class="table-no-border-no-padding">
  <tr><th>플래그</th><th>의미</th></tr>
  <tr>
    <td>--inspect</td>
    <td>
      <ul>
        <li>인스펙터 에이전트 활성화</li>
        <li>기본 주소와 포트에서 수신(127.0.0.1:9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect=<em>[host:port]</em></td>
    <td>
      <ul>
        <li>인스펙터 에이전트 활성화</li>
        <li>주소 또는 호스트 이름 <em>host</em>에 바인딩 (기본값: 127.0.0.1)</li>
        <li><em>port</em> 포트에서 수신 (기본값: 9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk</td>
    <td>
      <ul>
        <li>인스펙터 에이전트 활성화</li>
        <li>기본 주소와 포트에서 수신(127.0.0.1:9229)</li>
        <li>사용자 코드 시작 전 멈춤</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk=<em>[host:port]</em></td>
    <td>
      <ul>
        <li>인스펙터 에이전트 활성화</li>
        <li>주소 또는 호스트 이름 <em>host</em>에 바인딩 (기본값: 127.0.0.1)</li>
        <li><em>port</em> 포트에서 수신 (기본값: 9229)</li>
        <li>사용자 코드 시작 전 멈춤</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect <em>script.js</em></code></td>
    <td>
      <ul>
        <li>사용자의 스크립트를 --inspect 플래그로 실행하는 자식 프로세스를 생성하고 CLI 디버거 실행에 메인 프로세스를 사용합니다.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect --port=xxxx <em>script.js</em></code></td>
    <td>
      <ul>
        <li>사용자의 스크립트를 --inspect 플래그로 실행하는 자식 프로세스를 생성하고 CLI 디버거 실행에 메인 프로세스를 사용합니다.</li>
        <li><em>port</em> 포트에서 수신 (기본값: 9229)</li>
      </ul>
    </td>
  </tr>
</table>

---

## <!--enabling-remote-debugging-scenarios-->원격 디버깅 활성화 시나리오

<!--
We recommend that you never have the debugger listen on a public IP address. If
you need to allow remote debugging connections we recommend the use of ssh
tunnels instead. We provide the following example for illustrative purposes only.
Please understand the security risk of allowing remote access to a privileged
service before proceeding.
-->
디버거가 퍼블릭 IP 주소에서 수신하지 않는 것을 권장합니다. 만약 원격 디버깅 연결을 허용해야 하는 경우 ssh 터널링을 대신 사용할 것을 권장합니다. 설명을 위해 아래 예제를 제공합니다. 진행하기 전 권한을 가진 서비스에 원격 액세스를 허용할 경우 발생할 수 있는 보안 위험을 이해하시기 바랍니다.

<!--
Let's say you are running Node on remote machine, remote.example.com, that you
want to be able to debug. On that machine, you should start the node process
with the inspector listening only to localhost (the default).
-->
디버깅하기를 원하는 remote.example.com 원격 시스템에서 노드가 실행 중이라고 가정하겠습니다. 해당 시스템에서 localhost(기본값)만 수신하는 인스펙터로 노드 프로세스를 시작해야 합니다.

```bash
node --inspect server.js
```

<!--
Now, on your local machine from where you want to initiate a debug client
connection, you can setup an ssh tunnel:
-->
이제 디버그 클라이언트 연결을 시작하려는 로컬 시스템에서 ssh 터널을 설정할 수 있습니다.

```bash
ssh -L 9221:localhost:9229 user@remote.example.com
```

<!--
This starts a ssh tunnel session where a connection to port 9221 on your local
machine will be forwarded to port 9229 on remote.example.com. You can now attach
a debugger such as Chrome DevTools or Visual Studio Code to localhost:9221,
which should be able to debug as if the Node.js application was running locally.
-->
그러면 로컬 시스템의 9221 포트에서 remote.example.com의 9229 포트로 전달되는 ssh 터널 세션이 시작됩니다. Chrome DevTools 또는 Visual Studio Code 등의 디버거로 localhost:9221에 연결 할 수 있으며 Node.js 애플리케이션이 로컬에서 실행 중인 것처럼 디버깅할 수 있습니다.

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
#### [Built-in Debugger](https://nodejs.org/dist/{#var currentVersion}/docs/api/debugger.html)

Start `node debug script_name.js` to start your script under Node's builtin
command-line debugger. Your script starts in another Node process started with
the `--debug-brk` option, and the initial Node process runs the `_debugger.js`
script and connects to your target.

#### [node-inspector](https://github.com/node-inspector/node-inspector)

Debug your Node.js app with Chrome DevTools by using an intermediary process
which translates the Inspector Protocol used in Chromium to the V8 Debugger
protocol used in Node.js.
-->

### [내장 디버거](https://nodejs.org/dist/{#var currentVersion}/docs/api/debugger.html)

Node의 내장 명령형 디버거로 스크립트를 실행하려면 `node debug script_name.js`로 실행하세요.
스크립트가 다른 Node 프로세스에서 `--debug-brk` 옵션으로 시작되고 원래의 Node 프로세스는
`_debugger.js`를 실행해서 대상에 접속합니다.

### [node-inspector](https://github.com/node-inspector/node-inspector)

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
