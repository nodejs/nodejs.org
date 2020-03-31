---
title: Node.js 애플리케이션의 간단한 프로파일링
layout: docs.hbs
---

# Node.js 애플리케이션의 간단한 프로파일링

There are many third party tools available for profiling Node.js applications but, in many cases, the easiest option is to use the Node.js built in profiler. The built in profiler uses the [profiler inside V8](https://v8.dev/docs/profile) which samples the stack at regular intervals during program execution. It records the results of these samples, along with important optimization events such as jit compiles, as a series of ticks:

```
code-creation,LazyCompile,0,0x2d5000a337a0,396,"bp native array.js:1153:16",0x289f644df68,~
code-creation,LazyCompile,0,0x2d5000a33940,716,"hasOwnProperty native v8natives.js:198:30",0x289f64438d0,~
code-creation,LazyCompile,0,0x2d5000a33c20,284,"ToName native runtime.js:549:16",0x289f643bb28,~
code-creation,Stub,2,0x2d5000a33d40,182,"DoubleToIStub"
code-creation,Stub,2,0x2d5000a33e00,507,"NumberToStringStub"
```

Node.js 애플리케이션을 프로파일링하는 서드파티 도구들이 많이 있지만, 대부분은 Node.js에 내장된 프로파일러를 사용하는 것인 가장 쉬운 방법입니다. 내장된 프로파일러는 프로그램을 실행하는 동안 주기적으로 스택을 샘플링하는 [V8 내의 프로파일러](https://v8.dev/docs/profile)를 사용합니다. 이 샘플링 결과를 기록하면서 jit 컴파일이나 tick 시리즈처럼 중요한 최적화 작업을 기록합니다.

To illustrate the use of the tick profiler, we will work with a simple Express application. Our application will have two handlers, one for adding new users to our system:

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

이전에는 tick을 해석하려면 V8 소스 코드가 필요했습니다. 다행히, 소스에서 V8 빌드를 따로 하지 않고 이 정보를 사용할 수 있는 도구가 Node.js 4.4.0부터 도입되었습니다. 애플리케이션의 성능을 볼 수 있는 내장된 프로파일러를 어떻게 사용하는지 살펴보겠습니다.

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

*Please note that these are NOT recommended handlers for authenticating users in your Node.js applications and are used purely for illustration purposes. You should not be trying to design your own cryptographic authentication mechanisms in general. It is much better to use existing, proven authentication solutions.*

Now assume that we've deployed our application and users are complaining about high latency on requests. We can easily run the app with the built in profiler:

```
NODE_ENV=production node --prof app.js
```

다른 핸들러는 사용자 인증의 유효성을 검사합니다.

```
curl -X GET "http://localhost:8080/newUser?username=matt&password=password"
ab -k -c 20 -n 250 "http://localhost:8080/auth?username=matt&password=password"
```

and get an ab output of:

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

From this output, we see that we're only managing to serve about 5 requests per second and that the average request takes just under 4 seconds round trip. In a real world example, we could be doing lots of work in many functions on behalf of a user request but even in our simple example, time could be lost compiling regular expressions, generating random salts, generating unique hashes from user passwords, or inside the Express framework itself.

Since we ran our application using the `--prof` option, a tick file was generated in the same directory as your local run of the application. It should have the form `isolate-0xnnnnnnnnnnnn-v8.log` (where `n` is a digit).

배포한 애플리케이션에서 사용자가 요청에 지연이 발생한다고 불평한다고 가정해 보겠습니다. 내장된 프로파일러로 애플리케이션을 간단히 실행할 수 있습니다.

```
node --prof-process isolate-0xnnnnnnnnnnnn-v8.log > processed.txt
```

`ab`(ApacheBench)로 서버에 부하를 줄 수 있습니다.

```
 [Summary]:
   ticks  total  nonlib   name
     79    0.2%    0.2%  JavaScript
  36703   97.2%   99.2%  C++
      7    0.0%    0.0%  GC
    767    2.0%          Shared libraries
    215    0.6%          Unaccounted
```

다음과 같은 결과가 나올 것입니다.

```
 [C++]:
   ticks  total  nonlib   name
  19557   51.8%   52.9%  node::crypto::PBKDF2(v8::FunctionCallbackInfo<v8::Value> const&)
   4510   11.9%   12.2%  _sha1_block_data_order
   3165    8.4%    8.6%  _malloc_zone_malloc
```

We see that the top 3 entries account for 72.1% of CPU time taken by the program. From this output, we immediately see that at least 51.8% of CPU time is taken up by a function called PBKDF2 which corresponds to our hash generation from a user's password. However, it may not be immediately obvious how the lower two entries factor into our application (or if it is we will pretend otherwise for the sake of example). To better understand the relationship between these functions, we will next look at the [Bottom up (heavy) profile] section which provides information about the primary callers of each function. Examining this section, we find:

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

Parsing this section takes a little more work than the raw tick counts above. Within each of the "call stacks" above, the percentage in the parent column tells you the percentage of samples for which the function in the row above was called by the function in the current row. For example, in the middle "call stack" above for _sha1_block_data_order, we see that `_sha1_block_data_order` occurred in 11.9% of samples, which we knew from the raw counts above. However, here, we can also tell that it was always called by the pbkdf2 function inside the Node.js crypto module. We see that similarly, `_malloc_zone_malloc` was called almost exclusively by the same pbkdf2 function. Thus, using the information in this view, we can tell that our hash computation from the user's password accounts not only for the 51.8% from above but also for all CPU time in the top 3 most sampled functions since the calls to `_sha1_block_data_order` and `_malloc_zone_malloc` were made on behalf of the pbkdf2 function.

이 결과를 보면 초당 5건의 요청만 처리할 수 있고 한 요청당 4초 미만의 시간이 걸리는 것을 알 수 있습니다. 실제 애플리케이션에서는 요청을 처리할 때 많은 함수에서 다량의 작업이 일어날 수 있지만, 이 간단한 예시에서도 정규표현식을 해석하고 임의의 솔트를 만들고 사용자 비밀번호에서 유일한 해시값을 만들고 Express 프레임워크 내부 작업을 진행하기 위해 시간이 소비됩니다.

`--prof` 옵션으로 애플리케이션을 실행했으므로 애플리케이션을 실행한 디렉터리에 tick 파일이 생성됩니다. 파일명은 `isolate-0xnnnnnnnnnnnn-v8.log`(여기서 `n`은 숫자입니다.) 같은 형식일 것입니다.

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

이 파일을 이해하려면 Node.js 바이너리에 포함된 tick 프로세서를 사용해야 합니다. `--prof-process` 플래그로 tick 프로세서를 실행할 수 있습니다.

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

Yay! Your app is now serving about 20 requests per second, roughly 4 times more than it was with the synchronous hash generation. Additionally, the average latency is down from the 4 seconds before to just over 1 second.

사용하는 텍스트 에디터에서 processed.txt를 열면 몇 가지 정보를 볼 수 있습니다. 파일은 언어로 구분된 단위로 나누어져 있습니다. 우선 요약 부분을 보겠습니다.
