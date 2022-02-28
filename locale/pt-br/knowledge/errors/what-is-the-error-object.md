---
title: O que é o objeto de erro?
date: '2011-08-26T10:08:50.000Z'
tags:
  - errors
  - builtin
difficulty: 1
layout: knowledge-post.hbs
---

<!-- The error object is a built-in object that provides a standard set of useful information when an error occurs, such as a stack trace and the error message. For example: -->
O objeto Error é um objeto interno que fornece um conjunto padrão de informações úteis quando ocorre um erro, como um rastreamento de pilha e a mensagem de erro. Por exemplo:

Código:

```javascript
var error = new Error("A mensagem de erro");
console.log(error);
console.log(error.stack);
```

Resultado:

```
{ stack: [Getter/Setter],
  arguments: undefined,
  type: undefined,
  message: 'A mensagem de erro' }
Error: A mensagem de erro
    at Object.<anonymous> (/home/nico/example.js:1:75)
    at Module._compile (module.js:407:26)
    at Object..js (module.js:413:10)
    at Module.load (module.js:339:31)
    at Function._load (module.js:298:12)
    at Array.0 (module.js:426:10)
    at EventEmitter._tickCallback (node.js:126:26)
```

<!-- `error.stack` shows you where an error came from, as well as a list of the function calls that preceded it - for your convenience, `error.stack` always prints `error.message` as the first line of its output, making `error.stack` a convenient single property to log during debugging. -->
`error.stack` exibe de onde o erro veio, assim como a lista das chamadas de funções que o procederam - por convenção, `error.stack` sempre imprime `error.message` como a primeira linha de saída, tornando o `error.stack` uma conveniente propriedade para imprimir durante a depuração.

<!-- If you want to add more information to the Error object, you can always add properities, just as with any other JavaScript object: -->
Se você quiser/precisar adicionar mais informações ao objeto Error, você pode sempre adicionar propriedades, assim como em qualquer outro objeto em JavaScript:

```javascript
var error = new Error("A mensagem de erro");
error.http_code = 404;
console.log(error);
```

<!-- For more details how to use the Error object, check out the [article on error conventions](/en/knowledge/errors/what-are-the-error-conventions/) -->
Para mais detalhes sobre como usar o objeto Error, confira o [artigo sobre convenções de erro](/pt-br/knowledge/errors/what-are-the-error-conventions/)
