---
title: Timers in Node.js
layout: docs.hbs
---

# Node.js のタイマーと仕組み

The Timers module in Node.js contains functions that execute code after a set period of time. Timers do not need to be imported via `require()`, since all the methods are available globally to emulate the browser JavaScript API. To fully understand when timer functions will be executed, it's a good idea to read up on the Node.js [Event Loop](/en/docs/guides/event-loop-timers-and-nexttick/).

## Node.js を使って連続した時間を制御する

Node.js のタイマーモジュールには、 一定期間後にコードを実行する関数が含まれています。 ブラウザの JavaScript API をエミュレートするためにすべてのメソッドがグローバルに利用可能であるため、 `require()` を介してタイマーをインポートする必要はありません。 タイマー関数がいつ実行されるかを完全に理解するためには、 Node.js の[イベントループ](/ja/docs/guides/event-loop-timers-and-nexttick/)を読むことをお勧めします。

### "そう言うとき" 実行する ~ *`setTimeout()`*

`setTimeout()` can be used to schedule code execution after a designated amount of milliseconds. This function is similar to [`window.setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout) from the browser JavaScript API, however a string of code cannot be passed to be executed.

Node.js APIには、現時点以降のある時点でコードを実行するように スケジューリングする方法がいくつかあります。 以下の関数はほとんどのブラウザで利用可能であるためおなじみのように思われるかもしれませんが、 Node.js は実際にはこれらのメソッドの独自の実装を提供します。 タイマーはシステムと非常に密接に統合されており、 API がブラウザ API を反映しているという事実があるにもかかわらず、実装にはいくつかの違いがあります。

```js
function myFunc(arg) {
  console.log(`arg was => ${arg}`);
}

setTimeout(myFunc, 1500, 'funky');
```

The above function `myFunc()` will execute as close to 1500 milliseconds (or 1.5 seconds) as possible due to the call of `setTimeout()`.

`setTimeout()` を使用して、 指定したミリ秒後に コードの実行をスケジュールすることができます。 この関数はブラウザの JavaScript API の [`window.setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout)に似ていますが、 コードの文字列を渡して実行することはできません。

`setTimeout()` は、最初の引数として実行する関数と、 2番目の引数として数値として定義されたミリ秒の遅延を受け入れます。 追加の引数も含めることができ、これらは関数に渡されます。 これはその一例です:

### "この直後に" 実行する ~ *`setImmediate()`*

上記の関数 `myFunc()` は、`setTimeout()` の呼び出しにより、 可能な限り 1500 ミリ秒 (または 1.5 秒) くらいで実行されます。

設定されたタイムアウト間隔は、 その*正確な*ミリ秒数の後に実行することに依存することはできません。 これは、イベントループをブロックまたは保留している他の実行コードがタイムアウトの実行を遅らせるためです。 *唯一*保証されているのは、 タイムアウトが宣言されたタイムアウト間隔より早く実行されないということです。

```js
console.log('before immediate');

setImmediate((arg) => {
  console.log(`executing immediate: ${arg}`);
}, 'so immediate');

console.log('after immediate');
```

`setTimeout()` は、設定されたタイムアウトを参照するために使用できる `Timeout` オブジェクトを返します。 この返されたオブジェクトを使用して、タイムアウトをキャンセル (下記の `clearTimeout()` を参照) し、 実行動作を変更 (下記の`unref()` を参照) することができます。

```
before immediate
after immediate
executing immediate: so immediate
```

`setImmediate()` returns an `Immediate` object, which can be used to cancel the scheduled immediate (see `clearImmediate()` below).

`setImmediate()` は現在のイベントループサイクルの終わりにコードを実行します。 このコードは、現在のイベントループ内の I/O 操作の*後*、 および次のイベントループのためにスケジュールされたタイマーの*前*に実行されます。 このコードの実行は「この直後」に行われると考えることができます。 つまり、`setImmediate()` 関数呼び出しに続くコードは、 `setImmediate()`関数引数の前に実行されます。

### "無限ループ" 実行 ~ *`setInterval()`*

`setImmediate()` の最初の引数は実行する関数になります。 それ以降の引数は、実行時に関数に渡されます。これが例です:

```js
function intervalFunc() {
  console.log('Cant stop me now!');
}

setInterval(intervalFunc, 1500);
```

`setImmediate()` に渡された上記の関数は、すべての実行可能コードが実行された後に実行され、 コンソール出力は次のようになります:

`setImmediate()` は `Immediate` オブジェクトを返します。 これを使用して、スケジュールされた Immediate をキャンセル (下記の `clearImmediate()` を参照) できます。

## 未来をクリアする

注意: `setImmediate()` を `process.nextTick()` と混同しないでください。 いくつかの大きな違いがあります。 1つ目は、`process.nextTick()` は、設定されている `Immediate` やスケジュールされている I/O の*前*に実行されるということです。 2つ目は、`process.nextTick()` は消去不可能であるということです。 つまり、一度 `process.nextTick()` でコードを実行するようにスケジュールされると、 通常の関数のように実行を停止することはできません。 `process.nextTick()` の操作をよく理解するために[このガイド](/ja/docs/guides/event-loop-timers-and-nexttick/#process-nexttick)を参照してください。

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

## 後ろにタイムアウトを残す

Remember that `Timeout` objects are returned by `setTimeout` and `setInterval`. The `Timeout` object provides two functions intended to augment `Timeout` behavior with `unref()` and `ref()`. If there is a `Timeout` object scheduled using a `set` function, `unref()` can be called on that object. This will change the behavior slightly, and not call the `Timeout` object *if it is the last code to execute*. The `Timeout` object will not keep the process alive, waiting to execute.

複数回実行する必要があるコードブロックがある場合、 `setInterval()` を使用してそのコードを実行できます。 `setInterval()` は2番目の引数として指定されたミリ秒の遅れで無限回実行する関数の引数を取ります。 `setTimeout()` と同じように、遅延を超えて追加の引数を追加することができ、 それらは関数呼び出しに渡されます。 `setTimeout()` と同様に、イベントループに耐えることができる操作のために遅延を保証することはできません。 したがっておおよその遅延として扱われるべきです。 以下の例を参照してください。

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

## イベントループのさらに下へ

上の例では、`intervalFunc()` は停止されるまで 約 1500 ミリ秒 (1.5秒) ごとに実行されます(下記参照)。
