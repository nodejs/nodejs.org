---
title: Introdução ao Node.js
layout: learn
authors: Lucas-Steffen
---

# Introdução ao Node.js

Node.js é um ambiente de execução JavaScript de código aberto e multiplataforma. É uma ferramenta popular para praticamente qualquer tipo de projeto!

O Node.js executa o mecanismo JavaScript V8, o núcleo do Google Chrome, fora do navegador. Isso permite que o Node.js tenha um desempenho muito bom.

Um aplicativo Node.js é executado em um único processo, sem a necessidade de criar uma nova thread para cada requisição. O Node.js fornece um conjunto de primitivas de I/O assíncronas em sua biblioteca padrão que impedem o bloqueio do código JavaScript. Além disso, as bibliotecas em Node.js geralmente são escritas usando paradigmas não bloqueantes. Consequentemente, o comportamento de bloqueio é a exceção, e não a regra, no Node.js.

Quando o Node.js realiza uma operação de I/O, como ler da rede, acessar um banco de dados ou o sistema de arquivos, em vez de bloquear a thread e desperdiçar ciclos de CPU esperando, o Node.js retoma as operações quando a resposta é recebida.

Isso permite que o Node.js lide com milhares de conexões simultâneas em um único servidor sem a sobrecarga de gerenciar a concorrência de threads, o que poderia ser uma fonte significativa de bugs.

O Node.js possui uma vantagem única, pois milhões de desenvolvedores front-end que escrevem JavaScript para o navegador agora podem escrever o código do lado do servidor, além do código do lado do cliente, sem a necessidade de aprender uma linguagem completamente diferente.

No Node.js, os novos padrões ECMAScript podem ser usados ​​sem problemas, pois você não precisa esperar que todos os seus usuários atualizem seus navegadores — você decide qual versão do ECMAScript usar alterando a versão do Node.js, e também pode habilitar recursos experimentais específicos executando o Node.js com flags.

## Um exemplo de aplicação Node.js

O exemplo mais comum de "Olá Mundo" em Node.js é um servidor web:

```cjs
const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`O servidor está rodando em http://${hostname}:${port}/`);
});
```

```mjs
import { createServer } from 'node:http';

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`O servidor está rodando em http://${hostname}:${port}/`);
});
```

Para executar este trecho de código, salve-o como um arquivo `server.js` e execute `node server.js` no seu terminal.
Se você usar a versão mjs do código, deverá salvá-la como um arquivo. `server.mjs` e execute `node server.mjs` no seu terminal.

Este código inclui primeiro o Node.js [`http` module](https://nodejs.org/api/http.html).

O Node.js tem uma fantástica [standard library](https://nodejs.org/api/), Incluindo suporte de primeira classe para redes.

O método `createServer()` do `http` cria um novo servidor HTTP e o retorna.

O servidor está configurado para escutar na porta e no nome do host especificados. Quando o servidor estiver pronto, a função de retorno de chamada é invocada, neste caso, informando que o servidor está em execução.

Sempre que uma nova solicitação é recebida, o [`request` event](https://nodejs.org/api/http.html#http_event_request) é chamada, fornecendo dois objetos: uma solicitação (um [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) object) e uma resposta (uma [`http.ServerResponse`](https://nodejs.org/api/http.html#http_class_http_serverresponse) object).

Esses dois objetos são essenciais para lidar com a chamada HTTP.

O primeiro fornece os detalhes da requisição. Neste exemplo simples, ele não é usado, mas você poderia acessar os cabeçalhos e os dados da requisição.

O segundo é usado para retornar dados para quem fez a chamada.

Neste caso, com:

```js
res.statusCode = 200;
```

Definimos a propriedade `statusCode` como `200`, para indicar uma resposta bem-sucedida.

Definimos o cabeçalho `Content-Type`:

```js
res.setHeader('Content-Type', 'text/plain');
```

E fechamos a resposta, adicionando o conteúdo como um argumento para `end()`:

```js
res.end('Hello World\n');
```

Se você não fez isso ainda, então, [instale](https://nodejs.org/en/download) o Node.js.
