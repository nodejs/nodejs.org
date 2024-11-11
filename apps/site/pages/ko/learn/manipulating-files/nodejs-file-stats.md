---
title: Node.js 파일 상태
layout: learn
authors: flaviocopes, ZYSzys, MylesBorins, fhemberger, LaRuaNa, ahmadawais, clean99, ovflowd, vaishnav-mk
---

# Node.js 파일 상태

모든 파일에는 세부 정보가 포함되어 있으며, Node.js를 사용하여 이를 확인할 수 있습니다. 특히, [`fs` 모듈](https://nodejs.org/api/fs.html)에서 제공하는 `stat()` 메서드를 사용하여 파일의 상태 정보를 확인할 수 있습니다.

파일 경로를 전달하여 호출하면 Node.js는 파일의 세부 정보를 가져온 후 두 가지 매개변수(오류 메시지와 파일 상태)를 사용하는 콜백 함수를 호출합니다:

```cjs
const fs = require('node:fs');

fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err);
  }
  // `stats`에서 파일 상태 정보를 확인할 수 있습니다.
});
```

```mjs
import fs from 'node:fs';

fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err);
  }
  // `stats`에서 파일 상태 정보를 확인할 수 있습니다.
});
```

Node.js는 파일 상태 정보가 준비될 때까지 스레드를 차단하는 동기식 메서드도 제공합니다:

```cjs
const fs = require('node:fs');

try {
  const stats = fs.statSync('/Users/joe/test.txt');
} catch (err) {
  console.error(err);
}
```

```mjs
import fs from 'node:fs';

try {
  const stats = fs.statSync('/Users/joe/test.txt');
} catch (err) {
  console.error(err);
}
```

파일 정보는 `stats` 변수에 포함됩니다. `stats`를 사용하여 어떤 정보를 추출할 수 있을까요?

**다양한 정보를 얻을 수 있습니다. 예를 들어:**

- `stats.isFile()`과 `stats.isDirectory()`를 사용해 파일이 디렉터리인지 파일인지 확인할 수 있습니다.
- `stats.isSymbolicLink()`을 사용해 파일이 심볼릭 링크인지 확인할 수 있습니다.
- `stats.size`를 사용해 파일 크기를 바이트 단위로 확인할 수 있습니다.

일상적인 프로그래밍에서 주로 사용되는 메서드는 위와 같습니다.

```cjs
const fs = require('node:fs');

fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  stats.isFile(); // true
  stats.isDirectory(); // false
  stats.isSymbolicLink(); // false
  stats.size; // 1024000 //= 1MB
});
```

```mjs
import fs from 'node:fs';

fs.stat('/Users/joe/test.txt', (err, stats) => {
  if (err) {
    console.error(err);
    return;
  }

  stats.isFile(); // true
  stats.isDirectory(); // false
  stats.isSymbolicLink(); // false
  stats.size; // 1024000 //= 1MB
});
```

Promise 기반의 `fsPromises.stat()` 메서드를 사용하는 것을 선호한다면, `fs/promises` 모듈에서 제공하는 방법도 있습니다:

```cjs
const fs = require('node:fs/promises');

async function example() {
  try {
    const stats = await fs.stat('/Users/joe/test.txt');
    stats.isFile(); // true
    stats.isDirectory(); // false
    stats.isSymbolicLink(); // false
    stats.size; // 1024000 //= 1MB
  } catch (err) {
    console.log(err);
  }
}
example();
```

```mjs
import fs from 'node:fs/promises';

try {
  const stats = await fs.stat('/Users/joe/test.txt');
  stats.isFile(); // true
  stats.isDirectory(); // false
  stats.isSymbolicLink(); // false
  stats.size; // 1024000 //= 1MB
} catch (err) {
  console.log(err);
}
```

`fs` 모듈에 대해 더 알아보려면 [공식 문서](https://nodejs.org/api/fs.html)를 참조하세요.
