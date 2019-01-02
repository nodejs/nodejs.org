---
title: "Como eu posso o usar o REPL do node?"
date: '2011-08-26T10:08:50.000Z'
tags:
  - cli
  - repl
difficulty: 1
layout: knowledge-post.hbs
---


O Node.js vem com seu próprio REPL, que é uma abreviação para 'Read-Eval-Print Loop'. É o shell do Node.js. Qualquer JavaScript válido que pode ser escrito em um script, pode ser passado para o REPL. Pode ser extremamente útil para experimentos com o node.js, depurar código e entender alguns comportamentos excêntricos do JavaScript.

Para executar é simples - execute o node sem um nome de arquivo.

     docs@nodejitsu:~/$ node

Ele então te deixa em um prompt simples ('>') onde você pode escrever qualquer comando JavaScript que desejar. Assim como na maioria dos shells, você pode apertar as setas para cima e para baixo para navegar através do histórico de comandos e modificar comandos anteriores. O REPL também utiliza a tecla <kbd>Tab</kbd> para completar o comando.

Qualquer que seja o comando, ele imprimirá o valor de retorno deste comando. Se você quiser reutilizar um valor de retorno anterior, você pode usar a variável especial `_`.

Por exemplo:

     node
     > 1+1
     2
     > _+1
     3

Algo importante de notar é onde os valores de retorno do REPL são aplicados:

     > x = 10
     10
     > var y = 5
     > x
     10
     > y
     5

Quando a palavra-chave `var` é utilizada, o valor da expressão é armazenado. Porém, *NÃO* retornado. Quando um simples identificador é utilizado, o valor é retornado também, assim como armazenado.

Se você precisar acessar quaisquer módulos nativos, ou módulos terceiros, eles podem ser acessados através do `require`, assim como em qualquer parte do Node.

Por exemplo:

     node
     > path = require('path')
     { resolve: [Function],
       normalize: [Function],
       join: [Function],
       dirname: [Function],
       basename: [Function],
       extname: [Function],
       exists: [Function],
       existsSync: [Function] }
     > path.basename("/a/b/c.txt")
     'c.txt'

Note novamente que sem a palavra-chave `var`, o conteúdo do objeto é retornado imediatamente e apresentado no `stdout`.
