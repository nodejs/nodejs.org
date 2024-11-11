---
title: 테스트에서 Mocking하기
layout: learn
authors: JakobJingleheimer
---

# 테스트에서 Mocking하기

Mocking은 어떤 사물의 모조품, 꼭두각시를 만드는 방법입니다. 일반적으로 'a가 발생하면, b를 실행하라'는 식으로 꼭두각시처럼 동작하게 만듭니다. Mocking의 목적은 복잡한 요소의 수를 줄이고, 중요하지 않은 것들을 제어하는 것입니다. "mocks"와 "stubs"는 기술적으로 "테스트 더블"의 다른 유형입니다. 참고로, 스텁은 아무런 동작도 하지 않지만 호출을 추적하는 대체품입니다. 반면, 모킹은 'a가 발생하면, b를 실행하라'와 같이 가짜 구현을 제공하는 스텁입니다. 이 문서에서는 이 차이가 중요하지 않으므로, 스텁을 모킹으로 통칭합니다.

테스트는 결정론적이어야 합니다: 어떤 순서로 실행되든, 몇 번을 실행하든 항상 동일한 결과를 생성해야 합니다. 적절한 설정과 모킹이 이를 가능하게 합니다.

Node.js는 다양한 코드 조각을 모킹할 수 있는 여러 가지 방법을 제공합니다.

이 문서에서는 다음 유형의 테스트를 다룹니다:

| 유형             | 설명                                       | 예시                                                                                                 | 모킹 후보군                       |
| :--------------- | :----------------------------------------- | :--------------------------------------------------------------------------------------------------- | :-------------------------------- |
| 유닛             | 가장 작은 독립 가능한 코드                 | `const sum = (a, b) => a + b`                                                                        | 자체 코드, 외부 코드, 외부 시스템 |
| 컴포넌트         | 유닛 + 의존성                              | `const arithmetic = (op = sum, a, b) => ops[op](a, b)`                                               | 외부 코드, 외부 시스템            |
| 통합             | 여러 컴포넌트 결합 테스트                  | -                                                                                                    | 외부 코드, 외부 시스템            |
| 엔드투엔드 (e2e) | 애플리케이션 + 외부 데이터 저장소, 배포 등 | 가상의 사용자(ex: Playwright 에이전트)가 실제 외부 시스템과 연결된 애플리케이션을 사용하는 시나리오. | 없음 (모킹하지 않음)              |

모킹할지 말지에 대한 다양한 의견이 있으며, 그 개략적인 내용은 아래에 설명되어 있습니다.

## 모킹할 때와 하지 말아야 할 때

주요 모킹 후보는 3가지입니다:

- 자체 코드
- 외부 코드
- 외부 시스템

### 자체 코드

이것은 프로젝트가 제어하는 코드입니다.

```mjs displayName="your-project/main.mjs"
import foo from './foo.mjs';

export function main() {
  const f = foo();
}
```

여기서 `foo`는 `main`의 자체 코드 의존성입니다.

#### 모킹하는 이유

`main`의 진정한 유닛 테스트를 위해서는 `foo`를 모킹해야 합니다: `main`이 작동하는지 테스트하는 것이 목적이지, `main`과 `foo`가 함께 작동하는지 테스트하는 것이 아니기 때문입니다(그건 다른 테스트입니다).

#### 모킹하지 않는 이유

`foo`가 간단하고, 잘 테스트되었으며, 자주 업데이트되지 않는다면 `foo`를 모킹하는 것은 오히려 골칫거리가 될 수 있습니다.

모킹하지 않는 것이 더 나을 때도 있습니다. 이는 더 진짜 같은 테스트가 되고, `main`의 테스트가 `foo`도 함께 검증하기 때문에 커버리지가 증가합니다. 하지만 이것은 노이즈를 만들 수 있습니다: `foo`가 고장 나면 다른 많은 테스트도 실패하게 되어, 문제를 찾는 것이 번거로워집니다. 반면에, 문제의 원인이 되는 항목에 대한 단 하나의 테스트만 실패한다면, 문제를 찾는 것은 매우 간단합니다. 하지만 100개의 테스트가 동시에 실패하면 진짜 문제를 찾는 것은 건초 더미에서 바늘을 찾는 것과 같습니다.

### 외부 코드

이것은 프로젝트가 제어하지 않는 코드입니다.

```mjs displayName="your-project/main.mjs"
import bar from 'bar';

export function main() {
  const f = bar();
}
```

여기서 `bar`는 npm 패키지와 같은 외부 패키지입니다.

유닛 테스트의 경우, 이를 항상 모킹해야 한다는 것에는 논란이 없습니다. 컴포넌트 및 통합 테스트의 경우, 모킹 여부는 상황에 따라 다릅니다.

#### 모킹하는 이유

프로젝트에서 유지 관리하지 않는 코드가 작동하는지 확인하는 것은 유닛 테스트의 목표가 아닙니다(해당 코드는 자체 테스트를 가져야 합니다).

#### 모킹하지 않는 이유

때때로 모킹은 비현실적일 수 있습니다. 예를 들어, react나 angular와 같은 큰 프레임워크를 모킹하는 것은 거의 하지 않습니다(약이 병보다 더 나쁠 수 있기 때문입니다).

### 외부 시스템

이들은 데이터베이스, 환경(웹 애플리케이션의 Chromium 또는 Firefox, Node 앱의 운영 체제 등), 파일 시스템, 메모리 스토어 등을 말합니다.

이론적으로는 모킹할 필요가 없어야 합니다. 각 케이스에 대해 격리된 복사본을 만드는 것은 매우 비현실적이기 때문에(비용, 추가 실행 시간 등으로 인해), 그다음으로 좋은 옵션은 모킹입니다. 모킹하지 않으면 테스트는 서로 방해를 주게 됩니다:

```mjs displayName="storage.mjs"
import { db } from 'db';

export function read(key, all = false) {
  validate(key, val);

  if (all) return db.getAll(key);

  return db.getOne(key);
}

export function save(key, val) {
  validate(key, val);

  return db.upsert(key, val);
}
```

```mjs displayName="storage.test.mjs"
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { db } from 'db';

import { save } from './storage.mjs';

describe('storage', { concurrency: true }, () => {
  it('should retrieve the requested item', async () => {
    await db.upsert('good', 'item'); // 읽을 수 있도록 항목을 추가
    await db.upsert('erroneous', 'item'); // 실패할 가능성 있는 항목 추가

    const results = await read('a', true);

    assert.equal(results.length, 1); // 읽기가 잘못된 항목을 가져오지 않았는지 확인

    assert.deepEqual(results[0], { key: 'good', val: 'item' });
  });

  it('should save the new item', async () => {
    const id = await save('good', 'item');

    assert.ok(id);

    const items = await db.getAll();

    assert.equal(items.length, 1); // 저장이 중복을 만들지 않았는지 확인

    assert.deepEqual(items[0], { key: 'good', val: 'item' });
  });
});
```

위에서 첫 번째와 두 번째 케이스(`it()` 문)는 서로의 테스트를 방해할 수 있습니다. 두 테스트가 동시에 실행되면서 같은 저장소를 변경하기 때문에(경쟁 상태), `save()`의 삽입이 `read()` 테스트의 항목 찾기(assertion)를 실패하게 만들 수 있고, `read()`도 동일하게 `save()`의 테스트를 방해할 수 있습니다.

## 무엇을 모킹할까

### 모듈 + 유닛

이 방법은 Node.js 테스트 러너의 [`mock`](https://nodejs.org/api/test.html#class-mocktracker)를 활용합니다.

```mjs
import assert from 'node:assert/strict';
import { before, describe, it, mock } from 'node:test';

describe('foo', { concurrency: true }, () => {
  let barMock = mock.fn();
  let foo;

  before(async () => {
    const barNamedExports = await import('./bar.mjs')
      // 원본 기본 내보내기를 제외
      .then(({ default, ...rest }) => rest);

    // 보통은 각 호출 후 restore()나 모든 호출 후 reset()을 수동으로 호출할 필요가 없습니다 (Node.js가 자동으로 처리합니다).
    mock.module('./bar.mjs', {
      defaultExport: barMock,
      // 모킹하지 않을 다른 내보내기 유지.
      namedExports: barNamedExports,
    });

    // 모킹이 설정된 후에만 import가 시작되도록 보장하기 위해, 동적 import여야 합니다.
    ({ foo } = await import('./foo.mjs'));
  });

  it('should do the thing', () => {
    barMock.mockImplementationOnce(function bar_mock() {/* … */});

    assert.equal(foo(), 42);
  });
});
```

### API

잘 알려지지 않은 사실로, `fetch`를 모킹할 내장된 방법이 있습니다. [`undici`](https://github.com/nodejs/undici)는 Node.js의 `fetch` 구현입니다. Node.js에 포함되어 있지만 현재 Node.js 자체에서는 노출되지 않으므로 설치가 필요합니다(ex: `npm install undici`).

```mjs displayName="endpoints.spec.mjs"
import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';
import { MockAgent, setGlobalDispatcher } from 'undici';

import endpoints from './endpoints.mjs';

describe('endpoints', { concurrency: true }, () => {
  let agent;
  beforeEach(() => {
    agent = new MockAgent();
    setGlobalDispatcher(agent);
  });

  it('should retrieve data', async () => {
    const endpoint = 'foo';
    const code = 200;
    const data = {
      key: 'good',
      val: 'item',
    };

    agent
      .get('example.com')
      .intercept({
        path: endpoint,
        method: 'GET',
      })
      .reply(code, data);

    assert.deepEqual(await endpoints.get(endpoint), {
      code,
      data,
    });
  });

  it('should save data', async () => {
    const endpoint = 'foo/1';
    const code = 201;
    const data = {
      key: 'good',
      val: 'item',
    };

    agent
      .get('example.com')
      .intercept({
        path: endpoint,
        method: 'PUT',
      })
      .reply(code, data);

    assert.deepEqual(await endpoints.save(endpoint), {
      code,
      data,
    });
  });
});
```

### 시간

당신도 Doctor Strange처럼 시간을 제어할 수 있습니다. 보통 이 작업은 편의상, 테스트 실행 시간이 지나치게 길어지지 않도록 하기 위해 사용합니다(예: `setTimeout()`이 실행되기를 3분 동안 기다리길 원하시나요?). 또한 시간 여행을 원할 수도 있습니다. 이는 Node.js 테스트 러너의 [`mock.timers`](https://nodejs.org/api/test.html#class-mocktimers)를 활용합니다.

여기서 시간대를 사용하는 것(`Z`가 포함된 타임스탬프)에 유의하십시오. 일관된 시간대를 포함하지 않으면 예상치 못한 결과를 초래할 수 있습니다.

```mjs displayName="master-time.spec.mjs"
import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

import ago from './ago.mjs';

describe('whatever', { concurrency: true }, () => {
  it('should choose "minutes" when that\'s the closet unit', () => {
    mock.timers.enable({ now: new Date('2000-01-01T00:02:02Z') });

    const t = ago('1999-12-01T23:59:59Z');

    assert.equal(t, '2 minutes ago');
  });
});
```

이 방법은 특히 [스냅샷 테스트](https://nodejs.org/api/test.html#snapshot-testing)처럼 저장소에 체크인된 고정된 픽스처와 비교할 때 유용합니다.
