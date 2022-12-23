---
title: 도메인 모듈 포스트모템
layout: docs.hbs
---

<!--
# Domain Module Postmortem

## Usability Issues

### Implicit Behavior

It's possible for a developer to create a new domain and then simply run
`domain.enter()`. Which then acts as a catch-all for any exception in the
future that couldn't be observed by the thrower. Allowing a module author to
intercept the exceptions of unrelated code in a different module. Preventing
the originator of the code from knowing about its own exceptions.

Here's an example of how one indirectly linked modules can affect another:
-->

# 도메인 모듈 포스트모템

## 사용성 이슈

### 암묵적인 동작

개발자가 새로운 도메인을 만들고 `domain.enter()`를 실행할 수 있습니다. 이는 이후 모든 예외를
잡는 것처럼 동작하므로 오류를 던진 쪽에서 관찰할 수 없게 했습니다. 이는 모듈 작성자가 다른 모듈의
관련 없는 코드의 예외를 가로챌 수 있게 했고 코드의 작성자가 자신의 예외를 알지 못하게 했습니다.

다음 예제는 간접적으로 연결된 모듈이 다른 모듈에 어떻게 영향을 끼칠 수 있는지를 보여줍니다.

<!--
```js
// module a.js
const b = require('./b');
const c = require('./c');

// module b.js
const d = require('domain').create();
d.on('error', () => { /* silence everything */ });
d.enter();

// module c.js
const dep = require('some-dep');
dep.method(); // Uh-oh! This method doesn't actually exist.
```

Since module `b` enters the domain but never exits any uncaught exception will
be swallowed. Leaving module `c` in the dark as to why it didn't run the entire
script. Leaving a potentially partially populated `module.exports`. Doing this
is not the same as listening for `'uncaughtException'`. As the latter is
explicitly meant to globally catch errors. The other issue is that domains are
processed prior to any `'uncaughtException'` handlers, and prevent them from
running.
-->

```js
// 모듈 a.js
const b = require('./b');
const c = require('./c');

// 모듈 b.js
const d = require('domain').create();
d.on('error', () => {
  /* 모든 것을 무시합니다. */
});
d.enter();

// 모듈 c.js
const dep = require('some-dep');
dep.method(); // 앗! 이 메서드는 실제로 존재하지 않습니다.
```

모듈 `b`가 도메인에 들어갔지만 나오지는 않았으므로 잡지 않은 모든 예외가 무시될 것입니다. 이는
모듈 `c`가 왜 전체 스크립트를 실행하지 않는지를 알지 못하게 둡니다. 부분적으로 존재하는
`module.exports`를 잠재적으로 둡니다. 이렇게 하는 것은 전역적으로 오류를 잡겠다고 명시적으로
나타내는 `'uncaughtException'`을 사용하는 것과 다릅니다. 도메인이
어떤 `'uncaughtException'` 핸들러보다도 먼저 처리되어
`'uncaughtException'`이 실행되지 않도록 한다는 것은 또 다른 문제입니다.

<!--
Another issue is that domains route errors automatically if no `'error'`
handler was set on the event emitter. There is no opt-in mechanism for this,
and automatically propagates across the entire asynchronous chain. This may
seem useful at first, but once asynchronous calls are two or more modules deep
and one of them doesn't include an error handler the creator of the domain will
suddenly be catching unexpected exceptions, and the thrower's exception will go
unnoticed by the author.

The following is a simple example of how a missing `'error'` handler allows
the active domain to hijack the error:

```js
const domain = require('domain');
const net = require('net');
const d = domain.create();
d.on('error', (err) => console.error(err.message));

d.run(() => net.createServer((c) => {
  c.end();
  c.write('bye');
}).listen(8000));
```
-->

또 다른 문제는 도메인 라우트가 이벤트 이미터에 `'error'` 핸들러가 설정되어 있지 않다면 오류를
발생시킨다는 것입니다. 이를 위한 옵트인 메커니즘은 존재하지 않고 전체 비동기 체인에 자동으로 전파됩니다.
처음에는 유용해 보이지만 비동기 호출이 두 개 이상의 모듈을 호출하고 이 중 하나가 오류 핸들러를
작성하지 않았다면 도메인 생성자는 예상치 못한 예외를 갑자기 받을 것이고 오류가 발생한 곳의
작성자는 알지 못할 것입니다.

다음 예제는 빠진 `'error'` 핸들러 때문에 어떻게 활성화된 도메인이 오류를 가로채는지 보여줍니다.

```js
const domain = require('domain');
const net = require('net');
const d = domain.create();
d.on('error', (err) => console.error(err.message));

d.run(() =>
  net
    .createServer((c) => {
      c.end();
      c.write('bye');
    })
    .listen(8000)
);
```

<!--
Even manually removing the connection via `d.remove(c)` does not prevent the
connection's error from being automatically intercepted.

Failures that plagues both error routing and exception handling are the
inconsistencies in how errors are bubbled. The following is an example of how
nested domains will and won't bubble the exception based on when they happen:

```js
const domain = require('domain');
const net = require('net');
const d = domain.create();
d.on('error', () => console.error('d intercepted an error'));

d.run(() => {
  const server = net.createServer((c) => {
    const e = domain.create(); // No 'error' handler being set.
    e.run(() => {
      // This will not be caught by d's error handler.
      setImmediate(() => {
        throw new Error('thrown from setImmediate');
      });
      // Though this one will bubble to d's error handler.
      throw new Error('immediately thrown');
    });
  }).listen(8080);
});
```

It may be expected that nested domains always remain nested, and will always
propagate the exception up the domain stack. Or that exceptions will never
automatically bubble. Unfortunately both these situations occur, leading to
potentially confusing behavior that may even be prone to difficult to debug
timing conflicts.
-->

`d.remove(c)`를 통해 수동으로 연결을 제거하더라도 연결 오류가 자동으로
가로채지는 것을 막지 못합니다.

오류 라우팅과 예외처리를 모두 괴롭히는 실패는 오류를 버블링하는 방법의 불일치입니다.
다음은 중첩된 도메인이 언제 발생한 오류에 따라 어떻게 버블링하고 버블링하지 않는지를 보여줍니다.

```js
const domain = require('domain');
const net = require('net');
const d = domain.create();
d.on('error', () => console.error('d intercepted an error'));

d.run(() => {
  const server = net
    .createServer((c) => {
      const e = domain.create(); // 'error' 핸들러가 설정되지 않았습니다.
      e.run(() => {
        // 이 오류는 d의 오류 핸들러가 잡지 못합니다.
        setImmediate(() => {
          throw new Error('thrown from setImmediate');
        });
        // 그런데도 이 오류는 d의 오류 핸들러에 버블링 될 것입니다.
        throw new Error('immediately thrown');
      });
    })
    .listen(8080);
});
```

중첩된 도메인은 항상 중첩된 상태로 남아있고 예외는 항상 도메인 스택으로 전파되기를 기대할 수 있습니다.
아니면 이 예외가 절대 자동으로 버블링되지 않기를 기대할 수 있습니다. 불행히도 두 가지 상황이 모두
발생하고 이는 시점의 충돌을 디버깅하기 어렵게 만들기 쉬운 혼란스러운 동작입니다.

<!--
### API Gaps

While APIs based on using `EventEmitter` can use `bind()` and errback style
callbacks can use `intercept()`, alternative APIs that implicitly bind to the
active domain must be executed inside of `run()`. Meaning if module authors
wanted to support domains using a mechanism alternative to those mentioned they
must manually implement domain support themselves. Instead of being able to
leverage the implicit mechanisms already in place.
-->

### API 차이

`EventEmitter`에 기반을 둔 API는 `bind()`를 사용할 수 있고 에러를 다시 받는 형식의 콜백은
`intercept()`를 사용할 수 있지만, 활성화된 도메인에 암묵적으로 바인딩 되는 다른 API는
`run()` 안에서 실행되어야 합니다. 이는 모듈 작성자가 앞에서 말한 방식의 대안 메커니즘을 사용해서
도메인을 지원하고자 하면 이미 적소에 있는 암묵적인 메커니즘을 이용하지 않고 직접 도메인 지원을
구현해야 한다는 의미입니다.

<!--
### Error Propagation

Propagating errors across nested domains is not straight forward, if even
possible. Existing documentation shows a simple example of how to `close()` an
`http` server if there is an error in the request handler. What it does not
explain is how to close the server if the request handler creates another
domain instance for another async request. Using the following as a simple
example of the failing of error propagation:

```js
const d1 = domain.create();
d1.foo = true; // custom member to make more visible in console
d1.on('error', (er) => { /* handle error */ });

d1.run(() => setTimeout(() => {
  const d2 = domain.create();
  d2.bar = 43;
  d2.on('error', (er) => console.error(er.message, domain._stack));
  d2.run(() => {
    setTimeout(() => {
      setTimeout(() => {
        throw new Error('outer');
      });
      throw new Error('inner');
    });
  });
}));
```
-->

### 오류 전파

중첩된 도메인에 걸친 오류 전파는 직관적이지 않습니다. 기존의 문서는 요청 핸들러에 오류가 있다면
`http` 서버를 어떻게 `close()`하는지 간단한 예제를 보여줍니다. 여기서 설명하지 않은 것은
요청 핸들러가 또 다른 비동기 요청을 위한 다른 도메인 인스턴스를 생성한다면 어떻게 닫을 것인가입니다.
오류 전파의 실패를 보여주는 다음 예제를 보겠습니다.

```js
const d1 = domain.create();
d1.foo = true; // 콘솔에서 더 가시적으로 만드는 커스텀 멤버
d1.on('error', (er) => {
  /* 오류 처리 */
});

d1.run(() =>
  setTimeout(() => {
    const d2 = domain.create();
    d2.bar = 43;
    d2.on('error', (er) => console.error(er.message, domain._stack));
    d2.run(() => {
      setTimeout(() => {
        setTimeout(() => {
          throw new Error('outer');
        });
        throw new Error('inner');
      });
    });
  })
);
```

<!--
Even in the case that the domain instances are being used for local storage so
access to resources are made available there is still no way to allow the error
to continue propagating from `d2` back to `d1`. Quick inspection may tell us
that simply throwing from `d2`'s domain `'error'` handler would allow `d1` to
then catch the exception and execute its own error handler. Though that is not
the case. Upon inspection of `domain._stack` you'll see that the stack only
contains `d2`.

This may be considered a failing of the API, but even if it did operate in this
way there is still the issue of transmitting the fact that a branch in the
asynchronous execution has failed, and that all further operations in that
branch must cease. In the example of the http request handler, if we fire off
several asynchronous requests and each one then `write()`'s data back to the
client many more errors will arise from attempting to `write()` to a closed
handle. More on this in _Resource Cleanup on Exception_.
-->

도메인 인스턴스가 로컬 스토리지에 사용되어 자원에 대한 액세스가 가능해지더라도 여전히 오류가 `d2`에서
`d1`으로 다시 계속 전파되도록 허용할 수 있는 방법이 없습니다. 빠른 검사는 `d2` 도메인의
`'error'` 핸들러를 던지기만 하면 `d1`이 예외를 잡아서 자체 에러 핸들러를 실행할 수 있게 합니다.
지금은 이 경우가 아니지만 `domain._stack`을 검사하면 스택에 `d2`만 포함되어 있음을 알 수 있습니다.

이것이 API의 실패라고 생각할 수 있습니다만 이러한 방식으로 동작하더라도 비동기 실행의 분기가 실패했다는
사실을 전달하는 문제가 여전히 남아있고 이 분기의 추가작업은 중단되어야 합니다. http 요청 핸들러
예제에서 다수의 비동기 요청을 보내고 각 요청에서 `write()`의 데이터를 다시 클라이언트에 보내면
닫힌 핸들에 `write()`를 시도하면서 더 많은 오류가 발생합니다.
이것에 대한 자세한 내용은 _예외발생시 자원 정리_를 참고하세요.

<!--
### Resource Cleanup on Exception

The following script contains a more complex example of properly cleaning up
in a small resource dependency tree in the case that an exception occurs in a
given connection or any of its dependencies. Breaking down the script into its
basic operations:

```js
'use strict';

const domain = require('domain');
const EE = require('events');
const fs = require('fs');
const net = require('net');
const util = require('util');
const print = process._rawDebug;

const pipeList = [];
const FILENAME = '/tmp/tmp.tmp';
const PIPENAME = '/tmp/node-domain-example-';
const FILESIZE = 1024;
let uid = 0;

// Setting up temporary resources
const buf = Buffer.alloc(FILESIZE);
for (let i = 0; i < buf.length; i++)
  buf[i] = ((Math.random() * 1e3) % 78) + 48; // Basic ASCII
fs.writeFileSync(FILENAME, buf);

function ConnectionResource(c) {
  EE.call(this);
  this._connection = c;
  this._alive = true;
  this._domain = domain.create();
  this._id = Math.random().toString(32).substr(2).substr(0, 8) + (++uid);

  this._domain.add(c);
  this._domain.on('error', () => {
    this._alive = false;
  });
}
util.inherits(ConnectionResource, EE);

ConnectionResource.prototype.end = function end(chunk) {
  this._alive = false;
  this._connection.end(chunk);
  this.emit('end');
};

ConnectionResource.prototype.isAlive = function isAlive() {
  return this._alive;
};

ConnectionResource.prototype.id = function id() {
  return this._id;
};

ConnectionResource.prototype.write = function write(chunk) {
  this.emit('data', chunk);
  return this._connection.write(chunk);
};

// Example begin
net.createServer((c) => {
  const cr = new ConnectionResource(c);

  const d1 = domain.create();
  fs.open(FILENAME, 'r', d1.intercept((fd) => {
    streamInParts(fd, cr, 0);
  }));

  pipeData(cr);

  c.on('close', () => cr.end());
}).listen(8080);

function streamInParts(fd, cr, pos) {
  const d2 = domain.create();
  const alive = true;
  d2.on('error', (er) => {
    print('d2 error:', er.message);
    cr.end();
  });
  fs.read(fd, Buffer.alloc(10), 0, 10, pos, d2.intercept((bRead, buf) => {
    if (!cr.isAlive()) {
      return fs.close(fd);
    }
    if (cr._connection.bytesWritten < FILESIZE) {
      // Documentation says callback is optional, but doesn't mention that if
      // the write fails an exception will be thrown.
      const goodtogo = cr.write(buf);
      if (goodtogo) {
        setTimeout(() => streamInParts(fd, cr, pos + bRead), 1000);
      } else {
        cr._connection.once('drain', () => streamInParts(fd, cr, pos + bRead));
      }
      return;
    }
    cr.end(buf);
    fs.close(fd);
  }));
}

function pipeData(cr) {
  const pname = PIPENAME + cr.id();
  const ps = net.createServer();
  const d3 = domain.create();
  const connectionList = [];
  d3.on('error', (er) => {
    print('d3 error:', er.message);
    cr.end();
  });
  d3.add(ps);
  ps.on('connection', (conn) => {
    connectionList.push(conn);
    conn.on('data', () => {}); // don't care about incoming data.
    conn.on('close', () => {
      connectionList.splice(connectionList.indexOf(conn), 1);
    });
  });
  cr.on('data', (chunk) => {
    for (let i = 0; i < connectionList.length; i++) {
      connectionList[i].write(chunk);
    }
  });
  cr.on('end', () => {
    for (let i = 0; i < connectionList.length; i++) {
      connectionList[i].end();
    }
    ps.close();
  });
  pipeList.push(pname);
  ps.listen(pname);
}

process.on('SIGINT', () => process.exit());
process.on('exit', () => {
  try {
    for (let i = 0; i < pipeList.length; i++) {
      fs.unlinkSync(pipeList[i]);
    }
    fs.unlinkSync(FILENAME);
  } catch (e) { }
});

```
-->

### 예외 발생 시 자원 정리

다음 스크립트는 해당 연결이나 의존성에서 예외가 발생한 경우 작은 자원 의존성 트리를 적절하게
정리하는 꽤 복잡한 예제입니다. 기본 작업으로 스크립트를 나누었습니다.

```js
'use strict';

const domain = require('domain');
const EE = require('events');
const fs = require('fs');
const net = require('net');
const util = require('util');
const print = process._rawDebug;

const pipeList = [];
const FILENAME = '/tmp/tmp.tmp';
const PIPENAME = '/tmp/node-domain-example-';
const FILESIZE = 1024;
let uid = 0;

// 임시 자원을 설정합니다
const buf = Buffer.alloc(FILESIZE);
for (let i = 0; i < buf.length; i++) buf[i] = ((Math.random() * 1e3) % 78) + 48; // Basic ASCII
fs.writeFileSync(FILENAME, buf);

function ConnectionResource(c) {
  EE.call(this);
  this._connection = c;
  this._alive = true;
  this._domain = domain.create();
  this._id = Math.random().toString(32).substr(2).substr(0, 8) + ++uid;

  this._domain.add(c);
  this._domain.on('error', () => {
    this._alive = false;
  });
}
util.inherits(ConnectionResource, EE);

ConnectionResource.prototype.end = function end(chunk) {
  this._alive = false;
  this._connection.end(chunk);
  this.emit('end');
};

ConnectionResource.prototype.isAlive = function isAlive() {
  return this._alive;
};

ConnectionResource.prototype.id = function id() {
  return this._id;
};

ConnectionResource.prototype.write = function write(chunk) {
  this.emit('data', chunk);
  return this._connection.write(chunk);
};

// 예제 시작
net
  .createServer((c) => {
    const cr = new ConnectionResource(c);

    const d1 = domain.create();
    fs.open(
      FILENAME,
      'r',
      d1.intercept((fd) => {
        streamInParts(fd, cr, 0);
      })
    );

    pipeData(cr);

    c.on('close', () => cr.end());
  })
  .listen(8080);

function streamInParts(fd, cr, pos) {
  const d2 = domain.create();
  const alive = true;
  d2.on('error', (er) => {
    print('d2 error:', er.message);
    cr.end();
  });
  fs.read(
    fd,
    Buffer.alloc(10),
    0,
    10,
    pos,
    d2.intercept((bRead, buf) => {
      if (!cr.isAlive()) {
        return fs.close(fd);
      }
      if (cr._connection.bytesWritten < FILESIZE) {
        // 문서에는 콜백이 선택사항으로 나와 있지만
        // 작성이 실패하면 예외가 던져진다고는 얘기하지 않았습니다.
        const goodtogo = cr.write(buf);
        if (goodtogo) {
          setTimeout(() => streamInParts(fd, cr, pos + bRead), 1000);
        } else {
          cr._connection.once('drain', () =>
            streamInParts(fd, cr, pos + bRead)
          );
        }
        return;
      }
      cr.end(buf);
      fs.close(fd);
    })
  );
}

function pipeData(cr) {
  const pname = PIPENAME + cr.id();
  const ps = net.createServer();
  const d3 = domain.create();
  const connectionList = [];
  d3.on('error', (er) => {
    print('d3 error:', er.message);
    cr.end();
  });
  d3.add(ps);
  ps.on('connection', (conn) => {
    connectionList.push(conn);
    conn.on('data', () => {}); // 들어오는 데이터는 무시합니다.
    conn.on('close', () => {
      connectionList.splice(connectionList.indexOf(conn), 1);
    });
  });
  cr.on('data', (chunk) => {
    for (let i = 0; i < connectionList.length; i++) {
      connectionList[i].write(chunk);
    }
  });
  cr.on('end', () => {
    for (let i = 0; i < connectionList.length; i++) {
      connectionList[i].end();
    }
    ps.close();
  });
  pipeList.push(pname);
  ps.listen(pname);
}

process.on('SIGINT', () => process.exit());
process.on('exit', () => {
  try {
    for (let i = 0; i < pipeList.length; i++) {
      fs.unlinkSync(pipeList[i]);
    }
    fs.unlinkSync(FILENAME);
  } catch (e) {}
});
```

<!--
* When a new connection happens, concurrently:
  * Open a file on the file system
  * Open Pipe to unique socket
* Read a chunk of the file asynchronously
* Write chunk to both the TCP connection and any listening sockets
* If any of these resources error, notify all other attached resources that
  they need to clean up and shutdown

As we can see from this example a lot more must be done to properly clean up
resources when something fails than what can be done strictly through the
domain API. All that domains offer is an exception aggregation mechanism. Even
the potentially useful ability to propagate data with the domain is easily
countered, in this example, by passing the needed resources as a function
argument.

One problem domains perpetuated was the supposed simplicity of being able to
continue execution, contrary to what the documentation stated, of the
application despite an unexpected exception. This example demonstrates the
fallacy behind that idea.
-->

* 새로운 연결이 이뤄지면 동시에
  * 파일시스템에서 파일을 엽니다.
  * 유일한 소켓과 파이프를 연결합니다.
* 파일의 청크를 비동기로 읽습니다.
* TCP 연결과 리스닝 중인 모든 소켓에 청크를 작성합니다.
* 이러한 자원에서 오류가 발생하면 정리하고 종료해야 하는 모든 연결된 자원에 알립니다.

이 예제에서 알 수 있듯이 도메인 API로 엄격하게 수행할 수 있는 것보다 실패했을 때 자원을 적절하게
정리하려면 더 많은 작업을 해야 합니다. 도메인이 제공하는 모든 것은 예외를 수집하는 메커니즘입니다.
이 예제에서 함수의 인자로 필요한 자원을 전달해서 도메인으로 데이터를 전파할 수 있는 잠재적으로
유용한 기능조차도 쉽게 대응할 수 있습니다.

도메인이 유지되는 한 가지 문제는 문서에 나와 있는 것과는 달리 예기치 않은 예외에도 불구하고
애플리케이션을 계속 실행할 수 있다는 단순한 생각이었습니다.
이 예제는 이 생각에 오류가 있다는 것을 보여줍니다.

<!--
Attempting proper resource cleanup on unexpected exception becomes more complex
as the application itself grows in complexity. This example only has 3 basic
resources in play, and all of them with a clear dependency path. If an
application uses something like shared resources or resource reuse the ability
to cleanup, and properly test that cleanup has been done, grows greatly.

In the end, in terms of handling errors, domains aren't much more than a
glorified `'uncaughtException'` handler. Except with more implicit and
unobservable behavior by third-parties.
-->

예기치 않은 예외가 발생했을 때 적절하게 자원 정리를 시도하면 애플리케이션 자체의 복잡도가 증가하므로
더 복잡해집니다. 이 예제는 3가지의 기본적인 자원만 가지고 있고 이 자원는 모두 명확한 의존성 경로를
가집니다. 애플리케이션이 공유된 자원이나 자원 재사용을 사용하는 경우 정리 기능과 정리가
제대로 이뤄졌는지 확인하는 적절한 테스트는 복잡도가 더 증가합니다.

결국, 오류처리 관점에서 도메인은 더 암묵적이고 서드파티가 관찰할 수 없는 동작이라는 점을 제외하면
`'uncaughtException'` 핸들러와 별반 다르지 않습니다.

<!--
### Resource Propagation

Another use case for domains was to use it to propagate data along asynchronous
data paths. One problematic point is the ambiguity of when to expect the
correct domain when there are multiple in the stack (which must be assumed if
the async stack works with other modules). Also the conflict between being
able to depend on a domain for error handling while also having it available to
retrieve the necessary data.

The following is a involved example demonstrating the failing using domains to
propagate data along asynchronous stacks:

```js
const domain = require('domain');
const net = require('net');

const server = net.createServer((c) => {
  // Use a domain to propagate data across events within the
  // connection so that we don't have to pass arguments
  // everywhere.
  const d = domain.create();
  d.data = { connection: c };
  d.add(c);
  // Mock class that does some useless async data transformation
  // for demonstration purposes.
  const ds = new DataStream(dataTransformed);
  c.on('data', (chunk) => ds.data(chunk));
}).listen(8080, () => console.log('listening on 8080'));

function dataTransformed(chunk) {
  // FAIL! Because the DataStream instance also created a
  // domain we have now lost the active domain we had
  // hoped to use.
  domain.active.data.connection.write(chunk);
}

function DataStream(cb) {
  this.cb = cb;
  // DataStream wants to use domains for data propagation too!
  // Unfortunately this will conflict with any domain that
  // already exists.
  this.domain = domain.create();
  this.domain.data = { inst: this };
}

DataStream.prototype.data = function data(chunk) {
  // This code is self contained, but pretend it's a complex
  // operation that crosses at least one other module. So
  // passing along "this", etc., is not easy.
  this.domain.run(() => {
    // Simulate an async operation that does the data transform.
    setImmediate(() => {
      for (let i = 0; i < chunk.length; i++)
        chunk[i] = ((chunk[i] + Math.random() * 100) % 96) + 33;
      // Grab the instance from the active domain and use that
      // to call the user's callback.
      const self = domain.active.data.inst;
      self.cb(chunk);
    });
  });
};
```
-->

### 자원 전파

도메인의 또 다른 사용방법은 비동기 데이터 경로를 따라 데이터를 전파하는 데 사용하는 것입니다.
한 가지 문제점은 스택에 여러 개가 있을 때(비동기 스택이 다른 모듈과 동작한다고 가정해야 한다면)
올바른 도메인을 기대하는 경우의 모호함입니다. 필요한 데이터를 얻는 데 사용하려고 도메인을 가지면서
오류처리를 도메인에 의존하는 것에 충돌도 있습니다.

비동기 스택을 따라 데이터를 전파하려고 도메인을 사용할 때의 실패를 다음 예제에서 보여줍니다.

```js
const domain = require('domain');
const net = require('net');

const server = net
  .createServer((c) => {
    // 모든 곳에서 인자를 전달할 수 없으므로
    // 연결 내에서 이벤트 간에 데이터를 전파하려고 도메인을 사용합니다.
    const d = domain.create();
    d.data = { connection: c };
    d.add(c);
    // 데모용으로 쓸모없는 비동기 데이터 변환을 하는 Mock 클래스
    const ds = new DataStream(dataTransformed);
    c.on('data', (chunk) => ds.data(chunk));
  })
  .listen(8080, () => console.log('listening on 8080'));

function dataTransformed(chunk) {
  // 실패! DataStream 인스턴스도 도메인을 생성했으므로
  // 사용하려고 했던 활성 도메인을 잃어버렸습니다.
  domain.active.data.connection.write(chunk);
}

function DataStream(cb) {
  this.cb = cb;
  // DataStream은 데이터 전파에도 도메인을 사용하려고 합니다!
  // 불행히도 이는 이미 존재하는 다른 도메인과 충돌할 것입니다.
  this.domain = domain.create();
  this.domain.data = { inst: this };
}

DataStream.prototype.data = function data(chunk) {
  // 이 코드는 자기충족적이지만 최소한 하나의 다른 모듈과의 복잡한 작업인 척합니다.
  // 그러므로 "this"를 함께 전달하기는 쉽지 않습니다.
  this.domain.run(() => {
    // 데이터를 변환하는 비동기 작업을 시뮬레이트합니다.
    setImmediate(() => {
      for (let i = 0; i < chunk.length; i++)
        chunk[i] = ((chunk[i] + Math.random() * 100) % 96) + 33;
      // 활성화된 도메인에서 인스턴스를 가져오고 사용자 콜백을 호출하는 데 사용합니다.
      const self = domain.active.data.inst;
      self.cb(chunk);
    });
  });
};
```

<!--
The above shows that it is difficult to have more than one asynchronous API
attempt to use domains to propagate data. This example could possibly be fixed
by assigning `parent: domain.active` in the `DataStream` constructor. Then
restoring it via `domain.active = domain.active.data.parent` just before the
user's callback is called. Also the instantiation of `DataStream` in the
`'connection'` callback must be run inside `d.run()`, instead of simply using
`d.add(c)`, otherwise there will be no active domain.

In short, for this to have a prayer of a chance usage would need to strictly
adhere to a set of guidelines that would be difficult to enforce or test.
-->

위 예제는 데이터를 전파하려고 도메인을 사용하는 두 개 이상의 비동기 API를 가지기가 어렵다는 것을
보여줍니다. 이 예제는 `DataStream` 생성자에서 `parent: domain.active`를 할당해서
고칠 수 있습니다. 그런 다음 사용자의 콜백이 호출되기 직전에
`domain.active = domain.active.data.parent`로 도메인을 복구합니다.
`'connection'` 콜백에서 `DataStream`의 인스턴스 생성은 단순히 `d.add(c)`를 사용하는 대신
`d.run()` 안에서 실행되어야 합니다. 그렇지 않으면 활성화된 도메인이 없을 것입니다.

간단히 말해, 이렇게 하려면 적용이나 테스트가 어려울 수 있는 일련의 가이드라인을 엄격하게 따라야 합니다.

<!--
## Performance Issues

A significant deterrent from using domains is the overhead. Using node's
built-in http benchmark, `http_simple.js`, without domains it can handle over
22,000 requests/second. Whereas if it's run with `NODE_USE_DOMAINS=1` that
number drops down to under 17,000 requests/second. In this case there is only
a single global domain. If we edit the benchmark so the http request callback
creates a new domain instance performance drops further to 15,000
requests/second.

While this probably wouldn't affect a server only serving a few hundred or even
a thousand requests per second, the amount of overhead is directly proportional
to the number of asynchronous requests made. So if a single connection needs to
connect to several other services all of those will contribute to the overall
latency of delivering the final product to the client.

Using `AsyncWrap` and tracking the number of times
`init`/`pre`/`post`/`destroy` are called in the mentioned benchmark we find
that the sum of all events called is over 170,000 times per second. This means
even adding 1 microsecond overhead per call for any type of setup or tear down
will result in a 17% performance loss. Granted, this is for the optimized
scenario of the benchmark, but I believe this demonstrates the necessity for a
mechanism such as domain to be as cheap to run as possible.
-->

## 성능 문제

도메인을 사용할 때의 중요한 방해요소는 오버헤드입니다. 도메인 없이 node에 내장된 http 벤치마크
`http_simple.js`를 사용하면 초당 22,000 요청 이상을 처리할 수 있습니다. 그에 비해
`NODE_USE_DOMAINS=1`로 실행하면 초당 17,000 요청 이하로 떨어집니다. 이 경우에는 단 하나의
전역 도메인만 있습니다. 벤치마크의 http 요청 콜백이 새로운 도메인 인스턴스를 생성하도록 수정하면
성능은 초당 15,000 요청으로 떨어집니다.

이 문제가 초당 수백, 수천 요청만 처리하는 서버에는 영향을 주지 않을 수 있지만, 오버헤드의 규모는
비동기 요청 수에 비례합니다. 그러므로 하나의 연결에 다른 여러 서비스로의 연결이 필요하다면
이 모든 요청은 클라이언트에게 전달하는 최종 제품의 전체 지연시간에 영향을 주게 됩니다.

앞에서 얘기한 벤치마크에서 `AsyncWrap`을 사용하고 `init`/`pre`/`post`/`destroy`가
호출된 횟수를 추적하자 호출된 모든 이벤트의 합이 초당 170,000번 이상이라는 것을 알 수 있었습니다.
이는 어떤 종류의 설정이나 정리를 위한 호출당 1마이크로초의 오버헤드가 추가되어 17%의 성능 저하가
발생한다는 것을 의미합니다. 당연히 이는 벤치마크에 최적화된 시나리오이지만 도메인 같은 메커니즘은
가능한 한 싸게 실행되어야 할 필요성을 보여준다고 생각합니다.

<!--
## Looking Ahead

The domain module has been soft deprecated since Dec 2014, but has not yet been
removed because node offers no alternative functionality at the moment. As of
this writing there is ongoing work building out the `AsyncWrap` API and a
proposal for Zones being prepared for the TC39. At such time there is suitable
functionality to replace domains it will undergo the full deprecation cycle and
eventually be removed from core.
-->

## 앞을 내다 보며

도메인 모듈은 2014년 12월부터 소프트 폐기되었지만, 지금은 node가 대체 기능을 제공하지 않으므로
아직 제거하지 않았습니다. 이 글을 쓰는 시점에 `AsyncWrap` API와 TC39를 위해 준비하고 있는
Zone에 관한 제안을 만들고 있습니다. 도메인을 교체할 적당한 기능이 있을 때 전체 폐기 주기를
진행할 것이고 결국 코어에서 제거할 것입니다.
