---
title: Node.js, 개발과 프로덕션의 차이
layout: learn
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, RenanTKN, mcollina
---

# Node.js, 개발과 프로덕션의 차이

**Node.js에는 개발과 프로덕션 간의 차이가 없습니다.** 즉, Node.js를 프로덕션 환경에서 작동하도록 설정하기 위해 적용해야 하는 특정 설정이 없습니다. 그러나 npm 레지스트리의 몇몇 라이브러리는 `NODE_ENV` 변수를 인식하며 기본값을 `development`로 설정합니다. 항상 Node.js를 `NODE_ENV=production`으로 설정하여 실행해야 합니다.

애플리케이션을 구성하는 일반적인 방법 중 하나는 [12 요소 방법론](https://12factor.net/)을 사용하는 것입니다.

## Express에서의 NODE_ENV

매우 인기 있는 [express](https://expressjs.com/) 프레임워크에서 `NODE_ENV`를 `production`으로 설정하면 일반적으로 다음을 보장합니다:

- 로그 기록이 최소한으로 유지되며, 필수적인 수준으로 설정됩니다.
- 성능 최적화를 위해 더 많은 캐싱이 이루어집니다.

이는 보통 다음과 같은 명령을 실행하여 수행됩니다:

-`bash
export NODE_ENV=production
-`

셸에서 실행할 수 있지만, 시스템 재시작 시 설정이 지속되지 않으므로 이를 셸 구성 파일(예: Bash 셸의 경우 `.bash_profile`)에 넣는 것이 더 좋습니다.

또한 애플리케이션 초기화 명령 앞에 환경 변수를 추가하여 적용할 수 있습니다:

-`bash
NODE_ENV=production node app.js
-`

예를 들어, Express 애플리케이션에서는 환경별로 서로 다른 오류 처리기를 설정하는 데 이를 사용할 수 있습니다:

```js
if (process.env.NODE_ENV === 'development') {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.errorHandler());
}
```

예를 들어, [Express](https://expressjs.com)에서 사용되는 템플릿 라이브러리인 [Pug](https://pugjs.org)는 `NODE_ENV`가 `production`으로 설정되지 않은 경우 디버그 모드에서 컴파일됩니다. Express의 뷰는 개발 모드에서는 매 요청마다 컴파일되지만, 프로덕션에서는 캐시됩니다. 이 외에도 많은 예가 있습니다.

**이 환경 변수는 외부 라이브러리에서 널리 사용되는 관례이지만 Node.js 자체에서는 사용되지 않습니다.**

## 왜 NODE_ENV가 안티패턴으로 여겨지는가?

환경은 엔지니어가 소프트웨어 제품을 구축하고, 테스트하고, 배포하고, 관리할 수 있는 디지털 플랫폼 또는 시스템입니다. 전통적으로 애플리케이션이 실행되는 네 가지 단계 또는 유형의 환경이 있습니다:

- 개발
- 테스트
- 스테이징
- 프로덕션

`NODE_ENV`의 근본적인 문제는 개발자가 소프트웨어가 실행되는 환경과 최적화 및 소프트웨어 동작을 결합하는 데서 발생합니다. 그 결과 다음과 같은 코드가 생성됩니다:

```js
if (process.env.NODE_ENV === 'development') {
  // ...
}

if (process.env.NODE_ENV === 'production') {
  // ...
}

if (['production', 'staging'].includes(process.env.NODE_ENV)) {
  // ...
}
```

이러한 코드가 무해해 보일 수 있지만, 이는 프로덕션 및 스테이징 환경을 다르게 만들어 신뢰할 수 있는 테스트를 불가능하게 만듭니다. 예를 들어, `NODE_ENV`가 `development`로 설정되어 있을 때 테스트와 제품의 기능이 통과할 수 있지만, `NODE_ENV`를 `production`으로 설정할 경우 실패할 수 있습니다. 따라서 `NODE_ENV`를 `production`이 아닌 다른 값으로 설정하는 것은 *안티패턴*으로 간주됩니다.
