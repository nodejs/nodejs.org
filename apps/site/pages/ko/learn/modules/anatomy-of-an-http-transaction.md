---
title: HTTP 트랜잭션의 구조
layout: learn
---

# HTTP 트랜잭션의 구조

이 가이드는 Node.js HTTP 처리 과정에 대한 확고한 이해를 제공하는 것을 목적으로 합니다. 언어나 프로그래밍 환경에 관계없이 HTTP 요청이 어떻게 작동하는지 일반적으로 알고 있다고 가정하겠습니다. 또한 Node.js의 [`EventEmitters`][]와 [`Streams`][]에 대해 약간의 친숙함이 있다고 가정합니다. 이들에 대해 잘 모른다면, 각 API 문서를 간단히 읽어보는 것이 좋습니다.

## 서버 생성

모든 Node 웹 서버 애플리케이션은 언젠가 웹 서버 객체를 생성해야 합니다. 이는 [`createServer`][]를 사용하여 수행됩니다.

```cjs
const http = require('node:http');

const server = http.createServer((request, response) => {
  // 여기서 마법이 일어납니다!
});
```

```mjs
import http from 'node:http';

const server = http.createServer((request, response) => {
  // 여기서 마법이 일어납니다!
});
```

[`createServer`][]에 전달된 함수는 해당 서버에 대해 이루어지는 모든 HTTP 요청에 대해 한 번 호출되므로, 이를 요청 핸들러(request handler)라고 부릅니다. 실제로, [`createServer`][]에서 반환된 [`Server`][] 객체는 [`EventEmitter`][]이며, 여기서 우리는 `server` 객체를 생성한 다음 리스너를 나중에 추가하는 축약형입니다.

```js
const server = http.createServer();
server.on('request', (request, response) => {
  // 여기서도 같은 종류의 마법이 일어납니다!
});
```

HTTP 요청이 서버에 도달하면, Node는 트랜잭션 처리를 위한 몇 가지 유용한 객체인 `request`와 `response`를 사용하여 요청 핸들러 함수를 호출합니다. 곧 이들에 대해 알아보겠습니다.

실제로 요청을 처리하기 위해서는 `server` 객체에서 [`listen`][] 메서드를 호출해야 합니다. 대부분의 경우, `listen`에 전달해야 할 것은 서버가 수신할 포트 번호입니다. 다른 옵션도 있으므로 [API 참조][]를 참조하십시오.

## 메서드, URL 및 헤더

요청을 처리할 때, 가장 먼저 하고 싶은 것은 메서드와 URL을 확인하여 적절한 조치를 취하는 것입니다. Node.js는 유용한 속성을 `request` 객체에 제공하여 이 과정을 비교적 수월하게 만듭니다.

```js
const { method, url } = request;
```

> `request` 객체는 [`IncomingMessage`][]의 인스턴스입니다.

여기서 `method`는 항상 일반 HTTP 메서드/동사입니다. `url`은 서버, 프로토콜 또는 포트 없이 전체 URL입니다. 일반적인 URL의 경우, 이는 세 번째 슬래시 이후의 모든 것을 의미합니다.

헤더는 그리 멀지 않은 곳에 있습니다. `request`의 자체 객체인 `headers`에 위치합니다.

```js
const { headers } = request;
const userAgent = headers['user-agent'];
```

여기서 중요한 점은 모든 헤더가 클라이언트가 실제로 보낸 방식과 관계없이 소문자로만 표현된다는 것입니다. 이는 헤더를 파싱하는 작업을 간소화합니다.

어떤 헤더가 반복되는 경우, 해당 값은 덮어쓰거나 헤더에 따라 쉼표로 구분된 문자열로 결합됩니다. 경우에 따라 이는 문제가 될 수 있으므로, [`rawHeaders`][]도 사용할 수 있습니다.

## 요청 본문

`POST` 또는 `PUT` 요청을 받을 때, 요청 본문이 애플리케이션에 중요할 수 있습니다. 본문 데이터에 접근하는 것은 요청 헤더에 접근하는 것보다 조금 더 복잡합니다. 핸들러에 전달되는 `request` 객체는 [`ReadableStream`][] 인터페이스를 구현합니다. 이 스트림은 다른 스트림과 마찬가지로 청취하거나 다른 곳으로 파이프할 수 있습니다. 스트림의 `'data'` 및 `'end'` 이벤트를 청취하여 데이터에 접근할 수 있습니다.

각 `'data'` 이벤트에서 발생하는 청크는 [`Buffer`][]. 문자열 데이터가 될 것이라는 것을 알 경우, 데이터를 배열에 수집한 다음, `'end'`에서 결합하고 문자열화하는 것이 최선입니다.

```js
let body = [];
request
  .on('data', chunk => {
    body.push(chunk);
  })
  .on('end', () => {
    body = Buffer.concat(body).toString();
    // 이 시점에서 `body`는 전체 요청 본문을 문자열로 저장하고 있습니다.
  });
```

> 이는 다소 귀찮게 느껴질 수 있으며, 많은 경우 실제로 그렇습니다. 다행히도,
> [`concat-stream`][] 및 [`body`][]와 같은 모듈이 [`npm`][]에 있어
> 이 로직의 일부를 숨기는 데 도움을 줄 수 있습니다. 무슨 일이 일어나고 있는지 잘 이해하는 것이 중요하며, 그것이 당신이 여기에 있는 이유입니다!

## 오류에 대한 간단한 사항

`request` 객체는 [`ReadableStream`][], 따라서 [`EventEmitter`][]이며 오류가 발생할 때는 이를 처리하는 방식이 있습니다.

요청 스트림에서 오류가 발생하면 스트림에서 `'error'` 이벤트가 발생합니다. **이 이벤트에 대한 리스너가 없으면 오류가 _던져지며_, 이는 Node.js 프로그램을 충돌시킬 수 있습니다.** 따라서 요청 스트림에 대해 `'error'` 리스너를 추가해야 하며, 로그를 남기고 계속 진행하는 것이 좋습니다. (HTTP 오류 응답을 보내는 것이 더 좋습니다. 이에 대해서는 나중에 다룰 것입니다.)

```js
request.on('error', err => {
  // 오류 메시지와 스택 추적을 `stderr`에 출력합니다.
  console.error(err.stack);
});
```

이러한 [오류를 처리하는 다른 방법][]도 있으며, 다른 추상화 및 도구가 있지만, 오류가 발생할 수 있으며 실제로 발생한다는 점을 항상 염두에 두어야 하며, 이를 처리해야 합니다.

## 지금까지의 내용

현재까지 서버를 생성하고, 요청에서 메서드, URL, 헤더 및 본문을 추출하는 방법을 다뤘습니다. 이 모든 것을 종합하면 다음과 같은 모습이 될 수 있습니다:

```cjs
const http = require('node:http');

http
  .createServer((request, response) => {
    const { headers, method, url } = request;
    let body = [];
    request
      .on('error', err => {
        console.error(err);
      })
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        // 이 시점에서 우리는 헤더, 메서드, URL 및 본문을 가지고 있으며,
        // 이 요청에 응답하기 위해 필요한 모든 작업을 수행할 수 있습니다.
      });
  })
  .listen(8080); // 이 서버를 활성화하며 포트 8080에서 수신 대기합니다.
```

```mjs
import http from 'node:http';

http
  .createServer((request, response) => {
    const { headers, method, url } = request;
    let body = [];
    request
      .on('error', err => {
        console.error(err);
      })
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        // 이 시점에서 우리는 헤더, 메서드, URL 및 본문을 가지고 있으며,
        // 이 요청에 응답하기 위해 필요한 모든 작업을 수행할 수 있습니다.
      });
  })
  .listen(8080); // 이 서버를 활성화하며 포트 8080에서 수신 대기합니다.
```

이 예제를 실행하면 요청을 _받을_ 수는 있지만, 요청에 *응답*할 수는 없습니다. 실제로 이 예제를 웹 브라우저에서 실행하면 요청이 클라이언트로 다시 전송되지 않아 타임아웃이 발생합니다.

지금까지 `response` 객체에 대해서는 전혀 다루지 않았습니다. 이는 [`ServerResponse`][]의 인스턴스이며, [`WritableStream`][]. 클라이언트로 데이터를 전송하는 데 유용한 여러 메서드를 포함하고 있습니다. 다음에 이를 다루겠습니다.

## HTTP 상태 코드

상태 코드를 설정하지 않으면 응답의 HTTP 상태 코드는 항상 200입니다. 물론 모든 HTTP 응답이 이를 요구하는 것은 아니며, 언젠가는 다른 상태 코드를 전송해야 할 것입니다. 이를 위해 `statusCode` 속성을 설정할 수 있습니다.

```js
response.statusCode = 404; // 리소스를 찾을 수 없음을 클라이언트에 알립니다.
```

이와 관련된 다른 단축키도 있으니, 곧 확인해 보겠습니다.

## 응답 헤더 설정

헤더는 [`setHeader`][]라는 편리한 메서드를 통해 설정됩니다.

```js
response.setHeader('Content-Type', 'application/json');
response.setHeader('X-Powered-By', 'bacon');
```

응답의 헤더를 설정할 때, 헤더 이름은 대소문자를 구분하지 않습니다. 헤더를 반복해서 설정하면, 마지막에 설정한 값이 전송됩니다.

## 헤더 데이터 명시적 전송

지금까지 논의한 헤더와 상태 코드를 설정하는 방법은 "암시적 헤더"를 사용하는 것을 가정합니다. 이는 본문 데이터를 보내기 전에 Node가 적절한 시점에 헤더를 전송해줄 것이라고 믿는 것입니다.

원하는 경우, 응답 스트림에 _명시적으로_ 헤더를 작성할 수 있습니다. 이를 위해 `writeHead`라는 메서드가 있으며, 상태 코드와 헤더를 스트림에 씁니다.

```js
response.writeHead(200, {
  'Content-Type': 'application/json',
  'X-Powered-By': 'bacon',
});
```

헤더를 설정한 후(암시적이든 명시적이든), 응답 데이터를 보내기 위해 준비가 완료됩니다.

## 응답 본문 전송

`response` 객체는 [`WritableStream`][]이므로, 클라이언트로 응답 본문을 쓰는 것은 일반적인 스트림 메서드를 사용하는 것과 같습니다.

```js
response.write('<html>');
response.write('<body>');
response.write('<h1>Hello, World!</h1>');
response.write('</body>');
response.write('</html>');
response.end();
```

스트림의 `end` 함수는 스트림에서 마지막 데이터로 전송할 선택적 데이터를 받을 수 있으므로, 위의 예제를 다음과 같이 단순화할 수 있습니다.

```js
response.end('<html><body><h1>Hello, World!</h1></body></html>');
```

> 본문 데이터 청크를 작성하기 _전에_ 상태와 헤더를 설정하는 것이 중요합니다. 이는 HTTP 응답에서 헤더가 본문 앞에 오는 것이기 때문에 이해가 됩니다.

## 오류에 대한 또 다른 간단한 사항

`response` 스트림도 `'error'` 이벤트를 발생시킬 수 있으며, 이 점도 처리해야 할 것입니다. `request` 스트림 오류에 대한 모든 조언이 여기에도 적용됩니다.

## 모든 것을 종합하기

HTTP 응답에 대해 배운 내용을 종합하여, 사용자가 보낸 모든 데이터를 다시 전송하는 서버를 만들어보겠습니다. 이 데이터를 `JSON.stringify`를 사용하여 JSON 형식으로 포맷할 것입니다.

```cjs
const http = require('node:http');

http
  .createServer((request, response) => {
    const { headers, method, url } = request;
    let body = [];
    request
      .on('error', err => {
        console.error(err);
      })
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        // BEGINNING OF NEW STUFF

        response.on('error', err => {
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
  })
  .listen(8080);
```

```mjs
import http from 'node:http';

http
  .createServer((request, response) => {
    const { headers, method, url } = request;
    let body = [];
    request
      .on('error', err => {
        console.error(err);
      })
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        // BEGINNING OF NEW STUFF

        response.on('error', err => {
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
  })
  .listen(8080);
```

## 에코 서버 예제

이전 예제를 간소화하여, 요청에서 받은 데이터를 그대로 응답으로 돌려주는 간단한 에코 서버를 만들어 보겠습니다. 요청 스트림에서 데이터를 추출하고, 해당 데이터를 응답 스트림에 작성하면 됩니다. 이전에 했던 것과 유사합니다.

```cjs
const http = require('node:http');

http
  .createServer((request, response) => {
    let body = [];
    request
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        response.end(body);
      });
  })
  .listen(8080);
```

```mjs
import http from 'node:http';

http
  .createServer((request, response) => {
    let body = [];
    request
      .on('data', chunk => {
        body.push(chunk);
      })
      .on('end', () => {
        body = Buffer.concat(body).toString();
        response.end(body);
      });
  })
  .listen(8080);
```

이제 이 내용을 약간 수정해 보겠습니다. 다음 조건에서만 에코를 보내고 싶습니다:

- 요청 메서드가 POST일 때.
- URL이 `/echo`일 때.

그 외의 경우에는 404 응답을 보내고 싶습니다.

```cjs
const http = require('node:http');

http
  .createServer((request, response) => {
    if (request.method === 'POST' && request.url === '/echo') {
      let body = [];
      request
        .on('data', chunk => {
          body.push(chunk);
        })
        .on('end', () => {
          body = Buffer.concat(body).toString();
          response.end(body);
        });
    } else {
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(8080);
```

```mjs
import http from 'node:http';

http
  .createServer((request, response) => {
    if (request.method === 'POST' && request.url === '/echo') {
      let body = [];
      request
        .on('data', chunk => {
          body.push(chunk);
        })
        .on('end', () => {
          body = Buffer.concat(body).toString();
          response.end(body);
        });
    } else {
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(8080);
```

> 이렇게 URL을 확인함으로써, 우리는 일종의 "라우팅"을 수행하고 있습니다.
> 다른 라우팅 형태는 `switch` 문처럼 간단할 수 있고, [`express`][]와 같은 전체 프레임워크처럼 복잡할 수도 있습니다. 라우팅만 처리하는 것을 원하신다면, [`router`][]를 시도해 보세요.

좋습니다! 이제 이를 간소화해 보겠습니다. `request` 객체는 [`ReadableStream`][]이고 `response` 객체는 [`WritableStream`][]입니다. 즉, [`pipe`][]를 사용하여 데이터를 하나에서 다른 쪽으로 직접 보낼 수 있습니다. 이것이 바로 에코 서버에서 원하는 것입니다!

```cjs
const http = require('node:http');

http
  .createServer((request, response) => {
    if (request.method === 'POST' && request.url === '/echo') {
      request.pipe(response);
    } else {
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(8080);
```

```mjs
import http from 'node:http';

http
  .createServer((request, response) => {
    if (request.method === 'POST' && request.url === '/echo') {
      request.pipe(response);
    } else {
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(8080);
```

우와, 스트림!

우리는 아직 끝나지 않았습니다. 이 가이드에서 여러 번 언급했듯이, 오류는 발생할 수 있으며 우리는 이를 처리해야 합니다.

요청 스트림에서 오류를 처리하기 위해, 오류를 `stderr`에 로깅하고 `Bad Request`를 나타내기 위해 400 상태 코드를 보낼 것입니다. 실제 애플리케이션에서는 오류를 검사하여 올바른 상태 코드와 메시지를 결정해야 합니다. 오류와 관련된 사항은 항상 [`Error` 문서][]를 참조해야 합니다.

응답에서는 오류를 `stderr`에 로깅할 것입니다.

```js
const http = require('node:http');

http
  .createServer((request, response) => {
    request.on('error', err => {
      console.error(err);
      response.statusCode = 400;
      response.end();
    });
    response.on('error', err => {
      console.error(err);
    });
    if (request.method === 'POST' && request.url === '/echo') {
      request.pipe(response);
    } else {
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(8080);
```

```js
import http from 'node:http';

http
  .createServer((request, response) => {
    request.on('error', err => {
      console.error(err);
      response.statusCode = 400;
      response.end();
    });
    response.on('error', err => {
      console.error(err);
    });
    if (request.method === 'POST' && request.url === '/echo') {
      request.pipe(response);
    } else {
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(8080);
```

이제 HTTP 요청 처리의 기본 사항 대부분을 다루었습니다. 이 시점에서 여러분은 다음을 할 수 있어야 합니다:

- 요청 핸들러 함수를 사용하여 HTTP 서버를 인스턴스화하고, 포트에서 수신 대기합니다.
- `request` 객체에서 헤더, URL, 메서드 및 본문 데이터를 가져옵니다.
- URL 및/또는 `request` 객체의 다른 데이터에 따라 라우팅 결정을 내립니다.
- `response` 객체를 통해 헤더, HTTP 상태 코드 및 본문 데이터를 보냅니다.
- `request` 객체에서 `response` 객체로 데이터를 파이핑합니다.
- `request` 및 `response` 스트림에서 스트림 오류를 처리합니다.

이 기본 사항을 통해 다양한 일반적인 용도의 Node.js HTTP 서버를 구성할 수 있습니다. 이 API가 제공하는 다른 많은 것들이 있으니, [`EventEmitters`][]와 [`Streams`][] 및 [`HTTP`][]에 대한 API 문서를 꼭 읽어보세요.

[`EventEmitters`]: https://nodejs.org/api/events.html
[`Streams`]: https://nodejs.org/api/stream.html
[`createServer`]: https://nodejs.org/api/http.html#http_http_createserver_requestlistener
[`Server`]: https://nodejs.org/api/http.html#http_class_http_server
[`listen`]: https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback
[API 참조]: https://nodejs.org/api/http.html
[`IncomingMessage`]: https://nodejs.org/api/http.html#http_class_http_incomingmessage
[`ReadableStream`]: https://nodejs.org/api/stream.html#stream_class_stream_readable
[`rawHeaders`]: https://nodejs.org/api/http.html#http_message_rawheaders
[`Buffer`]: https://nodejs.org/api/buffer.html
[`concat-stream`]: https://www.npmjs.com/package/concat-stream
[`body`]: https://www.npmjs.com/package/body
[`npm`]: https://www.npmjs.com
[`EventEmitter`]: https://nodejs.org/api/events.html#events_class_eventemitter
[오류를 처리하는 다른 방법]: https://nodejs.org/api/errors.html
[`ServerResponse`]: https://nodejs.org/api/http.html#http_class_http_serverresponse
[`setHeader`]: https://nodejs.org/api/http.html#http_response_setheader_name_value
[`WritableStream`]: https://nodejs.org/api/stream.html#stream_class_stream_writable
[`writeHead`]: https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers
[`express`]: https://www.npmjs.com/package/express
[`router`]: https://www.npmjs.com/package/router
[`pipe`]: https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
[`Error` 문서]: https://nodejs.org/api/errors.html
[`HTTP`]: https://nodejs.org/api/http.html
