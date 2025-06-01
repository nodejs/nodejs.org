import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

// Simplified mocks - only mock what's actually needed
mock.module('../index.mjs', {
  namedExports: { highlightToHast: mock.fn(() => ({ children: [] })) },
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

describe('rehypeShikiji', { concurrency: true }, async () => {
  const { default: rehypeShikiji } = await import('../plugin.mjs');
  const mockTree = { type: 'root', children: [] };

  it('calls visit once', () => {
    mockVisit.mock.resetCalls();

    rehypeShikiji()(mockTree);

    assert.strictEqual(mockVisit.mock.calls.length, 1);
  });

  it('does not create CodeTabs for non-CJS/ESM code blocks', () => {
    const treeToTransform = {
      type: 'root',
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

    rehypeShikiji()(treeToTransform);

    assert.strictEqual(
      treeToTransform.children.length,
      2,
      'Should not group non-CJS/ESM blocks'
    );
    assert.ok(
      treeToTransform.children.every(child => child.tagName === 'pre'),
      'All children should remain pre elements'
    );
    // Ensure no CodeTabs were created
    assert.ok(
      !treeToTransform.children.some(child => child.tagName === 'CodeTabs'),
      'CodeTabs should not be created for JS/TS'
    );
  });

  it('If there are a sequence of codeblock of CJS/ESM, it should create pairs of CodeTabs', () => {
    const parent = {
      type: 'root',
      children: [
        {
          tagName: 'pre',
          children: [
            {
              tagName: 'code',
              data: { meta: 'displayName="CJS"' },
              properties: { className: ['language-cjs'] },
            },
          ],
        },
        {
          tagName: 'pre',
          children: [
            {
              tagName: 'code',
              data: { meta: 'displayName="ESM"' },
              properties: { className: ['language-esm'] },
            },
          ],
        },
        {
          tagName: 'pre',
          children: [
            {
              tagName: 'code',
              data: { meta: 'displayName="CJS"' },
              properties: { className: ['language-cjs'] },
            },
          ],
        },
        {
          tagName: 'pre',
          children: [
            {
              tagName: 'code',
              data: { meta: 'displayName="ESM"' },
              properties: { className: ['language-esm'] },
            },
          ],
        },
      ],
    };

    rehypeShikiji()(parent);

    assert.strictEqual(
      parent.children.length,
      2,
      'Should create two CodeTabs groups'
    );

    // Check first CodeTabs group
    const firstGroup = parent.children[0];
    assert.strictEqual(
      firstGroup.tagName,
      'CodeTabs',
      'Group 1 should be CodeTabs'
    );
    assert.strictEqual(
      firstGroup.properties.languages,
      'cjs|esm',
      'Group 1 languages should be cjs|esm'
    );
    assert.strictEqual(
      firstGroup.properties.displayNames,
      'CJS|ESM',
      'Group 1 displayNames should be CJS|ESM'
    );
    assert.ok(
      Array.isArray(firstGroup.children) && firstGroup.children.length === 2,
      'Group 1 should contain 2 code blocks'
    );
    assert.strictEqual(
      firstGroup.children[0].children[0].properties.className[0],
      'language-cjs',
      'Group 1, Block 1 should be CJS'
    );
    assert.strictEqual(
      firstGroup.children[1].children[0].properties.className[0],
      'language-esm',
      'Group 1, Block 2 should be ESM'
    );

    // Check second CodeTabs group
    const secondGroup = parent.children[1];
    assert.strictEqual(
      secondGroup.tagName,
      'CodeTabs',
      'Group 2 should be CodeTabs'
    );
    assert.strictEqual(
      secondGroup.properties.languages,
      'cjs|esm',
      'Group 2 languages should be cjs|esm'
    );
    assert.strictEqual(
      secondGroup.properties.displayNames,
      'CJS|ESM',
      'Group 2 displayNames should be CJS|ESM'
    );
    assert.ok(
      Array.isArray(secondGroup.children) && secondGroup.children.length === 2,
      'Group 2 should contain 2 code blocks'
    );
    assert.strictEqual(
      secondGroup.children[0].children[0].properties.className[0],
      'language-cjs',
      'Group 2, Block 1 should be CJS'
    );
    assert.strictEqual(
      secondGroup.children[1].children[0].properties.className[0],
      'language-esm',
      'Group 2, Block 2 should be ESM'
    );
  });

  it("if itsn't a squence of cjs/esm codeblock, it should not pair them", () => {
    const parent = {
      type: 'root',
      children: [
        {
          tagName: 'pre',
          children: [
            {
              tagName: 'code',
              data: { meta: 'displayName="CJS"' },
              properties: { className: ['language-cjs'] },
            },
          ],
        },
        {
          tagName: 'pre',
          children: [
            {
              tagName: 'code',
              data: { meta: 'displayName="ESM"' },
              properties: { className: ['language-esm'] },
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

    rehypeShikiji()(parent);

    assert.strictEqual(
      parent.children.length,
      3,
      'Should not create CodeTabs groups'
    );

    // Check first code block
    const firstBlock = parent.children[0];
    assert.strictEqual(
      firstBlock.tagName,
      'pre',
      'First block should be a pre'
    );
    assert.strictEqual(
      firstBlock.children[0].tagName,
      'code',
      'First block should contain a code element'
    );
    assert.strictEqual(
      firstBlock.children[0].properties.className[0],
      'language-cjs',
      'First block should be CJS'
    );

    // Check second code block
    const secondBlock = parent.children[1];
    assert.strictEqual(
      secondBlock.tagName,
      'pre',
      'Second block should be a pre'
    );
    assert.strictEqual(
      secondBlock.children[0].tagName,
      'code',
      'Second block should contain a code element'
    );
    assert.strictEqual(
      secondBlock.children[0].properties.className[0],
      'language-esm',
      'Second block should be ESM'
    );

    // Check third code block
    const thirdBlock = parent.children[2];
    assert.strictEqual(
      thirdBlock.tagName,
      'pre',
      'Third block should be a pre'
    );
    assert.strictEqual(
      thirdBlock.children[0].tagName,
      'code',
      'Third block should contain a code element'
    );
    assert.strictEqual(
      thirdBlock.children[0].properties.className[0],
      'language-ts',
      'Third block should be TS'
    );

    const parentBis = {
      type: 'root',
      children: [
        {
          tagName: 'pre',
          children: [
            {
              tagName: 'code',
              data: { meta: 'displayName="package.json"' },
              properties: { className: ['language-json'] },
            },
          ],
        },
        {
          tagName: 'pre',
          children: [
            {
              tagName: 'code',
              data: { meta: 'displayName="workflow"' },
              properties: { className: ['language-yaml'] },
            },
          ],
        },
        {
          tagName: 'pre',
          children: [
            {
              tagName: 'code',
              data: { meta: 'displayName="mod.ts"' },
              properties: { className: ['language-ts'] },
            },
          ],
        },
      ],
    };

    rehypeShikiji()(parentBis);

    assert.strictEqual(
      parentBis.children.length,
      3,
      'Should not create CodeTabs groups for different languages'
    );
    // Check first code block
    const firstBlockBis = parentBis.children[0];
    assert.strictEqual(
      firstBlockBis.tagName,
      'pre',
      'First block should be a pre'
    );
    assert.strictEqual(
      firstBlockBis.children[0].tagName,
      'code',
      'First block should contain a code element'
    );
    assert.strictEqual(
      firstBlockBis.children[0].properties.className[0],
      'language-json',
      'First block should be JSON'
    );
    // Check second code block
    const secondBlockBis = parentBis.children[1];
    assert.strictEqual(
      secondBlockBis.tagName,
      'pre',
      'Second block should be a pre'
    );
    assert.strictEqual(
      secondBlockBis.children[0].tagName,
      'code',
      'Second block should contain a code element'
    );
    assert.strictEqual(
      secondBlockBis.children[0].properties.className[0],
      'language-yaml',
      'Second block should be YAML'
    );
    // Check third code block
    const thirdBlockBis = parentBis.children[2];
    assert.strictEqual(
      thirdBlockBis.tagName,
      'pre',
      'Third block should be a pre'
    );
    assert.strictEqual(
      thirdBlockBis.children[0].tagName,
      'code',
      'Third block should contain a code element'
    );
    assert.strictEqual(
      thirdBlockBis.children[0].properties.className[0],
      'language-ts',
      'Third block should be TS'
    );
  });
});
