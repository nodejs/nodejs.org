import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

const fakeDb = {};
const createMock = mock.fn(() => fakeDb);
const insertMultipleMock = mock.fn(async () => {});
const searchMock = mock.fn(async (_db, options) => ({ options }));

mock.module('@orama/orama', {
  namedExports: {
    create: createMock,
    insertMultiple: insertMultipleMock,
    search: searchMock,
  },
});

const { addPrefixToDocs, createOramaClient } = await import(
  '#site/components/withSearch'
);

describe('withSearch', () => {
  it('adds the locale prefix to indexed document URLs', () => {
    const db = {
      docs: {
        docs: {
          one: { href: '/docs', title: 'Docs' },
        },
      },
    };

    assert.deepEqual(addPrefixToDocs(db, '/en'), {
      docs: {
        docs: {
          one: { href: '/en/docs', title: 'Docs' },
        },
      },
    });
  });

  it('warms the Orama indexes only once before searching', async () => {
    createMock.mock.resetCalls();
    insertMultipleMock.mock.resetCalls();
    searchMock.mock.resetCalls();

    global.fetch = mock.fn(async url => ({
      json: async () => ({
        docs: {
          docs: {
            [String(url)]: { href: '/result', title: 'Node.js' },
          },
        },
      }),
    }));

    const { client, warmup } = createOramaClient({
      '/docs': 'https://example.com/docs.json',
      '/learn': 'https://example.com/learn.json',
    });

    await Promise.all([warmup(), warmup()]);
    await client.search({ term: 'node' });

    assert.equal(global.fetch.mock.callCount(), 2);
    assert.equal(insertMultipleMock.mock.callCount(), 2);
    assert.equal(searchMock.mock.callCount(), 1);
  });
});
