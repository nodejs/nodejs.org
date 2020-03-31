---
date: '2011-08-26T10:08:50.000Z'
tags:
  - json
  - stringify
  - parse
title: O que é JSON?
difficulty: 5
layout: knowledge-post.hbs
---

JavaScript Object Notation ou JSON, é um formato de dados leve que tornou-se o padrão para a web. JSON pode ser representado como uma lista de valores, por exemplo, um Array, ou um hash de propriedades e valores, por exemplo, um Objeto.

```json
// um array JSON
["um", "dois", "tres"]

// um objeto JSON
{ "um": 1, "dois": 2, "tres": 3 }
```

## Codificação e Decodificação

O JavaScript fornece 2 métodos. Um para codificar estrutura de dados para JSON e o outro para decodificar JSON para objetos e arrays JavaScript. Ambos estão disponíveis no objeto `JSON` que existe no escopo global.

`JSON.stringify` recebe um objeto ou um array JavaScript e retorna uma string serializada no formato JSON.

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

`JSON.parse` recebe uma string JSON e decodifica para um dado JavaScript estruturado.

```js
const jsonStr =
  '{"nome":"John Doe","idade":32,"titulo":"Vice Presidente do JavaScript"}';

const dados = JSON.parse(jsonStr);

console.log(dados.titulo);

// imprime 'Vice Presidente do JavaScript'
```

## O que é um JSON válido?

Existem algumas regras a serem lembradas ao lidar com dados no formato JSON. Aqui estão várias pegadinhas que podem produzir um JSON inválido.

* Empty objects and arrays are okay
* Strings can contain any unicode character, this includes object properties
* `null` is a valid JSON value on it's own
* All object properties should always be double quoted
* Object property values must be one of the following: String, Number, Boolean, Object, Array, null
* Number values must be in decimal format, no octal or hex representations
* Trailing commas on arrays are not allowed

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

Chamar `JSON.parse` com uma string JSON inválida resultará em uma exceção SyntaxError. Se você não tem certeza que seu dado JSON é válido, você pode antecipar os erros encapsulando a chamada em um bloco try/catch.

Observe que os únicos valores complexos permitidos em JSON são objetos e arrays. Funções, datas e outros tipos são excluídos. Isso pode não parecer fazer sentido no começo. Mas lembre-se que o JSON é um formato de dados, não um formato para transferir objetos JavaScript complexos junto com sua funcionalidade.

## Validadores JSON

Como o JSON se tornou o formato de dados mais amplamente usado, com regras bem definidas, existem muitos validadores disponíveis para auxiliar seu fluxo de trabalho:

* **Online Validators**: If you are just playing around with JSON or checking someone's JSON (without IDEs/editors) then online validators could be of great help. For instance: [jsonlint.com](https://jsonlint.com) is a good online JSON validator and reformatter.
* **npm Packages**: If you are working with a team and want JSON Validation baked into your project or simply like to automate validation in your workflow then the large collection of npm packages are at your disposal. For instance: [jsonlint](https://www.npmjs.com/package/jsonlint) is a pure JavaScript version of the service provided at `jsonlint.com`.
* **Plugins for IDEs/editors**: There are many plugins/extensions available for most of the IDEs/editors which validate JSON for you. Some editors like `VS Code` come with JSON IntelliSense & Validation out of the box.

## JSON em outras linguagens

Embora o JSON tenha sido inspirado pela simplicidade dos dados estruturados do JavaScript, o seu uso não se limita à linguagem JavaScript. Muitas outras linguagens têm métodos de transferência de hashes e listas nativas em objetos JSON stringificados. Aqui está um exemplo rápido em ruby.

```ruby
require 'json'

dado = { :um => 1 }
puts dado.to_json

# imprime "{ \"um\": 1 }"
```
