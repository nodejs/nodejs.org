---
title: Node.js에서 폴더 작업하기
layout: learn
authors: flaviocopes, MylesBorins, fhemberger, liangpeili, LaRuaNa, ahmadawais, clean99
---

# Node.js에서 폴더 작업하기

Node.js의 `fs` 코어 모듈은 폴더 작업에 유용한 다양한 메서드를 제공합니다.

## 폴더가 존재하는지 확인하기

`fs.access()` (프라미스 기반의 `fsPromises.access()`와 대응) 메서드를 사용하여 폴더가 존재하고 Node.js가 해당 폴더에 접근할 수 있는지 권한을 확인할 수 있습니다.

## 새 폴더 만들기

`fs.mkdir()` 또는 `fs.mkdirSync()` 또는 `fsPromises.mkdir()`를 사용하여 새 폴더를 만들 수 있습니다.

```cjs
const fs = require('node:fs');

const folderName = '/Users/joe/test';

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
} catch (err) {
  console.error(err);
}
```

```mjs
import fs from 'node:fs';

const folderName = '/Users/joe/test';

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
} catch (err) {
  console.error(err);
}
```

## 디렉터리의 내용 읽기

`fs.readdir()` 또는 `fs.readdirSync()` 또는 `fsPromises.readdir()`를 사용하여 디렉터리의 내용을 읽을 수 있습니다.

이 코드는 폴더의 내용을 읽고, 파일 및 하위 폴더를 포함한 상대 경로를 반환합니다:

```cjs
const fs = require('node:fs');

const folderPath = '/Users/joe';

fs.readdirSync(folderPath);
```

```mjs
import fs from 'node:fs';

const folderPath = '/Users/joe';

fs.readdirSync(folderPath);
```

전체 경로를 얻을 수도 있습니다:

```js
fs.readdirSync(folderPath).map(fileName => {
  return path.join(folderPath, fileName);
});
```

파일만 반환하고 폴더를 제외하려면 결과를 필터링할 수 있습니다:

```cjs
const fs = require('node:fs');

const isFile = fileName => {
  return fs.lstatSync(fileName).isFile();
};

fs.readdirSync(folderPath)
  .map(fileName => {
    return path.join(folderPath, fileName);
  })
  .filter(isFile);
```

```mjs
import fs from 'node:fs';

const isFile = fileName => {
  return fs.lstatSync(fileName).isFile();
};

fs.readdirSync(folderPath)
  .map(fileName => {
    return path.join(folderPath, fileName);
  })
  .filter(isFile);
```

## 폴더 이름 변경하기

`fs.rename()` 또는 `fs.renameSync()` 또는 `fsPromises.rename()`를 사용하여 폴더 이름을 변경할 수 있습니다. 첫 번째 매개변수는 현재 경로, 두 번째 매개변수는 새로운 경로입니다:

```cjs
const fs = require('node:fs');

fs.rename('/Users/joe', '/Users/roger', err => {
  if (err) {
    console.error(err);
  }
  // 완료
});
```

```mjs
import fs from 'node:fs';

fs.rename('/Users/joe', '/Users/roger', err => {
  if (err) {
    console.error(err);
  }
  // 완료
});
```

`fs.renameSync()`는 동기 버전입니다:

```cjs
const fs = require('node:fs');

try {
  fs.renameSync('/Users/joe', '/Users/roger');
} catch (err) {
  console.error(err);
}
```

```mjs
import fs from 'node:fs';

try {
  fs.renameSync('/Users/joe', '/Users/roger');
} catch (err) {
  console.error(err);
}
```

`fsPromises.rename()`는 프라미스 기반 버전입니다:

```cjs
const fs = require('node:fs/promises');

async function example() {
  try {
    await fs.rename('/Users/joe', '/Users/roger');
  } catch (err) {
    console.log(err);
  }
}
example();
```

```mjs
import fs from 'node:fs/promises';

try {
  await fs.rename('/Users/joe', '/Users/roger');
} catch (err) {
  console.log(err);
}
```

## 폴더 삭제하기

`fs.rmdir()` 또는 `fs.rmdirSync()` 또는 `fsPromises.rmdir()`를 사용하여 폴더를 삭제할 수 있습니다.

```cjs
const fs = require('node:fs');

fs.rmdir(dir, err => {
  if (err) {
    throw err;
  }

  console.log(`${dir}이 삭제되었습니다!`);
});
```

```mjs
import fs from 'node:fs';

fs.rmdir(dir, err => {
  if (err) {
    throw err;
  }

  console.log(`${dir}이 삭제되었습니다!`);
});
```

내용이 있는 폴더를 삭제하려면 `{ recursive: true }` 옵션을 사용하여 내용을 재귀적으로 삭제할 수 있습니다.

`{ recursive: true, force: true }`는 폴더가 존재하지 않으면 예외를 무시하게 합니다.

```cjs
const fs = require('node:fs');

fs.rm(dir, { recursive: true, force: true }, err => {
  if (err) {
    throw err;
  }

  console.log(`${dir}이 삭제되었습니다!`);
});
```

```mjs
import fs from 'node:fs';

fs.rm(dir, { recursive: true, force: true }, err => {
  if (err) {
    throw err;
  }

  console.log(`${dir}이 삭제되었습니다!`);
});
```
