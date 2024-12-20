---
title: Node.js 소개
layout: learn
authors: sulmoJ
---

# Node.js 소개

Node.js는 오픈소스고 cross-platform JavaScript 런타임 환경입니다. 어떤 프로젝트이건 대부분 인기가 좋은 툴입니다.

Node.js는 브라우저의 외부에서 구글 크롬의 핵심인 V8 JavaScript 엔진을 실행합니다. Node.js가 매우 성능이 좋다는걸 보여줍니다.

Node.js 앱은 모든 요청을 신규 쓰레드 생성 없이 단일 프로세스로 실행합니다.  Node.js는 기본 라이브러리로 비동기 입출력 기본셋을 제공하여 JavaScript 코드 병목을 예방하고, 일반적으로, Node.js의 라이브러리들은 논블록 패러다임을 사용하여 작성됩니다. 블록킹을 만드는 동작은 예외적인 경우에 해당합니다.

Node.js가 네트워크 통신을 하거나, DB나 파일 시스템 접근같이 입출력을 수행할때, 쓰레드 병목과 CPU를 굴려 낭비하는 대신에, Node.js는 응답이 올 때 작업을 재개합니다.

이런 동작 방식은 Node.js가 1000여개의 동시 커넥션을 버그의 주된 원인이 될 수 있는 스레드 동시성 관리에 부담없이 단일 서버로 돌리는게 가능하도록 합니다.

Node.js는 브라우저용 JavaScript를 작성하는 수 많은 프론트 개발자들이 이제 클라이언트 측 코드 외에도 다른언어를 배우지 않고서 서버사이드 코드를 작성이 가능한고유한 이점을 가지고 있습니다.

Node.js에서는 유저가 브라우저를 업데이트하길 기다리지 않아도 됨으로 새로운 ECMAScript 표준을 문제없이 사용가능합니다. Node.js 버전을 변경하여 사용할 ECMAScript 버전을 결정할 수 있으며, 플래그를 사용하여 Node.js를 실행하여 특정 실험적 기능을 활성화할 수도 있습니다.


## Node.js 애플리케이션 예시

Node.js의 가장 일반적인 Hello World예시는 웹 서버입니다.

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

이 코드 조각을 실행하기위해, 코드를 `server.js`파일로 저장하고 `node server.js` 를 터미널에서 실행하면 됩니다. 만약 mjs 버전으로 사용하실 경우 `server.mjs`파일로 저장하고 `node server.mjs`를  터미널에서 실행하십시오.

이 코드는 우선 Node.js [`http` 모듈](https://nodejs.org/api/http.html)이 포함됩니다.

Node.js는 뽠타스틱한 [기본 라이브러리](https://nodejs.org/api/)가지고 있으며, 네트워크 통신을 위한 높은 수준의 지원을 포함하고 있습니다. 

`http`의 `createServer()`메서드는 신규 HTTP 서버를 만들고 반환합니다.

서버는 특정 포트와 호스트 명을 수신하도록 설정됩니다. 서버가 준비되면 콜백함수가 호출되고, 이 경우 서버가 동작중인걸 우리에게 알려주게 됩니다.

새로운 요청이 받아질때마다  [`request` 이벤트](https://nodejs.org/api/http.html#http_event_request)가 호출되며, 두 객체가 제공됩니다.
두 객체: request([`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) 객체)와 response([`http.ServerResponse`](https://nodejs.org/api/http.html#http_class_http_serverresponse) 객체)

저 두가지는 HTTP 요청 조작을 위해 필수적인 객체입니다.

첫 번째는 request 상세를 제공합니다. 위 간단 예시에서는 사용되지 않지만, 요청헤더와 요청 데이터에 접근이 가능합니다.

두번째는 호출자에게 데이터를 반환하기 위해서 사용됩니다.

해당 경우는 다음과 같습니다:
```js
res.statusCode = 200;
```

우리는 성공적인 응답을 나타내기위해 statusCode 속성을 200으로 설정했습니다.

Content-Type 헤더 설정합니다:
```js
res.setHeader('Content-Type', 'text/plain');
```

그리고 내용을 `end()`의 인자로 추가하면서 응답을 종료합니다

```js
res.end('Hello World\n');
```

아직 Node.js를 다운받지 않았다면, 지금 [다운로드](https://nodejs.org/en/download)하세요.
