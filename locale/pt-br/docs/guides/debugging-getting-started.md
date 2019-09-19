---
title: Debugging - Getting Started
layout: docs.hbs
---

# Guia de debugging

Este guia vai te ajudar a começar a debugar suas aplicações Node.js.

## Ative o inspetor

Quando uma aplicação Node.js for iniciada com a flag `--inspect`, o processo irá
esperar por um client de debugging. Por padrão, ele vai ouvir no host e porta
locais `127.0.0.1:9229`. Cada processo também possuirá um [UUID][] único.

Clients do inspector devem saber e especificar o endereço do host, porta e UUID
para se conectarem. Uma URL completa é mais ou menos assim:
`ws://127.0.0.1:9229/0f2c936f-b1cd-4ac9-aab3-f63b0f33d55e`

O Node.js também irá ouvir mensagens de debugging se o processo receber um sinal do tipo
`SIGUSR1` (o `SIGUSR1` não está disponível no Windows). No Node.js 7 e anteriores, isto
ativa a API legada de debugging. Nas versões 8 para frente, isto vai ativar a API de
inspeção.

---
## Implicações de segurança

Uma vez que o debugger tem total acesso ao ambiente de execução do Node. Um ator
malicioso que tiver acesso a conexão por esta porta pode executar um código qualquer
em nome do processo que está sendo invadido. É importante notar e entender as implicações
de se expor a porta de debugging em redes públicas ou privadas.

### Expor a porta de debugging publicamente é inseguro

Se o debugger está conectado a um endereço de IP público, ou 0.0.0.0, qualquer client
que puder chegar neste endereço vai poder se conectar a ele sem nenhuma restrição e
vai ser capaz de rodar qualquer código.

Por padrão `node --inspect` se liga a `127.0.0.1`. Você precisa explicitamente dar um
endereço de IP ou 0.0.0.0, etc. Se você deseja permitir conexões externas. Fazer isto
pode expor sua aplicação a uma falha de segurança potencialmente significante. Nós
sugerimos que você garante que todos os firewalls e controles de acesso existam e estejam
configurados de acordo para prevenir tal exposição.

Veja a seção sobre '[Ativando cenários de debugging remoto](#enabling-remote-debugging-scenarios)' para dicas de como permitir
de forma segura que outros clients se conectem.

### Aplicações locais tem acesso total ao inspetor

Mesmo que você conecte a porta do inspetor a 127.0.0.1 (o padrão), qualquer aplicação
que rode localmente na sua máquina vai ter acesso sem restrições ao mesmo. Isto foi
desenhado para ser assim para permitir que debuggers locais possam se conectar de forma
mais simples.

### Browsers, websockets e políticas de mesma origem

Sites abertos em um navegador podem fazer requisições via websockets e HTTP
desde que estejam dentro do modelo de segurança do browser. Uma conexão HTTP inicial
é necessária para obter um ID único para uma sessão de debugging. Para mais segurança
contra [ataques de rebinding de DNS](https://en.wikipedia.org/wiki/DNS_rebinding),
o Node.js verifica se o header `Host` para a conexão especificam ou um endereço de IP
que seja exatamente `localhost` ou `localhost6`.

Estas políticas de segurança não permitem a conexão a um servidor de debug remoto
somente especificando o hostname. Você pode contornar essa restrição especificando
ou um IP ou usando um túnel SSH como descrito abaixo.

## Clients de Inspetores

Muitas ferramentas comerciais e open source podem se conectar ao inspetor do Node. Aqui
estão as informações básicas sobre eles:

### [node-inspect](https://github.com/nodejs/node-inspect)

* Um debugger de linha de comando que é mantido pela Node.js Foundation, utiliza o [Protocolo de Inspeção][]
* A última versão pode ser instalada de forma independente (usando `npm install -g node-inspect`) e utilizada com `node-inspect script.js`

#### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend) 55+

* **Opção 1**: Abra uma nova aba em `chrome://inspect` em qualquer navegador baseado no Chromium. Clique no botão `configure` e tenha certeza que sua porta e host estão listados
* **Opção 2**: Copie o `devtoolsFrontendUrl` da saída do `/json/list` (veja acima) ou da flag --inspect e cole no Chrome
* **Opção 3**: Instale a extensão NIM (Node Inspector Manager): https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj

#### [Visual Studio Code](https://github.com/microsoft/vscode) 1.10+

* No painel "Debug", clique no icone de configurações para abrir `./vscode/launch.json`
  Seleciona "Node.js" para o setup inicial

#### [Visual Studio](https://github.com/Microsoft/nodejstools) 2017

* Escolha "Debug > Start Debugging" no menu ou aperte F5
* [Mais detalhes](https://github.com/Microsoft/nodejstools/wiki/Debugging).

#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/) 2017.1+ e outros IDEs da JetBrains

* Crie uma nova configuraçõ de debug para Node.js e aperte o botão "Debug". A flag `--inspect` será usada
  por padrão para o Node.js 7 ou superior. Para desativar esse comportamento, desmarque `js.debugger.node.use.inspect` no registro da IDE.

#### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)

* Biblioteca para facilitar a conexão nos protocolos de inspeção

#### [Gitpod](https://www.gitpod.io)

* Crie uma nova configuração de debug para Node.js a partir da view `Debug` ou aperte `F5`. [Mais instruções aqui](https://medium.com/gitpod/debugging-node-js-applications-in-theia-76c94c76f0a1)

---

## Opções de linha de comando

Abaixo temos a lista de todas as flags que impactam a linha de comando enquanto em debugging:

<table class="table-no-border-no-padding">
  <tr><th>Flag</th><th>Significado</th></tr>
  <tr>
    <td>--inspect</td>
    <td>
      <ul>
        <li>Ative o agente do inspetor</li>
        <li>Ouve no endereço e porta padrões (127.0.0.1:9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect=<em>[host:porta]</em></td>
    <td>
      <ul>
        <li>Ativa o agente do inspetor</li>
        <li>Faz a conexão com o endereço ou hostname descrito em <em>host</em> (padrão: 127.0.0.1)</li>
        <li>Ouve a porta descrita em <em>porta</em> (padrão: 9229)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk</td>
    <td>
      <ul>
        <li>Ativa o agente do inspetor</li>
        <li>Ouve no endereço e porta padrões (127.0.0.1:9229)</li>
        <li>Pausa antes do código do usuário iniciar</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>--inspect-brk=<em>[host:port]</em></td>
    <td>
      <ul>
        <li>Ativa o agente do inspetor</li>
        <li>Faz a conexão com o endereço ou hostname descrito em <em>host</em> (default: 127.0.0.1)</li>
        <li>Ouve na porta descrita por <em>porta</em> (padrão: 9229)</li>
        <li>Pausa antes do código do usuário iniciar</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect <em>script.js</em></code></td>
    <td>
      <ul>
        <li>Inicia um child process para executar um script do usuário sob a flag --inspect; e usa o processo principal para executar o CLI do debugger.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td><code>node inspect --port=xxxx <em>script.js</em></code></td>
    <td>
      <ul>
        <li>Inicia um child process para executar um script do usuário sob a flag --inspect; e usa o processo principal para executar o CLI do debugger.</li>
        <li>Ouve na porta descrita por <em>porta</em> (padrão: 9229)</li>
      </ul>
    </td>
  </tr>
</table>

---

## <!--enabling-remote-debugging-scenarios-->Ativando cenários de debugging remoto

Nós recomendamos que você nunca faça com que o debugger ouça um IP público. Se você
precisar permitir conexões de debug remotas, nós recomendamos que use um túnel SSH.
Os exemplos a seguir são apenas ilustrativos. Por favor entenda que existe um risco
grande de segurança ao permitir acesso a um serviço privilegiado antes de continuar.

Digamos que você esteja executando o Node em uma máquina remota, com o endereço `remoto.exemplo.com`, que
você quer ser capaz de debugar. Nesta máquina, você deve iniciar o processo do node com o inspetor ouvindo
somente o `localhost` (o padrão)

```bash
node --inspect server.js
```

Agora, na sua máquina local, de onde você quer iniciar uma conexão de debug,
crie um tunel SSH:

```bash
ssh -L 9221:localhost:9229 user@remoto.exemplo.com
```

Isso inicia um tunel SSH onde a conexão para a porta 9221 na sua máquina local vai ser
direcionada para a porta 9229 no servidor remoto.exemplo.com. Agora você pode anexar
um debugger, como o Chrome DevTools ou o Visual Studio Code, ao `localhost:9221`,
que deve ser capaz de debugar como se a aplicação estivesse sendo executada localmente.

---

## Debugger legado

**O debugger legado foi depreciado na versão 7.7.0 do Node. Por favor utilize --inspect e
o inspetor ao invés dele**

Quando iniciado com a flag **--debug** ou **--debug-brk** na versão 7 e anteriores,
o Node.js começa a ouvir por comandos de debug definidos pelo protocolo de debug do V8,
que já foi descontinuado, em uma porta TCP que, por padrão, é a `5858`. Qualquer client de debugging
que conversa com esse protocolo pode conectar a ele e debugar um processo sendo executado; abaixo temos
alguns dos mais populares.

### [Debugger nativo](https://nodejs.org/dist/latest-v6.x/docs/api/debugger.html)

Rode como `node debug script.js` para iniciar seu script através do debugger nativo
de linha de comando. Seu script vai ser iniciado em um outro processo do node
que vai ser rodado com a flag `--debug-brk`, e o processo inicial do Node vai executar
o script `_debugger.js` e conectar à sua aplicação.

### [node-inspector](https://github.com/node-inspector/node-inspector)

Utiliza o Chrome DevTools para debugar sua aplicação Node.js através de um processo
intermediário que traduz o protocolo de inspeção utilizado no Chromium para a o
protocolo de debug do V8 utilizado no Node.js.

<!-- refs -->

[Protocolo de Inspeção]: https://chromedevtools.github.io/debugger-protocol-viewer/v8/
[UUID]: https://tools.ietf.org/html/rfc4122
