---
title: 트랜스파일을 통한 TypeScript 코드 실행하기
layout: learn
authors: AugustinMauroy
---

# 트랜스파일을 통한 TypeScript 코드 실행하기

트랜스파일링(Transpilation)은 한 언어의 소스 코드를 다른 언어로 변환하는 과정입니다. TypeScript의 경우, 이는 TypeScript 코드를 JavaScript 코드로 변환하는 과정입니다. 브라우저와 Node.js는 TypeScript 코드를 직접 실행할 수 없기 때문에 이 과정이 필요합니다.

## TypeScript를 JavaScript로 컴파일하기

TypeScript 코드를 실행하는 가장 일반적인 방법은 먼저 JavaScript로 컴파일하는 것입니다. 이를 위해 TypeScript 컴파일러 `tsc`를 사용할 수 있습니다.

**1단계:** TypeScript 코드를 파일에 작성합니다. 예를 들어 `example.ts` 파일을 생성합니다.

<!--
  Maintainers note: this code is duplicated in the previous article, please keep them in sync
-->

```ts
type User = {
  name: string;
  age: number;
};

function isAdult(user: User): boolean {
  return user.age >= 18;
}

const justine = {
  name: 'Justine',
  age: 23,
} satisfies User;

const isJustineAnAdult = isAdult(justine);
```

**2단계:** 패키지 매니저를 사용하여 TypeScript를 로컬에 설치합니다.

이 예제에서는 npm을 사용할 예정입니다. npm에 대한 자세한 내용은 [npm 패키지 매니저 소개](/learn/getting-started/an-introduction-to-the-npm-package-manager)를 참고하세요.

```bash displayName="TypeScript 로컬 설치"
npm i -D typescript # -D는 --save-dev의 약어입니다.
```

**3단계:** `tsc` 명령어를 사용하여 TypeScript 코드를 JavaScript로 컴파일합니다.

```bash
npx tsc example.ts
```

> **참고:** `npx`는 Node.js 패키지를 전역으로 설치하지 않고도 실행할 수 있는 도구입니다.

`tsc`는 TypeScript 컴파일러로, 우리의 TypeScript 코드를 JavaScript로 컴파일합니다.
이 명령어를 실행하면 `example.js`라는 새 파일이 생성되며, 이를 Node.js로 실행할 수 있습니다.
이제 TypeScript 코드를 컴파일하고 실행하는 방법을 알았으니, TypeScript가 버그를 방지하는 능력을 살펴봅시다!

**4단계:** Node.js를 사용하여 JavaScript 코드를 실행합니다:

```bash
node example.js
```

터미널에서 TypeScript 코드의 출력 결과를 확인할 수 있습니다.

## 타입 오류가 있을 경우

TypeScript 코드에 타입 오류가 있으면 TypeScript 컴파일러가 이를 감지하여 코드를 실행하지 못하게 합니다. 예를 들어, `justine`의 `age` 속성을 문자열로 변경하면 TypeScript가 오류를 발생시킵니다.

코드를 다음과 같이 수정하여 의도적으로 타입 오류를 도입해 보겠습니다:

```ts
type User = {
  name: string;
  age: number;
};

function isAdult(user: User): boolean {
  return user.age >= 18;
}

const justine: User = {
  name: 'Justine',
  age: 'Secret!',
};

const isJustineAnAdult: string = isAdult(justine, "I shouldn't be here!");
```

이때 TypeScript는 다음과 같은 오류를 출력합니다:

```console
example.ts:12:5 - error TS2322: Type 'string' is not assignable to type 'number'.

12     age: 'Secret!',
       ~~~

  example.ts:3:5
    3     age: number;
          ~~~
    The expected type comes from property 'age' which is declared here on type 'User'

example.ts:15:7 - error TS2322: Type 'boolean' is not assignable to type 'string'.

15 const isJustineAnAdult: string = isAdult(justine, "I shouldn't be here!");
         ~~~~~~~~~~~~~~~~

example.ts:15:51 - error TS2554: Expected 1 arguments, but got 2.

15 const isJustineAnAdult: string = isAdult(justine, "I shouldn't be here!");
                                                     ~~~~~~~~~~~~~~~~~~~~~~


Found 3 errors in the same file, starting at: example.ts:12
```

보시다시피, TypeScript는 버그가 발생하기 전에 이를 찾아내는 데 매우 유용합니다. 이것이 바로 TypeScript가 개발자들 사이에서 인기가 많은 이유 중 하나입니다.
