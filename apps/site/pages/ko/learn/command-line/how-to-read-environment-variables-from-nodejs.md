---
title: Node.js에서 환경 변수를 읽는 방법
layout: learn
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, manishprivet, nikhilbhatt
---

# Node.js에서 환경 변수를 읽는 방법

Node.js의 `process` 코어 모듈은 프로세스가 시작될 때 설정된 모든 환경 변수를 포함하는 `env` 속성을 제공합니다.

다음 코드는 `app.js`를 실행하고 `USER_ID`와 `USER_KEY`를 설정하는 방법입니다.

```bash
USER_ID=239482 USER_KEY=foobar node app.js
```

이 명령은 `USER_ID`를 **239482**로, `USER_KEY`를 **foobar**로 전달합니다. 이는 테스트에 적합하며, 실제 환경에서는 변수를 내보내기 위한 bash 스크립트를 설정할 가능성이 높습니다.

> 참고: `process`는 "require"가 필요하지 않으며, 자동으로 사용 가능합니다.

다음은 위 코드에서 설정한 `USER_ID`와 `USER_KEY` 환경 변수를 액세스하는 예시입니다.

```js
process.env.USER_ID; // "239482"
process.env.USER_KEY; // "foobar"
```

동일한 방식으로 설정한 모든 커스텀 환경 변수에 접근할 수 있습니다.

Node.js 20에서는 **실험적인** [`.env` 파일 지원](https://nodejs.org/dist/latest-v20.x/docs/api/cli.html#--env-fileconfig)을 도입했습니다.

이제 `--env-file` 플래그를 사용해 Node.js 애플리케이션을 실행할 때 환경 파일을 지정할 수 있습니다. 아래는 `.env` 파일 예시와 `process.env`를 사용해 그 변수를 액세스하는 방법입니다.

```bash

# .env 파일

PORT=3000
```

자바스크립트 파일에서

```js
process.env.PORT; // "3000"
```

`.env` 파일로 설정된 환경 변수를 사용하여 `app.js` 파일을 실행하는 명령어는 다음과 같습니다.

```bash
node --env-file=.env app.js
```

이 명령어는 `.env` 파일의 모든 환경 변수를 로드하여 `process.env`에서 사용할 수 있게 합니다.

또한 여러 `--env-file` 인자를 전달할 수 있으며, 이후 파일은 이전 파일에서 정의된 변수를 덮어씁니다.

```bash
node --env-file=.env --env-file=.development.env app.js
```

> 참고: 동일한 변수가 환경과 파일 모두에 정의되어 있으면, 환경 변수의 값이 우선됩니다.
