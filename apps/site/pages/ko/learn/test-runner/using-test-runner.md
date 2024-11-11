---
title: Node.js의 테스트 러너 사용하기
layout: learn
authors: JakobJingleheimer
---

# Node.js의 테스트 러너 사용하기

Node.js에는 유연하고 강력한 내장 테스트 러너가 있습니다. 이 가이드에서는 이를 설정하고 사용하는 방법을 보여줍니다.

```text displayName="아키텍처 개요"
example/
  ├ …
  ├ src/
    ├ app/…
    └ sw/…
  └ test/
    ├ globals/
      ├ …
      ├ IndexedDb.js
      └ ServiceWorkerGlobalScope.js
    ├ setup.mjs
    ├ setup.units.mjs
    └ setup.ui.mjs
```

```bash displayName="의존성 설치"
npm init -y
npm install --save-dev concurrently
```

```json displayName="package.json"
{
  "name": "example",
  "scripts": {
    "test": "concurrently --kill-others-on-fail --prefix none npm:test:*",
    "test:sw": "node --import ./test/setup.sw.mjs --test './src/sw/**/*.spec.*'",
    "test:units": "node --import ./test/setup.units.mjs --test './src/app/**/*.spec.*'",
    "test:ui": "node --import ./test/setup.ui.mjs --test './src/app/**/*.test.*'"
  }
}
```

> **참고**: globs는 node v21+에서 필요하며, globs는 따옴표로 감싸야 합니다. (그렇지 않으면 예상과 다른 동작을 하게 될 수 있으며, 처음에는 작동하는 것처럼 보이지만 실제로는 그렇지 않을 수 있습니다).

항상 필요한 설정이 몇 가지 있으므로, 아래와 같은 기본 설정 파일에 넣어 두세요. 이 파일은 더 특화된 설정 파일에 의해 가져와집니다.

## 일반 설정

<details>
<summary>`test/setup.mjs`</summary>

```js
import { register } from 'node:module';

register('some-typescript-loader');
// 이제 TypeScript가 지원됩니다.
// 하지만 다른 test/setup.*.mjs 파일들은 여전히 순수 JavaScript여야 합니다!
```

</details>

그 후 각 설정에 대해 전용 `setup` 파일을 만들어야 하며, 각 파일에 기본 `setup.mjs` 파일이 가져와졌는지 확인하세요. 설정을 분리하는 이유는 여러 가지가 있지만, 가장 명확한 이유는 [YAGNI](https://en.wikipedia.org/wiki/You_aren't_gonna_need_it) + 성능 때문입니다. 설정하는 대부분의 것들은 환경별 모의 객체/스텁일 수 있으며, 이는 매우 비싸고 테스트 실행 속도를 느리게 만들 수 있습니다. 필요하지 않을 때는 이러한 비용(예: CI에서 지불하는 실제 돈, 테스트 완료까지 기다리는 시간)을 피하고 싶을 것입니다.

아래의 각 예시는 실제 프로젝트에서 가져온 것이며, 여러분의 프로젝트에는 적합하지 않을 수 있습니다. 하지만 각각은 널리 적용 가능한 일반 개념을 보여줍니다.

## ServiceWorker 테스트

[`ServiceWorkerGlobalScope`](https://developer.mozilla.org/docs/Web/API/ServiceWorkerGlobalScope)는 다른 환경에서는 존재하지 않는 매우 특정한 API들을 포함하고 있으며, 일부 API는 다른 환경의 것들과 유사하지만(예: `fetch`) 동작이 다릅니다. 이러한 API가 관련 없는 테스트로 퍼지지 않도록 해야 합니다.

<details>
<summary>`test/setup.sw.mjs`</summary>

```js
import { beforeEach } from 'node:test';

import { ServiceWorkerGlobalScope } from './globals/ServiceWorkerGlobalScope.js';

import './setup.mjs'; // 💡

beforeEach(globalSWBeforeEach);
function globalSWBeforeEach() {
  globalThis.self = new ServiceWorkerGlobalScope();
}
```

</details>

```js
import assert from 'node:assert/strict';
import { describe, mock, it } from 'node:test';

import { onActivate } from './onActivate.js';

describe('ServiceWorker::onActivate()', () => {
  const globalSelf = globalThis.self;
  const claim = mock.fn(async function mock__claim() {});
  const matchAll = mock.fn(async function mock__matchAll() {});

  class ActivateEvent extends Event {
    constructor(...args) {
      super('activate', ...args);
    }
  }

  before(() => {
    globalThis.self = {
      clients: { claim, matchAll },
    };
  });
  after(() => {
    global.self = globalSelf;
  });

  it('모든 클라이언트를 클레임해야 합니다.', async () => {
    await onActivate(new ActivateEvent());

    assert.equal(claim.mock.callCount(), 1);
    assert.equal(matchAll.mock.callCount(), 1);
  });
});
```

## 스냅샷 테스트

이 기능은 Jest에 의해 대중화되었으며, 이제 많은 라이브러리들이 이를 구현하고 있습니다. Node.js도 v22.3.0부터 이 기능을 지원합니다. 여러 사용 사례가 있는데, 예를 들어 컴포넌트 렌더링 출력 확인 및 [인프라 코드](https://en.wikipedia.org/wiki/Infrastructure_as_code) 구성을 검증할 수 있습니다. 사용 사례와 관계없이 개념은 동일합니다.

특정한 구성이 _필요한_ 것은 아니지만, [`--experimental-test-snapshots`](https://) 옵션을 통해 기능을 활성화할 수 있습니다. 하지만 선택적 구성을 보여주기 위해, 기존 테스트 구성 파일에 다음과 같은 내용을 추가할 수 있습니다.

<details>
<summary>`test/setup.ui.mjs`</summary>

기본적으로, Node.js는 구문 강조 감지가 호환되지 않는 파일명을 생성합니다: `.js.snapshot`. 생성된 파일은 실제로 CJS 파일이므로 더 적절한 파일명은 `.snapshot.cjs` (또는 아래의 `.snap.cjs`와 같이 더 간결한 파일명)입니다. 이렇게 하면 ESM 프로젝트에서도 더 나은 처리가 가능합니다.

```js
import { basename, dirname, extname, join } from 'node:path';
import { snapshot } from 'node:test';

snapshot.setResolveSnapshotPath(generateSnapshotPath);
/**
 * @param {string} testFilePath '/tmp/foo.test.js'
 * @returns {string} '/tmp/foo.test.snap.cjs'
 */
function generateSnapshotPath(testFilePath) {
  const ext = extname(testFilePath);
  const filename = basename(testFilePath, ext);
  const base = dirname(testFilePath);

  return join(base, `${filename}.snap.cjs`);
}
```

</details>

아래 예시는 UI 컴포넌트에 대한 스냅샷 테스트를 [테스팅 라이브러리](https://testing-library.com/)로 구현한 것입니다. `assert.snapshot`에 접근하는 두 가지 다른 방법에 주목하세요:

```ts
import { describe, it } from 'node:test';

import { prettyDOM } from '@testing-library/dom';
import { render } from '@testing-library/react'; // 어떤 프레임워크도 상관없음 (ex: svelte)

import { SomeComponent } from './SomeComponent.jsx';


describe('<SomeComponent>', () => {
  // "fat-arrow" 문법을 선호하는 사람들을 위해, 일관성을 위해 아래와 같이 작성할 수 있습니다.
  it('props가 제공되지 않았을 때 기본값을 렌더링해야 합니다.', (t) => {
    const component = render(<SomeComponent />).container.firstChild;

    t.assert.snapshot(prettyDOM(component));
  });

  it('`foo`가 제공되었을 때 이를 소비해야 합니다.', function() {
    const component = render(<SomeComponent foo="bar" />).container.firstChild;

    this.assert.snapshot(prettyDOM(component));
    // `this`는 "fat-arrow"가 아닌 function 사용 시에만 작동합니다.
  });
});
```

> ⚠️ `assert.snapshot`은 테스트의 컨텍스트 (`t` 또는 `this`)에서 제공되며, **`node:assert`에서 제공되지 않습니다.** 이는 테스트 컨텍스트가 `node:assert`로는 불가능한 범위에 접근할 수 있기 때문입니다. `node:assert`를 사용할 경우, 매번 수동으로 `snapshot(this, value)`처럼 제공해야 하기 때문에 번거로울 수 있습니다.

## 단위 테스트

단위 테스트는 가장 단순한 테스트이며, 일반적으로 특별한 구성이 필요하지 않습니다. 대부분의 테스트가 단위 테스트일 가능성이 높으므로, 이 설정을 최소화하는 것이 중요합니다. 설정 성능이 조금만 저하되어도 그 영향이 커지고 연쇄적으로 퍼질 수 있습니다.

<details>
<summary>`test/setup.units.mjs`</summary>

```js
import { register } from 'node:module';

import './setup.mjs'; // 💡

register('some-plaintext-loader');
// 이제 평문 파일 (예: graphql)도 임포트할 수 있습니다.
// import GET_ME from 'get-me.gql'; GET_ME = '
```

</details>

```js
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { Cat } from './Cat.js';
import { Fish } from './Fish.js';
import { Plastic } from './Plastic.js';

describe('Cat', () => {
  it('고양이는 물고기를 먹어야 합니다.', () => {
    const cat = new Cat();
    const fish = new Fish();

    assert.doesNotThrow(() => cat.eat(fish));
  });

  it('고양이는 플라스틱을 먹어서는 안 됩니다.', () => {
    const cat = new Cat();
    const plastic = new Plastic();

    assert.throws(() => cat.eat(plastic));
  });
});
```

## 사용자 인터페이스 테스트

UI 테스트는 일반적으로 DOM과 기타 브라우저 전용 API(아래 사용된 [`IndexedDb`](https://developer.mozilla.org/docs/Web/API/IndexedDB_API) 등)를 필요로 합니다. 이들은 매우 복잡하고 설정 비용이 큽니다.

<details>
<summary>`test/setup.ui.mjs`</summary>

만약 `IndexedDb`와 같은 API를 사용하는데 매우 고립되어 있다면, 아래와 같은 글로벌 모의 객체는 적합하지 않을 수 있습니다. 대신 `IndexedDb`에 접근할 특정 테스트에 `beforeEach`를 이동시키는 것이 좋습니다. 모듈이 자체적으로 광범위하게 접근된다면 모듈을 모의 객체로 만들거나 (아마도 더 나은 선택), 이 설정을 유지하세요.

```js
import { register } from 'node:module';

// ⚠️ JSDom 인스턴스가 하나만 생성되었는지 확인하세요. 여러 개를 생성하면 많은 🤬이 발생합니다.
import jsdom from 'global-jsdom';

import './setup.units.mjs'; // 💡

import { IndexedDb } from './globals/IndexedDb.js';

register('some-css-modules-loader');

jsdom(undefined, {
  url: 'https://test.example.com', // ⚠️ 이 URL을 지정하지 않으면 많은 🤬이 발생할 수 있습니다.
});

// 글로벌 객체를 꾸미는 예시입니다.
// JSDOM의 `history`는 탐색을 처리하지 않으므로, 아래는 대부분의 경우를 처리합니다.
const pushState = globalThis.history.pushState.bind(globalThis.history);
globalThis.history.pushState = function mock_pushState(data, unused, url) {
  pushState(data, unused, url);
  globalThis.location.assign(url);
};

beforeEach(globalUIBeforeEach);
function globalUIBeforeEach() {
  globalThis.indexedDb = new IndexedDb();
}
```

</details>

UI 테스트에는 두 가지 수준이 있습니다: 외부 및 종속성을 모의한 유닛 테스트 수준과, 종속성 외부만 모의하고 나머지 체인은 실제로 처리하는 더 엔드투엔드 수준입니다. 전자는 일반적으로 더 순수한 옵션이며, 후자는 보통 [Playwright](https://playwright.dev/)나 [Puppeteer](https://pptr.dev/)와 같은 도구를 사용하는 완전한 엔드투엔드 자동화 테스트로 넘겨집니다. 아래는 전자의 예시입니다.

```ts
import { before, describe, mock, it } from 'node:test';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react'; // 어떤 프레임워크도 상관없음 (ex: svelte)

// ⚠️ SomeOtherComponent는 정적 임포트가 아닙니다;
// 이는 그 자체로 모의하는 것을 용이하게 하기 위해 필요합니다.

describe('<SomeOtherComponent>', () => {
  let SomeOtherComponent;
  let calcSomeValue;

  before(async () => {
    // ⚠️ 순서가 중요합니다: 소비자가 임포트되기 전에 모의 객체가 설정되어야 합니다.

    // `--experimental-test-module-mocks` 옵션이 필요합니다.
    calcSomeValue = mock.module('./calcSomeValue.js', { calcSomeValue: mock.fn() });

    ({ SomeOtherComponent } = await import('./SomeOtherComponent.jsx'));
  });

  describe('calcSomeValue가 실패할 때', () => {
    // 스냅샷으로 처리하고 싶지 않은 이유: 너무 변동이 심해지기 때문입니다.
    // 중요하지 않은 에러 메시지 업데이트로 인해 스냅샷 테스트가 잘못 실패할 수 있습니다.
    // (그리고 실제로는 큰 의미가 없는 스냅샷을 업데이트해야 할 수 있습니다).

    it('멋진 에러를 표시하여 우아하게 실패해야 합니다.', () => {
      calcSomeValue.mockImplementation(function mock__calcSomeValue() { return null });

      render(<SomeOtherComponent>);

      const errorMessage = screen.queryByText('unable');

      assert.ok(errorMessage);
    });
  });
});
```
