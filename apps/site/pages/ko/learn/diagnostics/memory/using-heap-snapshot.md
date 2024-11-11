---
title: 힙 스냅샷 사용하기
layout: learn
---

# 힙 스냅샷 사용하기

실행 중인 애플리케이션에서 힙 스냅샷을 가져와 [Chrome 개발자 도구][]에 로드하여 특정 변수를 검사하거나 리테이너 크기를 확인할 수 있습니다. 또한 여러 스냅샷을 비교하여 시간 경과에 따른 차이를 확인할 수 있습니다.

## 경고

스냅샷을 생성할 때 메인 스레드에서 다른 작업은 모두 중단됩니다. 힙 내용에 따라 스냅샷 생성에 1분 이상 걸릴 수도 있습니다. 스냅샷은 메모리에서 생성되므로 힙 크기가 두 배로 늘어나 메모리가 가득 차서 애플리케이션이 충돌할 수 있습니다.

프로덕션 환경에서 힙 스냅샷을 찍으려면, 스냅샷을 찍는 프로세스가 충돌해도 애플리케이션의 가용성에 영향을 미치지 않도록 해야 합니다.

## 방법

### 힙 스냅샷 얻기

힙 스냅샷을 얻는 방법은 여러 가지가 있습니다:

1. 인스펙터를 통해,
2. 외부 신호 및 명령줄 플래그를 통해,
3. 프로세스 내에서 `writeHeapSnapshot` 호출을 통해,
4. 인스펙터 프로토콜을 통해.

#### 1. 인스펙터에서 메모리 프로파일링 사용

> Node.js의 모든 유지보수 버전에서 작동

`--inspect` 플래그로 노드를 실행하고 인스펙터를 엽니다.
![인스펙터 열기][open inspector image]

가장 간단한 방법은 로컬에서 실행 중인 프로세스에 인스펙터를 연결하는 것입니다. 그런 다음 메모리 탭으로 이동하여 힙 스냅샷을 찍습니다.

![힙 스냅샷 찍기][take a heap snapshot image]

#### 2. `--heapsnapshot-signal` 플래그 사용

> v12.0.0 이상에서 작동

신호에 반응하여 힙 스냅샷을 생성하도록 하는 명령줄 플래그를 사용하여 노드를 시작할 수 있습니다.

```
$ node --heapsnapshot-signal=SIGUSR2 index.js
```

```
$ ps aux
USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND
node 1 5.5 6.1 787252 247004 ? Ssl 16:43 0:02 node --heapsnapshot-signal=SIGUSR2 index.js
$ kill -USR2 1
$ ls
Heap.20190718.133405.15554.0.001.heapsnapshot
```

자세한 내용은 [heapsnapshot-signal 플래그][]의 최신 문서를 참조하세요.

#### 3. `writeHeapSnapshot` 함수 사용

> v11.13.0 이상에서 작동
> [heapdump 패키지][]를 사용하여 이전 버전에서 작동 가능

서버에서 실행 중인 애플리케이션과 같은 프로세스에서 스냅샷을 얻어야 하는 경우 다음을 사용하여 구현할 수 있습니다:

```js
require('v8').writeHeapSnapshot();
```

파일 이름 옵션은 [`writeHeapSnapshot` 문서][]를 확인하세요.

프로세스를 중단하지 않고 호출할 수 있는 방법이 필요하므로 HTTP 핸들러에서 호출하거나 운영 체제의 신호에 반응하여 호출하는 것이 좋습니다. 스냅샷을 트리거하는 HTTP 엔드포인트가 외부에 노출되지 않도록 주의하세요. 다른 사람이 접근할 수 없어야 합니다.

Node.js v11.13.0 이전 버전에서는 [heapdump 패키지][]를 사용할 수 있습니다.

#### 4. 인스펙터 프로토콜을 사용하여 힙 스냅샷 트리거

인스펙터 프로토콜을 사용하여 프로세스 외부에서 힙 스냅샷을 트리거할 수 있습니다.

API를 사용하기 위해 Chromium에서 실제 인스펙터를 실행할 필요는 없습니다.

다음은 `websocat`과 `jq`를 사용하여 bash에서 스냅샷을 트리거하는 예시입니다:

```bash
#!/bin/bash
set -e

kill -USR1 "$1"
rm -f fifo out
mkfifo ./fifo
websocat -B 10000000000 "$(curl -s http://localhost:9229/json | jq -r '.[0].webSocketDebuggerUrl')" < ./fifo > ./out &
exec 3>./fifo
echo '{"method": "HeapProfiler.enable", "id": 1}' > ./fifo
echo '{"method": "HeapProfiler.takeHeapSnapshot", "id": 2}' > ./fifo
while jq -e "[.id != 2, .result != {}] | all" < <(tail -n 1 ./out); do
sleep 1s
echo "힙 스냅샷을 캡처하는 중..."
done

echo -n "" > ./out.heapsnapshot
while read -r line; do
f="$(echo "$line" | jq -r '.params.chunk')"
echo -n "$f" >> out.heapsnapshot
  i=$((i+1))
done < <(cat out | tail -n +2 | head -n -1)

exec 3>&-
```

다음은 인스펙터 프로토콜과 함께 사용할 수 있는 메모리 프로파일링 도구의 비포괄적 목록입니다:

- [OpenProfiling for Node.js][openprofiling]

## 힙 스냅샷으로 메모리 누수 찾기

두 개의 스냅샷을 비교하여 메모리 누수를 찾을 수 있습니다. 스냅샷 차이가 불필요한 정보를 포함하지 않도록 하는 것이 중요합니다. 다음 단계는 스냅샷 간의 깨끗한 차이를 생성하는 데 도움이 됩니다.

1. 프로세스가 모든 소스를 로드하고 부트스트래핑을 완료하게 합니다. 몇 초가 걸릴 수 있습니다.
2. 메모리가 누수되는 것으로 의심되는 기능을 사용하기 시작합니다. 초기 할당은 누수와 관련이 없을 수 있습니다.
3. 하나의 힙 스냅샷을 찍습니다.
4. 가급적이면 그 사이에 다른 작업을 하지 않고 기능을 계속 사용합니다.
5. 또 다른 힙 스냅샷을 찍습니다. 두 스냅샷 간의 차이는 대부분 누수된 내용을 포함할 것입니다.
6. Chromium/Chrome 개발자 도구를 열고 _Memory_ 탭으로 이동합니다.
7. 먼저 오래된 스냅샷 파일을 로드하고, 그 다음에 새로운 스냅샷 파일을 로드합니다.
   ![도구의 로드 버튼][load button image]
8. 최신 스냅샷을 선택하고 상단 드롭다운에서 *Summary*를 *Comparison*으로 변경합니다. ![비교 드롭다운][comparison image]
9. 하단 패널에서 큰 양의 양수 변화를 찾아 그 원인을 탐색합니다.

이 [힙 스냅샷 연습][heapsnapshot exercise]을 통해 힙 스냅샷을 캡처하고 메모리 누수를 찾는 연습을 할 수 있습니다.

[open inspector image]: /static/images/docs/guides/diagnostics/tools.png
[take a heap snapshot image]: /static/images/docs/guides/diagnostics/snapshot.png
[heapsnapshot-signal flag]: https://nodejs.org/api/cli.html#--heapsnapshot-signalsignal
[heapdump 패키지]: https://www.npmjs.com/package/heapdump
[`writeHeapSnapshot` 문서]: https://nodejs.org/api/v8.html#v8_v8_writeheapsnapshot_filename
[openprofiling]: https://github.com/vmarchaud/openprofiling-node
[load button image]: /static/images/docs/guides/diagnostics/load-snapshot.png
[comparison image]: /static/images/docs/guides/diagnostics/compare.png
[heapsnapshot exercise]: https://github.com/naugtur/node-example-heapdump
[Chrome 개발자 도구]: https://developer.chrome.com/docs/devtools/
