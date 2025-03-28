const cloudflareContextSymbol = Symbol.for('__cloudflare-context__');

export async function readFile(path) {
  const { env } = global[cloudflareContextSymbol];

  // Note: we only care about the url's path, the domain is not relevant here
  const url = new URL(`/${path}`, 'http://0.0.0.0');
  const response = await env.ASSETS.fetch(url);
  const text = await response.text();
  return text;
}

export async function readdir() {
  return [];
}

export async function exists() {
  return false;
}

export default {
  readdir,
  exists,
  readFile,
};
