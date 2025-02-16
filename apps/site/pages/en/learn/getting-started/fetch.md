---
title: Node.js Fetch
layout: learn
authors: benhalverson, LankyMoose
---

# Using the Fetch API with Undici in Node.js

## Introduction

[Unidici](httpss://undici.nodejs.org) is an HTTP client libary that powers the fetch API in Node.js. It was written from scratch and does not rely on the built-in HTTP client in Node.js. It includes a number of features that make it a good choice for high-performance applications.

```mjs
async function main() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  console.log(data);
}

main().catch(console.error);
```

## Customizing the Fetch API with Undici

Undici allows you to customize the Fetch API by providing options to the `fetch` function. For example, you can set custom headers, set the request method, and set the request body. Here is an example of how you can customize the Fetch API with Undici:

With a pool, you can reuse connections to the same server, which can improve performance. Here is an example of how you can use a pool with Undici:

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
