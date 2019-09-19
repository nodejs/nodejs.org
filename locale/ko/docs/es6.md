---
title: ECMAScript 2015(ES6)와 그 다음
layout: docs.hbs
---

# ECMAScript 2015(ES6)와 그 다음

Node.js는 [V8](https://v8.dev/)의 최신 버전으로 만들었습니다.
V8을 최신 릴리스로 유지하기 때문에 Node.js 개발자에게
[JavaScript ECMA-262 명세](http://www.ecma-international.org/publications/standards/Ecma-262.htm)의
새로운 기능을 제때에 지원하면서 성능과 안정성 개선도 할 수 있습니다.

모든 ECMAScript 2015(ES6) 기능은 **shipping**, **staged**, **in progress**라는
세 가지 그룹으로 나뉩니다.

* 모든 **shipping** 기능은 V8이 안정적이라고 간주한 것으로
  **Node.js에서는 기본적으로 켜져 있으므로** 런타임 플래그가 전혀 **필요 없습니다**.
* **Staged** 기능은 거의 완성되었지만, V8 팀이 안정적이라고 간주하지 않은 기능으로
  `--harmony` 런타임 플래그가 필요합니다.
* **In progress** 기능은 각 하모니 플래그로 개별적으로 활성화할 수 있습니다. 테스트 목적이
  아니라면 활성화하지 않기를 강력하게 권장합니다. 주의: 이 플래그는 V8에서 제공한 것으로
  폐기 공지 없이 변경될 수 있습니다.

## Node.js 버전에 어떤 기능이 기본적으로 포함되나요?

[node.green](https://node.green/) 웹사이트에서 어떤 Node.js가 어떤 ECMAScript 기능을
지원하는지 파악할 수 있습니다. 이는 kangax의 호환성 표를 기반으로 만들어졌습니다.

## 어떤 기능이 진행 중입니까?

V8 엔진에 계속해서 새로운 기능이 추가되고 있습니다. 정확한 시기는 알 수 없겠지만
앞으로 릴리스 할 Node.js에는 V8에 추가된 새 기능이 대체로 포함될 것입니다.

`--v8-options` 인자로 각 Node.js 릴리스에서 모든 *in progress* 기능의 리스트를 볼 수
있습니다. 이 기능들은 완성되지 않았고 V8에서 제대로 돌아가지 않을 수도 있으므로 이 기능을 사용할 때는
위험을 감수해야 함을 명심하세요.

```bash
node --v8-options | grep "in progress"
```

## 특정 기능의 성능은 어떻습니까?

V8 팀은 새로운 언어 기능의 성능을 향상시켜 EcmaScript 5나 그 이전 버전의 네이티브 코드 또는
트랜스파일된 코드와 동등해질 수 있도록 끊임없이 노력하고 있습니다. 현재 진행 상황은 웹 사이트
[six-speed](https://fhinkel.github.io/six-speed)에서 확인할 수 있습니다. 이는 ES2015
및 ESNext 기능의 성능을 네이티브 ES5와 비교하여 보여줍니다.

ES2015 이후 도입된 기능의 최적화에 대한 작업은
[성능 계획](https://docs.google.com/document/d/1EA9EbfnydAmmU_lM8R_uEMQ-U_v4l9zulePSBkeYWmY)을 통해 조정됩니다.
성능 계획 문서에서는 V8 팀에서 개선이 필요한 부분을 모아 분류하고, 이 문제들을 해결하기 위해
설계한 문서를 확인할 수 있습니다.

## --harmony 플래그를 사용하는 환경이 있습니다. 이를 제거해야 하나요?

Node.js에서 `--harmony` 플래그의 현재 동작은 **staged** 기능만 활성화하는 것입니다. 결국,
이는 `--es_staging`과 같은 의미입니다. 앞에서 말했듯이 이 기능은 완성되었지만, 아직 안정적이라고
볼 수는 없습니다. 프로덕션 환경 등에서 안전하게 운영하고 싶다면 V8과 Node.js에서 기본적으로
제공할 때까지 이 런타임 플래그를 제거하는 것을 고려해 보세요. 이 기능을 활성화한다면 차후 Node.js를
업그레이드 할 때 V8이 이 기능의 의미를 표준에 더 가깝게 변경한 경우 코드가 깨질 수 있으므로
대비해야 합니다.

## Node.js의 특정 버전에 포함된 V8의 버전을 어떻게 알 수 있나요?

Node.js에서는 `process` 전역 객체를 통해 특정 바이너리에 포함된 모든 의존성과 각 버전의 목록을
쉽게 볼 수 있습니다. V8 엔진의 경우 터미널에서 다음 명령어를 실행하면 V8 버전을 볼 수 있습니다.

```bash
node -p process.versions.v8
```
