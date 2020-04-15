---
title: HTTP 트랜잭션 해부
layout: docs.hbs
---

<!--
# Anatomy of an HTTP Transaction

The purpose of this guide is to impart a solid understanding of the process of
Node.js HTTP handling. We'll assume that you know, in a general sense, how HTTP
requests work, regardless of language or programming environment. We'll also
assume a bit of familiarity with Node.js [`EventEmitters`][] and [`Streams`][].
If you're not quite familiar with them, it's worth taking a quick read through
the API docs for each of those.
-->

# HTTP 트랜잭션 해부

이 문서의 목적은 Node.js HTTP 처리 과정을 잘 이해하게 하는 것입니다. 언어나 프로그래밍 환경과
관계없이 상식선에서 HTTP 요청이 어떻게 동작하는지는 알고 있어야 합니다. Node.js의
[`EventEmitters`][]와 [`Streams`][]에도 어느 정도 익숙해야 합니다. 익숙하지 않다면
관련 API 문서를 미리 훑어보는 편이 좋습니다.

<!--
## Create the Server

Any node web server application will at some point have to create a web server
object. This is done by using [`createServer`][].

```javascript
const http = require('http');

const server = http.createServer((request, response) => {
  // magic happens here!
});
```
-->

## 서버 생성

모든 node 웹 서버 애플리케이션은 웹 서버 객체를 만들어야 합니다.
이 때 [`createServer`][]를 이용합니다.

```javascript
const http = require('http');

const server = http.createServer((request, response) => {
  // 여기서 작업이 진행됩니다!
});
```

<!--
The function that's passed in to [`createServer`][] is called once for every
HTTP request that's made against that server, so it's called the request
handler. In fact, the [`Server`][] object returned by [`createServer`][] is an
[`EventEmitter`][], and what we have here is just shorthand for creating a
`server` object and then adding the listener later.

```javascript
const server = http.createServer();
server.on('request', (request, response) => {
  // the same kind of magic happens here!
});
```
-->

이 서버로 오는 HTTP 요청마다 [`createServer`][]에 전달된 함수가 한 번씩 호출됩니다.
사실 [`createServer`][]가 반환한 [`Server`][] 객체는 [`EventEmitter`][]이고 여기서는
`server` 객체를 생성하고 리스너를 추가하는 축약 문법을 사용한 것입니다.

```javascript
const server = http.createServer();
server.on('request', (request, response) => {
  // 여기서 작업이 진행됩니다!
});
```

<!--
When an HTTP request hits the server, node calls the request handler function
with a few handy objects for dealing with the transaction, `request` and
`response`. We'll get to those shortly.

In order to actually serve requests, the [`listen`][] method needs to be called
on the `server` object. In most cases, all you'll need to pass to `listen` is
the port number you want the server to listen on. There are some other options
too, so consult the [API reference][].
-->

HTTP 요청이 서버에 오면 node가 트랜잭션을 다루려고 `request`와 `response` 객체를 전달하며
요청 핸들러 함수를 호출합니다. 곧 이 객체를 사용해 볼 것입니다.

요청을 실제로 처리하려면 [`listen`][] 메서드가 `server` 객체에서 호출되어야 합니다.
대부분은 서버가 사용하고자 하는 포트 번호를 `listen`에 전달하기만 하면 됩니다.
몇 가지 다른 옵션도 있으므로 [API 문서][]를 참고하세요.

<!--
## Method, URL and Headers

When handling a request, the first thing you'll probably want to do is look at
the method and URL, so that appropriate actions can be taken. Node makes this
relatively painless by putting handy properties onto the `request` object.

```javascript
const { method, url } = request;
```
> **Note:** The `request` object is an instance of [`IncomingMessage`][].
-->

## 메서드, URL, 헤더

요청을 처리할 때, 우선은 메서드와 URL을 확인한 후 이와 관련된 적절한 작업을 실행하려고 할 것입니다.
Node가 `request` 객체에 유용한 프로퍼티를 넣어두었으므로 이 작업은 비교적 쉽게 할 수 있습니다.

```javascript
const { method, url } = request;
```

> **주의:** `request` 객체는 [`IncomingMessage`][]의 인스턴스입니다.

<!--
The `method` here will always be a normal HTTP method/verb. The `url` is the
full URL without the server, protocol or port. For a typical URL, this means
everything after and including the third forward slash.

Headers are also not far away. They're in their own object on `request` called
`headers`.

```javascript
const { headers } = request;
const userAgent = headers['user-agent'];
```
-->

여기서 `method`는 항상 일반적인 HTTP 메서드/동사가 될 것입니다. `url`은 전체 URL에서 서버,
프로토콜, 포트를 제외한 것으로, 세 번째 슬래시 이후의 나머지 전부라고 볼 수 있습니다.

헤더도 많이 다르지 않습니다. `request`에 `headers`라는 전용 객체가 있습니다.

```javascript
const { headers } = request;
const userAgent = headers['user-agent'];
```

<!--
It's important to note here that all headers are represented in lower-case only,
regardless of how the client actually sent them. This simplifies the task of
parsing headers for whatever purpose.

If some headers are repeated, then their values are overwritten or joined
together as comma-separated strings, depending on the header. In some cases,
this can be problematic, so [`rawHeaders`][] is also available.
-->

클라이언트가 어떻게 헤더를 설정했는지에 관계없이 모든 헤더는 소문자로만 표현된다는 것을 기억해야 합니다.
이는 어떤 목적이든 헤더를 파싱하는 작업을 간편하게 해줍니다.

일부 헤더를 반복해서 설정한다면 이 값은 헤더에 따라 덮어씌워지거나 콤마로 구분된 문자열로 합쳐집니다.
이게 문제가 될 경우에는 [`rawHeaders`][]를 사용할 수도 있습니다.

<!--
## Request Body

When receiving a `POST` or `PUT` request, the request body might be important to
your application. Getting at the body data is a little more involved than
accessing request headers. The `request` object that's passed in to a handler
implements the [`ReadableStream`][] interface. This stream can be listened to or
piped elsewhere just like any other stream. We can grab the data right out of
the stream by listening to the stream's `'data'` and `'end'` events.

The chunk emitted in each `'data'` event is a [`Buffer`][]. If you know it's
going to be string data, the best thing to do is collect the data in an array,
then at the `'end'`, concatenate and stringify it.
-->

## 요청 바디

`POST`나 `PUT` 요청을 받을 때 애플리케이션에 요청 바디는 중요할 것입니다. 요청 헤더에 접근하는
것보다 바디 데이터를 받는 것은 좀 더 어렵습니다. 핸들러에 전달된 `request` 객체는
[`ReadableStream`][] 인터페이스를 구현하고 있습니다. 이 스트림에 이벤트 리스너를 등록하거나
다른 스트림에 파이프로 연결할 수 있습니다. 스트림의 `'data'`와 `'end'` 이벤트에 이벤트 리스너를
등록해서 데이터를 받을 수 있습니다.

각 `'data'` 이벤트에서 발생시킨 청크는 [`Buffer`][]입니다. 이 청크가 문자열 데이터라는 것을
알고 있다면 이 데이터를 배열에 수집한 다음 `'end'` 이벤트에서 이어 붙인 다음 문자열로
만드는 것이 가장 좋습니다.

<!--
```javascript
let body = [];
request.on('data', (chunk) => {
  body.push(chunk);
}).on('end', () => {
  body = Buffer.concat(body).toString();
  // at this point, `body` has the entire request body stored in it as a string
});
```

> **Note:** This may seem a tad tedious, and in many cases, it is. Luckily,
there are modules like [`concat-stream`][] and [`body`][] on [`npm`][] which can
help hide away some of this logic. It's important to have a good understanding
of what's going on before going down that road, and that's why you're here!
-->

```javascript
let body = [];
request.on('data', (chunk) => {
  body.push(chunk);
}).on('end', () => {
  body = Buffer.concat(body).toString();
  // 여기서 `body`에 전체 요청 바디가 문자열로 담겨있습니다.
});
```

> **주의:** 이 코드가 약간 장황할 수도 있고 대부분은 실제로 그렇습니다. 다행히 [`npm`][]에
> [`concat-stream`][]나 [`body`][] 같은 모듈로 이 로직을 감출 수 있습니다. 이어서 읽기 전에
> 어떤 작업이 이뤄지는지 잘 이해하는 것이 중요합니다. 그래서 이 글을 읽고 있는 것입니다.

<!--
## A Quick Thing About Errors

Since the `request` object is a [`ReadableStream`][], it's also an
[`EventEmitter`][] and behaves like one when an error happens.

An error in the `request` stream presents itself by emitting an `'error'` event
on the stream. **If you don't have a listener for that event, the error will be
*thrown*, which could crash your Node.js program.** You should therefore add an
`'error'` listener on your request streams, even if you just log it and
continue on your way. (Though it's probably best to send some kind of HTTP error
response. More on that later.)
-->

## 오류에 대한 간단한 설명

`request` 객체가 [`ReadableStream`][]이므로 [`EventEmitter`][]이기도 하고
오류가 발생했을 때 [`EventEmitter`][]처럼 동작합니다.

`request` 스트림의 오류가 발생하면 스트림에서 `'error'` 이벤트가 발생하면서 오류를 전달합니다.
**이벤트에 리스너가 등록되어 있지 않다면 Node.js 프로그램을 종료시킬 수도 있는 오류를 *던질* 것입니다.**
그러므로 단순히 오류를 로깅만 하더라도 요청 스트림에 `'error'` 리스너를 추가해야 합니다.(하지만
HTTP 오류 응답을 보내는 것이 좋을 겁니다. 이에 대해는 뒤에서 더 자세히 살펴봅니다.)

<!--
```javascript
request.on('error', (err) => {
  // This prints the error message and stack trace to `stderr`.
  console.error(err.stack);
});
```

There are other ways of [handling these errors][] such as
other abstractions and tools, but always be aware that errors can and do happen,
and you're going to have to deal with them.
-->

```javascript
request.on('error', (err) => {
  // 여기서 `stderr`에 오류 메시지와 스택 트레이스를 출력합니다.
  console.error(err.stack);
});
```

별도의 추상화나 도구를 이용해서 [오류를 처리하는][] 다른 방법도 존재하지만, 항상 오류는 발생할 수
있다는 것을 명심하고 오류를 처리해야 합니다.

<!--
## What We've Got so Far

At this point, we've covered creating a server, and grabbing the method, URL,
headers and body out of requests. When we put that all together, it might look
something like this:

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
-->

## 지금까지 살펴본 내용

지금까지 서버를 생성하고 요청의 메서드, UL, 헤더, 바디를 가져왔습니다.
이를 모두 사용하면 다음과 같이 될 것입니다.

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

<!--
If we run this example, we'll be able to *receive* requests, but not *respond*
to them. In fact, if you hit this example in a web browser, your request would
time out, as nothing is being sent back to the client.

So far we haven't touched on the `response` object at all, which is an instance
of [`ServerResponse`][], which is a [`WritableStream`][]. It contains many
useful methods for sending data back to the client. We'll cover that next.
-->

이 예제를 실행하면 요청을 *받을 수* 있지만, 요청에 *응답*하지는 않습니다. 사실 웹 브라우저에서
이 예제에 접근하면 클라이언트에 돌려보내는 것이 없으므로 요청이 타임아웃에 걸릴 것입니다.

지금까지 `response` 객체는 전혀 건드리지 않았습니다. 이 객체는 [`ServerResponse`][]의
인스턴스이면서 [`WritableStream`][]입니다. 여기에는 클라이언트에 데이터를 응답하기 위한
여러 가지 유용한 메서드가 있습니다. 이제 이를 살펴볼 것입니다.

<!--
## HTTP Status Code

If you don't bother setting it, the HTTP status code on a response will always
be 200. Of course, not every HTTP response warrants this, and at some point
you'll definitely want to send a different status code. To do that, you can set
the `statusCode` property.

```javascript
response.statusCode = 404; // Tell the client that the resource wasn't found.
```

There are some other shortcuts to this, as we'll see soon.
-->

## HTTP 상태 코드

따로 설정하지 않으면 응답의 HTTP 상태 코드는 항상 200입니다. 물론 모든 HTTP 응답이 이를 보장하는
것은 아니고 어떤 경우에는 다른 상태 코드를 보내기를 원할 것입니다.
상태 코드를 변경하려면 `statusCode` 프로퍼티를 설정해야 합니다.

```javascript
response.statusCode = 404; // 클라이언트에게 리소스를 찾을 수 없다고 알려줍니다.
```

이에 대한 단축 설정도 있는데 곧 살펴볼 것입니다.

<!--
## Setting Response Headers

Headers are set through a convenient method called [`setHeader`][].

```javascript
response.setHeader('Content-Type', 'application/json');
response.setHeader('X-Powered-By', 'bacon');
```

When setting the headers on a response, the case is insensitive on their names.
If you set a header repeatedly, the last value you set is the value that gets
sent.
-->

## 응답 헤더 설정

편리한 [`setHeader`][] 메서드로 헤더를 설정합니다.

```javascript
response.setHeader('Content-Type', 'application/json');
response.setHeader('X-Powered-By', 'bacon');
```

응답에 헤더를 설정할 때 헤더 이름의 대소문자는 중요하지 않습니다. 헤더를 여러 번 설정한다면 마지막에 설정한 값을 보낼 것입니다.

<!--
## Explicitly Sending Header Data

The methods of setting the headers and status code that we've already discussed
assume that you're using "implicit headers". This means you're counting on node
to send the headers for you at the correct time before you start sending body
data.

If you want, you can *explicitly* write the headers to the response stream.
To do this, there's a method called [`writeHead`][], which writes the status
code and the headers to the stream.

```javascript
response.writeHead(200, {
  'Content-Type': 'application/json',
  'X-Powered-By': 'bacon'
});
```

Once you've set the headers (either implicitly or explicitly), you're ready to
start sending response data.
-->

## 명시적인 헤더 데이터 전송

지금까지 설명한 헤더와 상태 코드를 설정하는 메서드는 "암묵적인 헤더"를 사용하고 있다고 가정합니다. 이는
바디 데이터를 보내기 전 적절한 순간에 헤더를 보내는 일을 노드에 의존하고 있다는 의미입니다.

원한다면 *명시적으로* 응답 스트림에 헤더를 작성할 수 있습니다. 헤더를 작성하는 [`writeHead`][]
메서드가 있습니다. 이 메서드는 스트림에 상태 코드와 헤더를 작성합니다.

```javascript
response.writeHead(200, {
  'Content-Type': 'application/json',
  'X-Powered-By': 'bacon'
});
```

(암묵적이든 명시적이든) 일단 헤더를 설정하고 나면 응답 데이터를 전송할 준비가 된 것입니다.

<!--
## Sending Response Body

Since the `response` object is a [`WritableStream`][], writing a response body
out to the client is just a matter of using the usual stream methods.

```javascript
response.write('<html>');
response.write('<body>');
response.write('<h1>Hello, World!</h1>');
response.write('</body>');
response.write('</html>');
response.end();
```

The `end` function on streams can also take in some optional data to send as the
last bit of data on the stream, so we can simplify the example above as follows.

```javascript
response.end('<html><body><h1>Hello, World!</h1></body></html>');
```

> **Note:** It's important to set the status and headers *before* you start
writing chunks of data to the body. This makes sense, since headers come before
the body in HTTP responses.
-->

## 응답 바디 전송

`response` 객체는 [`WritableStream`][]이므로 클라이언트로 보내는 응답 바디는 일반적인
스트림 메서드를 사용해서 작성합니다.

```javascript
response.write('<html>');
response.write('<body>');
response.write('<h1>Hello, World!</h1>');
response.write('</body>');
response.write('</html>');
response.end();
```

스트림의 `end` 함수에 스트림에 보낼 데이터의 마지막 비트를 선택적으로 전달할 수 있으므로
위의 예제는 다음과 같이 간단하게 작성할 수 있습니다.

```javascript
response.end('<html><body><h1>Hello, World!</h1></body></html>');
```

> **주의:** 바디에 데이터 청크를 *작성하기 전에* 상태 코드와 헤더를 설정해야 합니다.
> HTTP 응답에서 바디 전에 헤더가 있으므로 이는 이치에 맞습니다.

<!--
## Another Quick Thing About Errors

The `response` stream can also emit `'error'` events, and at some point you're
going to have to deal with that as well. All of the advice for `request` stream
errors still applies here.
-->

## 오류에 대한 추가 설명

`response` 스트림도 `'error'` 이벤트를 발생시킬 수 있고 때로는 이 오류도 처리해야 합니다.
`request` 스트림 오류에 대한 모든 설명이 여기서도 똑같이 적용됩니다.

<!--
## Put It All Together

Now that we've learned about making HTTP responses, let's put it all together.
Building on the earlier example, we're going to make a server that sends back
all of the data that was sent to us by the user. We'll format that data as JSON
using `JSON.stringify`.

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
-->

## 지금까지 배운 내용을 사용한 예제

HTTP 응답 만드는 방법을 배웠으니 이제 모든 것을 함께 사용해 보겠습니다. 이전에 본 예제에서 사용자가
서버에 보낸 모든 데이터를 다시 보내는 서버를 만들 것입니다. `JSON.stringify`를 사용해서 데이터를
JSON으로 포매팅할 것입니다.

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

<!--
## Echo Server Example

Let's simplify the previous example to make a simple echo server, which just
sends whatever data is received in the request right back in the response. All
we need to do is grab the data from the request stream and write that data to
the response stream, similar to what we did previously.

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
-->

## 에코 서버 예제

위의 예제를 간략하게 바꾸어 간단한 에코 서버를 만들어보겠습니다. 에코 서버는 요청받은 데이터를
그대로 응답으로 돌려보내는 서버입니다. 앞에서 했던 것처럼 요청 스트림에서 데이터를 가져와
응답 스트림에 쓰기만 하면 됩니다.

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

<!--
Now let's tweak this. We want to only send an echo under the following
conditions:

* The request method is POST.
* The URL is `/echo`.

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
-->

이제 약간 변경해보겠습니다. 다음의 조건에서만 에코 응답을 보내려고 합니다.

* 요청 메서드가 POST인 경우
* URL이 `/echo`인 경우

위 조건이 아닌 경우에는 404를 응답합니다.

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

<!--
> **Note:** By checking the URL in this way, we're doing a form of "routing".
Other forms of routing can be as simple as `switch` statements or as complex as
whole frameworks like [`express`][]. If you're looking for something that does
routing and nothing else, try [`router`][].

Great! Now let's take a stab at simplifying this. Remember, the `request` object
is a [`ReadableStream`][] and the `response` object is a [`WritableStream`][].
That means we can use [`pipe`][] to direct data from one to the other. That's
exactly what we want for an echo server!

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
-->

> **주의:** 이 방법으로 URL을 검사함으로써 "라우팅"을 하고 있습니다. `switch` 문으로 간단히
> 라우팅할 수도 있고 [`express`][]같은 프레임워크로 복잡한 라우팅을 할 수도 있습니다.
> 라우팅 처리를 하는 무언가를 찾고 있다면 [`router`][]를 사용해 보길 바랍니다.

좋습니다! 이제 이를 간략화 해보겠습니다. `request` 객체는 [`ReadableStream`][]이고
`response` 객체는 [`WritableStream`][]임을 명심하세요. 이 말은 데이터를 한 스트림에서
다른 스트림으로 직접 연결하는 [`pipe`][]를 사용할 수 있음을 의미합니다.
에코 서버에서 하려는 것이 바로 이것입니다.

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

<!--
Yay streams!

We're not quite done yet though. As mentioned multiple times in this guide,
errors can and do happen, and we need to deal with them.

To handle errors on the request stream, we'll log the error to `stderr` and send
a 400 status code to indicate a `Bad Request`. In a real-world application,
though, we'd want to inspect the error to figure out what the correct status code
and message would be. As usual with errors, you should consult the
[`Error` documentation][].

On the response, we'll just log the error to `stdout`.

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
-->

이게 스트림입니다!

아직은 끝난 것이 아닙니다. 이 문서에서 여러 번 얘기했듯이 오류는 언제든 발생할 수 있고
우리는 이를 처리해야 합니다.

요청 스트림에서 오류를 처리하기 위해 오류를 `stderr`에 로깅하고 `Bad Request`를 의미하는
400 상태 코드를 보낼 것입니다. 실제 애플리케이션에서는 적절한 상태 코드와 메시지가 무엇인지 찾아내기
위해 오류를 검사하고자 할 것입니다. 언제나처럼 오류에 대해서는 [`Error` 문서][]를 살펴봐야 합니다.

응답에서는 `stdout`에 오류를 로깅 할 것입니다.

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

<!--
We've now covered most of the basics of handling HTTP requests. At this point,
you should be able to:

* Instantiate an HTTP server with a request handler function, and have it listen
on a port.
* Get headers, URL, method and body data from `request` objects.
* Make routing decisions based on URL and/or other data in `request` objects.
* Send headers, HTTP status codes and body data via `response` objects.
* Pipe data from `request` objects and to `response` objects.
* Handle stream errors in both the `request` and `response` streams.

From these basics, Node.js HTTP servers for many typical use cases can be
constructed. There are plenty of other things these APIs provide, so be sure to
read through the API docs for [`EventEmitters`][], [`Streams`][], and [`HTTP`][].
-->

지금까지 HTTP 요청을 다루는 기본 내용을 거의 다 다루었습니다. 이제 다음을 할 수 있어야 합니다.

* 요청 핸들러 함수로 HTTP 서버의 인스턴스를 생성하고 특정 포트로 서버를 열 수 있습니다.
* `request` 객체에서 헤더, URL, 메서드, 바디 데이터를 가져올 수 있습니다.
* URL이나 `request` 객체의 데이터에 기반을 둬서 라우팅을 할 수 있습니다.
* `response` 객체로 헤더, HTTP 상태 코드, 바디 데이터를 보낼 수 있습니다.
* `request` 객체에서 `response` 객체로 데이터를 파이프로 연결할 수 있습니다.
* `request`와 `response` 스트림 모두에서 스트림 오류를 처리할 수 있습니다.

이 기본 내용을 바탕으로 많은 사용 사례를 위한 Node.js HTTP 서버를 구축할 수 있습니다.
API가 제공하는 그 외 많은 기능이 있으므로 [`EventEmitters`][], [`Streams`][],
[`HTTP`][]의 API 문서를 꼭 읽어보세요.

<!--
[`EventEmitters`]: https://nodejs.org/api/events.html
[`Streams`]: https://nodejs.org/api/stream.html
[`createServer`]: https://nodejs.org/api/http.html#http_http_createserver_requestlistener
[`Server`]: https://nodejs.org/api/http.html#http_class_http_server
[`listen`]: https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback
[API reference]: https://nodejs.org/api/http.html
[`IncomingMessage`]: https://nodejs.org/api/http.html#http_class_http_incomingmessage
[`ReadableStream`]: https://nodejs.org/api/stream.html#stream_class_stream_readable
[`rawHeaders`]: https://nodejs.org/api/http.html#http_message_rawheaders
[`Buffer`]: https://nodejs.org/api/buffer.html
[`concat-stream`]: https://www.npmjs.com/package/concat-stream
[`body`]: https://www.npmjs.com/package/body
[`npm`]: https://www.npmjs.com
[`EventEmitter`]: https://nodejs.org/api/events.html#events_class_eventemitter
[handling these errors]: https://nodejs.org/api/errors.html
[`domains`]: https://nodejs.org/api/domain.html
[`ServerResponse`]: https://nodejs.org/api/http.html#http_class_http_serverresponse
[`setHeader`]: https://nodejs.org/api/http.html#http_response_setheader_name_value
[`WritableStream`]: https://nodejs.org/api/stream.html#stream_class_stream_writable
[`writeHead`]: https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers
[`express`]: https://www.npmjs.com/package/express
[`router`]: https://www.npmjs.com/package/router
[`pipe`]: https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
[`Error` documentation]: https://nodejs.org/api/errors.html
[`HTTP`]: https://nodejs.org/api/http.html
-->

[`EventEmitters`]: https://nodejs.org/api/events.html
[`Streams`]: https://nodejs.org/api/stream.html
[`createServer`]: https://nodejs.org/api/http.html#http_http_createserver_requestlistener
[`Server`]: https://nodejs.org/api/http.html#http_class_http_server
[`listen`]: https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback
[API 문서]: https://nodejs.org/api/http.html
[`IncomingMessage`]: https://nodejs.org/api/http.html#http_class_http_incomingmessage
[`ReadableStream`]: https://nodejs.org/api/stream.html#stream_class_stream_readable
[`rawHeaders`]: https://nodejs.org/api/http.html#http_message_rawheaders
[`Buffer`]: https://nodejs.org/api/buffer.html
[`concat-stream`]: https://www.npmjs.com/package/concat-stream
[`body`]: https://www.npmjs.com/package/body
[`npm`]: https://www.npmjs.com
[`EventEmitter`]: https://nodejs.org/api/events.html#events_class_eventemitter
[오류를 처리하는]: https://nodejs.org/api/errors.html
[`domains`]: https://nodejs.org/api/domain.html
[`ServerResponse`]: https://nodejs.org/api/http.html#http_class_http_serverresponse
[`setHeader`]: https://nodejs.org/api/http.html#http_response_setheader_name_value
[`WritableStream`]: https://nodejs.org/api/stream.html#stream_class_stream_writable
[`writeHead`]: https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers
[`express`]: https://www.npmjs.com/package/express
[`router`]: https://www.npmjs.com/package/router
[`pipe`]: https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
[`Error` 문서]: https://nodejs.org/api/errors.html
[`HTTP`]: https://nodejs.org/api/http.html
