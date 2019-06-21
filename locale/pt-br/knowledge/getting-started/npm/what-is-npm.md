---
title: O que é o npm?
date: '2011-08-26T10:08:50.000Z'
tags:
  - npm
difficulty: 1
layout: knowledge-post.hbs
---

<!-- `npm`, short for Node Package Manager, is two things: first and foremost, it is an online repository for the publishing of open-source Node.js projects; second, it is a command-line utility for interacting with said repository that aids in package installation, version management, and dependency management.  A plethora of node.js libraries and applications are published on npm, and many more are added every day. These applications can be searched for on http://search.npmjs.org/. Once you have a package you want to install, it can be installed with a single command-line command. -->
`npm`, é a abreviação para Node Package Manager (Gerenciador de Pacotes do Node), é duas coisas, em primeiro lugar, é um repositório online para a publicação de projetos Node.js de código aberto; segundo, é um utilitário por linha de comando para a interação com os repositórios mencionados, o que ajuda na instalação de pacotes, no versionamento de versões, e no gerenciamento de dependências. Uma infinidade de bibliotecas e aplicativos node.js são publicados no npm e muitos outros são adicionados todos os dias. Essas aplicações podem ser pesquisados ​​em https://www.npmjs.com/. Depois de ter pacote que você deseja instalar, ele pode ser instalado pela linha de comando com apenas um único comando. 

<!-- Let's say you're hard at work one day, developing the Next Great Application.  You come across a problem, and you decide that it's time to use that cool library you keep hearing about - let's use Caolan McMahon's [async](http://github.com/caolan/async) as an example. Thankfully, `npm` is very simple to use: you only have to run `npm install async`, and the specified module will be installed in the current directory under `./node_modules/`.  Once installed to your `node_modules` folder, you'll be able to use `require()` on them just like they were built-ins. -->
Vamos dizer que você está trabalhando duro um dia, desenvolvendo uma Grande Aplicação. Você se depara com um problema, e decide que é hora de usar aquela biblioteca legal de que você está ouvindo falar - vamos usar o [async](http://github.com/caolan/async) do Caolan McMahon como exemplo. Felizmente, o `npm` é muito simples de usar: você só precisa executar `npm install async`, e o módulo especificado será instalado no diretório atual em `./node_modules/`. Uma vez instalado na sua pasta `node_modules`, você poderá usar o `require()` como se fosse um built-ins.

<!-- Let's look at an example of a global install - let's say `coffee-script`. The npm command is simple: `npm install coffee-script -g`. This will typically install the program and put a symlink to it in `/usr/local/bin/`.  This will then allow you to run the program from the console just like any other CLI tool.  In this case, running `coffee` will now allow you to use the coffee-script REPL. -->
Vejamos um exemplo de instalação global - digamos que seja o `coffee-script`. O comando npm é simples: `npm install coffee-script -g`. Isto irá instalar o programa globalmente e colocar um link simbólico em `/usr/local/bin/`. Isso permitirá que você execute o programa a partir do console como qualquer outra ferramenta CLI. Neste caso, a execução de `coffee` permitirá que você use o REPL do coffee-script.

<!-- Another important use for npm is dependency management.  When you have a node project with a [package.json](/articles/getting-started/npm/what-is-the-file-package-json) file, you can run `npm install` from the project root and npm will install all the dependencies listed in the package.json. This makes installing a Node project from a git repo much easier! For example, `vows`, one of Node's testing frameworks, can be installed from git, and its single dependency, `eyes`, can be automatically handled: -->
Outro uso importante do npm é o gerenciamento de dependências. Quando você tem um projeto node com um arquivo [package.json](/pt-br/knowledge/getting-started/npm/what-is-the-file-package-json), você pode executar `npm install` a partir da raiz do projeto e o npm irá instalar todas as dependências listadas no pacote.json. Isso torna a instalação de um projeto Node a partir de um repositório git muito mais fácil! Por exemplo, `vows`, um dos frameworks de teste do Node, pode ser instalado a partir do git, e sua dependência única, `eyes`, pode ser manipulada automaticamente:

Exemplo:

    git clone https://github.com/cloudhead/vows.git
    cd vows
    npm install

<!-- After running those commands, you will see a `node_modules` folder containing all of the project dependencies specified in the package.json. -->
Após executar estes comandos, você verá o diretório `node_modules` contendo todas as dependências do projeto especificadas em package.json.
