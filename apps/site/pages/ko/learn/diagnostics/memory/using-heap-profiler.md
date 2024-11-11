---
title: 힙 프로파일러 사용하기
layout: learn
---

# 힙 프로파일러 사용하기

힙 프로파일러는 V8을 기반으로 시간 경과에 따른 할당을 캡처합니다. 이 문서에서는 다음을 사용한 메모리 프로파일링을 다룹니다:

1. 할당 타임라인
2. 샘플링 힙 프로파일러

[힙 스냅샷 사용하기][] 가이드에서 다룬 힙 덤프와 달리, 실시간 프로파일링을 사용하는 목적은 일정 기간 동안의 할당을 이해하는 것입니다.

## 힙 프로파일러 - 할당 타임라인

힙 프로파일러는 샘플링 힙 프로파일러와 비슷하지만, 모든 할당을 추적합니다. 샘플링 힙 프로파일러보다 오버헤드가 더 크므로 프로덕션 환경에서는 사용을 권장하지 않습니다.

> 프로그램적으로 프로파일러를 시작하고 중지하려면 [@mmarchini/observe][]를 사용할 수 있습니다.

### 방법

애플리케이션을 시작하세요:

```console
node --inspect index.js
```

> 스크립트의 경우 `--inspect-brk`가 더 나은 선택입니다.

Chrome에서 dev-tools 인스턴스에 연결한 다음:

- `Memory` 탭을 선택하세요.
- `Allocation instrumentation timeline`을 선택하세요.
- 프로파일링을 시작하세요.

![힙 프로파일러 튜토리얼 1단계][heap profiler tutorial 1]

힙 프로파일링이 실행 중인 동안 샘플을 실행하여 메모리 문제를 식별하는 것이 좋습니다. 예를 들어, 웹 애플리케이션을 힙 프로파일링하는 경우 `Apache Benchmark`를 사용하여 부하를 생성할 수 있습니다:

```console
$ ab -n 1000 -c 5 http://localhost:3000
```

부하가 완료되면 중지 버튼을 누릅니다:

![힙 프로파일러 튜토리얼 2단계][heap profiler tutorial 2]

마지막으로 스냅샷 데이터를 확인하세요:

![힙 프로파일러 튜토리얼 3단계][heap profiler tutorial 3]

메모리 용어에 대한 추가 정보는 [유용한 링크](#useful-links) 섹션을 확인하세요.

## 샘플링 힙 프로파일러

샘플링 힙 프로파일러는 시간 경과에 따른 메모리 할당 패턴과 예약된 공간을 추적합니다. 샘플링 기반이므로 오버헤드가 낮아 프로덕션 시스템에서 사용할 수 있습니다.

> 힙 프로파일러를 프로그램적으로 시작하고 중지하려면 [`heap-profiler`][] 모듈을 사용할 수 있습니다.

### 방법

애플리케이션을 시작하세요:

```console
$ node --inspect index.js
```

> 스크립트의 경우 `--inspect-brk`가 더 나은 선택입니다.

dev-tools 인스턴스에 연결한 후:

1. `Memory` 탭을 선택하세요.
2. `Allocation sampling`을 선택하세요.
3. 프로파일링을 시작하세요.

![힙 프로파일러 튜토리얼 4단계][heap profiler tutorial 4]

부하를 생성한 후 프로파일러를 중지하세요. 이 작업은 스택트레이스를 기반으로 할당된 힙을 요약한 데이터를 생성합니다. 힙 할당이 많은 함수에 집중할 수 있으며, 아래 예제를 참조하세요:

![힙 프로파일러 튜토리얼 5단계][heap profiler tutorial 5]

## 유용한 링크

- https://developer.chrome.com/docs/devtools/memory-problems/memory-101/
- https://developer.chrome.com/docs/devtools/memory-problems/allocation-profiler/

[힙 스냅샷 사용하기]: /learn/diagnostics/memory/using-heap-snapshot/
[@mmarchini/observe]: https://www.npmjs.com/package/@mmarchini/observe
[`heap-profiler`]: https://www.npmjs.com/package/heap-profile
[heap profiler tutorial 1]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-1.png
[heap profiler tutorial 2]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-2.png
[heap profiler tutorial 3]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-3.png
[heap profiler tutorial 4]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-4.png
[heap profiler tutorial 5]: /static/images/docs/guides/diagnostics/heap-profiler-tutorial-5.png
