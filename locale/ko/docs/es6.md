---
title: ECMAScript 2015(ES6)와 그 다음
layout: docs.hbs
---

<!--
# ECMAScript 2015 (ES6) and beyond

Node.js is built against modern versions of [V8](https://v8.dev/). By keeping up-to-date with the latest releases of this engine, we ensure new features from the [JavaScript ECMA-262 specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm) are brought to Node.js developers in a timely manner, as well as continued performance and stability improvements.

All ECMAScript 2015 (ES6) features are split into three groups for **shipping**, **staged**, and **in progress** features:

* All **shipping** features, which V8 considers stable, are turned **on by default on Node.js** and do **NOT** require any kind of runtime flag.
* **Staged** features, which are almost-completed features that are not considered stable by the V8 team, require a runtime flag: `--harmony`.
* **In progress** features can be activated individually by their respective harmony flag, although this is highly discouraged unless for testing purposes. Note: these flags are exposed by V8 and will potentially change without any deprecation notice.
-->

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

<!--
## Which features ship with which Node.js version by default?

The website [node.green](https://node.green/) provides an excellent overview over supported ECMAScript features in various versions of Node.js, based on kangax's compat-table.
-->

## Node.js 버전에 어떤 기능이 기본적으로 포함되나요?

[node.green](https://node.green/) 웹사이트에서 어떤 Node.js가 어떤 ECMAScript 기능을
지원하는지 파악할 수 있습니다. 이는 kangax의 호환성 표를 기반으로 만들어졌습니다.

<!--
## Which features are in progress?

New features are constantly being added to the V8 engine. Generally speaking, expect them to land on a future Node.js release, although timing is unknown.

You may list all the *in progress* features available on each Node.js release by grepping through the `--v8-options` argument. Please note that these are incomplete and possibly broken features of V8, so use them at your own risk:

```bash
node --v8-options | grep "in progress"
```
-->

## 어떤 기능이 진행 중입니까?

V8 엔진에 계속해서 새로운 기능이 추가되고 있습니다. 정확한 시기는 알 수 없겠지만
앞으로 릴리스 할 Node.js에는 V8에 추가된 새 기능이 대체로 포함될 것입니다.

`--v8-options` 인자로 각 Node.js 릴리스에서 모든 *in progress* 기능의 리스트를 볼 수
있습니다. 이 기능들은 완성되지 않았고 V8에서 제대로 돌아가지 않을 수도 있으므로 이 기능을 사용할 때는
위험을 감수해야 함을 명심하세요.

```bash
node --v8-options | grep "in progress"
```

<!--
## I have my infrastructure set up to leverage the --harmony flag. Should I remove it?

The current behavior of the `--harmony` flag on Node.js is to enable **staged** features only. After all, it is now a synonym of `--es_staging`. As mentioned above, these are completed features that have not been considered stable yet. If you want to play safe, especially on production environments, consider removing this runtime flag until it ships by default on V8 and, consequently, on Node.js. If you keep this enabled, you should be prepared for further Node.js upgrades to break your code if V8 changes their semantics to more closely follow the standard.
-->

## --harmony 플래그를 사용하는 환경이 있습니다. 이를 제거해야 하나요?

Node.js에서 `--harmony` 플래그의 현재 동작은 **staged** 기능만 활성화하는 것입니다. 결국,
이는 `--es_staging`과 같은 의미입니다. 앞에서 말했듯이 이 기능은 완성되었지만, 아직 안정적이라고
볼 수는 없습니다. 프로덕션 환경 등에서 안전하게 운영하고 싶다면 V8과 Node.js에서 기본적으로
제공할 때까지 이 런타임 플래그를 제거하는 것을 고려해 보세요. 이 기능을 활성화한다면 차후 Node.js를
업그레이드 할 때 V8이 이 기능의 의미를 표준에 더 가깝게 변경한 경우 코드가 깨질 수 있으므로
대비해야 합니다.

<!--
## How do I find which version of V8 ships with a particular version of Node.js?

Node.js provides a simple way to list all dependencies and respective versions that ship with a specific binary through the `process` global object. In case of the V8 engine, type the following in your terminal to retrieve its version:

```bash
node -p process.versions.v8
```
-->

## Node.js의 특정 버전에 포함된 V8의 버전을 어떻게 알 수 있나요?

Node.js에서는 `process` 전역 객체를 통해 특정 바이너리에 포함된 모든 의존성과 각 버전의 목록을
쉽게 볼 수 있습니다. V8 엔진의 경우 터미널에서 다음 명령어를 실행하면 V8 버전을 볼 수 있습니다.

```bash
node -p process.versions.v8
```
