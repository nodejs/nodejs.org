---
title: Usando ECMA5 no node.js
date: "2011-08-26T10:08:50.000Z"
tags:
  - core
  - builtin
  - globals
difficulty: 2
layout: knowledge-post.hbs
---

<!-- When developing in the browser there are many wonderful built in JavaScript functions that we can't use because certain browsers don't implement them.  As a result, most developers never use them.  In Node, however we can assume that everyone has the same JavaScript implementation and as such can use these wonderful functions and not implement them over and over in our own libraries. -->

Ao desenvolver no navegador, há muitas funções maravilhosas construídas em JavaScript que não podemos usar, porque certos navegadores não as implementam. Como resultado, a maioria dos desenvolvedores nunca as usa. No Node, no entanto, podemos assumir que todos têm a mesma implementação de JavaScript e, como tal, podem usar essas funções maravilhosas e não implementá-las repetidamente em nossas próprias bibliotecas.

<!-- The following is a list of some interesting api bits that aren't considered safe to use in a web setting but are built in to node's V8 engine. -->

A seguir está uma lista de alguns partes interessantes da API que não são considerados seguros para uso em uma configuração da Web, mas que são incorporados ao mecanismo V8 do node.

<!-- Note that V8 implements all of ECMA 3rd edition and parts of the new stuff in the [ECMA 5th edition](http://www.ecma-international.org/publications/standards/Ecma-262.htm) -->

Observe que o V8 implementa toda a terceira edição do ECMA e partes do novo material na [5ª edição do ECMA](http://www.ecma-international.org/publications/standards/Ecma-262.htm)

<!-- ## Syntax extensions -->

## Extensões de sintaxe

<!-- - `var obj = { get a() { return "something" }, set a() { "do nothing" } }` getter/setter syntax -->

- `var obj = { get a() { return "something" }, set a() { "do nothing" } }` getter/setter sintaxe

<!-- ## Array -->

## Array

<!-- - `Array.isArray(array)` - Returns true if the passed argument is an array. -->

- `Array.isArray(array)` - Retorna verdadeiro se o argumento passado for uma matriz.

## Array.prototype

<!-- - `indexOf(value)` - Returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found. -->

- `indexOf(value)` - Retorna o primeiro (menor) índice de um elemento dentro da matriz igual ao valor especificado ou -1 se nenhum for encontrado.
  <!-- - `lastIndexOf(value)` - Returns the last (greatest) index of an element within the array equal to the specified value, or -1 if none is found. -->
- `lastIndexOf(value)` - Retorna o último (maior) índice de um elemento dentro da matriz igual ao valor especificado ou -1 se nenhum for encontrado.
  <!-- - `filter(callback)` - Creates a new array with all of the elements of this array for which the provided filtering function returns true. -->
- `filter(callback)` - Cria uma nova matriz com todos os elementos dessa matriz para os quais a função de filtragem fornecida retorna true.
  <!-- - `forEach(callback)` - Calls a function for each element in the array. -->
- `forEach(callback)` - Chama uma função para cada elemento na matriz.
  <!-- - `every(callback)` - Returns true if every element in this array satisfies the provided testing function. -->
- `every(callback)` - Retorna verdadeiro se todos os elementos dessa matriz satisfizerem a função de teste fornecida.
  <!-- - `map(callback)` - Creates a new array with the results of calling a provided function on every element in this array. -->
- `map(callback)` - Cria uma nova matriz com os resultados de chamar uma função fornecida em todos os elementos dessa matriz.
  <!-- - `some(callback)` - Returns true if at least one element in this array satisfies the provided testing function. -->
- `some(callback)` - Retorna verdadeiro se pelo menos um elemento nessa matriz satisfizer a função de teste fornecida.
  <!-- - `reduce(callback[, initialValue])` - Apply a function simultaneously against two values of the array (from left-to-right) as to reduce it to a single value. -->
- `reduce(callback[, initialValue])` - Aplica uma função simultaneamente contra dois valores da matriz (da esquerda para a direita) para reduzi-la a um único valor.
  <!-- - `reduceRight(callback[, initialValue])` - Apply a function simultaneously against two values of the array (from right-to-left) as to reduce it to a single value. -->
- `reduceRight(callback[, initialValue])` - Aplica uma função simultaneamente contra dois valores da matriz (da direita para a esquerda) para reduzi-la a um único valor.

<!-- ## Date -->

## Data

<!-- - `Date.now()` - Returns the numeric value corresponding to the current time. -->

- `Date.now()` - Retorna o valor numérico correspondente à hora atual.

<!-- ## Date.prototype -->

## Protótipo de data

<!-- - `toISOString()` -  -->

- `toISOString()` - Retorna uma string no formato ISO estendido simplificado

<!-- ## Object -->

## Objeto

<!-- - `Object.create(proto, props)` - Creates a new object whose prototype is the passed in parent object and whose properties are those specified by props. -->

- `Object.create(proto, props)` - Cria um novo objeto cujo protótipo é o objeto pai passado e cujas propriedades são aquelas especificadas por props.
  <!-- - `Object.keys(obj)` - Returns a list of the own Properties of an object that are enumerable. -->
- `Object.keys(obj)` - Retorna uma lista das próprias propriedades de um objeto que são enumeráveis.
  <!-- - `Object.defineProperty(obj, prop, desc)` - Defines a property on an object with the given descriptor -->
- `Object.defineProperty(obj, prop, desc)` - Define uma propriedade em um objeto com o descritor fornecido.
  <!-- - `Object.defineProperties(obj, props)` - Adds own properties and/or updates the attributes of existing own properties of an object -->
- `Object.defineProperties(obj, props)` - Adiciona propriedades próprias e/ou atualiza os atributos das propriedades existentes de um objeto.
  <!-- - `Object.getOwnPropertyNames(obj)` - Returns a list of the ownProperties of an object including ones that are not enumerable. -->
- `Object.getOwnPropertyNames(obj)` - Retorna uma lista das próprias propriedades de um objeto, incluindo aquelas que não são enumeráveis.
  <!-- - `Object.getPrototypeOf(obj)` - Returns the prototype of an object. -->
- `Object.getPrototypeOf(obj)` - Retorna o protótipo de um objeto.
  <!-- - `Object.getOwnPropertyDescriptor(obj, property)` - Returns an object with keys describing the description of a property (value, writable, enumerable, configurable) -->
- `Object.getOwnPropertyDescriptor(obj, property)` - Retorna um objeto com chaves descrevendo a descrição de uma propriedade (valor, gravável, enumerável, configurável).
  <!-- - `Object.preventExtensions(obj)` - Prevents any new properties from being added to the given object. -->
- `Object.preventExtensions(obj)` -Impede que quaisquer novas propriedades sejam adicionadas ao objeto fornecido.
  <!-- - `Object.isExtensible(obj)` - Checks if Object.preventExtensions() has been called on this object. -->
- `Object.isExtensible(obj)` - Verifica se Object.preventExtensions() foi chamado neste objeto.
  <!-- - `Object.seal(obj)` - Prevents code from adding or deleting properties, or changing the descriptors of any property on an object. Property values can be changed however. -->
- `Object.seal(obj)` - Impede que o código adicione ou exclua propriedades ou altere os descritores de qualquer propriedade em um objeto. No entanto, valores de propriedade podem ser alterados.

  <!-- - `Object.isSealed(obj)` - Checks if Object.seal() has been called on this object. -->

- `Object.isSealed(obj)` - Verifica se Object.seal() foi chamado neste objeto.
  <!-- - `Object.freeze(obj)` - Same as Object.seal, except property values cannot be changed. -->
- `Object.freeze(obj)` - O mesmo que Object.seal, exceto que os valores da propriedade não podem ser alterados.
  <!-- - `Object.isFrozen(obj)` - Checks if Object.freeze() has been called on this object. -->
- `Object.isFrozen(obj)` - Verifica se Object.freeze() foi chamado neste objeto.

<!-- ## Object.prototype -->

## Protótipo de objeto

<!-- - `__defineGetter__(name, callback)` - (Mozilla extension, not ECMAScript 5) Associates a function with a property that, when accessed, executes that function and returns its return value. -->

- `__defineGetter__(name, callback)` - (Extensão do Mozilla, não ECMAScript 5) Associa uma função a uma propriedade que, quando acessada, executa essa função e retorna seu valor de retorno.
  <!-- - `__defineSetter__(name, callback)` - (Mozilla extension, not ECMAScript 5) Associates a function with a property that, when set, executes that function which modifies the property. -->
- `__defineSetter__(name, callback)` - (Extensão do Mozilla, não ECMAScript 5) Associa uma função a uma propriedade que, quando definida, executa essa função que modifica a propriedade.
  <!-- - `__lookupGetter__(name)` - (Mozilla extension, not ECMAScript 5) Returns the function associated with the specified property by the **defineGetter** method. -->
- `__lookupGetter__(name)` - (Extensão do Mozilla, não ECMAScript 5) Retorna a função associada à propriedade especificada pelo método **defineGetter**.
  <!-- - `__lookupSetter__(name)` - (Mozilla extension, not ECMAScript 5) Returns the function associated with the specified property by the **defineSetter** method. -->
- `__lookupSetter__(name)` -(Extensão do Mozilla, não ECMAScript 5) Retorna a função associada à propriedade especificada pelo método **defineSetter**.
  <!-- - `isPrototypeOf(obj)` - (EcmaScript 3 and 5) Returns true if `this` is a prototype of the passed in object. -->
- `isPrototypeOf(obj)` - (EcmaScript 3 e 5) Retorna verdadeiro se `this` for um protótipo do objeto passado.

<!-- ## Function.prototype -->

## Protótipo de função

<!-- - `bind(thisArg[, arg1[, argN]])` - Sets the value of 'this' inside the function to always be the value of thisArg when the function is called. Optionally, function arguments can be specified (arg1, arg2, etc) that will automatically be prepended to the argument list whenever this function is called. -->

- `bind(thisArg[, arg1[, argN]])` - Define o valor de 'this' dentro da função para sempre ser o valor de thisArg quando a função é chamada. Opcionalmente, argumentos de função podem ser especificados (arg1, arg2, etc) que serão automaticamente anexados à lista de argumentos sempre que esta função for chamada.

<!-- ## JSON -->

## JSON

<!-- - `JSON.stringify(obj [, replacer [, space]])` - Takes any serializable object and returns the JSON representation as a string [More info](https://developer.mozilla.org/En/Using_JSON_in_Firefox) -->

- `JSON.stringify(obj [, replacer [, space]])` - Obtém qualquer objeto serializável e retorna a representação JSON como uma string [Mais informações](https://developer.mozilla.org/En/Using_JSON_in_Firefox)
  <!-- - `JSON.parse(string)` - Takes a well formed JSON string and returns the corresponding JavaScript object. -->
- `JSON.parse(string)` - Recebe uma string JSON bem formada e retorna o objeto JavaScript correspondente.

<!-- ## String.prototype -->

## Protótipo de String

<!-- - `trim()` - Trims whitespace from both ends of the string -->

- `trim()` - Remove os espaços em branco de ambas as extremidades da String
  <!-- - `trimRight()` - Trims whitespace from the right side of the string -->
- `trimRight()` - Remove os espaços em branco do lado direito da String
  <!-- - `trimLeft()` - Trims whitespace from the left side of the string -->
- `trimLeft()` - Remove os espaços em branco do lado esquerdo da String

<!-- ## Property Descriptor Defaults -->

## Padrões do Descritor de Propriedade

- `value` - undefined
- `get` - undefined
- `set` - undefined
- `writable` - false
- `enumerable` - false
- `configurable` - false

<!-- # Missing features -->

# Recursos ausentes

<!-- - `Object.__noSuchMethod__` (Mozilla extension, not ECMAScript 5) -->

- `Object.__noSuchMethod__` (Extensão do Mozilla, não ECMAScript 5)
  <!-- - `"use strict";` syntax extension ([v8 issue](http://code.google.com/p/v8/issues/detail?id=919)) -->
- `"use strict";` extensão de sintaxe ([edição v8](http://code.google.com/p/v8/issues/detail?id=919))
