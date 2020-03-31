---
title: HTTP 트랜잭션 해부
layout: docs.hbs
---

# HTTP 트랜잭션 해부

The purpose of this guide is to impart a solid understanding of the process of Node.js HTTP handling. We'll assume that you know, in a general sense, how HTTP requests work, regardless of language or programming environment. We'll also assume a bit of familiarity with Node.js [`EventEmitters`][] and [`Streams`][]. If you're not quite familiar with them, it's worth taking a quick read through the API docs for each of those.

## 서버 생성

이 문서의 목적은 Node.js HTTP 처리 과정을 잘 이해하게 하는 것입니다. 언어나 프로그래밍 환경과 관계없이 상식선에서 HTTP 요청이 어떻게 동작하는지는 알고 있어야 합니다. Node.js의 [`EventEmitters`][]와 [`Streams`][]에도 어느 정도 익숙해야 합니다. 익숙하지 않다면 관련 API 문서를 미리 훑어보는 편이 좋습니다.

```javascript
const http = require('http');

const server = http.createServer((request, response) => {
  // 여기서 작업이 진행됩니다!
});
```

The function that's passed in to [`createServer`][] is called once for every HTTP request that's made against that server, so it's called the request handler. In fact, the [`Server`][] object returned by [`createServer`][] is an [`EventEmitter`][], and what we have here is just shorthand for creating a `server` object and then adding the listener later.

```javascript
const server = http.createServer();
server.on('request', (request, response) => {
  // 여기서 작업이 진행됩니다!
});
```

모든 node 웹 서버 애플리케이션은 웹 서버 객체를 만들어야 합니다. 이 때 [`createServer`][]를 이용합니다.

In order to actually serve requests, the [`listen`][] method needs to be called on the `server` object. In most cases, all you'll need to pass to `listen` is the port number you want the server to listen on. There are some other options too, so consult the [API reference](https://nodejs.org/api/http.html).

## 메서드, URL, 헤더

이 서버로 오는 HTTP 요청마다 [`createServer`][]에 전달된 함수가 한 번씩 호출됩니다. 사실 [`createServer`][]가 반환한 [`Server`][] 객체는 [`EventEmitter`][]이고 여기서는 `server` 객체를 생성하고 리스너를 추가하는 축약 문법을 사용한 것입니다.

```javascript
const { method, url } = request;
```

> **주의:** `request` 객체는 [`IncomingMessage`][]의 인스턴스입니다.

The `method` here will always be a normal HTTP method/verb. The `url` is the full URL without the server, protocol or port. For a typical URL, this means everything after and including the third forward slash.

HTTP 요청이 서버에 오면 node가 트랜잭션을 다루려고 `request`와 `response` 객체를 전달하며 요청 핸들러 함수를 호출합니다. 곧 이 객체를 사용해 볼 것입니다.

```javascript
const { headers } = request;
const userAgent = headers['user-agent'];
```

요청을 실제로 처리하려면 [`listen`][] 메서드가 `server` 객체에서 호출되어야 합니다. 대부분은 서버가 사용하고자 하는 포트 번호를 `listen`에 전달하기만 하면 됩니다. 몇 가지 다른 옵션도 있으므로 [API 문서](https://nodejs.org/api/http.html)를 참고하세요.

If some headers are repeated, then their values are overwritten or joined together as comma-separated strings, depending on the header. In some cases, this can be problematic, so [`rawHeaders`][] is also available.

## 요청 바디

요청을 처리할 때, 우선은 메서드와 URL을 확인한 후 이와 관련된 적절한 작업을 실행하려고 할 것입니다. Node가 `request` 객체에 유용한 프로퍼티를 넣어두었으므로 이 작업은 비교적 쉽게 할 수 있습니다.

The chunk emitted in each `'data'` event is a [`Buffer`][]. If you know it's going to be string data, the best thing to do is collect the data in an array, then at the `'end'`, concatenate and stringify it.

```javascript
let body = [];
request.on('data', (chunk) => {
  body.push(chunk);
}).on('end', () => {
  body = Buffer.concat(body).toString();
  // 여기서 `body`에 전체 요청 바디가 문자열로 담겨있습니다.
});
```

> **주의:** 이 코드가 약간 장황할 수도 있고 대부분은 실제로 그렇습니다. 다행히 [`npm`][]에 [`concat-stream`][]나 [`body`][] 같은 모듈로 이 로직을 감출 수 있습니다. 이어서 읽기 전에 어떤 작업이 이뤄지는지 잘 이해하는 것이 중요합니다. 그래서 이 글을 읽고 있는 것입니다.

## 오류에 대한 간단한 설명

여기서 `method`는 항상 일반적인 HTTP 메서드/동사가 될 것입니다. `url`은 전체 URL에서 서버, 프로토콜, 포트를 제외한 것으로, 세 번째 슬래시 이후의 나머지 전부라고 볼 수 있습니다.

헤더도 많이 다르지 않습니다. `request`에 `headers`라는 전용 객체가 있습니다.

```javascript
request.on('error', (err) => {
  // 여기서 `stderr`에 오류 메시지와 스택 트레이스를 출력합니다.
  console.error(err.stack);
});
```

There are other ways of [handling these errors](https://nodejs.org/api/errors.html) such as other abstractions and tools, but always be aware that errors can and do happen, and you're going to have to deal with them.

## 지금까지 살펴본 내용

클라이언트가 어떻게 헤더를 설정했는지에 관계없이 모든 헤더는 소문자로만 표현된다는 것을 기억해야 합니다. 이는 어떤 목적이든 헤더를 파싱하는 작업을 간편하게 해줍니다.

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
    // 여기서 헤더, 메서드, url, 바디를 가지게 되었고
    // 이 요청에 응답하는 데 필요한 어떤 일이라도 할 수 있게 되었습니다.
  });
}).listen(8080); // 이 서버를 활성화하고 8080 포트로 받습니다.
```

일부 헤더를 반복해서 설정한다면 이 값은 헤더에 따라 덮어씌워지거나 콤마로 구분된 문자열로 합쳐집니다. 이게 문제가 될 경우에는 [`rawHeaders`][]를 사용할 수도 있습니다.

So far we haven't touched on the `response` object at all, which is an instance of [`ServerResponse`][], which is a [`WritableStream`][]. It contains many useful methods for sending data back to the client. We'll cover that next.

## HTTP 상태 코드

`POST`나 `PUT` 요청을 받을 때 애플리케이션에 요청 바디는 중요할 것입니다. 요청 헤더에 접근하는 것보다 바디 데이터를 받는 것은 좀 더 어렵습니다. 핸들러에 전달된 `request` 객체는 [`ReadableStream`][] 인터페이스를 구현하고 있습니다. 이 스트림에 이벤트 리스너를 등록하거나 다른 스트림에 파이프로 연결할 수 있습니다. 스트림의 `'data'`와 `'end'` 이벤트에 이벤트 리스너를 등록해서 데이터를 받을 수 있습니다.

```javascript
response.statusCode = 404; // 클라이언트에게 리소스를 찾을 수 없다고 알려줍니다.
```

각 `'data'` 이벤트에서 발생시킨 청크는 [`Buffer`][]입니다. 이 청크가 문자열 데이터라는 것을 알고 있다면 이 데이터를 배열에 수집한 다음 `'end'` 이벤트에서 이어 붙인 다음 문자열로 만드는 것이 가장 좋습니다.

## 응답 헤더 설정

Headers are set through a convenient method called [`setHeader`][].

```javascript
response.setHeader('Content-Type', 'application/json');
response.setHeader('X-Powered-By', 'bacon');
```

When setting the headers on a response, the case is insensitive on their names. If you set a header repeatedly, the last value you set is the value that gets sent.

## 명시적인 헤더 데이터 전송

`request` 객체가 [`ReadableStream`][]이므로 [`EventEmitter`][]이기도 하고 오류가 발생했을 때 [`EventEmitter`][]처럼 동작합니다.

`request` 스트림의 오류가 발생하면 스트림에서 `'error'` 이벤트가 발생하면서 오류를 전달합니다. **이벤트에 리스너가 등록되어 있지 않다면 Node.js 프로그램을 종료시킬 수도 있는 오류를 *던질* 것입니다.** 그러므로 단순히 오류를 로깅만 하더라도 요청 스트림에 `'error'` 리스너를 추가해야 합니다.(하지만 HTTP 오류 응답을 보내는 것이 좋을 겁니다. 이에 대해는 뒤에서 더 자세히 살펴봅니다.)

```javascript
response.writeHead(200, {
  'Content-Type': 'application/json',
  'X-Powered-By': 'bacon'
});
```

Once you've set the headers (either implicitly or explicitly), you're ready to start sending response data.

## 응답 바디 전송

별도의 추상화나 도구를 이용해서 [오류를 처리하는](https://nodejs.org/api/errors.html) 다른 방법도 존재하지만, 항상 오류는 발생할 수 있다는 것을 명심하고 오류를 처리해야 합니다.

```javascript
response.write('<html>');
response.write('<body>');
response.write('<h1>Hello, World!</h1>');
response.write('</body>');
response.write('</html>');
response.end();
```

The `end` function on streams can also take in some optional data to send as the last bit of data on the stream, so we can simplify the example above as follows.

```javascript
response.end('<html><body><h1>Hello, World!</h1></body></html>');
```

> **주의:** 바디에 데이터 청크를 *작성하기 전에* 상태 코드와 헤더를 설정해야 합니다. HTTP 응답에서 바디 전에 헤더가 있으므로 이는 이치에 맞습니다.

## 오류에 대한 추가 설명

지금까지 서버를 생성하고 요청의 메서드, UL, 헤더, 바디를 가져왔습니다. 이를 모두 사용하면 다음과 같이 될 것입니다.

## 지금까지 배운 내용을 사용한 예제

Now that we've learned about making HTTP responses, let's put it all together. Building on the earlier example, we're going to make a server that sends back all of the data that was sent to us by the user. We'll format that data as JSON using `JSON.stringify`.

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
    // 여기서부터 새로운 부분입니다.

    response.on('error', (err) => {
      console.error(err);
    });

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    // 주의: 위 두 줄은 다음 한 줄로 대체할 수도 있습니다.
    // response.writeHead(200, {'Content-Type': 'application/json'})

    const responseBody = { headers, method, url, body };

    response.write(JSON.stringify(responseBody));
    response.end();
    // 주의: 위 두 줄은 다음 한 줄로 대체할 수도 있습니다.
    // response.end(JSON.stringify(responseBody))

    // 새로운 부분이 끝났습니다.
  });
}).listen(8080);
```

## 에코 서버 예제

이 예제를 실행하면 요청을 *받을 수* 있지만, 요청에 *응답*하지는 않습니다. 사실 웹 브라우저에서 이 예제에 접근하면 클라이언트에 돌려보내는 것이 없으므로 요청이 타임아웃에 걸릴 것입니다.

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

지금까지 `response` 객체는 전혀 건드리지 않았습니다. 이 객체는 [`ServerResponse`][]의 인스턴스이면서 [`WritableStream`][]입니다. 여기에는 클라이언트에 데이터를 응답하기 위한 여러 가지 유용한 메서드가 있습니다. 이제 이를 살펴볼 것입니다.

* 요청 메서드가 POST인 경우
* URL이 `/echo`인 경우

In any other case, we want to simply respond with a 404.

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

> **주의:** 이 방법으로 URL을 검사함으로써 "라우팅"을 하고 있습니다. `switch` 문으로 간단히 라우팅할 수도 있고 [`express`][]같은 프레임워크로 복잡한 라우팅을 할 수도 있습니다. 라우팅 처리를 하는 무언가를 찾고 있다면 [`router`][]를 사용해 보길 바랍니다.

따로 설정하지 않으면 응답의 HTTP 상태 코드는 항상 200입니다. 물론 모든 HTTP 응답이 이를 보장하는 것은 아니고 어떤 경우에는 다른 상태 코드를 보내기를 원할 것입니다. 상태 코드를 변경하려면 `statusCode` 프로퍼티를 설정해야 합니다.

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

이에 대한 단축 설정도 있는데 곧 살펴볼 것입니다.

We're not quite done yet though. As mentioned multiple times in this guide, errors can and do happen, and we need to deal with them.

편리한 [`setHeader`][] 메서드로 헤더를 설정합니다.

응답에 헤더를 설정할 때 헤더 이름의 대소문자는 중요하지 않습니다. 헤더를 여러 번 설정한다면 마지막에 설정한 값을 보낼 것입니다.

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

We've now covered most of the basics of handling HTTP requests. At this point, you should be able to:

* Instantiate an HTTP server with a request handler function, and have it listen on a port.
* Get headers, URL, method and body data from `request` objects.
* URL이나 `request` 객체의 데이터에 기반을 둬서 라우팅을 할 수 있습니다.
* `response` 객체로 헤더, HTTP 상태 코드, 바디 데이터를 보낼 수 있습니다.
* `request` 객체에서 `response` 객체로 데이터를 파이프로 연결할 수 있습니다.
* `request`와 `response` 스트림 모두에서 스트림 오류를 처리할 수 있습니다.

지금까지 설명한 헤더와 상태 코드를 설정하는 메서드는 "암묵적인 헤더"를 사용하고 있다고 가정합니다. 이는 바디 데이터를 보내기 전 적절한 순간에 헤더를 보내는 일을 노드에 의존하고 있다는 의미입니다.
