---
title: 블록킹과 논블록킹 살펴보기
layout: docs.hbs
---

<!--
# Overview of Blocking vs Non-Blocking

This overview covers the difference between **blocking** and **non-blocking**
calls in Node.js. This overview will refer to the event loop and libuv but no
prior knowledge of those topics is required. Readers are assumed to have a
basic understanding of the JavaScript language and Node.js callback pattern.

> "I/O" refers primarily to interaction with the system's disk and
> network supported by [libuv](https://libuv.org/).
-->
# 블로킹과 논블로킹 살펴보기

이 글에서는 Node.js에서 **블로킹**과 **논블로킹** 호출의 차이점을 다룹니다. 이벤트 루프와
libuv를 참조할 것이지만 사전 지식이 필요하지는 않습니다. 이 글을 읽는 사람은 JavaScript
언어와 Node.js 호출 패턴에 관해 기본적인 이해가 있다고 가정합니다.

> "I/O"는 주로 [libuv](https://libuv.org/)가 지원하는 시스템 디스크나 네트워크와
> 상호작용하는 것을 가리킵니다.

<!--
## Blocking

**Blocking** is when the execution of additional JavaScript in the Node.js
process must wait until a non-JavaScript operation completes. This happens
because the event loop is unable to continue running JavaScript while a
**blocking** operation is occurring.

In Node.js, JavaScript that exhibits poor performance due to being CPU intensive
rather than waiting on a non-JavaScript operation, such as I/O, isn't typically
referred to as **blocking**. Synchronous methods in the Node.js standard library
that use libuv are the most commonly used **blocking** operations. Native
modules may also have **blocking** methods.

All of the I/O methods in the Node.js standard library provide asynchronous
versions, which are **non-blocking**, and accept callback functions. Some
methods also have **blocking** counterparts, which have names that end with
`Sync`.
-->

## 블로킹

**블로킹**은 Node.js 프로세스에서 추가적인 JavaScript의 실행을 위해 JavaScript가 아닌
작업이 완료될 때까지 기다려야만 하는 상황입니다. 이는 이벤트 루프가 **블로킹** 작업을 하는
동안 JavaScript 실행을 계속할 수 없기 때문입니다.

Node.js에서, I/O 등의 JavaScript가 아닌 작업을 기다리는 것보다 CPU 집약적인 작업 때문에
나쁜 성능을 보여주는 JavaScript는 보통 **블로킹**이라고 부르지 않습니다. libuv를 사용하는
Node.js 표준 라이브러리의 동기 메서드가 가장 대표적인 **블로킹** 작업입니다.
네이티브 모듈도 **블로킹** 메서드를 가질 수 있습니다.

Node.js 표준 라이브러리의 모든 I/O 메서드는 **논블로킹**인 비동기 방식을 제공하고
콜백 함수를 받습니다. 일부 메서드는 같은 작업을 하는 **블로킹** 메서드도 가지는데 이는
이름 마지막에 `Sync`가 붙습니다.

<!--
## Comparing Code

**Blocking** methods execute **synchronously** and **non-blocking** methods
execute **asynchronously**.

Using the File System module as an example, this is a **synchronous** file read:

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // blocks here until file is read
```

And here is an equivalent **asynchronous** example:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
});
```
-->

## 코드 비교

**블로킹** 메서드는 **동기**로 실행되고 **논블로킹** 메서드는 **비동기**로 실행됩니다.

예시로 파일 시스템 모듈을 사용할 때 다음은 **동기**로 파일을 읽는 예제입니다.

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // 파일을 읽을 때까지 여기서 블로킹 됩니다.
```

다음은 같은 작업의 **비동기** 예제입니다.

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
});
```

<!--
The first example appears simpler than the second but has the disadvantage of
the second line **blocking** the execution of any additional JavaScript until
the entire file is read. Note that in the synchronous version if an error is
thrown it will need to be caught or the process will crash. In the asynchronous
version, it is up to the author to decide whether an error should throw as
shown.

Let's expand our example a little bit:

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // blocks here until file is read
console.log(data);
moreWork(); // will run after console.log
```

And here is a similar, but not equivalent asynchronous example:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
moreWork(); // will run before console.log
```
-->

첫 예제가 두 번째보다 간단해 보이지만 두 번째 줄에서 전체 파일을 읽을 때까지 다른 JavaScript
실행이 **블로킹**되는 단점이 있습니다. 동기 예제에서 오류가 발생하면 반드시 처리해주어야 하고
그렇지 않으면 프로세스가 죽을 것입니다. 비동기 예제에서는 예제에 나왔듯이 에러를 던질지 아닐지는
작성자에게 달려있습니다.

예제를 좀 더 확장해 보겠습니다.

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // 파일을 읽을 때까지 여기서 블로킹됩니다.
console.log(data);
moreWork(); // console.log 이후 실행될 것입니다.
```

이를 비동기로 작성한 예제를 보겠습니다.

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
moreWork(); // console.log 이전에 실행될 것입니다.
```

<!--
In the first example above, `console.log` will be called before `moreWork()`. In
the second example `fs.readFile()` is **non-blocking** so JavaScript execution
can continue and `moreWork()` will be called first. The ability to run
`moreWork()` without waiting for the file read to complete is a key design
choice that allows for higher throughput.
-->

위의 첫 예제에서 `console.log`는 `moreWork()` 전에 호출될 것입니다. 두 번째
예제에서는 `fs.readFile()`가 **논블로킹**이므로 계속 JavaScript를 실행하고
`moreWork()`가 먼저 호출될 것입니다. 파일 읽기가 완료되기를 기다리지 않고 `moreWork()`를
실행할 수 있도록 한 것은 높은 스루풋을 가능하게 하는 핵심 디자인 선택입니다.

<!--
## Concurrency and Throughput

JavaScript execution in Node.js is single threaded, so concurrency refers to the
event loop's capacity to execute JavaScript callback functions after completing
other work. Any code that is expected to run in a concurrent manner must allow
the event loop to continue running as non-JavaScript operations, like I/O, are
occurring.

As an example, let's consider a case where each request to a web server takes
50ms to complete and 45ms of that 50ms is database I/O that can be done
asynchronously. Choosing **non-blocking** asynchronous operations frees up that
45ms per request to handle other requests. This is a significant difference in
capacity just by choosing to use **non-blocking** methods instead of
**blocking** methods.

The event loop is different than models in many other languages where additional
threads may be created to handle concurrent work.
-->

## 동시성과 스루풋

Node.js에서 JavaScript 실행이 싱글 스레드이므로 동시성은 다른 작업이 완료된 후에
JavaScript 콜백 함수를 실행하는 이벤트 루프의 능력을 의미합니다. 동시에 실행되어야 하는
모든 코드는 I/O 등의 JavaScript가 아닌 작업이 일어나는 동안 이벤트 루프가 계속
실행될 수 있도록 해야 합니다.

예시로 웹서버로의 요청이 완료되기까지 50ms가 걸리고 50ms 중 45ms는 비동기로
실행될 수 있는 데이터베이스 I/O인 상황을 생각해 보겠습니다. **논블로킹** 비동기 작업을 사용하면
요청마다 45ms는 다른 요청을 처리할 수 있게 됩니다. 이는 **블로킹** 메서드 대신
**논블로킹** 메서드를 사용함으로써 확연히 다른 성능 차이가 납니다.

이벤트 루프는 동시 작업을 다루려고 부가적인 스레드를 만드는 다른 언어의 모델과는 다릅니다.

<!--
## Dangers of Mixing Blocking and Non-Blocking Code

There are some patterns that should be avoided when dealing with I/O. Let's look
at an example:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync('/file.md');
```
-->

## 블로킹과 논블로킹 코드를 섞을 때의 위험성

I/O를 다룰 때 피해야 하는 몇 가지 패턴이 있습니다. 예제를 보겠습니다.

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync('/file.md');
```

<!--
In the above example, `fs.unlinkSync()` is likely to be run before
`fs.readFile()`, which would delete `file.md` before it is actually read. A
better way to write this that is completely **non-blocking** and guaranteed to
execute in the correct order is:

```js
const fs = require('fs');
fs.readFile('/file.md', (readFileErr, data) => {
  if (readFileErr) throw readFileErr;
  console.log(data);
  fs.unlink('/file.md', (unlinkErr) => {
    if (unlinkErr) throw unlinkErr;
  });
});
```
-->

위 예제에서 `fs.unlinkSync()`가 `fs.readFile()`보다 먼저 실행될 수 있으므로 실제
`file.md`를 읽기 전에 파일을 제거할 수 있습니다. 이 예제를 제대로 작성하려면 완전히
**논블로킹**으로 작성해서 올바른 순서로 실행되도록 보장해야 합니다.

```js
const fs = require('fs');
fs.readFile('/file.md', (readFileErr, data) => {
  if (readFileErr) throw readFileErr;
  console.log(data);
  fs.unlink('/file.md', (unlinkErr) => {
    if (unlinkErr) throw unlinkErr;
  });
});
```

<!--
The above places a **non-blocking** call to `fs.unlink()` within the callback of
`fs.readFile()` which guarantees the correct order of operations.

## Additional Resources

* [libuv](https://libuv.org/)
* [About Node.js](https://nodejs.org/en/about/)
-->

여기서는 `fs.readFile()`의 콜백에서 `fs.unlink()`를 **논블로킹**으로 호출하도록 해서 작업 순서가 올바르도록 보장했습니다.

## 추가 자료

* [libuv](https://libuv.org/)
* [Node.js에 대해서](https://nodejs.org/ko/about/)
