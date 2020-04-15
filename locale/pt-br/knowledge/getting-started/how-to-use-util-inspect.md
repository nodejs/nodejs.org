---
title: Como usar util.inspect
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - debug
difficulty: 1
layout: knowledge-post.hbs
---

O Node oferece uma função utilitária, para fins de depuração, que retorna uma representação string de um objeto. `util.inspect()` pode ser de grande ajuda quando utilizada com propriedades de objetos que são muito grandes ou complexos.

Vamos ver um exemplo simples. `util.inspect()` pode ser usado em qualquer objeto - uma boa demonstração será utilizá-la em um dos objetos internos do Node. Tente isso no REPL (digite `node` na sua linha de comando, sem argumentos):

```javascript
var util = require('util');
util.inspect(console);
```

O resultado vai ser:

```
'{ log: [Function], info: [Function], warn: [Function], error: [Function], dir: [Function], time: [Function], timeEnd: [Function], trace: [Function], assert: [Function] }'
```

Esta é uma listagem de todas as propriedades enumeráveis ​​do objeto `console`. Também vale a pena notar que `console.dir` é um wrapper em torno de `util.inspect` que utiliza seus argumentos padrões.

No REPL, `util.inspect` retornará imediatamente seu resultado - esse não é o caso normalmente. No contexto de um código Node.js comum em um arquivo, algo deve ser feito com o resultado. A coisa mais simples a fazer:

```javascript
console.log(util.inspect(myObj));
```

`util.inspect` pode também receber diversos argumentos opcionais, mostrados aqui com seus valores padrões:

```javascript
util.inspect(object, showHidden=false, depth=2, colorize=true);
```

Por exemplo, `util.inspect(myObj, true, 7, true)` inspecionaria `myObj`, mostrando todas as propriedades ocultas e não ocultas até uma profundidade de `7` e coloriria o resultado. Vamos conferir os argumentos individualmente.

O argumento `depth` representa o número de níveis dentro de um objeto aninhado para ser recursivo - o padrão é 2. Configurá-lo para `null` fará com que ele vá até o último nível, mostrando todos os níveis. Compare o tamanho dos resultados dessas duas instruções `util.inspect` no REPL:

```javascript
var http = require('http');
util.inspect(http, true, 1);
util.inspect(http, true, 3);
```

O argumento opcional `showHidden` é um booleano que determina se as propriedades 'não-enumeráveis' de um objeto serão ou não exibidas - o padrão é `false`, o que tende a resultar em uma saída muito mais legível. Isso não é algo que um iniciante precise se preocupar na maior parte do tempo, mas vale a pena demonstrar brevemente. Mais uma vez, tente o seguinte no REPL:

```javascript
var util = require('util');
util.inspect(console, true);
```

Finalmente, o argumento opcional `colorize` é um booleano que adiciona códigos de escape ANSI ao resultado da string. Quando utilizado em uma janela de terminal, o resultado deve aparecer colorido.

```javascript
var util = require('util');
console.log(util.inspect({a:1, b:"b"}, false,2,true));
```
