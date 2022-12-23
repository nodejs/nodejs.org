---
title: Como solicitar entrada do usuário a partir de um script de linha de comando?
date: '2011-08-26T10:08:50.000Z'
tags:
  - javascript
  - core
  - cli
difficulty: 2
layout: knowledge-post.hbs
---

<!-- So you've got a little CLI tool, but you want to be able to prompt a user for additional data after the script has started, rather than passing it in as a command line argument or putting it in a file. To do this, you'll need to listen to STDIN ("standard input", i.e. your keyboard), which Node.js exposes for you as `process.stdin`, a readable stream. -->

Então você possui uma pequena ferramenta CLI, mas deseja habilitar uma opção onde o usuário possa inserir dados adicionais após o start do mesmo ao invés de passar esses dados como argumento de linha de comando ou inserindo dentro do arquivo. Para fazer isso, será necessário escutar ao STDIN ("standard input", ex: seu teclado), no qual o Node.js exporta para você como `process.stdin`, uma stream de leitura.

<!-- Streams are Node's way of dealing with evented I/O - it's a big topic, and you can read more about them [here](https://nodejs.org/api/stream.html). For now, we're going to use node's `readline` module which is a wrapper around Standard I/O, suitable for taking user input from command line(terminal). -->

Streams são a forma do Node.js lidar com tipos de E/S - é um tópico importante, e você pode ler mais sobre isso [aqui](https://nodejs.org/api/stream.html). No momento, nós vamos usar o módulo `readline` do Node.js que é um wrapper envolvendo o padrão de E/S, adequado para receber a entrada do usuário a partir da linha de comando (terminal).

<!-- Here's a simple example. Try the following in a new file: -->

Segue um exemplo simples. Tente o seguinte um novo arquivo:

```js
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your name ? ', function (name) {
  rl.question('Where do you live ? ', function (country) {
    console.log(`${name}, is a citizen of ${country}`);
    rl.close();
  });
});

rl.on('close', function () {
  console.log('\nBYE BYE !!!');
  process.exit(0);
});
```

<!-- In the above code `readline.createInterface()` is used for creating an instance of `readline` by configuring the readable and the writable streams. The `input` key takes a readable stream like `process.stdin` or `fs.createReadStream('file.txt')` and the `output` key takes a writable stream like `process.stdout` or `process.stderr`. -->

No código acima `readline.createInterface()` é utilizado para criar uma instância de `readline` configurando as streams de leitura e escrita. A chave `input` recebe um stream de leitura como `process.stdin` ou `fs.createReadStream('file.txt')` e a chave `output` recebe um stream de escrita como `process.stdout` ou `process.stderr`.

<!-- The `rl.question()` method displays the query by writing it to the `output`, waits for user input to be provided on `input`, then invokes the `callback` function passing the provided input as the first argument. -->

O método `rl.question()` mostra a consulta gravando a mesma no `output`, aguardando pela entrada do usuário a ser fornecido pelo `input`, então invoca a função `callback`passando a entrada como primeiro argumento.

<!-- NODE PRO TIP: Do remember to use `rl.close()` to close the transmitting otherwise the process will be left in the `idle` state. -->

DICA PRO NODE: Lembre-se de usar `rl.close()` para fechar a transmissão caso contrário o processos ficará em um estado ocioso `idle`.

<!-- The last part of the code uses `rl.on()` method to add an event listener to the `close` event which simply `console.log` to the output stream and exits the process. This part is completely optional and can be removed at will. For more in-depth details and usage refer to the docs [here](https://nodejs.org/api/readline.html). -->

A última parte do código utiliza o método `rl.on()` para adicionar um evento listener ao evento `close`que realiza um simples `console.log` na saída da stream e encerra o processo. Esta parte é completamente opcional e pode ser removida a vontade. Para maiores informações e detalhes de uso consulte a documentação [aqui](https://nodejs.org/api/readline.html).

<!--
If all of this sounds complicated, or if you want a higher-level interface to this sort of thing, don't worry - as usual, the Node.js community has come to the rescue. One particularly friendly module to use for this is `prompt`, available on `npm`: -->

Se tudo isso parece um pouco complicado, ou se você deseja uma interface de alto nível, não se preocupe - como sempre, a comunidade Node.js veio ao resgate. Existe um módulo amigável para isto, o `prompt` disponível no `npm`:

```bash
npm install prompt
```

<!-- Prompt is built to be easy - if your eyes started to glaze over as soon as you saw `Readable Stream`, then this is the section for you. Compare the following to the example above: -->

O prompt foi criado para ser fácil - se seus olhos começaram a brilhar assim que você leu `Readable Stream`, então essa é uma seção para você. Compare os seguintes exemplos abaixo:

```js
const prompt = require('prompt');

prompt.start();

prompt.get(['username', 'email'], function (err, result) {
  if (err) {
    return onErr(err);
  }
  console.log('Command-line input received:');
  console.log('  Username: ' + result.username);
  console.log('  Email: ' + result.email);
});

function onErr(err) {
  console.log(err);
  return 1;
}
```

<!-- NODE PRO TIP: This short script also demonstrates proper error handling in node - errors are a callback's first argument, and `return` is used with the error handler so that the rest of the function doesn't execute when errors happen. -->

DICA PRO NODE: Esse pequeno script também demonstra o tratamento adequado de erros em node - erros são o primeiro argumento de um callback, e `return` é utilizado com o controlador de erros de tal forma que o restante da função não seja executado quando um erro ocorrer.

<!-- Prompt also makes it trivial to handle a certain set of recurring properties that one might want to attach. -->

Usar o prompt também torna trivial lidar com um determinado conjunto de propriedades recorrentes que você pode querer anexar.

```js
const prompt = require('prompt');

const properties = [
  {
    name: 'username',
    validator: /^[a-zA-Z\s-]+$/,
    warning: 'Username must be only letters, spaces, or dashes'
  },
  {
    name: 'password',
    hidden: true
  }
];

prompt.start();

prompt.get(properties, function (err, result) {
  if (err) {
    return onErr(err);
  }
  console.log('Command-line input received:');
  console.log('  Username: ' + result.username);
  console.log('  Password: ' + result.password);
});

function onErr(err) {
  console.log(err);
  return 1;
}
```

<!-- For more information on Prompt, please see [the project's GitHub page](https://github.com/flatiron/prompt). -->

Para maiores informações sobre o Prompt, por favor acesse [O projeto no GitHub](https://github.com/flatiron/prompt).
