---
title: Quais são as convenções de erro?
date: '2011-08-26T10:08:50.000Z'
tags:
  - errors
  - conventions
difficulty: 1
layout: knowledge-post.hbs
---

No node.js, considera-se uma prática padrão lidar com erros em funções assíncronas retornando-os como o primeiro argumento para o retorno de chamada da função atual.  Se houver um erro, o primeiro parâmetro recebe um objeto `Error` com todos os detalhes. Caso contrário, o primeiro parâmetro é null.

É mais simples do que parece; vamos demonstrar.

    var isTrue = function(value, callback) {
      if (value === true) {
        callback(null, "O valor era verdadeiro.");
      }
      else {
        callback(new Error("O valor não era verdadeiro!;
      }
    }

    var callback = function (error, retval) {
      if (error) {
        console.log(error);
        return;
      }
      console.log(retval);
    }

    <!--
          ORIGINAL BEGIN

    // Note: when calling the same asynchronous function twice like this, you are in a race condition.
    // You have no way of knowing for certain which callback will be called first when calling the functions in this manner.

          ORIGINAL END
    -->
    // Note: quando chamamos a mesma função assíncrona duas vezes, você está em uma condição de corrida.
    // Você não tem como saber com certeza qual retorno de chamada será chamado primeiro ao chamar as funções dessa maneira.

    isTrue(false, callback);
    isTrue(true,  callback);

    { stack: [Getter/Setter],
      arguments: undefined,
      type: undefined,
      message: 'O valor não era verdadeiro!' }
    O valor era verdadeiro.

Como você pode ver no exemplo, o callback é chamado recebendo null como o primeiro argumento se não houver erros. Todavia, se houver um erro, é criado um objeto `Error`, que então se torna o único parâmetro de retorno da chamada.

A função de `callback` mostra o motivo: permite que um usuário saiba facilmente se ocorreu ou não um erro.  Se `null` não for o primeiro argumento de successo passado, o usuário precisaria verificar o objeto que está sendo retornado e determinar se o objeto constituía ou não um erro - uma abordagem muito mais complexa e menos amigável ao usuário.

Então, para finalizar tudo, quando usar callbacks, se um erro aparecer, passe-o como primeiro argumento.  Caso contrário, passe `null` primeiro e depois seus argumentos de retorno.  Na extremidade receptora, dentro da função de retorno de chamada, verifique se o primeiro parâmetro não é nulo;  se for, manipule como um erro.
