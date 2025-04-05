import { extname } from 'path';

const requiredCode = `import * as React from 'react';`;
const mockBaseUrl = new URL('mocks/', import.meta.url);

export async function resolve(specifier, ctx, nextResolve) {
  if (specifier.endsWith('.css')) {
    return {
      format: 'module',
      url: new URL('css.mjs', mockBaseUrl).href,
      shortCircuit: true,
    };
  }

  return nextResolve(specifier);
}

export async function load(url, ctx, nextLoad) {
  const ext = extname(url);
  if (ext[ext.length - 1] !== 'x') return nextLoad(url);
  const result = await nextLoad(url, ctx);
  result.source = requiredCode + result.source;
  return result;
}
