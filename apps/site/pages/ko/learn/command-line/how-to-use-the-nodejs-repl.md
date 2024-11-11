---
title: Node.js REPL 사용 방법
layout: learn
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, vaishnav-mk
---

# Node.js REPL 사용 방법

`node` 명령어는 Node.js 스크립트를 실행할 때 사용됩니다:

```bash
node script.js
```

만약 실행할 스크립트나 인자 없이 `node` 명령어를 실행하면, REPL 세션이 시작됩니다:

```bash
node
```

> **참고:** `REPL`은 Read Evaluate Print Loop의 약자로, 단일 표현식을 입력받아 실행하고 결과를 콘솔에 반환하는 프로그래밍 언어 환경(기본적으로 콘솔 창)입니다. REPL 세션은 간단한 JavaScript 코드를 빠르게 테스트할 수 있는 편리한 방법을 제공합니다.

터미널에서 실행해보면 다음과 같은 일이 발생합니다:

```bash
❯ node
```

명령어가 대기 상태로 전환되며, 입력을 기다립니다.

> **팁:** 터미널을 여는 방법을 잘 모르면, "your-operating-system에서 터미널 여는 방법"을 검색해 보세요.

이제 REPL은 JavaScript 코드를 입력하기를 기다리고 있습니다.

간단한 코드를 입력해보세요:

```console
> console.log('test')
test
undefined
>
```

첫 번째 값인 `test`는 우리가 콘솔에 출력하라고 지시한 출력값이며, `undefined`는 `console.log()`의 반환값입니다.
Node는 이 코드를 읽고, 평가하고, 결과를 출력한 후, 다음 명령을 기다리고 있습니다. Node는 우리가 REPL에서 실행하는 코드 한 줄마다 이 세 가지 단계를 반복하며, 이 과정이 바로 REPL이라는 이름의 유래입니다.

Node는 JavaScript 코드 한 줄의 결과를 자동으로 출력합니다. 다음 코드를 입력하고 Enter를 눌러보세요:

```console
> 5 === '5'
false
>
```

위 두 줄의 출력 차이를 확인하세요. Node REPL은 `console.log()`를 실행한 후 `undefined`를 출력한 반면, `5 === '5'`의 경우 결과만 출력했습니다. 전자는 JavaScript의 "문(statement)"이고 후자는 "식(expression)"이라는 점을 기억해야 합니다.

간혹 여러 줄에 걸쳐 코드를 작성해야 할 수도 있습니다. 예를 들어, 랜덤 숫자를 생성하는 함수를 정의하려고 한다면, REPL 세션에서 다음 코드를 입력하고 Enter를 눌러보세요:

```console
function generateRandom() {
...
```

Node REPL은 아직 코드가 끝나지 않았음을 감지하고, 다중 라인 모드로 전환됩니다. 이제 함수 정의를 마치고 Enter를 눌러보세요:

```console
function generateRandom() {
... return Math.random()
}
undefined
```

### 특수 변수 `_`

어떤 코드를 실행한 후에 `_`를 입력하면, 마지막 연산의 결과를 출력합니다.

### 위쪽 화살표 키

`위쪽 화살표` 키를 누르면, 현재 및 이전 REPL 세션에서 실행한 코드의 히스토리를 확인할 수 있습니다.

### Dot 명령어

REPL에는 점(`.`)으로 시작하는 몇 가지 특수 명령어가 있습니다:

- `.help`: 점 명령어 도움말을 표시합니다.
- `.editor`: 편집기 모드를 활성화하여 여러 줄의 JavaScript 코드를 쉽게 작성할 수 있습니다. 이 모드에서 `ctrl-D`를 입력하면 작성한 코드가 실행됩니다.
- `.break`: 다중 라인 표현식을 입력하는 도중 `.break` 명령어를 입력하면 입력을 중단합니다. `ctrl-C`를 누르는 것과 동일합니다.
- `.clear`: REPL 컨텍스트를 비운 상태로 초기화하며, 현재 입력 중인 다중 라인 표현식을 지웁니다.
- `.load`: 현재 작업 디렉토리 기준으로 JavaScript 파일을 로드합니다.
- `.save`: REPL 세션에서 입력한 모든 내용을 파일로 저장합니다 (파일명을 지정해야 함).
- `.exit`: REPL을 종료합니다 (`ctrl-C` 두 번 누르기와 동일).

REPL은 `.editor`를 호출하지 않고도 다중 라인 입력을 자동으로 감지합니다.

예를 들어, 다음과 같은 반복문을 입력해보세요:

```console
[1, 2, 3].forEach(num => {
```

그리고 Enter를 누르면, REPL은 세 줄로 전환됩니다. 이 세 줄은 블록에서 계속 작업할 수 있음을 나타냅니다.

```console
... console.log(num)
... })
```

이 시점에서 `.break`를 입력하면 다중 라인 모드가 종료되고 명령어는 실행되지 않습니다.

### JavaScript 파일에서 REPL 실행

JavaScript 파일에서 `repl` 모듈을 사용하여 REPL을 실행할 수 있습니다.

```js
const repl = require('node:repl');
```

`repl` 변수를 사용해 다양한 작업을 수행할 수 있습니다.
REPL 프롬프트를 시작하려면 다음 코드를 입력하세요:

```js
repl.start();
```

파일을 명령줄에서 실행합니다.

```bash
node repl.js
```

```console
> const n = 10
```

REPL 시작 시 표시할 문자열을 설정할 수 있습니다. 기본값은 `>` (뒤에 공백 포함)이지만, 사용자 정의 프롬프트를 정의할 수 있습니다.

```js
// 유닉스 스타일 프롬프트
const local = repl.start('$ ');
```

REPL을 종료할 때 메시지를 표시할 수 있습니다.

```js
local.on('exit', () => {
  console.log('repl을 종료합니다');
  process.exit();
});
```

REPL 모듈에 대한 자세한 내용은 [repl documentation](https://nodejs.org/api/repl.html)에서 확인할 수 있습니다.
