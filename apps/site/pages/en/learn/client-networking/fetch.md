---
title: Node.js Fetch
layout: learn
authors: benhalverson, LankyMoose
---

# Using the Fetch API with Undici in Node.js

## Introduction

In this guide, we will learn how to use the Fetch API with Undici in Node.js. The Fetch API is a modern interface that allows you to make HTTP requests in the browser. It is similar to the XMLHttpRequest object, but with a more powerful and flexible feature set. Undici is a high-performance HTTP/1.1 client that is designed to be used with Node.js. It is built on top of the HTTP/1.1 parser from Node.js core, and it provides a simple and efficient API for making HTTP requests.

## Why use Undici?

[Undici](https://undici.nodejs.org) is a high-performance HTTP client for Node.js. While Node.js 18+ ships with a built-in Fetch API.

```mjs
import { fetch } from 'undici';

async function main() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  console.log(data);
}

main().catch(console.error);
```

## Customizing the Fetch API with Undici

Undici allows you to customize the Fetch API by providing options to the `fetch` function. For example, you can set custom headers, set the request method, and set the request body. Here is an example of how you can customize the Fetch API with Undici:

```mjs
import { Pool } from 'undici';

const ollamaPool = new Pool('http://localhost:11434', {
  connections: 10,
});

async function streamOllamaCompletion(prompt) {
  const { statusCode, body } = await ollamaPool.request({
    path: '/api/generate',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, model: 'deepseek-r1:8b' }),
  });

  if (statusCode !== 200) {
    throw new Error(`Ollama request failed with status ${statusCode}`);
  }

  let partial = '';

  const decoder = new TextDecoder();
  for await (const chunk of body) {
    partial += decoder.decode(chunk, { stream: true });
    console.log(partial);
  }

  console.log('Streaming complete.');
}

try {
  await streamOllamaCompletion('What is recursion?');
} catch (error) {
  console.error('Error calling Ollama:', error);
} finally {
  console.log('Closing Ollama pool.');
  ollamaPool.close();
}
```

## Streaming Responses with Undici

```mjs
import { stream } from 'undici';
import { Writable } from 'stream';

async function fetchGitHubRepos() {
  const url = 'https://api.github.com/users/nodejs/repos';

  const { statusCode } = await stream(
    url,
    {
      method: 'GET',
      headers: {
        'User-Agent': 'undici-stream-example',
        Accept: 'application/json',
      },
    },
    () => {
      let buffer = '';

      return new Writable({
        write(chunk, encoding, callback) {
          buffer += chunk.toString();

          try {
            const json = JSON.parse(buffer);
            console.log(
              'Repository Names:',
              json.map(repo => repo.name)
            );
            buffer = '';
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }

          callback();
        },
        final(callback) {
          console.log('Stream processing completed.');
          callback();
        },
      });
    }
  );

  console.log(`Response status: ${statusCode}`);
}

fetchGitHubRepos().catch(console.error);
```
