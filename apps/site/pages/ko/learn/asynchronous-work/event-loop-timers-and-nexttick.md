---
title: Node.js 이벤트 루프
layout: learn
---

# Node.js 이벤트 루프

## 이벤트 루프란?

이벤트 루프는 기본적으로 하나의 JavaScript 스레드만 사용함에도 불구하고, Node.js가 비차단(non-blocking) I/O 작업을 수행할 수 있도록 해줍니다. 이는 가능한 경우 시스템 커널에 작업을 오프로드하기 때문입니다.

대부분의 현대 커널은 멀티 스레드이므로 백그라운드에서 여러 작업을 처리할 수 있습니다. 이 중 하나의 작업이 완료되면 커널은 Node.js에 이를 알려 적절한 콜백을 **poll** 큐에 추가하여 결국 실행되도록 합니다. 이 내용은 이후에 더 자세히 설명하겠습니다.

## 이벤트 루프 설명

Node.js가 시작되면, 이벤트 루프를 초기화하고 제공된 입력 스크립트를 처리합니다(이 문서에서 다루지 않는 [REPL][]에 진입할 수도 있음). 스크립트는 비동기 API 호출을 하거나, 타이머를 예약하거나, `process.nextTick()`을 호출할 수 있으며, 그런 다음 이벤트 루프 처리를 시작합니다.

다음 다이어그램은 이벤트 루프의 작동 순서에 대한 간략한 개요를 보여줍니다.

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

> 각 상자는 이벤트 루프의 "단계"로 지칭됩니다.

각 단계는 실행할 콜백의 FIFO 큐를 가지고 있습니다. 각 단계는 저마다 고유하지만, 일반적으로 이벤트 루프가 특정 단계에 진입하면 그 단계에 고유한 작업을 수행한 후 해당 단계의 큐에 있는 콜백을 최대한 실행합니다. 큐가 모두 소진되거나 최대 콜백 실행 수에 도달하면, 이벤트 루프는 다음 단계로 이동하는 방식입니다.

이 작업들 중 일부는 _더 많은_ 작업을 예약할 수 있으며, 커널에서 **poll** 단계에서 처리된 새 이벤트는 이벤트 처리 중에도 큐에 추가될 수 있습니다. 이로 인해 장시간 실행되는 콜백은 타이머의 임계값을 넘어서도 **poll** 단계를 계속 실행할 수 있습니다. 자세한 내용은 [**timers**](#timers) 및 [**poll**](#poll) 섹션을 참조하십시오.

> Windows와 Unix/Linux 구현 간에 약간의 차이가 있지만, 이 시점에서는 중요하지 않습니다. 중요한 부분은 여기 나와 있는 내용이며, 실제로 Node.js가 사용하는 단계는 위의 단계들입니다.

## 단계 개요

- **timers**: 이 단계에서는 `setTimeout()` 및 `setInterval()`로 예약된 콜백을 실행합니다.
- **pending callbacks**: 다음 루프 반복으로 연기된 I/O 콜백을 실행합니다.
- **idle, prepare**: 내부에서만 사용됩니다.
- **poll**: 새로운 I/O 이벤트를 검색하고, I/O 관련 콜백을 실행합니다(타이머로 예약된 것, `setImmediate()`를 제외한 거의 모든 것). 적절할 경우 이 단계에서 Node.js는 블록됩니다.
- **check**: `setImmediate()` 콜백이 이 단계에서 실행됩니다.
- **close callbacks**: 예를 들어 `socket.on('close', ...)`과 같은 일부 close 콜백이 실행됩니다.

이벤트 루프의 각 실행 사이에 Node.js는 비동기 I/O 또는 타이머를 기다리고 있는지 확인하고, 없다면 깨끗하게 종료됩니다.

## 단계별 설명

### timers

타이머는 제공된 콜백이 _실행될 수 있는_ **임계값**을 지정하며, 특정 시간이 정확하게 _실행되기를 원하는 시간_ 을 의미하지는 않습니다. 타이머 콜백은 지정된 시간이 경과한 후 가능한 빨리 실행됩니다. 하지만 운영 체제의 스케줄링 또는 다른 콜백의 실행으로 인해 지연될 수 있습니다.

> 기술적으로 [**poll** 단계](#poll)가 타이머의 실행 시점을 제어합니다.

예를 들어, 100ms 후에 실행되도록 타임아웃을 예약했다고 가정하고, 스크립트가 95ms가 걸리는 파일을 비동기적으로 읽기 시작한다고 가정해 보겠습니다:

```js
const fs = require('node:fs');

function someAsyncOperation(callback) {
  // 완료하는 데 95ms가 걸린다고 가정
  fs.readFile('/path/to/file', callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);

// 95ms가 걸리는 someAsyncOperation 수행
someAsyncOperation(() => {
  const startCallback = Date.now();

  // 10ms가 걸리는 작업 수행...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});
```

이벤트 루프가 **poll** 단계에 들어가면, 큐가 비어 있습니다(`fs.readFile()`이 아직 완료되지 않았기 때문). 그래서 가장 가까운 타이머의 임계값에 도달할 때까지 남은 ms 동안 대기합니다. 95ms가 지나고 `fs.readFile()`이 파일 읽기를 마치고, 해당 콜백(10ms가 걸림)이 **poll** 큐에 추가되고 실행됩니다. 콜백이 완료되면 큐에 더 이상 콜백이 없기 때문에, 이벤트 루프는 가장 가까운 타이머의 임계값이 도달했음을 확인하고 **timers** 단계로 돌아가 타이머의 콜백을 실행합니다. 이 예에서 타이머가 예약되고 콜백이 실행될 때까지 총 지연 시간은 105ms가 될 것입니다.

> **poll** 단계가 이벤트 루프를 과도하게 점유하지 않도록 하기 위해, [libuv][](Node.js 이벤트 루프와 플랫폼의 모든 비동기 동작을 구현하는 C 라이브러리)는 더 이상 이벤트를 폴링하지 않도록 하는 시스템 종속적인 최대 한계를 가지고 있습니다.

### pending callbacks

이 단계에서는 TCP 오류 유형과 같은 일부 시스템 작업에 대한 콜백을 실행합니다. 예를 들어, TCP 소켓이 연결을 시도할 때 `ECONNREFUSED`를 수신하면 일부 \*nix 시스템은 오류를 보고하기 전에 기다리기를 원합니다. 이는 **pending callbacks** 단계에서 실행되도록 대기열에 추가됩니다.

### poll

**poll** 단계에는 두 가지 주요 기능이 있습니다:

1. I/O를 폴링하고 차단할 시간을 계산합니다.
2. **poll** 큐에서 이벤트를 처리합니다.

이벤트 루프가 **poll** 단계에 들어가고 _타이머가 예약되지 않은 경우_, 두 가지 중 하나가 발생합니다:

- _**poll** 큐가 **비어 있지 않으면**_, 이벤트 루프는 큐의 콜백을 동기적으로 실행합니다. 큐가 소진되거나 시스템 종속적인 최대 한계에 도달할 때까지 반복합니다.
- _**poll** 큐가 **비어 있으면**_, 추가로 두 가지 중 하나가 발생합니다:

  - `setImmediate()`에 의해 스크립트가 예약된 경우, 이벤트 루프는 **poll** 단계를 종료하고 **check** 단계로 이동하여 예약된 스크립트를 실행합니다.
  - `setImmediate()`에 의해 스크립트가 예약되지 않은 경우, 이벤트 루프는 큐에 콜백이 추가될 때까지 기다렸다가 즉시 실행합니다.

**poll** 큐가 비어 있으면 이벤트 루프는 타이머의 시간이 도달했는지 확인합니다. 하나 이상의 타이머가 준비되면, 이벤트 루프는 **timers** 단계로 다시 돌아가 해당 타이머의 콜백을 실행합니다.

### check

이 단계는 **poll** 단계가 완료된 직후 콜백을 즉시 실행할 수 있게 합니다. **poll** 단계가 유휴 상태가 되고 `setImmediate()`로 스크립트가 예약된 경우, 이벤트 루프는 대기하지 않고 **check** 단계로 진행할 수 있습니다.

`setImmediate()`는 실제로 이벤트 루프의 별도 단계에서 실행되는 특수 타이머입니다. 이 함수는 **poll** 단계가 완료된 후 콜백을 실행하도록 libuv API를 사용합니다.

일반적으로 코드를 실행하면 이벤트 루프는 결국 **poll** 단계에 도달하여 들어오는 연결이나 요청 등을 대기합니다. 그러나 `setImmediate()`로 콜백이 예약되고 **poll** 단계가 유휴 상태가 되면 대기하지 않고 **check** 단계로 이동합니다.

### close callbacks

소켓이나 핸들이 갑자기 닫힌 경우(예: `socket.destroy()`), `'close'` 이벤트는 이 단계에서 발생합니다. 그렇지 않으면 `process.nextTick()`을 통해 발생합니다.

## `setImmediate()` vs `setTimeout()`

`setImmediate()`와 `setTimeout()`은 유사하지만 호출 시점에 따라 다르게 동작합니다.

- `setImmediate()`는 현재 **poll** 단계가 완료된 후 스크립트를 실행하도록 설계되었습니다.
- `setTimeout()`은 최소 임계값(ms)이 경과한 후 스크립트를 실행하도록 예약합니다.

타이머가 실행되는 순서는 호출된 컨텍스트에 따라 다릅니다. 둘 다 메인 모듈 내에서 호출된 경우, 타이머의 순서는 프로세스 성능에 의해 좌우되며, 이는 기기에서 실행 중인 다른 애플리케이션에 의해 영향을 받을 수 있습니다.

예를 들어, I/O 사이클 내에 있지 않은(즉, 메인 모듈) 다음 스크립트를 실행하면 두 타이머의 실행 순서는 프로세스의 성능에 따라 결정되므로 비결정적입니다:

```js
// timeout_vs_immediate.js
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});
```

```bash
$ node timeout_vs_immediate.js
timeout
immediate

$ node timeout_vs_immediate.js
immediate
timeout
```

However, if you move the two calls within an I/O cycle, the immediate
callback is always executed first:

```js
// timeout_vs_immediate.js
const fs = require('node:fs');

fs.readFile(\_\_filename, () => {
setTimeout(() => {
console.log('timeout');
}, 0);
setImmediate(() => {
console.log('immediate');
});
});
```

```bash
$ node timeout_vs_immediate.js
immediate
timeout

$ node timeout_vs_immediate.js
immediate
timeout
```

`setImmediate()`를 사용하는 주요 이점은 I/O 사이클 내에서 예약되었을 때 `setImmediate()`가 항상 모든 타이머보다 먼저 실행된다는 것입니다. 타이머가 얼마나 많이 있는지와 상관없이 말이죠.

## `process.nextTick()`

### `process.nextTick()` 이해하기

`process.nextTick()`은 비동기 API의 일부임에도 불구하고 다이어그램에 표시되지 않았다는 것을 눈치챘을 것입니다. 그 이유는 `process.nextTick()`이 기술적으로 이벤트 루프의 일부가 아니기 때문입니다. 대신, `nextTickQueue`는 현재 작업이 완료된 후에 처리되며, 현재 이벤트 루프의 단계와 상관없이 처리됩니다. 여기서 *작업*이란 기본 C/C++ 핸들러에서 JavaScript로 전환하여 실행되는 작업을 의미합니다.

다이어그램을 다시 살펴보면, 주어진 단계에서 `process.nextTick()`을 호출할 때, 이벤트 루프가 계속되기 전에 `process.nextTick()`에 전달된 모든 콜백이 먼저 처리됩니다. 이는 I/O를 "굶기"는 문제를 일으킬 수 있는데, 이는 재귀적으로 `process.nextTick()`을 호출하여 이벤트 루프가 **poll** 단계에 도달하지 못하게 막을 수 있기 때문입니다.

### 왜 이런 기능이 허용될까요?

이러한 기능이 Node.js에 포함된 이유 중 하나는 API가 반드시 그럴 필요가 없더라도 항상 비동기로 동작해야 한다는 디자인 철학 때문입니다. 예를 들어, 다음 코드 스니펫을 보세요:

```js
function apiCall(arg, callback) {
  if (typeof arg !== 'string')
    return process.nextTick(
      callback,
      new TypeError('argument should be string')
    );
}
```

이 스니펫은 인수 확인을 수행하고, 인수가 올바르지 않으면 콜백에 오류를 전달합니다. API는 최근에 업데이트되어 `process.nextTick()`에 전달된 인수를 콜백에 전달할 수 있게 되었습니다. 따라서 함수를 중첩하지 않고도 콜백에 인수를 전달할 수 있습니다.

여기서 우리가 하고 있는 일은 사용자 코드가 실행될 수 있도록 허용한 후에 오류를 사용자에게 전달하는 것입니다. `process.nextTick()`을 사용함으로써 `apiCall()`이 항상 사용자의 코드가 실행된 **후에** 콜백을 실행하고, 이벤트 루프가 진행되기 **전에** 콜백이 실행된다는 것을 보장합니다. 이를 달성하기 위해 JS 호출 스택이 해제된 후 제공된 콜백이 즉시 실행되며, 이를 통해 v8에서 `RangeError: Maximum call stack size exceeded` 오류 없이 재귀적으로 `process.nextTick()`을 호출할 수 있게 됩니다.

이 철학은 잠재적으로 문제를 일으킬 수 있습니다. 다음 스니펫을 보세요:

```js
let bar;

// 비동기 시그니처를 가졌지만 콜백을 동기적으로 호출함
function someAsyncApiCall(callback) {
  callback();
}

// 콜백은 `someAsyncApiCall`이 완료되기 전에 호출됩니다.
someAsyncApiCall(() => {
  // someAsyncApiCall이 완료되지 않았으므로 bar는 아직 값이 할당되지 않음
  console.log('bar', bar); // undefined
});

bar = 1;
```

사용자는 `someAsyncApiCall()`을 비동기 시그니처로 정의했지만, 실제로는 동기적으로 동작합니다. 호출될 때, 제공된 콜백은 같은 이벤트 루프 단계에서 호출됩니다. 왜냐하면 `someAsyncApiCall()`이 실제로는 비동기 작업을 수행하지 않기 때문입니다. 그 결과, 콜백은 스크립트가 완료되기 전에 변수를 참조하려고 시도할 수 있습니다.

콜백을 `process.nextTick()`에 배치함으로써 스크립트는 여전히 완료될 수 있으며, 변수가 콜백이 호출되기 전에 초기화될 수 있습니다. 또한 이벤트 루프가 계속되지 않도록 하는 이점이 있습니다. 오류가 발생하기 전에 이벤트 루프가 계속되는 것을 막는 것이 사용자가 오류에 대해 알림을 받는 데 유용할 수 있습니다. 다음은 `process.nextTick()`을 사용한 이전 예제입니다:

```js
let bar;

function someAsyncApiCall(callback) {
  process.nextTick(callback);
}

someAsyncApiCall(() => {
  console.log('bar', bar); // 1
});

bar = 1;
```

다음은 실제 예제입니다:

```js
const server = net.createServer(() => {}).listen(8080);

server.on('listening', () => {});
```

포트만 전달된 경우, 포트는 즉시 바인딩됩니다. 따라서 `'listening'` 콜백이 즉시 호출될 수 있습니다. 문제는 그 시점까지 `.on('listening')` 콜백이 설정되지 않았다는 것입니다.

이 문제를 해결하기 위해 `'listening'` 이벤트는 스크립트가 완료될 수 있도록 `nextTick()`에 대기열에 추가됩니다. 이를 통해 사용자가 원하는 이벤트 핸들러를 설정할 수 있습니다.

## `process.nextTick()` vs `setImmediate()`

이 두 호출은 사용자 관점에서 유사하지만, 이름이 혼란을 줄 수 있습니다.

- `process.nextTick()`은 같은 단계에서 즉시 실행됩니다.
- `setImmediate()`는 이벤트 루프의 다음 반복 또는 '틱'에서 실행됩니다.

본질적으로, 이 두 이름은 서로 바뀌어야 했습니다. `process.nextTick()`이 `setImmediate()`보다 더 즉각적으로 실행되기 때문입니다. 하지만 이는 과거의 산물이며, 바뀔 가능성은 거의 없습니다. 이러한 변경은 npm에 있는 많은 패키지에 큰 영향을 미칠 것입니다. 매일 더 많은 모듈이 추가되므로, 시간이 지날수록 잠재적인 문제가 더 많이 발생할 수 있습니다. 이름이 혼란스럽긴 하지만, 이 이름들은 변경되지 않을 것입니다.

> 개발자에게는 모든 경우에 `setImmediate()`를 사용하는 것이 더 이해하기 쉽기 때문에 권장합니다.

## `process.nextTick()`을 사용하는 이유는?

두 가지 주요 이유가 있습니다:

1. 사용자가 오류를 처리하거나 더 이상 필요 없는 리소스를 정리하거나, 또는 요청을 다시 시도할 수 있도록 하기 위해, 이벤트 루프가 계속되기 전에 이를 허용합니다.

2. 호출 스택이 해제된 후, 이벤트 루프가 계속되기 전에 콜백을 실행할 필요가 있을 때가 있습니다.

간단한 예로, 사용자의 기대치를 충족시키기 위한 경우가 있습니다. 다음은 간단한 예입니다:

```js
const server = net.createServer();
server.on('connection', conn => {});

server.listen(8080);
server.on('listening', () => {});
```

`listen()`이 이벤트 루프의 시작 부분에서 실행된다고 가정할 때, `listening` 콜백은 `setImmediate()`에 배치됩니다. 호스트 이름이 전달되지 않으면 포트에 즉시 바인딩됩니다. 이벤트 루프가 진행되려면 **poll** 단계를 거쳐야 하므로 연결이 수신되어 연결 이벤트가 `listening` 이벤트 전에 발생할 가능성이 있습니다.

다른 예로는 `EventEmitter`를 확장하고 생성자 내에서 이벤트를 발생시키는 경우입니다:

```js
const EventEmitter = require('node:events');

class MyEmitter extends EventEmitter {
  constructor() {
    super();
    this.emit('event');
  }
}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
```

생성자에서 이벤트를 즉시 발생시킬 수 없습니다. 왜냐하면 사용자가 그 이벤트에 대한 콜백을 할당할 때까지 스크립트가 처리되지 않았기 때문입니다. 따라서 생성자 내에서 `process.nextTick()`을 사용하여 생성자가 완료된 후 이벤트를 발생시키도록 설정하면 예상대로 동작합니다:

```js
const EventEmitter = require('node:events');

class MyEmitter extends EventEmitter {
  constructor() {
    super();

    // 핸들러가 할당된 후 이벤트를 발생시키도록 nextTick 사용
    process.nextTick(() => {
      this.emit('event');
    });
  }
}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
```

[libuv]: https://libuv.org/
[REPL]: https://nodejs.org/api/repl.html#repl_repl
