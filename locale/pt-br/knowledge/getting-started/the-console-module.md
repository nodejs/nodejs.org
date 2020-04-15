---
title: O módulo embutido console
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - cli
  - globals
difficulty: 1
layout: knowledge-post.hbs
---

Qualquer pessoa familiarizada com o desenvolvimento voltado para navegadores provavelmente já usou `console.log` para fins de debug - O Node.js implementou um objeto `console` próprio para imitar grande parte desta experiência. Porém, como nós estamos trabalhado do lado do servidor, ela funciona como uma camada acima do `stdout`, `stdin` e `stderr` em vez do console de debug do navegador.

Por conta deste paralelo com o navegador, o módulo `console` se tornou a principal API para grande parte da funcionalidade de "output" do Node. O mais simples é o `console.log()`.

```javascript
console.log('Olá, pessoal!');
console.log('Este script é:', __filename);
console.log(__filename, process.title, process.argv);
```

O primeiro exemplo mais simples, apenas exibe a string fornecida no `stdout`. Também há a possibilidade de exibir o conteúdo das variáveis, como demonstrado no exemplo #2; e além disso, `console.dir()` é chamado em todos os objetos que são passados como argumentos, enumerando suas propriedades.

DICA VALIOSA NODE.JS:
`console.log()` aceita três caracteres para formatação, `%s`, `%d`, and `%j`. Estes caracteres de formatação podem ser usados para exibir strings, dígitos, ou dados formatos como JSON - A ordem dos caracteres precisa corresponder com a ordem dos argumentos.

```javascript
const name = 'Harry';
const number = 17;
const myObj = {
  propOne: 'alguma coisa',
  propTwo: 'outras coisas'
};
console.log('Meu nome é %s, meu número é %d, e o objeto é %j', name, number, myObj);
```

Uma pegadinha com a função `console.log`, e todas as funções que dependem dela, é que ela possui um "buffer" para a sua saída. Portanto se o processo é interrompido abruptamente, seja por meio de algum erro ou através do `process.exit()`, é bem possível que o conteúdo no buffer nunca seja definitivamente enviado para a tela. Isso pode causar certa frustração, portanto fique atento para esta situação.

`console.error()` funciona do mesmo modo que `console.log`, exceto pelo fato que o conteúdo enviado para `stderr` em vez de `stdout`. Isso é, na realidade, uma diferença extremamente importante, pois o conteúdo enviado para `stderr` é sempre escrito de forma síncrona. Qualquer uso de `console.error`, ou qualquer outra função no core do Node.js que escreva para `stderr`, irá bloquear o processo até que todo o conteúdo seja escrito. Isso é útil para mensagens de erro - você as recebe no momento que elas acontecem - porém se usado de forma indiscriminada, pode tornar o processo do Node.js bastante lento.

`console.dir()`, como mencionado acima, é um "alias" para `util.inspect()` - é uma função usada para enumerar as propriedades de um objeto. [Leia mais](/pt-br/knowledge/getting-started/how-to-use-util-inspect/)

Isso cobre o básico da funcionalidade do módulo `console`, porém há certos metódos que merecem ser mencionados também. Primeiro, o módulo `console` permite marcar o tempo através das funções `console.time()` e `console.timeEnd()`. Aqui um exemplo:

```javascript
console.time('timer');
var string = '';
for (var i = 0; i < 300; i++) {
  (function (i) {
    string += 'aaaa' + i.toString();
  })(i);
}
console.timeEnd('timer');
```

Isto irá determinar a quantidade de tempo necessária para executar as ações entre as chamadas de `console.time` e `console.timeEnd`.

Uma última função que merece ser mencionada é `console.trace()`, que exibe o conteúdo da pilha (stack trace) do momento que é chamado, sem ocasionar um erro. Isso ocasionalmente pode vir a ser útil caso você queira descobrir de onde determinada função com erro foi chamada.
