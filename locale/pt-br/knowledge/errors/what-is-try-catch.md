---
title: O que é try-catch?
date: '2011-08-26T10:08:50.000Z'
tags:
  - errors
  - builtin
difficulty: 1
layout: knowledge-post.hbs
---

Exemplo:

```javascript
console.log("entrando na instrução try-catch");

try {
  console.log("entrando no bloco try");
  throw "lançar mensagem";
  console.log("esta mensagem nunca será vista");
}
catch (e) {
  console.log("entrando no bloco catch");
  console.log(e);
  console.log("saindo do bloco catch");
}
finally {
  console.log("entrando e saindo do bloco finally");
}

console.log("saindo da instrução try-catch");
```

Results:

```
entrando na instrução try-catch
entrando no bloco try
entrando no bloco catch
lançar mensagem
saindo do bloco catch
entrando e saindo do bloco finally
saindo da instrução try-catch
```

<!-- JavaScript's `try-catch-finally` statement works very similarly to the `try-catch-finally` encountered in C++ and Java. First, the try block is executed until and unless the code in it throws an exception (whether it is an explicit `throw` statement, the code has an uncaught native exception, or if the code calls a function that uses `throw`). -->
A instrução de `try-catch-finally` em JavaScript funciona de forma muito semelhante ao `try-catch-finally` encontrado em C++ e Java. Primeiro, o bloco try é executado até e a menos que o código nele dispare uma exceção (se houver uma instrução explícita `throw`, o código possui uma exceção nativa não identificado, ou se o código chamar uma função que usa `throw`).

<!-- If the code doesn't throw an exception, then the whole try block is executed. If the code threw an exception inside the try block, then the catch block is executed. Last of all, the finally block is always executed, subsequent to the other blocks but prior to any subsequent code located outside of the `try-catch-finally` blocks. The `finally` block will just about always execute, no matter what kind of throwing, catching, or returning one might be trying to do inside the `try` or `catch` blocks. -->
Se o código não lançar uma exceção, todo o bloco try será executado. Se o código lançou uma exceção dentro do bloco try, então o bloco catch é executado. Por último, o bloco finally é sempre executado, subsequentemente aos outros blocos, mas antes de qualquer código subsequente localizado fora dos blocos `try-catch-finally`. O bloco `finally` será quase sempre executado, não importa o tipo de lançamento, captura ou retorno que estejamos tentando fazer dentro dos blocos `try` ou `catch`.

<!-- Note that you can omit the `catch` or `finally` block, but one of them must be present. -->
Note que você pode omitir o bloco `catch` ou `finally`, mas um deles deve existir.

<!-- ## But wait, isn't it Node.js convention to not use try-catch? -->
## Mas espere, não é convenção do Node.js não usar try-catch?

<!-- In the core Node.js libraries, the only place that one really *needs* to use a try-catch is around `JSON.parse()`. All of the other methods use either the standard Error object through the first parameter of the callback or emit an `error` event. Because of this, it is generally considered [standard](/en/knowledge/errors/what-are-the-error-conventions/) to return errors through the callback rather than to use the `throw` statement. -->
No core da biblioteca Node.js, o único lugar que realmente *precisamos* usar um bloco try-catch é ao redor do método `JSON.parse()`. Todos os outros métodos usam o objeto Error padrão através do primeiro parâmetro do callback ou emitem um evento de `error`. Por causa disso, geralmente é considerado [padrão](/pt-br/knowledge/errors/what-are-the-error-conventions/) retornar erros por meio de callback, em vez de usar a instrução `throw`.
