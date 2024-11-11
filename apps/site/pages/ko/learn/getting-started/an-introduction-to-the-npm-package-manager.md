---
title: npm 패키지 관리자 소개
layout: learn
authors: flaviocopes, MylesBorins, LaRuaNa, jgb-solutions, amiller-gh, ahmadawais
---

# npm 패키지 관리자 소개

## npm 소개

`npm`은 Node.js의 표준 패키지 관리자입니다.

2022년 9월 기준으로 npm 레지스트리에는 210만 개 이상의 패키지가 등록되어 있으며, 이는 단일 언어 코드 저장소 중에서 세계에서 가장 큰 규모입니다. 따라서 (거의!) 모든 것을 위한 패키지가 있다고 확신할 수 있습니다.

npm은 처음에는 Node.js 패키지의 의존성을 다운로드하고 관리하는 방법으로 시작했지만, 현재는 프론트엔드 JavaScript에서도 사용되는 도구가 되었습니다.

> [**Yarn**](https://yarnpkg.com/en/)과 [**pnpm**](https://pnpm.io)은 npm cli의 대안입니다. 이들도 확인해보세요.

## 패키지

`npm`은 프로젝트의 의존성 다운로드를 관리합니다.

### 모든 의존성 설치하기

프로젝트에 `package.json` 파일이 있다면,

```bash
npm install
```

명령어를 실행하면 `node_modules` 폴더에 프로젝트에 필요한 모든 것이 설치됩니다. 해당 폴더가 없으면 자동으로 생성됩니다.

### 단일 패키지 설치하기

특정 패키지를 설치하려면,

```bash
npm install <package-name>
```

를 실행하면 됩니다. 또한 npm 5부터 이 명령어는 `<package-name>`을 `package.json` 파일의 *dependencies*에 추가합니다. 5버전 이전에는 `--save` 플래그를 추가해야 했습니다.

종종 이 명령어에 추가 플래그를 볼 수 있습니다:

- `--save-dev`는 패키지를 설치하고 이를 `package.json` 파일의 *devDependencies*에 추가합니다.
- `--no-save`는 패키지를 설치하되, 이를 `package.json` 파일의 *dependencies*에 추가하지 않습니다.
- `--save-optional`은 패키지를 설치하고 이를 `package.json` 파일의 *optionalDependencies*에 추가합니다.
- `--no-optional`은 선택적 의존성을 설치하지 않도록 방지합니다.

다음과 같은 축약형 플래그도 사용할 수 있습니다:

- \-S: `--save`
- \-D: `--save-dev`
- \-O: `--save-optional`

*devDependencies*와 *dependencies*의 차이는 전자는 테스트 라이브러리와 같은 개발 도구를 포함하며, 후자는 프로덕션 환경에서 앱과 함께 번들된다는 점입니다.

*optionalDependencies*의 차이점은 해당 의존성 설치 실패가 전체 설치 실패로 이어지지 않는다는 것입니다. 하지만 의존성이 없는 경우에 대해 프로그램에서 이를 처리해야 합니다. [선택적 의존성](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#optionaldependencies)에 대해 더 알아보세요.

### 패키지 업데이트

업데이트도 간편하게 할 수 있습니다.

```bash
npm update
```

명령어를 실행하면 `npm`은 버전 제약 조건을 만족하는 새 버전이 있는지 모든 패키지를 확인합니다.

특정 패키지를 업데이트하려면,

```bash
npm update <package-name>
```

를 실행하면 됩니다.

## 버전 관리

단순히 다운로드만 하는 것이 아니라 `npm`은 **버전 관리**도 합니다. 이를 통해 특정 버전의 패키지를 지정하거나 필요한 버전보다 높은 버전을 요구할 수 있습니다.

많은 경우 라이브러리가 다른 라이브러리의 주요 릴리스와만 호환됩니다.

또는 아직 수정되지 않은 라이브러리의 최신 릴리스에 버그가 있는 경우도 있습니다.

특정 버전의 라이브러리를 지정하면 모든 팀원이 동일한 패키지 버전을 사용하도록 할 수 있습니다. 이를 통해 `package.json` 파일이 업데이트될 때까지 동일한 버전을 유지할 수 있습니다.

이러한 모든 경우에서 버전 관리는 매우 유용하며, `npm`은 semver(유의적 버전 관리) 표준을 따릅니다.

특정 버전의 패키지를 설치하려면,

```bash
npm install <package-name>@<version>
```

명령어를 실행하면 됩니다.

## 작업 실행

`package.json` 파일은 명령줄 작업을 지정하는 형식을 지원하며, 이를 실행하려면

```bash
npm run <task-name>
```

명령어를 사용합니다.

예를 들어:

```json
{
  "scripts": {
    "start-dev": "node lib/server-development",
    "start": "node lib/server-production"
  }
}
```

이 기능은 웹팩(Webpack)을 실행할 때 자주 사용됩니다:

```json
{
  "scripts": {
    "watch": "webpack --watch --progress --colors --config webpack.conf.js",
    "dev": "webpack --progress --colors --config webpack.conf.js",
    "prod": "NODE_ENV=production webpack -p --config webpack.conf.js"
  }
}
```

따라서 이러한 긴 명령어를 직접 입력하는 대신에, 다음과 같이 실행할 수 있습니다:

```console
$ npm run watch
$ npm run dev
$ npm run prod
```
