const cloudflareContextSymbol = Symbol.for('__cloudflare-context__');

export async function readFile(path) {
  console.log('fs/promies#readFile', path);

  const { env } = global[cloudflareContextSymbol];

  const text = await env.ASSETS.fetch(
    new URL(`/${path}`, 'https://jamesrocks/')
  ).then(response => response.text());
  return text;
}

export async function readdir(params) {
  console.log('fs/promises#readdir', params);
  return Promise.resolve([]);
}

export async function exists(...args) {
  console.log('fs/promises#exists', args);
  return Promise.resolve(false);
}

export default {
  readdir,
  exists,
  readFile,
};
