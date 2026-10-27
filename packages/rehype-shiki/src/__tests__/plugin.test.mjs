import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { describe, it, mock } from 'node:test';

// The modules loaded from here on, to tell whether the default highlighter,
// which imports every grammar Shiki bundles, was loaded
const loaded = new Set();

registerHooks({
  load(url, context, nextLoad) {
    loaded.add(new URL(url).pathname);

    return nextLoad(url, context);
  },
});

const defaultHighlighter = new URL('../index.mjs', import.meta.url).pathname;

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

  // Runs first, as the cases after it load the default highlighter
  it('only loads the default highlighter without a highlighter', async () => {
    await rehypeShikiji({ highlighter: { highlightToHast: mock.fn() } });
    assert.ok(!loaded.has(defaultHighlighter));

    await rehypeShikiji();
    assert.ok(loaded.has(defaultHighlighter));
  });

  it('calls visit twice', async () => {
    mockVisit.mock.resetCalls();
    (await rehypeShikiji())(mockTree);
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

    (await rehypeShikiji())(mockTree);
    assert.ok(parent.children.some(child => child.tagName === 'CodeTabs'));
  });
});
