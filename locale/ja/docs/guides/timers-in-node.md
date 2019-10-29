---
title: Node.js のタイマー
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
# Node.js のタイマーと仕組み

Node.js のタイマーモジュールには、
一定期間後にコードを実行する関数が含まれています。
ブラウザの JavaScript API をエミュレートするためにすべてのメソッドがグローバルに利用可能であるため、
`require()` を介してタイマーをインポートする必要はありません。
タイマー関数がいつ実行されるかを完全に理解するためには、
Node.js の[イベントループ](/ja/docs/guides/event-loop-timers-and-nexttick/)を読むことをお勧めします。

<!--
## Controlling the Time Continuum with Node.js

The Node.js API provides several ways of scheduling code to execute at
some point after the present moment. The functions below may seem familiar,
since they are available in most browsers, but Node.js actually provides
its own implementation of these methods. Timers integrate very closely
with the system, and despite the fact that the API mirrors the browser
API, there are some differences in implementation.

-->
## Node.js を使って連続した時間を制御する

Node.js APIには、現時点以降のある時点でコードを実行するように
スケジューリングする方法がいくつかあります。
以下の関数はほとんどのブラウザで利用可能であるためおなじみのように思われるかもしれませんが、
Node.js は実際にはこれらのメソッドの独自の実装を提供します。
タイマーはシステムと非常に密接に統合されており、
API がブラウザ API を反映しているという事実があるにもかかわらず、実装にはいくつかの違いがあります。

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
### "そう言うとき" 実行する ~ *`setTimeout()`*

`setTimeout()` を使用して、
指定したミリ秒後に
コードの実行をスケジュールすることができます。
この関数はブラウザの JavaScript API の [`window.setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout)に似ていますが、
コードの文字列を渡して実行することはできません。

`setTimeout()` は、最初の引数として実行する関数と、
2番目の引数として数値として定義されたミリ秒の遅延を受け入れます。
追加の引数も含めることができ、これらは関数に渡されます。
これはその一例です:

```js
function myFunc(arg) {
  console.log(`arg was => ${arg}`);
}

setTimeout(myFunc, 1500, 'funky');
```

上記の関数 `myFunc()` は、`setTimeout()` の呼び出しにより、
可能な限り 1500 ミリ秒 (または 1.5 秒) くらいで実行されます。

設定されたタイムアウト間隔は、
その*正確な*ミリ秒数の後に実行することに依存することはできません。
これは、イベントループをブロックまたは保留している他の実行コードがタイムアウトの実行を遅らせるためです。
*唯一*保証されているのは、
タイムアウトが宣言されたタイムアウト間隔より早く実行されないということです。

`setTimeout()` は、設定されたタイムアウトを参照するために使用できる
`Timeout` オブジェクトを返します。
この返されたオブジェクトを使用して、タイムアウトをキャンセル (下記の `clearTimeout()` を参照) し、
実行動作を変更 (下記の`unref()` を参照) することができます。

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

The above function passed to `setImmediate()` will execute after all runnable
code has executed, and the console output will be:

```
before immediate
after immediate
executing immediate: so immediate
```

`setImmediate()` returns an `Immediate` object, which can be used to cancel
the scheduled immediate (see `clearImmediate()` below).

Note: Don't get `setImmediate()` confused with `process.nextTick()`. There are
some major ways they differ. The first is that `process.nextTick()` will run
*before* any `Immediate`s that are set as well as before any scheduled I/O.
The second is that `process.nextTick()` is non-clearable, meaning once
code has been scheduled to execute with `process.nextTick()`, the execution
cannot be stopped, just like with a normal function. Refer to [this guide](/en/docs/guides/event-loop-timers-and-nexttick/#process-nexttick)
to better understand the operation of `process.nextTick()`.

-->
### "この直後に" 実行する ~ *`setImmediate()`*

`setImmediate()` は現在のイベントループサイクルの終わりにコードを実行します。
このコードは、現在のイベントループ内の I/O 操作の*後*、
および次のイベントループのためにスケジュールされたタイマーの*前*に実行されます。
このコードの実行は「この直後」に行われると考えることができます。
つまり、`setImmediate()` 関数呼び出しに続くコードは、
`setImmediate()`関数引数の前に実行されます。

`setImmediate()` の最初の引数は実行する関数になります。
それ以降の引数は、実行時に関数に渡されます。これが例です:

```js
console.log('before immediate');

setImmediate((arg) => {
  console.log(`executing immediate: ${arg}`);
}, 'so immediate');

console.log('after immediate');
```

`setImmediate()` に渡された上記の関数は、すべての実行可能コードが実行された後に実行され、
コンソール出力は次のようになります:

```
before immediate
after immediate
executing immediate: so immediate
```

`setImmediate()` は `Immediate` オブジェクトを返します。
これを使用して、スケジュールされた Immediate をキャンセル (下記の `clearImmediate()` を参照) できます。

注意: `setImmediate()` を `process.nextTick()` と混同しないでください。
いくつかの大きな違いがあります。
1つ目は、`process.nextTick()` は、設定されている `Immediate` やスケジュールされている I/O の*前*に実行されるということです。
2つ目は、`process.nextTick()` は消去不可能であるということです。
つまり、一度 `process.nextTick()` でコードを実行するようにスケジュールされると、
通常の関数のように実行を停止することはできません。
`process.nextTick()` の操作をよく理解するために[このガイド](/ja/docs/guides/event-loop-timers-and-nexttick/#process-nexttick)を参照してください。

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
### "無限ループ" 実行 ~ *`setInterval()`*

複数回実行する必要があるコードブロックがある場合、
`setInterval()` を使用してそのコードを実行できます。
`setInterval()` は2番目の引数として指定されたミリ秒の遅れで無限回実行する関数の引数を取ります。
`setTimeout()` と同じように、遅延を超えて追加の引数を追加することができ、
それらは関数呼び出しに渡されます。
`setTimeout()` と同様に、イベントループに耐えることができる操作のために遅延を保証することはできません。
したがっておおよその遅延として扱われるべきです。
以下の例を参照してください。

```js
function intervalFunc() {
  console.log('Cant stop me now!');
}

setInterval(intervalFunc, 1500);
```

上の例では、`intervalFunc()` は停止されるまで
約 1500 ミリ秒 (1.5秒) ごとに実行されます(下記参照)。

`setTimeout()` と同様に、
`setInterval()` もまた設定された間隔を参照したり修正したりするのに使用できる `Timeout` オブジェクトを返します。

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
## 未来をクリアする

`Timeout` または `Immediate` オブジェクトをキャンセルする必要がある場合はどうすればいいですか？
`setTimeout()`、`setImmediate()`、および `setInterval()` は、
set `Timeout`または `Immediate` オブジェクトを参照するために使用できるタイマーオブジェクトを返します。
前述のオブジェクトをそれぞれの `clear` 関数に渡すことによって、
そのオブジェクトの実行は完全に停止されます。
それぞれの関数は `clearTimeout()`、`clearImmediate()`、そして `clearInterval()` です。
それぞれの例については、以下の例を参照してください:

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
## 後ろにタイムアウトを残す

`Timeout` オブジェクトは `setTimeout` と `setInterval` によって返されることを忘れないでください。
`Timeout` オブジェクトは `unref()` と `ref()` で `Timeout` の振る舞いを増強することを目的とした2つの関数を提供します。
`set` 関数を使ってスケジュールされた `Timeout` オブジェクトがあれば、
そのオブジェクトに対して `unref()` を呼び出すことができます。
これはふるまいをわずかに変えます、
そして*それが実行する最後のコードであるなら* `Timeout` オブジェクトを呼ばないでください。
`Timeout` オブジェクトはプロセスを実行し続け、実行するのを待ちません。

同様に、`unref()` が呼び出された `Timeout` オブジェクトは、
同じ `Timeout` オブジェクトに対して `ref()` を呼び出すことでその振る舞いを取り除くことができ、
それによってその実行が保証されます。
ただし、パフォーマンス上の理由から、これによって初期の動作が*正確*に復元されるわけではないことに注意してください。
両方の例については、以下を参照してください。

```js
const timerObj = setTimeout(() => {
  console.log('will i run?');
});

// このままにしておくと、
// タイムアウトがプログラムの終了を妨げる唯一のものになるので、
// このステートメントで上記のタイムアウトを実行しないようにします。
timerObj.unref();

// immediate 内で ref() を呼び出すことでそれを元の状態に
// 戻すことができます。
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
## イベントループのさらに下へ

このガイドでカバーしてきた以上に
イベントループとタイマーにはもっとたくさんのものがあります。
Node.js イベントループの内部と、
実行中のタイマーの動作の詳細については、
この Node.js ガイド [Node.js イベントループ、タイマー、および process.nextTick()](/ja/docs/guides/event-loop-timers-and-nexttick/) を参照してください。
