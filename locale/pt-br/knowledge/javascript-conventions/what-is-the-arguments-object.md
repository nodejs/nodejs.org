---
date: '2011-08-26T10:08:50.000Z'
tags:
  - truthy
  - falsy
  - types
  - coercion
title: What is the arguments object?
difficulty: 4
layout: knowledge-post.hbs
---

O objeto `arguments` é uma estrutura especial disponível dentro de todas as chamadas de função. É representada como uma lista de argumentos que são passados quando a função é chamada. Uma vez que o JavaScript permite chamar funções com indeterminado número indeterminado de argumentos, nós precisamos de um método para descobrir e acessar esses argumentos.

O objeto `arguments` é um array-like, seu tamanho corresponde a quantidade de argumentos passados para a função. É possível acessar estes valores através da indexação do Array. Exemplo: `arguments[0]` captura o primeiro argumento. A única outra propriedade de `arguments` é chamada `callee`, a qual o ES5 impede o uso no `strict mode`, mais informações podem ser encontradas [aqui](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments/callee).
Veja mais exemplos sobre as propriedades de `arguments`.

```js
const myfunc = function(one) {
  arguments[0] === one;
  arguments[1] === 2;
  arguments.length === 3;
}

myfunc(1, 2, 3);
```

Essa construção é muito útil e fornece muitas funções ao JavaScript. Mas há uma pegadinha. O objeto `arguments` se comporta como um tipo array, porém ele não é realmente um array. Ele não têm as funcionalidades que o Array herda de Array.prototype e não responde a nenhum método de array, exemplo. `arguments.sort()` gera um TypeError. Em vez disso, você precisa copiar os valores para um array verdadeiro.
Com o advento do ES6 o método `Array.from()` torna isso bastante simples.

```js
const myfunc = function(a, b, c) {
  const args = Array.from(arguments);
  console.log(args) // [1, 2, 3]
}

myfunc(1, 2, 3);
```

NOTA: Para ES5 e anteriores, um loop `for` normal pode fazer o truque

Em alguns casos você ainda pode tratar o `arguments` como um Array, você pode usar o `arguments` através de invocações de funções dinâmicas. E a maioria dos métodos nativos Array (Ex. Array.prototype.concat) aceitarão `arguments` quando invocados dinamicamente utilizando `call` ou `apply`. Essa técnica também oferece outros modos de conversão dos `arguments` para um tipo Array utilizando método `Array.slice`.

```js
myfunc.apply(obj, arguments).

// concat arguments onto the
Array.prototype.concat.apply([1,2,3], arguments);

// turn arguments into a true array
const args = Array.prototype.slice.call(arguments);

// cut out first argument
args = Array.prototype.slice.call(arguments, 1);
```

### Objeto Argments em arrow function

As `arrow functions` foram adicionadas na especificação do ECMAScript 2015 (ES6), propondo uma alternativa mais compacta do que a declaração de uma função comum. A desvantagem dessa alternativa é que não existe mais o objecto `arguments` (e também as keywords `this`, `super` ou `new.target`). A solução para esses casos é o uso dos parâmetros `rest`. Os parâmetros `rest` permitem representar um número indeterminado de argumentos como um Array. Leia mais detalhes [aqui](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).

```js
const myfunc = (...args) => {
  console.log('first parameter is ', args[0]);
}

myfunc(1, 2, 3);
```
