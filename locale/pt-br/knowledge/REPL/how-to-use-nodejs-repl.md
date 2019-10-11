---
title: "Como eu posso o usar o REPL do node?"
date: '2011-08-26T10:08:50.000Z'
tags:
  - cli
  - repl
difficulty: 1
layout: knowledge-post.hbs
---

# Aprenda a usar o REPL

O Node.js vem com seu próprio REPL, que é uma abreviação para 'Read-Eval-Print Loop'. É o shell interativo do Node.js. Qualquer JavaScript válido que pode ser escrito em um script, pode ser passado para o REPL. Pode ser extremamente útil para experimentos com o Node.js, depurar código e entender alguns comportamentos excêntricos do JavaScript.

Node.js tem um REPL independente, acessível a partir da linha de comando, e um módulo REPL integrado que você pode usar para
[criar seu próprio REPL customizado](https://nodejs.org/api/repl.html#repl_repl). Nós vamos aprender o básico do REPL indepente.

## Como começar com REPL

Iniciar o REPL é simples, basta executar o node na linha de comando sem um nome de arquivo.

```shell
node
```

Ele te deixa em um prompt simples ('>') onde você pode escrever qualquer comando JavaScript que desejar. Assim como na maioria dos shells, você pode apertar as setas para cima e para baixo para navegar através do histórico de comandos e modificar comandos anteriores.

```shell
$ node
> var x = "Olá, Mundo!"
undefined
> x
"Olá, Mundo!"
> .exit
```

Você pode também usar a tecla `Tab` para autocompletar alguns comandos. Quando várias opçõeS de preenchimento estiverem disponíveis, use `Tab` novamente para percorrê-las.

## Comandos especiais e sair do REPL

Os seguintes comandos especiais são surpotados por todas as instâncias do REPL (do [Documentação Node.js REPL](https://nodejs.org/api/repl.html#repl_commands_and_special_keys))

* `.exit` - Fecha o fluxo de E/S, fazendo com que o REPL saia.
* `.break` - Quando no processo de entrada de multilinha de expressão, entra o comando `.break` (ou a combinação das teclas `ctrl+C` é pressionada), as próximos entradas ou o processo daquela expressão serão abortados.
* `.clear` - Reseta o `contexto` do REPL para um objeto vazio e limpa qualquer multilinha de expressão que tenha sido inserida atualmente.
* `.help` - Mostra a lista de comandos especiais.
* `.save` - Salva a sessão atual do REPL em um arquivo.
  `> .save ./documentos/salvo.js`
* `.load` - Carrega um arquivo dentro da sessão atual do REPL.
  `> .load ./documentos/carregar.js`
* `.editor` - Entra no modo editor (`ctrl+D` para terminar, `ctrl+C` para cancelar).

```shell
> .editor
# Entering editor mode (^D to finish, ^C to cancel)
function saudacao(nome) {
  return `Olá, ${nome}!`;
}

saudacao('usuário do Node.js');

# ctrl+D
'Olá, usuário do Node.js!'
>
```

As seguintes combiações de teclas no REP têm esses efeitos especiais:

* `ctr+C` - Quando pressionado uma vez, tem o mesmo efeito que o comando `.break`.
  Quando pressionando duas vezes em um linha vazia, tem o mesmo efeito que o comando `.exit`.
* `ctrl+D` - Tem o mesmo efeito que o comando `.exit`.
* `tab` - Quando pressionado numa linha vazia, mostra as variáveis globais e locais (escopo).
  Quando pressionado durando a entrada de um comando, mostra as opções relevantes que preenchem o comando.

## Retornar valores

Qualquer que seja o comando, ele imprimirá o valor de retorno deste comando. Se você quiser reutilizar o valor de retorno anterior, você pode usar a variável especial `_`.

Por exemplo:

```shell
$ node
> 1+1
2
> _+1
3
```

Algo importante de notar é onde os valores de retorno do REPL são aplicados:

```shell
> x = 10
10
> var y = 5
> x
10
> y
5
```

Quando a palavra-chave `var` é utilizada, o valor da expressão é armazenado. Porém, *NÃO* retornado. Quando um simples identificador é utilizado, o valor é retornado também, assim como armazenado.

## Acessando Módulos

Se você precisar acessar quaisquer módulos nativos, ou módulos terceiros, eles podem ser acessados através do `require`, assim como em qualquer parte do Node.

Por exemplo:

```shell
$ node
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
```

Note novamente que sem a palavra-chave `var`, o conteúdo do objeto é retornado imediatamente e apresentado no `stdout`.
