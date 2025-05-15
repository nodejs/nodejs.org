import assert from 'node:assert/strict';
import { mock, it, describe } from 'node:test';

import { SKIP } from 'unist-util-visit';

mock.module('classnames', {
  defaultExport: (...args) => args.filter(Boolean).join(' '),
});

mock.module('hast-util-to-string', {
  namedExports: {
    toString: node => node.children?.[0]?.value || '',
  },
});

mock.module('unist-util-visit', {
  namedExports: {
    visit: (tree, nodeType, visitor) => {
      if (tree.type === nodeType) visitor(tree, null, null);
      tree.children?.forEach((child, i) => {
        if (child.type === nodeType) visitor(child, i, tree);
        child.children?.forEach((subChild, j) => {
          if (subChild.type === nodeType) visitor(subChild, j, child);
        });
      });
    },
    SKIP,
  },
});

mock.module('../highlighter', {
  namedExports: {
    highlightToHast: (code, language) => ({
      children: [
        {
          type: 'element',
          tagName: 'pre',
          properties: { class: `highlighted-${language}` },
          children: [
            {
              type: 'element',
              tagName: 'code',
              children: [{ type: 'text', value: `highlighted ${code}` }],
            },
          ],
        },
      ],
    }),
  },
});

const {
  getMetaParameter,
  isCodeBlock,
  processCodeTabs,
  processCodeHighlighting,
} = await import('../shiki');

describe('rehypeShikiji module', () => {
  describe('Utility functions', () => {
    it('getMetaParameter extracts values from meta strings', () => {
      const tests = [
        {
          meta: 'displayName="JavaScript"',
          param: 'displayName',
          expected: 'JavaScript',
        },
        {
          meta: 'active="true" displayName="TypeScript"',
          param: 'active',
          expected: 'true',
        },
        {
          meta: 'key="value with spaces"',
          param: 'key',
          expected: 'value with spaces',
        },
        { meta: 'noQuotes=value', param: 'noQuotes', expected: undefined },
        { meta: null, param: 'key', expected: undefined },
        { meta: 'key="value"', param: undefined, expected: undefined },
        { meta: 'key=""', param: 'key', expected: undefined },
        { meta: 'otherKey="value"', param: 'key', expected: undefined },
      ];

      tests.forEach(({ meta, param, expected }) => {
        assert.equal(getMetaParameter(meta, param), expected);
      });
    });

    it('isCodeBlock correctly identifies code blocks', () => {
      // Valid code block
      const validBlock = {
        type: 'element',
        tagName: 'pre',
        children: [
          {
            type: 'element',
            tagName: 'code',
            children: [{ type: 'text', value: 'code' }],
          },
        ],
      };

      // Invalid cases
      const invalidCases = [
        {
          type: 'element',
          tagName: 'pre',
          children: [{ type: 'element', tagName: 'span' }],
        },
        {
          type: 'element',
          tagName: 'div',
          children: [{ type: 'element', tagName: 'code' }],
        },
        undefined,
      ];

      assert.ok(isCodeBlock(validBlock));
      invalidCases.forEach(testCase => assert.ok(!isCodeBlock(testCase)));
    });
  });

  describe('Processing functions', () => {
    it('processCodeTabs groups adjacent code blocks', () => {
      const tree = {
        type: 'root',
        children: [
          {
            type: 'element',
            tagName: 'pre',
            children: [
              {
                type: 'element',
                tagName: 'code',
                properties: { className: ['language-javascript'] },
                data: { meta: 'displayName="JavaScript"' },
                children: [{ type: 'text', value: 'console.log("hello");' }],
              },
            ],
          },
          {
            type: 'element',
            tagName: 'pre',
            children: [
              {
                type: 'element',
                tagName: 'code',
                properties: { className: ['language-typescript'] },
                data: { meta: 'displayName="TypeScript" active="true"' },
                children: [{ type: 'text', value: 'console.log("hello");' }],
              },
            ],
          },
        ],
      };

      processCodeTabs(tree);

      assert.partialDeepStrictEqual(tree.children[0], {
        tagName: 'CodeTabs',
        properties: {
          languages: 'javascript|typescript',
          displayNames: 'JavaScript|TypeScript',
          defaultTab: '1',
        },
      });
    });

    it('processCodeHighlighting applies syntax highlighting', () => {
      const tree = {
        type: 'root',
        children: [
          {
            type: 'element',
            tagName: 'pre',
            children: [
              {
                type: 'element',
                tagName: 'code',
                properties: { className: ['language-javascript'] },
                data: { meta: 'showCopyButton="true"' },
                children: [{ type: 'text', value: 'console.log("hello");' }],
              },
            ],
          },
        ],
      };

      processCodeHighlighting(tree);

      assert.partialDeepStrictEqual(tree.children[0], {
        tagName: 'pre',
        properties: {
          class: 'highlighted-javascript language-javascript',
          showCopyButton: 'true',
        },
      });
    });
  });
});
