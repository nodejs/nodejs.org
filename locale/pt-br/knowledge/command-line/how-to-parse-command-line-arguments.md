---
title: Como interpretar argumentos de linha de comando
date: '2011-08-26T10:08:50.000Z'
tags:
  - cli
difficulty: 1
layout: knowledge-post.hbs
---

<!-- Passing in arguments via the command line is an extremely basic programming task, and a necessity for anyone trying to write a simple Command-Line Interface (CLI). In Node.js, as in C and many related environments, all command-line arguments received by the shell are given to the process in an array called `argv` (short for 'argument values'). -->

Enviar argumentos por linha de comando é uma tarefa de programação extremamente básica e uma necessidade para todos que precisam escrever uma simples interface de linha de comando (CLI). Tanto em Node.js, quanto em C e em muitos outros ambientes, todos os argumentos de linha de comando recebidos pelo shell são enviados ao processo em um array chamado `argv` (abreviação de 'valores do argumento').

<!-- Node.js exposes this array for every running process in the form of `process.argv` - let's take a look at an example. Make a file called `argv.js` and add this line: -->

O Node.js expõe esse array para todos os processos em execução na forma de `process.argv` - agora vamos dar uma olhada em um exemplo. Crie um arquivo chamado `argv.js` e adicione a seguinte linha:

```js
console.log(process.argv);
```

<!-- Now save it, and try the following in your shell: -->

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

<!-- There you have it - an array containing any arguments you passed in. Notice the first two elements - `node` and the path to your script. These will always be present - even if your program takes no arguments of its own, your script's interpreter and path are still considered arguments to the shell you're using. -->

Pronto - agora você tem um array contendo os argumentos que passou. Perceba os dois primeiros elementos - `node` e o caminho do diretório para seu script. Estes elementos sempre estarão presentes - mesmo que seu programa não tenha nenhum argumento presente, o seu interpretador de scripts e o caminho do diretório são considerados argumentos pelo shell que você está usando.

<!-- Where everyday CLI arguments are concerned, you'll want to skip the first two. Now try this in `argv.js`: -->

No que diz respeito a uso de argumentos no dia-a-dia, você provavelmente vai querer pular os dois primeiros. Agora tente isso em `argv.js`:

```js
var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);
```

<!-- This yields: -->

Isso produz:

```bash
$ node argv.js one two three four
myArgs:  [ 'one', 'two', 'three', 'four' ]
```

<!-- Now let's actually do something with the args: -->

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

<!-- JS PRO TIP: Remember to `break` after each `case` - otherwise you'll run the next case too! -->
DICA PRO JS: Lembre-se de inserir `break` depois de cada `case` - caso contrário o próximo case será executado também!

<!-- Referring to your command-line arguments by array index isn't very clean, and can quickly turn into a nightmare when you start working with flags and the like - imagine you made a server, and it needed a lot of arguments. Imagine having to deal with something like `myapp -h host -p port -r -v -b --quiet -x -o outfile` - some flags need to know about what comes next, some don't, and most CLIs let users specify arguments in any order they want. Sound like a fun string to parse? -->

Se referir aos argumentos da linha de comando pelo índice do array não é considerado uma boa prática, e pode facilmente se tornar em um pesadelo quando você começar a trabalhar com flags e similares - imagine que você criou um servidor e que precisou de muitos argumentos. Imagine ter que lidar com algo como `myapp -h host -p port -r -v -b --quiet -x -o outfile` - algumas flags precisam saber sobre o que vem a seguir, outros não, e a maioria dos CLIs permitem que usuários possam especificar os argumentos na ordem que desejarem. Soa como uma string divertida de interpretar?

<!-- Luckily, there are many third party modules that makes all of this trivial - one of which is [yargs](https://www.npmjs.com/package/yargs). It's available via `npm`. Use this command from your app's base path: -->

Felizmente, existem muitos módulos de terceiros que tornam isso tudo trivial - um deles é o [yargs](https://www.npmjs.com/package/yargs). Está disponível via `npm`. Use este comando no diretório do seu aplicativo:

```
npm i yargs
```

<!-- Once you have it, give it a try - it can really be a life-saver. Lets test it with little fun Leap Year checker and Current Time teller -->

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

<!-- The last line was included to let you see how `yargs` handles your arguments. Here's a quick reference: -->

A última linha foi incluída para você ver como o `yargs` lida com os argumentos. Segue Uma pequena referência:

<!-- - `argv.$0` contains the name of the script file which is executed like: `'$0': 'myapp.js'`.
* `argv._` is an array containing each element not attached to an option(or flag) these elements are referred as `commands` in yargs.
* Individual options(flags) become properties of `argv`, such as with `argv.h` and `argv.time`. Note that non-single-letter flags must be passed in as `--flag` like: `node myapp.js --time`. -->

* `argv.$0` contém o nome do arquivo script no qual é executado como: `'$0': 'myapp.js'`.
* `argv._` é um array contendo cada elemento não atrelado a uma opção(ou flag), estes elementos são referenciados como `commands` no yargs.
* Opções(flags) individuais se tornam propriedades `argv`, assim como o `argv.h` e `argv.time`. Observe que flags sem-letra-unica precisam ser enviadas como `--flag` assim: `node myapp.js --time`.

<!-- A summary of elements used in the program: -->

Um resumo dos elementos usados ​​no programa:

<!-- - **argv**: This is the modified `process.argv` which we have configured with yargs.
* **command()**: This method is used to add commands, their description and options which are specific to these commands only, like in the above code `lyr` is the command and `-y` is lyr specific option: `node myapp.js lyr -y 2016`
* **option()**: This method is used to add global options(flags) which can be accessed by all commands or without any command.
* **help()**: This method is used to display a help dialogue when `--help` option is encountered which contains description oof ll the `commands` and `options` available.
* **alias()**: This method provides an alias name to an option, like in the above code both `--help` and `-h` triggers the help dialogue. -->

* **argv**: É uma modificação do `process.argv` no qual configuramos com o yargs.
* **command()**: Este método é usado para adicionar comandos, a descrição e as opções são específicas somente para esse comando, como no código anterior, `lyr`, que é um comando, e `-y` é uma opção específica de lyr: `node myapp.js lyr -y 2016`
* **option()**: Este método é utilizado para adicionar opções(flags) globais que podem ser acessadas por todos os comandos ou sem nenhum comando.
* **help()**: Este método é usado para exibir um texto de ajuda quando a opção `--help` é encontrada contendo a descrição de todos os `comandos` e `opções` disponíveis.
* **alias()**: Este método fornece um pseudônimo para uma opção, como no código seguinte tanto `--help` quanto `-h` acionam o texto de ajuda.

<!-- For more information on yargs and the many, many other things it can do for your command-line arguments, please visit [http://yargs.js.org/docs/](http://yargs.js.org/docs/) -->

Para mais informações sobre o yargs e sobre as muitas, muitas outras coisas que os argumentos de linha de comando podem fazer para você, por favor acesse: [http://yargs.js.org/docs/](http://yargs.js.org/docs/)
