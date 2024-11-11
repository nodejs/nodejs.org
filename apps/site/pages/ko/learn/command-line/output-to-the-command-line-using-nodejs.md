---
title: Node.js에서 명령줄로 출력하기
layout: learn
authors: flaviocopes, potch, MylesBorins, fhemberger, LaRuaNa, amiller-gh, ahmadawais
---

# Node.js에서 명령줄로 출력하기

### console 모듈을 사용한 기본 출력

Node.js는 명령줄과 상호작용하는 매우 유용한 방법을 제공하는 [`console` 모듈](https://nodejs.org/api/console.html)을 제공합니다.

이것은 기본적으로 브라우저에서 찾을 수 있는 `console` 객체와 동일합니다.

가장 기본적이고 자주 사용되는 메서드는 `console.log()`입니다. 이는 전달된 문자열을 콘솔에 출력합니다.

객체를 전달하면, 이를 문자열로 변환하여 출력합니다.

여러 변수를 `console.log`에 전달할 수 있습니다. 예를 들어:

```js
const x = 'x';
const y = 'y';
console.log(x, y);
```

Node.js는 둘 다 출력합니다.

또한 변수를 전달하고 형식 지정자를 사용하여 멋진 구문을 형식화할 수 있습니다.

예를 들어:

```js
console.log('My %s has %d ears', 'cat', 2);
```

- `%s`는 변수를 문자열로 형식화합니다.
- `%d`는 변수를 숫자로 형식화합니다.
- `%i`는 변수를 정수 부분만 형식화합니다.
- `%o`는 변수를 객체로 형식화합니다.

예시:

```js
console.log('%o', Number);
```

### 콘솔 지우기

`console.clear()`는 콘솔을 지웁니다 (사용 중인 콘솔에 따라 동작이 달라질 수 있습니다).

### 요소 카운팅

`console.count()`는 매우 유용한 메서드입니다.

다음 코드를 보세요:

```js
const x = 1;
const y = 2;
const z = 3;

console.count(
  'The value of x is ' + x + ' and has been checked .. how many times?'
);

console.count(
  'The value of x is ' + x + ' and has been checked .. how many times?'
);

console.count(
  'The value of y is ' + y + ' and has been checked .. how many times?'
);
```

`console.count()`는 문자열이 출력된 횟수를 세고, 그 옆에 카운트를 출력합니다.

사과와 오렌지를 카운팅할 수 있습니다:

```js
const oranges = ['orange', 'orange'];
const apples = ['just one apple'];

oranges.forEach(fruit => {
  console.count(fruit);
});
apples.forEach(fruit => {
  console.count(fruit);
});
```

### 카운팅 초기화

`console.countReset()` 메서드는 `console.count()`와 함께 사용되는 카운터를 초기화합니다.

사과와 오렌지 예시를 사용하여 이를 시연해보겠습니다.

```js
const oranges = ['orange', 'orange'];
const apples = ['just one apple'];

oranges.forEach(fruit => {
  console.count(fruit);
});
apples.forEach(fruit => {
  console.count(fruit);
});

console.countReset('orange');

oranges.forEach(fruit => {
  console.count(fruit);
});
```

`console.countReset('orange')` 호출이 카운터를 0으로 초기화하는 것을 확인하세요.

### 스택 트레이스 출력

함수의 호출 스택 트레이스를 출력해야 하는 경우가 있을 수 있습니다. 예를 들어, *어떻게 그 코드에 도달했는가?*라는 질문에 답하기 위해 유용할 수 있습니다.

`console.trace()`를 사용하여 이를 할 수 있습니다:

```js
const function2 = () => console.trace();
const function1 = () => function2();
function1();
```

이 코드는 스택 트레이스를 출력합니다. Node.js REPL에서 이 코드를 실행하면 다음과 같은 출력이 나옵니다:

```bash
Trace
at function2 (repl:1:33)
at function1 (repl:1:25)
at repl:1:1
at ContextifyScript.Script.runInThisContext (vm.js:44:33)
at REPLServer.defaultEval (repl.js:239:29)
at bound (domain.js:301:14)
at REPLServer.runBound [as eval] (domain.js:314:12)
at REPLServer.onLine (repl.js:440:10)
at emitOne (events.js:120:20)
at REPLServer.emit (events.js:210:7)
```

### 실행 시간 계산

`time()`과 `timeEnd()`를 사용하여 함수가 실행되는 시간을 쉽게 계산할 수 있습니다.

```js
const doSomething = () => console.log('test');
const measureDoingSomething = () => {
  console.time('doSomething()');
  // 실행 시간 측정
  doSomething();
  console.timeEnd('doSomething()');
};
measureDoingSomething();
```

### stdout과 stderr

앞서 봤듯이 `console.log`는 메시지를 콘솔에 출력하는 데 매우 유용합니다. 이는 표준 출력, 즉 `stdout`이라고 합니다.

`console.error`는 `stderr` 스트림에 출력됩니다.

이는 콘솔에는 나타나지 않지만, 에러 로그에는 나타납니다.

### 출력에 색상 추가

[이스케이프 시퀀스](https://gist.github.com/iamnewton/8754917)를 사용하여 콘솔에 출력되는 텍스트에 색상을 추가할 수 있습니다. 이스케이프 시퀀스는 색상을 식별하는 일련의 문자입니다.

예시:

```js
console.log('\x1b[33m%s\x1b[0m', 'hi!');
```

Node.js REPL에서 이를 시도해 보면, 노란색으로 'hi!'가 출력됩니다.

그러나 이것은 매우 저수준의 방식입니다. 콘솔 출력에 색상을 추가하는 가장 간단한 방법은 라이브러리를 사용하는 것입니다. [Chalk](https://github.com/chalk/chalk)는 그러한 라이브러리 중 하나로, 색상뿐만 아니라 텍스트를 굵게, 기울임, 밑줄 등의 스타일링도 도와줍니다.

`npm install chalk`로 설치한 후 다음과 같이 사용할 수 있습니다:

```js
const chalk = require('chalk');

console.log(chalk.yellow('hi!'));
```

`chalk.yellow`를 사용하는 것이 이스케이프 코드를 기억하려고 하는 것보다 훨씬 더 편리하고, 코드도 훨씬 더 읽기 쉽습니다.

위 링크에서 더 많은 사용 예시를 확인할 수 있습니다.

### 진행 막대 만들기

[Progress](https://www.npmjs.com/package/progress)는 콘솔에 진행 막대를 만들 수 있는 훌륭한 패키지입니다. `npm install progress`로 설치한 후 다음 코드로 사용할 수 있습니다.

이 코드는 10단계의 진행 막대를 만들며, 매 100ms마다 한 단계가 완료됩니다. 진행 막대가 완료되면 타이머를 제거합니다:

```js
const ProgressBar = require('progress');

const bar = new ProgressBar(':bar', { total: 10 });
const timer = setInterval(() => {
  bar.tick();
  if (bar.complete) {
    clearInterval(timer);
  }
}, 100);
```
