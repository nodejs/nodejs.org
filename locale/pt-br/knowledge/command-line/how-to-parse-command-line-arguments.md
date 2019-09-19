---
title: Como interpretar argumentos de linha de comando
date: '2011-08-26T10:08:50.000Z'
tags:
  - cli
difficulty: 1
layout: knowledge-post.hbs
---

Enviar argumentos por linha de comando é uma tarefa de programação extremamente básica e uma necessidade para todos que precisam escrever uma simples interface de linha de comando (CLI). Tanto em Node.js, quanto em C e em muitos outros ambientes, todos os argumentos de linha de comando recebidos pelo shell são enviados ao processo em um array chamado `argv` (abreviação de 'valores do argumento').

O Node.js expõe esse array para todos os processos em execução na forma de `process.argv` - agora vamos dar uma olhada em um exemplo. Crie um arquivo chamado `argv.js` e adicione a seguinte linha:

```js
console.log(process.argv);
```

Agora salve o arquivo, e tente executar a seguinte instrução no seu shell:

```bash
$ node argv.js one two three four five
[ 'node',
  '/home/avian/argvdemo/argv.js',
  'one',
  'two',
  'three',
  'four',
  'five' ]
```

Pronto - agora você tem um array contendo os argumentos que passou. Perceba os dois primeiros elementos - `node` e o caminho do diretório para seu script. Estes elementos sempre estarão presentes - mesmo que seu programa não tenha nenhum argumento presente, o seu interpretador de scripts e o caminho do diretório são considerados argumentos pelo shell que você está usando.

No que diz respeito a uso de argumentos no dia-a-dia, você provavelmente vai querer pular os dois primeiros. Agora tente isso em `argv.js`:

```js
var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
```

Isso produz:

```bash
$ node argv.js one two three four
myArgs:  [ 'one', 'two', 'three', 'four' ]
```

Agora vamos tentar fazer algo diferente com os argumentos:

```js
var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

switch (myArgs[0]) {
case 'insult':
    console.log(myArgs[1], 'smells quite badly.');
    break;
case 'compliment':
    console.log(myArgs[1], 'is really cool.');
    break;
default:
    console.log('Sorry, that is not something I know how to do.');
}
```

DICA PRO JS: Lembre-se de inserir `break` depois de cada `case` - caso contrário o próximo case será executado também!

Se referir aos argumentos da linha de comando pelo índice do array não é considerado uma boa prática, e pode facilmente se tornar em um pesadelo quando você começar a trabalhar com flags e similares - imagine que você criou um servidor e que precisou de muitos argumentos. Imagine ter que lidar com algo como `myapp -h host -p port -r -v -b --quiet -x -o outfile` - algumas flags precisam saber sobre o que vem a seguir, outros não, e a maioria dos CLIs permitem que usuários possam especificar os argumentos na ordem que desejarem. Soa como uma string divertida de interpretar?

Felizmente, existem muitos módulos de terceiros que tornam isso tudo trivial - um deles é o [yargs] (https://www.npmjs.com/package/yargs). Está disponível via `npm`. Use este comando no diretório do seu aplicativo:

```
npm i yargs
```

Assim que instalar, faça uns testes - pode ser de grande ajuda. Vamos testar com um divertido e simples verificador de ano bissexto e um informador de hora atual

```js
const yargs = require('yargs');

const argv = yargs
    .command('lyr', 'Tells whether an year is leap year or not', {
        year: {
            description: 'the year to check for',
            alias: 'y',
            type: 'number',
        }
    })
    .option('time', {
        alias: 't',
        description: 'Tell the present Time',
        type: 'boolean',
    })
    .help()
    .alias('help', 'h')
    .argv;

if (argv.time) {
    console.log('The current time is: ', new Date().toLocaleTimeString());
}

if (argv._.includes('lyr')) {
    const year = argv.year || new Date().getFullYear();
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
        console.log(`${year} is a Leap Year`);
    } else {
        console.log(`${year} is NOT a Leap Year`);
    }
}

console.log(argv);
```

A última linha foi incluída para você ver como o `yargs` lida com os argumentos. Segue Uma pequena referência:

- `argv.$0` contém o nome do arquivo script no qual é executado como: `'$0': 'myapp.js'`.
- `argv._` é um array contendo cada elemento não atrelado a uma opção(ou flag), estes elementos são referenciados como `commands` no yargs.
- Opções(flags) individuais se tornam propriedades `argv`, assim como o `argv.h` e `argv.time`. Observe que flags sem-letra-unica precisam ser enviadas como `--flag` assim: `node myapp.js --time`.

Um resumo dos elementos usados ​​no programa:

- **argv**: É uma modificação do `process.argv` no qual configuramos com o yargs.
- **command()**: Este método é usado para adicionar comandos, a descrição e as opções são específicas somente para esse comando, como no código anterior, `lyr`, que é um comando, e `-y` é uma opção específica de lyr: `node myapp.js lyr -y 2016`
- **option()**: Este método é utilizado para adicionar opções(flags) globais que podem ser acessadas por todos os comandos ou sem nenhum comando.
- **help()**: Este método é usado para exibir um texto de ajuda quando a opção `--help` é encontrada contendo a descrição de todos os `comandos` e `opções` disponíveis.
- **alias()**: Este método fornece um pseudônimo para uma opção, como no código seguinte tanto `--help` quanto `-h` acionam o texto de ajuda.

Para mais informações sobre o yargs e sobre as muitas, muitas outras coisas que os argumentos de linha de comando podem fazer para você, por favor acesse: [http://yargs.js.org/docs/](http://yargs.js.org/docs/)
