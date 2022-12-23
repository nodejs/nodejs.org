---
title: Como usar o módulo path?
date: '2011-08-26T10:08:50.000Z'
tags:
  - core
  - filesystem
difficulty: 1
layout: knowledge-post.hbs
---

O módulo path contém muitas funções auxiliares para ajudar a tornar a manipulação de caminhos mais fácil.

A primeira função que vale a pena mencionar é `path.normalize`. Esta função pega um caminho (na forma de uma string) e remove barras duplicadas e normaliza abreviações de diretórios, como '.' para 'este diretório' e '..' para 'um diretório acima'. Por exemplo:

```
> var path = require('path');
> path.normalize('/a/.///b/d/../c/')
'/a/b/c/'
```

Uma função intimamente relacionada a `normalize` é `join`. Esta função recebe um número variável de argumentos, junta-os, e normaliza o caminho.

```
> var path = require('path');
> path.join('/a/.', './//b/', 'd/../c/')
'/a/b/c'
```

Um uso possível do `join` é para manipular caminhos quando servem urls:

```
> var path = require('path');
> var url = '/index.html';
> path.join(process.cwd(), 'static', url);
'/home/nico/static/index.html'
```

Há três funções que são usadas para extrair as várias partes do nome de um caminho: `basename`, `extname`, e `dirname`.

* `basename` retorna o último pedaço do caminho recebido.
* `extname` retorna a extensão do último pedaço. Geralmente para diretórios, `extname` retorna apenas ''.
* Finalmente, `dirname` retorna tudo que `basename` não retorna.
Por exemplo:

```
> var path = require('path')
> var a = '/a/b/c.html'
> path.basename(a)
'c.html'
> path.extname(a)
'.html'
> path.dirname(a)
'/a/b'
```

Note que `basename` tem um segundo parâmetro opcional que extrairá a extensão se você passa a extensão correta.

```
> var path = require('path')
> var a = '/a/b/c.html'
> path.basename(a, path.extname(a))
'c'
```

Por último, o módulo `path` fornece métodos para checar se um determinado caminho existe ou não: `exists` e `existsSync` Os dois recebem o caminho de um arquivo como primeiro parâmetro.

`exists` recebe uma callback como seu segundo parâmetro, a qual é retornado um booleano representando a existência do arquivo.

`existsSync`, por outro lado, checa o caminho recebido de forma síncrona. No Node.js, você normalmente irá querer usar as funções assíncronas para entrada/saída no sistema de arquivos - as versões síncronas bloquearão todo o seu processo até que esteja finalizado.

Bloqueio nem sempre é uma coisa ruim. Checar a existência de um arquivo de configuração essencial de forma síncrona faz sentido, por exemplo - não interessa muito se seu processo está bloqueado por algo que ele não pode viver sem! Por outro lado, entretanto, em um servidor HTTP muito ativo, qualquer entrada/saída de arquivos por requisição **DEVE** ser assíncrona, senão você responderá as requisições uma por uma. Veja o artigo em [operações assíncronas](/en/knowledge/getting-started/control-flow/how-to-write-asynchronous-code/) para mais detalhes.

```
> var path = require('path')
> path.exists('/etc', function(exists){console.log("Does the file exist?", exists)})
> Does the file exist? true

> path.existsSync('/etc')
true
```
