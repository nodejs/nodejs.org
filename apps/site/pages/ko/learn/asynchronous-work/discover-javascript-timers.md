---
title: JavaScript 타이머 발견하기
layout: learn
authors: flaviocopes, MylesBorins, LaRuaNa, amiller-gh, ahmadawais, ovflowd
---

# JavaScript 타이머 발견하기

## `setTimeout()`

JavaScript 코드를 작성할 때, 함수의 실행을 지연시키고 싶을 수 있습니다.

이때 사용하는 것이 `setTimeout`입니다. 나중에 실행할 콜백 함수를 지정하고, 실행 시간을 밀리초 단위로 표현합니다:

```js
setTimeout(() => {
  // 2초 후에 실행
}, 2000);

setTimeout(() => {
  // 50밀리초 후에 실행
}, 50);
```

이 구문은 새로운 함수를 정의합니다. 여기서 원하는 다른 함수를 호출하거나, 기존 함수 이름과 인자들을 전달할 수 있습니다:

```js
const myFunction = (firstParam, secondParam) => {
  // 무언가 수행
};

// 2초 후에 실행
setTimeout(myFunction, 2000, firstParam, secondParam);
```

`setTimeout`은 타이머 ID를 반환합니다. 일반적으로 사용되지 않지만, 이 ID를 저장하여 예약된 함수 실행을 삭제하려면 사용할 수 있습니다:

```js
const id = setTimeout(() => {
  // 2초 후에 실행 예정
}, 2000);

// 실행 취소
clearTimeout(id);
```

### 0 지연 시간

지연 시간을 `0`으로 지정하면, 콜백 함수는 가능한 빨리 실행되지만 현재 함수 실행이 끝난 후에 실행됩니다:

```js
setTimeout(() => {
  console.log('after');
}, 0);

console.log('before');
```

이 코드는 다음과 같이 출력됩니다:

```bash
before
after
```

이는 특히 무거운 작업을 수행하면서 CPU를 차단하지 않도록 하고, 스케줄러에서 함수를 큐에 넣어 다른 함수가 실행될 수 있도록 할 때 유용합니다.

> 일부 브라우저(IE 및 Edge)는 동일한 기능을 수행하는 `setImmediate()` 메서드를 구현하지만, 이는 표준이 아니며 [다른 브라우저에서는 사용할 수 없습니다](https://caniuse.com/#feat=setimmediate). 그러나 이는 Node.js에서 표준 함수로 사용됩니다.

## `setInterval()`

`setInterval`은 `setTimeout`과 유사한 함수지만 차이점이 있습니다. 콜백 함수를 한 번만 실행하는 대신, 지정한 시간 간격(밀리초 단위)으로 계속 실행합니다:

```js
setInterval(() => {
  // 2초마다 실행
}, 2000);
```

위 함수는 2초마다 실행되며, 멈추도록 명령하지 않는 한 계속 실행됩니다. 이를 멈추려면 `setInterval`이 반환한 interval ID를 `clearInterval`에 전달하여 중지시킵니다:

```js
const id = setInterval(() => {
  // 2초마다 실행
}, 2000);

clearInterval(id);
```

`clearInterval`을 `setInterval` 콜백 함수 내부에서 호출하여, 실행 여부를 자동으로 결정하게 할 수도 있습니다. 예를 들어, 이 코드는 `App.somethingIWait`가 `arrived` 값을 가질 때까지 계속 실행합니다:

```js
const interval = setInterval(() => {
  if (App.somethingIWait === 'arrived') {
    clearInterval(interval);
  }
  // 그 외에는 다른 작업 수행
}, 100);
```

## 재귀 `setTimeout`

`setInterval`은 함수가 완료되는 시간과 관계없이 n 밀리초마다 함수를 시작합니다.

함수가 항상 같은 시간만 걸리면 문제가 없습니다:

![setInterval 정상 작동](/static/images/learn/javascript-timers/setinterval-ok.png)

하지만 함수의 실행 시간이 네트워크 조건 등으로 인해 다를 수 있습니다:

![setInterval 실행 시간 변화](/static/images/learn/javascript-timers/setinterval-varying-duration.png)

그리고 긴 실행이 다음 실행과 겹칠 수도 있습니다:

![setInterval 겹침](/static/images/learn/javascript-timers/setinterval-overlapping.png)

이를 방지하려면, 콜백 함수가 종료된 후에 재귀 `setTimeout`을 호출하여 스케줄을 설정할 수 있습니다:

```js
const myFunction = () => {
  // 무언가 수행

  setTimeout(myFunction, 1000);
};

setTimeout(myFunction, 1000);
```

이렇게 하면 다음과 같은 상황을 달성할 수 있습니다:

![재귀 setTimeout](/static/images/learn/javascript-timers/recursive-settimeout.png)

`setTimeout`과 `setInterval`은 [Timers 모듈](https://nodejs.org/api/timers.html)을 통해 Node.js에서 사용할 수 있습니다.

Node.js는 또한 `setImmediate()`를 제공하며, 이는 `setTimeout(() => {}, 0)`을 사용하는 것과 동일하며, 주로 Node.js 이벤트 루프와 함께 사용됩니다.
