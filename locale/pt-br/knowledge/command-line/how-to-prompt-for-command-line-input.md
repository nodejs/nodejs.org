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

Então você possui uma pequena ferramenta CLI, mas deseja habilitar uma opção onde o usuário possa inserir dados adicionais após o start do mesmo ao invés de passar esses dados como argumento de linha de comando ou inserindo dentro do arquivo. Para fazer isso, será necessário escutar ao STDIN ("standard input", ex: seu teclado), no qual o Node.js exporta para você como `process.stdin`, uma stream de leitura.

Streams são a forma do Node.js lidar com tipos de E/S - é um tópico importante, e você pode ler mais sobre isso [aqui](https://nodejs.org/api/stream.html). No momento, nós vamos usar o módulo `readline` do Node.js que é um wrapper envolvendo o padrão de E/S, adequado para receber a entrada do usuário a partir da linha de comando (terminal).

Segue um exemplo simples. Tente o seguinte um novo arquivo:

```js
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What is your name ? ", function(name) {
    rl.question("Where do you live ? ", function(country) {
        console.log(`${name}, is a citizen of ${country}`);
        rl.close();
    });
});

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});
```

No código acima `readline.createInterface()` é utilizado para criar uma instância de `readline` configurando as streams de leitura e escrita. A chave `input` recebe um stream de leitura como `process.stdin` ou `fs.createReadStream('file.txt')` e a chave `output` recebe um stream de escrita como `process.stdout` ou `process.stderr`.

O método `rl.question()` mostra a consulta gravando a mesma no `output`, aguardando pela entrada do usuário a ser fornecido pelo `input`, então invoca a função `callback`passando a entrada como primeiro argumento.

DICA PRO NODE: Lembre-se de usar `rl.close()` para fechar a transmissão caso contrário o processos ficará em um estado ocioso `idle`.

A última parte do código utiliza o método `rl.on()` para adicionar um evento listener ao evento `close`que realiza um simples `console.log` na saída da stream e encerra o processo. Esta parte é completamente opcional e pode ser removida a vontade. Para maiores informações e detalhes de uso consulte a documentação [aqui](https://nodejs.org/api/readline.html).

Se tudo isso parece um pouco complicado, ou se você deseja uma interface de alto nível, não se preocupe - como sempre, a comunidade Node.js veio ao resgate. Existe um módulo amigável para isto, o `prompt` disponível no `npm`:

```bash
npm install prompt
```

O prompt foi criado para ser fácil - se seus olhos começaram a brilhar assim que você leu `Readable Stream`, então essa é uma seção para você. Compare os seguintes exemplos abaixo:

```js
const prompt = require('prompt');

prompt.start();

prompt.get(['username', 'email'], function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received:');
    console.log('  Username: ' + result.username);
    console.log('  Email: ' + result.email);
});

function onErr(err) {
    console.log(err);
    return 1;
}
```

DICA PRO NODE: Esse pequeno script também demonstra o tratamento adequado de erros em node - erros são o primeiro argumento de um callback, e `return` é utilizado com o controlador de erros de tal forma que o restante da função não seja executado quando um erro ocorrer.

Usar o prompt também torna trivial lidar com um determinado conjunto de propriedades recorrentes que você pode querer anexar.

```js
const prompt = require('prompt');

const properties = [
    {
        name: 'username',
        validator: /^[a-zA-Z\s\-]+$/,
        warning: 'Username must be only letters, spaces, or dashes'
    },
    {
        name: 'password',
        hidden: true
    }
];

prompt.start();

prompt.get(properties, function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received:');
    console.log('  Username: ' + result.username);
    console.log('  Password: ' + result.password);
});

function onErr(err) {
    console.log(err);
    return 1;
}
```

Para maiores informações sobre o Prompt, por favor acesse [O projeto no GitHub](https://github.com/flatiron/prompt).
