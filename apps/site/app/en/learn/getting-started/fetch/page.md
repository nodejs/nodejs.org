---
title: Node.js Fetch
layout: learn
authors: benhalverson, LankyMoose
---

# Using the Fetch API with Undici in Node.js

## Introduction

[Undici](https://undici.nodejs.org) is an HTTP client library that powers the fetch API in Node.js. It was written from scratch and does not rely on the built-in HTTP client in Node.js. It includes a number of features that make it a good choice for high-performance applications.

For information on Undici's specification compliance, see the [Undici documentation](https://undici.nodejs.org/#/?id=specification-compliance-1).

## Basic GET Usage

```js
async function main() {
  // Like the browser fetch API, the default method is GET
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  console.log(data);
  // returns something like:
  //   {
  //   userId: 1,
  //   id: 1,
  //   title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  //   body: 'quia et suscipit\n' +
  //     'suscipit recusandae consequuntur expedita et cum\n' +
  //     'reprehenderit molestiae ut ut quas totam\n' +
  //     'nostrum rerum est autem sunt rem eveniet architecto'
  // }
}

main().catch(console.error);
```

## Basic POST Usage

```js
// Data sent from the client to the server
const body = {
  title: 'foo',
  body: 'bar',
  userId: 1,
};

async function main() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'User-Agent': 'undici-stream-example',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log(data);
  // returns something like:
  // { title: 'foo', body: 'bar', userId: 1, id: 101 }
}

main().catch(console.error);
```

## Customizing the Fetch API with Undici

Undici allows you to customize the Fetch API by providing options to the `fetch` function. For example, you can set custom headers, set the request method, and set the request body. Here is an example of how you can customize the Fetch API with Undici:

The [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) function takes two arguments: the URL to fetch and an options object. The options object is the [Request](https://undici.nodejs.org/#/docs/api/Dispatcher?id=parameter-requestoptions) object that you can use to customize the request. The function returns a [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) that resolves to a [Response](https://undici.nodejs.org/#/docs/api/Dispatcher?id=parameter-responsedata) object.

In the following example, we are sending a POST request to the Ollama API with a JSON payload. Ollama is a cli tool that allows you to run LLM's (Large Language Models) on your local machine. You can download it [here](https://ollama.com/download)

```bash
ollama run mistral
```

This will download the `mistral` model and run it on your local machine.

With a pool, you can reuse connections to the same server, which can improve performance. Here is an example of how you can use a pool with Undici:

```js
import { Pool } from 'undici';

const ollamaPool = new Pool('http://localhost:11434', {
  connections: 10,
});

/**
 * Stream the completion of a prompt using the Ollama API.
 * @param {string} prompt - The prompt to complete.
 * @link https://github.com/ollama/ollama/blob/main/docs/api.md
 **/
async function streamOllamaCompletion(prompt) {
  const { statusCode, body } = await ollamaPool.request({
    path: '/api/generate',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, model: 'mistral' }),
  });

  // You can read about HTTP status codes here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
  // 200 means the request was successful.
  if (statusCode !== 200) {
    // consuming the response body is mandatory: https://undici.nodejs.org/#/?id=garbage-collection
    await body.dump();
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

[Streams](https://nodejs.org/docs/v22.14.0/api/stream.html#stream) is a feature in Node.js that allows you to read and write chunks of data.

```js
import { Writable } from 'node:stream';

import { stream } from 'undici';

async function fetchGitHubRepos() {
  const url = 'https://api.github.com/users/nodejs/repos';

  await stream(
    url,
    {
      method: 'GET',
      headers: {
        'User-Agent': 'undici-stream-example',
        Accept: 'application/json',
      },
    },
    res => {
      let buffer = '';

      return new Writable({
        write(chunk, encoding, callback) {
          buffer += chunk.toString();
          callback();
        },
        final(callback) {
          try {
            const json = JSON.parse(buffer);
            console.log(
              'Repository Names:',
              json.map(repo => repo.name)
            );
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
          console.log('Stream processing completed.');
          console.log(`Response status: ${res.statusCode}`);
          callback();
        },
      });
    }
  );
}

fetchGitHubRepos().catch(console.error);
```
