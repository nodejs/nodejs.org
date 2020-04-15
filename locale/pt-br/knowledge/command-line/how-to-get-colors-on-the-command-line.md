---
title: Como inserir cores na linha de comando
date: '2011-08-26T10:08:50.000Z'
tags:
  - cli
difficulty: 1
layout: knowledge-post.hbs
---

<!-- When working on the command line, it can be both fun and extremely useful to colorize one's output. To colorize console output, you need to use ANSI escape codes. The module [colors.js](https://www.npmjs.com/package/colors), available on `npm`, provides an extremely easy to use wrapper that makes adding colors a breeze. -->
Quando trabalhamos com a linha de comando, pode ser muito útil e divertido ter respostas coloridas. Para colorir a resposta do console você precisa usar códigos de escape ANSI. O módulo [colors.js](https://www.npmjs.com/package/colors), disponível no `npm`, provê um pacote extremamente fácil de usar que torna a adição de cores na linha de comando bastante simples.

<!-- First, install it to the directory you'd like to work in. -->
Primeiro instale-o no diretório ao qual você gostaria de trabalhar.

```js
cd mydir
npm install colors
```
<!-- Now open up a little test script for yourself, and try something like this: -->
Agora faça um pequeno _script_ de teste. Tente algo assim:

```js
const colors = require('colors')

const stringOne = 'This is a plain string.'
const stringTwo = 'This string is red.'.red
const stringThree = 'This string is blue.'.blue
const today = new Date().toLocaleDateString() // retorna a data de hoje no formato mm/dd/yyyy

console.log(stringOne.black.bgMagenta)
console.log(stringOne.yellow.bgRed.bold)
console.log(`Today is: ${today}`.black.bgGreen)

console.log(stringTwo)
console.log(stringThree)

console.log(stringTwo.magenta)
console.log(stringThree.grey.bold)
```

<!-- There are several things to take note of here - first, the string object has been prototyped, so any color may be added simply by adding the property to the string!  It works on string literals, template literals and on variables, as shown at the top of the example above. -->
Há muitas coisas para tomar nota aqui - primeiro, o objeto _string_ foi prototipado, então qualquer cor pode ser adicionada simplesmente passando a propriedade para a _string_! Funciona em _string literals_, _template literals_ e em variáveis, como mostrado no topo do exemplo acima.

<!-- Notice, also, from the second pair of `console.log` statements, that once set, a color value persists as part of the string. This is because under the hood, the proper ANSI color tags have been prepended and appended as necessary - anywhere the string gets passed where ANSI color codes are also supported, the color will remain. -->
Note também, a partir do segundo par de chamadas `console.log` que, uma vez atribuído, o valor da cor persiste como parte da _string_. Isto é porque, por debaixo dos panos, a tag de cor ANSI apropriada foi anexada como necessário - Em qualquer lugar que a _string_ for passada onde códigos de cores ANSI forem suportadas, a cor irá permanecer.

<!-- The last pair of `console.log` statements are probably the most important. Because of the way `colors.js` and ANSI color codes work, if more than one color property is set on a string, **only the first color property to be set on the string takes effect.**  This is because the colors function as 'state shifts' rather than as tags. -->
O último par de chamadas `console.log` é, provavelmente, o mais importante. Por causa da forma em que o `colors.js` e os códigos de cores ANSI funcionam, se mais de uma propriedade de cor é atribuída à _string_, **apenas a primeira propriedade passada terá efeito**. Isso ocorre porque as cores funcionam como "mudanças de estado", e não como _tags_.

<!-- Let's look at a more explicit example. If you set the following properties with `colors.js`: -->
Vamos dar uma olhada em um exemplo mais explícito. Se você você passar as seguintes propriedades com `colors.js`:

```js
myString.red.blue.green
```

<!-- You can think of your terminal saying to itself, "Make this green. No, make this blue. No, make this red. No more color codes now?  Red it is, then."  The codes are read in the reverse order, and the last/'innermost' is applied. This can be extremely useful if you're using a library that sets its own default colors that you don't like - if you set a color code yourself on the string you pass in to the library, it will supersede the other author's color code(s). -->
Você pode pensar no seu terminal dizendo para si mesmo, "Faça isto verde. Não. Faça azul. Não. Faça isto vermelho. Sem mais cores agora? É vermelho mesmo, então." Os códigos são lidos em ordem inversa, e o último/'mais interno' é aplicado. Isto pode ser bastante útil se você estiver usando uma biblioteca que configura seu próprio padrão de cores que você não gosta - se você passar uma cor na _string_ que você passa para a biblioteca, ela vai sobrepor as cores internas da biblioteca.

<!-- The last thing to note is the final line of the example script. While a color code was set previously, a 'bold' code was not, so the example was made bold, but not given a different color. -->
A última coisa para tomar nota é a última linha do _script_ exemplo. Enquanto uma cor foi passada anteriormente à _string_, um 'negrito' não, então a _string_ foi 'negritada' mas não foi atribuída uma nova cor.

<!-- ### Using `colors` without changing `String.prototype`
Now an instance of `colors` can also be used. Though this approach is slightly less nifty but is beginner friendly and is specially useful if you don't want to touch `String.prototype`. Some example of this are: -->
### Usando `colors` sem alterar `String.prototype`
Agora uma instânia de `colors` também pode ser usada. Embora esta abordagem seja menos engenhosa, é amigável à iniciantes e é especialmente útil se você não deseja alterar `String.prototype`. Alguns exemplos disto são:

```js
const colors = require('colors')

const stringOne = 'This is a plain string.'
const stringTwo = 'This string is red.'
const stringThree = 'This string is blue.'
const today = new Date().toLocaleDateString() // retorna a data de hoje no formato mm/dd/yyyy

console.log(colors.bgMagenta.black(stringOne))
console.log(colors.bold.bgRed.yellow(stringOne))
console.log(colors.bgGreen.black(`Today is: ${today}`))

console.log(colors.red(stringTwo))
console.log(colors.blue(stringThree))

console.log(colors.magenta.red(stringTwo))
console.log(colors.bold.grey.black.blue(stringThree))
```

<!-- **Note**: Unlike the `String.prototype` approach, the chained methods on the `colors` instance are executed left to right i.e., the method closest to the string is finally applied. In the last `console.log` you can think of your terminal saying to itself, "Make this grey. Now, make this black. Now, make this blue. No more coloring methods now?  Blue it is, then." -->
**Nota**: A menos que esteja usando a aborgdem `String.prototype`, os métodos encadeados da instância de `colors` são executados da esquerda para a direita, ou seja, o método mais distante da _string_ é aplicado. Na última chamada `console.log` você pode pensar no seu terminal dizendo para si mesmo, "Faça isto cinza. Agora faça isto preto. Agora, faça azul. Sem mais cores, agora? É azul mesmo, então."

<!-- With the latest version of `colors.js` you can also define **[Custom Themes](https://www.npmjs.com/package/colors#custom-themes)** in color.js which makes our code more Robust and allows better Encapsulation of data. A nice use case of this maybe: -->
Com a última versão de `colors.js` você pode definir **[Temas Personalizados](https://www.npmjs.com/package/colors#custom-themes)** no colors.js o que faz com que seu código seja mais robusto e permite melhor encapsulamento de dados. Um bom exemplo de caso de uso pode ser:

```js
var colors = require('colors')

colors.setTheme({
  info: 'bgGreen',
  help: 'cyan',
  warn: 'yellow',
  success: 'bgBlue',
  error: 'red'
})

// imprime texto em vermelho
console.log('this is an error'.error)

// imprime texto com fundo azul
console.log('this is a success message'.success)
```

<!-- One last thing: the colors can look quite different in different terminals - sometimes, `bold` is bold, sometimes it's just a different color. Try it out and see for yourself! -->
Uma última coisa: as cores podem ser vistas em tons bastante diferentes em diferentes terminais - as vezes `bold` é negrito, as vezes é somente uma cor diferente. Faça testes e veja por si mesmo!

<!-- For reference, here's the full list of available `colors.js` properties. -->
Para referência, aqui está a lista completa de cores disponíveis em `colors.js`.

<!-- ### text colors -->
### cores de texto

* black
* red
* green
* yellow
* blue
* magenta
* cyan
* white
* gray
* grey

<!-- ### background colors -->
### cores de fundo

* bgBlack
* bgRed
* bgGreen
* bgYellow
* bgBlue
* bgMagenta
* bgCyan
* bgWhite

<!-- ### styles -->
### estilos

* reset
* bold
* dim
* italic
* underline
* inverse
* hidden
* strikethrough

<!-- ### extras -->
### extras

* rainbow
* zebra
* america
* trap
* random
