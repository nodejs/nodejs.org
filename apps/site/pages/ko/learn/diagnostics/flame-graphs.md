---
title: 플레임 그래프
layout: learn
---

# 플레임 그래프

## 플레임 그래프는 무엇에 유용한가요?

플레임 그래프는 함수에서 사용된 CPU 시간을 시각화하는 방법입니다. 이 그래프는 동기 작업에 너무 많은 시간을 소비하는 부분을 찾아내는 데 도움이 될 수 있습니다.

## 플레임 그래프를 만드는 방법

플레임 그래프를 만드는 것이 어렵다고 들으셨을 수도 있지만, 더 이상 그렇지 않습니다.
Solaris 가상 머신이 이제는 플레임 그래프 생성에 필요하지 않습니다!

플레임 그래프는 `perf` 출력으로 생성되며, 이는 Node.js 전용 도구가 아닙니다. CPU 시간 사용을 시각화하는 가장 강력한 방법이지만, Node.js 8 이상에서 JavaScript 코드가 최적화되는 방식과 관련하여 문제가 있을 수 있습니다. 자세한 내용은 아래의 [perf 출력 문제](#perf-output-issues) 섹션을 참조하십시오.

### 미리 패키지된 도구 사용

로컬에서 플레임 그래프를 한 번에 생성하려면 [0x](https://www.npmjs.com/package/0x)를 사용해보세요.

프로덕션 배포 환경에서 진단할 경우, [0x 프로덕션 서버](https://github.com/davidmarkclements/0x/blob/master/docs/production-servers.md)를 참고하세요.

### 시스템 perf 도구를 사용하여 플레임 그래프 만들기

이 가이드의 목적은 플레임 그래프를 만드는 데 필요한 단계를 보여주고 각 단계를 제어할 수 있게 하는 것입니다.

각 단계를 더 잘 이해하고 싶다면, 아래의 더 자세한 설명을 확인해 보세요.

이제 시작해 보겠습니다.

1. `perf` 설치 (이미 설치되어 있지 않다면, 일반적으로 linux-tools-common 패키지를 통해 제공됩니다)
2. `perf`를 실행해 보고 누락된 커널 모듈에 대한 오류가 발생하면 해당 모듈도 설치하십시오.
3. `perf`가 활성화된 상태로 Node.js 실행 (Node.js 버전에 따른 [perf 출력 문제](#perf-output-issues)를 참조하세요)

```
perf record -e cycles:u -g -- node --perf-basic-prof app.js
```

4. 경고를 무시하세요. 누락된 패키지로 인해 perf를 실행할 수 없다는 메시지가 아니라면 괜찮습니다. 커널 모듈 샘플에 접근할 수 없다는 경고는 무시해도 됩니다.
5. `perf script > perfs.out`을 실행하여 시각화할 데이터 파일을 생성하세요. 더 읽기 쉬운 그래프를 위해 [Node.js 내부 함수 필터링](#filtering-out-nodejs-internal-functions)을 적용해 보세요.
6. `stackvis`를 설치합니다. 아직 설치하지 않았다면 `npm i -g stackvis`
7. `stackvis perf < perfs.out > flamegraph.htm`을 실행하세요.

이제 플레임 그래프 파일을 브라우저에서 열고 분석할 수 있습니다. 그래프는 색상별로 구분되어 있으므로 가장 진한 주황색 막대에 먼저 집중하세요. 이들은 아마도 CPU를 많이 사용하는 함수일 것입니다.

참고할 점은 플레임 그래프의 요소를 클릭하면 해당 주변의 줌인된 부분이 그래프 위에 표시됩니다.

### 실행 중인 프로세스 샘플링에 `perf` 사용

이 방법은 중단하기 어려운 이미 실행 중인 프로세스에서 플레임 그래프 데이터를 기록하는 데 유용합니다. 예를 들어, 재현하기 어려운 문제가 발생한 프로덕션 프로세스에서 사용할 수 있습니다.

```bash
perf record -F99 -p `pgrep -n node` -g -- sleep 3
```

잠깐, `sleep 3`은 무엇을 위한 걸까요? perf를 계속 실행하도록 하기 위함입니다. `-p` 옵션이 다른 PID를 가리키고 있어도 명령은 프로세스에서 실행되어야 하며 해당 프로세스가 종료되면 종료됩니다.
perf는 당신이 전달한 명령이 실행되는 동안 실행됩니다. `sleep 3`은 perf가 3초 동안 실행되도록 보장합니다.

왜 프로파일링 주기인 `-F`가 99로 설정되어 있나요? 이는 합리적인 기본값입니다. 원하는 경우 조정할 수 있습니다.
`-F99`는 초당 99번의 샘플을 수집하도록 perf에 지시합니다. 더 높은 값을 사용하면 더 많은 정밀도를 얻을 수 있지만, 출력도 늘어납니다. 낮은 값은 적은 출력과 덜 정밀한 결과를 제공할 것입니다. 필요한 정밀도는 CPU 집중 작업의 실제 실행 시간에 따라 달라집니다. 눈에 띄는 속도 저하의 원인을 찾고 있다면 초당 99프레임이면 충분할 것입니다.

3초 동안 perf 기록을 얻은 후, 위의 마지막 두 단계를 따라 플레임 그래프를 생성하세요.

### Node.js 내부 함수 필터링

일반적으로는 자신이 호출한 함수의 성능만 보고 싶기 때문에 Node.js 및 V8 내부 함수를 필터링하면 그래프를 읽기 쉽게 만들 수 있습니다. 아래 명령으로 perf 파일을 정리할 수 있습니다.

```bash
sed -i -r \
  -e "/( __libc_start| LazyCompile | v8::internal::| Builtin:| Stub:| LoadIC:|\[unknown\]| LoadPolymorphicIC:)/d" \
  -e 's/ LazyCompile:[*~]?/ /' \
  perfs.out
```

플레임 그래프를 읽을 때 주요 함수가 시간을 많이 소비하고 있는데도 이상해 보인다면 필터 없이 그래프를 다시 생성해 보세요. Node.js 자체의 문제일 가능성이 있습니다.

### Node.js의 프로파일링 옵션

`--perf-basic-prof-only-functions`와 `--perf-basic-prof`는 JavaScript 코드를 디버깅하는 데 유용한 두 가지 옵션입니다. 다른 옵션은 Node.js 자체를 프로파일링하는 데 사용되며, 이 가이드의 범위를 벗어납니다.

`--perf-basic-prof-only-functions`는 출력이 적고 오버헤드가 가장 적은 옵션입니다.

### 왜 이러한 옵션이 필요한가요?

이 옵션을 사용하지 않으면 여전히 플레임 그래프를 얻을 수 있지만 대부분의 막대가 `v8::Function::Call`로 표시될 것입니다.

## `perf` 출력 문제

### Node.js 8.x V8 파이프라인 변경 사항

Node.js 8.x 이상은 V8 엔진의 JavaScript 컴파일 파이프라인에 새로운 최적화를 도입했으며, 이로 인해 때때로 perf에서 함수 이름/참조를 찾을 수 없을 수 있습니다. (이것을 터보팬이라고 부릅니다)

결과적으로 플레임 그래프에서 함수 이름이 올바르게 표시되지 않을 수 있습니다.

기대하던 함수 이름 대신 `ByteCodeHandler:`가 표시될 것입니다.

[0x](https://www.npmjs.com/package/0x)에는 이를 완화하는 일부 기능이 내장되어 있습니다.

자세한 내용은 다음을 참조하세요:

- https://github.com/nodejs/benchmarking/issues/168
- https://github.com/nodejs/diagnostics/issues/148#issuecomment-369348961

### Node.js 10+

Node.js 10.x에서는 `--interpreted-frames-native-stack` 플래그를 사용하여 터보팬 문제를 해결합니다.

`node --interpreted-frames-native-stack --perf-basic-prof-only-functions` 명령을 사용하여 JavaScript가 어떤 파이프라인에서 컴파일되었는지 상관없이 플레임 그래프에서 함수 이름을 얻을 수 있습니다.

### 플레임 그래프에서 깨진 레이블

레이블이 다음과 같이 표시된다면:

```
node`_ZN2v88internal11interpreter17BytecodeGenerator15VisitStatementsEPNS0_8ZoneListIPNS0_9StatementEEE
```

이는 사용 중인 Linux perf가 디망글링(demangle) 지원으로 컴파일되지 않았다는 의미입니다. 예를 들어, https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1396654를 참조하세요.

## 예제

플레임 그래프를 직접 캡처하는 연습을 해보세요: [플레임 그래프 연습](https://github.com/naugtur/node-example-flamegraph)
