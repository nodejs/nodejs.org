---
title: Node.js에서 파일 디스크립터 사용하기
layout: learn
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, clean99, vaishnav-mk
---

# Node.js에서 파일 디스크립터 사용하기

파일 시스템에서 파일과 상호작용하기 전에 파일 디스크립터를 얻어야 합니다.

파일 디스크립터는 열려 있는 파일에 대한 참조로, `fs` 모듈의 `open()` 메서드를 사용하여 파일을 열면 반환되는 숫자(`fd`)입니다. 이 숫자(`fd`)는 운영 체제에서 열린 파일을 고유하게 식별합니다.

```cjs
const fs = require('node:fs');

fs.open('/Users/joe/test.txt', 'r', (err, fd) => {
  // fd는 우리의 파일 디스크립터입니다.
});
```

```mjs
import fs from 'node:fs';

fs.open('/Users/joe/test.txt', 'r', (err, fd) => {
  // fd는 우리의 파일 디스크립터입니다.
});
```

우리가 `fs.open()` 호출에 두 번째 매개변수로 사용한 `r`에 주목하세요.

이 플래그는 파일을 읽기 전용으로 연다는 의미입니다.

**일반적으로 사용하는 다른 플래그는 다음과 같습니다:**

| 플래그 | 설명                                                                             | 파일이 존재하지 않으면 생성됨 |
| ------ | -------------------------------------------------------------------------------- | ----------------------------- |
| r+     | 이 플래그는 파일을 읽기 및 쓰기로 엽니다                                         | ❌                            |
| w+     | 이 플래그는 파일을 읽기 및 쓰기로 열고, 파일의 시작 부분에 스트림을 위치시킵니다 | ✅                            |
| a      | 이 플래그는 파일을 쓰기 전용으로 열고, 파일의 끝 부분에 스트림을 위치시킵니다    | ✅                            |
| a+     | 이 플래그는 파일을 읽기 및 쓰기로 열고, 파일의 끝 부분에 스트림을 위치시킵니다   | ✅                            |

파일 디스크립터를 콜백 대신 반환하는 `fs.openSync` 메서드를 사용할 수도 있습니다:

```cjs
const fs = require('node:fs');

try {
  const fd = fs.openSync('/Users/joe/test.txt', 'r');
} catch (err) {
  console.error(err);
}
```

```mjs
import fs from 'node:fs';

try {
  const fd = fs.openSync('/Users/joe/test.txt', 'r');
} catch (err) {
  console.error(err);
}
```

파일 디스크립터를 얻으면, `fs.close()`와 같은 파일 시스템과 상호작용하는 작업들을 수행할 수 있습니다.

`fs/promises` 모듈에서 제공하는 프라미스 기반의 `fsPromises.open` 메서드를 사용할 수도 있습니다.

`fs/promises` 모듈은 Node.js v14부터 사용할 수 있습니다. v14 이전, v10 이상에서는 `require('fs').promises`를 사용하고, v8 이상 v10 미만에서는 `util.promisify`를 사용하여 `fs` 메서드를 프라미스 기반 메서드로 변환할 수 있습니다.

```cjs
const fs = require('node:fs/promises');
// 또는 v14 이전에는 const fs = require('fs').promises 사용.
async function example() {
  let filehandle;
  try {
    filehandle = await fs.open('/Users/joe/test.txt', 'r');
    console.log(filehandle.fd);
    console.log(await filehandle.readFile({ encoding: 'utf8' }));
  } finally {
    if (filehandle) await filehandle.close();
  }
}
example();
```

```mjs
import fs from 'node:fs/promises';
// 또는 v14 이전에는 const fs = require('fs').promises 사용.
let filehandle;
try {
  filehandle = await fs.open('/Users/joe/test.txt', 'r');
  console.log(filehandle.fd);
  console.log(await filehandle.readFile({ encoding: 'utf8' }));
} finally {
  if (filehandle) await filehandle.close();
}
```

다음은 `util.promisify`를 사용한 예시입니다:

```cjs
const fs = require('node:fs');
const util = require('node:util');

async function example() {
  const open = util.promisify(fs.open);
  const fd = await open('/Users/joe/test.txt', 'r');
}
example();
```

```mjs
import fs from 'node:fs';
import util from 'node:util';

async function example() {
  const open = util.promisify(fs.open);
  const fd = await open('/Users/joe/test.txt', 'r');
}
example();
```

`fs/promises` 모듈에 대한 자세한 내용은 [fs/promises API](https://nodejs.org/api/fs.html#promise-example)를 확인하세요.
