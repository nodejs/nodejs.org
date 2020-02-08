---
title: Não bloqueie o Event Loop (ou a Worker Pool)
layout: docs.hbs
---

# Não bloqueie o Event Loop (ou a Worker Pool)

## Você deve ler esse guia?
Se você está escrevendo algo mais complicado que um breve script de linha de comando, ler este guia ajudará você a escrever aplicativos de maior desempenho e mais seguros.

Este documento foi escrito com servidores Node em mente, mas os conceitos são aplicados para aplicações Node complexas também.
Onde detalhes específicos do sistema operacional variam, este documento é centrado no Linux.

## Resumo
O Node.js executa código JavaScript no Event Loop (inicialização e callbacks), e oferece uma Worker Pool para manipular tarefas custosas como I/O de arquivo.
Node escala bem, as vezes mais do que abordagens pesadas como Apache.
O segredo da escalabilidade do Node é que ele usa um pequeno número de threads para manipular muitos clientes.
Se o Node pode trabalhar com menos threads, ele poderá gastar mais tempo do seu sistema e memória trabalhando nos clientes em vez de disperdiçar recursos de espaço e tempo para as threads (memória e mudança de contexto).
Mas pelo fato do Node ter poucas threads, você precisa estruturar sua aplicação para usá-las com sabedoria.

Aqui está um princípio básico para manter o servidor Node rápido: *Node é rápido quando o trabalho associado a cada cliente em um determinado momento é "pequeno"*.

Isso se aplica a callbacks no Event Loop e tarefas na Worker Pool.

## Por que eu devo evitar bloquear o Event Loop e a Worker Pool?
O Node usa um pequeno número de threads para manipular muitos clientes.
No Node existem dois tipos de threads: um Event Loop (também conhecido como main loop, main thread, event thread, etc.), e uma pool de `k` Workers em uma Worker Pool (também conhecido como threadpool)

Se uma thread está levando muito tempo para excutar um callback (Event Loop) ou uma tarefa (Worker), nós a chamamos de "bloqueada".
Enquanto uma thread está bloqueada trabalhando para um cliente, ela não pode lidar com requisições de outros clientes.
Isso fornece duas motivações para não bloquear o Event Loop nem a Worker Pool:

1. Performance: Se você executar regularmente atividades pesadas em qualquer tipo de thread, o *throughput* (requisições por segundo) do seu servidor sofrerá.
2. Segurança: Se for possível que para determinadas entradas uma de suas threads seja bloqueada, um cliente malicioso pode enviar esse "evil input", para fazer suas threads bloquearem, e mantê-las trabalhando para outros clientes. Isso seria um ataque de [Negação de Serviço](https://en.wikipedia.org/wiki/Denial-of-service_attack)

## Uma rápida revisão do Node

O Node usa a Arquitetura Orientada a Eventos: ele tem um Event Loop para orquestração e uma Worker Pool para tarefas custosas.

### Que código é executado no Event Loop?
Quando elas começam, aplicações Node primeiro concluem uma fase de inicialização, fazendo "`require`'ing" de módulos e registrando callbacks para eventos.
As Aplicações Node entram no Event Loop, respondendo requisições recebidas do cliente para executar o callback apropriado.
Esse callback executa de forma síncrona, e pode registrar requisições assíncronas para continuar o processamento após a conclusão.

Os callbacks para essas requisições assíncronas também serão executadas no Event Loop.

O Event Loop também atenderá às requisições assíncronas não-bloqueantes feitas por seus callbacks, por exemplo, I/O de rede.

Em resumo, o Event Loop executa os callbacks JavaScript registrados por eventos, e também é responsável atender requisições assíncronas não-bloqueantes, como I/O de rede.

### Que código é executado na Worker Pool?
A Worker Pool do Node é implementado na libuv ([docs](http://docs.libuv.org/en/v1.x/threadpool.html)), que expõe uma API geral para envio de tarefas.

O Node usa a Worker Pool para lidar com tarefas "custosas".
Isso inclui I/O para quais um sistem operacional não fornece uma versão não-bloqueante, bem como tarefas particularmente intensivas em CPU.

Estas são os módulos de APIs do Node que fazem uso dessa Worker Pool:

1. I/O intensivo
    1. [DNS](https://nodejs.org/api/dns.html): `dns.lookup()`, `dns.lookupService()`.
    2. [Sistema de arquivo](https://nodejs.org/api/fs.html#fs_threadpool_usage): Todas APIs do sistema de arquivo exceto `fs.FSWatcher()` e aquelas que são explicitamente síncronas usam a threadpool da libuv.
2. CPU intensivo
    1. [Crypto](https://nodejs.org/api/crypto.html): `crypto.pbkdf2()`, `crypto.scrypt()`, `crypto.randomBytes()`, `crypto.randomFill()`, `crypto.generateKeyPair()`.
    2. [Zlib](https://nodejs.org/api/zlib.html#zlib_threadpool_usage): Todas APIs do zlib exceto aquelas que são explicitamente síncronas usam a threadpool da libuv.

Em muitas aplicações Node, essas APIs são as únicas fontes de tarefas para a Worker Pool. Aplicações e módulos que usam um [C++ add-on](https://nodejs.org/api/addons.html) podem enviar tarefas para a Worker Pool.

Para cobrir todos os aspectos, observamos que quando você chama uma dessas APIs a partir de um callback no Event Loop, o Event Loop paga alguns custos menores de configuração, pois entra nas ligações do Node C++ para essa API e envia uma tarefa para ao Worker Pool.
Esses custos são insignificantes em comparação ao custo total da tarefa, e é por isso que o Event Loop está sendo menos usado.
Ao enviar uma dessas tarefas para a Worker Pool, o Node fornece um ponteiro para a função C++ correspondente nas ligações Node C++.

### Como o Node decide qual código executar a seguir?
De forma abstrata, o Event Loop e a Worker Pool mantêm filas para eventos e tarefas pendentes, respectivamente.

Na verdade, o Event Loop não mantém realmente uma fila.
Em vez disso, ele possui uma coleção de descritores de arquivos que solicita ao sistema operacional para monitorar, usando um mecanismo como [epoll](http://man7.org/linux/man-pages/man7/epoll.7.html) (Linux), [kqueue](https://developer.apple.com/library/content/documentation/Darwin/Conceptual/FSEvents_ProgGuide/KernelQueues/KernelQueues.html) (OSX), event ports (Solaris), ou [IOCP](https://msdn.microsoft.com/en-us/library/windows/desktop/aa365198.aspx) (Windows).
Esses descritores de arquivos correspondem aos sockets de rede, aos arquivos que estão sendo monitorados e assim por diante.
Quando o sistema operacional diz que um desses descritores de arquivos está pronto, o Evente Loop o converte para o evento apropriado e chama os callbacks associados com esse evento.
Você pode aprender mais sobre esse processo [aqui](https://www.youtube.com/watch?v=P9csgxBgaZ8).

Por outro lado, a Worker Pool usa uma fila real cujas entradas são tarefas a serem processadas.
Um Worker abre uma tarefa nesse fila e trabalha nela, e quando concluída, o Worker gera um evento "Pelo menos uma tarefa está concluída" para o Event Loop.

### O que isso significa para o design da aplicação?
Em um sistema uma-thread-por-cliente tipo Apache, cada cliente pendente recebe sua própria thread.
Se uma thread que manipula um cliente bloqueado, o sistema operacional irá interropé-lo e dará a vez para outro cliente.
O sistema operacional garante, assim, que os clientes que exigem uma pequena quantidade de trabalho não sejam prejudicados por clientes que exigem mais trabalho.

Como o Node lida com muitos clientes com poucas threads, se uma thread bloqueia o processamento da requisição de um cliente, as requisições pendentes do cliente podem não ter uma volta até que a thread conclua seu callback ou tarefa.
*O tratamento justo dos clientes é, portanto, de responsabilidade de sua applicação*.
Isso significa que você não deve fazer muito trabalho para nenhum cliente em uma única tarefa ou callback.

Isso faz parte do motivo pelo qual o Node escalar bem, mas também significa que você é responsável por garantir um scheduling justo.
As próximas seções falam sobre como garantir um agendamento justo para o Loop de Eventos e para a Worker Pool.

## Não bloqueia o Event Loop
O Event Loop percebe cada nova conexão do cliente e orquestra a geração de uma resposta.
Todas as solicitações recebidas e respostas enviadas passam pelo Event Loop.
Isso significa que, se o Event Loop passar muito tempo em algum ponto, todos os clientes atuais e novos não serão atendidos.

Você nunca deve bloquear o Event Loop.
Em outras palavras, cada um de seus callbacks JavaScript devem ser concluídos rapidamente.
Isto, obviamente, também se aplica aos seus `wait`'s , seus `Promise.then`'s, e assim por diante.

Uma boa maneira de garantir isso é estudar sobre a ["complexidade computacional"] (https://en.wikipedia.org/wiki/Time_complexity) de seus callbacks.
Se o seu callback executar um número constante de etapas, independentemente de seus argumentos, você sempre dará a cada cliente pendente uma chance justa.
Se seu callback executa um número considerável de etapas, dependendo de seus argumentos, pense em quanto tempo os argumentos podem demorar.

Exemplo 1: Um callback em tempo constante.

```javascript
app.get('/constant-time', (req, res) => {
  res.sendStatus(200);
});
```

Exemplo 2: Um callback `O(n)`. Este callback será executado rapidamente para pequenos `n` e mais lentamente para grandes `n`.

```javascript
app.get('/countToN', (req, res) => {
  let n = req.query.n;

  // n iterations before giving someone else a turn
  for (let i = 0; i < n; i++) {
    console.log(`Iter ${i}`);
  }

  res.sendStatus(200);
});
```

Exemplo 3: Um callback `O(n^2)`. Este callback ainda será executado rapidamente para pequenos `n`, mas para grandes `n`, será executado muito mais lentamente que o exemplo anterior `O(n)`.

```javascript
app.get('/countToN2', (req, res) => {
  let n = req.query.n;

  // n^2 iterations before giving someone else a turn
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(`Iter ${i}.${j}`);
    }
  }

  res.sendStatus(200);
});
```

### Quão cuidadoso você deve ser?
O Node usa a engine V8 do Google para JavaScript, o que é bastante rápido para muitas operações comuns.
Exceções a esta regra são regexps e operações JSON, discutidas abaixo.

No entanto, para tarefas complexas, considere limitar a entrada e rejeitar entradas muito longas.
Dessa forma, mesmo que seu callback tenha grande complexidade, limitando a entrada, você garante que o callback não pode demorar mais do que o pior caso na entrada aceitável mais longa.
Você pode avaliar o pior caso desse callback e determinar se o tempo de execução é aceitável no seu contexto.

### Bloqueando o Event Loop: REDOS
Uma maneira comum de bloquear desastrosamente o Event Loop é usar uma [expressão regular](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) "vulnerável".

#### Evitando expressões regulares vulneráveis
Uma expressão regular (regexp) corresponde a uma sequência de entrada diante de um padrão.
Geralmente pensamos em uma combinação regexp exigindo uma única passagem pela string de entrada --- tempo `O(n)` em que `n` é o comprimento da string de entrada.
Em muitos casos, basta uma única passegem.
Infelizmente, em alguns casos, a correspondência regexp pode exigir um número exponencial de viagens pela string de entrada ---  tempo `O(2^n)`.
Um número exponencial de viagens significa que, se o mecanismo exigir `x` viagens para determinar uma correspondência, serão necessárias `2*x` viagens se adicionarmos apenas mais um caractere à string de entrada.
Como o número de viagens está linearmente relacionado ao tempo necessário, o efeito dessa avaliação será bloquear o Event Loop.

Uma *expressão regular vulnerável* é aquela em que seu mecanismo de expressão regular pode levar um tempo exponencial, expondo você a [REDOS](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS) no "evil input".
Se o seu padrão de expressão regular é vulnerável (ou seja, o mecanismo regexp pode levar um tempo exponencial) é realmente uma pergunta difícil de responder e varia dependendo de você estar usando Perl, Python, Ruby, Java, JavaScript, etc., mas aqui estão algumas regras práticas que se aplicam a todas essas linguagens:

1. Evite quantificadores aninhados como `(a+)*`. O mecanismo regexp do Node pode lidar com alguns deles rapidamente, mas outros são vulneráveis.
2. Evite OR's com cláusulas sobrepostas, como `(a|a)*`. Novamente, esses nem sempre são rápidos.
3. Evite usar referências anteriores, como `(a.*) \1`. Nenhum mecanismo regexp pode garantir a avaliação em tempo linear.
4. Se você estiver fazendo uma correspondência simples de string, use `indexOf` ou o equivalente local. Será mais barato e nunca levará mais que `O(n)`.

Se você não tiver certeza se sua expressão regular é vulnerável, lembre-se de que o Node geralmente não tem problemas para relatar uma *correspondência*, mesmo para uma regexp vulnerável e uma longa string de entrada.
O comportamento exponencial é acionado quando há uma incompatibilidade, mas o Node não pode ter certeza até que tente muitos caminhos pela string de entrada.

#### Um exemplo de REDOS
Aqui está um exemplo de regexp vulnerável, expondo seu servidor ao REDOS:

```javascript
app.get('/redos-me', (req, res) => {
  let filePath = req.query.filePath;

  // REDOS
  if (fileName.match(/(\/.+)+$/)) {
    console.log('valid path');
  }
  else {
    console.log('invalid path');
  }

  res.sendStatus(200);
});
```

O regexp vulnerável neste exemplo é uma maneira (ruim!) de verificar um caminho válido no Linux.
Corresponde as strings que são uma sequência de nomes delimitados por "/", como "/a/b/c".
Isso é perigoso porque viola a regra 1: possui um quantificador duplamente aninhado.

Se um cliente consulta com filePath `///.../\n` (100 /'s seguidos por um caractere de quebra de linha que o "." da regexp não corresponda), o Event Loop levará efetivamente para sempre, bloqueando o Event Loop.
O ataque REDOS deste cliente faz com que todos os outros clientes não tenham sua vez até que a correspondência de regexp termine.

Por esse motivo, você deve desconfiar do uso de expressões regulares complexas para validar a entrada do usuário.

#### Recursos anti-REDOS
Existem algumas ferramentas para verificar a segurança de seus regexps, como

* [safe-regex](https://github.com/substack/safe-regex)
* [rxxr2](http://www.cs.bham.ac.uk/~hxt/research/rxxr2/).

No entanto, nenhum deles capturará todos os regexps vulneráveis.

Outra abordagem é usar um mecanismo diferente de regexp.
Você pode usar o módulo[node-re2](https://github.com/uhop/node-re2), que usa o mecanismo de regexp rápido [RE2](https://github.com/google/re2) do Google .
Mas esteja avisado, o RE2 não é 100% compatível com os regexps do Node, portanto, verifique as regressões se você trocar para o módulo node-re2 para manipular seus regexps.
E regexps particularmente complicados não são suportados pelo node-re2.

Se você estiver tentando corresponder a algo "óbvio", como uma URL ou um caminho de arquivo, encontre um exemplo em uma [biblioteca regexp](http://www.regexlib.com) ou use um módulo npm, por exemplo [ip-regex](https://www.npmjs.com/package/ip-regex).

### Bloqueando o Event Loop: módulos principais do Node
Vários módulos principais do Node têm APIs síncronas custosas, incluindo:

* [Encryption](https://nodejs.org/api/crypto.html)
* [Compression](https://nodejs.org/api/zlib.html)
* [File system](https://nodejs.org/api/fs.html)
* [Child process](https://nodejs.org/api/child_process.html)

Essas APIs são custosas, porque envolvem computação significativa (criptografia, compactação), exigem I/O (I/O de arquivo) ou potencialmente ambas (child process). Essas APIs destinam-se à conveniência de script, mas não para uso no contexto de servidor. Se você executá-los no Event Loop, eles levarão muito mais tempo para serem concluídos do que uma instrução JavaScript típica, bloqueando o Event Loop.

Em um servidor, *você não deve usar as seguintes APIs síncronas desses módulos*:

* Criptografia:
  * `crypto.randomBytes` (versão síncrona)
  * `crypto.randomFillSync`
  * `crypto.pbkdf2Sync`
  * Você também deve ter cuidado ao fornecer uma entrada grande para as rotinas de criptografia e descriptografia.
* Compression:
* Compressão:
  * `zlib.inflateSync`
  * `zlib.deflateSync`
* Sistema de arquivo:
  * Não use as APIs do sistema de arquivos síncronas. Por exemplo, se o arquivo que você acessar estiver em um [sistema de arquivos distribuído](https://en.wikipedia.org/wiki/Clustered_file_system#Distributed_file_systems) como [NFS](https://en.wikipedia.org/wiki/ Network_File_System), os tempos de acesso podem variar bastante.
* Child process:
  * `child_process.spawnSync`
  * `child_process.execSync`
  * `child_process.execFileSync`

Esta lista está razoavelmente completa a partir do Node v9.

### Bloqueando o Event Loop: JSON DOS
`JSON.parse` e `JSON.stringify` são outras operações potencialmente custosas.
Embora estes sejam `O(n)` no comprimento da entrada, para grandes `n` eles podem demorar surpreendentemente.

Se o servidor manipular objetos JSON, principalmente os de um cliente, você deve ter cuidado com o tamanho dos objetos ou strings com as quais trabalha no Event Loop.

Exemplo: bloqueio de JSON. Criamos um objeto `obj` de tamanho 2^21 e `JSON.stringify`, rodamos `indexOf` na string e, em seguida, JSON.parse. A string `JSON.stringify`'d tem 50 MB. Demora 0,7 segundos para trasformar em string o objeto, 0,03 segundos para indexOf na string de 50 MB e 1,3 segundos para converter a string.

```javascript
var obj = { a: 1 };
var niter = 20;

var before, str, pos, res, took;

for (var i = 0; i < niter; i++) {
  obj = { obj1: obj, obj2: obj }; // Doubles in size each iter
}

before = process.hrtime();
str = JSON.stringify(obj);
took = process.hrtime(before);
console.log('JSON.stringify took ' + took);

before = process.hrtime();
pos = str.indexOf('nomatch');
took = process.hrtime(before);
console.log('Pure indexof took ' + took);

before = process.hrtime();
res = JSON.parse(str);
took = process.hrtime(before);
console.log('JSON.parse took ' + took);
```

Existem módulos npm que oferecem APIs JSON assíncronas. Veja alguns exemplo:

* [JSONStream](https://www.npmjs.com/package/JSONStream), que possui APIs de stream.
* [Big-Friendly JSON](https://www.npmjs.com/package/bfj), que possui APIs de stream e versões assíncronas das APIs JSON padrão usando o paradigma de particionamento no Event Loop descrito abaixo.

### Cálculos complexos sem bloquear o Event Loop
Suponha que você queira fazer cálculos complexos em JavaScript sem bloquear o Event Loop.
Você tem duas opções: particionamento ou descarregamento.

#### Particionamento
Você pode *particionar* seus cálculos para que cada um seja executado no Event Loop, mas produz regularmente (alterna) outros eventos pendentes.
Em JavaScript, é fácil salvar o estado de uma tarefa em andamento em um closure, como mostra o exemplo 2 abaixo.

Para um exemplo simples, suponha que você queira calcular a média dos números `1` até `n`.

Exemplo 1: Média não particionada, custos `O(n)`

```javascript
for (let i = 0; i < n; i++)
  sum += i;
let avg = sum / n;
console.log('avg: ' + avg);
```

Exemplo 2: Média particionada, cada uma das etapas assíncronas `n` custa `O(1)`.

```javascript
function asyncAvg(n, avgCB) {
  // Save ongoing sum in JS closure.
  var sum = 0;
  function help(i, cb) {
    sum += i;
    if (i == n) {
      cb(sum);
      return;
    }

    // "Asynchronous recursion".
    // Schedule next operation asynchronously.
    setImmediate(help.bind(null, i+1, cb));
  }

  // Start the helper, with CB to call avgCB.
  help(1, function(sum){
      var avg = sum/n;
      avgCB(avg);
  });
}

asyncAvg(n, function(avg){
  console.log('avg of 1-n: ' + avg);
});
```

Você pode aplicar esse princípio a iterações de array e assim por diante.

#### Offloading
Se você precisar fazer algo mais complexo, o particionamento não é uma boa opção.
Isso ocorre porque o particionamento usa apenas o Event Loop e você não se beneficiará de vários núcleos quase certamente disponíveis em sua máquina.
*Lembre-se, o Event Loop deve orquestrar requisições de clientes, não atendê-las.*
Para uma tarefa complicada, mova o trabalho do Event Loop para uma Worker Pool.

##### Como fazer offload
Você tem duas opções para uma Work Pool de destino no qual descarregar o trabalho.

1. Você pode usar a Worker Pool built-in do Node desenvolvendo um [addon C++](https://nodejs.org/api/addons.html). Nas versões mais antigas do Node, crie seu complemento C++ usando [NAN](https://github.com/nodejs/nan) e nas versões mais recentes use [N-API](https://nodejs.org/api/n -api.html). [node-webworker-threads](https://www.npmjs.com/package/webworker-threads) oferece uma maneira JavaScript-only para acessar a Worker Pool do Node.
2. Você pode criar e gerenciar sua própria Worker Pool dedicada à computação, em vez da Worker Pool de I/O do Node. As maneiras mais simples de fazer isso são usando [Child Process](https://nodejs.org/api/child_process.html) ou [Cluster](https://nodejs.org/api/cluster.html).

Você *não* deve simplesmente criar um [Child Process](https://nodejs.org/api/child_process.html) para cada cliente.
Você pode receber requisições de clientes mais rapidamente do que criar e gerenciar children, e seu servidor pode se tornar um [fork pump](https://en.wikipedia.org/wiki/Fork_bomb).

##### Desvantagem do offloading
A desvantagem da abordagem de offloading é que ela incorre em custos indiretos na forma de *custos de comunicação*.
Somente o Event Loop tem permissão para ver o "namespace" (estado JavaScript) do sua aplicação.
De um Worker, você não pode manipular um objeto JavaScript no namespace do Event Loop.
Em vez disso, você deve serializar e desserializar todos os objetos que deseja compartilhar.
Em seguida, o Worker pode operar em sua própria cópia desses objetos e retornar o objeto modificado (ou um "patch") ao Event Loop.

Para questões de serialização, consulte a seção JSON DOS.

##### Algumas sugestões para offloading
Você pode fazer uma distinção entre tarefas intensivas em CPU e I/O, porque elas possuem características marcadamente diferentes.

Uma tarefa com uso intenso de CPU só progride quando seu Worker está agendado e o Worker deve ser agendado em um dos [núcleos lógicos](https://nodejs.org/api/os.html#os_os_cpus) da sua máquina .
Se você tiver 4 núcleos lógicos e 5 Workers, um deles não poderá progredir.
Como resultado, você está pagando custos indiretos (memória e custos de agendamento) por este Worker e não recebe retorno por isso.

As tarefas intensivas de I/O envolvem a consulta de um provedor de serviços externo (DNS, sistema de arquivos etc.) e a espera de sua resposta.
Enquanto um Worker com uma tarefa intensiva de I/O está aguardando sua resposta, ele não tem mais nada a fazer e pode ser descontinuado pelo sistema operacional, dando a outro Worker a chance de enviar sua requisição.
Portanto, *as tarefas intensivas em I/O farão progressos mesmo enquanto a thread associada não estiver em execução*.
Os provedores de serviços externos, como bancos de dados e sistemas de arquivos, foram altamente otimizados para lidar com muitas requisições pendentes simultaneamente.
Por exemplo, um sistema de arquivos examinará um grande conjunto de requisições de gravação e leitura pendentes para mesclar atualizações conflitantes e recuperar arquivos em uma ordem ideal (por exemplo, consulte [estes slides](http://researcher.ibm.com/researcher/files/il-AVISHAY/01-block_io-v1.3.pdf)).

Se você confiar em apenas uma Worker Pool, por exemplo, a Worker Pool do Node, as diferentes características do trabalho vinculado à CPU e vinculado à I/O podem prejudicar o desempenho da aplicação.

Por esse motivo, convém manter uma Computation Worker Pool separada.

#### Offloading: concluções
Para tarefas simples, como iterar sobre os elementos de um array arbitrariamente longa, o particionamento pode ser uma boa opção.
Se o seu cálculo for mais complexo, o offloading é uma abordagem melhor: os custos de comunicação, ou seja, a sobrecarga de passagem de objetos serializados entre o Event Loop e a Worker Pool, são compensados pelo benefício do uso de múltiplos núcleos.

No entanto, se o seu servidor depende muito de cálculos complexos, você deve pensar se o Node é realmente boa escolha. O Node é excelente para trabalhos ligados a I/O, mas para cálculos custosos, pode não ser a melhor opção.

Se você adotar a abordagem de offloading, consulte a seção sobre não bloquear a Worker Pool.

## Não bloqueie o Worker Pool
O Node possui uma Worker Pool composto por Workers `k`.
Se você estiver usando o paradigma de Offloading discutido acima, poderá ter uma Computational Worker Pool separado, ao qual os mesmos princípios se aplicam.
Em qualquer um dos casos, vamos supor que `k` seja muito menor do que o número de clientes que você pode estar lidando simultaneamente.
Isso está de acordo com a filosofia "uma thread para muitos clientes" do Node, o segredo de sua escalabilidade.

Conforme discutido acima, cada Worker conclui sua Task atual antes de prosseguir para a próxima na fila da Worker Pool.

Agora, haverá variação no custo das Tasks necessárias para lidar com as requisições dos seus clientes.
Algumas Tasks podem ser concluídas rapidamente (por exemplo, lendo arquivos curtos ou em cache ou produzindo um pequeno número de bytes aleatórios) e outras demoram mais (por exemplo, lendo arquivos maiores ou não em cache ou gerando mais bytes aleatórios).
Seu objetivo deve ser *minimizar a variação nos tempos de Task* e você deve usar *Particionamento de Task* para fazer isso.

### Minimizando a variação no tempo das Tasks
Se a Task atual de um Worker for muito mais custosa que outras Tasks, não estará disponível para trabalhar em outras Tasks pendentes.
Em outras palavras, *cada Task relativamente longa diminui efetivamente o tamanho do Worker Pool até que alguma seja concluída*.
Isso é indesejável porque, até certo ponto, quanto mais Workers na Worker Pool, maior a taxa de transferência da Worker Pool(tarefas/segundo) e, portanto, maior a taxa de transferência do servidor (requisição do cliente/segundo).
Um cliente com uma Task relativamente custosa diminuirá a taxa de transferência do Worker Pool, diminuindo a taxa de transferência do servidor.

Para evitar isso, tente minimizar a variação no comprimento das Tasks enviadas ao Worker Pool.
Embora seja apropriado tratar os sistemas externos acessados por suas requisições de I/O (DB, FS, etc.) como caixas-pretas, você deve estar ciente do custo relativo dessas requisições de I/O, e evite enviar requisições que você espera que sejam particularmente longas.

Dois exemplos devem ilustrar a possível variação nos tempos das tarefas.

#### Exemplo de variação: leituras no sistema de arquivos de longa execução
Suponha que seu servidor precise ler arquivos para lidar com algumas requisições do cliente.
Após consultar as APIs de [File system](https://nodejs.org/api/fs.html) do Node, você optou por usar o `fs.readFile()` para simplificar.
No entanto, `fs.readFile()` é ([atualmente](https://github.com/nodejs/node/pull/17054)) não particionado: ele envia uma única Task `fs.read()` abrangendo todo o arquivo.
Se você ler arquivos mais curtos para alguns usuários e arquivos mais longos para outros, `fs.readFile()` poderá introduzir variações significativas no tamanho das Tasks, em detrimento da taxa de transferência da Worker Pool.

Para o pior cenário, suponha que um atacante possa convencer seu servidor para ler um arquivo *arbitrário* (esta é uma [directory traversal vulnerability](https://www.owasp.org/index.php/Path_Traversal)).
Se o seu servidor estiver executando o Linux, o atacante poderá nomear um arquivo extremamente lento: [`/dev/random`](http://man7.org/linux/man-pages/man4/random.4.html).
Para todos os propósitos práticos, `/dev/random` é infinitamente lento, e todo Worker solicitado a ler em `/dev/random` nunca terminará essa tarefa.
Um atacante envia requisições `k`, uma para cada Work, e nenhuma outra requisição de cliente que use a Worker Pool fará progresso.

#### Exemplo de variação: operações de criptografia de longa execução
Suponha que seu servidor gere bytes aleatórios criptograficamente seguros usando [`crypto.randomBytes()`](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback).
O `crypto.randomBytes()` não é particionado: ele cria uma única Task `randomBytes()` para gerar quantos bytes você solicitou.
Se você criar menos bytes para alguns usuários e mais bytes para outros, `crypto.randomBytes()` é outra fonte de variação no tamanho das Tasks.

### Particionamento de Task
Tasks com custos variáveis de tempo podem prejudicar a taxa de transferência da Worker Pool.
Para minimizar a variação no tempo das Tasks, na medida do possível, você deve *particionar* cada Task em sub-Tasks com custo comparável.
Quando cada sub-Task for concluída, ela deverá enviar a próxima sub-Task e, quando a sub-Task final for concluída, deverá notificar o remetente.

Para continuar o exemplo de `fs.readFile()`, você deve usar `fs.read()` (particionamento manual) ou `ReadStream` (particionado automaticamente).

O mesmo princípio se aplica às tarefas ligadas à CPU; o exemplo `asyncAvg` pode ser inadequado para o Event Loop, mas é adequado para a Worker Pool.

Quando você particiona uma Task em sub-Tasks, as Tasks mais curtas se expandam para um pequeno número de sub-Tasks, e as Tasks mais longas se expandem para um número maior de sub-Tasks.
Entre cada sub-Task de uma Task mais longa, o Worker ao qual foi designado pode trabalhar em uma sub-Task de outra Task mais curta, melhorando assim o rendimento geral da Task da Worker Pool.

Observe que o número de sub-Tasks concluídas não é uma métrica útil para a taxa de transferência da Worker Pool.
Em vez disso, preocupe-se com o número de *Tasks* concluídas.

### Evitando o particionamento de Tasks
Lembre-se de que o objetivo do particionamento de Tasks é minimizar a variação no tempo das Tasks.
Se você conseguir distinguir entre Tasks mais curtas e Tasks mais longas (por exemplo, somar um array versus ordenar um array), poderá criar uma Worker Pool para cada classe de Task.
O roteamento de Tasks mais curtas e tarefas mais longas para separar na Worker Pool é outra maneira de minimizar a variação do tempo da Task.

Em favor dessa abordagem, o particionamento de Tasks incorre em sobrecarga (os custos de criação de uma representação de Task da Worker Pool e de manipulação de fila da Worker Pool) e evitar o particionamento economiza os custos de passagens adicionais na Worker Pool.
Também evita que você cometa erros ao particionar suas Tasks.

A desvantagem dessa abordagem é que os Workers em todas essas Worker Pools sofrerão sobrecarga de espaço e tempo e competirão entre si pelo tempo de CPU.
Lembre-se de que cada Task vinculada à CPU só progride enquanto está agendada.
Como resultado, você só deve considerar essa abordagem após uma análise cuidadosa.

### Worker Pool: conclusões
Se você usa apenas a Worker Pool do Node ou mantém Worker Pools separadas, você deve otimizar a taxa de transferência de Task dos seus Pool(s).

Para fazer isso, minimize a variação nos tempos da Task usando o particionamento de Tasks.

## Os riscos dos módulos npm
Enquanto os módulos principais do Node oferecem blocos de construção para uma ampla variedade de aplicações, às vezes é necessário algo mais. Os desenvolvedores de Node se beneficiam enormemente do [ecosistema npm](https://www.npmjs.com/), com centenas de milhares de módulos oferecendo funcionalidade para acelerar seu processo de desenvolvimento.

Lembre-se, no entanto, que a maioria desses módulos é escrita por desenvolvedores de terceiros e geralmente é liberada com apenas com o minímo necessário para funcionar. Um desenvolvedor que usa um módulo npm deve se preocupar com duas coisas, embora este último seja frequentemente esquecido.

1. Honra suas APIs?
2. Suas APIs podem bloquear o Event Loop ou um Worker?

Muitos módulos não fazem nenhum esforço para indicar o custo de suas APIs, em detrimento da comunidade.

Para APIs simples, você pode estimar seus custo; o custo da manipulação de string não é difícil de entender.
Mas, em muitos casos, não está claro quanto uma API pode custar.

*Se você está chamando uma API que pode fazer algo pesado, verifique o custo. Peça aos desenvolvedores para documentá-lo ou examine você mesmo o código-fonte (e envie um PR documentando o custo).*

Lembre-se, mesmo que a API seja assíncrona, você não sabe quanto tempo ela passará em um Worker ou no Event Loop em cada uma de suas partições.
Por exemplo, suponha que no exemplo `asyncAvg` dado acima, cada chamada para a função auxiliar somasse *metade* dos números em vez de um deles.
Então essa função ainda seria assíncrona, mas o custo de cada partição seria `O(n)`, não `O(1)`, tornando muito menos seguro o uso de valores arbitrários de `n`.

## Conclusão
O Node possui dois tipos de threads: um Event Loop e `k` Workers.
O Event Loop é responsável por callbacks JavaScript e I/O não bloqueante, e um Worker executa tarefas correspondentes ao código C++ que conclui uma requisição assíncrona, incluindo o bloqueio de I/O e usos intensivos da CPU.
Ambos os tipos de threads funcionam em não mais de uma atividade por vez.
Se qualquer callback ou tarefa demorar muito, a thread em execução será *bloqueada*.
Se o sua aplicacão efetuar callbacks ou tarefas bloqueantes, isso pode levar a uma taxa de transferência degradada (clientes/segundo) na melhor das hipóteses, e na negação de serviço completa na pior das hipóteses.

Para escrever um servidor web com alta taxa de transferência, mais à prova de DoS, você deve garantir que nas entradas benignas e maliciosas, nem o Event Loop nem os Workers sejam bloqueados.
