---
title: 비동기 흐름 제어
layout: learn
authors: aug2uag, ovflowd
---

# 비동기 흐름 제어

> 이 글의 내용은 [Mixu의 Node.js 책](http://book.mixu.net/node/ch7.html)에서 많은 영감을 받았습니다.

JavaScript는 기본적으로 "메인" 스레드에서 논블로킹(non-blocking)으로 설계되었습니다. 이 메인 스레드에서 뷰가 렌더링되기 때문에, 브라우저에서 특히 중요합니다. 메인 스레드가 블로킹되면 사용자가 두려워하는 "멈춤 현상"이 발생하고, 다른 이벤트는 처리되지 않으며 데이터 획득에 지장이 생깁니다.

이로 인해 함수형 프로그래밍 스타일만이 해결할 수 있는 독특한 제약이 생깁니다. 이때 콜백(callback)이 등장하게 됩니다.

그러나 콜백은 더 복잡한 작업에서 다루기 어려워질 수 있습니다. 이는 종종 "콜백 지옥(callback hell)"으로 이어지며, 여러 개의 중첩된 함수와 콜백이 코드를 더 읽기 어렵고, 디버깅하거나 조직화하는 것이 어려워집니다.

```js
async1(function (input, result1) {
  async2(function (result2) {
    async3(function (result3) {
      async4(function (result4) {
        async5(function (output) {
          // 결과로 작업 수행
        });
      });
    });
  });
});
```

실제 코드에서는 `result1`, `result2` 등을 처리하는 추가 코드가 있기 때문에, 위의 예보다 훨씬 복잡하고 지저분한 코드가 될 가능성이 큽니다.

**이때 *함수*가 큰 역할을 합니다. 더 복잡한 작업은 여러 함수로 구성됩니다:**

1. 시작 함수 / 입력
2. 미들웨어
3. 종료 함수

**"시작 함수 / 입력"은 시퀀스의 첫 번째 함수입니다. 이 함수는 작업의 원래 입력을 수락하며, 작업은 여러 함수의 실행 가능한 시리즈입니다. 원래 입력은 주로 다음과 같습니다:**

1. 글로벌 환경의 변수
2. 인수 유무에 따른 직접 호출
3. 파일 시스템 또는 네트워크 요청을 통해 얻은 값

네트워크 요청은 외부 네트워크에 의해 시작된 수신 요청, 동일한 네트워크의 다른 애플리케이션, 또는 동일하거나 다른 네트워크의 애플리케이션일 수 있습니다.

미들웨어 함수는 또 다른 함수를 반환하고, 종료 함수는 콜백을 호출합니다. 다음은 네트워크 또는 파일 시스템 요청으로의 흐름을 설명한 예시입니다. 여기서 지연(latency)은 0이며, 모든 값은 메모리에 있습니다.

```js
function final(someInput, callback) {
  callback(`${someInput} and terminated by executing callback`);
}

function middleware(someInput, callback) {
  return final(`${someInput} touched by middleware`, callback);
}

function initiate() {
  const someInput = 'hello this is a function';
  middleware(someInput, function (result) {
    console.log(result);
    // 결과를 반환하려면 콜백이 필요합니다.
  });
}

initiate();
```

## 상태 관리

함수는 상태에 의존적일 수도 있고 아닐 수도 있습니다. 상태 의존성은 함수의 입력 또는 다른 변수가 외부 함수에 의존할 때 발생합니다.

**이러한 방식으로 상태 관리를 위한 두 가지 주요 전략이 있습니다:**

1. 변수를 함수에 직접 전달
2. 캐시, 세션, 파일, 데이터베이스, 네트워크 또는 기타 외부 소스에서 변수 값을 획득

글로벌 변수를 언급하지 않은 이유는 글로벌 변수를 사용한 상태 관리는 종종 지저분한 안티패턴으로, 상태를 보장하기 어렵거나 불가능하게 만들기 때문입니다. 복잡한 프로그램에서는 글로벌 변수를 가능한 한 피해야 합니다.

## 흐름 제어

객체가 메모리에 있을 때는 반복(iteration)이 가능하며, 흐름 제어에는 변화가 없습니다:

```js
function getSong() {
let \_song = '';
let i = 100;
for (i; i > 0; i -= 1) {
\_song += `${i} beers on the wall, you take one down and pass it around, ${
      i - 1
    } bottles of beer on the wall\n`;
if (i === 1) {
\_song += "Hey let's get some more beer";
}
}

return \_song;
}

function singSong(\_song) {
if (!\_song) throw new Error("song is '' empty, FEED ME A SONG!");
console.log(\_song);
}

const song = getSong();
// 정상적으로 작동합니다.
singSong(song);
```

그러나 데이터가 메모리 외부에 있을 때는 반복이 작동하지 않습니다:

```js
function getSong() {
let \_song = '';
let i = 100;
for (i; i > 0; i -= 1) {
/_ eslint-disable no-loop-func _/
setTimeout(function () {
\_song += `${i} beers on the wall, you take one down and pass it around, ${
        i - 1
      } bottles of beer on the wall\n`;
if (i === 1) {
\_song += "Hey let's get some more beer";
}
}, 0);
/_ eslint-enable no-loop-func _/
}

return \_song;
}

function singSong(\_song) {
if (!\_song) throw new Error("song is '' empty, FEED ME A SONG!");
console.log(\_song);
}

const song = getSong('beer');
// 작동하지 않습니다.
singSong(song);
// Uncaught Error: song is '' empty, FEED ME A SONG!
```

이 현상이 발생한 이유는 `setTimeout`이 CPU에 해당 명령을 버스에 저장하고, 나중에 데이터를 가져오도록 예약했기 때문입니다. 수천 번의 CPU 사이클이 지난 후 함수가 다시 실행되지만, 그때는 이미 `song`('')이 반환된 후입니다.

파일 시스템과 네트워크 요청을 다룰 때도 동일한 상황이 발생합니다. 메인 스레드는 불확정 기간 동안 블록될 수 없으므로, 콜백을 사용하여 코드를 제어된 방식으로 시간에 따라 실행하도록 예약합니다.

대부분의 작업은 다음 세 가지 패턴으로 수행할 수 있습니다:

1. **순차 실행(In series):** 함수가 엄격한 순서대로 실행됩니다. 이는 `for` 루프와 가장 유사합니다.

```js
// 미리 정의된 작업
const operations = [
  { func: function1, args: args1 },
  { func: function2, args: args2 },
  { func: function3, args: args3 },
];

function executeFunctionWithArgs(operation, callback) {
  // 함수 실행
  const { args, func } = operation;
  func(args, callback);
}

function serialProcedure(operation) {
  if (!operation) process.exit(0); // 작업 완료
  executeFunctionWithArgs(operation, function (result) {
    // 콜백 후 계속 실행
    serialProcedure(operations.shift());
  });
}

serialProcedure(operations.shift());
```

2. **완전 병렬(Full parallel):** 순서가 중요하지 않을 때 사용됩니다. 예를 들어, 100만 명에게 이메일을 발송하는 경우.

```js
let count = 0;
let success = 0;
const failed = [];
const recipients = [
  { name: 'Bart', email: 'bart@tld' },
  { name: 'Marge', email: 'marge@tld' },
  { name: 'Homer', email: 'homer@tld' },
  { name: 'Lisa', email: 'lisa@tld' },
  { name: 'Maggie', email: 'maggie@tld' },
];

function dispatch(recipient, callback) {
  // `sendEmail`은 가상의 SMTP 클라이언트
  sendMail(
    {
      subject: 'Dinner tonight',
      message: 'We have lots of cabbage on the plate. You coming?',
      smtp: recipient.email,
    },
    callback
  );
}

function final(result) {
  console.log(`Result: ${result.count} attempts \
      & ${result.success} succeeded emails`);
  if (result.failed.length)
    console.log(`Failed to send to: \
        \n${result.failed.join('\n')}\n`);
}

recipients.forEach(function (recipient) {
  dispatch(recipient, function (err) {
    if (!err) {
      success += 1;
    } else {
      failed.push(recipient.name);
    }
    count += 1;

    if (count === recipients.length) {
      final({
        count,
        success,
        failed,
      });
    }
  });
});
```

3. **제한된 병렬(Limited parallel):** 예를 들어 1000만 명 중 100만 명에게만 이메일을 발송하는 경우.

```js
let successCount = 0;

function final() {
  console.log(`dispatched ${successCount} emails`);
  console.log('finished');
}

function dispatch(recipient, callback) {
  // `sendEmail`은 가상의 SMTP 클라이언트
  sendMail(
    {
      subject: 'Dinner tonight',
      message: 'We have lots of cabbage on the plate. You coming?',
      smtp: recipient.email,
    },
    callback
  );
}

function sendOneMillionEmailsOnly() {
  getListOfTenMillionGreatEmails(function (err, bigList) {
    if (err) throw err;

    function serial(recipient) {
      if (!recipient || successCount >= 1000000) return final();
      dispatch(recipient, function (_err) {
        if (!_err) successCount += 1;
        serial(bigList.pop());
      });
    }

    serial(bigList.pop());
  });
}

sendOneMillionEmailsOnly();
```

각각의 패턴은 고유한 사용 사례, 장점, 그리고 이슈가 있으니 실험해 보고 더 자세히 읽어보세요. 가장 중요한 것은 작업을 모듈화하고 콜백을 사용하는 것입니다!
