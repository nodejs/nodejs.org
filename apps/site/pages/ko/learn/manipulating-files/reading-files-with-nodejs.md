---
title: Node.js로 파일 읽기
layout: learn
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, clean99
---

# Node.js로 파일 읽기

Node.js에서 파일을 읽는 가장 간단한 방법은 `fs.readFile()` 메서드를 사용하는 것입니다. 파일 경로, 인코딩, 그리고 파일 데이터를 처리할 콜백 함수를 전달하면 됩니다 (오류도 함께 처리):

```cjs
const fs = require('node:fs');

fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

```mjs
import fs from 'node:fs';

fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

또는, 동기 버전인 `fs.readFileSync()`를 사용할 수도 있습니다:

```cjs
const fs = require('node:fs');

try {
  const data = fs.readFileSync('/Users/joe/test.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}
```

```mjs
import fs from 'node:fs';

try {
  const data = fs.readFileSync('/Users/joe/test.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}
```

`fs/promises` 모듈이 제공하는 Promise 기반의 `fsPromises.readFile()` 메서드도 사용할 수 있습니다:

```cjs
const fs = require('node:fs/promises');

async function example() {
  try {
    const data = await fs.readFile('/Users/joe/test.txt', { encoding: 'utf8' });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
example();
```

```mjs
import fs from 'node:fs/promises';

try {
  const data = await fs.readFile('/Users/joe/test.txt', { encoding: 'utf8' });
  console.log(data);
} catch (err) {
  console.log(err);
}
```

`fs.readFile()`, `fs.readFileSync()`, 그리고 `fsPromises.readFile()`는 모두 파일의 전체 내용을 메모리에 읽어 들인 후 데이터를 반환합니다.

따라서 큰 파일을 읽을 때는 메모리 소비와 실행 속도에 큰 영향을 줄 수 있습니다.

이 경우, 스트림을 사용하여 파일 내용을 읽는 것이 더 나은 선택입니다.
