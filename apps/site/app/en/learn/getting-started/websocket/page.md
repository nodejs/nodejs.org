---
title: Node.js WebSocket
layout: learn
authors: callezenwaka
---

# Native WebSocket Client in Node.js

## Introduction

Since [Node.js v21](https://github.com/nodejs/node/blob/47a59bde2aadb3ad1b377c0ef12df7abc28840e9/doc/changelogs/CHANGELOG_V21.md#L1329-L1345), the [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) has been enhanced using the [Undici](https://undici.nodejs.org) library, introducing a built-in WebSocket client. This simplifies real-time communication for Node.js applications. In [Node.js v22.4.0](https://github.com/nodejs/node/releases/tag/v22.4.0) release, the WebSocket API was marked as stable, indicating it's ready for production use.

## What is a WebSocket

[WebSocket](https://en.wikipedia.org/wiki/WebSocket) is a standardized communication protocol that enables simultaneous two-way communication over a single TCP connection. It has full-duplex or bi-directional capabilities that distinguishes it from HTTP. WebSocket achieves HTTP compatibility by using the HTTP Upgrade header to transition protocols. It allows servers to push content to clients without initial requests and maintains open connections for continuous message exchange, making it ideal for real-time data transfer with lower overhead than alternatives like HTTP polling. WebSocket communications typically occur over TCP ports 443 (secured) or 80 (unsecured), helping bypass firewall restrictions on non-web connections. The protocol defines its own URI schemes (ws:// and wss://) for unencrypted and encrypted connections respectively and supported by all major browsers.

## Native WebSocket Client

Node.js can now act as a WebSocket `client` without relying on external libraries like [ws](https://www.npmjs.com/package/ws) or [socket.io](https://www.npmjs.com/package/socket.io) for client connections. This allows Node.js applications to initiate and manage outgoing WebSocket connections directly, streamlining tasks such as connecting to real-time data feeds or interacting with other WebSocket servers. Users can now create a websocket client connection with the standard [new WebSocket()](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket) constructor.

Building on the above, let's add more practical examples to demonstrate the new WebSocket client functionality that demonstrates basic use-cases.

### Basic Connection and Message Handling

```javascript
// Creates a new WebSocket connection to the specified URL.
const socket = new WebSocket('ws://localhost:8080');

// Executes when the connection is successfully established.
socket.addEventListener('open', event => {
  console.log('WebSocket connection established!');
  // Sends a message to the WebSocket server.
  socket.send('Hello Server!');
});

// Listen for messages and executes when a message is received from the server.
socket.addEventListener('message', event => {
  console.log('Message from server: ', event.data);
});

// Executes when the connection is closed, providing the close code and reason.
socket.addEventListener('close', event => {
  console.log('WebSocket connection closed:', event.code, event.reason);
});

// Executes if an error occurs during the WebSocket communication.
socket.addEventListener('error', error => {
  console.error('WebSocket error:', error);
});
```

### Sending and Receiving JSON Data

```javascript
const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', () => {
  const data = { type: 'message', content: 'Hello from Node.js!' };
  socket.send(JSON.stringify(data));
});

socket.addEventListener('message', event => {
  try {
    const receivedData = JSON.parse(event.data);
    console.log('Received JSON:', receivedData);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    console.log('Received data was:', event.data);
  }
});
```

The `javascript` code above demonstrates sending and receiving [JSON](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON) data, which is common in WebSocket applications. It uses [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) to convert JavaScript objects to JSON strings before sending. And converts the received string back to a JavaScript object with [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse). Finally, it includes error handling for JSON parsing.

This offers reduced dependency management and improved compatibility. Developers can avoid installing and maintaining additional WebSocket client libraries. The built-in implementation aligns with modern web standards, ensuring better interoperability. The enhancement focuses on the client-side of WebSocket communication, enabling Node.js to act as a WebSocket client.

## Important to Understand

Node.js v22 **does not** provide a built-in native WebSocket server implementation. To create a WebSocket server that accepts incoming connections from web browsers or other clients, one still need to use libraries like [ws](https://www.npmjs.com/package/ws) or [socket.io](https://www.npmjs.com/package/socket.io). This means that while Node.js can now easily **connect** to WebSocket servers, it still requires external tools to **become** a WebSocket server.

## In Summary

Node.js v22 empowers applications to seamlessly interact with WebSocket servers as `clients`, but the creation of WebSocket servers within Node.js remains dependent on established libraries. This distinction is crucial for developers to understand when implementing real-time communication in their Node.js projects.
