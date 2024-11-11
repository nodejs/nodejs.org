---
title: 블로킹 vs 비블로킹 개요
layout: learn
authors: ovflowd, HassanBahati
---

# 블로킹 vs 비블로킹 개요

이 개요에서는 Node.js에서 **블로킹** 호출과 **비블로킹** 호출의 차이를 설명합니다. 이 개요는 이벤트 루프와 libuv를 언급하지만, 해당 주제에 대한 사전 지식은 필요하지 않습니다. 독자는 JavaScript 언어와 Node.js [콜백 패턴](/learn/asynchronous-work/javascript-asynchronous-programming-and-callbacks)에 대한 기본적인 이해를 하고 있다고 가정합니다.

> "I/O"는 주로 시스템의 디스크 및 [libuv](https://libuv.org/)에 의해 지원되는 네트워크와의 상호작용을 의미합니다.

## 블로킹

**블로킹**은 Node.js 프로세스에서 추가 JavaScript의 실행이 비-JavaScript 작업이 완료될 때까지 기다려야 할 때를 말합니다. 이는 이벤트 루프가 **블로킹** 작업이 발생하는 동안 JavaScript를 계속 실행할 수 없기 때문에 발생합니다.

Node.js에서 CPU 집약적으로 성능이 저하되는 JavaScript는 일반적으로 비-JavaScript 작업(예: I/O)을 기다리지 않으므로 **블로킹**으로 언급되지 않습니다. libuv를 사용하는 Node.js 표준 라이브러리의 동기식 메서드는 가장 일반적으로 사용되는 **블로킹** 작업입니다. 네이티브 모듈에도 **블로킹** 메서드가 있을 수 있습니다.

Node.js 표준 라이브러리의 모든 I/O 메서드는 비동기 버전을 제공하며, 이는 **비블로킹**이며 콜백 함수를 수용합니다. 일부 메서드는 `Sync`로 끝나는 **블로킹** 대응 메서드도 있습니다.

## 코드 비교

**블로킹** 메서드는 **동기식**으로 실행되고, **비블로킹** 메서드는 **비동기식**으로 실행됩니다.

파일 시스템 모듈을 예로 들면, 다음은 **동기식** 파일 읽기입니다:

```js
const fs = require('node:fs');

const data = fs.readFileSync('/file.md'); // 파일이 읽힐 때까지 여기서 블로킹
```

그리고 다음은 이에 상응하는 **비동기식** 예입니다:

```js
const fs = require('node:fs');

fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
});
```

첫 번째 예제는 두 번째 예제보다 간단해 보이지만, 두 번째 줄이 **블로킹**하여 전체 파일이 읽힐 때까지 추가 JavaScript의 실행을 차단하는 단점이 있습니다. 동기식 버전에서는 오류가 발생하면 이를 포착해야 하며, 그렇지 않으면 프로세스가 중단됩니다. 비동기식 버전에서는 저자가 오류를 발생시킬지 여부를 결정해야 합니다.

예제를 조금 확장해 보겠습니다:

```js
const fs = require('node:fs');

const data = fs.readFileSync('/file.md'); // 파일이 읽힐 때까지 여기서 블로킹
console.log(data);
moreWork(); // console.log 이후에 실행됨
```

그리고 비슷하지만 동등하지 않은 비동기식 예제는 다음과 같습니다:

```js
const fs = require('node:fs');

fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
moreWork(); // console.log 이전에 실행됨
```

위의 첫 번째 예제에서 `console.log`는 `moreWork()`보다 먼저 호출됩니다. 두 번째 예제에서 `fs.readFile()`은 **비블로킹**이므로 JavaScript 실행을 계속할 수 있으며 `moreWork()`가 먼저 호출됩니다. 파일 읽기가 완료될 때까지 기다리지 않고 `moreWork()`를 실행할 수 있는 능력은 더 높은 처리량을 허용하는 핵심 설계 선택입니다.

## 동시성 및 처리량

Node.js에서 JavaScript 실행은 단일 스레드로 진행되므로 동시성은 이벤트 루프가 다른 작업을 완료한 후 JavaScript 콜백 함수를 실행할 수 있는 능력을 의미합니다. 동시적으로 실행될 것으로 예상되는 모든 코드는 이벤트 루프가 비-JavaScript 작업(I/O 등)을 수행하는 동안 계속 실행할 수 있어야 합니다.

예를 들어, 웹 서버에 대한 각 요청이 완료되는 데 50ms가 걸리고, 그 중 45ms가 비동기적으로 처리할 수 있는 데이터베이스 I/O가 필요하다고 가정해 보겠습니다. **비블로킹** 비동기 작업을 선택하면 요청당 45ms가 다른 요청을 처리하는 데 사용될 수 있습니다. 이는 **블로킹** 메서드 대신 **비블로킹** 메서드를 사용하기만 해도 용량에서 상당한 차이를 보입니다.

이벤트 루프는 추가 스레드를 생성하여 동시 작업을 처리할 수 있는 많은 다른 언어의 모델과는 다릅니다.

## 블로킹 및 비블로킹 코드 혼합의 위험

I/O를 처리할 때 피해야 할 몇 가지 패턴이 있습니다. 다음은 예입니다:

```js
const fs = require('node:fs');

fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync('/file.md');
```

위의 예에서 `fs.unlinkSync()`는 `fs.readFile()`보다 먼저 실행될 가능성이 높아 `file.md`가 실제로 읽히기 전에 삭제될 수 있습니다. 이를 작성하는 더 나은 방법은 완전히 **비블로킹**이며 올바른 순서로 실행될 것을 보장하는 것입니다:

```js
const fs = require('node:fs');

fs.readFile('/file.md', (readFileErr, data) => {
  if (readFileErr) throw readFileErr;
  console.log(data);
  fs.unlink('/file.md', unlinkErr => {
    if (unlinkErr) throw unlinkErr;
  });
});
```

위의 코드는 `fs.readFile()`의 콜백 내에 **비블로킹** 호출인 `fs.unlink()`를 배치하여 작업의 올바른 순서를 보장합니다.

## 추가 자료

- [libuv](https://libuv.org/)
