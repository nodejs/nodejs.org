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

Results:

    entrando na instrução try-catch
    entrando no bloco try
    entrando no bloco catch
    lançar mensagem
    saindo do bloco catch
    entrando e saindo do bloco finally
    saindo da instrução try-catch

A instrução de `try-catch-finally` em JavaScript funciona de forma muito semelhante ao `try-catch-finally` encontrado em C++ e Java.  Primeiro, o bloco try é executado até e a menos que o código nele dispare uma exceção (se houver uma instrução explícita `throw`, o código possui uma exceção nativa não identificado, ou se o código chamar uma função que usa `throw`).

Se o código não lançar uma exceção, todo o bloco try será executado. Se o código lançou uma exceção dentro do bloco try, então o bloco catch é executado.  Por último, o bloco finally é sempre executado, subsequentemente aos outros blocos, mas antes de qualquer código subsequente localizado fora dos blocos `try-catch-finally`.  O bloco `finally` será quase sempre executado, não importa o tipo de lançamento, captura ou retorno que estejamos tentando fazer dentro dos blocos `try` ou `catch`.

Note que você pode omitir o bloco `catch` ou `finally`, mas um deles deve existir.

## Mas espere, não é convenção do Node.js não usar try-catch?

No core da biblioteca node.js, o único lugar que realmente *precisamos* usar um bloco try-catch é ao redor do método `JSON.parse()`. Todos os outros métodos usam o objeto Error padrão através do primeiro parâmetro do callback ou emitem um evento de `error`. Por causa disso, geralmente é considerado [padrão](/what-are-the-error-conventions) retornar erros por meio de callback, em vez de usar a instrução `throw`.
