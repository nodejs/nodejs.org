---
title: Como armazenar dados de configuração local
date: '2011-08-26T10:08:50.000Z'
tags:
  - conventions
  - filesystem
difficulty: 1
layout: knowledge-post.hbs
---

Armazenar os dados de configuração da sua aplicação Node.js é muito simples - cada objeto no JavaScript pode ser facilmente renderizado como [JSON](/pt-br/knowledge/javascript-conventions/what-is-json/), que por sua vez é apenas dados em string que podem ser enviados ou salvos da maneira que você preferir. A forma mais simples de fazer isso envolve os métodos built-in `JSON.parse()` e `JSON.stringify()`.

Vamos dar uma olhada em um exemplo muito simples (e imaginário). Primeiro, para salvar alguns dados bem simples:

```javascript
var fs = require('fs');

var myOptions = {
  name: 'Avian',
  dessert: 'cake'
  flavor: 'chocolate',
  beverage: 'coffee'
};

var data = JSON.stringify(myOptions);

fs.writeFile('./config.json', data, function (err) {
  if (err) {
    console.log('There has been an error saving your configuration data.');
    console.log(err.message);
    return;
  }
  console.log('Configuration saved successfully.')
});
```

É realmente simples - apenas `JSON.stringify()` e então salve-o do jeito que você quiser.

Agora, vamos carregar alguns dados de configuração:

```javascript
var fs = require('fs');

var data = fs.readFileSync('./config.json'),
    myObj;

try {
  myObj = JSON.parse(data);
  console.dir(myObj);
}
catch (err) {
  console.log('There has been an error parsing your JSON.')
  console.log(err);
}
```

NODE PRO TIP: Mesmo que você não goste de usar `try/catch`, este é um lugar para usá-lo. `JSON.parse` é um analisador JSON muito rígido, e erros são comuns - mais importante, contudo, `JSON.parse` usa a declaração `throw` em vez de dar uma callback, então `try/catch` é o único jeito de se proteger contra os erros.

Usar o método built-in `JSON` pode lhe levar longe, mas como tantos outros problemas que você pode estar procurando resolver com Node.js, já há uma solução da comunidade que pode levar você muito além. A solução, neste caso, é o `nconf`. Escrito por Charlie Robbins, é um gerenciador de configurações para Node.js que suporta armazenamento em memória, armazenamento de arquivos local, bem como suporte a backend `redis`, provido por um módulo separado.

Vamos dar uma olhada agora em como nós realizaríamos acessos a algumas configurações locais com o `nconf`. Primeiro, você precisará instalá-lo no diretório do projeto:

```
npm install nconf
```

Após isso, a sintaxe é moleza. Veja um exemplo:

```javascript
var nconf = require('nconf');

nconf.use('file', { file: './config.json' });
nconf.load();
nconf.set('name', 'Avian');
nconf.set('dessert:name', 'Ice Cream');
nconf.set('dessert:flavor', 'chocolate');

console.log(nconf.get('dessert'));

nconf.save(function (err) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Configuration saved successfully.');
});
```

A única coisa que requer atenção aqui é o delimitador - ':'. Quando se acessa propriedades aninhadas com o `nconf`, os dois-pontos são usados para delimitar os namespaces dos nomes das chaves. Se uma sub-chave específica não é fornecida, o objeto inteiro é definido ou retornado.

Quando usa-se o `nconf` para guardar seus dados de configurações em um arquivo, `nconf.save()` e `nconf.load()` são os únicos momentos em que acontecerá interações com o arquivo atual. Todos os outros acessos são realizados em uma cópia de seus dados em memória, que não serão persistidos sem uma chamada do `nconf.save()`. De maneira semelhante, se você está tentando trazer de volta dados de configuração da última vez que sua aplicação rodou, eles não existirão em memória sem uma chamada para `nconf.load()`, como mostrado acima.
