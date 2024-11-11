---
title: Node.js 애플리케이션 프로파일링
layout: learn
---

# Node.js 애플리케이션 프로파일링

Node.js 애플리케이션을 프로파일링하기 위한 많은 서드파티 도구가 있지만, 대부분의 경우 가장 쉬운 옵션은 Node.js 내장 프로파일러를 사용하는 것입니다. 내장 프로파일러는 프로그램 실행 중에 정기적으로 스택을 샘플링하는 [V8 내부 프로파일러][]를 사용합니다. 이 프로파일러는 JIT 컴파일과 같은 중요한 최적화 이벤트와 함께 이러한 샘플의 결과를 틱(tick)이라는 일련의 기록으로 저장합니다:

```
code-creation,LazyCompile,0,0x2d5000a337a0,396,"bp native array.js:1153:16",0x289f644df68,~
code-creation,LazyCompile,0,0x2d5000a33940,716,"hasOwnProperty native v8natives.js:198:30",0x289f64438d0,~
code-creation,LazyCompile,0,0x2d5000a33c20,284,"ToName native runtime.js:549:16",0x289f643bb28,~
code-creation,Stub,2,0x2d5000a33d40,182,"DoubleToIStub"
code-creation,Stub,2,0x2d5000a33e00,507,"NumberToStringStub"
```

과거에는 이 틱을 해석하기 위해 V8 소스 코드가 필요했습니다. 다행히도 Node.js 4.4.0 이후로는 V8을 소스에서 별도로 빌드하지 않고도 이 정보를 소비할 수 있는 도구들이 도입되었습니다. 이제 내장 프로파일러가 애플리케이션 성능에 대한 통찰력을 제공하는 데 어떻게 도움이 되는지 살펴보겠습니다.

틱 프로파일러의 사용을 설명하기 위해 간단한 Express 애플리케이션을 가지고 작업하겠습니다. 우리의 애플리케이션은 새로운 사용자를 시스템에 추가하는 핸들러 하나와 사용자 인증 시도를 검증하는 핸들러 하나를 가질 것입니다:

```js
app.get('/newUser', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || users[username]) {
    return res.sendStatus(400);
  }

  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');

  users[username] = { salt, hash };

  res.sendStatus(200);
});
```

또한 사용자 인증 시도를 검증하는 핸들러는 다음과 같습니다:

```js
app.get('/auth', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || !users[username]) {
    return res.sendStatus(400);
  }

  const { salt, hash } = users[username];
  const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');

  if (crypto.timingSafeEqual(hash, encryptHash)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});
```

_이것들은 **Node.js** 애플리케이션에서 사용자 인증을 위한 권장 핸들러가 아니며, 순전히 예시 목적으로 사용됩니다. 일반적으로 자체적으로 암호화 인증 메커니즘을 설계하려고 하지 않는 것이 좋습니다. 기존의 검증된 인증 솔루션을 사용하는 것이 훨씬 더 낫습니다._

이제 애플리케이션을 배포했다고 가정하고, 사용자가 요청 시 높은 지연 시간에 대해 불평하고 있습니다. 우리는 내장된 프로파일러로 쉽게 앱을 실행할 수 있습니다:

```
NODE_ENV=production node --prof app.js
```

그리고 `ab`(ApacheBench)를 사용하여 서버에 부하를 걸 수 있습니다:

```
curl -X GET "http://localhost:8080/newUser?username=matt&password=password"
ab -k -c 20 -n 250 "http://localhost:8080/auth?username=matt&password=password"
```

`ab`의 출력 결과는 다음과 같습니다:

```
동시성 수준:         20
테스트 완료 시간:     46.932 초
완료된 요청:         250
실패한 요청:         0
Keep-Alive 요청:     250
총 전송량:           50250 바이트
HTML 전송량:         500 바이트
초당 요청 수:        5.33 [#/초] (평균)
요청당 시간:         3754.556 [ms] (평균)
요청당 시간:         187.728 [ms] (동시 요청 전체에 대한 평균)
전송 속도:           1.05 [Kbytes/초] 수신

...

일정 시간(ms) 내에 처리된 요청의 비율
  50%   3755
  66%   3804
  75%   3818
  80%   3825
  90%   3845
  95%   3858
  98%   3874
  99%   3875
 100%   4225 (가장 긴 요청)
```

이 출력에서 우리는 초당 약 5개의 요청만 처리하고 있으며, 평균 요청 시간이 약 4초 정도 걸린다는 것을 알 수 있습니다. 실제 예제에서는 사용자 요청을 처리하는 많은 함수에서 작업이 이루어질 수 있지만, 이 간단한 예제에서도 정규 표현식을 컴파일하거나, 랜덤 솔트를 생성하거나, 사용자 비밀번호에서 고유 해시를 생성하거나, Express 프레임워크 내부에서 시간이 소요될 수 있습니다.

`--prof` 옵션을 사용하여 애플리케이션을 실행했으므로 애플리케이션을 로컬로 실행한 디렉터리에 `isolate-0xnnnnnnnnnnnn-v8.log` 형식의 ticks 파일이 생성되었습니다(`n`은 숫자).

이 파일을 이해하려면 Node.js 바이너리에 번들로 제공된 ticks 프로세서를 사용해야 합니다. 프로세서를 실행하려면 `--prof-process` 플래그를 사용합니다:

```
node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt
```

`processed.txt` 파일을 텍스트 편집기에서 열면 다양한 종류의 정보를 얻을 수 있습니다. 파일은 섹션별로 나누어지며, 각 섹션은 언어별로 다시 나누어집니다. 먼저 요약 섹션을 보면 다음과 같습니다:

```
 [요약]:
   ticks  전체   nonlib   이름
     79    0.2%    0.2%  JavaScript
  36703   97.2%   99.2%  C++
      7    0.0%    0.0%  GC
    767    2.0%          공유 라이브러리
    215    0.6%          미계정
```

이것은 수집된 모든 샘플의 97%가 C++ 코드에서 발생했음을 알려주며, 처리된 출력의 다른 섹션을 볼 때 JavaScript보다는 C++에서 수행되는 작업에 가장 주의를 기울여야 함을 의미합니다. 이를 염두에 두고 C++ 섹션을 찾아 가장 많은 CPU 시간을 소비하는 C++ 함수에 대한 정보를 보면 다음과 같습니다:

```
 [C++]:
   ticks  전체   nonlib   이름
  19557   51.8%   52.9%  node::crypto::PBKDF2(v8::FunctionCallbackInfo<v8::Value> const&)
   4510   11.9%   12.2%  _sha1_block_data_order
   3165    8.4%    8.6%  _malloc_zone_malloc
```

상위 3개의 항목이 프로그램에서 소요된 CPU 시간의 72.1%를 차지하고 있음을 알 수 있습니다. 이 출력에서 사용자 비밀번호에서 해시를 생성하는 작업이 CPU 시간의 최소 51.8%를 차지한다는 것을 바로 알 수 있습니다. 그러나 하위 두 항목이 애플리케이션에서 어떤 역할을 하는지 명확하지 않을 수 있습니다(또는 예시를 위해 그렇지 않은 것처럼 가정하겠습니다). 이러한 함수 간의 관계를 더 잘 이해하기 위해 다음으로 [하위 프로파일] 섹션을 살펴보면 각 함수의 주요 호출자에 대한 정보를 제공합니다. 이 섹션을 살펴보면:

```
   ticks 부모   이름
  19557   51.8%  node::crypto::PBKDF2(v8::FunctionCallbackInfo<v8::Value> const&)
  19557  100.0%    v8::internal::Builtins::~Builtins()
  19557  100.0%      LazyCompile: ~pbkdf2 crypto.js:557:16

   4510   11.9%  _sha1_block_data_order
   4510  100.0%    LazyCompile: *pbkdf2 crypto.js:557:16
   4510  100.0%      LazyCompile: *exports.pbkdf2Sync crypto.js:552:30

   3165    8.4%  _malloc_zone_malloc
   3161   99.9%    LazyCompile: *pbkdf2 crypto.js:557:16
   3161  100.0%      LazyCompile: *exports.pbkdf2Sync crypto.js:552:30
```

이 섹션을 구문 분석하는 데는 위의 ticks 카운트보다 더 많은 작업이 필요합니다. 위의 각 "호출 스택"에서 부모 열의 비율은 이전 행에서 함수가 현재 행의 함수에 의해 호출된 샘플의 비율을 나타냅니다. 예를 들어, `_sha1_block_data_order`에 대한 중간 호출 스택에서 `_sha1_block_data_order`가 샘플의 11.9%에서 발생했음을 알 수 있으며, 이는 위의 원시 카운트에서 이미 알고 있었습니다. 그러나 여기서는 항상 Node.js 암호 모듈 내부의 pbkdf2 함수에 의해 호출되었음을 알 수 있습니다. 마찬가지로 `_malloc_zone_malloc`도 거의 독점적으로 동일한 pbkdf2 함수에 의해 호출되었습니다. 따라서 이 보기를 사용하여 비밀번호 기반 해시 계산이 위에서 언급한 51.8%뿐만 아니라 상위 3개의 가장 많이 샘플링된 함수의 모든 CPU 시간을 차지했음을 알 수 있습니다. 왜냐하면 `_sha1_block_data_order` 및 `_malloc_zone_malloc`에 대한 호출은 pbkdf2 함수에 의해 이루어졌기 때문입니다.

이 시점에서 비밀번호 기반 해시 생성이 최적화의 대상이 되어야 한다는 것이 매우 분명해졌습니다. 다행히도, 여러분은 [비동기 프로그래밍의 장점][비동기 프로그래밍의 장점]을 완전히 내면화했으며 비밀번호에서 해시를 생성하는 작업이 동기적으로 수행되고 있어 이벤트 루프를 차단하고 있음을 깨닫게 됩니다. 이는 해시를 계산하는 동안 다른 들어오는 요청을 처리하는 것을 방해합니다.

이 문제를 해결하기 위해 위의 핸들러를 약간 수정하여 pbkdf2 함수의 비동기 버전을 사용합니다:

```js
app.get('/auth', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || !users[username]) {
    return res.sendStatus(400);
  }

  crypto.pbkdf2(
    password,
    users[username].salt,
    10000,
    512,
    'sha512',
    (err, hash) => {
      if (users[username].hash.toString() === hash.toString()) {
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    }
  );
});
```

위의 비동기 버전으로 앱을 다시 실행한 후 `ab` 벤치마크 결과는 다음과 같습니다:

```
동시성 수준:         20
테스트 완료 시간:     12.846 초
완료된 요청:         250
실패한 요청:         0
Keep-Alive 요청:     250
총 전송량:           50250 바이트
HTML 전송량:         500 바이트
초당 요청 수:        19.46 [#/초] (평균)
요청당 시간:         1027.689 [ms] (평균)
요청당 시간:         51.384 [ms] (동시 요청 전체에 대한 평균)
전송 속도:           3.82 [Kbytes/초] 수신

...

일정 시간(ms) 내에 처리된 요청의 비율
  50%   1018
  66%   1035
  75%   1041
  80%   1043
  90%   1049
  95%   1063
  98%   1070
  99%   1071
 100%   1079 (가장 긴 요청)
```

와! 이제 앱이 초당 약 20개의 요청을 처리하고 있으며, 이는 동기 해시 생성과 비교하여 약 4배 더 빠릅니다. 또한 평균 지연 시간은 이전의 4초에서 1초 이상으로 감소했습니다.

이 (인위적인) 예시를 통해 V8 ticks 프로세서를 사용하여 Node.js 애플리케이션의 성능을 더 잘 이해할 수 있는 방법을 배울 수 있었기를 바랍니다.

또한 [플레임 그래프 생성 방법][diagnostics flamegraph]도 유용할 수 있습니다.

[V8 내부 프로파일러]: https://v8.dev/docs/profile
[비동기 프로그래밍의 장점]: https://nodesource.com/blog/why-asynchronous
[diagnostics flamegraph]: /learn/diagnostics/flame-graphs
