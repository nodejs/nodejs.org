---
title: Visão geral sobre operações bloqueantes e não bloqueantes
layout: docs.hbs
---

<!-- # Overview of Blocking vs Non-Blocking -->
# Visão geral sobre operações bloqueantes e não-bloqueantes

<!-- This overview covers the **difference** between **blocking** and **non-blocking**
calls in Node.js. This overview will refer to the event loop and libuv but no
prior knowledge of those topics is required. Readers are assumed to have a
basic understanding of the JavaScript language and Node.js [callback pattern](/en/knowledge/getting-started/control-flow/what-are-callbacks/).

> "I/O" refers primarily to interaction with the system's disk and
> network supported by [libuv](http://libuv.org/). -->
Esta visão geral cobre as **diferenças** entre chamadas **bloqueantes** e **não-bloqueantes** no Node.js.
Vamos nos referir ao event loop e à libuv, mas não é necessário nenhum conhecimento prévio sobre
estes tópicos. É esperado que o leitor tenha um conhecimento básico de [padrões de callback](/en/knowledge/getting-started/control-flow/what-are-callbacks/) no JavaScript e Node.js.

> "I/O" se refere, principalmente, à interação com o disco do sistema
> e a rede suportada pela [libuv](http://libuv.org).

<!-- ## Blocking -->
## Chamadas bloqueantes

<!-- **Blocking** is when the execution of additional JavaScript in the Node.js
process must wait until a non-JavaScript operation completes. This happens
because the event loop is unable to continue running JavaScript while a
**blocking** operation is occurring. -->
Ser **bloqueante** é quando a execução do código do resto do código JavaScript no processo
do Node.js precisa esperar até que uma operação não-JavaScript seja completada. Isso acontece
porque o event loop é incapaz de continuar executando JavaScript enquanto uma operação
**bloqueante** está sendo executada.

<!-- In Node.js, JavaScript that exhibits poor performance due to being CPU intensive
rather than waiting on a non-JavaScript operation, such as I/O, isn't typically
referred to as **blocking**. Synchronous methods in the Node.js standard library
that use libuv are the most commonly used **blocking** operations. Native
modules may also have **blocking** methods. -->
No Node.js, JavaScript que mostra uma performance ruim devido ao fato de que é um
processo que usa CPU intensivamente ao invés de esperar uma operação não-JavaScript,
como I/O, não é geralmente identificada como uma operação **bloqueante**. Métodos
síncronos na biblioteca padrão do Node.js que usam a libuv são as operações **bloqueantes**
mais utilizadas. Módulos nativos também podem conter métodos **bloqueantes**.

<!-- All of the I/O methods in the Node.js standard library provide asynchronous
versions, which are **non-blocking**, and accept callback functions. Some
methods also have **blocking** counterparts, which have names that end with
`Sync`. -->
Todos os métodos I/O na biblioteca padrão do Node.js tem uma versão assíncrona,
que, por definição, são **não-bloqueantes**, e aceitam funções de callback. Alguns métodos
também tem suas versões **bloqueantes**, que possuem o sufixo `Sync` no nome.

<!-- ## Comparing Code -->
## Comparando códigos

<!-- **Blocking** methods execute **synchronously** and **non-blocking** methods
execute **asynchronously**.

Using the File System module as an example, this is a **synchronous** file read: -->
Métodos **bloqueantes** executam de forma **síncrona** e métodos **não-bloqueantes**
executam de forma **assíncrona**.

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // a execução é bloqueada aqui até o arquivo ser lido
```

<!-- And here is an equivalent **asynchronous** example: -->
E aqui temos um exemplo equivalente usando um método **assíncrono**:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
});
```

<!-- The first example appears simpler than the second but has the disadvantage of
the second line **blocking** the execution of any additional JavaScript until
the entire file is read. Note that in the synchronous version if an error is
thrown it will need to be caught or the process will crash. In the asynchronous
version, it is up to the author to decide whether an error should throw as
shown.

Let's expand our example a little bit: -->
O primeiro exemplo parece mais simples do que o segundo, mas ele possui o contra
de que, na segunda linha, temos um código **bloqueando** a execução de qualquer
JavaScript adicional até que todo o arquivo seja lido. Note que, na versão síncrona,
qualquer erro que houver na aplicação vai precisar ser tratado ou então o processo
vai sofrer um crash. Na versão assíncrona, é da decisão do programador se quer ou
não tratar os erros.

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // trava aqui até o arquivo ser lido
console.log(data);
maisProcessamento(); // roda depois de console.log
```

<!-- And here is a similar, but not equivalent asynchronous example: -->
Um exemplo similar, mas não equivalente, no formato assíncrono:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
maisProcessamento(); // vai rodar antes do console.log
```

<!-- In the first example above, `console.log` will be called before `moreWork()`. In
the second example `fs.readFile()` is **non-blocking** so JavaScript execution
can continue and `moreWork()` will be called first. The ability to run
`moreWork()` without waiting for the file read to complete is a key design
choice that allows for higher throughput. -->
No primeiro exemplo acima, `console.log` vai ser chamado antes de `maisProcessamento()`.
No segundo exemplo, `fs.readFile()` é uma operação **não-bloqueante**, então a execução
de código JavaScript vai continuar e o método `maisProcessamento()` vai ser chamado
primeiro. A habilidade de executar `maisProcessamento()` sem ter de esperar o arquivo
ser completamente lido é um conceito chave de design que permite uma melhor escalabilidade
através de mais rendimento.

## Concorrência e Rendimento

<!-- JavaScript execution in Node.js is single threaded, so concurrency refers to the
event loop's capacity to execute JavaScript callback functions after completing
other work. Any code that is expected to run in a concurrent manner must allow
the event loop to continue running as non-JavaScript operations, like I/O, are
occurring. -->
A execução do JavaScript no Node.js é single threaded. Então a concorrência é
referente somente à capacidade do event loop de executar funções de callback
depois de completar qualquer outro processamento. Qualquer código que pode
rodar de maneira concorrente deve permitir que o event loop continue executando
enquanto uma operação não-JavaScript, como I/O, está sendo executada.

<!-- As an example, let's consider a case where each request to a web server takes
50ms to complete and 45ms of that 50ms is database I/O that can be done
asynchronously. Choosing **non-blocking** asynchronous operations frees up that
45ms per request to handle other requests. This is a significant difference in
capacity just by choosing to use **non-blocking** methods instead of
**blocking** methods. -->
Como um exemplo, vamos considerar o caso onde cada requisição de um servidor web
leva 50ms para ser completada e 45ms desses 50ms é I/O de banco de dados que pode
ser realizado de forma assíncrona. Escolhendo uma abordagen **não-bloqueante**
vamos liberar esses 45ms por request para que seja possível lidar com outras
requests. Isso é uma diferença bastante significante em capacidade só porque
decidimos utilizar um método **não-bloqueante** ao invés de sua variante
**bloqueante**.

<!-- The event loop is different than models in many other languages where additional
threads may be created to handle concurrent work. -->
O event loop é diferente de outros modelos em muitas outras linguagens onde threads
adicionais podem ser criadas para lidar com processamento concorrente.

## Perigos de misturar códigos bloqueantes e não-bloqueantes

<!-- There are some patterns that should be avoided when dealing with I/O. Let's look
at an example: -->
Existem alguns padrões que devem ser evitados quando lidamos com I/O. Vamos ver um
exemplo:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.unlinkSync('/file.md');
```

<!-- In the above example, `fs.unlinkSync()` is likely to be run before
`fs.readFile()`, which would delete `file.md` before it is actually read. A
better way to write this, which is completely **non-blocking** and guaranteed to
execute in the correct order is: -->
No exemplo acima, `fs.unlinkSync()` provavelmente vai rodar antes de `fs.readFile()`,
o que deletaria o arquivo `file.md` antes de que ele possa ser, de fato, lido. Uma forma
melhor de escrever esse código, de forma completamente **não-bloqueante** e garantida de
executar na ordem correta seria:

```js
const fs = require('fs');
fs.readFile('/file.md', (readFileErr, data) => {
  if (readFileErr) throw readFileErr;
  console.log(data);
  fs.unlink('/file.md', (unlinkErr) => {
    if (unlinkErr) throw unlinkErr;
  });
});
```

<!-- The above places a **non-blocking** call to `fs.unlink()` within the callback of
`fs.readFile()` which guarantees the correct order of operations. -->
O exemplo acima coloca uma chamada **não-bloqueante** a `fs.unlink()` dentro do callback
de `fs.readFile()`, o que garante a ordem correta das operações.

## Additional Resources

* [libuv](http://libuv.org/)
* [About Node.js](/en/about/)
