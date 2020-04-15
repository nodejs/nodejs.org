---
title: Estabilidade ABI
layout: docs.hbs
---

# Estabilidade ABI

## Introdução

<!-- An Application Binary Interface (ABI) is a way for programs to call functions
and use data structures from other compiled programs. It is the compiled version
of an Application Programming Interface (API). In other words, the headers files
describing the classes, functions, data structures, enumerations, and constants
which enable an application to perform a desired task correspond by way of
compilation to a set of addresses and expected parameter values and memory
structure sizes and layouts with which the provider of the ABI was compiled. -->
Uma Interface Binária de Aplicação (IBA, ou *Application Binary Interface (ABI)* em inglês)
é uma forma que programas utilizam para chamar funções e utilizar estruturas de
dados de outros programas compilados. É a versão compilada de uma Interface
de Programação de Aplicações (API). Em outras palavras, os arquivos de
cabeçalho que descrevem as classes, funções, estruturas, enumeradores
e constante que permitem a aplicação performar uma tarefa desejada
correspondem, a nível de compilação, a um conjunto de endereços, valores de
parâmetros esperados, tamanhos de estruturas de memória e layouts com os quais
o provedor da ABI foi compilado.

<!-- The application using the ABI must be compiled such that the available
addresses, expected parameter values, and memory structure sizes and layouts
agree with those with which the ABI provider was compiled. This is usually
accomplished by compiling against the headers provided by the ABI provider. -->
A aplicação que está usando o ABI deve ser compilada de tal maneira que
os endereços disponíveis, valores esperados de parâmetros, tamanhos de
estruturas de memória e layouts concordem com aqueles com os quais o
provedor da ABI foi compilado. Isto é normalmente feito compilando
a aplicação utilizando os headers providos pelo provedor da ABI.

<!-- Since the provider of the ABI and the user of the ABI may be compiled at
different times with different versions of the compiler, a portion of the
responsibility for ensuring ABI compatibility lies with the compiler. Different
versions of the compiler, perhaps provided by different vendors, must all
produce the same ABI from a header file with a certain content, and must produce
code for the application using the ABI that accesses the API described in a
given header according to the conventions of the ABI resulting from the
description in the header. Modern compilers have a fairly good track record of
not breaking the ABI compatibility of the applications they compile. -->
Já que o provedor da ABI e o usuário da ABI podem ser compilados em tempos
diferentes e com versões diferentes do compilador, uma porção da responsabilidade
de garantir a compatibilidade da ABI está no compilador. Diferentes versões
do compilador, talvez providas por diferentes fornecedores, devem todas
produzir a mesma ABI a partir de um arquivo de cabeçalho com um conteúdo
determinado, e devem produzir código para a aplicação utilizando a ABI
que acessa a API descrita em um dado cabeçalho de acordo com as convenções
da ABI resultantes das descrições no cabeçalho. Compiladores modernos tem um histórico
relativamente bom em não quebrar esta compatibilidade nas aplicações que
compilam.

<!-- The remaining responsibility for ensuring ABI compatibility lies with the team
maintaining the header files which provide the API that results, upon
compilation, in the ABI that is to remain stable. Changes to the header files
can be made, but the nature of the changes has to be closely tracked to ensure
that, upon compilation, the ABI does not change in a way that will render
existing users of the ABI incompatible with the new version. -->
O resto da responsabilidade por garantir a compatibilidade da API está no
time que mantém os arquivos de cabeçalho que criam a API que, após compilada,
resulta na ABI que deve permanecer estável. Mudanças nesses arquivos de
cabeçalho podem ser feitas, porém a natureza destas mudanças deve ser
acompanhada de perto para garantir que, após a compilação, a ABI não mude
de forma que usuários existentes percam a compatibilidade com a nova versão.

## Estabilidade da ABI no Node.js

<!-- Node.js provides header files maintained by several independent teams. For
example, header files such as `node.h` and `node_buffer.h` are maintained by
the Node.js team. `v8.h` is maintained by the V8 team, which, although in close
co-operation with the Node.js team, is independent, and with its own schedule
and priorities. Thus, the Node.js team has only partial control over the
changes that are introduced in the headers the project provides. As a result,
the Node.js project has adopted [semantic versioning](https://semver.org/).
This ensures that the APIs provided by the project will result in a stable ABI
for all minor and patch versions of Node.js released within one major version.
In practice, this means that the Node.js project has committed itself to
ensuring that a Node.js native addon compiled against a given major version of
Node.js will load successfully when loaded by any Node.js minor or patch version
within the major version against which it was compiled. -->
O Node.js possui diversos arquivos de cabeçalhos que são mantidos por diversos
times independentes, por exemplo, cabeçalhos como `node.h` e `node_buffer.h` são
mantidos pela equipe do Node.js. `v8.h` é mantido pela equipe do V8 que, mesmo
sendo muito próxima da equipe do Node.js, é ainda sim independente e possui suas
próprias agendas e prioridades. Portanto, o time do Node.js só possui controle
parcial sobre as mudanças que são introduzidas nos cabeçalhos que o projeto possui.
Como resultado, o projeto do Node.js adotou o [semantic versioning](https://semver.org/).
Isto garante que as APIs providas pelo projeto vão resultar em uma ABI estável
para todas as versões minor e patch do Node.js lançadas dentro de uma major.
Na prática, isso significa que o projeto como um todo se comprometeu a garantir
que um módulo nativo do Node.js que for compilado contra uma versão major do Node.js
vai carregar com sucesso em todas as versões minor ou patch dentro desta versão
major sobre a qual o addon foi compilado.

## N-API

<!-- Demand has arisen for equipping Node.js with an API that results in an ABI that
remains stable across multiple Node.js major versions. The motivation for
creating such an API is as follows: -->
Uma demanda para equipar o Node.js com uma API que resulta em uma ABI que permanece
estável dentre múltiplas versões major do Node.js acabou surgindo. A motivação para
criar tal API são as seguintes:

* A linguagem JavaScript permaneceu compatível com ela mesma desde o seus
primeiros dias, enquanto a ABI do engine que executa o código JavaScript muda
com cada versão major do Node.js. Isso significa que aplicações que consistem
de pacotes do Node.js que são completamente escritos em JavaScript não precisam
ser recompilados, reinstalados ou sofrer um novo deploy uma vez que uma nova
versão major do Node.js é instalada no ambiente de produção onde tal aplicação
está sendo executada. Em contraste a isso, se uma aplicação depende de m pacote
que contém um módulo nativo, então a aplicação precisa ser recompilada, reinstalada
e reexecutada sempre que uma nova versão major do Node.js é introduzida em seu ambiente
de produção. Essa disparidade entre os pacotes que contém addons nativos e os que são
escritos com JavaScript em sua totalidade acabou por adicionar um peso a mais na
manutenção em sistemas que estão em produção e dependem de addons nativos.

* Outros projetos começaram a produzir interfaces JavaScript que são, essencialmente,
  alternativas às implementações do Node.js. Uma vez que estes projetos são, geralmente,
  criados e construídos em um engine JavaScript diferente do V8, seus addons nativos
  necessariamente tem uma estrutura diferente e usam uma API diferente. Mesmo assim,
  utilizar uma única API para um módulo nativo entre diferentes implementações da
  API JavaScript do Node.js permitiria que estes projetos tirassem vantagem do
  ecossistema de pacotes JavaScript que já se acumulou ao redor do Node.js.
* O Node.js pode mudar para utilizar um engine JavaScript diferente do V8 no futuro.
  Isto significa que, externamente, todas as interfaces do Node.js continuariam iguais,
  porém o cabeçalho do V8 não existiria. Tal alteração causaria uma disrupção do
  ecossistema do Node.js no geral, e também do ecossistema de addons nativos em particular,
  se a API que é agnóstica do engine JavaScript que está sendo utilizado não for provida
  pelo Node.js e adotada pelos addons nativos.

<!-- To these ends Node.js has introduced N-API in version 8.6.0 and marked it as a
stable component of the project as of Node.js 8.12.0. The API is defined in the
headers [`node_api.h`][] and [`node_api_types.h`][], and provides a forward-
compatibility guarantee that crosses the Node.js major version boundary. The
guarantee can be stated as follows: -->
Para estas finalidades o Node.js introduziu a N-API na versão 8.6.0 e a marcou como
um componente estável do projeto na versão 8.12.0. A API é definida pelos headers
[`node_api.h`][] e [`node_api_types.h`][], e provê uma garantia de compatibilidade
com versões posteriores que ultrapassam a limitação da versão major do Node.js.
Esta garantia pode ser descrita como o seguinte:

<!-- **A given version *n* of N-API will be available in the major version of
Node.js in which it was published, and in all subsequent versions of Node.js,
including subsequent major versions.** -->
**Uma versão *n* da N-API estará disponível na versão major do Node.js na qual
ela foi primeiramente publicada, e em todas as versões subsequentes do Node.js,
incluindo versões major.**

<!-- A native addon author can take advantage of the N-API forward compatibility
guarantee by ensuring that the addon makes use only of APIs defined in
`node_api.h` and data structures and constants defined in `node_api_types.h`.
By doing so, the author facilitates adoption of their addon by indicating to
production users that the maintenance burden for their application will increase
no more by the addition of the native addon to their project than it would by
the addition of a package written purely in JavaScript. -->
Um autor de um módulo nativo pode tirar proveito desta garantia de compatibilidade
da N-API para fazer com que seu módulo só utilize as APIs dispostas no `node_api.h`
e as estruturas de dados e constantes definidas em `node_api_types.h`. Fazendo isto,
o autor facilita a adoção do seu módulo indicando para seus usuários que este módulo
não acarretará em uma reinstalação ou um trabalho extra de manutenção se for instalado.
De forma que este módulo se comportaria da mesma forma que um pacote escrito completamente
em JavaScript.

<!-- N-API is versioned because new APIs are added from time to time. Unlike
semantic versioning, N-API versioning is cumulative. That is, each version of
N-API conveys the same meaning as a minor version in the semver system, meaning
that all changes made to N-API will be backwards compatible. Additionally, new
N-APIs are added under an experimental flag to give the community an opportunity
to vet them in a production environment. Experimental status means that,
although care has been taken to ensure that the new API will not have to be
modified in an ABI-incompatible way in the future, it has not yet been
sufficiently proven in production to be correct and useful as designed and, as
such, may undergo ABI-incompatible changes before it is finally incorporated
into a forthcoming version of N-API. That is, an experimental N-API is not yet
covered by the forward compatibility guarantee. -->
A N-API é versionada de porque novas APIs são adicionadas de tempos em tempos.
Diferentemente do semantic versioning, as versões do N-API são cumulativas. Isto é,
cada versão da N-API tem o mesmo significado de uma versão minor no sistema semver,
significando que todas as mudanças feitas na N-API são retrocompatíveis. Além disso,
novas N-APIs são adicionadas sob uma flag experimental para dar à comunidade a chance
de serem desligadas em ambientes produtivos. O status experimental significa que, mesmo
que todo o cuidado tenha sido tomado para garantir que a nova API não foi modificada de
forma que se tornasse incompatível com a ABI no futuro, ela ainda não foi suficientemente
testada em produção para ser dada como correta e útil e, por conta disso, pode sofrer
mudanças incompatíveis com a ABI antes de ser finalmente incorporada dentro da próxima
versão da N-API. Isto é, uma versão experimental da N-API ainda não está coberta pela
garantia de compatibilidade com versões posteriores que comentamos anteriormente.

[`node_api.h`]: https://github.com/nodejs/node/blob/master/src/node_api.h
[`node_api_types.h`]: https://github.com/nodejs/node/blob/master/src/node_api_types.h
