---
date: '2011-08-26T10:08:50.000Z'
tags:
  - truthy
  - falsy
  - types
  - coercion
title: 'O que são valores "truthy" e "falsy"?'
difficulty: 4
layout: knowledge-post.hbs
---


<!-- JavaScript is weakly typed language. That means different types can be
used in operations and the language will try to convert the types
until the operation makes sense. -->
JavaScript é uma linguagem fracamente tipada. Isso significa que diferentes tipos podem ser usados em operações e a linguagem tentará converter estes tipos até que a operação faça sentido.


```js
console.log("1" > 0); // true, "1" convertido em number
console.log(1 + "1"); // 11, 1 convertido em string
```

<!-- Type conversion also applies when values are used in unary boolean
operations, most notably if statements. If a value converts to the
boolean true, then it is said to be "truthy". If it converts to false
it is "falsy". -->
A conversão de tipos é também aplicada quando os valores usados são de operação booleanas unárias, mais notavelmente em declarações. Se um valor for convertido para o boolean true, então é dito que é "truthy". Se convertido em falso chamamos de "falsy".

```js
let myval = "value";
if(myval) {
  console.log("Este valor é truthy");
}
    
myval = 0;
if(!myval) {
  console.log("Este valor é falsy");
}
```

<!-- Since most values in javascript are truthy, e.g. objects, arrays, most
numbers and strings, it's easier to identify all of the falsy
values. These are: -->
Já que a maioria dos valores em javascript é truthy, por exemplo, objetos, arrays, a maioria dos números e strings, é mais fácil identificar todos os valores falsy. Eles são:

```js
false // obviamente
0     // o único number considerado "falsy"
""    // uma string vazia
null
undefined
NaN
```
    
<!-- Note that all objects and arrays are truthy, even empty ones. -->
Note que todos os objetos e arrays são truthy, ainda que sejam vazios.

<!-- Truthiness and Falsiness also come into play with logical
operators. When using logical AND/OR, the values will be converted
based on truthiness or falseness and then the expression will resolve
to the last truthy value. Short circuit rules apply. Here's an
extended example. -->
Truthiness e Falsiness também entram em jogo com operadores lógicos. Quando usamos operadores lógicos AND/OR, os valores serão convertidos com base em truthiness ou falsiness e, em seguida, a expressão será resolvida para o último valor truthy. Regras de curto-circuito se aplicam. Aqui está um breve exemplo.

```js
let first = "truthy",
  second = "também truthy";

let myvalue = first && second;
console.log(myvalue); // "também truthy"

first = null;
second = "truthy";

myvalue = first || second;
console.log(myvalue); // "truthy"

myvalue2 = second || first;
console.log(myvalue2); // "truthy"

let truthy = "truthy",
  falsy = 0;

myvalue = truthy ? true : false;
myvalue = falsy ? true : false;
```
