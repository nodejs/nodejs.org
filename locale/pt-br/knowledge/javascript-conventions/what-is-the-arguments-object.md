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

Os objetos `arguments` são uma estrutura especial disponível dentro de todas as chamadas de função e que é representada como uma lista de argumentos que são passadas quando a função é chamada. Desde que JavaScript permite chamar funções com indeterminado número de argumentos, nós precisamos de um método para descobrir e acessar esses argumentos.

Os objetos `arguments` são um tipo de objeto array, seu tamanho corresponde a quantidade de argumentos passados para a função e que é possível acessar seu valor através de indexação do Array. Exemplo `arguments[0]` //Captura ao primeiro argumento. Existe apenas mais uma propriedade de `arguments` chamada `callee`, Nota: o ES5 impede o uso do `strict mode` mais informações podem ser encontradas [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments/callee). Veja mais exemplos sobre as propriedades `arguments`.

```js
const minhaFunc = function(primeiro) {
  const index0 = arguments[0] === primeiro;
  const index1 = arguments[1] === 2;
  const argumentsLength = arguments.length === 3;
  return console.log(index0, index1, argumentsLength)
}
minhaFunc(1, 2, 3);
// expectativa de retorno no console: true | true | true
```
```js
const locais = function() {
  console.log(
    arguments[0] === ‘casa’, // return true
    arguments[1] === ‘escritório’ , // return false
    arguments.length < 4 // return true
  )
}

locais('casa', 'praia', 'fazenda');
// expectativa de retorno no console: true | false | true
```

NOTA: Para ES5 ou anteriores, o loop `for` serve para coletar os dados dos `arguments`

```js
function casa(){
  for (locais in arguments){
    console.log(arguments[locais])
  }
  return arguments.length
}
casa('quarto', 'banheiro', 'sala')
// expectativa de retorno no console: quarto | banheiro | sala | 3
```
Em alguns casos você ainda pode tratar o `arguments` como um Array, neste caso você pode usar o `arguments` através de funções dinâmicas. Os métodos nativos do Array (Ex. Array.prototype.concat) serão aceitos para tratar os `arguments` dinamicamente. Essa técnica também oferece outros modos de conversão dos `arguments` para um tipo Array utilizando do método `Array.slice`.

```js
const minhaFunc = function(primeiro) {...
  minhaFunc.apply(obj, arguments).
}
// Concatena o Array com os `arguments`
const minhaFunc = function(primeiro) {
  return console.log(Array.prototype.concat.apply([1, 2, 3], arguments))
}
// expectativa de retorno no console: [ 1, 2, 3, 'PIN' ]

minhaFunc('PIN')

// altera os `arguments` para um tipo Array
const minhaFunc = function(primeiro) {
  return console.log(Array.prototype.slice.call(arguments))
}

minhaFunc(1,2,3,'PIN',5,6,7)
// expectativa de retorno no console: [ 1, 2, 3, 'PIN', 5, 6, 7 ]

// remova o primeiro item de `arguments`
const minhaFunc = function(primeiro) {
  return console.log( Array.prototype.slice.call(arguments, 1))
}

minhaFunc(1,2,3,'PIN',5,6,7)
// expectativa de retorno no console: [ 2, 3, 'PIN', 5, 6, 7 ]

```

O `arrow functions` foram adicionados no ECMAScript 2015 (ES6), propondo uma sintaxe mais compacta do que em sua versão anterior. Com isso, houve um modo alternativo para tratar os `arguments` o convertendo para `arguments objects` (além das palavras chaves `this`, `super`, e `new.target`). A solução para esse caso de uso é utilizar `rest parameter`. O `rest parameter` permite representar um indeterminado numero de argumentos como um tipo Array. Leia mais detalhes [aqui](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).

```js
const minhaFunc = (...args) => {
  console.log('O parâmetro é ', args[0]);
}

minhaFunc(1, 2, 3);
// expectativa de retorno no console: "O parâmetro é 1"

```
