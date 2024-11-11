---
title: Node.js 파일 경로
layout: learn
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, amiller-gh, ahmadawais
---

# Node.js 파일 경로

시스템의 모든 파일에는 경로가 있습니다. Linux와 macOS에서 경로는 `/users/joe/file.txt`처럼 보일 수 있지만, Windows 컴퓨터는 구조가 달라 `C:\users\joe\file.txt`와 같습니다.

응용 프로그램에서 경로를 사용할 때 이 차이를 고려해야 합니다.

이 모듈을 파일에 포함하려면 `const path = require('node:path');`을 사용하고, 메서드를 사용할 수 있습니다.

## 경로에서 정보 추출하기

주어진 경로에서 다음 메서드를 사용해 정보를 추출할 수 있습니다:

- `dirname`: 파일의 상위 폴더를 가져옵니다.
- `basename`: 파일명 부분을 가져옵니다.
- `extname`: 파일 확장자를 가져옵니다.

### 예시

```cjs
const path = require('node:path');

const notes = '/users/joe/notes.txt';

path.dirname(notes); // /users/joe
path.basename(notes); // notes.txt
path.extname(notes); // .txt
```

```mjs
import path from 'node:path';

const notes = '/users/joe/notes.txt';

path.dirname(notes); // /users/joe
path.basename(notes); // notes.txt
path.extname(notes); // .txt
```

확장자를 제외한 파일명을 얻으려면 `basename`에 두 번째 인수를 지정할 수 있습니다:

```js
path.basename(notes, path.extname(notes)); // notes
```

## 경로 작업

`path.join()`을 사용하여 경로의 두 부분 이상을 연결할 수 있습니다:

```js
const name = 'joe';
path.join('/', 'users', name, 'notes.txt'); // '/users/joe/notes.txt'
```

상대 경로의 절대 경로 계산은 `path.resolve()`를 사용하여 얻을 수 있습니다:

```js
path.resolve('joe.txt'); // '/Users/joe/joe.txt' (홈 폴더에서 실행한 경우)
```

이 경우 Node.js는 단순히 현재 작업 디렉터리에 `/joe.txt`를 추가합니다. 두 번째 인수로 폴더를 지정하면, `resolve`는 첫 번째를 기준으로 두 번째를 사용합니다:

```js
path.resolve('tmp', 'joe.txt'); // '/Users/joe/tmp/joe.txt' (홈 폴더에서 실행한 경우)
```

첫 번째 인수가 슬래시로 시작하면 이는 절대 경로를 의미합니다:

```js
path.resolve('/etc', 'joe.txt'); // '/etc/joe.txt'
```

`path.normalize()`는 또 다른 유용한 함수로, `.` 또는 `..`와 같은 상대적 지정자나 이중 슬래시가 포함된 실제 경로를 계산하려고 시도합니다:

```js
path.normalize('/users/joe/..//test.txt'); // '/users/test.txt'
```

**`resolve`나 `normalize`는 경로가 존재하는지 확인하지 않습니다**. 이 함수들은 단지 제공된 정보에 기반해 경로를 계산할 뿐입니다.
