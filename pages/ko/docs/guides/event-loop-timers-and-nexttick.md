---
title: Node.js 이벤트 루프, 타이머, `process.nextTick()`
layout: docs.hbs
---

<!--
# The Node.js Event Loop, Timers, and `process.nextTick()`

## What is the Event Loop?

The event loop is what allows Node.js to perform non-blocking I/O
operations — despite the fact that JavaScript is single-threaded — by
offloading operations to the system kernel whenever possible.

Since most modern kernels are multi-threaded, they can handle multiple
operations executing in the background. When one of these operations
completes, the kernel tells Node.js so that the appropriate callback
may be added to the **poll** queue to eventually be executed. We'll explain
this in further detail later in this topic.
-->

# Node.js 이벤트 루프, 타이머, `process.nextTick()`

## 이벤트 루프란?

이벤트 루프는 가능하다면 언제나 시스템 커널에 작업을 떠넘겨서 Node.js가
논 블로킹 I/O 작업을 수행하도록 해줍니다.(JavaScript가 싱글 스레드임에도 불구하고)

대부분의 현대 커널은 멀티 스레드이므로 백그라운드에서 다수의 작업을 실행할 수 있습니다.
이러한 작업 중 하나가 완료되면 커널이 Node.js에게 알려주어 적절한 콜백을 **poll** 큐에
추가할 수 있게 하여 결국 실행되게 합니다. 이 글 후반부에서 더 자세한 내용을 설명할 것입니다.

<!--
## Event Loop Explained

When Node.js starts, it initializes the event loop, processes the
provided input script (or drops into the [REPL][], which is not covered in
this document) which may make async API calls, schedule timers, or call
`process.nextTick()`, then begins processing the event loop.

The following diagram shows a simplified overview of the event loop's
order of operations.

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

*note: each box will be referred to as a "phase" of the event loop.*
-->

## 이벤트 루프 설명

Node.js를 시작할 때 이벤트 루프를 초기화하고 제공된 입력 스크립트(또는 이 문서에서는
다루지 않는 [REPL][]에 입력한)를 처리합니다. 이때 이 스크립트는 비동기 API를 호출하거나
스케줄링된 타이머를 사용하거나 `process.nextTick()`를 호출할 수 있습니다.
그다음 이벤트 루프 처리를 시작합니다.

아래 다이어그램은 이벤트 루프의 작업 순서의 간단한 개요를 보여줍니다.

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

*note: 각 박스는 이벤트 루프의 "단계"를 의미합니다.*

<!--
Each phase has a FIFO queue of callbacks to execute. While each phase is
special in its own way, generally, when the event loop enters a given
phase, it will perform any operations specific to that phase, then
execute callbacks in that phase's queue until the queue has been
exhausted or the maximum number of callbacks has executed. When the
queue has been exhausted or the callback limit is reached, the event
loop will move to the next phase, and so on.

Since any of these operations may schedule _more_ operations and new
events processed in the **poll** phase are queued by the kernel, poll
events can be queued while polling events are being processed. As a
result, long running callbacks can allow the poll phase to run much
longer than a timer's threshold. See the [**timers**](#timers) and
[**poll**](#poll) sections for more details.

_**NOTE:** There is a slight discrepancy between the Windows and the
Unix/Linux implementation, but that's not important for this
demonstration. The most important parts are here. There are actually
seven or eight steps, but the ones we care about — ones that Node.js
actually uses - are those above._
-->

각 단계는 실행할 콜백의 FIFO 큐를 가집니다. 각 단계는 자신만의 방법에 제한적이므로
보통 이벤트 루프가 해당 단계에 진입하면 해당 단계에 한정된 작업을 수행하고 큐를 모두
소진하거나 콜백의 최대 개수를 실행할 때까지 해당 단계의 큐에서 콜백을 실행합니다.
큐를 모두 소진하거나 콜백 제한에 이르면 이벤트 루프는 다음 단계로 이동합니다.

이러한 작업이 _또 다른_ 작업을 스케줄링하거나 **poll** 단계에서 처리된 새로운 이벤트가
커널에 의해 큐에 추가될 수 있으므로 폴링 이벤트를 처리하면서 poll 이벤트를 큐에 추가할 수 있습니다.
그 결과 오래 실행되는 콜백은 poll 단계가 타이머의 한계 시점보다 훨씬 더 오래
실행되도록 할 수 있습니다. 자세한 내용은 [**timers**](#timers)와
[**poll**](#poll)을 참고하세요.

_**NOTE:** 윈도우와 Unix/Linux 구현체간에 약간의 차이가 있지만 여기서는 중요치
않습니다. 실제 7~8단계가 있지만 Node.js가 실제로 사용해서 신경 써야 하는
가장 중요한 단계는 위의 단계입니다._

<!--
## Phases Overview

* **timers**: this phase executes callbacks scheduled by `setTimeout()`
 and `setInterval()`.
* **pending callbacks**: executes I/O callbacks deferred to the next loop
 iteration.
* **idle, prepare**: only used internally.
* **poll**: retrieve new I/O events; execute I/O related callbacks (almost
 all with the exception of close callbacks, the ones scheduled by timers,
 and `setImmediate()`); node will block here when appropriate.
* **check**: `setImmediate()` callbacks are invoked here.
* **close callbacks**: some close callbacks, e.g. `socket.on('close', ...)`.

Between each run of the event loop, Node.js checks if it is waiting for
any asynchronous I/O or timers and shuts down cleanly if there are not
any.
-->

## 단계 개요

* **timers**: 이 단계는 `setTimeout()`과 `setInterval()`로 스케줄링한
  콜백을 실행합니다.
* **pending callbacks**: 다음 루프 반복으로 연기된 I/O 콜백들을 실행합니다.
* **idle, prepare**: 내부용으로만 사용합니다.
* **poll**: 새로운 I/O 이벤트를 가져옵니다. I/O와 연관된 콜백(클로즈 콜백, 타이머로 스케줄링된 콜백,
  `setImmediate()`를 제외한 거의 모든 콜백)을 실행합니다. 적절한 시기에 node는 여기서 블록 합니다.
* **check**: `setImmediate()` 콜백은 여기서 호출됩니다.
* **close callbacks**: 일부 close 콜백들, 예를 들어 `socket.on('close', ...)`.

이벤트 루프가 실행하는 사이 Node.js는 다른 비동기 I/O나 타이머를 기다리고 있는지
확인하고 기다리고 있는 것이 없다면 깔끔하게 종료합니다.

<!--
## Phases in Detail

### timers

A timer specifies the **threshold** _after which_ a provided callback
_may be executed_ rather than the **exact** time a person _wants it to
be executed_. Timers callbacks will run as early as they can be
scheduled after the specified amount of time has passed; however,
Operating System scheduling or the running of other callbacks may delay
them.

_**Note**: Technically, the [**poll** phase](#poll) controls when timers
are executed._

For example, say you schedule a timeout to execute after a 100 ms
threshold, then your script starts asynchronously reading a file which
takes 95 ms:
-->

## 각 단계의 자세한 설명

### timers

타이머는 사람이 _실행하기를 원하는_ **정확한** 시간이 아니라 제공된 콜백이
_일정 시간 후에 실행되어야 하는_ **기준시간**을 지정합니다. 타이머 콜백은 지정한
시간이 지난 후에 스케줄링 될 수 있는 가장 이른 시간에 실행될 것입니다. 하지만
운영체제 스케줄링이나 다른 콜백 실행 때문에 지연될 수 있습니다.

_**Note**: 기술적으로는 [**poll** 단계](#poll)에서 타이머를 언제 실행할지 제어합니다._

예를 들어, 100ms 임계 값 이후에 실행되도록 만료시간을 지정하면 스크립트는
95ms가 걸리는 파일 읽기를 비동기로 시작합니다.

<!--
```js
const fs = require('fs');

function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile('/path/to/file', callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);

// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();

  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});
```

When the event loop enters the **poll** phase, it has an empty queue
(`fs.readFile()` has not completed), so it will wait for the number of ms
remaining until the soonest timer's threshold is reached. While it is
waiting 95 ms pass, `fs.readFile()` finishes reading the file and its
callback which takes 10 ms to complete is added to the **poll** queue and
executed. When the callback finishes, there are no more callbacks in the
queue, so the event loop will see that the threshold of the soonest
timer has been reached then wrap back to the **timers** phase to execute
the timer's callback. In this example, you will see that the total delay
between the timer being scheduled and its callback being executed will
be 105ms.

Note: To prevent the **poll** phase from starving the event loop, [libuv][]
(the C library that implements the Node.js
event loop and all of the asynchronous behaviors of the platform)
also has a hard maximum (system dependent) before it stops polling for
more events.
-->

```js
const fs = require('fs');

function someAsyncOperation(callback) {
  // 이 작업이 완료되는데 95ms가 걸린다고 가정합니다.
  fs.readFile('/path/to/file', callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);

// 완료하는데 95ms가 걸리는 someAsyncOperation를 실행합니다.
someAsyncOperation(() => {
  const startCallback = Date.now();

  // 10ms가 걸릴 어떤 작업을 합니다.
  while (Date.now() - startCallback < 10) {
    // 아무것도 하지 않습니다.
  }
});
```

이벤트 루프가 **poll** 단계에 진입했을 때 빈 큐를 가지고 있으므로(`fs.readFile()`이
아직 완료되지 않았습니다.) 가장 빠른 타이머의 임계 값에 도달할 때까지 수 밀리 초 기다릴
것입니다. 95ms가 지나기를 기다리는 동안 `fs.readFile()`이 파일 읽기를 끝마치고 완료하는데
10ms가 걸리는 콜백이 **poll** 큐에 추가되어 실행됩니다. 콜백이 완료되었을 때 큐에 있는
콜백이 없으므로 이벤트 루프는 가장 빠른 타이머의 임계 값에 도달했는지를 확인하고 타이머의
콜백을 실행하려고 **timers** 단계에 되돌아갑니다. 이 예제에서 타이머가 스케줄링되고
콜백이 실행되기까지의 전체 지연시간이 105ms가 되는 것을 볼 수 있습니다.

Note: **poll** 단계가 이벤트 루프를 모두 차지하지 않게 하기 위해 [libuv][](Node.js
이벤트 루프와 플랫폼의 모든 비동기 동작을 구현한 C 라이브러리)도 더 많은 이벤트를 폴링하기를
멈추는 하는 하드 최댓값(시스템에 따라 다릅니다.)도 가집니다.

<!--
### pending callbacks

This phase executes callbacks for some system operations such as types
of TCP errors. For example if a TCP socket receives `ECONNREFUSED` when
attempting to connect, some \*nix systems want to wait to report the
error. This will be queued to execute in the **pending callbacks** phase.
-->

### pending 콜백

이 단계에서는 TCP 오류 같은 시스템 작업의 콜백을 실행합니다. 예를 들어 TCP 소켓이
연결을 시도하다가 `ECONNREFUSED`를 받으면 일부 \*nix 시스템은 오류를 보고하기를
기다리려고 합니다. 이는 **pending callbacks** 단계에서 실행되기 위해 큐에 추가될 것입니다.

<!--
### poll

The **poll** phase has two main functions:

1. Calculating how long it should block and poll for I/O, then
2. Processing events in the **poll** queue.

When the event loop enters the **poll** phase _and there are no timers
scheduled_, one of two things will happen:

* _If the **poll** queue **is not empty**_, the event loop will iterate
through its queue of callbacks executing them synchronously until
either the queue has been exhausted, or the system-dependent hard limit
is reached.
-->

### poll

**poll** 단계는 두 가지 주요 기능을 가집니다.

1. I/O를 얼마나 오래 블록하고 폴링해야 하는지 계산합니다. 그 다음
2. **poll** 큐에 있는 이벤트를 처리합니다.

이벤트 루프가 **poll** 단계에 진입하고 _스케줄링된 타이머가 없을 때_
두 가지 중 하나의 상황이 발생합니다.

* _**poll** 큐가 **비어있지 않다면**_ 이벤트 루프가 콜백의 큐를 순회하면서
큐를 다 소진하거나 시스템 의존적인 하드 한계에 도달할 때까지 동기로 콜백을 실행합니다.

<!--
* _If the **poll** queue **is empty**_, one of two more things will
happen:
  * If scripts have been scheduled by `setImmediate()`, the event loop
  will end the **poll** phase and continue to the **check** phase to
  execute those scheduled scripts.

  * If scripts **have not** been scheduled by `setImmediate()`, the
  event loop will wait for callbacks to be added to the queue, then
  execute them immediately.

Once the **poll** queue is empty the event loop will check for timers
_whose time thresholds have been reached_. If one or more timers are
ready, the event loop will wrap back to the **timers** phase to execute
those timers' callbacks.
-->

* _**poll** 큐가 **비어있다면**_ 다음 중 하나의 상황이 발생합니다.
  * 스크립트가 `setImmediate()`로 스케줄링되었다면 이벤트 루프는 **poll** 단계를
  종료하고 스케줄링된 스크립트를 실행하기 위해 **check** 단계로 넘어갑니다.

  * 스크립트가 `setImmediate()`로 스케줄링되지 않았다면 이벤트 루프는 콜백이 큐에
  추가되기를 기다린 후 즉시 실행합니다.

**poll** 큐가 일단 비게 되면 타이머가 _시간 임계점에 도달했는지_ 확인할 것입니다.
하나 이상의 타이머가 준비되었다면 이벤트 루프는 타이머의 콜백을 실행하기 위해
**timers** 단계로 돌아갈 것입니다.

<!--
### check

This phase allows a person to execute callbacks immediately after the
**poll** phase has completed. If the **poll** phase becomes idle and
scripts have been queued with `setImmediate()`, the event loop may
continue to the **check** phase rather than waiting.

`setImmediate()` is actually a special timer that runs in a separate
phase of the event loop. It uses a libuv API that schedules callbacks to
execute after the **poll** phase has completed.

Generally, as the code is executed, the event loop will eventually hit
the **poll** phase where it will wait for an incoming connection, request,
etc. However, if a callback has been scheduled with `setImmediate()`
and the **poll** phase becomes idle, it will end and continue to the
**check** phase rather than waiting for **poll** events.
-->

### check

이 단계는 **poll** 단계가 완료된 직후 사람이 콜백을 실행할 수 있게 합니다. **poll**
단계가 유휴상태가 되고 스크립트가 `setImmediate()`로 큐에 추가되었다면 이벤트 루프를
기다리지 않고 **check** 단계를 계속할 것입니다.

`setImmediate()`는 사실 이벤트 루프의 별도 단계에서 실행되는 특수한 타이머입니다.
`setImmediate()`는 **poll** 단계가 완료된 후 콜백 실행을 스케줄링하는데
libuv API를 사용합니다.

보통 코드가 실행되었으므로 이벤트 루프는 들어오는 연결, 요청 등을 기다리는
**poll** 단계에 결국 다다르게 됩니다. 하지만 콜백이 `setImmediate()`로
스케줄링되었고 **poll** 단계가 유휴상태가 되었다면 **poll** 이벤트를 기다리지 않고
**check** 단계로 넘어가게 됩니다.

<!--
### close callbacks

If a socket or handle is closed abruptly (e.g. `socket.destroy()`), the
`'close'` event will be emitted in this phase. Otherwise it will be
emitted via `process.nextTick()`.
-->

### close 콜백

소켓이나 핸들이 갑자기 닫힌 경우(예: `socket.destroy()`) 이 단계에서
`'close'` 이벤트가 발생할 것입니다. 그렇지 않으면 `process.nextTick()`으로
실행될 것입니다.

<!--
## `setImmediate()` vs `setTimeout()`

`setImmediate()` and `setTimeout()` are similar, but behave in different
ways depending on when they are called.

* `setImmediate()` is designed to execute a script once the
current **poll** phase completes.
* `setTimeout()` schedules a script to be run after a minimum threshold
in ms has elapsed.

The order in which the timers are executed will vary depending on the
context in which they are called. If both are called from within the
main module, then timing will be bound by the performance of the process
(which can be impacted by other applications running on the machine).

For example, if we run the following script which is not within an I/O
cycle (i.e. the main module), the order in which the two timers are
executed is non-deterministic, as it is bound by the performance of the
process:
-->

## `setImmediate()` 대 `setTimeout()`

`setImmediate()`와 `setTimeout()`은 비슷하지만 호출된 시기에 따라 다르게 동작합니다.

* `setImmediate()`는 현재 **poll** 단계가 완료되면 스크립트를 실행하도록 설계되었습니다.
* `setTimeout()`는 최소 임계 값(ms)이 지난 후 스크립트가 실행되도록 스케줄링합니다.

타이머가 실행되는 순서는 어떤 컨텍스트에서 호출되었는지에 따라 다양합니다. 둘 다 메인 모듈
내에서 호출된다면 프로세서의 성능에 따라 달라집니다.(머신에서 실행되는 다른 애플리케이션의
영향을 받을 수 있습니다.)

예를 들어 I/O 주기 내에 있지 않은 컨텍스트(예: 메인 모듈)에서 다음 스크립트를 실행한다면
두 타이머의 순서는 프로세스 성능에 영향을 받으므로 결정적이지 않습니다.

<!--
```js
// timeout_vs_immediate.js
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});
```

```
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
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
```

```
$ node timeout_vs_immediate.js
immediate
timeout

$ node timeout_vs_immediate.js
immediate
timeout
```

The main advantage to using `setImmediate()` over `setTimeout()` is
`setImmediate()` will always be executed before any timers if scheduled
within an I/O cycle, independently of how many timers are present.
-->

```js
// timeout_vs_immediate.js
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});
```

```
$ node timeout_vs_immediate.js
timeout
immediate

$ node timeout_vs_immediate.js
immediate
timeout
```

하지만 I/O 주기 안에서 둘을 호출한다면 immediate 콜백이 항상 먼저 실행됩니다.

```js
// timeout_vs_immediate.js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
```

```
$ node timeout_vs_immediate.js
immediate
timeout

$ node timeout_vs_immediate.js
immediate
timeout
```

`setTimeout()`보다 `setImmediate()`를 사용할 때 가장 큰 장점은
`setImmediate()`가 얼마나 많은 타이머가 존재하냐에 상관없이 I/O 주기 내에서
스케줄된 어떤 타이머보다 항상 먼저 실행된다는 것입니다.

<!--
## `process.nextTick()`

### Understanding `process.nextTick()`

You may have noticed that `process.nextTick()` was not displayed in the
diagram, even though it's a part of the asynchronous API. This is because
`process.nextTick()` is not technically part of the event loop. Instead,
the `nextTickQueue` will be processed after the current operation is
completed, regardless of the current phase of the event loop. Here,
an *operation* is defined as a transition from the
underlying C/C++ handler, and handling the JavaScript that needs to be
executed.

Looking back at our diagram, any time you call `process.nextTick()` in a
given phase, all callbacks passed to `process.nextTick()` will be
resolved before the event loop continues. This can create some bad
situations because **it allows you to "starve" your I/O by making
recursive `process.nextTick()` calls**, which prevents the event loop
from reaching the **poll** phase.
-->

## `process.nextTick()`

### `process.nextTick()` 이해하기

`process.nextTick()`이 비동기 API에 속해있지만, 다이어그램에는 표시되지 않은 것을
눈치챘을 겁니다. 이는 `process.nextTick()`이 기술적으로는 이벤트 루프의 일부가
아니기 때문입니다. 대신 `nextTickQueue`는 이벤트 루프의 현재 단계와 관계없이
현재 작업이 완료된 후에 처리될 것입니다. 여기에서 *작업*이란 기저의 C/C++
핸들러에서 전환하는 것, 또 실행되어야 하는 JavaScript를 처리하는 것을 말합니다.

다이어그램을 다시 보겠습니다. 해당 단계에서 `process.nextTick()`을 호출하면
`process.nextTick()`에 전달한 모든 콜백은 언제나 이벤트 루프를 계속 진행하기
전에 처리될 것입니다. 이 동작 때문에 재귀로 `process.nextTick()`을 호출하면
이벤트 루프가 **poll** 단계에 다다르는 것을 막아서 **I/O가 "굶주리게" 될 수 있으므로**
좋지 않은 상황을 만들 수 있습니다.

<!--
### Why would that be allowed?

Why would something like this be included in Node.js? Part of it is a
design philosophy where an API should always be asynchronous even where
it doesn't have to be. Take this code snippet for example:

```js
function apiCall(arg, callback) {
  if (typeof arg !== 'string')
    return process.nextTick(callback,
                            new TypeError('argument should be string'));
}
```
-->

### 왜 이러한 동작을 허용하나요?

왜 이러한 기능이 Node.js에 포함되었는가? 이는 API는 그럴 필요가 없더라도 항상 비동기여야 한다는
설계 철학 때문입니다. 예제로 다음 코드를 보겠습니다.

```js
function apiCall(arg, callback) {
  if (typeof arg !== 'string')
    return process.nextTick(
      callback,
      new TypeError('argument should be string')
    );
}
```

<!--
The snippet does an argument check and if it's not correct, it will pass
the error to the callback. The API updated fairly recently to allow
passing arguments to `process.nextTick()` allowing it to take any
arguments passed after the callback to be propagated as the arguments to
the callback so you don't have to nest functions.

What we're doing is passing an error back to the user but only *after*
we have allowed the rest of the user's code to execute. By using
`process.nextTick()` we guarantee that `apiCall()` always runs its
callback *after* the rest of the user's code and *before* the event loop
is allowed to proceed. To achieve this, the JS call stack is allowed to
unwind then immediately execute the provided callback which allows a
person to make recursive calls to `process.nextTick()` without reaching a
`RangeError: Maximum call stack size exceeded from v8`.
-->

위 코드는 인자를 확인한 뒤 제대로 된 인자가 아니면 콜백에 오류를 전달합니다. 최근에 갱신된 API에서는
`process.nextTick()`에 인자를 전달할 수 있게 되어서 콜백뒤에 전달한 인자는 콜백에 대한 인자로
전파되기 때문에 중첩된 함수를 작성할 필요가 없습니다.

여기서는 사용자에게 오류를 다시 전달하고 있지만 *그 후에* 사용자의 남은 코드를 실행할 수 있습니다.
`process.nextTick()`을 사용하면 사용자 코드의 나머지 부분 *이후*, 이벤트 루프가 진행되기
*이전*에 항상 `apiCall()`이 콜백을 실행할 수 있게 보장합니다. 이를 위해 JS 호출 스택을 풀고
바로 제공된 콜백을 실행하면서 개발자가
`RangeError: Maximum call stack size exceeded from v8`에 도달하지 않으면서
`process.nextTick()`을 재귀호출할 수 있게 합니다.

<!--
This philosophy can lead to some potentially problematic situations.
Take this snippet for example:

```js
let bar;

// this has an asynchronous signature, but calls callback synchronously
function someAsyncApiCall(callback) { callback(); }

// the callback is called before `someAsyncApiCall` completes.
someAsyncApiCall(() => {
  // since someAsyncApiCall has completed, bar hasn't been assigned any value
  console.log('bar', bar); // undefined
});

bar = 1;
```

The user defines `someAsyncApiCall()` to have an asynchronous signature,
but it actually operates synchronously. When it is called, the callback
provided to `someAsyncApiCall()` is called in the same phase of the
event loop because `someAsyncApiCall()` doesn't actually do anything
asynchronously. As a result, the callback tries to reference `bar` even
though it may not have that variable in scope yet, because the script has not
been able to run to completion.

By placing the callback in a `process.nextTick()`, the script still has the
ability to run to completion, allowing all the variables, functions,
etc., to be initialized prior to the callback being called. It also has
the advantage of not allowing the event loop to continue. It may be
useful for the user to be alerted to an error before the event loop is
allowed to continue. Here is the previous example using `process.nextTick()`:
-->

이 철학은 잠재적인 문제 상황을 만들 수 있습니다. 다음 예제를 보겠습니다.

```js
let bar;

// 비동기 시그니처를 갖지만, 동기로 콜백을 호출합니다.
function someAsyncApiCall(callback) {
  callback();
}

// `someAsyncApiCall`이 완료되면 콜백을 호출한다.
someAsyncApiCall(() => {
  // someAsyncApiCall는 완료되었지만, bar에는 어떤 값도 할당되지 않았다.
  console.log('bar', bar); // undefined
});

bar = 1;
```

개발자가 `someAsyncApiCall()`을 비동기 시그니처로 정의했지만 실제로는 동기로 동작합니다.
이 함수가 호출되었을 때 `someAsyncApiCall()`가 실제로 비동기로 아무것도 하지 않으므로
`someAsyncApiCall()`에 전달된 콜백은 이벤트 루프의 같은 단계에서 호출됩니다. 그 결과
이 스크립트는 완료까지 실행되지 않았으므로 이 범위에서는 `bar` 변수가 없을 수 있음에도 콜백이
`bar`를 참조하려고 시도합니다.

`process.nextTick()`에 콜백을 두면 모든 변수, 함수 등이 호출되는 콜백보다 먼저 초기화하면서
스크립트를 완료까지 실행할 수 있습니다. 이는 이벤트 루프가 계속 진행되지 않도록 하는 장점도 있습니다.
이벤트 루프가 계속 진행되기 전에 사용자에게 오류 알림을 주는 것이 유용할 수 있습니다.
다음은 앞의 예제를 `process.nextTick()`으로 바꾼 것입니다.

<!--
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

Here's another real world example:

```js
const server = net.createServer(() => {}).listen(8080);

server.on('listening', () => {});
```

When only a port is passed, the port is bound immediately. So, the
`'listening'` callback could be called immediately. The problem is that the
`.on('listening')` callback will not have been set by that time.

To get around this, the `'listening'` event is queued in a `nextTick()`
to allow the script to run to completion. This allows the user to set
any event handlers they want.
-->

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

다음은 또 다른 예제입니다.

```js
const server = net.createServer(() => {}).listen(8080);

server.on('listening', () => {});
```

포트만 전달하면 포트가 바로 바인딩 됩니다. 그래서 `'listening'` 콜백이 바로 호출될 수 있습니다.
문제는 `.on('listening')` 콜백이 이때 설정되지 않는다는 것입니다.

이를 피하려면 `'listening'` 이벤트를 `nextTick()`으로 큐에 넣어서 스크립트가 완료될 때까지
실행되도록 할 수 있습니다. 이를 통해 어떤 이벤트 핸들러라도 설정하도록 할 수 있습니다.

<!--
## `process.nextTick()` vs `setImmediate()`

We have two calls that are similar as far as users are concerned, but
their names are confusing.

* `process.nextTick()` fires immediately on the same phase
* `setImmediate()` fires on the following iteration or 'tick' of the
event loop

In essence, the names should be swapped. `process.nextTick()` fires more
immediately than `setImmediate()`, but this is an artifact of the past
which is unlikely to change. Making this switch would break a large
percentage of the packages on npm. Every day more new modules are being
added, which means every day we wait, more potential breakages occur.
While they are confusing, the names themselves won't change.

*We recommend developers use `setImmediate()` in all cases because it's
easier to reason about (and it leads to code that's compatible with a
wider variety of environments, like browser JS.)*
-->

## `process.nextTick()` 대 `setImmediate()`

개발자가 관심 가질 두 가지 유사한 호출이 있지만 이름은 혼란스럽습니다.

* `process.nextTick()`은 같은 단계에서 바로 실행됩니다.
* `setImmediate()`는 이어진 순회나 이벤트 루프의 'tick'에서 실행됩니다.

사실 이름은 서로 바뀌어야 합니다. `process.nextTick()`이 `setImmediate()`보다 더 즉시
실행되지만, 이는 바뀔 가능성이 없는 과거의 유산입니다. 이 둘을 바꾼다면 수많은 npm 패키지가 깨질
것입니다. 매일같이 새로운 모듈이 추가되고 있으므로 잠재적인 손상은 더 많이 발생할 것입니다.
이 둘은 혼란스럽지만 이름이 바뀌진 않을 것입니다.

*`setImmediate()`가 예상하기 더 쉬우므로 모든 경우에 `setImmediate()`를 사용하기를
권장합니다.*

<!--
## Why use `process.nextTick()`?

There are two main reasons:

1. Allow users to handle errors, cleanup any then unneeded resources, or
perhaps try the request again before the event loop continues.

2. At times it's necessary to allow a callback to run after the call
stack has unwound but before the event loop continues.

One example is to match the user's expectations. Simple example:

```js
const server = net.createServer();
server.on('connection', (conn) => { });

server.listen(8080);
server.on('listening', () => { });
```
-->

## 왜 `process.nextTick()`을 사용하는가?

두 가지 이유가 있습니다.

1. 사용자가 이벤트 루프를 계속하기 전에 오류를 처리하고 불필요한 자원을 정리하고 요청을
다시 시도할 수 있게 합니다.

2. 호출 스택은 풀린 뒤에도 이벤트 루프를 계속 진행하기 전에 콜백을 실행해야 하는 경우가 있습니다.

한 가지 예는 사용자의 기대를 맞추는 것입니다. 다음은 간단한 예제입니다.

```js
const server = net.createServer();
server.on('connection', (conn) => {});

server.listen(8080);
server.on('listening', () => {});
```

<!--
Say that `listen()` is run at the beginning of the event loop, but the
listening callback is placed in a `setImmediate()`. Unless a
hostname is passed, binding to the port will happen immediately. For
the event loop to proceed, it must hit the **poll** phase, which means
there is a non-zero chance that a connection could have been received
allowing the connection event to be fired before the listening event.

Another example is running a function constructor that was to, say,
inherit from `EventEmitter` and it wanted to call an event within the
constructor:

```js
const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);
  this.emit('event');
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
```
-->

`listen()`이 이벤트 루프 시작 부분에서 실행되었지만, listening 콜백은 `setImmediate()`에
있습니다. 바인딩할 호스트네임을 전달하지 않는 한 포트는 즉시 적용될 것입니다. 이벤트 루프를
진행하려면 **poll** 단계에 도달해야 하는데, 이 말은 listening 이벤트 전에 connection 이벤트가
발생하도록 해서 연결을 받을 가능성이 있다는 것입니다.

또 다른 예제는 `EventEmitter`를 상속받고 생성자 내에서 이벤트를 호출하고자 하는
함수 생성자를 실행하는 것입니다.

```js
const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);
  this.emit('event');
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
```

<!--
You can't emit an event from the constructor immediately
because the script will not have processed to the point where the user
assigns a callback to that event. So, within the constructor itself,
you can use `process.nextTick()` to set a callback to emit the event
after the constructor has finished, which provides the expected results:

```js
const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);

  // use nextTick to emit the event once a handler is assigned
  process.nextTick(() => {
    this.emit('event');
  });
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
```

[libuv]: https://libuv.org/
[REPL]: https://nodejs.org/api/repl.html#repl_repl
-->

사용자가 콜백을 이벤트에 할당한 시점에 스크립트가 실행되는 것이 아니므로 생성자에서 발생시킨 이벤트는
즉시 실행되지 않습니다. 그러므로 기대하는 결과대로 생성자 안에서 생성자가 완료된 후 이벤트를 발생시키는
콜백을 설정하려고 `process.nextTick()`을 사용할 수 있습니다.

```js
const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);

  // 핸들러가 할당되면 이벤트를 발생시키려고 nextTick을 사용합니다.
  process.nextTick(() => {
    this.emit('event');
  });
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
```

[libuv]: https://libuv.org/
[REPL]: https://nodejs.org/api/repl.html#repl_repl
