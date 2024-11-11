---
title: 명령줄에서 Node.js 스크립트 실행하기
layout: learn
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, akazyti, AugustinMauroy
---

# 명령줄에서 Node.js 스크립트 실행하기

Node.js 프로그램을 실행하는 일반적인 방법은 전역적으로 사용할 수 있는 `node` 명령어를 실행하고 실행하려는 파일의 이름을 전달하는 것입니다.

주요 Node.js 애플리케이션 파일이 `app.js`인 경우, 다음과 같이 호출할 수 있습니다.

```bash
node app.js
```

위의 명령은 셸에 `node`로 스크립트를 실행하라고 명시적으로 지시하는 것입니다. 또한 이 정보를 JavaScript 파일에 "shebang" 줄로 포함할 수 있습니다. "shebang"은 파일의 첫 번째 줄이며, 스크립트를 실행하는 데 사용할 인터프리터를 OS에 알려줍니다. 아래는 JavaScript의 첫 번째 줄입니다.

```js
#!/usr/bin/node
```

위에서는 인터프리터의 절대 경로를 명시적으로 지정하고 있습니다. 모든 운영 체제가 bin 폴더에 `node`가 있는 것은 아니지만, 모든 운영 체제는 `env`를 가지고 있어야 합니다. OS에 `env`를 node 매개변수와 함께 실행하라고 지시할 수 있습니다.

```js
#!/usr/bin/env node

// 자바스크립트 코드
```

shebang을 사용하려면 파일에 실행 권한이 있어야 합니다. `app.js`에 실행 권한을 부여하려면 다음을 실행합니다.

```bash
chmod u+x app.js
```

명령을 실행할 때 `app.js` 파일이 포함된 동일한 디렉터리에 있는지 확인하세요.

## 파일 경로 대신 문자열을 `node`에 인수로 전달하기

문자열을 인수로 실행하려면 `-e`, `--eval "script"`를 사용할 수 있습니다. 다음 인수를 JavaScript로 평가합니다. REPL에 미리 정의된 모듈도 스크립트에서 사용할 수 있습니다.

Windows의 cmd.exe에서는 단일 인용 부호가 올바르게 작동하지 않으므로, 쌍따옴표 `"`만 인용으로 인식합니다. Powershell이나 Git bash에서는 `'`와 `"` 모두 사용할 수 있습니다.

```bash
node -e "console.log(123)"
```

## 애플리케이션 자동으로 재시작하기

Node.js V16부터 파일이 변경될 때 애플리케이션을 자동으로 재시작하는 내장 옵션이 있습니다. 이는 개발 목적으로 유용합니다. 이 기능을 사용하려면 `--watch` 플래그를 node.js에 전달해야 합니다.

```bash
node --watch app.js
```

따라서 파일을 변경하면 애플리케이션이 자동으로 재시작됩니다. [`--watch` 플래그 문서](https://nodejs.org/docs/latest/api/cli.html#--watch)를 참조하세요.
