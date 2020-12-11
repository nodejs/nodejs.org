---
title: O que é o npm?
date: '2011-08-26T10:08:50.000Z'
tags:
  - npm
difficulty: 1
layout: knowledge-post.hbs
---

`npm`, é a abreviação para Node Package Manager (Gerenciador de Pacotes do Node). O npm é duas coisas: em primeiro lugar, é um repositório online para a publicação de projetos Node.js de código aberto; segundo, é um utilitário por linha de comando para a interação com os repositórios mencionados, o que ajuda na instalação de pacotes, no versionamento de versões, e no gerenciamento de dependências. Uma infinidade de bibliotecas e aplicativos Node.js são publicados no npm e muitos outros são adicionados todos os dias. Essas aplicações podem ser pesquisados em https://www.npmjs.com/. Depois de ter pacote que você deseja instalar, ele pode ser instalado pela linha de comando com apenas um único comando.

Vamos dizer que você está trabalhando duro um dia, desenvolvendo uma Grande Aplicação. Você se depara com um problema, e decide que é hora de usar aquela biblioteca legal de que você está ouvindo falar - vamos usar o [async](http://github.com/caolan/async) do Caolan McMahon como exemplo. Felizmente, o `npm` é muito simples de usar: você só precisa executar `npm install async`, e o módulo especificado será instalado no diretório atual em `./node_modules/`. Uma vez instalado na sua pasta `node_modules`, você poderá usar o `require()` como se fosse um built-ins.

Vejamos um exemplo de instalação global - digamos que seja o `coffee-script`. O comando npm é simples: `npm install coffee-script -g`. Isto irá instalar o programa globalmente e colocar um link simbólico em `/usr/local/bin/`. Isso permitirá que você execute o programa a partir do console como qualquer outra ferramenta CLI. Neste caso, a execução de `coffee` permitirá que você use o REPL do coffee-script.

Outro uso importante do npm é o gerenciamento de dependências. Quando você tem um projeto node com um arquivo [package.json](/pt-br/knowledge/getting-started/npm/what-is-the-file-package-json), você pode executar `npm install` a partir da raiz do projeto e o npm irá instalar todas as dependências listadas no pacote.json. Isso torna a instalação de um projeto Node a partir de um repositório git muito mais fácil! Por exemplo, `vows`, um dos frameworks de teste do Node, pode ser instalado a partir do git, e sua dependência única, `eyes`, pode ser manipulada automaticamente:

Exemplo:

```
git clone https://github.com/cloudhead/vows.git
cd vows
npm install
```

Após executar estes comandos, você verá o diretório `node_modules` contendo todas as dependências do projeto especificadas em package.json.
