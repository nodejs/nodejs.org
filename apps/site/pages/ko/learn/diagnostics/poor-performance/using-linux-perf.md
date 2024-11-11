---
title: Linux Perf 사용하기
layout: learn
---

# Linux Perf 사용하기

[Linux Perf](https://perf.wiki.kernel.org/index.php/Main_Page)는 자바스크립트, 네이티브 및 운영 체제 수준의 프레임을 통해 저수준 CPU 프로파일링을 제공합니다.

**중요**: 이 튜토리얼은 Linux에서만 사용할 수 있습니다.

## 방법

Linux Perf는 보통 `linux-tools-common` 패키지를 통해 제공됩니다. `--perf-basic-prof` 또는 `--perf-basic-prof-only-functions` 옵션을 사용하여 *perf_events*를 지원하는 Node.js 애플리케이션을 시작할 수 있습니다.

`--perf-basic-prof`는 항상 파일(/tmp/perf-PID.map)에 기록하는데, 이는 디스크가 무한히 증가할 수 있습니다. 이 문제가 걱정된다면 [linux-perf](https://www.npmjs.com/package/linux-perf) 모듈을 사용하거나 `--perf-basic-prof-only-functions`를 사용하세요.

두 옵션의 주요 차이점은 `--perf-basic-prof-only-functions`가 더 적은 출력을 생성하며, 이는 운영 환경 프로파일링에 적합한 선택입니다.

```console
# 애플리케이션을 시작하고 PID를 가져옵니다.
$ node --perf-basic-prof-only-functions index.js &
[1] 3870
```

그런 다음 원하는 빈도로 이벤트를 기록합니다:

```console
$ sudo perf record -F 99 -p 3870 -g
```

이 단계에서 애플리케이션에 부하 테스트를 적용하여 신뢰할 수 있는 분석을 위해 더 많은 기록을 생성할 수 있습니다. 작업이 완료되면 SIGINT(Ctrl-C)를 사용하여 `perf` 프로세스를 종료합니다.

`perf`는 `/tmp` 폴더에 파일을 생성하며, 일반적으로 `/tmp/perf-PID.map`라는 이름을 갖습니다 (위 예에서는 `/tmp/perf-3870.map`). 이 파일에는 호출된 각 함수에 대한 추적 정보가 포함되어 있습니다.

이 결과를 특정 파일에 집계하려면 다음 명령을 실행합니다:

```console
$ sudo perf script > perfs.out
```

```console
$ cat ./perfs.out
node 3870 25147.878454:          1 cycles:
        ffffffffb5878b06 native_write_msr+0x6 ([kernel.kallsyms])
        ffffffffb580d9d5 intel_tfa_pmu_enable_all+0x35 ([kernel.kallsyms])
        ffffffffb5807ac8 x86_pmu_enable+0x118 ([kernel.kallsyms])
        ffffffffb5a0a93d perf_pmu_enable.part.0+0xd ([kernel.kallsyms])
        ffffffffb5a10c06 __perf_event_task_sched_in+0x186 ([kernel.kallsyms])
        ffffffffb58d3e1d finish_task_switch+0xfd ([kernel.kallsyms])
        ffffffffb62d46fb __sched_text_start+0x2eb ([kernel.kallsyms])
        ffffffffb62d4b92 schedule+0x42 ([kernel.kallsyms])
        ffffffffb62d87a9 schedule_hrtimeout_range_clock+0xf9 ([kernel.kallsyms])
        ffffffffb62d87d3 schedule_hrtimeout_range+0x13 ([kernel.kallsyms])
        ffffffffb5b35980 ep_poll+0x400 ([kernel.kallsyms])
        ffffffffb5b35a88 do_epoll_wait+0xb8 ([kernel.kallsyms])
        ffffffffb5b35abe __x64_sys_epoll_wait+0x1e ([kernel.kallsyms])
        ffffffffb58044c7 do_syscall_64+0x57 ([kernel.kallsyms])
        ffffffffb640008c entry_SYSCALL_64_after_hwframe+0x44 ([kernel.kallsyms])
....
```

이 출력은 이해하기 어려울 수 있으므로, 일반적으로 이 파일을 사용해 플레임그래프(flamegraph)를 생성하여 더 나은 시각화를 제공합니다.

![Example nodejs flamegraph](https://user-images.githubusercontent.com/26234614/129488674-8fc80fd5-549e-4a80-8ce2-2ba6be20f8e8.png)

이 결과에서 플레임그래프를 생성하려면 [이 튜토리얼](/learn/diagnostics/flame-graphs#create-a-flame-graph-with-system-perf-tools)의 6단계부터 따르세요.

`perf` 출력은 Node.js에 특정한 도구가 아니기 때문에, 자바스크립트 코드가 Node.js에서 최적화되는 방식과 관련된 문제가 있을 수 있습니다. 자세한 내용은 [perf 출력 문제](/learn/diagnostics/flame-graphs#perf-output-issues)를 참조하세요.

## 유용한 링크

- /learn/diagnostics/flame-graphs
- https://www.brendangregg.com/blog/2014-09-17/node-flame-graphs-on-linux.html
- https://perf.wiki.kernel.org/index.php/Main_Page
- https://blog.rafaelgss.com.br/node-cpu-profiler
