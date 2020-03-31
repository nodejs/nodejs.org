---
title: 블록킹과 논블록킹 살펴보기
layout: docs.hbs
---

# 블록킹과 논블록킹 살펴보기

This overview covers the difference between **blocking** and **non-blocking** calls in Node.js. This overview will refer to the event loop and libuv but no prior knowledge of those topics is required. Readers are assumed to have a basic understanding of the JavaScript language and Node.js [callback pattern](/en/knowledge/getting-started/control-flow/what-are-callbacks/).

> "I/O"는 주로 [libuv](https://libuv.org/)가 지원하는 시스템 디스크나 네트워크와 상호작용하는 것을 가리킵니다.

## 블로킹

이 글에서는 Node.js에서 **블로킹**과 **논블로킹** 호출의 차이점을 다룹니다. 이벤트 루프와 libuv를 참조할 것이지만 사전 지식이 필요하지는 않습니다. 이 글을 읽는 사람은 JavaScript 언어와 Node.js 호출 패턴에 관해 기본적인 이해가 있다고 가정합니다.

In Node.js, JavaScript that exhibits poor performance due to being CPU intensive rather than waiting on a non-JavaScript operation, such as I/O, isn't typically referred to as **blocking**. Synchronous methods in the Node.js standard library that use libuv are the most commonly used **blocking** operations. Native modules may also have **blocking** methods.

**블로킹**은 Node.js 프로세스에서 추가적인 JavaScript의 실행을 위해 JavaScript가 아닌 작업이 완료될 때까지 기다려야만 하는 상황입니다. 이는 이벤트 루프가 **블로킹** 작업을 하는 동안 JavaScript 실행을 계속할 수 없기 때문입니다.

## 코드 비교

Node.js에서, I/O 등의 JavaScript가 아닌 작업을 기다리는 것보다 CPU 집약적인 작업 때문에 나쁜 성능을 보여주는 JavaScript는 보통 **블로킹**이라고 부르지 않습니다. libuv를 사용하는 Node.js 표준 라이브러리의 동기 메서드가 가장 대표적인 **블로킹** 작업입니다. 네이티브 모듈도 **블로킹** 메서드를 가질 수 있습니다.

Node.js 표준 라이브러리의 모든 I/O 메서드는 **논블로킹**인 비동기 방식을 제공하고 콜백 함수를 받습니다. 일부 메서드는 같은 작업을 하는 **블로킹** 메서드도 가지는데 이는 이름 마지막에 `Sync`가 붙습니다.

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // 파일을 읽을 때까지 여기서 블로킹 됩니다.
```

And here is an equivalent **asynchronous** example:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
});
```

**블로킹** 메서드는 **동기**로 실행되고 **논블로킹** 메서드는 **비동기**로 실행됩니다.

예시로 파일 시스템 모듈을 사용할 때 다음은 **동기**로 파일을 읽는 예제입니다.

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // 파일을 읽을 때까지 여기서 블로킹됩니다.
console.log(data);
// moreWork();는 console.log 이후 실행될 것입니다.
```

다음은 같은 작업의 **비동기** 예제입니다.

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
// moreWork();는 console.log 이전에 실행될 것입니다.
```

In the first example above, `console.log` will be called before `moreWork()`. In the second example `fs.readFile()` is **non-blocking** so JavaScript execution can continue and `moreWork()` will be called first. The ability to run `moreWork()` without waiting for the file read to complete is a key design choice that allows for higher throughput.

## 동시성과 스루풋

첫 예제가 두 번째보다 간단해 보이지만 두 번째 줄에서 전체 파일을 읽을 때까지 다른 JavaScript 실행이 **블로킹**되는 단점이 있습니다. 동기 예제에서 오류가 발생하면 반드시 처리해주어야 하고 그렇지 않으면 프로세스가 죽을 것입니다. 비동기 예제에서는 예제에 나왔듯이 에러를 던질지 아닐지는 작성자에게 달려있습니다.

예제를 좀 더 확장해 보겠습니다.

이를 비동기로 작성한 예제를 보겠습니다.

## 블로킹과 논블로킹 코드를 섞을 때의 위험성

There are some patterns that should be avoided when dealing with I/O. Let's look at an example:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync('/file.md');
```

위의 첫 예제에서 `console.log`는 `moreWork()` 전에 호출될 것입니다. 두 번째 예제에서는 `fs.readFile()`가 **논블로킹**이므로 계속 JavaScript를 실행하고 `moreWork()`가 먼저 호출될 것입니다. 파일 읽기가 완료되기를 기다리지 않고 `moreWork()`를 실행할 수 있도록 한 것은 높은 스루풋을 가능하게 하는 핵심 디자인 선택입니다.

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

The above places a **non-blocking** call to `fs.unlink()` within the callback of `fs.readFile()` which guarantees the correct order of operations.

## Additional Resources

* [libuv](https://libuv.org/)
* [Node.js에 대해서](/en/about/)
