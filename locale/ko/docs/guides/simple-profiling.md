---
title: Node.js 애플리케이션의 간단한 프로파일링
layout: docs.hbs
---

<!--
# Easy profiling for Node.js Applications

There are many third party tools available for profiling Node.js applications
but, in many cases, the easiest option is to use the Node.js built in profiler.
The built in profiler uses the [profiler inside V8][] which samples the stack at
regular intervals during program execution. It records the results of these
samples, along with important optimization events such as jit compiles, as a
series of ticks:

```
code-creation,LazyCompile,0,0x2d5000a337a0,396,"bp native array.js:1153:16",0x289f644df68,~
code-creation,LazyCompile,0,0x2d5000a33940,716,"hasOwnProperty native v8natives.js:198:30",0x289f64438d0,~
code-creation,LazyCompile,0,0x2d5000a33c20,284,"ToName native runtime.js:549:16",0x289f643bb28,~
code-creation,Stub,2,0x2d5000a33d40,182,"DoubleToIStub"
code-creation,Stub,2,0x2d5000a33e00,507,"NumberToStringStub"
```
-->

# Node.js 애플리케이션의 간단한 프로파일링

Node.js 애플리케이션을 프로파일링하는 서드파티 도구들이 많이 있지만, 대부분은 Node.js에 내장된
프로파일러를 사용하는 것인 가장 쉬운 방법입니다. 내장된 프로파일러는 프로그램을 실행하는 동안 주기적으로
스택을 샘플링하는 [V8 내의 프로파일러][]를 사용합니다. 이 샘플링 결과를 기록하면서 jit 컴파일이나
tick 시리즈처럼 중요한 최적화 작업을 기록합니다.

```
code-creation,LazyCompile,0,0x2d5000a337a0,396,"bp native array.js:1153:16",0x289f644df68,~
code-creation,LazyCompile,0,0x2d5000a33940,716,"hasOwnProperty native v8natives.js:198:30",0x289f64438d0,~
code-creation,LazyCompile,0,0x2d5000a33c20,284,"ToName native runtime.js:549:16",0x289f643bb28,~
code-creation,Stub,2,0x2d5000a33d40,182,"DoubleToIStub"
code-creation,Stub,2,0x2d5000a33e00,507,"NumberToStringStub"
```

<!--
In the past, you needed the V8 source code to be able to interpret the ticks.
Luckily, tools have been introduced since Node.js 4.4.0 that facilitate the
consumption of this information without separately building V8 from source.
Let's see how the built-in profiler can help provide insight into application
performance.

To illustrate the use of the tick profiler, we will work with a simple Express
application. Our application will have two handlers, one for adding new users to
our system:
-->

이전에는 tick을 해석하려면 V8 소스 코드가 필요했습니다. 다행히, 소스에서 V8 빌드를 따로 하지 않고
이 정보를 사용할 수 있는 도구가 Node.js 4.4.0부터 도입되었습니다. 애플리케이션의 성능을
볼 수 있는 내장된 프로파일러를 어떻게 사용하는지 살펴보겠습니다.

tick 프로파일러의 사용방법을 설명하기 위해 간단한 Express 애플리케이션을 만들어 보겠습니다.
예제 애플리케이션은 2개의 핸들러를 가지고 있는데 하나는 새로운 사용자를 시스템에 추가할 것입니다.

<!--
```javascript
app.get('/newUser', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || users.username) {
    return res.sendStatus(400);
  }

  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');

  users[username] = { salt, hash };

  res.sendStatus(200);
});
```

and another for validating user authentication attempts:
-->

```javascript
app.get('/newUser', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || users.username) {
    return res.sendStatus(400);
  }

  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');

  users[username] = { salt, hash };

  res.sendStatus(200);
});
```

다른 핸들러는 사용자 인증의 유효성을 검사합니다.

<!--
```javascript
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
-->

```javascript
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

<!--
*Please note that these are NOT recommended handlers for authenticating users in
your Node.js applications and are used purely for illustration purposes. You
should not be trying to design your own cryptographic authentication mechanisms
in general. It is much better to use existing, proven authentication solutions.*

Now assume that we've deployed our application and users are complaining about
high latency on requests. We can easily run the app with the built in profiler:

```
NODE_ENV=production node --prof app.js
```

and put some load on the server using `ab` (ApacheBench):

```
curl -X GET "http://localhost:8080/newUser?username=matt&password=password"
ab -k -c 20 -n 250 "http://localhost:8080/auth?username=matt&password=password"
```

and get an ab output of:
-->

*Node.js 애플리케이션에서 사용자 인증을 처리하는 핸들러는 추천하지 않는 방법이고 여기서는 예시를
보여주기 위해서 사용한 것뿐입니다. 보통은 직접 만든 인증 메커니즘을 설계하지 말아야 합니다.
기존에 존재하는 입증된 인증솔루션을 사용하는 것이 훨씬 낫습니다.*

배포한 애플리케이션에서 사용자가 요청에 지연이 발생한다고 불평한다고 가정해 보겠습니다.
내장된 프로파일러로 애플리케이션을 간단히 실행할 수 있습니다.

```
NODE_ENV=production node --prof app.js
```

`ab`(ApacheBench)로 서버에 부하를 줄 수 있습니다.

```
curl -X GET "http://localhost:8080/newUser?username=matt&password=password"
ab -k -c 20 -n 250 "http://localhost:8080/auth?username=matt&password=password"
```

다음과 같은 결과가 나올 것입니다.

<!--
```
Concurrency Level:      20
Time taken for tests:   46.932 seconds
Complete requests:      250
Failed requests:        0
Keep-Alive requests:    250
Total transferred:      50250 bytes
HTML transferred:       500 bytes
Requests per second:    5.33 [#/sec] (mean)
Time per request:       3754.556 [ms] (mean)
Time per request:       187.728 [ms] (mean, across all concurrent requests)
Transfer rate:          1.05 [Kbytes/sec] received

...

Percentage of the requests served within a certain time (ms)
  50%   3755
  66%   3804
  75%   3818
  80%   3825
  90%   3845
  95%   3858
  98%   3874
  99%   3875
 100%   4225 (longest request)
```
-->

```
Concurrency Level:      20
Time taken for tests:   46.932 seconds
Complete requests:      250
Failed requests:        0
Keep-Alive requests:    250
Total transferred:      50250 bytes
HTML transferred:       500 bytes
Requests per second:    5.33 [#/sec] (mean)
Time per request:       3754.556 [ms] (mean)
Time per request:       187.728 [ms] (mean, across all concurrent requests)
Transfer rate:          1.05 [Kbytes/sec] received

...

Percentage of the requests served within a certain time (ms)
  50%   3755
  66%   3804
  75%   3818
  80%   3825
  90%   3845
  95%   3858
  98%   3874
  99%   3875
 100%   4225 (longest request)
```

<!--
From this output, we see that we're only managing to serve about 5 requests per
second and that the average request takes just under 4 seconds round trip. In a
real world example, we could be doing lots of work in many functions on behalf
of a user request but even in our simple example, time could be lost compiling
regular expressions, generating random salts, generating unique hashes from user
passwords, or inside the Express framework itself.

Since we ran our application using the `--prof` option, a tick file was generated
in the same directory as your local run of the application. It should have the
form `isolate-0xnnnnnnnnnnnn-v8.log` (where `n` is a digit).

In order to make sense of this file, we need to use the tick processor bundled
with the Node.js binary. To run the processor, use the `--prof-process` flag:

```
node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt
```
-->

이 결과를 보면 초당 5건의 요청만 처리할 수 있고 한 요청당 4초 미만의 시간이 걸리는 것을 알 수 있습니다.
실제 애플리케이션에서는 요청을 처리할 때 많은 함수에서 다량의 작업이 일어날 수 있지만, 이 간단한
예시에서도 정규표현식을 해석하고 임의의 솔트를 만들고 사용자 비밀번호에서 유일한 해시값을 만들고
Express 프레임워크 내부 작업을 진행하기 위해 시간이 소비됩니다.

`--prof` 옵션으로 애플리케이션을 실행했으므로 애플리케이션을 실행한 디렉터리에 tick 파일이 생성됩니다.
파일명은 `isolate-0xnnnnnnnnnnnn-v8.log`(여기서 `n`은 숫자입니다.) 같은 형식일 것입니다.

이 파일을 이해하려면 Node.js 바이너리에 포함된 tick 프로세서를 사용해야 합니다.
`--prof-process` 플래그로 tick 프로세서를 실행할 수 있습니다.

```
node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt
```

<!--
Opening processed.txt in your favorite text editor will give you a few different
types of information. The file is broken up into sections which are again broken
up by language. First, we look at the summary section and see:

```
 [Summary]:
   ticks  total  nonlib   name
     79    0.2%    0.2%  JavaScript
  36703   97.2%   99.2%  C++
      7    0.0%    0.0%  GC
    767    2.0%          Shared libraries
    215    0.6%          Unaccounted
```
-->

사용하는 텍스트 에디터에서 processed.txt를 열면 몇 가지 정보를 볼 수 있습니다.
파일은 언어로 구분된 단위로 나누어져 있습니다. 우선 요약 부분을 보겠습니다.

```
 [Summary]:
   ticks  total  nonlib   name
     79    0.2%    0.2%  JavaScript
  36703   97.2%   99.2%  C++
      7    0.0%    0.0%  GC
    767    2.0%          Shared libraries
    215    0.6%          Unaccounted
```

<!--
This tells us that 97% of all samples gathered occurred in C++ code and that
when viewing other sections of the processed output we should pay most attention
to work being done in C++ (as opposed to JavaScript). With this in mind, we next
find the [C++] section which contains information about which C++ functions are
taking the most CPU time and see:

```
 [C++]:
   ticks  total  nonlib   name
  19557   51.8%   52.9%  node::crypto::PBKDF2(v8::FunctionCallbackInfo<v8::Value> const&)
   4510   11.9%   12.2%  _sha1_block_data_order
   3165    8.4%    8.6%  _malloc_zone_malloc
```
-->

이 부분을 보면 C++ 코드에서 수집된 샘플이 97%를 차지하는 것을 볼 수 있으므로 처리된 결과에서
다른 부분을 볼 때 C++에서 이뤄진 작업에 대부분의 관심을 기울여야 합니다.(JavaScript 대비)
그래서 C++ 함수가 대부분의 CPU 시간을 차지한 정보를 담고 있는 [C++] 부분을 찾아볼 것입니다.

```
 [C++]:
   ticks  total  nonlib   name
  19557   51.8%   52.9%  node::crypto::PBKDF2(v8::FunctionCallbackInfo<v8::Value> const&)
   4510   11.9%   12.2%  _sha1_block_data_order
   3165    8.4%    8.6%  _malloc_zone_malloc
```

<!--
We see that the top 3 entries account for 72.1% of CPU time taken by the
program. From this output, we immediately see that at least 51.8% of CPU time is
taken up by a function called PBKDF2 which corresponds to our hash generation
from a user's password. However, it may not be immediately obvious how the lower
two entries factor into our application (or if it is we will pretend otherwise
for the sake of example). To better understand the relationship between these
functions, we will next look at the [Bottom up (heavy) profile] section which
provides information about the primary callers of each function. Examining this
section, we find:

```
   ticks parent  name
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
-->

프로그램에서 72.1%의 CPU 시간을 차지한 3개의 작업을 보겠습니다. 이 결과를 보면 사용자 비밀번호에서
해시를 생성하는 PBKDF2 함수 호출이 최소 51.8%의 CPU 시간을 차지한 것을 바로 눈치챌 수 있습니다.
하지만 더 낮은 비율을 가진 두 부분은 애플리케이션의 어떤 부분인지 바로 알 수 없습니다.(아니면
예제를 위해서 그런 척 할 것입니다.) 이러한 함수 간의 관계를 더 이해하려면 각 함수의 주요 호출자 정보를
제공하는 [Bottom up (heavy) profile] 부분을 봐야 합니다.
이 부분을 찾아보면 다음과 같이 나와 있습니다.

```
   ticks parent  name
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

<!--
Parsing this section takes a little more work than the raw tick counts above.
Within each of the "call stacks" above, the percentage in the parent column
tells you the percentage of samples for which the function in the row above was
called by the function in the current row. For example, in the middle "call
stack" above for _sha1_block_data_order, we see that `_sha1_block_data_order` occurred
in 11.9% of samples, which we knew from the raw counts above. However, here, we
can also tell that it was always called by the pbkdf2 function inside the
Node.js crypto module. We see that similarly, `_malloc_zone_malloc` was called
almost exclusively by the same pbkdf2 function. Thus, using the information in
this view, we can tell that our hash computation from the user's password
accounts not only for the 51.8% from above but also for all CPU time in the top
3 most sampled functions since the calls to `_sha1_block_data_order` and
`_malloc_zone_malloc` were made on behalf of the pbkdf2 function.

At this point, it is very clear that the password based hash generation should
be the target of our optimization. Thankfully, you've fully internalized the
[benefits of asynchronous programming][] and you realize that the work to
generate a hash from the user's password is being done in a synchronous way and
thus tying down the event loop. This prevents us from working on other incoming
requests while computing a hash.
-->

이 섹션을 분석하려면 위에 나온 tick 횟수보다는 약간 더 작업이 필요합니다. 위에 나온 각
"호출 스택(call stacks)"에서 parent에 나온 퍼센티지는 현재 줄에 있는 함수가 호출한
바로 윗 줄의 함수가 차지하는 비율을 알려줍니다. 예를 들어 중간에 있는 _sha1_block_data_order의
"호출 스택"에서 _sha1_block_data_order가 샘플에서 11.9%를 차지한다는 것을 알 수 있고
이는 횟수에서 나온 값이라는 것을 알 수 있습니다. 하지만 여기서 이 함수는 항상 Node.js crypto 모듈의
pbkdf2 함수가 호출한다고도 할 수 있습니다. 비슷하게 _malloc_zone_malloc도 같은 pbkdf2 함수가
거의 전적으로 호출한다는 것을 알 수 있습니다. 그러므로 이 관점으로 얻은 정보를 사용하면
_sha1_block_data_order과 _malloc_zone_malloc가 pbkdf2 함수에 의해서 호출되었으므로
사용자 비밀번호의 해시 계산이 앞에서 본 51.8%뿐 아니라 상위 3개의 모든 CPU 시간을
차지한다는 것을 알 수 있습니다.

이 관점으로 보면 비밀번호에 기반을 둔 해시 생성이 최적화 대상이 되어야 한다는 것이 아주 명확합니다.
고맙게도 [비동기 프로그래밍의 장점][]을 완전히 이해하고 있고 사용자 비밀번호에서 해시를 생성하는 과정이
동기로 진행된다는 것을 알 수 있으므로 이를 이벤트 루프로 바꾸면 됩니다.
이는 해시를 계산하는 동안 들어오는 다른 요청을 처리할 수 있게 합니다.

<!--
To remedy this issue, you make a small modification to the above handlers to use
the asynchronous version of the pbkdf2 function:

```javascript
app.get('/auth', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || !users[username]) {
    return res.sendStatus(400);
  }

  crypto.pbkdf2(password, users[username].salt, 10000, 512, 'sha512', (err, hash) => {
    if (users[username].hash.toString() === hash.toString()) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });
});
```
-->

이 이슈를 처리하려면 pdkdf2 함수의 비동기 버전을 사용하도록 핸들러를 수정하면 됩니다.

```javascript
app.get('/auth', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || !users[username]) {
    return res.sendStatus(400);
  }

  crypto.pbkdf2(password, users[username].salt, 10000, 512, (err, hash) => {
    if (users[username].hash.toString() === hash.toString()) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });
});
```

<!--
A new run of the ab benchmark above with the asynchronous version of your app
yields:

```
Concurrency Level:      20
Time taken for tests:   12.846 seconds
Complete requests:      250
Failed requests:        0
Keep-Alive requests:    250
Total transferred:      50250 bytes
HTML transferred:       500 bytes
Requests per second:    19.46 [#/sec] (mean)
Time per request:       1027.689 [ms] (mean)
Time per request:       51.384 [ms] (mean, across all concurrent requests)
Transfer rate:          3.82 [Kbytes/sec] received

...

Percentage of the requests served within a certain time (ms)
  50%   1018
  66%   1035
  75%   1041
  80%   1043
  90%   1049
  95%   1063
  98%   1070
  99%   1071
 100%   1079 (longest request)
```
-->

애플리케이션의 비동기 버전으로 앞에서 진행한 ab 벤치마크를 실행하면 다음과 같은 결과를 볼 수 있습니다.

```
Concurrency Level:      20
Time taken for tests:   12.846 seconds
Complete requests:      250
Failed requests:        0
Keep-Alive requests:    250
Total transferred:      50250 bytes
HTML transferred:       500 bytes
Requests per second:    19.46 [#/sec] (mean)
Time per request:       1027.689 [ms] (mean)
Time per request:       51.384 [ms] (mean, across all concurrent requests)
Transfer rate:          3.82 [Kbytes/sec] received

...

Percentage of the requests served within a certain time (ms)
  50%   1018
  66%   1035
  75%   1041
  80%   1043
  90%   1049
  95%   1063
  98%   1070
  99%   1071
 100%   1079 (longest request)
```

<!--
Yay! Your app is now serving about 20 requests per second, roughly 4 times more
than it was with the synchronous hash generation. Additionally, the average
latency is down from the 4 seconds before to just over 1 second.

Hopefully, through the performance investigation of this (admittedly contrived)
example, you've seen how the V8 tick processor can help you gain a better
understanding of the performance of your Node.js applications.

[profiler inside V8]: https://v8.dev/docs/profile
[benefits of asynchronous programming]: https://nodesource.com/blog/why-asynchronous
-->

애플리케이션이 이제 초당 20개의 요청을 처리할 수 있게 되었습니다. 이는 동기 해시 생성을 사용한 것보다
대략 4배가 빨라진 것입니다. 게다가 평균 지연시간이 이전의 4초에서 1초 정도로 줄어들었습니다.

이 예시의 성능 분석을 통해 V8 tick 프로세서가 Node.js 애플리케이션 성능을 이해하는데
어떻게 도움이 되는지 알기 바랍니다.

[V8 내의 프로파일러]: https://v8.dev/docs/profile
[비동기 프로그래밍의 장점]: https://nodesource.com/blog/why-asynchronous
