---
title: ECMAScript 2015(ES6)와 그 다음
layout: docs.hbs
---

# ECMAScript 2015(ES6)와 그 다음

Node.js is built against modern versions of [V8](https://v8.dev/). By keeping up-to-date with the latest releases of this engine, we ensure new features from the [JavaScript ECMA-262 specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm) are brought to Node.js developers in a timely manner, as well as continued performance and stability improvements.

Node.js는 [V8](https://v8.dev/)의 최신 버전으로 만들었습니다. V8을 최신 릴리스로 유지하기 때문에 Node.js 개발자에게 [JavaScript ECMA-262 명세](http://www.ecma-international.org/publications/standards/Ecma-262.htm)의 새로운 기능을 제때에 지원하면서 성능과 안정성 개선도 할 수 있습니다.

* All **shipping** features, which V8 considers stable, are turned **on by default on Node.js** and do **NOT** require any kind of runtime flag.
* **Staged** features, which are almost-completed features that are not considered stable by the V8 team, require a runtime flag: `--harmony`.
* **In progress** features can be activated individually by their respective harmony flag, although this is highly discouraged unless for testing purposes. Note: these flags are exposed by V8 and will potentially change without any deprecation notice.

## Node.js 버전에 어떤 기능이 기본적으로 포함되나요?

모든 ECMAScript 2015(ES6) 기능은 **shipping**, **staged**, **in progress**라는 세 가지 그룹으로 나뉩니다.

## 어떤 기능이 진행 중입니까?

New features are constantly being added to the V8 engine. Generally speaking, expect them to land on a future Node.js release, although timing is unknown.

[node.green](https://node.green/) 웹사이트에서 어떤 Node.js가 어떤 ECMAScript 기능을 지원하는지 파악할 수 있습니다. 이는 kangax의 호환성 표를 기반으로 만들어졌습니다.

```bash
node --v8-options | grep "in progress"
```

## 특정 기능의 성능은 어떻습니까?

The V8 team is constantly working to improve the performance of new language features to eventually reach parity with their transpiled or native counterparts in EcmaScript 5 and earlier. The current progress there is tracked on the website [six-speed](https://fhinkel.github.io/six-speed), which shows the performance of ES2015 and ESNext features compared to their native ES5 counterparts.

V8 엔진에 계속해서 새로운 기능이 추가되고 있습니다. 정확한 시기는 알 수 없겠지만 앞으로 릴리스 할 Node.js에는 V8에 추가된 새 기능이 대체로 포함될 것입니다.

## --harmony 플래그를 사용하는 환경이 있습니다. 이를 제거해야 하나요?

`--v8-options` 인자로 각 Node.js 릴리스에서 모든 *in progress* 기능의 리스트를 볼 수 있습니다. 이 기능들은 완성되지 않았고 V8에서 제대로 돌아가지 않을 수도 있으므로 이 기능을 사용할 때는 위험을 감수해야 함을 명심하세요.

## Node.js의 특정 버전에 포함된 V8의 버전을 어떻게 알 수 있나요?

Node.js provides a simple way to list all dependencies and respective versions that ship with a specific binary through the `process` global object. In case of the V8 engine, type the following in your terminal to retrieve its version:

```bash
node -p process.versions.v8
```
