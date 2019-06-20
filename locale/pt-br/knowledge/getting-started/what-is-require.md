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

 <!-- Node.js follows the CommonJS module system, and the builtin `require` function is the easiest way to include modules that exist in separate files. The basic functionality of `require` is that it reads a javascript file, executes the file, and then proceeds to return the `exports` object. An example module: -->
O Node.js segue o sistema de módulos CommomJS, e a função nativa `require` é a forma mais fácil de incluir módulos que existem em arquivos separados. A funcionalidade básica do `require` é que ele lê um arquivo javascript, executa o arquivo e então retorna o objeto `exports`. Um exemplo de módulo:

    console.log("evaluating example.js");

    var invisible = function () {
      console.log("invisible");
    }

    exports.message = "hi";

    exports.say = function () {
      console.log(exports.message);
    }

<!-- So if you run `var example = require('./example.js')`, then `example.js` will get evaluated and then `example` be an object equal to: -->
 Então, se você executar `var example = require('./example.js')`, então o `example.js` será processado e, em seguida, `example` será um objeto igual a:

    {
      message: "hi",
      say: [Function]
    }

<!-- If you want to set the exports object to a function or a new object, you have to use the `module.exports` object. So for an example: -->
Se você quiser definir o objeto exportado para uma função ou um novo objeto, você tem que usar o objeto `module.exports`. Então, por exemplo: 

    module.exports = function () {
      console.log("hello world")
    }

    require('./example2.js')() //requere ele mesmo e executa o objeto exportado.

<!-- It is worth noting that each time you subsequently require an already-required file, the `exports` object is cached and reused. To illustrate this point: -->
Vale a pena notar que cada vez que você subseqüentemente requere um arquivo já requerido, o objeto `exports` é armazenado em cache e reutilizado. Para ilustrar este ponto:

    node> require('./example.js')
    avaliando example.js
    { message: 'hi', say: [Function] }
    node> require('./example.js')
    { message: 'hi', say: [Function] }
    node> require('./example.js').message = "hey" //atribuindo "hey" para message 
    'hey'
    node> require('./example.js') //Pode-se pensar que isso "recarregaria" o arquivo...
    { message: 'hey', say: [Function] } //...mas a mensagem ainda é "hey" devido ao cache do módulo.


<!-- As you can see from the above, `example.js` is evaluated the first time, but all subsequent calls to `require()` only invoke the module cache, rather than reading the file again.  As seen above, this can occasionally produce side effects. -->
Como você pode ver acima, `example.js` é processado na primeira vez, mas todas as chamadas subsequentes para o `require()` invocam apenas o cache do módulo, em vez de ler o arquivo novamente. E como visto acima, isso pode ocasionalmente produzir efeitos colaterais.

<!-- The rules of where `require` finds the files can be a little complex, but a simple rule of thumb is that if the file doesn't start with "./" or "/", then it is either considered a core module (and the local Node path is checked), or a dependency in the local `node_modules` folder. If the file starts with "./" it is considered a relative file to the file that called `require`. If the file starts with "/", it is considered an absolute path. NOTE: you can omit ".js" and `require` will automatically append it if needed. For more detailed information, see [the official docs](https://nodejs.org/docs/v0.4.2/api/modules.htmll#all_Together...) -->
As regras de onde o `require` localiza os arquivos podem ser um pouco complexas, mas uma simples regra é que se o arquivo não iniciar com "./" ou "/", ele é considerado um módulo central (e o caminho local do Node é verificado), ou uma dependência na pasta local `node_modules`. Se o arquivo começar com "./", ele será considerado um arquivo relativo para o arquivo que chamou o `require`. Se o arquivo começar com "/", ele será considerado um caminho absoluto. 
NOTA: você pode omitir ".js" que o `require` irá anexá-lo automaticamente, se necessário. Para informações mais detalhadas, consulte [os documentos oficiais](https://nodejs.org/docs/v0.4.2/api/modules.htmll#all_Together...)

<!-- An extra note: if the filename passed to `require` is actually a directory, it will first look for `package.json` in the directory and load the file referenced in the `main` property. Otherwise, it will look for an `index.js`. -->
Uma nota extra: se o nome do arquivo passado para `require` for um diretório, ele procurará primeiro pelo `package.json` no diretório e carregará o arquivo referenciado na propriedade `main`. Caso contrário, ele irá procurar por um `index.js`.
