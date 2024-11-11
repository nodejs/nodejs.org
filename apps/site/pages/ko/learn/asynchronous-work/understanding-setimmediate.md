---
title: setImmediate() 이해하기
layout: learn
authors: flaviocopes, MylesBorins, LaRuaNa, ahmadawais, clean99, ovflowd
---

# setImmediate() 이해하기

비동기적으로 코드를 실행하고 싶지만 가능한 한 빨리 실행하려면, Node.js에서 제공하는 `setImmediate()` 함수를 사용할 수 있습니다:

```js
setImmediate(() => {
  // run something
});
```

`setImmediate()` 인수로 전달된 함수는 이벤트 루프의 다음 반복에서 실행되는 콜백입니다.

`setImmediate()`는 `setTimeout(() => {}, 0)` (0ms 타임아웃을 전달) 및 `process.nextTick()` 및 `Promise.then()`과 어떻게 다를까요?

`process.nextTick()`에 전달된 함수는 현재 이벤트 루프 반복에서 현재 작업이 끝난 후에 실행됩니다. 이는 항상 `setTimeout` 및 `setImmediate`보다 먼저 실행됨을 의미합니다.

0ms 지연의 `setTimeout()` 콜백은 `setImmediate()`와 매우 유사합니다. 실행 순서는 여러 요인에 따라 달라지지만, 두 가지 모두 이벤트 루프의 다음 반복에서 실행됩니다.

`process.nextTick` 콜백은 `process.nextTick queue`에 추가됩니다. `Promise.then()` 콜백은 `promises microtask queue`에 추가됩니다. `setTimeout`, `setImmediate` 콜백은 `macrotask queue`에 추가됩니다.

이벤트 루프는 먼저 `process.nextTick queue`의 작업을 실행한 후, `promises microtask queue`를 실행하고, 마지막으로 `macrotask queue`를 실행합니다.

다음은 `setImmediate()`, `process.nextTick()` 및 `Promise.then()` 간의 순서를 보여주는 예입니다:

```js
const baz = () => console.log('baz');
const foo = () => console.log('foo');
const zoo = () => console.log('zoo');

const start = () => {
  console.log('start');
  setImmediate(baz);
  new Promise((resolve, reject) => {
    resolve('bar');
  }).then(resolve => {
    console.log(resolve);
    process.nextTick(zoo);
  });
  process.nextTick(foo);
};

start();

// start foo bar zoo baz
```

이 코드는 먼저 `start()`를 호출한 다음 `process.nextTick queue`에서 `foo()`를 호출합니다. 그 후에는 `promises microtask queue`를 처리하는데, 여기서 `bar`가 출력되고 동시에 `zoo()`가 `process.nextTick queue`에 추가됩니다. 그런 다음 방금 추가된 `zoo()`를 호출합니다. 마지막으로 `macrotask queue`에 있는 `baz()`가 호출됩니다.

위의 원칙은 CommonJS 사례에서도 적용되지만, ES 모듈, 예를 들어 `mjs` 파일에서는 실행 순서가 다릅니다:

```js
// start bar foo zoo baz
```

이는 로드되는 ES 모듈이 비동기 작업으로 감싸져 있기 때문이며, 따라서 전체 스크립트가 실제로 `promises microtask queue`에 이미 포함됩니다. 그래서 Promise가 즉시 해결되면, 그 콜백이 `microtask` 큐에 추가됩니다. Node.js는 다른 큐로 이동하기 전에 큐를 비우려고 하므로 `bar`가 먼저 출력됩니다.
