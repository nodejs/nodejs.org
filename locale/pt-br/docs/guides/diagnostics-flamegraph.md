---
title: Diagnostics - Flame Graphs
layout: docs.hbs
---

# Flame Graphs

## Para que serve um Flame Graph?

Flame graphs são uma forma de visualizar o tempo de CPU gasto em funções. Eles podem ajudar você a identificar onde você pode estar gastando muito tempo fazendo processamento síncrono.

## Como criar um Flame Graph

Você deve ter ouvido que criar Flame Graphs pro Node.js era complicado, mas isso não é verdade (não mais).
VMs com Solaris não são mais necessárias para criação de Flame Graphs!

Flame Graphs são gerados a partir da saída do `perf`, que não é uma ferramenta específica do Node. Enquanto ela é a forma mais poderosa de visualizar o tempo gasto em CPU, ela também pode ter problemas com como o código JavaScript é otimizado nas versões superiores à 8 do Node.js. Veja a seção [problemas de saída do perf](#problemas-de-saída-do-perf).

### Usando uma ferramenta pré-empacotada

Se você quiser uma ferramenta simples, de um único passo, que produz um Flame Graph rápido localmente, tente o [0x](https://www.npmjs.com/package/0x)

Para diagnosticar problemas em produção, leia estas notas: [0x em servidores de produção](https://github.com/davidmarkclements/0x/blob/master/docs/production-servers.md)

### Criando um Flame Graph com as ferramentas `perf` do sistema

O propósito deste guia é mostrar os passos envolvidos em criar um flame graph e te manter no controle de cada parte.

Se você quiser entender melhor cada passo, dê uma olhada nas seções abaixo onde temos mais detalhes.

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

Agora abra o arquivo `htm` no seu browser preferido e veja o resultado. Ele tem um código de cores, de forma que você pode focar nas barras mais alaranjadas primeiro. Elas provavelmente representam funções que possuem alto uso de CPU.

Vale mencionar que, ao clicar em um elemento do gráfico, um zoom será aplicado nas redondezas do mesmo e exibido no topo do gráfico.

### Usando `perf` para visualizar um processo em andamento

Isto é excelente para gravar dados para um flame graph a partir de um processo que já esteja rodando e você não quer interromper, por exemplo, um processo de produção com um problema difícil de reproduzir.

```bash
perf record -F99 -p `pgrep -n node` -g -- sleep 3
```
Mas o que é este `sleep 3`? Ele existe somente para manter o `perf` rodando - mesmo com o `-p` apontando para um PID diferente, o comando precisa ser executado com um processo e finalizado com ele.
O perf executa com o mesmo tempo de vida do comando que você passar para ele, esteja você debugando ou não aquele comando. `sleep 3` garante que o perf rode por 3 segundos.

Porque o `-F` (frequencia de profiling) está em 99? É um default razoável que pode ser ajustado se você quiser.
O `-F99` diz ao perf para tirar 99 amostras por segundo, para mais precisão, aumente o valor. Valores melhores devem produzir menos saídas com resultados também menos precisos. A precisão que você precisa depende de quanto tempo suas funções que precisam de muita CPU demoram para rodar. Se você está procurando a razão de uma lentidão aparente, 99 frames por segundo devem ser mais do que suficientes.

Depois de 3 segundos de gravação do perf, gere o flame graph com os últimos dois passos mostrados acima.

### Filtrando funções internas do Node

Geralmente só queremos olhar a performance do nosso próprio código, então é muito importante filtrarmos as funções internas do Node e do V8 para que o gráfico fique mais simples de ler. Você pode limpar o arquivo com o seguinte comando:

```bash
sed -i \
  -e "/( __libc_start| LazyCompile | v8::internal::| Builtin:| Stub:| LoadIC:|\[unknown\]| LoadPolymorphicIC:)/d" \
  -e 's/ LazyCompile:[*~]\?/ /' \
  perfs.out
```

Se você ler o gráfico e ele parecer esquisito, como se houvesse algo faltando na função que está levando mais tempo, tente gerar o gráfico sem o filtro - as vezes você pode ter encontrado um problema com o Node.js em si.

### Opções de profiling do Node.js

A flag `--perf-basic-prof-only-functions` e `--perf-basic-prof` são duas das opções que são úteis para debugar seu código JavaScript. Outras opções são usadas para debugar o Node.js em si, o que está fora do escopo deste guia.

`--perf-basic-prof-only-functions` produz menos saídas, então é a opção com menos overhead.

### Por que eu preciso disso?

Bom, sem essas opções você ainda tem o mesmo flame graph, mas com a maioria das barras com a label `v8::Function::Call`

## Problemas de saída do `perf`

### Mudanças na pipeline do V8 para o Node.js 8.x

As versões 8.x e acima do Node.js possuem novas otimizações para a compilação do JavaScript no V8, que fazem com que as referências/nomes das funções ilegíveis para o perf algumas vezes. (O novo compilado é chamado TurboFan)

Por conta disso os nomes das funções podem não estar corretos no gráfico.

Você vai notar um `ByteCodeHandler:` onde deveria haver um nome de função.

O [0x](https://www.npmjs.com/package/0x) tem algumas mitigações para isso já no próprio sistema.

Para mais detalhes veja:
- https://github.com/nodejs/benchmarking/issues/168
- https://github.com/nodejs/diagnostics/issues/148#issuecomment-369348961

### Node.js 10+

A versão 10.x do Node.js trata o problema com o turboFan usando a flag `--interpreted-frames-native-stack`.

Execute `node --interpreted-frames-native-stack --perf-basic-prof-only-functions` para obter os nomes das funções no gráfico independentemente de que tipo de pipeline o V8 usou para compilar seu código JavaScript.

### Labels quebradas no gráfico

Se você está vendo labels parecidas com essas:

```
node`_ZN2v88internal11interpreter17BytecodeGenerator15VisitStatementsEPNS0_8ZoneListIPNS0_9StatementEEE
```

Significa que a versão do perf que voc6e está usando no Linux não foi compilada com o support para o demangle, veja https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1396654 para exemplos.

## Exemplos

Pratique capturando amostras e gerando flame graphs você mesmo com [este exercício](https://github.com/naugtur/node-example-flamegraph)!
