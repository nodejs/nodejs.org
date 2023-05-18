---
title: ECMAScript 2015 (ES6) e além
layout: docs.hbs
---

# ECMAScript 2015 (ES6) e além

Node.js é construído contra novas versões do [V8](https://v8.dev/). Mantendo-se em dia com as últimas atualizações desse motor, nós garantimos que as novas funcionalidades da [especificação JavaScript ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm) são trazidas para os desenvolvedores de Node.js em tempo hábil, assim como as melhorias contínuas de performance e estabilidade.

Todas as funcionalidades ECMAScript 2015 (ES6) são divididas em três grupos: **em produção**, em **homologação** e em **andamento**:

* Todas as funcionalidades **em produção**, consideras estáveis pelo V8, tornam-se **ativadas por padrão em Node.js** e **NÃO** necessitam de nenhuma opção de tempo de execução.
* As funcionalidades em **homologação**, cujo são recursos quase concluídos, mas não são considerados estáveis pela equipe V8, requerem uma opção de tempo de execução: `--harmony`.
* Em **andamento**, seriam as funcionalidades que podem ser ativadas individualmente pela sua respectiva opção harmony, embora isso seja muito desencorajado a menos que seja para fins de teste. Nota: essas opções são expostas pelo V8 e potencialmente podem mudar sem qualquer aviso de descontinuidade.

## Quais funcionalidades são enviadas com cada versão do Node.js por padrão?

O site [node.green](https://node.green/) fornece uma excelente visão geral sobre funcionalidades ECMAScript suportados em várias versões de Node.js, baseadas na tabela de compatibilidades do kangax.

## Quais funcionalidades estão em andamento?

Novas funcionalidades estão sendo constantemente adicionadas ao motor do V8. É esperado que elas apareçam em alguma versão futura do Node.js, porém sem uma previsão precisa de quando isso irá acontecer.

Você pode listar todas as funcionalidades *em andamento* disponíveis em cada versão do Node.js utilizando o `grep` em conjunto com a opção `--v8-options`. É importante notar que essas funcionalidades podem estar incompletas ou quebradas no V8, portanto use-as por sua conta e risco:

```bash
node --v8-options | grep "in progress"
```

## Eu tenho a minha infraestrutura configurada para suportar a flag --harmony. Eu devo remove-la?

O comportamento atual da flag `--harmony` é habilitar somente funcionalidades **em homologação**. Além disso, ela agora é um sinônimo da flag `--es_staging`. Como mencionado anteriormente, estas funcionalidades estão completas, mas não foram consideradas estáveis ainda. Se você deseja rodar sua aplicação de forma segura, especialmente em ambientes de produção, considere remover esta flag até que ela seja lançada por padrão no V8 e, consequentemente, no Node.js. Se você deseja a manter habilitada, você deve estar preparado para atualizações futuras do Node.js que podem quebrar o seu código caso o V8 mude a sua semântica para seguir o padrão de maneira mais fiel.

## Como eu encontro qual versão do V8 foi embarcada com uma versão particular do Node.js?

O Node.js provê uma maneira simples de listar todas as dependências e suas respectivas versões que são lançadas com um binário específico através do objeto global `process`. No caso da engine do V8, digite o seguinte comando no seu terminal para recuperar a sua versão:

```bash
node -p process.versions.v8
```
