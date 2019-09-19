---
title: Como inserir cores na linha de comando
date: '2011-08-26T10:08:50.000Z'
tags:
  - cli
difficulty: 1
layout: knowledge-post.hbs
---

Quando trabalhamos com a linha de comando, pode ser muito útil e divertido ter respostas coloridas. Para colorir a resposta do console você precisa usar códigos de escape ANSI. O módulo [colors.js](https://www.npmjs.com/package/colors), disponível no `npm`, provê um pacote extremamente fácil de usar que torna a adição de cores na linha de comando bastante simples.

Primeiro instale-o no diretório ao qual você gostaria de trabalhar.

```js
cd mydir
npm install colors
```

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

Há muitas coisas para tomar nota aqui - primeiro, o objeto _string_ foi prototipado, então qualquer cor pode ser adicionada simplesmente passando a propriedade para a _string_! Funciona em _string literals_, _template literals_ e em variáveis, como mostrado no topo do exemplo acima.

Note também, a partir do segundo par de chamadas `console.log` que, uma vez atribuído, o valor da cor persiste como parte da _string_. Isto é porque, por debaixo dos panos, a tag de cor ANSI apropriada foi anexada como necessário - Em qualquer lugar que a _string_ for passada onde códigos de cores ANSI forem suportadas, a cor irá permanecer.

O último par de chamadas `console.log` é, provavelmente, o mais importante. Por causa da forma em que o `colors.js` e os códigos de cores ANSI funcionam, se mais de uma propriedade de cor é atribuída à _string_, **apenas a primeira propriedade passada terá efeito**. Isso ocorre porque as cores funcionam como "mudanças de estado", e não como _tags_.

<!-- Let's look at a more explicit example.  If you set the following properties with `colors.js`: -->
Vamos dar uma olhada em um exemplo mais explícito. Se você você passar as seguintes propriedades com `colors.js`:

```js
myString.red.blue.green
```

Você pode pensar no seu terminal dizendo para si mesmo, "Faça isto verde. Não. Faça azul. Não. Faça isto vermelho. Sem mais cores agora? É vermelho mesmo, então." Os códigos são lidos em ordem inversa, e o último/'mais interno' é aplicado. Isto pode ser bastante útil se você estiver usando uma biblioteca que configura seu próprio padrão de cores que você não gosta - se você passar uma cor na _string_ que você passa para a biblioteca, ela vai sobrepor as cores internas da biblioteca.

A última coisa para tomar nota é a última linha do _script_ exemplo. Enquanto uma cor foi passada anteriormente à _string_, um 'negrito' não, então a _string_ foi 'negritada' mas não foi atribuída uma nova cor.

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

**Nota**: A menos que esteja usando a aborgdem `String.prototype`, os métodos encadeados da instância de `colors` são executados da esquerda para a direita, ou seja, o método mais distante da _string_ é aplicado. Na última chamada `console.log` você pode pensar no seu terminal dizendo para si mesmo, "Faça isto cinza. Agora faça isto preto. Agora, faça azul. Sem mais cores, agora? É azul mesmo, então."

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

Uma última coisa: as cores podem ser vistas em tons bastante diferentes em diferentes terminais - as vezes `bold` é negrito, as vezes é somente uma cor diferente. Faça testes e veja por si mesmo!

Para referência, aqui está a lista completa de cores disponíveis em `colors.js`.

### cores de texto
- black
- red
- green
- yellow
- blue
- magenta
- cyan
- white
- gray
- grey

### cores de fundo
- bgBlack
- bgRed
- bgGreen
- bgYellow
- bgBlue
- bgMagenta
- bgCyan
- bgWhite

### estilos
- reset
- bold
- dim
- italic
- underline
- inverse
- hidden
- strikethrough

### extras
- rainbow
- zebra
- america
- trap
- random
