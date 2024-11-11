---
title: Node.js에서 명령줄 입력 받기
layout: learn
authors: flaviocopes, MylesBorins, fhemberger, LaRuaNa, ahmadawais
---

# Node.js에서 명령줄 입력 받기

Node.js CLI 프로그램을 어떻게 대화형으로 만들 수 있나요?

Node.js는 버전 7부터 [`readline` 모듈](https://nodejs.org/api/readline.html)을 제공하여, `process.stdin` 스트림과 같은 읽기 가능한 스트림에서 입력을 받을 수 있습니다. 이는 Node.js 프로그램 실행 중에 터미널 입력을 한 줄씩 받을 수 있도록 합니다.

```cjs
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`What's your name?`, name => {
  console.log(`Hi ${name}!`);
  rl.close();
});
```

```mjs
import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`What's your name?`, name => {
  console.log(`Hi ${name}!`);
  rl.close();
});
```

이 코드는 사용자의 *이름*을 묻고, 사용자가 텍스트를 입력한 뒤 엔터를 누르면 인사말을 출력합니다.

`question()` 메서드는 첫 번째 매개변수로 질문을 보여주고, 사용자 입력을 기다립니다. 엔터가 눌리면 콜백 함수를 호출합니다.

이 콜백 함수에서 readline 인터페이스를 종료합니다.

`readline`은 이 외에도 여러 메서드를 제공합니다. 자세한 내용은 위에 링크된 패키지 문서를 참고하세요.

만약 비밀번호를 입력받아야 한다면, 비밀번호가 화면에 출력되지 않도록 해야 합니다. 이때 `*` 기호를 보여주는 것이 좋습니다.

가장 간단한 방법은 [`readline-sync` 패키지](https://www.npmjs.com/package/readline-sync)를 사용하는 것입니다. 이 패키지는 API가 매우 유사하며, 비밀번호 입력 시 자동으로 이를 처리해줍니다.

보다 완전하고 추상화된 솔루션은 [Inquirer.js 패키지](https://github.com/SBoudrias/Inquirer.js)를 사용하는 것입니다.

`npm install inquirer`로 설치한 후, 아래 코드를 통해 앞서 소개한 기능을 재현할 수 있습니다.

```cjs
const inquirer = require('inquirer');

const questions = [
  {
    type: 'input',
    name: 'name',
    message: "What's your name?",
  },
];

inquirer.prompt(questions).then(answers => {
  console.log(`Hi ${answers.name}!`);
});
```

```mjs
import inquirer from 'inquirer';

const questions = [
  {
    type: 'input',
    name: 'name',
    message: "What's your name?",
  },
];

inquirer.prompt(questions).then(answers => {
  console.log(`Hi ${answers.name}!`);
});
```

Inquirer.js는 다중 선택, 라디오 버튼, 확인 메시지 등 여러 기능을 제공하여 더욱 다양한 대화형 CLI 프로그램을 만들 수 있습니다.

Node.js에서 제공하는 기본 기능을 이해하는 것도 중요하지만, CLI 입력을 더 복잡하게 다루고자 할 때는 Inquirer.js가 최적의 선택입니다.
