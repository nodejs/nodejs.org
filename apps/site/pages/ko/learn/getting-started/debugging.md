---
title: Debugging Node.js
layout: learn
---

# Node.js 디버깅

이 가이드는 Node.js 앱과 스크립트를 디버깅하는 방법을 안내합니다.

## 인스펙터 활성화

`--inspect` 스위치로 시작하면 Node.js 프로세스가 디버깅 클라이언트를 대기합니다. 기본적으로 호스트와 포트 127.0.0.1:9229에서 대기합니다. 각 프로세스에는 고유한 [UUID][]가 할당됩니다.

인스펙터 클라이언트는 연결하려면 호스트 주소, 포트, UUID를 알아야 하며, 전체 URL은 `ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`와 유사할 것입니다.

Node.js는 또한 `SIGUSR1` 신호를 수신하면 디버깅 메시지를 대기합니다. (Windows에서는 `SIGUSR1`을 사용할 수 없습니다.) Node.js 7 및 이전 버전에서는 레거시 디버거 API가 활성화되고, Node.js 8 이후 버전에서는 인스펙터 API가 활성화됩니다.

## 보안 문제

디버거는 Node.js 실행 환경에 완전한 접근 권한을 가지므로 이 포트에 연결할 수 있는 악의적인 사용자가 Node.js 프로세스를 대신해 임의의 코드를 실행할 수 있습니다. 디버거 포트를 공개 및 사설 네트워크에 노출시킬 때 보안 문제를 이해하는 것이 중요합니다.

### 디버그 포트를 공개적으로 노출하는 것은 안전하지 않습니다

디버거가 공용 IP 주소나 0.0.0.0에 바인딩되어 있는 경우, 귀하의 IP 주소에 접근할 수 있는 모든 클라이언트는 제한 없이 디버거에 연결할 수 있으며 임의의 코드를 실행할 수 있습니다.

기본적으로 `node --inspect`는 127.0.0.1에 바인딩됩니다. 외부 연결을 허용하려면 공용 IP 주소나 0.0.0.0 등을 명시적으로 제공해야 합니다. 이렇게 하면 잠재적으로 심각한 보안 위협에 노출될 수 있습니다. 보안 노출을 방지하기 위해 적절한 방화벽 및 접근 제어가 설정되어 있는지 확인할 것을 권장합니다.

안전하게 원격 디버거 클라이언트를 허용하는 방법에 대한 조언은 '[원격 디버깅 시나리오 활성화하기](#enabling-remote-debugging-scenarios)' 섹션을 참조하십시오.

### 로컬 애플리케이션은 인스펙터에 완전한 접근 권한을 가집니다

인스펙터 포트를 127.0.0.1(기본값)에 바인딩하더라도, 로컬에서 실행 중인 애플리케이션은 제한 없이 접근할 수 있습니다. 이는 로컬 디버거가 쉽게 연결할 수 있도록 설계된 것입니다.

### 브라우저, WebSockets 및 동일 출처 정책

웹 브라우저에서 열린 웹사이트는 브라우저 보안 모델 하에서 WebSocket 및 HTTP 요청을 할 수 있습니다. 고유한 디버거 세션 ID를 얻으려면 초기 HTTP 연결이 필요합니다. 동일 출처 정책은 웹사이트가 이 HTTP 연결을 할 수 없도록 방지합니다. [DNS 재바인딩 공격](https://en.wikipedia.org/wiki/DNS_rebinding)에 대한 추가 보안을 위해 Node.js는 연결의 'Host' 헤더가 IP 주소 또는 정확하게 `localhost`를 지정하는지 확인합니다.

이 보안 정책은 호스트 이름을 지정하여 원격 디버그 서버에 연결하는 것을 방지합니다. 이 제한을 우회하려면 IP 주소를 지정하거나 아래 설명된 대로 SSH 터널을 사용할 수 있습니다.

## 인스펙터 클라이언트

간단한 CLI 디버거는 `node inspect myscript.js`로 사용할 수 있습니다. 여러 상용 및 오픈 소스 도구도 Node.js 인스펙터에 연결할 수 있습니다.

### Chrome DevTools 55+, Microsoft Edge

- **옵션 1**: Chromium 기반 브라우저에서 `chrome://inspect`를 열거나 Edge에서 `edge://inspect`를 엽니다. 구성 버튼을 클릭하고 대상 호스트와 포트가 나열되어 있는지 확인합니다.
- **옵션 2**: `/json/list`의 출력에서 `devtoolsFrontendUrl`을 복사하거나 --inspect 힌트 텍스트를 Chrome에 붙여넣습니다.

자세한 내용은 https://github.com/ChromeDevTools/devtools-frontend 및 https://www.microsoftedgeinsider.com을 참조하세요.

### Visual Studio Code 1.10+

- 디버그 패널에서 설정 아이콘을 클릭하여 `.vscode/launch.json`을 엽니다. 초기 설정을 위해 "Node.js"를 선택합니다.

자세한 내용은 https://github.com/microsoft/vscode를 참조하세요.

### Visual Studio 2017+

- 메뉴에서 "디버그 > 디버깅 시작"을 선택하거나 F5를 누릅니다.
- [자세한 설명](https://github.com/Microsoft/nodejstools/wiki/Debugging)을 참조하세요.

### JetBrains WebStorm 및 기타 JetBrains IDE

- 새 Node.js 디버그 구성을 생성하고 디버그 버튼을 누릅니다. Node.js 7+에서는 기본적으로 `--inspect`가 사용됩니다. 비활성화하려면 IDE 레지스트리에서 `js.debugger.node.use.inspect`을 선택 해제합니다. WebStorm 및 기타 JetBrains IDE에서 Node.js 실행 및 디버깅에 대해 자세히 알아보려면 [WebStorm 온라인 도움말](https://www.jetbrains.com/help/webstorm/running-and-debugging-node-js.html)을 참조하세요.

### chrome-remote-interface

- [Inspector Protocol][] 엔드포인트 연결을 쉽게 할 수 있는 라이브러리.

자세한 내용은 https://github.com/cyrus-and/chrome-remote-interface를 참조하세요.

### Gitpod

- `Debug` 보기에서 Node.js 디버그 구성을 시작하거나 `F5`를 누릅니다. [자세한 설명](https://medium.com/gitpod/debugging-node-js-applications-in-theia-76c94c76f0a1)을 참조하세요.

자세한 내용은 https://www.gitpod.io를 참조하세요.

### Eclipse IDE with Eclipse Wild Web Developer extension

- .js 파일에서 "Debug As... > Node program"을 선택하거나
- 이미 `--inspect`로 시작된 Node.js 애플리케이션에 디버거를 연결하는 디버그 구성을 만듭니다.

자세한 내용은 https://eclipse.org/eclipseide를 참조하세요.

## 명령줄 옵션

다음 표는 다양한 런타임 플래그가 디버깅에 미치는 영향을 나열합니다:

| 플래그                             | 의미                                                                                                                                                                       |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --inspect                          | 인스펙터 에이전트를 활성화합니다. 기본 주소와 포트(127.0.0.1:9229)에서 대기합니다.                                                                                         |
| --inspect=[host:port]              | 인스펙터 에이전트를 활성화합니다. 주소 또는 호스트 이름에 바인딩합니다(기본값: 127.0.0.1). 포트 port에서 대기합니다(기본값: 9229).                                         |
| --inspect-brk                      | 인스펙터 에이전트를 활성화합니다. 기본 주소와 포트(127.0.0.1:9229)에서 대기합니다. 사용자 코드가 시작되기 전에 중단합니다.                                                 |
| --inspect-brk=[host:port]          | 인스펙터 에이전트를 활성화합니다. 주소 또는 호스트 이름에 바인딩합니다(기본값: 127.0.0.1). 포트 port에서 대기합니다(기본값: 9229). 사용자 코드가 시작되기 전에 중단합니다. |
| --inspect-wait                     | 인스펙터 에이전트를 활성화합니다. 기본 주소와 포트(127.0.0.1:9229)에서 대기합니다. 디버거가 연결될 때까지 대기합니다.                                                      |
| --inspect-wait=[host:port]         | 인스펙터 에이전트를 활성화합니다. 주소 또는 호스트 이름에 바인딩합니다(기본값: 127.0.0.1). 포트 port에서 대기합니다(기본값: 9229). 디버거가 연결될 때까지 대기합니다.      |
| node inspect script.js             | --inspect 플래그로 사용자의 스크립트를 실행할 자식 프로세스를 생성하고 CLI 디버거를 실행합니다.                                                                            |
| node inspect --port=xxxx script.js | --inspect 플래그로 사용자의 스크립트를 실행할 자식 프로세스를 생성하고 CLI 디버거를 실행합니다. 포트 port에서 대기합니다(기본값: 9229).                                    |

## 원격 디버깅 시나리오 활성화하기

디버거가 공용 IP 주소에서 대기하도록 설정하는 것은 절대 피해야 합니다. 원격 디버깅 연결을 허용해야 하는 경우 SSH 터널을 사용하는 것을 권장합니다. 아래 예시는 설명을 위한 것이며, 권한 있는 서비스에 대한 원격 액세스를 허용하는 것의 보안 위험을 이해한 후 진행하십시오.

예를 들어, `remote.example.com`이라는 원격 머신에서 Node.js를 실행하고 디버깅하고 싶다고 가정해 보겠습니다. 해당 머신에서 인스펙터가 로컬호스트에서만 대기하도록 Node.js 프로세스를 시작해야 합니다.

1`bash
node --inspect server.js
1`

이제 디버그 클라이언트 연결을 시작할 로컬 머신에서 SSH 터널을 설정할 수 있습니다:

1`bash
ssh -L 9221:localhost:9229 user@remote.example.com
1`

이렇게 하면 로컬 머신의 포트 9221에 대한 연결이 `remote.example.com`의 포트 9229로 전달되는 SSH 터널 세션이 시작됩니다. 이제 Chrome DevTools 또는 Visual Studio Code와 같은 디버거를 localhost:9221에 연결할 수 있으며, Node.js 애플리케이션이 로컬에서 실행되는 것처럼 디버깅할 수 있습니다.

## 레거시 디버거

**레거시 디버거는 Node.js 7.7.0부터 더 이상 지원되지 않습니다. `--inspect`와 인스펙터를 사용하십시오.**

버전 7 및 이전 버전에서 **--debug** 또는 **--debug-brk** 스위치를 사용하여 시작하면 Node.js는 기본적으로 TCP 포트 `5858`에서 중단된 V8 디버깅 프로토콜 명령을 대기합니다. 이 프로토콜을 사용하는 모든 디버거 클라이언트가 실행 중인 프로세스에 연결하여 디버깅할 수 있습니다. 이 프로토콜을 사용하는 몇 가지 인기 있는 클라이언트도 나열되어 있습니다.

V8 디버깅 프로토콜은 더 이상 유지 관리되거나 문서화되지 않습니다.

### 내장 디버거

`node debug script_name.js`를 시작하여 내장 명령줄 디버거에서 스크립트를 시작합니다. 스크립트는 `--debug-brk` 옵션으로 시작된 다른 Node.js 프로세스에서 시작되며, 초기 Node.js 프로세스는 `_debugger.js` 스크립트를 실행하고 대상에 연결합니다. [문서](https://nodejs.org/dist/latest/docs/api/debugger.html)를 참조하십시오.

### node-inspector

Chrome DevTools를 사용하여 Node.js 앱을 디버깅하려면 Chromium에서 사용하는 [Inspector Protocol][]을 V8 디버거 프로토콜로 변환하는 중개 프로세스를 사용합니다. 자세한 내용은 https://github.com/node-inspector/node-inspector를 참조하세요.

[Inspector Protocol]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122
