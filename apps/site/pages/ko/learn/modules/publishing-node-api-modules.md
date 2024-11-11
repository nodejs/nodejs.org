---
title: Node-API 버전의 패키지를 출판하는 방법
layout: learn
---

# Node-API 버전과 비-Node-API 버전의 패키지를 함께 출판하는 방법

다음 단계는 `iotivity-node` 패키지를 사용하여 설명됩니다:

- 먼저, 비-Node-API 버전을 출판합니다:
  - `package.json`의 버전을 업데이트합니다. `iotivity-node`의 경우, 버전은 `1.2.0-2`가 됩니다.
  - 릴리스 체크리스트를 확인합니다 (테스트/데모/문서가 올바른지 확인)
  - `npm publish`
- 그 다음, Node-API 버전을 출판합니다:
  - `package.json`의 버전을 업데이트합니다. `iotivity-node`의 경우, 버전은 `1.2.0-3`이 됩니다. 버전 관리는 [semver.org](https://semver.org/#spec-item-9)에서 설명하는 프리릴리스 버전 체계를 따르는 것을 권장합니다. 예: `1.2.0-napi`.
  - 릴리스 체크리스트를 확인합니다 (테스트/데모/문서가 올바른지 확인)
  - `npm publish --tag n-api`

이 예시에서 `n-api` 태그로 릴리스를 태그한 것은, 비록 1.2.0-3 버전이 비-Node-API 버전(1.2.0-2)보다 나중에 출판되었지만, 누군가가 단순히 `npm install iotivity-node` 명령을 실행하여 `iotivity-node`를 설치할 때 Node-API 버전이 설치되지 않도록 보장합니다. 기본적으로는 비-Node-API 버전이 설치됩니다. 사용자는 `npm install iotivity-node@n-api` 명령을 실행하여 Node-API 버전을 받아야 합니다. npm에서 태그를 사용하는 방법에 대한 자세한 내용은 ["Using dist-tags"][]를 참조하세요.

## Node-API 버전의 패키지를 의존성으로 추가하는 방법

`iotivity-node`의 Node-API 버전을 의존성으로 추가하려면, `package.json`은 다음과 같이 작성됩니다:

```json
"dependencies": {
"iotivity-node": "n-api"
}
```

> ["Using dist-tags"][]에서 설명한 것처럼, 일반적인 버전과 달리 태그된 버전은 `package.json` 내부에서 `"^2.0.0"`과 같은 버전 범위로 참조할 수 없습니다. 그 이유는 태그가 정확히 하나의 버전을 가리키기 때문입니다. 따라서 패키지 유지 관리자가 동일한 태그를 사용하여 패키지의 나중 버전을 태그하기로 선택한 경우, `npm update`는 나중 버전을 받게 됩니다. 이는 최신 버전 이외의 특정 버전을 수용해야 할 경우, `package.json` 의존성에서 정확한 버전을 참조해야 하며, 다음과 같이 작성됩니다:

```json
"dependencies": {
"iotivity-node": "1.2.0-3"
}
```

["Using dist-tags"]: https://docs.npmjs.com/getting-started/using-tags
