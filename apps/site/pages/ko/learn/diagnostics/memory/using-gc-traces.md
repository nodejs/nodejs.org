---
title: 가비지 컬렉션 추적하기
layout: learn
---

# 가비지 컬렉션 추적하기

이 가이드에서는 가비지 컬렉션 추적의 기본 사항을 설명합니다.

이 가이드를 마치면 다음을 할 수 있습니다:

- Node.js 애플리케이션에서 추적을 활성화하는 방법
- 추적 해석 방법
- Node.js 애플리케이션에서 잠재적인 메모리 문제를 식별하는 방법

가비지 컬렉션의 작동 방식에는 배울 것이 많지만, 한 가지만 기억해야 한다면 가비지 컬렉션이 실행 중일 때는 코드가 실행되지 않는다는 것입니다.

가비지 컬렉션이 얼마나 자주 실행되며 얼마나 오래 실행되는지, 그리고 그 결과가 무엇인지 알고 싶을 수 있습니다.

## 설정

이 가이드에서는 다음 스크립트를 사용합니다:

```mjs
// script.mjs

import os from 'node:os';

let len = 1_000_000;
const entries = new Set();

function addEntry() {
  const entry = {
    timestamp: Date.now(),
    memory: os.freemem(),
    totalMemory: os.totalmem(),
    uptime: os.uptime(),
  };

  entries.add(entry);
}

function summary() {
  console.log(`Total: ${entries.size} entries`);
}

// execution
(() => {
  while (len > 0) {
    addEntry();
    process.stdout.write(`~~> ${len} entries to record\r`);
    len--;
  }

  summary();
})();
```

> 누수가 명백할 수 있지만, 실제 애플리케이션의 경우 누수의 출처를 찾는 것은 번거로울 수 있습니다.

## 가비지 컬렉션 추적과 함께 실행

`--trace-gc` 플래그를 사용하여 프로세스의 콘솔 출력에서 가비지 컬렉션 추적을 볼 수 있습니다.

```console
$ node --trace-gc script.mjs
```

> 참고: 이 [연습]의 소스 코드를 Node.js 진단 리포지토리에서 찾을 수 있습니다.

다음과 같은 출력이 나옵니다:

```bash
[39067:0x158008000] 2297 ms: Scavenge 117.5 (135.8) -> 102.2 (135.8) MB, 0.8 / 0.0 ms (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000] 2375 ms: Scavenge 120.0 (138.3) -> 104.7 (138.3) MB, 0.9 / 0.0 ms (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000] 2453 ms: Scavenge 122.4 (140.8) -> 107.1 (140.8) MB, 0.7 / 0.0 ms (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000] 2531 ms: Scavenge 124.9 (143.3) -> 109.6 (143.3) MB, 0.7 / 0.0 ms (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000] 2610 ms: Scavenge 127.1 (145.5) -> 111.8 (145.5) MB, 0.7 / 0.0 ms (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000] 2688 ms: Scavenge 129.6 (148.0) -> 114.2 (148.0) MB, 0.8 / 0.0 ms (average mu = 0.994, current mu = 0.994) allocation failure
[39067:0x158008000] 2766 ms: Scavenge 132.0 (150.5) -> 116.7 (150.5) MB, 1.1 / 0.0 ms (average mu = 0.994, current mu = 0.994) allocation failure
Total: 1000000 entries
```

읽기 어렵나요? 이제 몇 가지 개념을 검토하고 `--trace-gc` 플래그의 출력 결과를 설명해 보겠습니다.

### `--trace-gc`로 추적 검사하기

`--trace-gc` (또는 `--trace_gc`, 둘 다 가능) 플래그는 콘솔에 모든 가비지 컬렉션 이벤트를 출력합니다.
각 줄의 구성은 다음과 같습니다:

```bash
[13973:0x110008000] 44 ms: Scavenge 2.4 (3.2) -> 2.0 (4.2) MB, 0.5 / 0.0 ms (average mu = 1.000, current mu = 1.000) allocation failure
```

| 토큰 값                                               | 해석                               |
| ----------------------------------------------------- | ---------------------------------- |
| 13973                                                 | 실행 중인 프로세스의 PID           |
| 0x110008000                                           | 고립된 JS 힙 인스턴스              |
| 44 ms                                                 | 프로세스 시작 후 경과된 시간 (ms)  |
| Scavenge                                              | 가비지 컬렉션의 유형/단계          |
| 2.4                                                   | 가비지 컬렉션 전 힙 사용량 (MB)    |
| (3.2)                                                 | 가비지 컬렉션 전 힙 전체 크기 (MB) |
| 2.0                                                   | 가비지 컬렉션 후 힙 사용량 (MB)    |
| (4.2)                                                 | 가비지 컬렉션 후 힙 전체 크기 (MB) |
| 0.5 / 0.0 ms (average mu = 1.000, current mu = 1.000) | 가비지 컬렉션에 걸린 시간 (ms)     |
| allocation failure                                    | 가비지 컬렉션이 발생한 이유        |

여기서는 두 가지 이벤트에만 집중합니다:

- Scavenge
- Mark-sweep

힙은 여러 *영역*으로 나누어집니다. 이 중에서 "new" 영역과 "old" 영역이 있습니다.

> 👉 실제로는 힙 구조가 조금 더 복잡하지만, 이 기사에서는 간단한 버전으로 설명하겠습니다. 더 자세한 내용을 원한다면 [Peter Marshall의 발표][]를 참조하세요.

### Scavenge

Scavenge는 새로운 공간에서 가비지 컬렉션을 수행하는 알고리즘입니다. 새로운 공간은 객체가 생성되는 곳입니다.
새로운 공간은 작고 빠르게 가비지 컬렉션이 이루어지도록 설계되었습니다.

Scavenge 시나리오를 상상해 봅시다:

- `A`, `B`, `C`, `D`를 할당했습니다.
  ```bash
  | A | B | C | D | <할당되지 않음> |
  ```
- 이제 `E`를 할당하려고 합니다.
- 충분한 공간이 없어서 메모리가 부족합니다.
- 그러면 가비지 컬렉션이 발생합니다.
- 죽은 객체가 수집됩니다.
- 살아있는 객체는 남아있습니다.
- `B`와 `D`가 죽었다고 가정합니다.
  ```bash
  | A | C | <할당되지 않음> |
  ```
- 이제 `E`를 할당할 수 있습니다.
  ```bash
  | A | C | E | <할당되지 않음> |
  ```

v8은 두 번의 Scavenge 작업 후에도 가비지 컬렉션되지 않은 객체를 오래된 공간으로 승격합니다.

> 👉 전체 [Scavenge 시나리오][]를 확인하세요.

### Mark-sweep

Mark-sweep은 오래된 공간에서 객체를 수집하는 데 사용됩니다. 오래된 공간은 새로운 공간에서 살아남은 객체들이 저장되는 곳입니다.

이 알고리즘은 두 단계로 구성됩니다:

- **Mark(표시)**: 여전히 살아 있는 객체들을 검은색으로, 다른 객체들을 흰색으로 표시합니다.
- **Sweep(제거)**: 흰색 객체들을 스캔하고 이를 자유 공간으로 변환합니다.

> 👉 사실, Mark와 Sweep 단계는 조금 더 복잡합니다.
> 더 자세한 내용을 보려면 [이 문서][]를 읽어보세요.

<img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Animation_of_the_Naive_Mark_and_Sweep_Garbage_Collector_Algorithm.gif" alt="mark and sweep algorithm"/>

## `--trace-gc` 실행 예제

### 메모리 누수

이제 이전 터미널 창으로 돌아가면 콘솔에서 많은 `Mark-sweep` 이벤트를 볼 수 있습니다.
또한 이벤트 후 수집된 메모리의 양이 거의 없다는 것을 알 수 있습니다.

이제 가비지 컬렉션의 전문가가 되었습니다! 무엇을 유추할 수 있을까요?

아마도 메모리 누수가 발생한 것 같습니다! 하지만 어떻게 확신할 수 있을까요?
(이 예에서는 꽤 명확하지만, 실제 애플리케이션에서는 어떨까요?)

그런데 어떻게 상황을 파악할 수 있을까요?

### 잘못된 할당의 맥락을 파악하는 방법

1. 오래된 공간이 계속 증가하고 있는 것을 관찰했다고 가정합니다.
2. [`--max-old-space-size`][]를 줄여서 전체 힙을 제한에 더 가깝게 만듭니다.
3. 프로그램을 실행하여 메모리 부족에 도달합니다.
4. 생성된 로그는 실패한 상황을 보여줍니다.
5. OOM(Out of Memory)이 발생하면 힙 크기를 약 10% 증가시키고 몇 번 반복합니다. 동일한 패턴이 나타나면 메모리 누수의 가능성이 있습니다.
6. OOM이 발생하지 않으면 그 값으로 힙 크기를 고정하세요 - 압축된 힙은 메모리 사용량을 줄이고 계산 지연을 줄입니다.

예를 들어, 다음 명령어로 `script.mjs`를 실행해 보세요:

```bash
node --trace-gc --max-old-space-size=50 script.mjs
```

OOM(Out of Memory)이 발생할 것입니다:

```bash
[...]
<--- Last few GCs --->
[40928:0x148008000] 509 ms: Mark-sweep 46.8 (65.8) -> 40.6 (77.3) MB, 6.4 / 0.0 ms (+ 1.4 ms in 11 steps since start of marking, biggest step 0.2 ms, walltime since start of marking 24 ms) (average mu = 0.977, current mu = 0.977) finalize incrementa[40928:0x148008000] 768 ms: Mark-sweep 56.3 (77.3) -> 47.1 (83.0) MB, 35.9 / 0.0 ms (average mu = 0.927, current mu = 0.861) allocation failure scavenge might not succeed
<--- JS stacktrace --->
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory [...]
```

이제 100MB로 설정해 보세요:

```bash
node --trace-gc --max-old-space-size=100 script.mjs
```

비슷한 결과를 얻을 수 있을 것입니다. 유일한 차이점은 마지막 GC 추적에서 더 큰 힙 크기가 나타난다는 것입니다.

```bash
<--- Last few GCs --->
[40977:0x128008000] 2066 ms: Mark-sweep (reduce) 99.6 (102.5) -> 99.6 (102.5) MB, 46.7 / 0.0 ms (+ 0.0 ms in 0 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 47 ms) (average mu = 0.154, current mu = 0.155) allocati[40977:0x128008000] 2123 ms: Mark-sweep (reduce) 99.6 (102.5) -> 99.6 (102.5) MB, 47.7 / 0.0 ms (+ 0.0 ms in 0 steps since start of marking, biggest step 0.0 ms, walltime since start of marking 48 ms) (average mu = 0.165, current mu = 0.175) allocati
```

> 참고: 실제 애플리케이션의 경우, 코드에서 누수된 객체를 찾는 것이 번거로울 수 있습니다. 힙 스냅샷은 이를 찾는 데 도움이 될 수 있습니다. [힙 스냅샷 전용 가이드][]를 참조하세요.

### 느려짐

너무 많은 가비지 컬렉션이 발생하거나 오버헤드를 유발하고 있는지 어떻게 확인할 수 있을까요?

1. 추적 데이터에서 연속적인 컬렉션 사이의 시간을 검토합니다.
2. 추적 데이터에서 GC에 소요된 시간을 검토합니다.
3. 두 GC 사이의 시간이 GC에 소요된 시간보다 짧으면 애플리케이션이 심각하게 중단되고 있는 것입니다.
4. 두 GC 사이의 시간과 GC에 소요된 시간이 매우 높다면, 아마도 애플리케이션은 더 작은 힙을 사용할 수 있습니다.
5. 두 GC 사이의 시간이 GC에 소요된 시간보다 훨씬 길다면, 애플리케이션이 비교적 건강한 상태입니다.

## 누수 수정

이제 누수를 수정해 보겠습니다. 객체를 사용하여 항목을 저장하는 대신 파일을 사용할 수 있습니다.

스크립트를 조금 수정해 봅시다:

```mjs
// script-fix.mjs
import os from 'node:os';
import fs from 'node:fs/promises';

let len = 1_000_000;
const fileName = `entries-${Date.now()}`;

async function addEntry() {
  const entry = {
    timestamp: Date.now(),
    memory: os.freemem(),
    totalMemory: os.totalmem(),
    uptime: os.uptime(),
  };
  await fs.appendFile(fileName, JSON.stringify(entry) + '\n');
}

async function summary() {
  const stats = await fs.lstat(fileName);
  console.log(`파일 크기 ${stats.size} 바이트`);
}

// 실행
(async () => {
  await fs.writeFile(fileName, '----START---\n');
  while (len > 0) {
    await addEntry();
    process.stdout.write(`~~> ${len} entries to record\r`);
    len--;
  }

  await summary();
})();
```

`Set`을 사용해 데이터를 저장하는 것은 나쁜 방법이 아닙니다.
단지 프로그램의 메모리 사용량에 대해 신경 쓰면 됩니다.

> 참고: 이 [연습문제][]의 소스 코드를 Node.js 진단 리포지토리에서 찾을 수 있습니다.

이제 이 스크립트를 실행해봅시다.

```
node --trace-gc script-fix.mjs
```

두 가지를 관찰할 수 있습니다:

- 마크-스윕(mark-sweep) 이벤트가 덜 빈번하게 나타납니다.
- 메모리 사용량이 처음 스크립트보다 130MB 이상이었던 것에 비해 25MB를 넘지 않습니다.

이 새로운 버전이 처음보다 메모리에 적은 압력을 가하기 때문에 매우 타당합니다.

**핵심**: 이 스크립트를 개선하는 것에 대해 어떻게 생각하시나요?
아마 새로운 버전이 느리다는 것을 느꼈을 겁니다.
메모리가 특정 크기에 도달했을 때만 `Set`의 내용을 파일에 쓰는 방법은 어떨까요?

> [`getheapstatistics`][] API가 도움이 될 수 있습니다.

## 보너스: 가비지 컬렉션을 프로그래밍 방식으로 추적하기

### `v8` 모듈 사용

프로세스 전체 수명 동안의 추적을 피하고 싶을 수 있습니다.
이 경우, 프로세스 내에서 플래그를 설정하세요.
`v8` 모듈은 플래그를 동적으로 설정할 수 있는 API를 제공합니다.

```js
import v8 from 'v8';

// trace-gc 활성화
v8.setFlagsFromString('--trace-gc');

// trace-gc 비활성화
v8.setFlagsFromString('--notrace-gc');
```

### 퍼포먼스 훅 사용

Node.js에서 [퍼포먼스 훅][]을 사용해 가비지 컬렉션을 추적할 수 있습니다.

```cjs
const { PerformanceObserver } = require('node:perf_hooks');

// 퍼포먼스 옵저버 생성
const obs = new PerformanceObserver(list => {
  const entry = list.getEntries()[0];
  /*
  entry는 단일 가비지 컬렉션 이벤트의 메트릭을 포함하는 PerformanceEntry의 인스턴스입니다.
  예:
  PerformanceEntry {
    name: 'gc',
    entryType: 'gc',
    startTime: 2820.567669,
    duration: 1.315709,
    kind: 1
  }
  */
});

// GC 알림 구독
obs.observe({ entryTypes: ['gc'] });

// 구독 중지
obs.disconnect();
```

### 퍼포먼스 훅을 사용한 추적 검사

퍼포먼스 옵저버의 콜백에서 [PerformanceEntry][]로서 GC 통계를 얻을 수 있습니다.

예를 들어:

```ts
PerformanceEntry {
  name: 'gc',
  entryType: 'gc',
  startTime: 2820.567669,
  duration: 1.315709,
  kind: 1
}
```

| 속성      | 해석                                                                   |
| --------- | ---------------------------------------------------------------------- |
| name      | 퍼포먼스 엔트리의 이름입니다.                                          |
| entryType | 퍼포먼스 엔트리의 유형입니다.                                          |
| startTime | 퍼포먼스 엔트리 시작 시간을 나타내는 고해상도 밀리초 타임스탬프입니다. |
| duration  | 이 엔트리에 대한 총 경과 밀리초 수입니다.                              |
| kind      | 발생한 가비지 컬렉션 작업의 종류입니다.                                |
| flags     | GC에 대한 추가 정보를 나타냅니다.                                      |

더 많은 정보는 [퍼포먼스 훅에 대한 문서][퍼포먼스 훅]을 참조하세요.

[PerformanceEntry]: https://nodejs.org/api/perf_hooks.html#perf_hooks_class_performanceentry
[PerformanceObserver]: https://nodejs.org/api/perf_hooks.html#perf_hooks_class_performanceobserver
[`--max-old-space-size`]: https://nodejs.org/api/cli.html#--max-old-space-sizesize-in-megabytes
[퍼포먼스 훅]: https://nodejs.org/api/perf_hooks.html
[연습문제]: https://github.com/nodejs/diagnostics/tree/main/documentation/memory/step3/exercise
[힙 스냅샷 전용 가이드]: /learn/diagnostics/memory/using-heap-snapshot#how-to-find-a-memory-leak-with-heap-snapshots
[이 문서]: https://github.com/thlorenz/v8-perf/blob/master/gc.md#marking-state
[Scavenge 시나리오]: https://github.com/thlorenz/v8-perf/blob/master/gc.md#sample-scavenge-scenario
[Peter Marshall의 발표]: https://v8.dev/blog/trash-talk
[`getheapstatistics`]: https://nodejs.org/dist/latest-v16.x/docs/api/v8.html#v8getheapstatistics
