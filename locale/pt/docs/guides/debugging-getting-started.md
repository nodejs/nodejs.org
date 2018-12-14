---
title: depuração-começar
layout: docs.hbs
---

 Guia De Depuração

Este guia irá ajudá-lo a iniciar a depuração do seu nó.aplicações e guiões js.

# Activar Inspector

Quando começou com o botão** --inspect**, um nó.o processo js escuta através de WebSockets
para comandos de diagnóstico definidos pelo Protocolo [Inspector]][],
por padrão na máquina e porta 127.0.0.1: 9229. Cada processo é também atribuído um
unique [UUID][] (por exemplo, "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e").

Os clientes do Inspector devem saber e especificar o endereço da máquina, o porto e o UUID para se ligar
para a interface WebSocket. O URL completo é
`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`, obviamente, dependente
na máquina e Porto reais e com o UUID correto, por exemplo.

O Inspector também inclui um ponto final HTTP para servir os meta-dados sobre o depurador,
incluindo o seu URL WebSocket, UUID e URL DevTools Chrome. Obter estes metadados
enviando um pedido HTTP para ' http://[host: port] / json / list`.  Isto devolve a
Objecto JSON como o seguinte; use a propriedade` websocket-duggerurl ' como a
URL a ligar directamente ao Inspector.

<!-- eslint-skip -->
```Forum
{
  "description": "node.instância js",
  "devtoolsFrontendUrl": "chrome-devtools://devtools / bundled / inspector.html?experimentos=true&v8only=true&ws=127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
  "faviconUrl": "https://nodejs.org/static/favicon.ico",
  "id": "0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e",
  "título": "nó",
  "tipo": "nó",
  ficheiro" url":"://",
  "webSocketDebuggerUrl": "ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e"
}
``

no.o processo js iniciado *sem * ' --inspect` também pode ser instruído para iniciar
à procura de mensagens de depuração, assinalando-a com ' SIGUSR1` (no Linux e
OS X). A partir do nó 7 isso ativa a API do depurador legado; no nó 8 e mais tarde
vai activar a API do Inspector.

---
## Implicações De Segurança

Uma vez que o depurador tem acesso total ao nó.ambiente de execução js, a
um actor malicioso capaz de se ligar a esta porta pode ser capaz de executar arbitrariamente
código em nome do processo do nó. É importante compreender a segurança
implicações de expor a porta do depurador em redes públicas e privadas.

## Expor o porto de depuração publicamente é inseguro

Se o depurador estiver ligado a um endereço IP público, ou a 0.0.0.0, quaisquer clientes que
pode chegar ao seu endereço IP será capaz de se conectar ao depurador sem qualquer
restriction and will be able to run arbitrary code.

Por omissão, o 'node --inspect' liga-se ao 127.0. 0. 1. Você precisa fornecer um
endereço IP público ou 0.0.0.0, etc., se você pretende permitir ligações externas
para o depurador. Fazê-lo pode expor-lhe uma segurança potencialmente significativa
ameaca. Nós sugerimos que você assegure firewalls apropriados e controles de acesso no lugar
para evitar uma exposição de segurança.

Ver a secção "[Activar cenários de depuração remota] (#activar-cenários de depuração remota) " sobre alguns conselhos sobre como
para permitir a ligação segura dos clientes do depurador remoto.

### Aplicações locais têm acesso total ao Inspetor

Mesmo se você ligar o porto do inspetor para 127.0.0.1( o padrão), quaisquer aplicações
executando localmente em sua máquina terá acesso ilimitado. Isto é por design
para permitir que os depuradores locais sejam capazes de anexar convenientemente.

### Navegadores , WebSocket e política de mesma origem

Os Websites abertos num navegador web podem fazer pedidos de WebSocket e HTTP sob a
modelo de segurança do navegador. É necessária uma ligação HTTP inicial para obter um
id de sessão do depurador único. A mesma-origem-política impede sites de ser
capaz de fazer esta conexão HTTP. Para uma garantia adicional contra
[DNS refunding attacks](https://en.wikipedia.org/wiki/DNS_rebinding), Node.js
verifica se os cabeçalhos' Host ' da ligação:
indique com precisão um endereço IP ou "localhost" ou "localhost6".

Estas políticas de segurança não permitem a ligação a um servidor de depuração remoto por
a indicar o nome da máquina. Você pode contornar esta restrição, especificando
o endereço IP ou utilizando túneis ssh, como descrito abaixo.

# Inspector Clientes

Várias ferramentas comerciais e de código aberto podem se conectar ao inspetor do Node. Basico
informações sobre estes::

#### [nó-inspecionar](https://github.com/nodejs/node-inspect)

* Depurador de CLI suportado pelo nó.Fundação js que utiliza o [protocolo Inspector] [].
* A version is bundled with Node and can be used with ' node inspect myscript.js`.
* A versão mais recente também pode ser instalada de forma independente (por exemplo, ' npm install-g node-inspect`)
  e usado com ' node-inspect myscript.js`.

###[DevTools cromados](https://github.com/ChromeDevTools/devtools-frontend) 55+

* * * Opção 1**: abrir o 'cromo: / / inspeccionar' numa base de crómio
  navegador. Carregue no botão Configurar e garanta a sua máquina e porto de destino
  estão listados.
* * * Opção 2**: copiar o 'devtoolsFrontendUrl' do resultado de ' / json / list`
  (ver acima) ou o texto --inspeccionar dica e colar no cromo.
** * Opção 3**: Instalar a extensão Chrome NIM (Gerenciador de inspetores de nós)):  
  https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

###[Visual Studio Code](https://github.com/microsoft/vscode) 1, 10+

* No painel de depuração, carregue no ícone de configuração para abrir`.vscode / launch.json.
  Seleccionar "Nó".js " para configuração inicial.

###[Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* Escolha "Debug > Iniciar Depuração" do menu ou carregue em F5.
* [Instruções pormenorizadas](https://github.com/Microsoft/nodejstools/wiki/Debugging).

#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ e outros JetBrains IDEs

* Criar um novo nó.configuração de depuração do js e carregue em depuração. será utilizado o ' --inspect` 
  por omissão para o nó.js 7+. Para desactivar o `js'.depurador.no.usar.inspeccionar ' em
  o registo de IDE.

#### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* Library to ease connections to Inspector Protocol endpoints.

---

## Opções da linha de comandos

A tabela seguinte lista o impacto de várias opções de execução na depuração:

<table cellpadding= " 0 "cellspacing= "0">
  <tr><th>bandeira</th>Significado</th></th> < / TH>
  <tr>
    < td>--inspect< / td>
    < td>
      <ul>
        activar o agente inspector< / li>
        < li>ouvir o endereço e Porto predefinidos (127. 0. 0. 1:9229)< / li>
      < / ul>
    < / td>
  < / tr>
  <tr>
    < td>--inspect= < i>[host: port] < / i>< / td>
    < td>
      <ul>
        activar o agente inspector< / li>
        <li>Bind to address or hostname <I>host</i> (por omissão: 127. 0. 0. 1)</li>
        < li>escutar no porto < i>porto< / i> (por omissão: 9229)< / li>
      < / ul>
    < / td>
  < / tr>
  <tr>
    inspecionar-brk
    < td>
      <ul>
        activar o agente inspector< / li>
        < li>ouvir o endereço e Porto predefinidos (127. 0. 0. 1:9229)< / li>
        quebra antes do início do Código do utilizador< / li>
      < / ul>
    < / td>
  < / tr>
  <tr>
    < td>--inspect-brk= < I > [host: port] < / I></td>
    < td>
      <ul>
        activar o agente inspector< / li>
        <li>Bind to address or hostname <I>host</i> (por omissão: 127. 0. 0. 1)</li>
        < li>escutar no porto < i>porto< / i> (por omissão: 9229)< / li>
        quebra antes do início do Código do utilizador< / li>
      < / ul>
    < / td>
  < / tr>
  <tr>
    <td><code>node inspect < i>script.js< / i> < / código> < / td>
    < td>
      <ul>
        <li>processo-filho Spawn para executar o programa do utilizador sob a opção --inspect;
            e usar o processo principal para executar o depurador de CLI.</li>
      < / ul>
    < / td>
  < / tr>
  <tr>
    <td><code>node inspect --port=xxxx < I>script.js< / i> < / código> < / td>
    < td>
      <ul>
        <li>processo-filho Spawn para executar o programa do utilizador sob a opção --inspect;
            e usar o processo principal para executar o depurador de CLI.</li>
        < li>escutar no porto < i>porto< / i> (por omissão: 9229)< / li>
      < / ul>
    < / td>
  < / tr>
</tabela>

---

## Activar cenários de depuração remota

Recomendamos que você nunca tenha o depurador ouvir em um endereço IP público. Se
você precisa permitir conexões de depuração remota que recomendamos o uso de ssh
túneis em vez disso. Nós fornecemos o seguinte exemplo apenas para fins ilustrativos.
Por favor, entenda o risco de segurança de permitir o acesso remoto a um privilegiado
serviço antes de prosseguir.

Digamos que estás a executar o nó na máquina remota. remote.example.com, que tu
quer ser capaz de depurar. Nessa máquina, você deve iniciar o processo de nó
com o inspector a ouvir apenas o localhost (por omissão).

```bater
$ node --inspect server.js
``

Agora, na sua máquina local de onde quer iniciar um cliente de depuração
ligação, você pode configurar um túnel ssh:

```bater
$ ssh - l 9221: localhost: 9229 user@remote.example.com
``

Isto inicia uma sessão de túnel ssh onde uma ligação à porta 9221 na sua zona
a máquina será encaminhada para o porto 9229 em remote.example.com. Agora pode anexar
um depurador como o Chrome DevTools ou o Visual Studio Code to localhost: 9221,
que deve ser capaz de depurar como se o nó.a aplicação js estava a correr localmente.

---

## Depurador Legado

**O depurador legado foi desactualizado a partir do nó 7.7.0. Por favor use --inspect
e Inspector em vez disso.**

Quando começou com o** --debug **ou** --debug-brk * * comutadores na versão 7 e
mais cedo, Nodo.o js ouve os comandos de depuração definidos pela opção descontinuada
V8 Debugging Protocol on a TCP port, by default `5858`. Qualquer cliente do depurador
o que fala este protocolo pode ligar-se e depurar o processo em execução; a
alguns populares estão listados abaixo.

O protocolo de depuração V8 não é mais mantido ou documentado.

#### [Embutido depurador] (https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Iniciar o programa de depuração do nó.js ' para iniciar o seu programa sob a compilação do nodo
depurador de linha de comandos. O seu programa começa noutro processo de nó iniciado com
a opção '--debug-brk', e o processo de nó inicial executa o `_debugger.js`
script e conecta-se ao seu alvo.

#### [nó-Inspetor](https://github.com/node-inspector/node-inspector)

Depurar o seu nó.aplicação js com DevTools Chrome utilizando um processo intermediário
o que traduz o protocolo do Inspector usado no crómio para o depurador V8
protocolo usado no nó.js.

<!-- arbitro>-- 

[Protocolo Inspector]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122