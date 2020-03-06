---
title: HTTP 传输解析
layout: docs.hbs
---

# 一次 HTTP 传输解析

本指南的宗旨将让你对 HTTP 传输处理有一个清晰完整的了解。在不考虑特定编程语言及开发环境下，我们假设你已经知道在一般情况下 HTTP 是如何进行工作的。我们同样假定你熟悉 Node.js 的 [`EventEmitters`][] 和 [`Streams`][]。当然，如果你确实不了解它们，我们强烈建议你把以上列出的内容快速而完整地阅读一遍。

## 创建一个后台服务

任何网络服务应用程序总是要先创建一个服务对象。这在 Node.js 中通常通过 [`createServer`][] 方法。

```javascript
const http = require('http');

const server = http.createServer((request, response) => {
  // magic happens here!
});
```

每当有 HTTP 请求到达服务器时，[`createServer`][] 中传入的函数就被自动执行。所以这个函数也被称为是请求处理函数。实际上，由 [`createServer`][] 构造函数返回的 [`Server`][] 对象是一个 [`EventEmitter`][]，我们在这里仅是对创建 `server` 和对它添加监听事件进行了简化处理。

```javascript
const server = http.createServer();
server.on('request', (request, response) => {
  // the same kind of magic happens here!
});
```

当一个 HTTP 到达服务端，node 调用 request 处理程序，并产生一些唾手可得的对象用以处理传输，这些对象就是 `request` 和 `response`。我们马上会讲到。

实际上，为了处理请求，[`listen`][] 方法需要在 `server` 对象上被显式调用。在大多数情况下，你只要把端口号作为参数传入 `listen` 方法中，作为监听端口即可。当然也有一些其它选项，具体可以参考 [API 参考文档][]。

## 方法、访问地址以及请求头

当处理一个请求时，第一件事你需要做的是看一下这个方法和其访问地址，以此决定你到底采取何种合理的行为。Node.js 通过把这些行为属性附加到 `request` 对象上，使得我们处理起来相对而言可以轻松一些。

```javascript
const { method, url } = request;
```

> **注意：** `request` 对象是 [`IncomingMessage`][] 的一个实例。

这里的 `method` 总是一个普通的 HTTP 方法动作行为 (verb)，`url` 是指没有服务器协议和
端口号的完整访问地址。一个典型的访问地址通常意味着包括第三个斜杠以及后面的所有内容。

请求头也不是很难得到，它们也在 `request` 对象里，称为 `headers`。

```javascript
const { headers } = request;
const userAgent = headers['user-agent'];
```

非常重要的一点是：所有的请求头全是小写字母，而不管实际上它们是怎么进行传输的。所以在无论任何
情况下，解析请求头就得到了简化。

如果一些请求头出现重复，它们的值不是被覆盖，就是通过英文分号进行分割。究竟哪种方式取决于具体的信息头。在某些情况下这可能出现问题，所以我们还可以直接使用 [`rawHeaders`][]。

## 请求体

当接受到了一个 `POST` 或者 `PUT` 请求时，请求体对于你的应用程序非常重要。相对于访问请求
头而言，获取请求体有些麻烦。传入请求对象的 `request` 其实实现了 [`ReadableStream`][] 接口，
这个信息流可以被监听，或者与其它流进行对接。我们可以通过监听 `'data'` 和 `'end'` 事件从而把
数据给取出来。

每次在 `'data'` 事件中触发抓获的数据块是一个 [`Buffer`][]。如果你已知是一个字符串对象，那么
最好的方案就是把这些数据收集到一个数组中，然后在 `'end'` 事件中拼接并且把它转化为字符串。

```javascript
let body = [];
request.on('data', (chunk) => {
  body.push(chunk);
}).on('end', () => {
  body = Buffer.concat(body).toString();
  // at this point, `body` has the entire request body stored in it as a string
});
```

> **注意：** 这看起来有些单调乏味，大多数情况下也确实是这样。
> 不过庆幸的是因为 [`npm`][] 上实在有太多的诸如 [`concat-stream`][] 和 [`body`][] 一类类库屏蔽了部分细节逻辑而替你做了这些事情。当然，对于你而言在使用这些类库前知道它们到底干了什么非常重要，这就是你为什么需要读这篇文章！

## 一笔带过关于错误的一些信息

因为 `request` 是一个 [`ReadableStream`][] 对象，它同样也是 [`EventEmitter`][] 对象。所以当有错误发生时，表现的行为是很相像的。当有错误在 `request` 流上发生时，它会自动激发自身的 `'error'` 事件。**如果你不去处理监听这个事件，此错误将被*抛出*，这导致你的程序崩溃。** 你应该无论如何都要添加 `'error'` 事件去监听你的请求对象，哪怕你只是做一个日志或者用你自己的独有方式去处理（当然，最佳的处理方式是返回一些出错的信息，这已是后话了）。

```javascript
request.on('error', (err) => {
  // This prints the error message and stack trace to `stderr`.
  console.error(err.stack);
});
```

当然还有一些其它的方法来[处理错误][]，诸如其它的抽象化概念和工具等。但是你总是要意识到错误的确会发生，所以你应当处理它们。

## 我们已经聊得那么多了

直到现在，我们已经谈到了如何创建一个对象，如果从请求中获取方法，请求地址，请求头和请求体。当我们把它们组合到一起，它就看上去是这个样子：

```javascript
const http = require('http');

http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // At this point, we have the headers, method, url and body, and can now
    // do whatever we need to in order to respond to this request.
  });
}).listen(8080); // Activates this server, listening on port 8080.
```

如果我们运行这个示例代码，我们只能 *接收* 到请求但得不到 *回应*。实际上，如果你在浏览器内运行这个示例，你的请求只会超时，因为服务器那边根本没有返回给客户端任何东西。

谈了那么久，我们都还没有说到 `response` 对象。它是一个 [`ServerResponse`][] 实例，而 ServerRespose 又是 [`WritableStream`][]。它包含了很多方法可以用以把数据返回给客户端。我们下面就将涉及到此议题。

## HTTP 状态码

如果你嫌麻烦不想设置它，返回客户端的默认状态码总是 200。当然，不是每个 HTTP 返回码必须都是 200，在某些情况下你一定希望返回一个不同的状态码，所以你应该设置 `statusCode` 属性。

```javascript
response.statusCode = 404; // Tell the client that the resource wasn't found.
```

我们同样也有其它捷径去做这件事，后面我们会很快看到。

## 设置响应头

响应头通过一个 [`setHeader`][] 的属性很方便的设置。

```javascript
response.setHeader('Content-Type', 'application/json');
response.setHeader('X-Powered-By', 'bacon');
```

设置响应头时，它们的名字是大小写敏感的。如果你重复设置响应头，最后一次设置的值也就是系统得到的值。

## 显示发送头数据

我们之前讨论的设置响应头以及状态码的方法建立在你使用“隐式设置”的方式，这意味着你在发送消息体之前依赖于 node 发送请求头。

如果你愿意，你可以为返回流重写响应头。为做到这点，你可以使用 [`writeHead`][] 方法向消息流重写状态码和响应头。

```javascript
response.writeHead(200, {
  'Content-Type': 'application/json',
  'X-Powered-By': 'bacon'
});
```

一旦设置了响应头（无论是隐式还是显式设置），你已经为发送返回数据做好了准备。

## 发送返回体

既然 `response` 对象是一个 [`WritableStream`][]，向客户端写入返回体只是一个普通的流方法的问题。

```javascript
response.write('<html>');
response.write('<body>');
response.write('<h1>Hello, World!</h1>');
response.write('</body>');
response.write('</html>');
response.end();
```

消息流上的 `end` 方法同时还可以带入一些可选数据作为流上最后需要发送的一些数据，所以我们可以简单地把以上的代码做如下形式的简化：

```javascript
response.end('<html><body><h1>Hello, World!</h1></body></html>');
```

> **注意：** 你只有在开始向返回体写数据 *之前* 设置状态和响应头，这点很重要。
> 因为响应头信息总是在消息体前到达。

## 另一件一笔带过关于错误的事

`response` 返回流同样也会触发 `'error'` 事件，某种程度上说你不得不自己去处理它。之前全部关于 `request` 消息流出错的处理方法在这里也同样适用。

## 把之前所学的全部整合到一起

现在既然我们已经学了如何处理 HTTP 返回信息，现在让我们把这些零碎东西组合到一起。基于先前的示例代码，我们将作出一个服务端，使它可以将从用户接受到的全部信息返回给用户。我们将通过 `JSON.stringify` 对消息数据进行格式化。

```javascript
const http = require('http');

http.createServer((request, response) => {
  const { headers, method, url } = request;
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // BEGINNING OF NEW STUFF

    response.on('error', (err) => {
      console.error(err);
    });

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    // Note: the 2 lines above could be replaced with this next one:
    // response.writeHead(200, {'Content-Type': 'application/json'})

    const responseBody = { headers, method, url, body };

    response.write(JSON.stringify(responseBody));
    response.end();
    // Note: the 2 lines above could be replaced with this next one:
    // response.end(JSON.stringify(responseBody))

    // END OF NEW STUFF
  });
}).listen(8080);
```

## 服务器响应的示例代码

让我们简化之前的代码，做一个可以有响应的简单的服务端。它同样也可以把接受到的任何信息返回给客户端。我们所要做的就是从请求流中把请求数据取出，然后原样写回到返回流中即可。就如我们之前做的那么简单。

```javascript
const http = require('http');

http.createServer((request, response) => {
  let body = [];
  request.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    response.end(body);
  });
}).listen(8080);
```

现在让我们调整一下，我们只对以下条件应答：

* 请求方法是 POST 方式。
* 访问路径是 `/echo`。

其它任何情况均返回 404。

```javascript
const http = require('http');

http.createServer((request, response) => {
  if (request.method === 'POST' && request.url === '/echo') {
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      response.end(body);
    });
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
```

> **注意：** 为了检查请求路径，我们设计了一个路由格式。
> 其它形式的路由 `switch`，简单的可以通过 `switch` 的形式检查，复杂的诸如 [`express`][] 框架，如果你正在寻找路由而不需要做其它事情，简单用 [`router`][]。

太棒了！现在我们进一步简化它。记住，`request` 是一个 [`ReadableStream`][]对象，`response`对象是一个 [`WritableStream`][]。那意味着我们可以使用 [`pipe`][]直接从一个流转到另外一个流。那的确是我们需要的：

```javascript
const http = require('http');

http.createServer((request, response) => {
  if (request.method === 'POST' && request.url === '/echo') {
    request.pipe(response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
```

就是这样！

我们还尚未完全完成，如之前多次谈到，错误随时可能发生，所以我们需要处理它们。

为了处理请求流上的错误，我们把错误记录到 `stderr` 对象中，然后回发一个 400 的代码表示 `错误请求`。在现实生活中，我们想检查分析错误，了解它们正确的状态码以及具体出错信息。具体可以参考 [`Error` 文档信息][]

对于返回，我们把错误日志记录到 `stderr` 中。

```javascript
const http = require('http');

http.createServer((request, response) => {
  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', (err) => {
    console.error(err);
  });
  if (request.method === 'POST' && request.url === '/echo') {
    request.pipe(response);
  } else {
    response.statusCode = 404;
    response.end();
  }
}).listen(8080);
```

我们现在已经涉及到了大部分基本的 HTTP 请求知识，此时此刻，你应该已经具备了：

* 实例化一个 HTTP 服务，它有一个处理请求的函数，并对某个特定端口进行监听。
* 从 `request` 中获取请求头，访问路径，方法以及消息体。
* 让路由决定依赖于访问路径，或者在 `request` 对象其它数据中。
* 通过 `response` 对象发送响应头，HTTP 状态码以及消息体。
* 通过 `request` 对象与 `response` 对象对接，传输数据。
* 在 `request` 和 `response` 流中处理错误。

从这些基础知识中，关于 Node.js 的 HTTP 服务一些实用案例已经逐步被构建起来，API 文档还提供了大量其它的说明，所以请详细阅读 [`EventEmitters`][]，[`Streams`][] 以及 [`HTTP`][]。

[`EventEmitters`]: https://nodejs.org/api/events.html
[`Streams`]: https://nodejs.org/api/stream.html
[`createServer`]: https://nodejs.org/api/http.html#http_http_createserver_requestlistener
[`Server`]: https://nodejs.org/api/http.html#http_class_http_server
[`listen`]: https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback
[API 参考文档]: https://nodejs.org/api/http.html
[`IncomingMessage`]: https://nodejs.org/api/http.html#http_class_http_incomingmessage
[`ReadableStream`]: https://nodejs.org/api/stream.html#stream_class_stream_readable
[`rawHeaders`]: https://nodejs.org/api/http.html#http_message_rawheaders
[`Buffer`]: https://nodejs.org/api/buffer.html
[`concat-stream`]: https://www.npmjs.com/package/concat-stream
[`body`]: https://www.npmjs.com/package/body
[`npm`]: https://www.npmjs.com
[`EventEmitter`]: https://nodejs.org/api/events.html#events_class_eventemitter
[处理错误]: https://nodejs.org/api/errors.html
[`domains`]: https://nodejs.org/api/domain.html
[`ServerResponse`]: https://nodejs.org/api/http.html#http_class_http_serverresponse
[`setHeader`]: https://nodejs.org/api/http.html#http_response_setheader_name_value
[`WritableStream`]: https://nodejs.org/api/stream.html#stream_class_stream_writable
[`writeHead`]: https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers
[`express`]: https://www.npmjs.com/package/express
[`router`]: https://www.npmjs.com/package/router
[`pipe`]: https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
[`Error` 文档信息]: https://nodejs.org/api/errors.html
[`HTTP`]: https://nodejs.org/api/http.html
