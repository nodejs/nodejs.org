---
title: TypeScript 소개
layout: learn
authors: sbielenica, ovflowd, vaishnav-mk, AugustinMauroy
---

# TypeScript 소개

## TypeScript란 무엇인가

**[TypeScript](https://www.typescriptlang.org)**는 Microsoft에서 유지 관리하고 개발하는 오픈 소스 언어입니다.

기본적으로 TypeScript는 JavaScript에 추가 구문을 더하여 에디터와의 통합을 더 강력하게 지원합니다. 에디터나 CI/CD 파이프라인에서 오류를 조기에 발견하고, 더 유지보수하기 쉬운 코드를 작성할 수 있습니다.

TypeScript의 다른 장점은 나중에 이야기하도록 하고, 지금은 몇 가지 예제를 살펴봅시다!

## 첫 번째 TypeScript 코드

다음 코드 스니펫을 보고 함께 분석해보겠습니다:

<!--
  Maintainers note: this code is duplicated in the next article, please keep them in sync
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

첫 번째 부분은 (`type` 키워드를 사용한) 사용자 객체 타입을 선언하는 역할을 합니다. 이후 우리는 이 새로 생성된 타입을 사용하여 `User` 타입의 인자를 받고 `boolean` 값을 반환하는 `isAdult`라는 함수를 만듭니다. 그런 다음, 예제로 사용할 `justine`이라는 데이터를 생성하고 이전에 정의한 함수를 호출할 수 있습니다. 마지막으로, `justine`이 성인인지 여부를 담고 있는 새 변수를 만듭니다.

이 예제와 관련하여 알아야 할 추가 사항이 있습니다. 첫째, 선언한 타입을 따르지 않으면 TypeScript는 문제가 있음을 알려주고 잘못된 사용을 방지합니다. 둘째, 모든 것을 명시적으로 타입 지정할 필요는 없습니다. TypeScript는 타입을 추론해줍니다. 예를 들어, `isJustineAnAdult` 변수는 우리가 명시적으로 타입을 지정하지 않았더라도 `boolean` 타입으로 추론되며, `justine`은 `User` 타입으로 선언하지 않았더라도 유효한 함수 인자로 사용할 수 있습니다.

## TypeScript 코드 실행 방법

좋습니다. 이제 TypeScript 코드를 작성했으니, 어떻게 실행할까요?
TypeScript 코드를 실행하는 방법은 여러 가지가 있으며, 다음 기사들에서 모두 다룰 예정입니다.
