---
title: Node.js로 파일 쓰기
layout: learn
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais, clean99, ovflowd, vaishnav-mk
---

# Node.js로 파일 쓰기

## 파일 쓰기

Node.js에서 파일에 쓰는 가장 쉬운 방법은 `fs.writeFile()` API를 사용하는 것입니다.

```js
const fs = require('node:fs');

const content = '일부 콘텐츠!';

fs.writeFile('/Users/joe/test.txt', content, err => {
  if (err) {
    console.error(err);
  } else {
    // 파일이 성공적으로 작성되었습니다.
  }
});
```

### 파일을 동기적으로 쓰기

대안으로, 동기 버전인 `fs.writeFileSync()`를 사용할 수 있습니다:

```js
const fs = require('node:fs');

const content = '일부 콘텐츠!';

try {
  fs.writeFileSync('/Users/joe/test.txt', content);
  // 파일이 성공적으로 작성되었습니다.
} catch (err) {
  console.error(err);
}
```

`fs/promises` 모듈에서 제공하는 프라미스 기반의 `fsPromises.writeFile()` 메서드를 사용할 수도 있습니다:

```js
const fs = require('node:fs/promises');

async function example() {
  try {
    const content = '일부 콘텐츠!';
    await fs.writeFile('/Users/joe/test.txt', content);
  } catch (err) {
    console.log(err);
  }
}

example();
```

기본적으로, 이 API는 파일이 이미 존재할 경우 **파일의 내용을 덮어씁니다.**

**플래그를 지정하여 기본 동작을 수정할 수 있습니다:**

```js
fs.writeFile('/Users/joe/test.txt', content, { flag: 'a+' }, err => {});
```

#### 자주 사용하는 플래그는 다음과 같습니다

| 플래그 | 설명                                                                                          | 파일이 존재하지 않으면 생성됨 |
| ------ | --------------------------------------------------------------------------------------------- | :---------------------------: |
| `r+`   | 이 플래그는 파일을 **읽기** 및 **쓰기**용으로 엽니다                                          |              ❌               |
| `w+`   | 이 플래그는 파일을 **읽기** 및 **쓰기**용으로 열고, 스트림을 파일의 **처음**으로 위치시킵니다 |              ✅               |
| `a`    | 이 플래그는 파일을 **쓰기**용으로 열고, 스트림을 파일의 **끝**으로 위치시킵니다               |              ✅               |
| `a+`   | 이 플래그는 파일을 **읽기** 및 **쓰기**용으로 열고, 스트림을 파일의 **끝**으로 위치시킵니다   |              ✅               |

- 플래그에 대한 더 많은 정보를 [fs 문서](https://nodejs.org/api/fs.html#file-system-flags)에서 찾을 수 있습니다.

## 파일에 콘텐츠 추가하기

파일의 내용을 덮어쓰지 않고, 새 콘텐츠를 추가하고 싶을 때는 파일에 내용을 추가하는 것이 유용합니다.

### 예시

파일 끝에 콘텐츠를 추가하는 편리한 메서드는 `fs.appendFile()` (그리고 그 대응 버전인 `fs.appendFileSync()`)입니다:

```js
const fs = require('node:fs');

const content = '일부 콘텐츠!';

fs.appendFile('file.log', content, err => {
  if (err) {
    console.error(err);
  } else {
    // 완료!
  }
});
```

#### 프라미스를 사용한 예시

다음은 `fsPromises.appendFile()` 예시입니다:

```js
const fs = require('node:fs/promises');

async function example() {
  try {
    const content = '일부 콘텐츠!';
    await fs.appendFile('/Users/joe/test.txt', content);
  } catch (err) {
    console.log(err);
  }
}

example();
```
