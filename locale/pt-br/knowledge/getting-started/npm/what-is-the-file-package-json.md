---
title: O que é o arquivo `package.json`?
date: '2011-08-26T10:08:50.000Z'
tags:
  - npm
  - conventions
  - core
difficulty: 2
layout: knowledge-post.hbs
---

Todos os pacotes npm contêm um arquivo, geralmente na raiz do projeto, chamado `package.json` - esse arquivo contém vários metadados relevantes para o projeto. Este arquivo é usado para fornecer informações ao `npm` que permitem identificar o projeto e também lidar com as dependências do projeto. Ele também pode conter outros metadados, como uma descrição do projeto, a versão do projeto em uma distribuição específica, informações de licença e até dados de configuração - os quais podem ser vitais para o `npm` e para os usuários finais do pacote. O arquivo `package.json` normalmente está localizado no diretório raiz de um projeto Node.js.

O Node em si reconhece apenas dois campos no `package.json`:

```json
{
  "name" : "barebones",
  "version" : "0.0.0",
}
```

O campo `name` deve ser autoexplicativo: É o nome do seu projeto. O campo `version` é usado pelo npm para garantir que a versão correta do pacote esteja sendo instalado. Geralmente, assume a forma de `major.minor.patch`, onde` major`, `minor` e` patch` são números inteiros que aumentam após cada nova versão. Para mais detalhes, consulte esta especificação: http://semver.org.

Para um package.json mais completo, podemos verificar `underscore`:

```json
{
  "name" : "underscore",
  "description" : "JavaScript's functional programming helper library.",
  "homepage" : "http://documentcloud.github.com/underscore/",
  "keywords" : ["util", "functional", "server", "client", "browser"],
  "author" : "Jeremy Ashkenas <jeremy@documentcloud.org>",
  "contributors" : [],
  "dependencies" : [],
  "repository" : {"type": "git", "url": "git://github.com/documentcloud/underscore.git"},
  "main" : "underscore.js",
  "version" : "1.1.6"
}
```

Como você pode ver, existem campos para a `description` (descrição) e `keywords` (palavras-chave) do seu projeto. Isso permite que as pessoas que acham o seu projeto entendam o que é em poucas palavras. Os campos `author`,` contributors`, `homepage` e `repository` podem ser usados ​​para creditar as pessoas que contribuíram para o projeto, mostrar como entrar em contato com o autor/mantenedor e fornecer links para referências adicionais.

O arquivo listado no campo `main` é o principal ponto de entrada da biblioteca; quando alguém executa `require (<nome da biblioteca>)`, require resolve esta chamada para `require (<package.json:main>)`.

Finalmente, o campo `dependencies` é usado para listar todas as dependências do seu projeto que estão disponíveis no `npm`. Quando alguém instala seu projeto através do `npm`, todas as dependências listadas também serão instaladas. Além disso, se alguém executar o `npm install` no diretório raiz do seu projeto, ele instalará todas as dependências em `./ Node_modules`.

Também é possível adicionar um campo `devDependencies` ao seu `package.json` - são dependências não necessárias para a operação normal, mas necessárias/recomendadas se você deseja corrigir ou modificar o projeto. Por exemplo, se você construiu testes de unidade usando um framework, seria apropriado colocar o framework de testes utilizado no campo `devDependencies`. Para instalar o `devDependencies` de um projeto, simplesmente passe a opção` --dev` ao usar o `npm install`.

Para ainda mais opções, você pode consultar os [documentos on-line](https://docs.npmjs.com/files/package.json) ou executar o `npm help json`.
