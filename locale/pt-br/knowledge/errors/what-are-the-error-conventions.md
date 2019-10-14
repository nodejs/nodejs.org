---
title: Quais são as convenções de erro?
date: '2011-08-26T10:08:50.000Z'
tags:
  - errors
  - conventions
difficulty: 1
layout: knowledge-post.hbs
---

<!-- In Node.js, it is considered standard practice to handle errors in asynchronous functions by returning them as the first argument to the current function's callback. If there is an error, the first parameter is passed an `Error` object with all the details. Otherwise, the first parameter is null. -->
No Node.js, considera-se uma prática padrão lidar com erros em funções assíncronas retornando-os como o primeiro argumento para o retorno de chamada da função atual. Se houver um erro, o primeiro parâmetro recebe um objeto `Error` com todos os detalhes. Caso contrário, o primeiro parâmetro é null.

<!-- It's simpler than it sounds; let's demonstrate. -->
É mais simples do que parece; vamos demonstrar.

```javascript
var isTrue = function(value, callback) {
  if (value === true) {
    callback(null, "O valor era verdadeiro.");
  }
  else {
    callback(new Error("O valor não era verdadeiro!"));
  }
}

var callback = function (error, retval) {
  if (error) {
    console.log(error);
    return;
  }
  console.log(retval);
}

// Note: quando chamamos a mesma função assíncrona duas vezes, você está em uma condição de corrida.
// Você não tem como saber com certeza qual retorno de chamada será chamado primeiro ao chamar as funções dessa maneira.

isTrue(false, callback);
isTrue(true, callback);
```

```
{ stack: [Getter/Setter],
  arguments: undefined,
  type: undefined,
  message: 'O valor não era verdadeiro!' }
O valor era verdadeiro.
```

<!-- As you can see from the example, the callback is called with null as its first argument if there is no error. However, if there is an error, you create an `Error` object, which then becomes the callback's only parameter. -->
Como você pode ver no exemplo, o callback é chamado recebendo null como o primeiro argumento se não houver erros. Todavia, se houver um erro, é criado um objeto `Error`, que então se torna o único parâmetro de retorno da chamada.

<!-- The `callback` function shows the reason for this: it allows a user to easily know whether or not an error occurred. If `null` was not the first argument passed on success, the user would need to check the object being returned and determine themselves whether or not the object constituted an error - a much more complex and less user-friendly approach. -->
A função de `callback` mostra o motivo: permite que um usuário saiba facilmente se ocorreu ou não um erro. Se `null` não for o primeiro argumento de successo passado, o usuário precisaria verificar o objeto que está sendo retornado e determinar se o objeto constituía ou não um erro - uma abordagem muito mais complexa e menos amigável ao usuário.

<!-- So to wrap it all up, when using callbacks, if an error comes up, then pass it as the first argument. Otherwise, pass `null` first, and then your return arguments. On the receiving end, inside the callback function, check if the first parameter is non-null; if it is, handle it as an error. -->
Então, para finalizar tudo, quando usar callbacks, se um erro aparecer, passe-o como primeiro argumento. Caso contrário, passe `null` primeiro e depois seus argumentos de retorno. Na extremidade receptora, dentro da função de retorno de chamada, verifique se o primeiro parâmetro não é nulo; se for, manipule como um erro.
