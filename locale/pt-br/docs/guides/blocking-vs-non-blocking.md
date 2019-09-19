---
title: Visão geral sobre operações bloqueantes e não bloqueantes
layout: docs.hbs
---

# Visão geral sobre operações bloqueantes e não-bloqueantes

Esta visão geral cobre as **diferenças** entre chamadas **bloqueantes** e **não-bloqueantes** no Node.js.
Vamos nos referir ao event loop e à libuv, mas não é necessário nenhum conhecimento prévio sobre
estes tópicos. É esperado que o leitor tenha um conhecimento básico de [padrões de callback](/en/knowledge/getting-started/control-flow/what-are-callbacks/) no Javascript e Node.js.

> "I/O" se refere, principalmente, à interação com o disco do sistema
> e a rede suportada pela [libuv](http://libuv.org).

## Chamadas bloqueantes

Ser **bloqueante** é quando a execução do código do resto do código Javascript no processo
do Node.js precisa esperar até que uma operação não-Javascript seja completada. Isso acontece
porque o event loop é incapaz de continuar executando Javascript enquanto uma operação
**bloqueante** está sendo executada.

No Node.js, Javascript que mostra uma performance ruim devido ao fato de que é um
processo que usa CPU intensivamente ao invés de esperar uma operação não-Javascript,
como I/O, não é geralmente identificada como uma operação **bloqueante**. Métodos
síncronos na biblioteca padrão do Node.js que usam a libuv são as operações **bloqueantes**
mais utilizadas. Módulos nativos também podem conter métodos **bloqueantes**.

Todos os métodos I/O na biblioteca padrão do Node.js tem uma versão assíncrona,
que, por definição, são **não-bloqueantes**, e aceitam funções de callback. Alguns métodos
também tem suas versões **bloqueantes**, que possuem o sufixo `Sync` no nome.

## Comparando códigos

Métodos **bloqueantes** executam de forma **síncrona** e métodos **não-bloqueantes**
executam de forma **assíncrona**.

```js
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // a execução é bloqueada aqui até o arquivo ser lido
```

E aqui temos um exemplo equivalente usando um método **assíncrono**:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
});
```

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

Um exemplo similar, mas não equivalente, no formato assíncrono:

```js
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});
maisProcessamento(); // vai rodar antes do console.log
```

No primeiro exemplo acima, `console.log` vai ser chamado antes de `maisProcessamento()`.
No segundo exemplo, `fs.readFile()` é uma operação **não-bloqueante**, então a execução
de código JavaScript vai continuar e o método `maisProcessamento()` vai ser chamado
primeiro. A habilidade de executar `maisProcessamento()` sem ter de esperar o arquivo
ser completamente lido é um conceito chave de design que permite uma melhor escalabilidade
através de mais rendimento.

## Concorrência e Rendimento

A execução do JavaScript no Node.js é single threaded. Então a concorrência é
referente somente à capacidade do event loop de executar funções de callback
depois de completar qualquer outro processamento. Qualquer código que pode
rodar de maneira concorrente deve permitir que o event loop continue executando
enquanto uma operação não-JavaScript, como I/O, está sendo executada.

Como um exemplo, vamos considerar o caso onde cada requisição de um servidor web
leva 50ms para ser completada e 45ms desses 50ms é I/O de banco de dados que pode
ser realizado de forma assíncrona. Escolhendo uma abordagen **não-bloqueante**
vamos liberar esses 45ms por request para que seja possível lidar com outras
requests. Isso é uma diferença bastante significante em capacidade só porque
decidimos utilizar um método **não-bloqueante** ao invés de sua variante
**bloqueante**.

O event loop é diferente de outros modelos em muitas outras linguagens onde threads
adicionais podem ser criadas para lidar com processamento concorrente.

## Perigos de misturar códigos bloqueantes e não-bloqueantes

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

O exemplo acima coloca uma chamada **não-bloqueante** a `fs.unlink()` dentro do callback
de `fs.readFile()`, o que garante a ordem correta das operações.

## Additional Resources

- [libuv](http://libuv.org/)
- [About Node.js](/en/about/)
