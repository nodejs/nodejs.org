---
title: 스트림에서의 백프레셔
layout: learn
---

# 스트림에서의 백프레셔

데이터 처리 중 발생하는 일반적인 문제인 [`백프레셔`][]는 데이터 전송 중 Buffer 뒤에 데이터가 쌓이는 현상을 설명합니다. 전송의 수신 측이 복잡한 작업을 수행하거나 어떤 이유로든 느릴 경우, 들어오는 소스에서 데이터가 쌓이는 경향이 있습니다. 이는 마치 막힌 것처럼 보입니다.

이 문제를 해결하기 위해서는 한 소스에서 다른 소스로 데이터가 원활하게 흐를 수 있도록 위임 시스템이 필요합니다. 서로 다른 커뮤니티는 이 문제를 각자의 프로그램에 맞게 독특하게 해결해 왔으며, 유닉스 파이프와 TCP 소켓이 좋은 예입니다. 이들은 종종 *흐름 제어*라고 불립니다. Node.js에서는 스트림이 채택된 해결책입니다.

이 가이드의 목적은 백프레셔가 무엇인지, 그리고 Node.js의 소스 코드에서 스트림이 이를 어떻게 처리하는지를 자세히 설명하는 것입니다. 가이드의 두 번째 부분에서는 스트림을 구현할 때 애플리케이션 코드가 안전하고 최적화되도록 보장하는 권장 모범 사례를 소개합니다.

우리는 Node.js에서 [`백프레셔`][], [`Buffer`][], [`EventEmitters`][]의 일반적인 정의에 대한 약간의 친숙함과 [`Stream`][]에 대한 경험을 가정합니다. 이러한 문서를 아직 읽지 않았다면, API 문서를 먼저 살펴보는 것이 좋습니다. 이는 이 가이드를 읽으면서 이해를 확장하는 데 도움이 될 것입니다.

## 데이터 처리의 문제

컴퓨터 시스템에서 데이터는 파이프, 소켓 및 신호를 통해 한 프로세스에서 다른 프로세스로 전송됩니다. Node.js에서는 [`Stream`][]이라는 유사한 메커니즘을 찾을 수 있습니다. 스트림은 훌륭합니다! Node.js에서 매우 많은 기능을 수행하며 내부 코드베이스의 거의 모든 부분이 이 모듈을 활용합니다. 개발자로서 여러분도 스트림을 사용하는 것이 권장됩니다!

```cjs
const readline = require('node:readline');

// process.stdin과 process.stdout은 모두 스트림의 인스턴스입니다.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('스트림을 사용해야 하는 이유는 무엇인가요? ', answer => {
  console.log(`아마도 ${answer}일까요, 아니면 그들이 훌륭하기 때문일까요! :)`);

  rl.close();
});
```

```mjs
import readline from 'node:readline';

// process.stdin과 process.stdout은 모두 스트림의 인스턴스입니다.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('스트림을 사용해야 하는 이유는 무엇인가요? ', answer => {
  console.log(`아마도 ${answer}일까요, 아니면 그들이 훌륭하기 때문일까요! :)`);

  rl.close();
});
```

스트림을 통해 구현된 백프레셔 메커니즘이 훌륭한 최적화인 이유를 보여주는 좋은 예는 Node.js의 [`Stream`][] 구현에서 내부 시스템 도구를 비교하는 것입니다.

한 시나리오에서는 큰 파일(약 ~9 GB)을 가져와 익숙한 [`zip(1)`][] 도구를 사용하여 압축합니다.

```
zip The.Matrix.1080p.mkv
```

이 작업이 완료되려면 몇 분이 걸릴 수 있으며, 다른 셸에서 Node.js의 모듈 [`zlib`][], 다른 압축 도구인 [`gzip(1)`][]을 감싸는 스크립트를 실행할 수 있습니다.

```cjs
const gzip = require('node:zlib').createGzip();
const fs = require('node:fs');

const inp = fs.createReadStream('The.Matrix.1080p.mkv');
const out = fs.createWriteStream('The.Matrix.1080p.mkv.gz');

inp.pipe(gzip).pipe(out);
```

```mjs
import { createGzip } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';

const gzip = createGzip();

const inp = createReadStream('The.Matrix.1080p.mkv');
const out = createWriteStream('The.Matrix.1080p.mkv.gz');

inp.pipe(gzip).pipe(out);
```

결과를 테스트하려면 각각의 압축 파일을 열어보세요. [`zip(1)`][] 도구로 압축된 파일은 손상된 파일이라는 알림을 표시하는 반면, [`Stream`][]을 사용하여 완료된 압축은 오류 없이 압축 해제됩니다.

> 이 예제에서는 `.pipe()`를 사용하여 데이터 소스를 한쪽에서 다른 쪽으로 전달합니다. 그러나 적절한 오류 처리기가 연결되어 있지 않음을 주의하세요. 데이터 청크가 제대로 수신되지 않으면 `Readable` 소스나 `gzip` 스트림이 파괴되지 않습니다. [`pump`][]는 파이프라인에서 하나가 실패하거나 닫힐 경우 모든 스트림을 적절히 파괴하는 유틸리티 도구로, 이 경우 필수입니다!

[`pump`][]는 Node.js 8.x 이하에서만 필요하며, Node.js 10.x 이상에서는 [`pipeline`][]이 [`pump`][]를 대체하도록 도입되었습니다. 이는 스트림 간에 파이프를 연결하고 오류를 전달하며 파이프라인이 완료될 때 콜백을 제공하는 모듈 메서드입니다.

파이프라인을 사용하는 예제는 다음과 같습니다:

```cjs
const { pipeline } = require('node:stream');
const fs = require('node:fs');
const zlib = require('node:zlib');

// 파이프라인 API를 사용하여 여러 스트림을 쉽게 연결하고
// 파이프라인이 완전히 완료되었을 때 알림을 받습니다.
// 잠재적으로 큰 비디오 파일을 효율적으로 gzip하는 파이프라인:

pipeline(
  fs.createReadStream('The.Matrix.1080p.mkv'),
  zlib.createGzip(),
  fs.createWriteStream('The.Matrix.1080p.mkv.gz'),
  err => {
    if (err) {
      console.error('파이프라인 실패', err);
    } else {
      console.log('파이프라인 성공');
    }
  }
);
```

```mjs
import { pipeline } from 'node:stream';
import fs from 'node:fs';
import zlib from 'node:zlib';

// 파이프라인 API를 사용하여 여러 스트림을 쉽게 연결하고
// 파이프라인이 완전히 완료되었을 때 알림을 받습니다.
// 잠재적으로 큰 비디오 파일을 효율적으로 gzip하는 파이프라인:

pipeline(
  fs.createReadStream('The.Matrix.1080p.mkv'),
  zlib.createGzip(),
  fs.createWriteStream('The.Matrix.1080p.mkv.gz'),
  err => {
    if (err) {
      console.error('파이프라인 실패', err);
    } else {
      console.log('파이프라인 성공');
    }
  }
);
```

또한 [`stream/promises`][] 모듈을 사용하여 `async` / `await`와 함께 파이프라인을 사용할 수 있습니다:

```cjs
const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');
const zlib = require('node:zlib');

async function run() {
  try {
    await pipeline(
      fs.createReadStream('The.Matrix.1080p.mkv'),
      zlib.createGzip(),
      fs.createWriteStream('The.Matrix.1080p.mkv.gz')
    );
    console.log('파이프라인 성공');
  } catch (err) {
    console.error('파이프라인 실패', err);
  }
}
```

```mjs
import { pipeline } from 'node:stream/promises';
import fs from 'node:fs';
import zlib from 'node:zlib';

async function run() {
  try {
    await pipeline(
      fs.createReadStream('The.Matrix.1080p.mkv'),
      zlib.createGzip(),
      fs.createWriteStream('The.Matrix.1080p.mkv.gz')
    );
    console.log('파이프라인 성공');
  } catch (err) {
    console.error('파이프라인 실패', err);
  }
}
```

## 너무 빠르게 전달되는 데이터

[`Readable`][] 스트림이 [`Writable`][]에게 데이터를 너무 빠르게 제공하는 경우가 있습니다—소비자가 처리할 수 있는 것보다 훨씬 더 많은 양이죠!

이런 일이 발생하면 소비자는 나중에 소비하기 위해 모든 데이터 청크를 큐에 쌓기 시작합니다. 쓰기 큐는 점점 길어지고, 이로 인해 전체 프로세스가 완료될 때까지 더 많은 데이터가 메모리에 유지되어야 합니다.

디스크에 쓰는 것은 디스크에서 읽는 것보다 훨씬 느리므로, 파일을 압축하고 하드 디스크에 쓰려고 할 때 백프레셔가 발생합니다. 이는 쓰기 디스크가 읽기 속도를 따라가지 못하기 때문입니다.

```js
// 스트림이 비밀리에 이렇게 말하고 있습니다: "우와, 우와! 잠깐, 이건 너무 많아!"
// `write`가 들어오는 데이터 흐름을 따라가려고 할 때 데이터 Buffer의 읽기 측에 데이터가 쌓이기 시작합니다.
inp.pipe(gzip).pipe(outputFile);
```

이것이 바로 백프레셔 메커니즘이 중요한 이유입니다. 백프레셔 시스템이 없다면, 프로세스가 시스템의 메모리를 모두 소모하게 되어 다른 프로세스를 느리게 만들고, 시스템의 큰 부분을 차지하게 됩니다.

이로 인해 다음과 같은 결과가 발생합니다:

- 현재 진행 중인 모든 프로세스가 느려짐
- 매우 과중한 가비지 컬렉터
- 메모리 고갈

다음 예제에서는 `.write()` 함수의 [리턴 값][]을 제거하고 `true`로 변경하여 Node.js 코어에서 백프레셔 지원을 비활성화합니다. '수정된' 바이너리에 대한 언급은 `return ret;` 라인 없이 `node` 바이너리를 실행하는 것을 의미하며, 대신 `return true;`로 교체한 것입니다.

## 가비지 컬렉션에 대한 과도한 부하

빠른 벤치마크를 살펴보겠습니다. 위와 같은 예제를 사용하여 두 바이너리에 대한 중간 시간을 측정했습니다.

```
trial (#) | `node` 바이너리 (ms) | 수정된 `node` 바이너리 (ms)
=================================================================
1 | 56924 | 55011
2 | 52686 | 55869
3 | 59479 | 54043
4 | 54473 | 55229
5 | 52933 | 59723
=================================================================
평균 시간: | 55299 | 55975
```

두 가지 모두 실행하는 데 약 1분이 걸리므로 큰 차이는 없지만, 우리의 의심이 맞는지 확인하기 위해 좀 더 자세히 살펴보겠습니다. 우리는 Linux 도구인 [`dtrace`][]를 사용하여 V8 가비지 컬렉터에서 무슨 일이 일어나고 있는지 평가합니다.

GC(가비지 컬렉터)가 측정한 시간은 가비지 컬렉터가 수행한 단일 스윕의 전체 주기를 나타냅니다:

```
approx. time (ms) | GC (ms) | 수정된 GC (ms)
=================================================
0 | 0 | 0
1 | 0 | 0
40 | 0 | 2
170 | 3 | 1
300 | 3 | 1

         *             *           *
         *             *           *
         *             *           *

      39000       |    6    |     26
      42000       |    6    |     21
      47000       |    5    |     32
      50000       |    8    |     28
      54000       |    6    |     35

```

두 프로세스는 동일하게 시작하고 같은 비율로 GC를 작동시키는 것처럼 보이지만, 몇 초 후에 제대로 작동하는 백프레셔 시스템이 자리 잡으면 GC 부하가 4-8 밀리초의 일관된 간격으로 퍼지기 시작합니다.

하지만 백프레셔 시스템이 없으면 V8 가비지 컬렉션이 지연되기 시작합니다. 정상 바이너리는 약 **75**번의 GC가 1분 동안 발생하는 반면, 수정된 바이너리는 **36**번만 발생합니다.

이것은 증가하는 메모리 사용량에서 발생하는 느리고 점진적인 부채입니다. 데이터가 전송될 때 백프레셔 시스템이 없으면 각 청크 전송에 대해 더 많은 메모리가 사용됩니다.

더 많은 메모리가 할당될수록 GC는 한 번의 스윕에서 처리해야 할 일이 많아집니다. 스윕이 클수록 GC는 무엇을 해제할 수 있을지 결정하는 데 더 많은 시간이 걸리며, 더 큰 메모리 공간에서 분리된 포인터를 스캔하는 데 더 많은 계산 능력을 소모합니다.

## 메모리 고갈

각 바이너리의 메모리 소비를 측정하기 위해 `/usr/bin/time -lp sudo ./node ./backpressure-example/zlib.js`를 사용하여 각 프로세스를 개별적으로 측정했습니다.

정상 바이너리의 출력은 다음과 같습니다:

```
Respecting the return value of .write()
=============================================
real 58.88
user 56.79
sys 8.79
87810048 maximum resident set size
0 average shared memory size
0 average unshared data size
0 average unshared stack size
19427 page reclaims
3134 page faults
0 swaps
5 block input operations
194 block output operations
0 messages sent
0 messages received
1 signals received
12 voluntary context switches
666037 involuntary context switches
```

가상 메모리에서 차지하는 최대 바이트 크기는 약 87.81 MB입니다.

이제 [`.write()`][] 함수의 [리턴 값][]을 변경하면:

```
Without respecting the return value of .write():
==================================================
real 54.48
user 53.15
sys 7.43
1524965376 maximum resident set size
0 average shared memory size
0 average unshared data size
0 average unshared stack size
373617 page reclaims
3139 page faults
0 swaps
18 block input operations
199 block output operations
0 messages sent
0 messages received
1 signals received
25 voluntary context switches
629566 involuntary context switches
```

가상 메모리에서 차지하는 최대 바이트 크기는 약 1.52 GB입니다.

백프레셔를 위임할 스트림이 없으면 할당되는 메모리 공간이 훨씬 더 커지며, 동일한 프로세스 간에 큰 차이를 보입니다!

이 실험은 Node.js의 백프레셔 메커니즘이 당신의 컴퓨팅 시스템에 얼마나 최적화되고 비용 효율적인지를 보여줍니다. 이제 어떻게 작동하는지 살펴보겠습니다!

## 백프레셔가 이러한 문제를 해결하는 방법은?

데이터를 한 프로세스에서 다른 프로세스로 전송하는 다양한 기능이 있습니다. Node.js에는 [`.pipe()`][]라는 내장 함수가 있습니다. [다른 패키지들][]도 사용할 수 있지만, 궁극적으로 이 과정의 기본 수준에서는 두 개의 별도 구성 요소가 있습니다: 데이터의 *출처*와 *소비자*입니다.

[`.pipe()`][]가 소스에서 호출되면 소비자에게 전송할 데이터가 있음을 알립니다. 파이프 함수는 이벤트 트리거에 대한 적절한 백프레셔 클로저를 설정하는 데 도움을 줍니다.

Node.js에서 소스는 [`Readable`][] 스트림이고 소비자는 [`Writable`][] 스트림입니다(이 두 가지는 [`Duplex`][] 또는 [`Transform`][] 스트림으로 교환될 수 있지만, 이는 이 가이드의 범위를 벗어납니다).

백프레셔가 트리거되는 순간은 [`Writable`][]의 [`.write()`][] 함수의 리턴 값에 정확히 일치합니다. 이 리턴 값은 여러 조건에 따라 결정됩니다.

데이터 Buffer가 [`highWaterMark`][]를 초과했거나 쓰기 큐가 현재 바쁜 경우, [`.write()`][]는 `false`를 반환합니다.

`false` 값이 반환되면 백프레셔 시스템이 작동하기 시작합니다. 이 시스템은 들어오는 [`Readable`][] 스트림이 데이터를 전송하는 것을 일시 중지하고 소비자가 다시 준비될 때까지 기다립니다. 데이터 Buffer가 비워지면 [`'drain'`][] 이벤트가 발생하고 들어오는 데이터 흐름이 재개됩니다.

큐가 완료되면 백프레셔가 데이터를 다시 보낼 수 있도록 허용합니다. 사용되고 있던 메모리 공간은 해제되어 다음 데이터 배치를 준비합니다.

이것은 [`.pipe()`][] 함수에 대해 항상 일정량의 메모리만 사용하도록 합니다. 메모리 누수가 없고, 무한 Buffer링이 없으며, 가비지 컬렉터는 메모리의 한 영역만 처리하면 됩니다!

그렇다면 백프레셔가 그렇게 중요하다면, 왜 여러분은 (아마도) 그것에 대해 들어본 적이 없을까요? 그 이유는 간단합니다: Node.js가 이 모든 것을 자동으로 처리해 주기 때문입니다.

정말 훌륭하죠! 하지만 사용자 정의 스트림을 구현하려고 할 때는 그렇게 좋지 않을 수 있습니다.

> 대부분의 머신에서는 Buffer가 가득 차는 시점을 결정하는 바이트 크기가 있습니다(이는 다양한 머신에서 달라질 수 있습니다). Node.js는 사용자 정의 [`highWaterMark`][]를 설정할 수 있도록 허용하지만, 일반적으로 기본값은 16KB(16384, 또는 객체 모드 스트림의 경우 16)로 설정되어 있습니다. 이 값을 높이고 싶다면 그렇게 하되 주의하세요!

## `.pipe()`의 생애 주기

백프레셔를 더 잘 이해하기 위해 [`Readable`][] 스트림이 [`Writable`][] 스트림에 [파이프되는(piped)][] 생애 주기에 대한 흐름 차트를 제시합니다:

```
+===================+
x--> Piping functions +--> src.pipe(dest) |
x are set up during |===================|
x the .pipe method. | Event callbacks |
+===============+ x |-------------------|
| Your Data | x They exist outside | .on('close', cb) |
+=======+=======+ x the data flow, but | .on('data', cb) |
| x importantly attach | .on('drain', cb) |
| x events, and their | .on('unpipe', cb) |
+---------v---------+ x respective callbacks. | .on('error', cb) |
| Readable Stream +----+ | .on('finish', cb) |
+-^-------^-------^-+ | | .on('end', cb) |
^ | ^ | +-------------------+
| | | |
| ^ | |
^ ^ ^ | +-------------------+ +=================+
^ | ^ +----> Writable Stream +---------> .write(chunk) |
| | | +-------------------+ +=======+=========+
| | | |
| ^ | +------------------v---------+
^ | +-> if (!chunk) | Is this chunk too big? |
^ | | emit .end(); | Is the queue busy? |
| | +-> else +-------+----------------+---+
| ^ | emit .write(); | |
| ^ ^ +--v---+ +---v---+
| | ^-----------------------------------< No | | Yes |
^ | +------+ +---v---+
^ | |
| ^ emit .pause(); +=================+ |
| ^---------------^-----------------------+ return false; <-----+---+
| +=================+ |
| |
^ when queue is empty +============+ |
^------------^-----------------------< Buffering | |
| |============| |
+> emit .drain(); | ^Buffer^ | |
+> emit .resume(); +------------+ |
| ^Buffer^ | |
+------------+ add chunk to queue |
| <---^---------------------<
+============+
```

> 만약 데이터 조작을 위해 여러 스트림을 체인으로 연결하는 파이프라인을 설정하고 있다면, 당신은 대부분 [`Transform`][] 스트림을 구현하게 될 것입니다.

이 경우, 당신의 [`Readable`][] 스트림에서 나오는 출력은 [`Transform`][]으로 들어가고, 다시 [`Writable`][]로 파이핑됩니다.

```js
Readable.pipe(Transformable).pipe(Writable);
```

백프레셔는 자동으로 적용되지만, [`Transform`][] 스트림의 들어오는 및 나가는 `highWaterMark`를 조작할 수 있으며, 이는 백프레셔 시스템에 영향을 미칩니다.

## 백프레셔 가이드라인

[Node.js v0.10][]부터, [`Stream`][] 클래스는 [`.read()`][] 또는 [`.write()`][]의 동작을 수정할 수 있는 기능을 제공했습니다. 이는 각각의 함수의 언더스코어 버전인 [`._read()`][]와 [`._write()`][]를 사용함으로써 가능합니다.

Readable 스트림 구현에 대한 [가이드라인][implementing Readable streams]과 Writable 스트림 구현에 대한 [가이드라인][implementing Writable streams]이 문서화되어 있습니다. 우리는 이들에 대해 읽어보았다고 가정하고, 다음 섹션에서는 좀 더 깊이 들어가겠습니다.

## 사용자 정의 스트림을 구현할 때 따라야 할 규칙

스트림의 황금 규칙은 **항상 백프레셔를 존중하는 것**입니다. 모순되는 관행이 아닌 최선의 관행이 무엇인지가 중요합니다. 내부 백프레셔 지원과 상충하는 행동을 피하기만 한다면, 당신은 좋은 관행을 따르고 있다고 확신할 수 있습니다.

일반적으로,

1. 요청받지 않았다면 절대 `.push()`를 하지 마십시오.
2. `.write()`가 false를 반환한 후에는 절대 호출하지 말고, 대신 'drain'을 기다리십시오.
3. 스트림은 Node.js 버전마다 변화하며, 사용하는 라이브러리 또한 마찬가지입니다. 주의 깊게 테스트하세요.

> 3번에 관해서, 브라우저 스트림을 구축하기 위한 매우 유용한 패키지는 [`readable-stream`][]입니다. Rodd Vagg는 이 라이브러리의 유용성을 설명하는 [훌륭한 블로그 포스트][]를 작성했습니다. 간단히 말해, 이 라이브러리는 [`Readable`][] 스트림에 대한 자동화된 우아한 저하를 제공하며, 구형 버전의 브라우저와 Node.js를 지원합니다.

## Readable 스트림에 특정한 규칙

지금까지 우리는 [`.write()`][]가 백프레셔에 미치는 영향을 살펴보았고, [`Writable`][] 스트림에 집중해왔습니다. Node.js의 기능 덕분에 데이터는 기술적으로 [`Readable`][]에서 [`Writable`][]로 흐릅니다. 그러나 데이터, 물질 또는 에너지가 전송될 때, 출처(source)가 목적지(destination)만큼 중요하다는 것을 관찰할 수 있습니다. [`Readable`][] 스트림은 백프레셔가 처리되는 방식에 필수적입니다.

이 두 프로세스는 효과적으로 통신하기 위해 서로 의존합니다. 만약 [`Readable`][]가 [`Writable`][] 스트림이 데이터 전송을 멈추라고 요청할 때 이를 무시하면, [`.write()`][]의 반환 값이 잘못될 때와 마찬가지로 문제가 발생할 수 있습니다.

따라서, [`.write()`][]의 반환을 존중하는 것 외에도, [`._read()`][] 메서드에서 사용되는 [`.push()`][]의 반환 값도 존중해야 합니다. [`.push()`][]가 false 값을 반환하면 스트림은 소스로부터 읽기를 멈춥니다. 그렇지 않으면 계속해서 중단 없이 진행됩니다.

잘못된 관행의 예를 들면 다음과 같습니다:

```js
// 이는 destination 스트림의 백프레셔 신호를 완전히 무시하므로 문제가 됩니다!
class MyReadable extends Readable {
  _read(size) {
    let chunk;
    while (null !== (chunk = getNextChunk())) {
      this.push(chunk);
    }
  }
}
```

또한, 사용자 정의 스트림 외부에서 백프레셔를 무시하는 것은 함정이 될 수 있습니다. 다음은 좋은 관행의 반대 예입니다. 애플리케이션의 코드는 데이터가 사용 가능한 대로 무조건적으로 전송됩니다(이는 [`'data'` 이벤트][]에 의해 신호됨):

```js
// 이는 Node.js가 설정한 백프레셔 메커니즘을 무시하고,
// destination 스트림이 준비되어 있는지 여부와 상관없이 데이터를 강제로 밀어넣습니다.
readable.on('data', data => writable.write(data));
```

여기 Readable 스트림과 함께 [`.push()`][]를 사용하는 좋은 예가 있습니다.

```cjs
const { Readable } = require('node:stream');

// 사용자 정의 Readable 스트림 생성
const myReadableStream = new Readable({
  objectMode: true,
  read(size) {
    // 스트림에 데이터를 푸시
    this.push({ message: 'Hello, world!' });
    this.push(null); // 스트림의 끝을 표시
  },
});

// 스트림 소비
myReadableStream.on('data', chunk => {
  console.log(chunk);
});

// 출력:
// { message: 'Hello, world!' }
```

```mjs
import { Readable } from 'node:stream';

// 사용자 정의 Readable 스트림 생성
const myReadableStream = new Readable({
  objectMode: true,
  read(size) {
    // 스트림에 데이터를 푸시
    this.push({ message: 'Hello, world!' });
    this.push(null); // 스트림의 끝을 표시
  },
});

// 스트림 소비
myReadableStream.on('data', chunk => {
  console.log(chunk);
});

// 출력:
// { message: 'Hello, world!' }
```

이 예제에서는 단일 객체를 스트림에 푸시하는 사용자 정의 Readable 스트림을 생성합니다.
[`.push()`][]를 사용하여 스트림에 데이터를 푸시하며,
스트림이 데이터를 소비할 준비가 되었을 때 [`._read()`][] 메서드가 호출됩니다.
이 경우, 우리는 즉시 데이터를 스트림에 푸시하고 null을 푸시하여 스트림의 끝을 표시합니다.

그 다음, 'data' 이벤트를 듣고 스트림에 푸시된 각 데이터 청크를 로그로 출력합니다.
이 경우, 우리는 스트림에 단일 데이터 청크만 푸시하므로, 로그 메시지도 하나만 출력됩니다.

## Writable 스트림에 대한 규칙

[`.write()`][]는 특정 조건에 따라 true 또는 false를 반환할 수 있음을 기억하세요.
운 좋게도, 우리가 자신의 [`Writable`][] 스트림을 구축할 때,
[`stream state machine`][]이 콜백을 처리하고 백프레셔를 관리하며 데이터 흐름을 최적화해 줍니다.

그러나 우리가 [`Writable`][]을 직접 사용하려고 할 때,
[`.write()`][] 반환 값을 존중하고 이러한 조건에 주의해야 합니다:

- 쓰기 대기열이 바쁠 경우, [`.write()`][]는 false를 반환합니다.
- 데이터 청크가 너무 클 경우, [`.write()`][]는 false를 반환합니다 (제한은 [`highWaterMark`][] 변수로 표시됨).

```js
// 이 writable은 JavaScript 콜백의 비동기적 특성 때문에 유효하지 않습니다.
// 마지막 이전에 각 콜백에 대한 반환 문이 없으면,
// 여러 콜백이 호출될 가능성이 높습니다.
class MyWritable extends Writable {
  _write(chunk, encoding, callback) {
    if (chunk.toString().indexOf('a') >= 0) callback();
    else if (chunk.toString().indexOf('b') >= 0) callback();
    callback();
  }
}

// 이 방법을 올바르게 작성하려면:
if (chunk.contains('a')) return callback();
if (chunk.contains('b')) return callback();
callback();
```

[`._writev()`][]를 구현할 때 주의해야 할 사항도 있습니다.
이 함수는 [`.cork()`][]와 연결되어 있지만,
작성할 때 흔히 발생하는 실수가 있습니다:

```js
// 여기서 .uncork()를 두 번 사용하면 C++ 레이어에서 두 번 호출이 발생하여
// cork/uncork 기술이 무용지물이 됩니다.
ws.cork();
ws.write('hello ');
ws.write('world ');
ws.uncork();

ws.cork();
ws.write('from ');
ws.write('Matteo');
ws.uncork();

// 올바르게 작성하는 방법은 process.nextTick()을 사용하여
// 다음 이벤트 루프에서 실행되도록 하는 것입니다.
ws.cork();
ws.write('hello ');
ws.write('world ');
process.nextTick(doUncork, ws);

ws.cork();
ws.write('from ');
ws.write('Matteo');
process.nextTick(doUncork, ws);

// 전역 함수로.
function doUncork(stream) {
  stream.uncork();
}
```

[`.cork()`][]는 원하는 만큼 호출할 수 있으며,
[`.uncork()`][]도 같은 만큼 호출해야 다시 흐르게 됩니다.

## 결론

스트림은 Node.js에서 자주 사용되는 모듈입니다.
이들은 내부 구조와 개발자들이 Node.js 모듈 생태계에서 확장하고 연결하는 데 중요합니다.

이제 여러분은 백프레셔를 염두에 두고 자신의 [`Writable`][] 및 [`Readable`][] 스트림을 안전하게 코딩하고
동료 및 친구들과 지식을 공유할 수 있을 것입니다.

[`Stream`][]에 대해 더 읽어보아야 하며,
Node.js로 애플리케이션을 구축할 때 스트리밍 기능을 개선하고 활용하는 데 도움이 되는
다른 API 함수들을 확인해 보세요.

[`Stream`]: https://nodejs.org/api/stream.html
[`Buffer`]: https://nodejs.org/api/buffer.html
[`EventEmitters`]: https://nodejs.org/api/events.html
[`Writable`]: https://nodejs.org/api/stream.html#stream_writable_streams
[`Readable`]: https://nodejs.org/api/stream.html#stream_readable_streams
[`Duplex`]: https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams
[`Transform`]: https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams
[`zlib`]: https://nodejs.org/api/zlib.html
[`'drain'`]: https://nodejs.org/api/stream.html#stream_event_drain
[`'data'` 이벤트]: https://nodejs.org/api/stream.html#stream_event_data
[`.read()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_read_size
[`.write()`]: https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback
[`._read()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_read_size_1
[`._write()`]: https://nodejs.org/docs/latest/api/stream.html#stream_writable_write_chunk_encoding_callback_1
[`._writev()`]: https://nodejs.org/api/stream.html#stream_writable_writev_chunks_callback
[`.cork()`]: https://nodejs.org/api/stream.html#writablecork
[`.uncork()`]: https://nodejs.org/api/stream.html#stream_writable_uncork
[`.push()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_push_chunk_encoding
[Writable 스트림 구현하기]: https://nodejs.org/docs/latest/api/stream.html#stream_implementing_a_writable_stream
[Readable 스트림 구현하기]: https://nodejs.org/docs/latest/api/stream.html#stream_implementing_a_readable_stream
[다른 패키지들]: https://github.com/sindresorhus/awesome-nodejs#streams
[`백프레셔`]: https://en.wikipedia.org/wiki/Backpressure_routing
[Node.js v0.10]: https://nodejs.org/docs/v0.10.0/
[`highWaterMark`]: https://nodejs.org/api/stream.html#stream_buffering
[리턴 값]: https://github.com/nodejs/node/blob/55c42bc6e5602e5a47fb774009cfe9289cb88e71/lib/_stream_writable.js#L239
[`readable-stream`]: https://github.com/nodejs/readable-stream
[훌륭한 블로그 포스트]: https://r.va.gg/2014/06/why-i-dont-use-nodes-core-stream-module.html
[`dtrace`]: https://dtrace.org/about/
[`zip(1)`]: https://linux.die.net/man/1/zip
[`gzip(1)`]: https://linux.die.net/man/1/gzip
[`stream state machine`]: https://en.wikipedia.org/wiki/Finite-state_machine
[`.pipe()`]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_pipe_destination_options
[파이프되는(piped)]: https://nodejs.org/docs/latest/api/stream.html#stream_readable_pipe_destination_options
[`pump`]: https://github.com/mafintosh/pump
[`pipeline`]: https://nodejs.org/api/stream.html#stream_stream_pipeline_streams_callback
[`stream/promises`]: https://nodejs.org/api/stream.html#streampipelinesource-transforms-destination-options
