---
title: Como usar util.inspect
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - debug
difficulty: 1
layout: knowledge-post.hbs
---

<!-- Node provides a utility function, for debugging purposes, that returns a string representation of an object.  `util.inspect()` can be a true lifesaver while working with properties of large, complex objects.

Let's provide a basic example. `util.inspect()` can be used on any object - a good demonstration will be one of Node's built-in objects.  Try this in the REPL (type `node` at your command line with no arguments):

     var util = require('util');
     util.inspect(console); -->

O Node oferece uma função utilitária, para fins de depuração, que retorna uma representação string de um objeto. `util.inspect()` pode ser de grande ajuda quando utilizada com propriedades de objetos que são muito grandes ou complexos.

Vamos ver um exemplo simples. `util.inspect()` pode ser usado em qualquer objeto - uma boa demonstração será utilizá-la em um dos objetos internos do Node. Tente isso no REPL (digite `node` na sua linha de comando, sem argumentos):

     var util = require('util');
     util.inspect(console);

<!-- The output will be:

     '{ log: [Function], info: [Function], warn: [Function], error: [Function], dir: [Function], time: [Function], timeEnd: [Function], trace: [Function], assert: [Function] }'

This is a listing of all the enumerable properties of the `console` object.  It is also worth noting that `console.dir` is a wrapper around `util.inspect` that uses its default arguments. -->

O resultado vai ser:

     '{ log: [Function], info: [Function], warn: [Function], error: [Function], dir: [Function], time: [Function], timeEnd: [Function], trace: [Function], assert: [Function] }'

Esta é uma listagem de todas as propriedades enumeráveis ​​do objeto `console`. Também vale a pena notar que `console.dir` é um wrapper em torno de `util.inspect` que utiliza seus argumentos padrões.

<!-- In the REPL, `util.inspect` will immediately return its output - this is not usually the case.  In the context of normal Node.js code in a file, something must be done with the output.  The simplest thing to do:

     console.log(util.inspect(myObj));

`util.inspect` can also be passed several optional arguments, shown here with their defaults:

     util.inspect(object, showHidden=false, depth=2, colorize=true); -->

No REPL, `util.inspect` retornará imediatamente seu resultado - esse não é o caso normalmente. No contexto de um código Node.js comum em um arquivo, algo deve ser feito com o resultado. A coisa mais simples a fazer:

     console.log(util.inspect(myObj));

`util.inspect` pode também receber diversos argumentos opcionais, mostrados aqui com seus valores padrões:

     util.inspect(object, showHidden=false, depth=2, colorize=true);

<!--
For example, `util.inspect(myObj, true, 7, true)` would inspect `myObj`, showing all the hidden and non-hidden properties up to a depth of `7` and colorize the output.  Let's go over the arguments individually.

The `depth` argument is the number of levels deep into a nested object to recurse - it defaults to 2.  Setting it to `null` will cause it to recurse 'all the way', showing every level.  Compare the (size of) the outputs of these two `util.inspect` statements in the REPL:

     var http = require('http');
     util.inspect(http, true, 1);
     util.inspect(http, true, 3); -->

Por exemplo, `util.inspect(myObj, true, 7, true)` inspecionaria `myObj`, mostrando todas as propriedades ocultas e não ocultas até uma profundidade de `7` e coloriria o resultado. Vamos conferir os argumentos individualmente.

O argumento `depth` representa o número de níveis dentro de um objeto aninhado para ser recursivo - o padrão é 2. Configurá-lo para `null` fará com que ele vá até o último nível, mostrando todos os níveis. Compare o tamanho dos resultados dessas duas instruções `util.inspect` no REPL:

     var http = require('http');
     util.inspect(http, true, 1);
     util.inspect(http, true, 3);

<!-- The optional argument `showHidden` is a boolean that determines whether or not the 'non-enumerable' properties of an object will be displayed - it defaults to `false`, which tends to result in vastly more readable output.  This isn't something a beginner needs to worry about most of the time, but it's worth demonstrating briefly.  Once more, try the following in the REPL:

     var util = require('util');
     util.inspect(console, true); -->

O argumento opcional `showHidden` é um booleano que determina se as propriedades 'não-enumeráveis' de um objeto serão ou não exibidas - o padrão é `false`, o que tende a resultar em uma saída muito mais legível. Isso não é algo que um iniciante precise se preocupar na maior parte do tempo, mas vale a pena demonstrar brevemente. Mais uma vez, tente o seguinte no REPL:

     var util = require('util');
     util.inspect(console, true);

<!-- Finally, the optional argument `colorize` is a boolean that adds ANSI escape codes to the string output. When logged to a terminal window, it should be pretty printed with colors.

     var util = require('util');
     console.log(util.inspect({a:1, b:"b"}, false,2,true)); -->

Finalmente, o argumento opcional `colorize` é um booleano que adiciona códigos de escape ANSI ao resultado da string. Quando utilizado em uma janela de terminal, o resultado deve aparecer colorido.

     var util = require('util');
     console.log(util.inspect({a:1, b:"b"}, false,2,true));
