---
layout: about.hbs
title: About
trademark: 트레이드마크
---

# Node.js&reg;에 대해서

비동기 이벤트 주도 JavaScript 런타임으로써 Node.js 는 확장성 있는 네트워크 애플리케이션을 만들 수 있도록
설계되었습니다. 다음 "hello world" 예제는 다수의 연결을 동시에 처리할 수 있습니다.
각 연결에서 콜백이 실행되는데 실행할 작업이 없다면 Node.js 는 대기합니다.

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

이는 오늘날 OS 스레드가 일반적으로 사용하는 동시성 모델과는 대조적입니다. 스레드 기반의 네트워크는
상대적으로 비효율적이고 사용하기가 몹시 어렵습니다. 게다가 잠금이 없으므로 Node.js 의 사용자는 프로세스의
교착상태에 대해서 걱정할 필요가 없습니다. Node.js 에서 I/O를 직접 수행하는 함수는 거의 없으므로 프로세스는
결과 블로킹 되지 않습니다. 아무것도 블로킹 되지 않으므로 Node.js 에서는 확장성 있는 시스템을 개발하는 게
아주 자연스럽습니다.

여기서 나오는 용어가 익숙하지 않다면 [블로킹 대 논-블로킹][]에 대한 글을 읽어보세요.

---

Node.js 는 Ruby의 [Event Machine][]이나 Python의 [Twisted][]같은 시스템과 설계상 유사하고
영향을 받았습니다. Node.js 는 좀 더 발전된 이벤트 모델을 선택해서 라이브러리가 아닌 런타임 생성자로
[이벤트 루프][]를 제공합니다. 다른 시스템에서는 이벤트 루프를 시작하는 블럭킹 호출이 항상 존재합니다.

보통은 스크립트의 시작 부분에서 콜백을 통해서 동작을 정의하고 마지막에서 `EventMachine::run()`같은
블로킹 호출로 서버를 시작합니다. Node.js 에서는 이와 같은 이벤트 루프를 시작하는 호출이 없습니다. Node.js 는
입력 스크립트를 실행한 후에 이벤트 루프에 바로 진입합니다. 더이상 실행할 콜백이 없다면 Node.js 는
이벤트 루프를 종료합니다. 이 동작은 브라우저 JavaScript과 같이 사용자에게서 이벤트 루프를 감춥니다.

Node.js 에서 HTTP는 일급 객체(first class citizen)이고 스트리밍과 저지연을 염두에 두고
설계되었습니다. 이는 Node.js 가 웹 라이브러리나 프레임워크의 기반으로 아주 적합하게 하였습니다.

Node.js 는 스레드를 사용하지 않도록 설계되지만 멀티 코어 환경의 장점을 얻지 못한다는 의미는 아닙니다.
[`child_process.fork()`][] API를 사용해서 자식 프로세스를 생성할 수 있습니다. 같은 인터페이스로
만들어진 [`cluster`][]을 사용하면 다수의 코어에 로드 밸런싱이 가능하도록 프로세스 간에
소켓을 공유할 수 있습니다.

[블로킹 대 논-블로킹]: /ko/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[이벤트 루프]: /ko/docs/guides/event-loop-timers-and-nexttick/
[Event Machine]: https://github.com/eventmachine/eventmachine
[Twisted]: https://twistedmatrix.com/trac/
