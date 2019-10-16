---
title: Diagnostics - Flame Graphs
layout: docs.hbs
---

# Flame Graphs

## Para que serve um Flame Graph?

<!-- Flame graphs are a way of visualizing CPU time spent in functions. They can help you pin down where you spend too much time doing synchronous operations. -->
Flame graphs são uma forma de visualizar o tempo de CPU gasto em funções. Eles podem ajudar você a identificar onde você pode estar gastando muito tempo fazendo processamento síncrono.

## Como criar um Flame Graph

<!-- You might have heard creating a flame graph for Node.js is difficult, but that's not true (anymore).
Solaris vms are no longer needed for flame graphs! -->
Você deve ter ouvido que criar Flame Graphs pro Node.js era complicado, mas isso não é verdade (não mais).
VMs com Solaris não são mais necessárias para criação de Flame Graphs!

<!-- Flame graphs are generated from `perf` output, which is not a node-specific tool. While it's the most powerful way to visualize CPU time spent, it may have issues with how JavaScript code is optimized in Node.js 8 and above. See [perf output issues](#perf-output-issues) section below. -->
Flame Graphs são gerados a partir da saída do `perf`, que não é uma ferramenta específica do Node. Enquanto ela é a forma mais poderosa de visualizar o tempo gasto em CPU, ela também pode ter problemas com como o código JavaScript é otimizado nas versões superiores à 8 do Node.js. Veja a seção [problemas de saída do perf](#problemas-de-saída-do-perf).

### Usando uma ferramenta pré-empacotada

<!-- If you want a single step that produces a flame graph locally, try [0x](https://www.npmjs.com/package/0x) -->
Se você quiser uma ferramenta simples, de um único passo, que produz um Flame Graph rápido localmente, tente o [0x](https://www.npmjs.com/package/0x)

<!-- For diagnosing production deployments, read these notes: [0x production servers](https://github.com/davidmarkclements/0x/blob/master/docs/production-servers.md) -->
Para diagnosticar problemas em produção, leia estas notas: [0x em servidores de produção](https://github.com/davidmarkclements/0x/blob/master/docs/production-servers.md)

### Criando um Flame Graph com as ferramentas `perf` do sistema

<!-- The purpose of this guide is to show steps involved in creating a flame graph and keep you in control of each step. -->
O propósito deste guia é mostrar os passos envolvidos em criar um flame graph e te manter no controle de cada parte.

<!-- If you want to understand each step better take a look at the sections that follow were we go into more detail. -->
Se você quiser entender melhor cada passo, dê uma olhada nas seções abaixo onde temos mais detalhes.

<!-- Now let's get to work. -->
Vamos começar!

1. Instale o `perf` (geralmente disponível através do pacote `linux-tools-common` se já não tiver instalado)
2. tente rodar o comando `perf` - ele pode reclamar sobre alguns módulos não encontrados do kernel, então instale eles também
3. Execute o Node com o `perf` ativado (veja [problemas de saída do perf](#problemas-de-saída-do-perf) para dicas específicas de versões do Node)

    ```bash
    perf record -e cycles:u -g -- node --perf-basic-prof app.js
    ```

4. Ignore os avisos a não ser que eles digam que você não pode rodar o `perf` por conta de pacotes não encontrados; Você pode ter alguns avisos sobre não poder acessar as samples dos módulos do kernel, mas não estamos querendo acessar elas de qualquer forma.
5. Execute `perf script > perfs.out` para gerar o arquivo de dados que já vamos visualizar. É bom [fazer uma limpeza](#filtrando-funções-internas-do-node) para uma saída mais legível
6. Instale o stackvis se não tiver já instalado através de `npm i -g stackvis`
7. Execute `stackvis perf < perfs.out > flamegraph.htm`

<!-- Now open the flame graph file in your favorite browser and watch it burn. It's color-coded so you can focus on the most saturated orange bars first. They're likely to represent CPU heavy functions. -->
Agora abra o arquivo `htm` no seu browser preferido e veja o resultado. Ele tem um código de cores, de forma que você pode focar nas barras mais alaranjadas primeiro. Elas provavelmente representam funções que possuem alto uso de CPU.

<!-- Worth mentioning - if you click an element of a flame graph a zoom-in of its surroundings will get displayed above the graph. -->
Vale mencionar que, ao clicar em um elemento do gráfico, um zoom será aplicado nas redondezas do mesmo e exibido no topo do gráfico.

### Usando `perf` para visualizar um processo em andamento

<!-- This is great for recording flame graph data from an already running process that you don't want to interrupt. Imagine a production process with a hard to reproduce issue. -->
Isto é excelente para gravar dados para um flame graph a partir de um processo que já esteja rodando e você não quer interromper, por exemplo, um processo de produção com um problema difícil de reproduzir.

```bash
perf record -F99 -p `pgrep -n node` -g -- sleep 3
```

<!-- Wait, what is that `sleep 3` for? It's there to keep the perf running - despite `-p` option pointing to a different pid, the command needs to be executed on a process and end with it.
perf runs for the life of the command you pass to it, whether or not you're actually profiling that command. `sleep 3` ensures that perf runs for 3 seconds. -->
Mas o que é este `sleep 3`? Ele existe somente para manter o `perf` rodando - mesmo com o `-p` apontando para um PID diferente, o comando precisa ser executado com um processo e finalizado com ele.
O perf executa com o mesmo tempo de vida do comando que você passar para ele, esteja você debugando ou não aquele comando. `sleep 3` garante que o perf rode por 3 segundos.

<!-- Why is `-F` (profiling frequency) set to 99? It's a reasonable default. You can adjust if you want.
`-F99` tells perf to take 99 samples per second, for more precision increase the value. Lower values should produce less output with less precise results. Precision you need depends on how long your CPU intensive functions really run. If you're looking for the reason of a noticeable slowdown, 99 frames per second should be more than enough. -->
Porque o `-F` (frequencia de profiling) está em 99? É um default razoável que pode ser ajustado se você quiser.
O `-F99` diz ao perf para tirar 99 amostras por segundo, para mais precisão, aumente o valor. Valores melhores devem produzir menos saídas com resultados também menos precisos. A precisão que você precisa depende de quanto tempo suas funções que precisam de muita CPU demoram para rodar. Se você está procurando a razão de uma lentidão aparente, 99 frames por segundo devem ser mais do que suficientes.

<!-- After you get that 3 second perf record, proceed with generating the flame graph with the last two steps from above. -->
Depois de 3 segundos de gravação do perf, gere o flame graph com os últimos dois passos mostrados acima.

### Filtrando funções internas do Node

<!-- Usually you just want to look at the performance of your own calls, so filtering out Node.js and V8 internal functions can make the graph much easier to read. You can clean up your perf file with: -->
Geralmente só queremos olhar a performance do nosso próprio código, então é muito importante filtrarmos as funções internas do Node e do V8 para que o gráfico fique mais simples de ler. Você pode limpar o arquivo com o seguinte comando:

```bash
sed -i \
  -e "/( __libc_start| LazyCompile | v8::internal::| Builtin:| Stub:| LoadIC:|\[unknown\]| LoadPolymorphicIC:)/d" \
  -e 's/ LazyCompile:[*~]\?/ /' \
  perfs.out
```

<!-- If you read your flame graph and it seems odd, as if something is missing in the key function taking up most time, try generating your flame graph without the filters - maybe you got a rare case of an issue with Node.js itself. -->
Se você ler o gráfico e ele parecer esquisito, como se houvesse algo faltando na função que está levando mais tempo, tente gerar o gráfico sem o filtro - as vezes você pode ter encontrado um problema com o Node.js em si.

### Opções de profiling do Node.js

<!-- `--perf-basic-prof-only-functions` and `--perf-basic-prof` are the two that are useful for debugging your JavaScript code. Other options are used for profiling Node.js itself, which is outside the scope of this guide. -->
A flag `--perf-basic-prof-only-functions` e `--perf-basic-prof` são duas das opções que são úteis para debugar seu código JavaScript. Outras opções são usadas para debugar o Node.js em si, o que está fora do escopo deste guia.

<!-- `--perf-basic-prof-only-functions` produces less output, so it's the option with least overhead. -->
`--perf-basic-prof-only-functions` produz menos saídas, então é a opção com menos overhead.

### Por que eu preciso disso?

<!-- Well, without these options you'll still get a flame graph, but with most bars labeled `v8::Function::Call`. -->
Bom, sem essas opções você ainda tem o mesmo flame graph, mas com a maioria das barras com a label `v8::Function::Call`

## Problemas de saída do `perf`

### Mudanças na pipeline do V8 para o Node.js 8.x

<!-- Node.js 8.x and above ships with new optimizations to JavaScript compilation pipeline in V8 engine which makes function names/references unreachable for perf sometimes. (It's called Turbofan) -->
As versões 8.x e acima do Node.js possuem novas otimizações para a compilação do JavaScript no V8, que fazem com que as referências/nomes das funções ilegíveis para o perf algumas vezes. (O novo compilado é chamado TurboFan)

<!-- The result is you might not get your function names right in the flame graph. -->
Por conta disso os nomes das funções podem não estar corretos no gráfico.

<!-- You'll notice `ByteCodeHandler:` where you'd expect function names. -->
Você vai notar um `ByteCodeHandler:` onde deveria haver um nome de função.

<!-- [0x](https://www.npmjs.com/package/0x) has some mitigations for that built in. -->
O [0x](https://www.npmjs.com/package/0x) tem algumas mitigações para isso já no próprio sistema.

<!-- For details see: -->
Para mais detalhes veja:

* https://github.com/nodejs/benchmarking/issues/168
* https://github.com/nodejs/diagnostics/issues/148#issuecomment-369348961

### Node.js 10+

<!-- Node.js 10.x addresses the issue with Turbofan using the `--interpreted-frames-native-stack` flag. -->
A versão 10.x do Node.js trata o problema com o turboFan usando a flag `--interpreted-frames-native-stack`.

<!-- Run `node --interpreted-frames-native-stack --perf-basic-prof-only-functions` to get function names in the flame graph regardless of which pipeline V8 used to compile your JavaScript. -->
Execute `node --interpreted-frames-native-stack --perf-basic-prof-only-functions` para obter os nomes das funções no gráfico independentemente de que tipo de pipeline o V8 usou para compilar seu código JavaScript.

### Labels quebradas no gráfico

<!-- If you're seeing labels looking like this -->
Se você está vendo labels parecidas com essas:

```
node`_ZN2v88internal11interpreter17BytecodeGenerator15VisitStatementsEPNS0_8ZoneListIPNS0_9StatementEEE
```

<!-- it means the Linux perf you're using was not compiled with demangle support, see https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1396654 for example -->
Significa que a versão do perf que voc6e está usando no Linux não foi compilada com o support para o demangle, veja https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1396654 para exemplos.

## Exemplos

<!-- Practice capturing flame graphs yourself with [a flame graph exercise](https://github.com/naugtur/node-example-flamegraph)! -->
Pratique capturando amostras e gerando flame graphs você mesmo com [este exercício](https://github.com/naugtur/node-example-flamegraph)!
