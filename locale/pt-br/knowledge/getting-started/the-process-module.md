---
title: Como usar o módulo global process
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - globals
difficulty: 2
layout: knowledge-post.hbs
---

Cada processo do Node.js tem uma série de funcionalidades embutidas, acessíveis através do módulo global `process`. O módulo `process` não precisa ser importado - ele é, de certo modo, literalmente um wrapper em volta do processo sendo executado, e muitos dos métodos que ele possui, nada mais são do que wrappers em torno de chamadas de algumas das bibliotecas em C do núcleo do Node.

## Eventos

Existem 2 eventos embutidos que podem ser percebidos no módulo `process`, estes são `exit` e `uncaughtException`.

O evento `exit` é acionado sempre que algum processo estiver prestes a ter sua execução encerrada.

```javascript
process.on('exit', function () {
  fs.writeFileSync('/tmp/myfile', 'Isto PRECISA ser salvo antes de sair.');
});
```

Códigos como o acima podem ser realmente úteis para salvar algum tipo de registro final antes de encerrar a execução. Note o uso de uma chamada de um sistema de arquivos síncrono - isso é para garantir que a E/S de dados finalize antes do o processo.

O outro evento embutido se chama `uncaughtException`. Como você já deve imaginar, ele é acionado sempre que algum erro que não foi devidamente tratado em seu programa ocorre. Essa não é a forma ideal de processar erros, mas pode ser bem útil como última linha de defesa se um programa necessita rodar continuamente mesmo após o erro.

```javascript
process.on('uncaughtException', function (err) {
  console.error('Um erro inesperado ocorreu!');
  console.error(err.stack);
});
```

O comportamento padrão do `uncaughtException` é imprimir a descrição do erro e parar a execução - usando o código acima, seu programa vai imprimir a mensagem informada e a descrição do erro, mas **não** vai interromper sua execução.

## Streams

O objeto `process` também disponibiliza alguns wrappings para as três streams `STDIO`, que são `stdin`, `stdout`, e `stderr`. De forma resumida, `stdin` é uma stream de entrada (que lê as informações inseridas pelo usuário), `stdout` é uma stream de saída não bloqueante (em outras palavras, é assíncrona), e `stderr` é uma stream de saída bloqueante (síncrona).

A mais simples de ser descrita é a `process.stdout`. Tecnicamente, a maioria das saídas em Node são acompanhadas de `process.stdout.write()` - a qual a maioria das pessoas nem sequer conhece. O código a seguir é do arquivo `console.js` no núcleo do Node:

```javascript
exports.log = function() {
  process.stdout.write(format.apply(this, arguments) + '\n');
};
```

Já que muitas pessoas têm usado a sintaxe `console.log` proveniente do desenvolvimento para navegadores, isso foi disponibilizado como um wrapper conveniente.

Nós temos também `process.stderr`, que é bem parecido com o `process.stdout` como uma única diferença, é bloqueante. Ao imprimir algo usando `stderr`, seu processo é bloqueado até que a escrita ocorra. Node.js contem várias funções que agem como atalhos para saída, a maioria delas acaba usando `stdout` ou `stderr` atrás dos panos. Aqui temos uma lista simples com referências:

STDOUT, ou funções não bloqueantes: `console.log`, `console.info`, `util.puts`, `util.print`

STDERR, ou funções bloqueantes: `console.warn`, `console.error`, `util.debug`

Por último, `process.stdin` é uma stream de leitura para obter dados de entrada do usuário. Veja em [mais de input em cli](/pt-br/knowledge/command-line/how-to-prompt-for-command-line-input/).

## Outras Propriedades

O objeto `process` adicionalmente possui uma lista de propriedades que permitem você obter informações sobre o projeto executado. Vamos ver alguns exemplos simples com a ajuda da REPL:

```
> process.pid
3290
> process.version
'v0.4.9'
> process.platform
'linux'
> process.title
'node'
```

O `pid` é ID de processo do SO, `platform` é algo mais geral como 'linux' ou 'darwin', e `version` refere-se a sua versão do Node. `process.title` é um pouco diferente - enquanto definido como `node` por padrão, isto pode ser definido para o que você desejar, e será o que aparecerá na sua lista de processos em execução.

O módulo `process` também exibe `process.argv`, um array contendo os argumentos de linha de comando command-line para o processo atual, e `process.argc`, um inteiro representando a quantidade de argumentos que foram passados. Leia mais em [como manusear argumentos na linha de comando](/pt-br/knowledge/command-line/how-to-parse-command-line-arguments/)

`process.execPath` vai retornar o diretório absoluto do executável que começou o processo em questão.

`process.env` contêm suas variáveis de ambiente. Tente `process.env.HOME`, por exemplo.

## Métodos

Existe também uma variedade de métodos vinculados ao objeto `process`, muitos dos quais lidam com aspectos bem avançados de um programa. Vamos dar uma olhada nos que normalmente são os mais usados, enquanto deixamos as partes mais avançadas para outros artigos.

`process.exit` encerra o processo. Se você chamar uma função assíncrona e então chamar `process.exit()` imediatamente após, você está em uma situação imprevisível - a chamada assíncrona pode ou não ser finalizada antes do término do programa. `process.exit` aceita apenas um parâmetro adicional - um número inteiro como código de saída. `0`, por convenção, é uma saída sem erros.

`process.cwd` retorna o 'diretório de trabalho atual' do processo - este é o diretório pelo qual o comando de início do processo será executado.

`process.chdir` é usado para modificar o diretório de trabalho atual. Por exemplo:

```
> process.cwd()
'/home/avian/dev'
> process.chdir('/home/avian')
> process.cwd()
'/home/avian'
```

Finalmente, em uma nota mais avançada, nós temos o `process.nextTick`. Este método aceita um argumento - um callback - e coloca isso no topo da próxima execução do event loop. Algumas pessoas fazem algo parecido com isso:

```javascript
setTimeout(function () {
  // código aqui
}, 0)
```

Todavia essa não é a maneira ideal. Em Node.js, isso deveria ser usado no lugar:

```javascript
process.nextTick(function () {
  console.log('Próxima viagem pelo loop do evento, wheeee!')
});
```

Além de bem mais eficiente, é muito mais preciso.
