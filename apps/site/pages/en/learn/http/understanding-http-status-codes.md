---
title: Understanding HTTP Status Codes
layout: learn
authors: raghavexe
---

# Understanding HTTP status codes

The purpose of this guide is to provide a clear understanding of HTTP status
codes and how to use them effectively when building servers in Node.js.
If you’ve followed along with [`Anatomy of an HTTP Transaction`](https://nodejs.org/en/learn/http/anatomy-of-an-http-transaction), you’ve already seen how to send responses to clients. This article builds on that foundation by exploring how to communicate meaningful outcomes through proper HTTP status codes.

## What Are Status Codes?

Every HTTP response begins with a three-digit status code. These codes tell the client whether the request succeeded, failed, or requires further action. Without them, clients wouldn’t know what to do with your response.

In Node.js, a response’s status code is controlled through the
`statusCode` property:

```js
response.statusCode = 200;
response.end('OK');
```

If you don't set a status code yourself Node.js defaults to utilizing 200

## Categories within status codes

Status codes are grouped by their first digit into five classes.
Each class represents a different type of outcome.

### 1XX Informational

These indicate that the server has received the request and is continuing to process it. Although rarely used manually, Node.js supports them through the [`writeContinue`](https://nodejs.org/api/http.html#event-checkcontinue)

`100 Continue` Used with large uploads to tell the client to proceed.

`101 Switching protocols` Indicates protocol upgrade, e.g. for WebSockets

### 2XX Success

These indicate that the request was successfully received, understood and accepted

`200 OK` The request succeeded

`201 Created` A new resource was created

```js
response.statusCode = 201;
response.end('user created');
```

`202 Accepted for processing` The request was received but not yet processed

`204 No content` The request was received but there was no response body

### 3XX Redirect

Tells the client that it must take additional action to complete the request

`301 Moved Permanently` The resource has moved to a new URL

`302 Found` temporary redirect

```js
response.writeHead(302, { Location: '/login' });
response.end();
```

`307 Temporary redirect & 308 Permanent redirect` Similar to the codes above, but in this case it preserves the prior request body

Traditional redirect codes like `301` and `302` may cause clients (like browsers) to change the request method to GET, even if the original request was a POST.

This can lead to unintended behavior when sending form data or JSON payloads. To address this, HTTP introduced the `307 Temporary Redirect` and `308 Permanent Redirect` codes, which preserve the original HTTP method and body when following the redirect. This ensures that a POST request remains a POST after the redirect, making these codes safer for situations where the method and data must be retained.

### 4XX Client error

Used when the client sent a bad request

`400 Bad request` The request body was malformed

`401 Unauthorized` The request requires authentication. The client must provide valid credentials.

`403 Forbidden` The server understood the request but refuses to process or respond the request

`404 Not found` The requested resource doesn't exist

`429 Too many requests` The user has sent too many requests

### 5XX Server related errors

Indicates that the server was unable to fulfill a valid request

`500 Internal server error` A generic server related error

`502 Bad gateway` Invalid response from the upstream server

`503 Service unavailable` The server is currently overloaded with requests or the server is under maintenance

`504 Gateway timeout` The upstream server did not respond in time

## Setting status codes

There are two commonly used ways to set a status code

```js
response.statusCode = 200;
response.end('OK');
```

or

```js
response.writeHead(404, { 'Content-Type': 'application/json' });
response.end(JSON.stringify({ message: 'OK' }));
```

## Example: routing with a proper status codes

```mjs
import http from 'node:http';

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
  } else if (req.url === '/users' && req.method === 'POST') {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end('User created');
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(8080);
```

```cjs
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
  } else if (req.url === '/users' && req.method === 'POST') {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User created' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

## Why it is important to utilize status codes

HTTP status codes are the backbone of web communication.
By choosing the correct code for each situation, your Node.js applications become more predictable and debuggable.
