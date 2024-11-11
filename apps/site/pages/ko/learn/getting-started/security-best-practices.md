---
title: 보안 모범 사례
layout: learn
authors: RafaelGSS, UlisesGascon, fraxken, facutuesca, mhdawson, arhart, naugtur, anonrig
---

# 보안 모범 사례

## 목적

이 문서는 현재의 [위협 모델][]을 확장하고 Node.js 애플리케이션을 안전하게 보호하는 방법에 대한 광범위한 지침을 제공합니다.

## 문서 내용

- 모범 사례: 모범 사례를 간단히 요약한 방식입니다. 우리는 [이 이슈][security guidance issue] 또는 [이 지침][nodejs guideline]을 시작점으로 사용할 수 있습니다. 이 문서는 Node.js에 특정된 것이며, 더 넓은 범위를 찾고 있다면 [OSSF 모범 사례][]를 고려하십시오.
- 공격 설명: 위협 모델에서 언급된 공격을 코드 예시와 함께 평이한 영어로 설명하고 문서화합니다 (가능한 경우).
- 서드 파티 라이브러리: 위협 요소 정의 (오타 도용 공격, 악성 패키지 등) 및 Node 모듈 의존성 관련 모범 사례 정의.

## 위협 목록

### HTTP 서버의 서비스 거부 (CWE-400)

이것은 애플리케이션이 수신하는 HTTP 요청을 처리하는 방식 때문에 원래 의도된 목적에 맞게 사용할 수 없게 되는 공격입니다. 이러한 요청은 악의적인 행위자에 의해 고의적으로 만들어지지 않아도 되며, 잘못 구성되거나 버그가 있는 클라이언트도 서버에 서비스 거부를 일으킬 수 있는 패턴의 요청을 보낼 수 있습니다.

HTTP 요청은 Node.js HTTP 서버에 의해 수신되어 등록된 요청 처리기를 통해 애플리케이션 코드로 전달됩니다. 서버는 요청 본문의 내용을 파싱하지 않습니다. 따라서 본문 내용에 의해 발생한 서비스 거부는 Node.js 자체의 취약성이 아니라 애플리케이션 코드가 이를 올바르게 처리해야 하는 책임이 있습니다.

WebServer가 소켓 오류를 적절히 처리하도록 하십시오. 예를 들어, 서버가 오류 처리기 없이 생성되면 서비스 거부에 취약해집니다.

```cjs
const net = require('node:net');

const server = net.createServer(function (socket) {
  // socket.on('error', console.error) // 이것이 서버 충돌을 방지합니다.
  socket.write('Echo server\r\n');
  socket.pipe(socket);
});

server.listen(5000, '0.0.0.0');
```

```mjs
import net from 'node:net';

const server = net.createServer(function (socket) {
  // socket.on('error', console.error) // 이것이 서버 충돌을 방지합니다.
  socket.write('Echo server\r\n');
  socket.pipe(socket);
});

server.listen(5000, '0.0.0.0');
```

잘못된 요청이 수행되면 서버가 충돌할 수 있습니다.

요청 내용이 아닌 다른 방식으로 발생하는 DoS 공격의 예로는 [Slowloris][]가 있습니다. 이 공격에서는 HTTP 요청을 천천히, 조각별로 전송합니다. 요청이 완전히 전달될 때까지 서버는 해당 요청에 자원을 계속 할당하게 됩니다. 이러한 요청이 충분히 많이 동시에 전송되면, 동시 연결 수가 곧 최대치에 도달하여 서비스 거부 상태에 이르게 됩니다. 이 공격은 요청의 내용이 아닌 요청이 서버로 전송되는 타이밍과 패턴에 의존합니다.

**완화 방안**

- Node.js 애플리케이션에 요청을 수신하고 전달하는 리버스 프록시를 사용하십시오. 리버스 프록시는 캐싱, 로드 밸런싱, IP 차단 등을 제공하여 DoS 공격의 효과를 줄일 수 있습니다.
- 서버 타임아웃을 적절히 설정하여 유휴 상태이거나 요청이 너무 느리게 도착하는 연결을 차단할 수 있도록 하십시오. [`http.Server`][]에서 `headersTimeout`, `requestTimeout`, `timeout`, `keepAliveTimeout`과 같은 다양한 타임아웃을 참조하십시오.
- 호스트별 및 총 열린 소켓 수를 제한하십시오. [http 문서][]에서 `agent.maxSockets`, `agent.maxTotalSockets`, `agent.maxFreeSockets`, `server.maxRequestsPerSocket`을 참조하십시오.

### DNS 리바인딩 (CWE-346)

이 공격은 [--inspect switch][]를 사용하여 디버깅 인스펙터가 활성화된 상태에서 실행되는 Node.js 애플리케이션을 대상으로 할 수 있습니다.

웹 브라우저에서 열린 웹사이트는 WebSocket 및 HTTP 요청을 할 수 있으므로, 로컬에서 실행 중인 디버깅 인스펙터를 타겟으로 할 수 있습니다. 이는 일반적으로 현대 브라우저에서 구현된 [동일 출처 정책][]에 의해 방지됩니다. 이 정책은 스크립트가 다른 출처의 리소스에 접근하는 것을 금지합니다 (즉, 악성 웹사이트가 로컬 IP 주소에서 요청된 데이터를 읽을 수 없습니다).

그러나 DNS 리바인딩을 통해 공격자는 자신이 보낸 요청이 로컬 IP 주소에서 시작된 것처럼 보이도록 출처를 일시적으로 제어할 수 있습니다. 이를 위해 웹사이트와 그 웹사이트의 IP 주소를 해석하는 DNS 서버를 모두 제어합니다. 자세한 내용은 [DNS 리바인딩 위키][]를 참조하십시오.

**완화 방안**

- `process.on('SIGUSR1', …)` 리스너를 사용하여 _SIGUSR1_ 신호에서 인스펙터를 비활성화하십시오.
- 프로덕션 환경에서는 인스펙터 프로토콜을 사용하지 마십시오.

### 권한 없는 행위자에게 민감한 정보 노출 (CWE-552)

현재 디렉터리에 포함된 모든 파일과 폴더는 패키지를 npm 레지스트리에 게시할 때 함께 전송됩니다.

이를 제어하는 몇 가지 메커니즘이 있는데, `.npmignore`와 `.gitignore`을 사용하여 차단 목록을 정의하거나 `package.json`에서 허용 목록을 정의할 수 있습니다.

**완화 방안**

- `npm publish --dry-run`을 사용하여 게시할 파일 목록을 확인하십시오. 패키지를 게시하기 전에 반드시 내용을 검토하십시오.
- `.gitignore`와 `.npmignore` 같은 무시 파일을 생성하고 유지 관리하는 것도 중요합니다. 이 파일들을 통해 어떤 파일/폴더가 게시되지 않도록 할지 지정할 수 있습니다. `package.json`의 [files 속성][]을 사용하여 허용 목록을 정의할 수도 있습니다.
- 노출이 발생한 경우, [패키지를 삭제][]하십시오.

### HTTP 요청 스머글링 (CWE-444)

이 공격은 두 개의 HTTP 서버(일반적으로 프록시와 Node.js 애플리케이션)를 포함합니다. 클라이언트가 HTTP 요청을 전송하면 먼저 프론트엔드 서버(프록시)를 거쳐 백엔드 서버(애플리케이션)로 전달됩니다. 프론트엔드와 백엔드가 모호한 HTTP 요청을 다르게 해석할 때, 공격자가 프론트엔드에서는 보이지 않지만 백엔드에서는 보이는 악성 메시지를 전송하여 프록시 서버를 우회하는 "스머글링" 공격을 할 수 있습니다.

[CWE-444][]에서 더 자세한 설명과 예시를 볼 수 있습니다.

이 공격은 Node.js가 (임의의) HTTP 서버와 HTTP 요청을 다르게 해석할 때 발생할 수 있습니다. 성공적인 공격은 Node.js 또는 프론트엔드 서버, 혹은 두 서버의 취약점으로 인해 발생할 수 있습니다. 만약 Node.js가 HTTP 요청을 HTTP 사양에 맞게 해석한다면 (예: [RFC7230][] 참조), Node.js 자체의 취약점으로 간주되지 않습니다.

**완화 방안**

- HTTP 서버를 생성할 때 `insecureHTTPParser` 옵션을 사용하지 마십시오.
- 프론트엔드 서버가 모호한 요청을 정규화하도록 설정하십시오.
- Node.js와 선택한 프론트엔드 서버 모두에서 새로운 HTTP 요청 스머글링 취약점을 지속적으로 모니터링하십시오.
- 가능한 경우, HTTP/2를 처음부터 끝까지 사용하고 HTTP 다운그레이드를 비활성화하십시오.

### 타이밍 공격을 통한 정보 노출 (CWE-208)

이 공격은 공격자가 애플리케이션이 요청에 응답하는 시간을 측정하여 잠재적으로 민감한 정보를 알아내는 공격입니다. 이 공격은 Node.js에 국한되지 않으며 거의 모든 런타임을 타겟으로 할 수 있습니다.

애플리케이션이 타이밍에 민감한 작업에서 비밀 값을 사용할 때 공격이 가능합니다 (예: 분기 처리). 일반적인 애플리케이션에서 인증을 처리할 때를 고려해봅시다. 기본적인 인증 방법은 이메일과 비밀번호를 자격 증명으로 사용합니다. 사용자 정보는 이상적으로 DBMS에서 사용자 입력을 통해 검색됩니다. 사용자 정보를 검색한 후, 비밀번호는 데이터베이스에서 검색한 사용자 정보와 비교됩니다. 내장된 문자열 비교는 동일한 길이의 값에 대해 더 긴 시간이 걸립니다. 이 비교가 실행되면 의도치 않게 요청의 응답 시간이 증가합니다. 요청 응답 시간을 비교함으로써 공격자는 대량의 요청을 통해 비밀번호의 길이와 값을 추측할 수 있습니다.

**완화 방안**

- crypto API는 `timingSafeEqual` 함수를 제공하여 일정한 시간 알고리즘을 사용해 실제 값과 예상 값을 비교할 수 있습니다.
- 비밀번호 비교를 위해, 네이티브 crypto 모듈에서도 사용할 수 있는 [scrypt][]를 사용할 수 있습니다.

- 일반적으로, 비밀 값을 시간 가변 연산에서 사용하지 않도록 하십시오. 여기에는 비밀 값을 기준으로 한 분기 처리와, 공격자가 동일한 인프라에서 위치할 수 있는 경우 (예: 동일한 클라우드 머신) 비밀 값을 메모리의 인덱스로 사용하는 것이 포함됩니다. JavaScript에서 일정 시간 코드를 작성하는 것은 어렵습니다 (JIT 컴파일러의 영향도 있기 때문). 암호화 애플리케이션의 경우, 내장된 crypto API 또는 WebAssembly(네이티브로 구현되지 않은 알고리즘의 경우)를 사용하십시오.

### 악성 서드 파티 모듈 (CWE-1357)

현재 Node.js에서는 모든 패키지가 네트워크 액세스와 같은 강력한 리소스에 접근할 수 있습니다.
게다가 파일 시스템에 접근할 수 있기 때문에 어디로든 데이터를 전송할 수 있습니다.

Node 프로세스에서 실행되는 모든 코드는 `eval()`(또는 그와 동등한 함수)을 사용하여 임의의 코드를 로드하고 실행할 수 있습니다. 파일 시스템 쓰기 권한이 있는 코드는 새로운 파일을 작성하거나 기존 파일을 수정하여 동일한 작업을 수행할 수 있습니다.

Node.js는 실험적인[¹][experimental-features] [정책 메커니즘][]을 통해 로드된 리소스를 신뢰할 수 있는지 없는지 선언할 수 있습니다. 하지만 이 정책은 기본적으로 활성화되어 있지 않습니다. 의존성 버전을 고정하고 일반적인 워크플로우 또는 npm 스크립트를 사용하여 자동으로 취약점을 검사해야 합니다. 패키지를 설치하기 전에 해당 패키지가 유지 관리 중이며 예상한 모든 콘텐츠를 포함하고 있는지 확인하십시오. GitHub 소스 코드가 항상 배포된 코드와 동일하지 않으므로 *node_modules*에서 이를 검증하십시오.

#### 공급망 공격

Node.js 애플리케이션에서의 공급망 공격은 애플리케이션의 의존성(직접적 또는 간접적 의존성) 중 하나가 손상되었을 때 발생합니다. 이러한 공격은 애플리케이션이 의존성 사양을 너무 느슨하게 설정하거나(원하지 않는 업데이트를 허용) 또는 사양에서 일반적인 오타가 발생할 경우(타이포스쿼팅에 취약) 발생할 수 있습니다.

공격자가 업스트림 패키지를 장악하면 악성 코드가 포함된 새 버전을 게시할 수 있습니다. 만약 Node.js 애플리케이션이 안전한 버전을 엄격하게 지정하지 않는다면, 패키지는 최신 악성 버전으로 자동 업데이트되어 애플리케이션을 손상시킬 수 있습니다.

`package.json` 파일에 지정된 의존성은 정확한 버전 번호 또는 범위를 가질 수 있습니다. 그러나 의존성을 정확한 버전으로 고정하더라도 간접 의존성은 고정되지 않기 때문에 예상치 못한 업데이트에 여전히 취약할 수 있습니다.

가능한 공격 벡터:

- 타이포스쿼팅 공격
- Lockfile poisoning
- 손상된 유지관리자
- 악성 패키지
- 의존성 혼란

**완화 방안**

- `--ignore-scripts`로 npm이 임의의 스크립트를 실행하지 않도록 방지하십시오.
  - 추가로, `npm config set ignore-scripts true`로 전역에서 비활성화할 수 있습니다.
- 의존성 버전을 특정 변경 불가능한 버전으로 고정하고, 범위나 변경 가능한 소스에서 가져오지 않도록 하십시오.
- Lockfile을 사용하여 모든 의존성(직접 및 간접 의존성)을 고정하십시오.
  - [Lockfile 오염 방지][]을 참조하십시오.
- CI에서 `npm-audit` 같은 도구를 사용하여 새로운 취약점을 자동으로 검사하십시오.
  - [`Socket`][] 같은 도구를 사용하여 패키지의 네트워크 또는 파일 시스템 액세스와 같은 위험한 동작을 정적으로 분석할 수 있습니다.
- `npm install` 대신 [`npm ci`][]를 사용하십시오. 이 명령어는 lockfile을 강제하며 _package.json_ 파일과 lockfile 간의 불일치가 발생할 경우 오류를 발생시킵니다 (lockfile을 무시하고 *package.json*을 사용하는 것을 방지).
- _package.json_ 파일에서 의존성 이름에 오타가 있는지 꼼꼼히 확인하십시오.

### 메모리 접근 위반 (CWE-284)

메모리 기반 또는 힙 기반 공격은 메모리 관리 오류와 취약한 메모리 할당자의 조합에 의존합니다. 다른 런타임과 마찬가지로, Node.js는 프로젝트가 공유 머신에서 실행될 경우 이러한 공격에 취약할 수 있습니다. 보안 힙을 사용하면 포인터 오버런 및 언더런으로 인해 민감한 정보가 유출되는 것을 방지할 수 있습니다.

불행히도 보안 힙은 Windows에서는 사용할 수 없습니다. Node.js [보안 힙 문서][]에서 더 많은 정보를 확인할 수 있습니다.

**완화 방안**

- *n*이 할당된 최대 바이트 크기인 `--secure-heap=n` 옵션을 사용하십시오.
- 프로덕션 앱을 공유 머신에서 실행하지 마십시오.

### 몽키 패칭 (CWE-349)

몽키 패칭은 런타임 중 속성을 수정하여 기존 동작을 변경하는 것을 말합니다. 예시:

```js
// eslint-disable-next-line no-extend-native
Array.prototype.push = function (item) {
  // 전역 [].push를 재정의합니다.
};
```

**완화 방안**

`--frozen-intrinsics` 플래그는 실험적인[¹][experimental-features] 동결된 내재 메서드를 활성화합니다. 이는 모든 내장 JavaScript 객체 및 함수가 재귀적으로 동결됨을 의미합니다. 따라서 다음 코드 스니펫은 `Array.prototype.push`의 기본 동작을 재정의하지 **않습니다**.

```js
// eslint-disable-next-line no-extend-native
Array.prototype.push = function (item) {
  // 전역 [].push를 재정의합니다.
};

// Uncaught:
// TypeError <Object <Object <[Object: null prototype] {}>>>:
// 읽기 전용 속성 'push'에 값을 할당할 수 없습니다.
```

하지만 여전히 `globalThis`를 사용하여 새로운 전역 변수를 정의하거나 기존 전역 변수를 대체할 수 있습니다.

````console

> globalThis.foo = 3; foo; // 새로운 전역 변수를 정의할 수 있습니다.
> 3
> globalThis.Array = 4; Array; // 기존 전역 변수를 대체할 수도 있습니다.
> 4
> ```

따라서 `Object.freeze(globalThis)`를 사용하여 전역 변수가 대체되지 않도록 할 수 있습니다.

### 프로토타입 오염 공격 (CWE-1321)

Prototype pollution은 JavaScript 내의 아이템에 \_\_proto\__, \_constructor_, _prototype_ 등 기본적으로 내장된 프로토타입의 속성을 악용하여 속성을 수정하거나 주입할 수 있는 가능성을 나타냅니다.

<!-- eslint-skip -->

```js
const a = { a: 1, b: 2 };
const data = JSON.parse('{"**proto**": { "polluted": true}}');

const c = Object.assign({}, a, data);
console.log(c.polluted); // true

// 잠재적인 DoS 공격
const data2 = JSON.parse('{"**proto**": null}');
const d = Object.assign(a, data2);
d.hasOwnProperty('b'); // Uncaught TypeError: d.hasOwnProperty is not a function
````

이것은 JavaScript 언어에서 상속된 잠재적 취약점입니다.

**예시**:

- [CVE-2022-21824][] (Node.js)
- [CVE-2018-3721][] (서드파티 라이브러리: Lodash)

**완화 방안**

- [안전하지 않은 재귀 병합][]를 피하십시오. 자세한 내용은 [CVE-2018-16487][]을 참조하십시오.
- 외부 또는 신뢰할 수 없는 요청에 대해 JSON Schema 유효성 검사를 구현하십시오.
- `Object.create(null)`을 사용하여 프로토타입이 없는 객체를 만드십시오.
- 프로토타입을 동결하십시오: `Object.freeze(MyObject.prototype)`.
- `--disable-proto` 플래그를 사용하여 `Object.prototype.__proto__` 속성을 비활성화하십시오.
- 속성이 프로토타입이 아닌 객체에 직접 존재하는지 확인하려면 `Object.hasOwn(obj, keyFromObj)`를 사용하십시오.
- `Object.prototype`의 메서드 사용을 피하십시오.

### Uncontrolled Search Path Element (CWE-427)

Node.js는 [모듈 해석 알고리즘][]을 따라 모듈을 로드합니다. 따라서 모듈이 요청된 디렉토리가 신뢰된 것으로 간주됩니다.

위 상황을 고려할 때, 다음 디렉토리 구조가 있다고 가정합니다:

- _app/_
  - _server.js_
  - _auth.js_
  - _auth_

server.js가 `require('./auth')`를 사용할 경우, 모듈 해결 알고리즘을 따라 _auth.js_ 대신 *auth*를 로드합니다.

**완화 방안**

실험적 기능[¹][실험적 기능] [무결성 검사가 포함된 정책 메커니즘][]를 사용하면 위의 위협을 피할 수 있습니다. 위에서 설명한 디렉토리의 경우, 다음 `policy.json`을 사용할 수 있습니다:

```json
{
  "resources": {
    "./app/auth.js": {
      "integrity": "sha256-iuGZ6SFVFpMuHUcJciQTIKpIyaQVigMZlvg9Lx66HV8="
    },
    "./app/server.js": {
      "dependencies": {
        "./auth": "./app/auth.js"
      },
      "integrity": "sha256-NPtLCQ0ntPPWgfVEgX46ryTNpdvTWdQPoZO3kHo0bKI="
    }
  }
}
```

따라서 _auth_ 모듈을 요구할 때, 시스템은 무결성을 확인하고 예상과 일치하지 않으면 오류를 발생시킵니다.

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
at Module.\_compile (node:internal/modules/cjs/loader:1119:21)
at Module.\_extensions..js (node:internal/modules/cjs/loader:1213:10)
at Module.load (node:internal/modules/cjs/loader:1037:32)
at Module.\_load (node:internal/modules/cjs/loader:878:12)
at Module.require (node:internal/modules/cjs/loader:1061:19)
at require (node:internal/modules/cjs/helpers:99:18) {
code: 'ERR_SRI_PARSE'
}
```

참고로, 정책 변조를 방지하기 위해 항상 `--policy-integrity`를 사용하는 것이 좋습니다.

## 프로덕션에서의 실험적 기능

프로덕션에서 실험적 기능 사용은 권장되지 않습니다. 실험적 기능은 필요할 경우 파괴적인 변경이 발생할 수 있으며, 그 기능이 안정적이지 않을 수 있습니다. 그러나, 피드백은 매우 환영합니다.

## OpenSSF 도구

[OpenSSF][]는 특히 npm 패키지를 배포할 계획이 있는 경우 매우 유용한 여러 이니셔티브를 주도하고 있습니다. 이러한 이니셔티브에는 다음이 포함됩니다:

- [OpenSSF Scorecard][]
  Scorecard는 일련의 자동화된 보안 위험 점검을 사용하여 오픈 소스 프로젝트를 평가합니다. 이를 사용하여 코드 베이스의 취약점 및 종속성을 사전에 평가하고, 취약점 수용에 대한 정보에 입각한 결정을 내릴 수 있습니다.

- [OpenSSF 모범 사례 배지 프로그램][]
  프로젝트는 각 모범 사례 준수 방법을 설명하여 자발적으로 자체 인증을 할 수 있습니다. 이로 인해 프로젝트에 추가할 수 있는 배지가 생성됩니다.

[위협 모델]: https://github.com/nodejs/node/security/policy#the-nodejs-threat-model
[보안 안내 이슈]: https://github.com/nodejs/security-wg/issues/488
[nodejs 가이드라인]: https://github.com/goldbergyoni/nodebestpractices
[OSSF 모범 사례]: https://github.com/ossf/wg-best-practices-os-developers
[Slowloris]: https://en.wikipedia.org/wiki/Slowloris_(computer_security)
[`http.Server`]: https://nodejs.org/api/http.html#class-httpserver
[http 문서]: https://nodejs.org/api/http.html
[--inspect switch]: /learn/getting-started/debugging
[동일 출처 정책]: /learn/getting-started/debugging
[DNS 리바인딩 위키]: https://en.wikipedia.org/wiki/DNS_rebinding
[files 속성]: https://docs.npmjs.com/cli/v8/configuring-npm/package-json#files
[패키지를 삭제]: https://docs.npmjs.com/unpublishing-packages-from-the-registry
[CWE-444]: https://cwe.mitre.org/data/definitions/444.html
[RFC7230]: https://datatracker.ietf.org/doc/html/rfc7230#section-3
[정책 메커니즘]: https://nodejs.org/api/permissions.html#policies
[타이포스쿼팅]: https://en.wikipedia.org/wiki/Typosquatting
[Lockfile 오염 방지]: https://blog.ulisesgascon.com/lockfile-posioned
[`npm ci`]: https://docs.npmjs.com/cli/v8/commands/npm-ci
[보안 힙 문서]: https://nodejs.org/dist/latest-v18.x/docs/api/cli.html#--secure-heapn
[CVE-2022-21824]: https://www.cvedetails.com/cve/CVE-2022-21824/
[CVE-2018-3721]: https://www.cvedetails.com/cve/CVE-2018-3721/
[안전하지 않은 재귀 병합]: https://gist.github.com/DaniAkash/b3d7159fddcff0a9ee035bd10e34b277#file-unsafe-merge-js
[CVE-2018-16487]: https://www.cve.org/CVERecord?id=CVE-2018-16487
[scrypt]: https://nodejs.org/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback
[모듈 해석 알고리즘]: https://nodejs.org/api/modules.html#modules_all_together
[무결성 검사가 포함된 정책 메커니즘]: https://nodejs.org/api/permissions.html#integrity-checks
[실험적 기능]: #experimental-features-in-production
[`Socket`]: https://socket.dev/
[OpenSSF]: https://openssf.org/
[OpenSSF Scorecard]: https://securityscorecards.dev/
[OpenSSF 모범 사례 배지 프로그램]: https://bestpractices.coreinfrastructure.org/en
