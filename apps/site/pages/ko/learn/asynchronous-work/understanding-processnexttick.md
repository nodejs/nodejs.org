---
title: process.nextTick() 이해하기
layout: learn
authors: flaviocopes, MylesBorins, LaRuaNa, ahmadawais, ovflowd, marksist300
---

# process.nextTick() 이해하기

Node.js 이벤트 루프를 이해하려고 할 때, 중요한 부분 중 하나는 `process.nextTick()`입니다. 이벤트 루프가 한 바퀴를 돌 때마다 이를 틱(tick)이라고 부릅니다.

`process.nextTick()`에 함수를 전달하면, 현재 작업이 끝난 후 다음 이벤트 루프 틱이 시작되기 전에 이 함수를 호출하라고 엔진에 지시하는 것입니다:

```js
process.nextTick(() => {
  // do something
});
```

이벤트 루프는 현재 함수 코드를 처리하는 중입니다. 이 작업이 끝나면 JS 엔진은 해당 작업 중에 `nextTick` 호출에 전달된 모든 함수를 실행합니다.

이는 현재 함수 이후에 비동기적으로 함수를 처리하도록 JS 엔진에 지시하는 방법이지만, 대기열에 넣지 않고 가능한 한 빨리 실행합니다.

`setTimeout(() => {}, 0)`을 호출하면 다음 틱이 끝날 때까지 함수를 실행하지 않지만, `nextTick()`을 사용하면 호출 우선순위를 지정하고 다음 틱이 시작되기 전에 바로 실행됩니다.

다음 이벤트 루프 반복에서 코드가 이미 실행되었는지 확인하려면 `nextTick()`을 사용하세요.

#### 이벤트 순서 예시:

```js
console.log('Hello => number 1');

setImmediate(() => {
  console.log('Running before the timeout => number 3');
});

setTimeout(() => {
  console.log('The timeout running last => number 4');
}, 0);

process.nextTick(() => {
  console.log('Running at next tick => number 2');
});
```

#### 출력 예시:

```bash
Hello => number 1
Running at next tick => number 2
Running before the timeout => number 3
The timeout running last => number 4
```

정확한 출력은 실행마다 다를 수 있습니다.
