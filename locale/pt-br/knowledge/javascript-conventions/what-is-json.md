---
date: "2011-08-26T10:08:50.000Z"
tags:
  - json
  - stringify
  - parse
title: O que é JSON?
difficulty: 5
layout: knowledge-post.hbs
---

JavaScript Object Notation ou JSON, é um formato de dados leve que tornou-se
o padrão para a web. JSON pode ser representado como uma lista de
valores, por exemplo, um Array, ou um hash de propriedades e valores, por exemplo, um
Objeto.

```json
// um array JSON
["um", "dois", "tres"]

// um objeto JSON
{ "um": 1, "dois": 2, "tres": 3 }
```

## Codificação e Decodificação

O JavaScript fornece 2 métodos. Um para codificar estrutura de dados para JSON
e o outro para decodificar JSON para objetos e arrays JavaScript.
Ambos estão disponíveis no objeto `JSON` que existe no escopo
global.

`JSON.stringify` recebe um objeto ou um array JavaScript e retorna uma string
serializada no formato JSON.

```js
const dados = {
  nome: "John Doe",
  idade: 32,
  titulo: "Vice Presidente do JavaScript"
};

const jsonStr = JSON.stringify(dados);

console.log(jsonStr);

// imprime '{"nome":"John Doe","idade":32,"titulo":"Vice Presidente do JavaScript"}'
```

`JSON.parse` recebe uma string JSON e decodifica para um dado JavaScript
estruturado.

```js
const jsonStr =
  '{"nome":"John Doe","idade":32,"titulo":"Vice Presidente do JavaScript"}';

const dados = JSON.parse(jsonStr);

console.log(dados.titulo);

// imprime 'Vice Presidente do JavaScript'
```

## O que é um JSON válido?

Existem algumas regras a serem lembradas ao lidar com dados no formato JSON.
Aqui estão várias pegadinhas que podem produzir um JSON inválido.

* Objetos e arrays vazios são okay

* Strings podem conter qualquer caractere unicode, isso inclui as propriedades
  do objeto

* `null` é um valor JSON valido por si só

* Todas as propriedades do objeto devem sempre estar com aspas duplas

* Os valores da propriedade do objeto devem ser um dos seguintes: String, Number,
  Boolean, Object, Array, null
* Os valores numéricos devem estar no formato decimal, sem representações octais
  ou hexadecimais

* Vírgulas à direita em arrays não são permitidas

Esses são todos exemplos de um JSON válido.

```json
{"nome":"John Doe","idade":32,"titulo":"Vice Presidente do JavaScript"}

["um", "dois", "tres"]

// valores aninhados são validos
{"nomes": ["John Doe", "Jane Doe"] }

[ { "nome": "John Doe"}, {"nome": "Jane Doe"} ]

{} // hash vazio

[] // lista vazia

null

{ "key": "\uFDD0" } // códigos de escape unicode
```

Esses são todos os exemplos de um JSON no formato incorreto.

```json
{ nome: "John Doe", 'idade': 32 } // nome e idade deve estar entre aspas duplas

[32, 64, 128, 0xFFF] // números hexadecimais não são permitidos

{ "nome": "John Doe", "idade": undefined } // undefined é um valor inválido

// funções e datas não são permitidas
{ "nome": "John Doe",
  "aniversario": new Date('Fri, 26 Jan 2019 07:13:10 GMT'),
  "getNome": function() {
      return this.nome;
  }
}
```

Chamar `JSON.parse` com uma string JSON inválida resultará em uma exceção
SyntaxError. Se você não tem certeza que seu dado JSON é válido,
você pode antecipar os erros encapsulando a chamada em um bloco try/catch.

Observe que os únicos valores complexos permitidos em JSON são objetos e
arrays. Funções, datas e outros tipos são excluídos. Isso pode não
parecer fazer sentido no começo. Mas lembre-se que o JSON é um formato de dados,
não um formato para transferir objetos JavaScript complexos junto com
sua funcionalidade.

## Validadores JSON

Como o JSON se tornou o formato de dados mais amplamente usado, com regras bem definidas, existem muitos validadores disponíveis para auxiliar seu fluxo de trabalho:

* **Validadores online**: Se você está apenas brincando com o JSON ou verificando o JSON de alguém (sem IDEs/editores), os validadores online podem ser de grande ajuda. Por exemplo: [jsonlint.com](https://jsonlint.com) é um bom validador e reformatador online JSON.

* **Pacotes npm**: Se você estiver trabalhando com uma equipe e quiser que um validador JSON seja incluído em seu projeto ou simplesmente goste de automatizar a validação em seu fluxo de trabalho, a grande coleção de pacotes npm estará à sua disposição. Por exemplo: [jsonlint](https://www.npmjs.com/package/jsonlint) é uma versão em JavaScript puro do serviço fornecido em `jsonlint.com`.

* **Plugins para IDEs/editores**: Existem muitos plugins/extensões disponíveis para a maioria dos IDEs/editores que validam o JSON para você. Alguns editores como o `VS Code` vêm com JSON intelliSense e validação pronto para uso.

## JSON em outras linguagens

Embora o JSON tenha sido inspirado pela simplicidade dos dados estruturados do
JavaScript, o seu uso não se limita à linguagem JavaScript. Muitas
outras linguagens têm métodos de transferência de hashes e listas nativas
em objetos JSON stringificados. Aqui está um exemplo rápido em ruby.

```ruby
require 'json'

dado = { :um => 1 }
puts dado.to_json

# imprime "{ \"um\": 1 }"
```
