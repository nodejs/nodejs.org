---
title: Node.js 이벤트 발신기
layout: learn
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, ovflowd
---

# Node.js 이벤트 발신기

브라우저에서 JavaScript로 작업한 경험이 있다면, 사용자 상호작용이 이벤트를 통해 얼마나 많이 처리되는지 알 것입니다: 마우스 클릭, 키보드 버튼 누르기, 마우스 이동 반응 등.

백엔드 측면에서 Node.js는 [`events` 모듈](https://nodejs.org/api/events.html)을 사용하여 유사한 시스템을 구축할 수 있는 옵션을 제공합니다.

이 모듈은 특히 이벤트를 처리하는 데 사용할 `EventEmitter` 클래스를 제공합니다.

다음과 같이 초기화할 수 있습니다:

```cjs
const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();
```

```mjs
import EventEmitter from 'node:events';

const eventEmitter = new EventEmitter();
```

이 객체는 많은 다른 메서드 중에서 `on` 및 `emit` 메서드를 노출합니다.

- `emit`은 이벤트를 트리거하는 데 사용됩니다.
- `on`은 이벤트가 트리거될 때 실행될 콜백 함수를 추가하는 데 사용됩니다.

예를 들어, `start` 이벤트를 생성하고, 샘플로 콘솔에 로그를 출력하여 반응해 보겠습니다:

```js
eventEmitter.on('start', () => {
  console.log('started');
});
```

다음과 같이 실행하면:

```js
eventEmitter.emit('start');
```

이벤트 핸들러 함수가 트리거되고 콘솔 로그가 출력됩니다.

이벤트 핸들러에 인수를 전달할 수 있으며, 추가 인수로 `emit()`에 전달하면 됩니다:

```js
eventEmitter.on('start', number => {
  console.log(`started ${number}`);
});

eventEmitter.emit('start', 23);
```

여러 인수:

```js
eventEmitter.on('start', (start, end) => {
  console.log(`started from ${start} to ${end}`);
});

eventEmitter.emit('start', 1, 100);
```

EventEmitter 객체는 또한 이벤트와 상호작용하는 데 사용할 수 있는 여러 다른 메서드를 노출합니다, 예를 들어

- `once()`: 한 번만 수신기를 추가합니다.
- `removeListener()` / `off()`: 이벤트에서 이벤트 리스너를 제거합니다.
- `removeAllListeners()`: 이벤트에 대한 모든 리스너를 제거합니다.

이 메서드들에 대한 자세한 내용은 [공식 문서](https://nodejs.org/api/events.html)에서 확인할 수 있습니다.
