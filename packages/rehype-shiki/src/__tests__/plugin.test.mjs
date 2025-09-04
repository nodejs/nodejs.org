import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

// Simplified mocks - only mock what's actually needed
mock.module('../index.mjs', {
  defaultExport: () => ({ highlightToHast: mock.fn(() => ({ children: [] })) }),
});

mock.module('classnames', {
  defaultExport: (...args) => args.filter(Boolean).join(' '),
});

mock.module('hast-util-to-string', {
  namedExports: { toString: () => 'code' },
});

const mockVisit = mock.fn();
mock.module('unist-util-visit', {
  namedExports: { visit: mockVisit, SKIP: Symbol() },
});

describe('rehypeShikiji', async () => {
  const { default: rehypeShikiji } = await import('../plugin.mjs');
  const mockTree = { type: 'root', children: [] };

  it('calls visit twice', async () => {
    mockVisit.mock.resetCalls();
    await rehypeShikiji()(mockTree);
    assert.strictEqual(mockVisit.mock.calls.length, 2);
  });

  it('creates CodeTabs for multiple code blocks', async () => {
    const parent = {
      children: [
        {
          tagName: 'pre',
          children: [
            {
              tagName: 'code',
              data: { meta: 'displayName="JS"' },
              properties: { className: ['language-js'] },
            },
          ],
        },
        {
          tagName: 'pre',
          children: [
            {
              tagName: 'code',
              data: { meta: 'displayName="TS"' },
              properties: { className: ['language-ts'] },
            },
          ],
        },
      ],
    };

    mockVisit.mock.mockImplementation((tree, selector, visitor) => {
      if (selector === 'element') {
        visitor(parent.children[0], 0, parent);
      }
    });

    await rehypeShikiji()(mockTree);
    assert.ok(parent.children.some(child => child.tagName === 'CodeTabs'));
  });
});
