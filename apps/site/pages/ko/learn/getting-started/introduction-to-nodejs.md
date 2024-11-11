---
title: Node.js 소개
layout: learn
authors: flaviocopes, potch, MylesBorins, RomainLanz, virkt25, Trott, onel0p3z, ollelauribostrom, MarkPieszak, fhemberger, LaRuaNa, FrozenPandaz, mcollina, amiller-gh, ahmadawais, saqibameen, dangen-effy, aymen94, benhalverson
---

# Node.js 소개

Node.js는 오픈 소스이자 크로스 플랫폼 자바스크립트 런타임 환경입니다. 거의 모든 종류의 프로젝트에 적합한 인기 있는 도구입니다!

Node.js는 구글 크롬의 핵심인 V8 자바스크립트 엔진을 브라우저 외부에서 실행합니다. 이로 인해 Node.js는 매우 성능이 뛰어납니다.

Node.js 애플리케이션은 단일 프로세스에서 실행되며, 각 요청마다 새로운 스레드를 생성하지 않습니다. Node.js는 표준 라이브러리에서 비동기 I/O 원시 기능을 제공하여 JavaScript 코드가 블로킹되지 않도록 합니다. 일반적으로 Node.js의 라이브러리는 비블로킹 패러다임을 사용하여 블로킹 동작이 일반적이지 않도록 합니다.

Node.js가 네트워크에서 읽기, 데이터베이스에 접근하거나 파일 시스템에 접근하는 등의 I/O 작업을 수행할 때, 스레드를 블로킹하고 CPU 사이클을 낭비하는 대신, Node.js는 응답이 돌아올 때 작업을 재개합니다.

이러한 방식으로 Node.js는 단일 서버에서 수천 개의 동시 연결을 처리할 수 있으며, 스레드 동시성 관리의 부담을 도입하지 않아 오류의 주요 원인이 될 수 있습니다.

Node.js는 독특한 이점을 제공합니다. 브라우저에서 JavaScript를 작성하는 수백만 명의 프론트엔드 개발자가 이제는 서버 측 코드를 작성할 수 있게 되었습니다. 완전히 다른 언어를 배울 필요가 없습니다.

Node.js에서는 새로운 ECMAScript 표준을 문제 없이 사용할 수 있습니다. 모든 사용자가 브라우저를 업데이트하기를 기다릴 필요가 없으며, Node.js 버전을 변경하여 사용할 ECMAScript 버전을 결정하고, 플래그를 사용하여 특정 실험적 기능을 활성화할 수 있습니다.

## Node.js 애플리케이션 예제

Node.js의 가장 일반적인 Hello World 예제는 웹 서버입니다:

```cjs
const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

```mjs
import { createServer } from 'node:http';

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

이 코드를 실행하려면 `server.js` 파일로 저장한 후 터미널에서 `node server.js`를 실행하세요.
mjs 버전을 사용할 경우 `server.mjs` 파일로 저장하고 터미널에서 `node server.mjs`를 실행해야 합니다.

이 코드는 먼저 Node.js [`http` 모듈](https://nodejs.org/api/http.html)을 포함합니다.

Node.js는 훌륭한 [표준 라이브러리](https://nodejs.org/api/)를 제공하며, 네트워킹에 대한 일급 지원을 포함합니다.

`http`의 `createServer()` 메서드는 새로운 HTTP 서버를 생성하고 반환합니다.

서버는 지정된 포트와 호스트 이름에서 수신 대기하도록 설정됩니다. 서버가 준비되면 콜백 함수가 호출되어 서버가 실행 중임을 알립니다.

새로운 요청이 수신될 때마다 [`request` 이벤트](https://nodejs.org/api/http.html#http_event_request)가 호출되며, 두 개의 객체를 제공합니다: 요청 ( [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) 객체)과 응답 ( [`http.ServerResponse`](https://nodejs.org/api/http.html#http_class_http_serverresponse) 객체)입니다.

이 두 객체는 HTTP 호출을 처리하는 데 필수적입니다.

첫 번째 객체는 요청 세부정보를 제공합니다. 이 간단한 예제에서는 사용되지 않지만, 요청 헤더 및 요청 데이터를 접근할 수 있습니다.

두 번째 객체는 호출자에게 데이터를 반환하는 데 사용됩니다.

이 경우에는:

```js
res.statusCode = 200;
```

를 사용하여 statusCode 속성을 200으로 설정하여 성공적인 응답을 나타냅니다.

Content-Type 헤더를 설정합니다:

```js
res.setHeader('Content-Type', 'text/plain');
```

그리고 응답을 종료하며, 내용을 `end()`의 인자로 추가합니다:

```js
res.end('Hello World\n');
```
