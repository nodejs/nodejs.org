---
title: JavaScript 비동기 프로그래밍과 콜백
layout: learn
authors: flaviocopes, MylesBorins, LaRuaNa, amiller-gh, ahmadawais, ovflowd
---

# JavaScript 비동기 프로그래밍과 콜백

## 프로그래밍 언어의 비동기성

컴퓨터는 설계상 비동기적입니다.

비동기성은 사물이 주요 프로그램 흐름과 독립적으로 발생할 수 있음을 의미합니다.

현재의 소비자 컴퓨터에서 모든 프로그램은 특정 시간 슬롯을 위해 실행되며, 그 후 다른 프로그램이 계속 실행될 수 있도록 실행을 중지합니다. 이 과정은 너무 빠른 주기로 실행되어 눈치 채기 어렵습니다. 우리는 컴퓨터가 여러 프로그램을 동시에 실행한다고 생각하지만, 이는 환상입니다(다중 프로세서 기계를 제외하고).

프로그램은 내부적으로 *인터럽트*를 사용합니다. 이는 프로세서에 시스템의 주의를 끌기 위해 방출되는 신호입니다.

이제 내부를 깊이 논의하지 않겠지만, 프로그램이 비동기적이며 필요할 때까지 실행을 중단하고 그 사이에 다른 작업을 수행할 수 있다는 점을 기억해 두세요. 네트워크로부터 응답을 기다리는 동안 프로그램은 요청이 완료될 때까지 프로세서를 중단할 수 없습니다.

일반적으로 프로그래밍 언어는 동기식이며, 일부는 언어나 라이브러리를 통해 비동기성을 관리할 수 있는 방법을 제공합니다. C, Java, C#, PHP, Go, Ruby, Swift 및 Python은 모두 기본적으로 동기식입니다. 이들 중 일부는 스레드를 사용하여 비동기 작업을 처리하며, 새로운 프로세스를 생성합니다.

## JavaScript

JavaScript는 기본적으로 **동기식**이며 단일 스레드입니다. 즉, 코드는 새 스레드를 생성하여 병렬로 실행할 수 없습니다.

코드는 시리즈로 실행되며, 하나씩 차례대로 실행됩니다. 예를 들면 다음과 같습니다:

```js
const a = 1;
const b = 2;
const c = a * b;
console.log(c);
doSomething();
```

그러나 JavaScript는 브라우저 안에서 태어났으며, 처음의 주요 작업은 사용자 동작에 응답하는 것이었습니다. 예를 들어 `onClick`, `onMouseOver`, `onChange`, `onSubmit` 등이 있습니다. 동기식 프로그래밍 모델로 어떻게 이를 수행할 수 있을까요?

그 답은 **환경**에 있습니다. **브라우저**는 이러한 기능을 처리할 수 있는 API 집합을 제공함으로써 이를 가능하게 합니다.

최근 Node.js는 파일 접근, 네트워크 호출 등으로 이 개념을 확장하기 위해 비차단 I/O 환경을 도입했습니다.

## 콜백

사용자가 버튼을 클릭할 때가 언제인지 알 수 없습니다. 그래서 클릭 이벤트에 대한 이벤트 핸들러를 **정의**합니다. 이 이벤트 핸들러는 이벤트가 발생할 때 호출될 함수입니다:

```js
document.getElementById('button').addEventListener('click', () => {
  // 항목 클릭됨
});
```

이것이 바로 **콜백**입니다.

콜백은 다른 함수에 값으로 전달되는 간단한 함수이며, 이벤트가 발생할 때만 실행됩니다. JavaScript는 함수를 변수에 할당하고 다른 함수에 전달할 수 있는 일급 함수(first-class functions)를 지원하기 때문에 가능합니다(이를 **고차 함수**(higher-order functions)라고 부릅니다).

클라이언트 코드를 `window` 객체의 `load` 이벤트 리스너에 감싸는 것이 일반적이며, 이 리스너는 페이지가 준비되었을 때만 콜백 함수를 실행합니다:

```js
window.addEventListener('load', () => {
  // 창 로드됨
  // 원하는 작업 수행
});
```

콜백은 DOM 이벤트뿐만 아니라 어디서나 사용됩니다.

일반적인 예는 타이머를 사용하는 것입니다:

```js
setTimeout(() => {
  // 2초 후에 실행됨
}, 2000);
```

XHR 요청 또한 콜백을 사용하며, 특정 이벤트가 발생할 때 호출될 함수를 속성에 할당하여 처리합니다(이 경우 요청 상태가 변경될 때):

```js
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    xhr.status === 200 ? console.log(xhr.responseText) : console.error('error');
  }
};
xhr.open('GET', 'https://yoursite.com');
xhr.send();
```

### 콜백에서 오류 처리하기

콜백으로 오류를 어떻게 처리할까요? 일반적인 전략 중 하나는 Node.js에서 채택한 방법입니다: 콜백 함수의 첫 번째 매개변수는 오류 객체입니다: **오류 우선 콜백**(error-first callbacks)

오류가 없으면 객체는 `null`입니다. 오류가 있을 경우, 오류에 대한 설명과 기타 정보가 포함됩니다.

```js
const fs = require('node:fs');

fs.readFile('/file.json', (err, data) => {
  if (err) {
    // 오류 처리
    console.log(err);
    return;
  }

  // 오류가 없으므로 데이터 처리
  console.log(data);
});
```

### 콜백의 문제점

콜백은 간단한 경우에 훌륭합니다!

그러나 각 콜백은 중첩 수준을 추가하며, 많은 콜백이 있으면 코드는 매우 복잡해지기 시작합니다:

```js
window.addEventListener('load', () => {
  document.getElementById('button').addEventListener('click', () => {
    setTimeout(() => {
      items.forEach(item => {
        // 여기에 코드 작성
      });
    }, 2000);
  });
});
```

이것은 단순한 4단계 코드에 불과하지만, 훨씬 더 많은 중첩 수준을 본 적이 있으며, 이는 결코 즐겁지 않습니다.

이 문제를 어떻게 해결할까요?

### 콜백 대안

ES6부터 JavaScript는 콜백을 사용하지 않고도 비동기 코드를 돕기 위한 여러 기능을 도입했습니다: 프로미스(Promises, ES6)와 Async/Await (ES2017).
