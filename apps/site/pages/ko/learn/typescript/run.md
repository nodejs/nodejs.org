---
title: 러너로 TypeScript 실행하기
layout: learn
authors: AugustinMauroy
---

# 러너로 TypeScript 실행하기

이전 기사에서는 트랜스파일링을 사용하여 TypeScript 코드를 실행하는 방법을 배웠습니다. 이번 기사에서는 러너를 사용하여 TypeScript 코드를 실행하는 방법을 배웁니다.

## `ts-node`로 TypeScript 코드 실행하기

[ts-node](https://typestrong.org/ts-node/)는 Node.js를 위한 TypeScript 실행 환경입니다. 이를 사용하면 TypeScript 코드를 먼저 컴파일하지 않고도 Node.js에서 직접 실행할 수 있습니다. 하지만 `ts-node`는 코드를 타입 체크하지 않으므로, 코드를 배포하기 전에 먼저 `tsc`로 타입 체크를 하고 `ts-node`로 실행할 것을 권장합니다.

`ts-node`를 사용하려면 먼저 설치해야 합니다:

```bash
npm i -D ts-node
```

그런 다음 다음과 같이 TypeScript 코드를 실행할 수 있습니다:

```bash
npx ts-node example.ts
```

## `tsx`로 TypeScript 코드 실행하기

[tsx](https://tsx.is/)는 Node.js를 위한 또 다른 TypeScript 실행 환경입니다. 이를 사용하면 TypeScript 코드를 먼저 컴파일하지 않고도 Node.js에서 직접 실행할 수 있습니다. 하지만 `tsx`는 코드를 타입 체크하지 않으므로, 코드를 배포하기 전에 먼저 `tsc`로 타입 체크를 하고 `tsx`로 실행할 것을 권장합니다.

`tsx`를 사용하려면 먼저 설치해야 합니다:

```bash
npm i -D tsx
```

그런 다음 다음과 같이 TypeScript 코드를 실행할 수 있습니다:

```bash
npx tsx example.ts
```

### `node`를 통해 `tsx` 등록하기

`node`를 통해 `tsx`를 사용하려면 `--import`를 통해 `tsx`를 등록할 수 있습니다:

```bash
node --import=tsx example.ts
```
