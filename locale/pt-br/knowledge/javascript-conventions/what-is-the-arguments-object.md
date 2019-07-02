Os objetos `arguments` são uma estrutura especial disponível dentro de todas as chamadas de função. É representada como uma lista de argumentos que são passadas quando a função é chamada. Desde que JavaScript permite chamar funções com indeterminado número de argumentos, nós precisamos de um método para descobrir e acessar esses argumentos.

Os objetos `arguments` são um tipo de objeto array. Seu tamanho corresponde a quantidade de argumentos passados para a função e que é possível acessar seu valor através de indexação do Array. Exemplo `arguments[0]` //Captura ao primeiro argumento. Existe apenas mais uma propriedade de `arguments` chamado `callee`, que o ES5 impede o uso do `strict mode` mais informações podem ser encontradas [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments/callee). Veja mais exemplos sobre as propriedades `arguments`.

```js
const minhaFunc = function(primeiro) {
  arguments[0] === primeiro;
  arguments[1] === 2;
  arguments.length === 3;
}

minhaFunc(1, 2, 3);
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
```
NOTA: Para ES5 ou anteriores, o loop `for` serve para coletar os dados dos `arguments`

Em alguns casos você ainda pode tratar o `arguments` como um Array. Você pode usar o `arguments` através de funções dinâmicas. Os métodos nativos do Array (Ex. Array.prototype.concat) serão aceitos para tratar os `arguments` dinamicamente. Essa técnica também oferece outros modos de conversão dos `arguments` para um tipo Array utilizando do método `Array.slice`.

```js
const minhaFunc = function(primeiro) {...}
minhaFunc.apply(obj, arguments).

// Concatena o Array com os `arguments`
Array.prototype.concat.apply([1,2,3], arguments);

// altera os `arguments` para um tipo Array
const args = Array.prototype.slice.call(arguments);

// remova o primeiro item de `arguments`
args = Array.prototype.slice.call(arguments, 1);
```

O `arrow functions` foram adicionados no ECMAScript 2015 (ES6), propondo uma sintaxe mais compacta do que em sua versão anterior. Com isso, houve um modo alternativo para tratar os `arguments` o convertendo para `arguments objects` (além das palavras chaves `this`, `super`, e `new.target`). A solução para esse caso de uso é utilizar `rest parameter`. O `rest parameter` permite que representar um indeterminado numero de argumentos como um tipo Array. Leia mais detalhes [aqui](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).

```js
const minhaFunc = (...args) => {
  console.log('first parameter is ', args[0]);
}

minhaFunc(1, 2, 3);
```
