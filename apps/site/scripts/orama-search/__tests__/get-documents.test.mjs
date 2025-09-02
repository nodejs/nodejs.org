import assert from 'node:assert/strict';
import { test, mock } from 'node:test';

import nock from 'nock';

mock.module('node:fs/promises', {
  namedExports: {
    glob: () => ['filename'],
    readFile: name => name.endsWith('filename') && 'content',
  },
});

const { getAPIDocs, getArticles } = await import('../get-documents.mjs');

test('getAPIDocs', async () => {
  nock('https://api.github.com')
    .get('/repos/nodejs/node/contents/doc/api')
    .query(true)
    .reply(200, [
      {
        name: 'fs.md',
        download_url: 'data:text/plain,fs',
      },
    ]);

  const result = await getAPIDocs();

  assert.equal(result.length, 1);
  assert.equal(result[0].content, 'fs');
  assert.match(result[0].pathname, /^docs\/v[^/]+\/api\/fs\.html$/);
});

test('getArticles', async () => {
  const result = await getArticles();
  assert.deepStrictEqual(result, [
    { content: 'content', pathname: 'filename' },
  ]);
});
