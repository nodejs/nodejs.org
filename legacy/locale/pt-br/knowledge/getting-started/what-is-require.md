---
title: O que é o require?
date: '2011-08-26T10:08:50.000Z'
tags:
  - npm
  - core
  - globals
  - builtin
difficulty: 1
layout: knowledge-post.hbs
---

O Node.js segue o sistema de módulos CommomJS, e a função nativa `require` é a forma mais fácil de incluir módulos que existem em arquivos separados. A funcionalidade básica do `require` é que ele lê um arquivo JavaScript, executa o arquivo e então retorna o objeto `exports`. Um exemplo de módulo:

```javascript
console.log("evaluating example.js");

var invisible = function () {
  console.log("invisible");
}

exports.message = "hi";

exports.say = function () {
  console.log(exports.message);
}
```

Então, se você executar `var example = require('./example.js')`, então o `example.js` será processado e, em seguida, `example` será um objeto igual a:

```
{
  message: "hi",
  say: [Function]
}
```

Se você quiser definir o objeto exportado para uma função ou um novo objeto, você tem que usar o objeto `module.exports`. Então, por exemplo:

```javascript
module.exports = function () {
  console.log("hello world")
}

require('./example2.js')() //requere ele mesmo e executa o objeto exportado.
```

Vale a pena notar que cada vez que você subseqüentemente requere um arquivo já requerido, o objeto `exports` é armazenado em cache e reutilizado. Para ilustrar este ponto:

```
node> require('./example.js')
avaliando example.js
{ message: 'hi', say: [Function] }
node> require('./example.js')
{ message: 'hi', say: [Function] }
node> require('./example.js').message = "hey" //atribuindo "hey" para message
'hey'
node> require('./example.js') //Pode-se pensar que isso "recarregaria" o arquivo...
{ message: 'hey', say: [Function] } //...mas a mensagem ainda é "hey" devido ao cache do módulo.
```

Como você pode ver acima, `example.js` é processado na primeira vez, mas todas as chamadas subsequentes para o `require()` invocam apenas o cache do módulo, em vez de ler o arquivo novamente. E como visto acima, isso pode ocasionalmente produzir efeitos colaterais.

As regras de onde o `require` localiza os arquivos podem ser um pouco complexas, mas uma simples regra é que se o arquivo não iniciar com "./" ou "/", ele é considerado um módulo central (e o caminho local do Node é verificado), ou uma dependência na pasta local `node_modules`. Se o arquivo começar com "./", ele será considerado um arquivo relativo para o arquivo que chamou o `require`. Se o arquivo começar com "/", ele será considerado um caminho absoluto.
NOTA: você pode omitir ".js" que o `require` irá anexá-lo automaticamente, se necessário. Para mais informações, consulte a [documentação oficial](https://nodejs.org/docs/v0.4.2/api/modules.htmll#all_Together...)

Uma nota extra: se o nome do arquivo passado para `require` for um diretório, ele procurará primeiro pelo `package.json` no diretório e carregará o arquivo referenciado na propriedade `main`. Caso contrário, ele irá procurar por um `index.js`.
