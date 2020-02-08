---
title: Node.js 中的定时器
layout: docs.hbs
---

# Node.js 中的定时器

Node.js 中的定时器模块包含了隔一定时间执行一遍代码的函数。定时器不必通过 `require()` 的方式引入，因为所有这些方法都是模拟浏览器中 JavaScript 函数，是全局的。为了更好的全面理解何时这些函数将执行，阅读 Node.js 中[事件轮询](/en/docs/guides/event-loop-timers-and-nexttick/)是一个好主意。

## 用 Node.js 控制时间的连续

Node.js 中的 API 函数提供了几种方式，允许代码从现在时间之后的某个时刻开始执行。以下给出的函数看上去很相似，因为它们在大多数浏览器中都可用。但是 Node.js 实际上提供了它自己的实现。定时器与系统非常紧密地结合在一起，尽管这些 API 是浏览器中函数的翻版，但是仍然在实现上有所不同。

### “当我这样说的时候” 的执行方式 ~ *`setTimeout()`*

`setTimeout()` 可被用来在一段指定时间之后执行某个代码任务。此函数与浏览器 JavaScript 函数 [`window.setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout) 很相似，但是你不能把一串字符串传入执行。

`setTimeout()` 接受一个可执行的函数作为其第一个参数，然后有一个毫秒为单位的延时时间作为第二个参数。其余的参数也可纳入其中，作为传给此函数的参数使用。以下是一个例子：

```js
function myFunc(arg) {
  console.log(`arg was => ${arg}`);
}

setTimeout(myFunc, 1500, 'funky');
```

因为使用了 `setTimeout()`，以上函数 `myFunc()` 将在 1500 毫秒（或者1.5秒）左右时执行。

设置的定时间隔不能保证每次都是以 *精准* 的毫秒间隔数执行代码，这是因为其它阻塞或者正在事件轮询上处理的代码将推迟此定时的执行。*唯一* 保证的是定时器不会比声明的时间间隔 *提早* 执行。

`setTimeout()` 返回一个 `Timeout` 对象，可通过该对象引用到设置的定时器。这个返回的对象可以被用来取消定时（见下面的 `clearTimeout()` 部分），同时还可以改变执行行为（见下面的 `unref()` 部分）。

### "在此之后立即执行" *`setImmediate()`*

`setImmediate()` 将在当前事件轮询的末尾处执行。
本代码将在当前事件轮询中的任何 I/O 操作 *后*，在任何下一轮定时器 *前* 执行。代码执行可以被认为是“在此之后立即执行”，这意味着任何紧跟着 `setImmediate()` 函数调用将在 `setImmediate()` 函数参数前执行。

`setImmediate()` 的第一个参数是要执行的函数，当执行时，后面的参数将作为参数传入这个函数中。这是一个例子：

```js
console.log('before immediate');

setImmediate((arg) => {
  console.log(`executing immediate: ${arg}`);
}, 'so immediate');

console.log('after immediate');
```

传入 `setImmediate()` 的上述函数将在任何可执行的代码执行完后执行，所以输出结果是：

```
before immediate
after immediate
executing immediate: so immediate
```

`setImmediate()` 返回一个 `Immediate` 对象，它可以被用于取消安排的定时任务（见下面的 `clearImmediate()` ）。

注意：不要把 `setImmediate()` 和 `process.nextTick()` 相混淆。它们有一些主要的差别：第一， `process.nextTick()` 将在任何设置好的 `Immediate` 以及任何安排好的 I/O *前* 执行。第二， `process.nextTick()` 是不可擦除的，换句话说，一旦有代码使用 `process.nextTick()` 执行，执行无法中断，这就像一个普通函数一样，具体可以参考[此教程](/en/docs/guides/event-loop-timers-and-nexttick/#process-nexttick)来更好地理解 `process.nextTick()` 的操作。

### "永远的轮询" 执行 ~ *`setInterval()`*

如果存在一块函数，它需要多次执行，`setInterval()` 可以派上用场。`setInterval()` 接受一个函数作为其参数，该函数将被运行无限次，第二个参数便是一个给定的延时毫秒数。就像 `setTimeout()`，其余参数可以在这之后添加，作为传递给函数调用的参数使用。另外一个和 `setTimeout()` 类似的地方是延时不保证精确，因为有些操作可能在事件轮询上挂住，因此可以被认为是大致的延时。如以下例子：

```js
function intervalFunc() {
  console.log('Cant stop me now!');
}

setInterval(intervalFunc, 1500);
```

在上面的例子中，`intervalFunc()` 每 1500 毫秒执行一次（或每 1.5 秒执行一次），直到它被终止（见下）。

就像 `setTimeout()`，`setInterval()` 同样返回一个 `Timeout` 对象，它可以被引用并且改变设定的定时器。

## 清除定时器

如果 `Timeout` 或 `Immediate` 需要被取消，我们该怎么办？`setTimeout()`，`setImmediate()` 和 `setInterval()` 返回一个定时器对象，它可以被用来引用设置过的 `Timeout` 或 `Immediate` 对象。通过把该对象传入 `clear` 函数中，那个对象就会被终止执行。这些可接受的函数是 `clearTimeout()`，`clearImmediate()` 和 `clearInterval()`。看下面例子：

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

## 让定时器在背后运行

你已经记住了 `Timeout` 对象是通过 `setTimeout` 和 `setInterval` 返回的。 `Timeout` 对象提供了两个针对 `Timeout` 行为的函数： `unref()` 和 `ref()`。如果有一个 `Timeout` 对象是通过 `set` 函数设定排程的，`unref()` 就可以用于那个对象。这会对它产生一些轻微的改变，那就是 *如果它是最后的执行代码* ，将不会调用 `Timeout` 对象。

相似的是，`Timeout` 对象有 `unref()` 方法可以被调用从而移除通过在相同的 `Timeout` 对象上调用了 `ref()` 之后所施加的行为，从而保证它的执行。小心一点，它并不会 *准确地* 恢复到初始化的行为状态。请见下面的例子：

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

## 进一步向下的事件循环

还有远比本篇多得多的，关于时间轮询和定时器的东西，本文未涉及到。你可以通过 [Node.js 的时间轮询，定时器以及 process.nextTick()](/zh-cn/docs/guides/event-loop-timers-and-nexttick/) 学习到更多有关于 Node.js 内部事件轮询机制，以及定时器在执行时如何操作的。
