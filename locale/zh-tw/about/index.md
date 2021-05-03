---
layout: about.hbs
title: 關於
trademark: Trademark
---

# 關於 Node.js®

作為一個非同步事件驅動的 JavaScript 執行環境，Node.js 被設計來打造可擴充的網路應用程式。下方的 hello world 範例可以處理多個併發的連線，每個連線都會觸發回呼函式，但若沒有任務可執行，Node.js 就會進入休眠。

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

這與目前常見使用作業系統行程的併發模型形成鮮明對比，基於行程的網路操作相較之下更沒效率也更難使用。除此之外，因為沒有結的存在，Node.js 的使用者毋須擔心行程死結（deadlock）的問題。Node.js 中幾乎所有的函式都不能直接操作 I/O，因此行程從不阻塞，也因不阻塞，可擴充的系統在 Node.js 中也就水到渠成。

若你仍對上述說明有不清楚的地方，請參閱[阻塞 vs. 非阻塞][]。

---

Node.js 的設計上受到 Ruby [Event Machine][] 和 Python [Twisted][] 的啟發，且更近一步將[事件迴圈][]作為一個執行環境中的結構，而非一個函式庫。在其他系統中，事件迴圈開始前都會有個阻塞的呼叫。

通常執行的行為是透過腳本開頭的回呼函式定義的，接著再透過像 `EventMachine::run()` 這樣的阻塞呼叫來啟動伺服器，在 Node.js 中並沒有這樣的啟動事件迴圈呼叫，Node.js 在執行輸入的腳本後會直接進入事件迴圈，並在沒有任何回呼函式可呼叫時退出事件迴圈，這樣的行為就跟在瀏覽器中的 JavaScript 一樣，整個事件迴圈都在背後進行。

HTTP 是 Node.js 世界中的一等公民，設計之初就考量到了 stream 及低延遲，這使的 Node.js 相當適合作為網頁函式庫或框架的基礎。

Node.js 雖非多線程設計，但這不代表你不能使用多核心，你可以透過 [`child_process.fork()`][] 來產生子行程，其被設計為易於相互溝通。而 [`cluster`][] 模組也是建立在同樣的介面上，它可以讓你在行程間共享 socket 以實現核心的附載平衡。

[阻塞 vs. 非阻塞]: /en/docs/guides/blocking-vs-non-blocking/
[`child_process.fork()`]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
[`cluster`]: https://nodejs.org/api/cluster.html
[事件迴圈]: /en/docs/guides/event-loop-timers-and-nexttick/
[Event Machine]: https://github.com/eventmachine/eventmachine
[Twisted]: https://twistedmatrix.com/trac/
