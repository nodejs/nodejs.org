---
title: Node.js의 Timers
layout: docs.hbs
---

<!--
# Timers in Node.js and beyond

The Timers module in Node.js contains functions that execute code after a set
period of time. Timers do not need to be imported via `require()`, since
all the methods are available globally to emulate the browser JavaScript API.
To fully understand when timer functions will be executed, it's a good idea to
read up on the Node.js
[Event Loop](/en/docs/guides/event-loop-timers-and-nexttick/).
-->

# Node.js의 Timers

Node.js의 Timers 모듈에는 일정 시간 후에 코드를 실행하는 함수가 있습니다. Timers의 모든 메서드는
브라우저 JavaScript API를 에뮬레이트하기 위해 전역으로 사용할 수 있으므로 `require()`로 임포트할
필요가 없습니다. 타이머 함수가 언제 실행될지 완전히 이해하려면 Node.js
[Event Loop](/en/docs/guides/event-loop-timers-and-nexttick/)를 읽어보는 게 좋습니다.

<!--
## Controlling the Time Continuum with Node.js

The Node.js API provides several ways of scheduling code to execute at
some point after the present moment. The functions below may seem familiar,
since they are available in most browsers, but Node.js actually provides
its own implementation of these methods. Timers integrate very closely
with the system, and despite the fact that the API mirrors the browser
API, there are some differences in implementation.
-->

## Node.js 시간 연속체 제어하기

Node.js API는 현시점 이후 어떤 순간에 코드를 실행하도록 스케줄링하는 여러 가지 방법을 제공합니다.
아래의 함수는 대부분 브라우저에서 사용할 수 있으므로 아마 익숙할 테지만 Node.js는 실제로 이러한
메서드의 Node.js 구현체를 제공합니다. Timers는 시스템과 매우 밀접하게 통합되어 있고 API가
브라우저 API를 미러링하고 있음에도 구현에서는 약간의 차이점이 있습니다.

<!--
### "When I say so" Execution ~ *`setTimeout()`*

`setTimeout()` can be used to schedule code execution after a designated
amount of milliseconds. This function is similar to
[`window.setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout)
from the browser JavaScript API, however a string of code cannot be passed
to be executed.

`setTimeout()` accepts a function to execute as its first argument and the
millisecond delay defined as a number as the second argument. Additional
arguments may also be included and these will be passed on to the function. Here
is an example of that:

```js
function myFunc(arg) {
  console.log(`arg was => ${arg}`);
}

setTimeout(myFunc, 1500, 'funky');
```
-->

### "지정한 시기에" 실행 ~ *`setTimeout()`*

`setTimeout()`은 지정한 밀리 초 이후 코드 실행을 스케줄링하는 데 사용할 수 있습니다. 이 함수는
브라우저 JavaScript API의
[`window.setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout)과
비슷하지만, 코드의 문자열을 실행하려고 전달할 수 없습니다.

`setTimeout()`은 첫 인자로 실행할 함수를 받고 두 번째 인자로 지연시킬 밀리 초를 숫자로 받습니다.
부가적인 인자를 더 전달할 수도 있는데 이는 함수로 전달될 것입니다. 다음은 그 예제입니다.

```js
function myFunc(arg) {
  console.log(`arg was => ${arg}`);
}

setTimeout(myFunc, 1500, 'funky');
```

<!--
The above function `myFunc()` will execute as close to 1500
milliseconds (or 1.5 seconds) as possible due to the call of `setTimeout()`.

The timeout interval that is set cannot be relied upon to execute after
that *exact* number of milliseconds. This is because other executing code that
blocks or holds onto the event loop will push the execution of the timeout
back. The *only* guarantee is that the timeout will not execute *sooner* than
the declared timeout interval.

`setTimeout()` returns a `Timeout` object that can be used to reference the
timeout that was set. This returned object can be used to cancel the timeout (
see `clearTimeout()` below) as well as change the execution behavior (see
`unref()` below).
-->

위 함수 `myFunc()`는 `setTimeout()` 호출로 인해 약 1500밀리 초(1.5초) 정도에
실행될 것입니다.

설정한 타임아웃 간격은 *정확한* 밀리 초 후 실행되도록 할 수 없습니다. 이벤트 루프를 블로킹하거나
보유하고 있는 다른 실행 코드가 타임아웃의 실행을 다시 뒤로 밀기 때문입니다. 선언된 타임아웃 간격보다
*더 빨리* 실행되지는 않는다는 *것만* 보장합니다.

`setTimeout()`은 설정한 타임아웃을 참조하는 `Timeout` 객체를 반환합니다. 여기서 반환된 객체로
실행 동작을 변경할 수도 있고(아래 `unref()`를 보세요.) 타임아웃을
취소할 수 있습니다.(아래 `clearTimeout()`을 보세요.)

<!--
### "Right after this" Execution ~ *`setImmediate()`*

`setImmediate()` will execute code at the end of the current event loop cycle.
This code will execute *after* any I/O operations in the current event loop and
*before* any timers scheduled for the next event loop. This code execution
could be thought of as happening "right after this", meaning any code following
the `setImmediate()` function call will execute before the `setImmediate()`
function argument.

The first argument to `setImmediate()` will be the function to execute. Any
subsequent arguments will be passed to the function when it is executed.
Here's an example:

```js
console.log('before immediate');

setImmediate((arg) => {
  console.log(`executing immediate: ${arg}`);
}, 'so immediate');

console.log('after immediate');
```
-->

### "바로 다음에" 실행 ~ *`setImmediate()`*

`setImmediate()`는 현재 이벤트 루프 주기 끝에 코드를 실행합니다. 이 코드는 현재 이벤트 루프의
모든 I/O 작업 후 다음 이벤트 루프에 스케줄링 된 모든 타이머 이전에 실행됩니다. 이 코드 실행은
`setImmediate()` 함수 호출 뒤에 오는 모든 코드는 `setImmediate()` 함수 인자 이전에 실행된다는
의미로 "바로 다음에" 실행한다고 생각할 수 있습니다.

`setImmediate()`의 첫 인자는 실행할 함수입니다. 그 뒤의 인자는 실행될 때 함수로 전달됩니다.
다음은 그 예제입니다.

```js
console.log('before immediate');

setImmediate((arg) => {
  console.log(`executing immediate: ${arg}`);
}, 'so immediate');

console.log('after immediate');
```

<!--
The above function passed to `setImmediate()` will execute after all runnable
code has executed, and the console output will be:

```
before immediate
after immediate
executing immediate: so immediate
```

`setImmediate()` returns and `Immediate` object, which can be used to cancel
the scheduled immediate (see `clearImmediate()` below).

Note: Don't get `setImmediate()` confused with `process.nextTick()`. There are
some major ways they differ. The first is that `process.nextTick()` will run
*before* any `Immediate`s that are set as well as before any scheduled I/O.
The second is that `process.nextTick()` is non-clearable, meaning once
code has been scheduled to execute with `process.nextTick()`, the execution
cannot be stopped, just like with a normal function. Refer to [this guide](/en/docs/guides/event-loop-timers-and-nexttick/#process-nexttick)
to better understand the operation of `process.nextTick()`.
-->

`setImmediate()`에 전달한 위 함수는 실행할 수 있는 코드를 모두 실행한 후에 실행하고 콘솔 출력은 다음과 같을 것입니다.

```
before immediate
after immediate
executing immediate: so immediate
```

`setImmediate()`는 바로 스케줄링 된 것을 취소할 수 있는 `Immediate` 객체를
반환합니다.(아래 `clearImmediate()`를 보세요)

Note: `setImmediate()`를 `process.nextTick()`와 혼동하지 마세요. 서로 다른 몇 가지 점이
있습니다. 첫째로 `process.nextTick()`은 모든 스케줄링된 I/O 이전뿐만 아니라 설정한 모든
`Immediate` *이전에* 실행될 것입니다. 두 번째로 `process.nextTick()`은 취소할 수 없으므로
일단 `process.nextTick()`으로 코드를 실행하도록 스케줄링하면 일반 함수처럼 실행을 멈출 수 없습니다.
`process.nextTick()`의 동작을 더 이해하려면
[이 가이드 문서](/en/docs/guides/event-loop-timers-and-nexttick/#process-nexttick)를
참고하세요.

<!--
### "Infinite Loop" Execution ~ *`setInterval()`*

If there is a block of code that should execute multiple times, `setInterval()`
can be used to execute that code. `setInterval()` takes a function
argument that will run an infinite number of times with a given millisecond
delay as the second argument. Just like `setTimeout()`, additional arguments
can be added beyond the delay, and these will be passed on to the function call.
Also like `setTimeout()`, the delay cannot be guaranteed because of operations
that may hold on to the event loop, and therefore should be treated as an
approximate delay. See the below example:

```js
function intervalFunc() {
  console.log('Cant stop me now!');
}

setInterval(intervalFunc, 1500);
```
In the above example, `intervalFunc()` will execute about every 1500
milliseconds, or 1.5 seconds, until it is stopped (see below).

Just like `setTimeout()`, `setInterval()` also returns a `Timeout` object which
can be used to reference and modify the interval that was set.
-->

### "무한루프" 실행 ~ *`setInterval()`*

여러 번 실행해야 하는 코드 블록이 있다면 `setInterval()`을 사용할 수 있습니다.
`setInterval()`은 두 번째 인자로 지정한 밀리 초 단위의 지연시간으로 무한대로 실행할 함수를
인자로 받습니다. `setTimeout()`처럼 지연시간 다음에 부가적인 인자를 지정할 수 있고 이는 함수 호출에
전달될 것입니다. 또한 `setTimeout()`처럼 작업이 이벤트 루프에서 진행 중일 수 있으므로 지연시간이
보장되지 않습니다. 그러므로 대략적인 지연시간으로 생각해야 합니다. 아래 예시를 보겠습니다.

```js
function intervalFunc() {
  console.log('Cant stop me now!');
}

setInterval(intervalFunc, 1500);
```

위 예제에서 `intervalFunc()`는 중단하기 전까지는(아래 참고) 1500밀리 초(1.5초)마다 실행될 것입니다.

`setTimeout()`처럼 `setInterval()`도 설정한 인터벌을 참조하고 수정하는 데 사용할 수 있는
`Timeout` 객체를 반환합니다.

<!--
## Clearing the Future

What can be done if a `Timeout` or `Immediate` object needs to be cancelled?
`setTimeout()`, `setImmediate()`, and `setInterval()` return a timer object
that can be used to reference the set `Timeout` or `Immediate` object.
By passing said object into the respective `clear` function, execution of
that object will be halted completely. The respective functions are
`clearTimeout()`, `clearImmediate()`, and `clearInterval()`. See the example
below for an example of each:

```js
const timeoutObj = setTimeout(() => {
  console.log('timeout beyond time');
}, 1500);

const immediateObj = setImmediate(() => {
  console.log('immediately executing immediate');
});

const intervalObj = setInterval(() => {
  console.log('interviewing the interval');
}, 500);

clearTimeout(timeoutObj);
clearImmediate(immediateObj);
clearInterval(intervalObj);
```
-->

## 취소하기

`Timeout`이나 `Immediate` 객체를 취소하고 싶다면 어떻게 해야 할까요? `setTimeout()`,
`setImmediate()`, `setInterval()`은 설정한 `Timeout`이나 `Immediate` 객체를 참조하는
타이머 객체를 반환합니다. 각각의 `clear` 함수에 이 객체들을 전달해서 해당 객체의 실행을 완전히
중단할 수 있습니다. 각각의 함수는 `clearTimeout()`, `clearImmediate()`,
`clearInterval()`입니다. 각 예제는 아래에 나와 있습니다.

```js
const timeoutObj = setTimeout(() => {
  console.log('timeout beyond time');
}, 1500);

const immediateObj = setImmediate(() => {
  console.log('immediately executing immediate');
});

const intervalObj = setInterval(() => {
  console.log('interviewing the interval');
}, 500);

clearTimeout(timeoutObj);
clearImmediate(immediateObj);
clearInterval(intervalObj);
```

<!--
## Leaving Timeouts Behind

Remember that `Timeout` objects are returned by `setTimeout` and `setInterval`.
The `Timeout` object provides two functions intended to augment `Timeout`
behavior with `unref()` and `ref()`. If there is a `Timeout` object scheduled
using a `set` function, `unref()` can be called on that object. This will change
the behavior slightly, and not call the `Timeout` object *if it is the last
code to execute*. The `Timeout` object will not keep the process alive, waiting
to execute.

In similar fashion, a `Timeout` object that has had `unref()` called on it
can remove that behavior by calling `ref()` on that same `Timeout` object,
which will then ensure its execution. Be aware, however, that this does
not *exactly* restore the initial behavior for performance reasons. See
below for examples of both:

```js
const timerObj = setTimeout(() => {
  console.log('will i run?');
});

// if left alone, this statement will keep the above
// timeout from running, since the timeout will be the only
// thing keeping the program from exiting
timerObj.unref();

// we can bring it back to life by calling ref() inside
// an immediate
setImmediate(() => {
  timerObj.ref();
});
```
-->

## 타임아웃 감춰두기

여기서 `Timeout` 객체는 `setTimeout`과 `setInterval`이 반환했다는 점을 기억하길 바랍니다.
`Timeout` 객체는 `Timeout`의 동작을 강화하는 두 가지 함수 `unref()`와 `ref()`를 제공합니다.
`set` 함수로 스케줄링 된 `Timeout` 객체가 있다면 이 객체에서 `unref()`를 호출할 수 있습니다.
이는 동작을 다소 변경하는데 *실행할 코드가 이것밖에 남지 않았다면* `Timeout` 객체를 호출하지 않습니다.
`Timeout` 객체는 프로세스를 유지하지 않고 실행을 기다립니다.

비슷하게 `unref()`가 호출된 `Timeout` 객체에서 `ref()`를 호출하면 이 동작을 제거해서
실행을 보장할 수 있습니다. 하지만 성능 문제로 초기 동작을 *완전히 똑같이* 복구하는 것은 아닙니다.
아래의 예제를 보겠습니다.

```js
const timerObj = setTimeout(() => {
  console.log('will i run?');
});

// 이 부분만 있다면 이 타임아웃이 프로그램을 종료되지 않게 하고 있으므로
// 위 타임아웃이 실행되지 않도록 합니다.
timerObj.unref();

// immediate 안에서 ref()를 실행해서 다시 실행상태로 만들 수 있습니다
setImmediate(() => {
  timerObj.ref();
});
```

<!--
## Further Down the Event Loop

There's much more to the Event Loop and Timers than this guide
has covered. To learn more about the internals of the Node.js
Event Loop and how Timers operate during execution, check out
this Node.js guide: [The Node.js Event Loop, Timers, and
process.nextTick()](/en/docs/guides/event-loop-timers-and-nexttick/).
-->

## 이벤트 루프 더 알아보기

이벤트 루프와 타이머에는 이 문서에서 다룬 것 이상의 많은 내용이 있습니다. Node.js 이벤트 루프의
내부 구조와 실행할 때 타이머가 동작하는 방식을 알고 싶다면
[Node.js 이벤트 루프, 타이머, process.nextTick()](/en/docs/guides/event-loop-timers-and-nexttick/)
문서를 참고하세요.
