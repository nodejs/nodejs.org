---
title: 도메인 모듈 포스트모템
layout: docs.hbs
---

# 도메인 모듈 포스트모템

## 사용성 이슈

### 암묵적인 동작

It's possible for a developer to create a new domain and then simply run `domain.enter()`. Which then acts as a catch-all for any exception in the future that couldn't be observed by the thrower. Allowing a module author to intercept the exceptions of unrelated code in a different module. Preventing the originator of the code from knowing about its own exceptions.

개발자가 새로운 도메인을 만들고 `domain.enter()`를 실행할 수 있습니다. 이는 이후 모든 예외를 잡는 것처럼 동작하므로 오류를 던진 쪽에서 관찰할 수 없게 했습니다. 이는 모듈 작성자가 다른 모듈의 관련 없는 코드의 예외를 가로챌 수 있게 했고 코드의 작성자가 자신의 예외를 알지 못하게 했습니다.

```js
// 모듈 a.js
const b = require('./b');
const c = require('./c');

// 모듈 b.js
const d = require('domain').create();
d.on('error', () => { /* 모든 것을 무시합니다. */ });
d.enter();

// 모듈 c.js
const dep = require('some-dep');
dep.method(); // 앗! 이 메서드는 실제로 존재하지 않습니다.
```

다음 예제는 간접적으로 연결된 모듈이 다른 모듈에 어떻게 영향을 끼칠 수 있는지를 보여줍니다.

Another issue is that domains route errors automatically if no `'error'` handler was set on the event emitter. There is no opt-in mechanism for this, and automatically propagates across the entire asynchronous chain. This may seem useful at first, but once asynchronous calls are two or more modules deep and one of them doesn't include an error handler the creator of the domain will suddenly be catching unexpected exceptions, and the thrower's exception will go unnoticed by the author.

모듈 `b`가 도메인에 들어갔지만 나오지는 않았으므로 잡지 않은 모든 예외가 무시될 것입니다. 이는 모듈 `c`가 왜 전체 스크립트를 실행하지 않는지를 알지 못하게 둡니다. 부분적으로 존재하는 `module.exports`를 잠재적으로 둡니다. 이렇게 하는 것은 전역적으로 오류를 잡겠다고 명시적으로 나타내는 `'uncaughtException'`을 사용하는 것과 다릅니다. 도메인이 어떤 `'uncaughtException'` 핸들러보다도 먼저 처리되어 `'uncaughtException'`이 실행되지 않도록 한다는 것은 또 다른 문제입니다.

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

Even manually removing the connection via `d.remove(c)` does not prevent the connection's error from being automatically intercepted.

또 다른 문제는 도메인 라우트가 이벤트 이미터에 `'error'` 핸들러가 설정되어 있지 않다면 오류를 발생시킨다는 것입니다. 이를 위한 옵트인 메커니즘은 존재하지 않고 전체 비동기 체인에 자동으로 전파됩니다. 처음에는 유용해 보이지만 비동기 호출이 두 개 이상의 모듈을 호출하고 이 중 하나가 오류 핸들러를 작성하지 않았다면 도메인 생성자는 예상치 못한 예외를 갑자기 받을 것이고 오류가 발생한 곳의 작성자는 알지 못할 것입니다.

```js
const domain = require('domain');
const net = require('net');
const d = domain.create();
d.on('error', () => console.error('d intercepted an error'));

d.run(() => {
  const server = net.createServer((c) => {
    const e = domain.create(); // 'error' 핸들러가 설정되지 않았습니다.
    e.run(() => {
      // 이 오류는 d의 오류 핸들러가 잡지 못합니다.
      setImmediate(() => {
        throw new Error('thrown from setImmediate');
      });
      // 그런데도 이 오류는 d의 오류 핸들러에 버블링 될 것입니다.
      throw new Error('immediately thrown');
    });
  }).listen(8080);
});
```

다음 예제는 빠진 `'error'` 핸들러 때문에 어떻게 활성화된 도메인이 오류를 가로채는지 보여줍니다.

### API 차이

While APIs based on using `EventEmitter` can use `bind()` and errback style callbacks can use `intercept()`, alternative APIs that implicitly bind to the active domain must be executed inside of `run()`. Meaning if module authors wanted to support domains using a mechanism alternative to those mentioned they must manually implement domain support themselves. Instead of being able to leverage the implicit mechanisms already in place.

### 오류 전파

`d.remove(c)`를 통해 수동으로 연결을 제거하더라도 연결 오류가 자동으로 가로채지는 것을 막지 못합니다.

```js
const d1 = domain.create();
d1.foo = true; // 콘솔에서 더 가시적으로 만드는 커스텀 멤버
d1.on('error', (er) => { /* 오류 처리 */ });

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

오류 라우팅과 예외처리를 모두 괴롭히는 실패는 오류를 버블링하는 방법의 불일치입니다. 다음은 중첩된 도메인이 언제 발생한 오류에 따라 어떻게 버블링하고 버블링하지 않는지를 보여줍니다.

중첩된 도메인은 항상 중첩된 상태로 남아있고 예외는 항상 도메인 스택으로 전파되기를 기대할 수 있습니다. 아니면 이 예외가 절대 자동으로 버블링되지 않기를 기대할 수 있습니다. 불행히도 두 가지 상황이 모두 발생하고 이는 시점의 충돌을 디버깅하기 어렵게 만들기 쉬운 혼란스러운 동작입니다.

### 예외 발생 시 자원 정리

The following script contains a more complex example of properly cleaning up in a small resource dependency tree in the case that an exception occurs in a given connection or any of its dependencies. Breaking down the script into its basic operations:

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

// 예제 시작
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
      // 문서에는 콜백이 선택사항으로 나와 있지만
      // 작성이 실패하면 예외가 던져진다고는 얘기하지 않았습니다.
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
  } catch (e) { }
});

```

* 새로운 연결이 이뤄지면 동시에
  * 파일시스템에서 파일을 엽니다.
  * 유일한 소켓과 파이프를 연결합니다.
* 파일의 청크를 비동기로 읽습니다.
* TCP 연결과 리스닝 중인 모든 소켓에 청크를 작성합니다.
* 이러한 자원에서 오류가 발생하면 정리하고 종료해야 하는 모든 연결된 자원에 알립니다.

`EventEmitter`에 기반을 둔 API는 `bind()`를 사용할 수 있고 에러를 다시 받는 형식의 콜백은 `intercept()`를 사용할 수 있지만, 활성화된 도메인에 암묵적으로 바인딩 되는 다른 API는 `run()` 안에서 실행되어야 합니다. 이는 모듈 작성자가 앞에서 말한 방식의 대안 메커니즘을 사용해서 도메인을 지원하고자 하면 이미 적소에 있는 암묵적인 메커니즘을 이용하지 않고 직접 도메인 지원을 구현해야 한다는 의미입니다.

One problem domains perpetuated was the supposed simplicity of being able to continue execution, contrary to what the documentation stated, of the application despite an unexpected exception. This example demonstrates the fallacy behind that idea.

중첩된 도메인에 걸친 오류 전파는 직관적이지 않습니다. 기존의 문서는 요청 핸들러에 오류가 있다면 `http` 서버를 어떻게 `close()`하는지 간단한 예제를 보여줍니다. 여기서 설명하지 않은 것은 요청 핸들러가 또 다른 비동기 요청을 위한 다른 도메인 인스턴스를 생성한다면 어떻게 닫을 것인가입니다. 오류 전파의 실패를 보여주는 다음 예제를 보겠습니다.

In the end, in terms of handling errors, domains aren't much more than a glorified `'uncaughtException'` handler. Except with more implicit and unobservable behavior by third-parties.

### 자원 전파

도메인 인스턴스가 로컬 스토리지에 사용되어 자원에 대한 액세스가 가능해지더라도 여전히 오류가 `d2`에서 `d1`으로 다시 계속 전파되도록 허용할 수 있는 방법이 없습니다. 빠른 검사는 `d2` 도메인의 `'error'` 핸들러를 던지기만 하면 `d1`이 예외를 잡아서 자체 에러 핸들러를 실행할 수 있게 합니다. 지금은 이 경우가 아니지만 `domain._stack`을 검사하면 스택에 `d2`만 포함되어 있음을 알 수 있습니다.

이것이 API의 실패라고 생각할 수 있습니다만 이러한 방식으로 동작하더라도 비동기 실행의 분기가 실패했다는 사실을 전달하는 문제가 여전히 남아있고 이 분기의 추가작업은 중단되어야 합니다. http 요청 핸들러 예제에서 다수의 비동기 요청을 보내고 각 요청에서 `write()`의 데이터를 다시 클라이언트에 보내면 닫힌 핸들에 `write()`를 시도하면서 더 많은 오류가 발생합니다. 이것에 대한 자세한 내용은 _예외발생시 자원 정리_를 참고하세요.

```js
const domain = require('domain');
const net = require('net');

const server = net.createServer((c) => {
  // 모든 곳에서 인자를 전달할 수 없으므로
  // 연결 내에서 이벤트 간에 데이터를 전파하려고 도메인을 사용합니다.
  const d = domain.create();
  d.data = { connection: c };
  d.add(c);
  // 데모용으로 쓸모없는 비동기 데이터 변환을 하는 Mock 클래스
  const ds = new DataStream(dataTransformed);
  c.on('data', (chunk) => ds.data(chunk));
}).listen(8080, () => console.log('listening on 8080'));

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

The above shows that it is difficult to have more than one asynchronous API attempt to use domains to propagate data. This example could possibly be fixed by assigning `parent: domain.active` in the `DataStream` constructor. Then restoring it via `domain.active = domain.active.data.parent` just before the user's callback is called. Also the instantiation of `DataStream` in the `'connection'` callback must be run inside `d.run()`, instead of simply using `d.add(c)`, otherwise there will be no active domain.

다음 스크립트는 해당 연결이나 의존성에서 예외가 발생한 경우 작은 자원 의존성 트리를 적절하게 정리하는 꽤 복잡한 예제입니다. 기본 작업으로 스크립트를 나누었습니다.

## 성능 문제

A significant deterrent from using domains is the overhead. Using node's built-in http benchmark, `http_simple.js`, without domains it can handle over 22,000 requests/second. Whereas if it's run with `NODE_USE_DOMAINS=1` that number drops down to under 17,000 requests/second. In this case there is only a single global domain. If we edit the benchmark so the http request callback creates a new domain instance performance drops further to 15,000 requests/second.

이 예제에서 알 수 있듯이 도메인 API로 엄격하게 수행할 수 있는 것보다 실패했을 때 자원을 적절하게 정리하려면 더 많은 작업을 해야 합니다. 도메인이 제공하는 모든 것은 예외를 수집하는 메커니즘입니다. 이 예제에서 함수의 인자로 필요한 자원을 전달해서 도메인으로 데이터를 전파할 수 있는 잠재적으로 유용한 기능조차도 쉽게 대응할 수 있습니다.

도메인이 유지되는 한 가지 문제는 문서에 나와 있는 것과는 달리 예기치 않은 예외에도 불구하고 애플리케이션을 계속 실행할 수 있다는 단순한 생각이었습니다. 이 예제는 이 생각에 오류가 있다는 것을 보여줍니다.

## 앞을 내다 보며

The domain module has been soft deprecated since Dec 2014, but has not yet been removed because node offers no alternative functionality at the moment. As of this writing there is ongoing work building out the `AsyncWrap` API and a proposal for Zones being prepared for the TC39. At such time there is suitable functionality to replace domains it will undergo the full deprecation cycle and eventually be removed from core.
