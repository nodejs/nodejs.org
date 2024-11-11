---
title: 네이티브에서 TypeScript 실행하기
layout: learn
authors: AugustinMauroy
---

> **⚠️경고⚠️:** 이 기사에 나오는 모든 내용은 Node.js의 실험적 기능을 사용합니다. 이 기사에서 언급된 기능을 지원하는 버전의 Node.js를 사용하고 있는지 확인하세요. 또한 실험적 기능은 향후 버전의 Node.js에서 변경될 수 있음을 기억하세요.

# 네이티브에서 TypeScript 실행하기

이전 기사들에서는 트랜스파일링과 러너를 사용하여 TypeScript 코드를 실행하는 방법을 배웠습니다. 이번 기사에서는 Node.js 자체를 사용하여 TypeScript 코드를 실행하는 방법을 배웁니다.

## Node.js로 TypeScript 코드 실행하기

Node.js V22.6.0부터 일부 TypeScript 구문에 대한 실험적 지원이 추가되었습니다. 이제 TypeScript 코드를 먼저 트랜스파일하지 않고도 Node.js에서 직접 실행할 수 있습니다.

그렇다면 Node.js로 TypeScript 코드를 어떻게 실행할까요?

```bash
node --experimental-strip-types example.ts
```

`--experimental-strip-types` 플래그는 Node.js에 TypeScript 코드에서 타입 주석을 제거한 후 실행하라고 지시합니다.

이게 다입니다! 이제 TypeScript 코드를 먼저 트랜스파일하지 않고도 Node.js에서 직접 실행할 수 있으며, TypeScript를 사용해 타입 관련 오류를 잡을 수 있습니다. 향후 Node.js 버전에서는 명령어 플래그 없이도 TypeScript 지원이 포함될 예정입니다.

## 제약 사항

이 글을 쓰는 시점에서 Node.js의 TypeScript 실험적 지원에는 몇 가지 제한이 있습니다. Node.js에서 TypeScript를 실행할 수 있도록 하기 위해, 협업자들은 코드에서 타입만 제거하는 방식을 선택했습니다.

더 자세한 내용은 [API 문서](https://nodejs.org/docs/latest/api/typescript.html#unsupported-typescript-features)에서 확인할 수 있습니다.

## 중요한 참고 사항

이 기능을 가능하게 해준 모든 기여자들에게 감사드립니다. 이 기능이 곧 Node.js LTS 버전에서 안정적으로 제공되기를 기대합니다.

이 기능이 실험적이며 몇 가지 제한 사항이 있음을 이해할 수 있습니다. 만약 이 기능이 여러분의 사용 사례에 적합하지 않다면, 다른 방법을 사용하거나 직접 수정에 기여할 수 있습니다. 버그 보고도 환영합니다. 이 프로젝트는 자원봉사자들에 의해 운영되고 있으니, 직접 수정에 기여할 수 없는 경우에도 인내심을 가져주시기 바랍니다.
