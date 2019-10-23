---
title: ECMAScript 2015 (ES6) e além
layout: docs.hbs
---

# ECMAScript 2015 (ES6) e além

O Node.js é construído com as novas versões do [V8](https://v8.dev/). Mantendo-se em dia com as últimas atualizações desta engine, nós garantimos que as novas funcionalidades da [especificação JavaScript ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm) são trazidas para os desenvolvedores Node.js em tempo hábil, assim como as melhorias contínuas de performance e estabilidade.

Todas as funcionalidades do ECMAScript 2015 (ES6) são divididas em três grupos:

* Todas as funcionalidades em **lançamento** (shipping), que o V8 considera estáveis, são **ativadas por padrão no Node.js** e **NÃO** necessitam de nenhum tipo de flag de tempo de execução.
* As funcionalidades **em homologação**, que estão quase completas, mas não são consideradas estáveis pelo time do V8 necessitam da flag `--harmony`.
* As funcionalidades **em progresso** podem ser ativadas individualmente por sua respectiva flag "harmony", entretanto isto é altamente desencorajado a menos que seja para propósito de teste. Nota: estas flags são expostas pelo V8 e podem mudar sem aviso.

## Quais funcionalidades são embarcadas com cada versão do Node.js por padrão?

O site [node.green](https://node.green/) oferece uma excelente visão sobre quais são as funcionalidades do ECMAScript suportadas em diversas versões do Node.js, baseadas na [tabela de compatibilidade](https://github.com/kangax/compat-table) de kangax.

## Quais funcionalidades estão em progresso?

Novas funcionalidades estão constantemente sendo adicionadas na engine do V8. É esperado que elas apareçam em alguma versão futura do Node.js, porém sem uma previsão precisa de quando isso pode acontecer.

Você pode listar todas as funcionalidades *em progresso* disponíveis em cada versão do Node.js utilizando o `grep` em conjunto com o argumento `--v8-options`. É importante notar que essas funcionalidades podem estar incompletas ou quebradas no V8, portanto use-as por sua conta e risco:

```bash
node --v8-options | grep "in progress"
```

## E sobre a performance de uma funcionalidade em particular?

O time do V8 está constantemente trabalhando para melhorar a performance de novas funcionalidades da linguagem, para eventualmente encontrar uma paridade com a sua contraparte transpilada ou nativa no EcmaScript 5 ou anterior. O progresso atual é registrado no site [six-speed](https://fhinkel.github.io/six-speed), que mostra a performance das funcionalidades do ES2015 e do ESNext comparadas com as suas respectivas contrapartes nativas do ES5.

O trabalho de otimizar as funcionalidades introduzidas com o ES2015 e além são coordenadas via um [plano de performance](https://docs.google.com/document/d/1EA9EbfnydAmmU_lM8R_uEMQ-U_v4l9zulePSBkeYWmY), onde o time do V8 encontra e coordena áreas que necessitam de melhorias, além de criar documentos para atacar esses problemas.

## Eu tenho a minha infraestrutura configurada para suportar a flag --harmony. Eu devo remove-la?

O comportamento atual da flag `--harmony` é habilitar somente funcionalidades **em homologação**. Além disso, ela agora é um sinônimo da flag `--es_staging`. Como mencionado anteriormente, estas funcionalidades estão completas, mas não foram consideradas estáveis ainda. Se você deseja rodar sua aplicação de forma segura, especialmente em ambientes de produção, considere remover esta flag até que ela seja lançada por padrão no V8 e, consequentemente, no Node.js. Se você deseja a manter habilitada, você deve estar preparado para atualizações futuras do Node.js que podem quebrar o seu código caso o V8 mude a sua semântica para seguir o padrão de maneira mais fiel.

## Como eu encontro qual versão do V8 foi embarcada com uma versão particular do Node.js?

O Node.js provê uma maneira simples de listar todas as dependências e suas respectivas versões que são lançadas com um binário específico através do objeto global `process`. No caso da engine do V8, digite o seguinte comando no seu terminal para recuperar a sua versão:

```bash
node -p process.versions.v8
```
