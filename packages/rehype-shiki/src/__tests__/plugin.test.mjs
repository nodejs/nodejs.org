import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';
import rehypeShikiji from '../plugin.mjs';

// Simplified mocks - only mock what's actually needed
mock.module('../index.mjs', {
  namedExports: {
    highlightToHast: mock.fn((code, lang) => {
      if (!lang) throw new Error('Language is required');

      return {
        children: [
          {
            type: 'element',
            tagName: 'code',
            properties: { className: [`language-${lang}`] },
            children: [{ type: 'text', value: code }],
          },
        ],
      }
    }
    ),
  }
});

describe('rehypeShikiji', { concurrency: true }, async () => {
  it('creates CodeTabs for JS/TS code blocks', () => {
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
      1,
      'Should group JS/TS blocks into a single CodeTabs'
    );
    const codeTabs = treeToTransform.children[0];
    assert.strictEqual(codeTabs.tagName, 'CodeTabs', 'Should create a CodeTabs element');
    assert.deepStrictEqual(
      codeTabs.children,
      [
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
      'CodeTabs should contain both JS and TS code blocks'
    );
    assert.deepStrictEqual(
      codeTabs.properties,
      {
        languages: 'js|ts',
        displayNames: 'JS|TS',
      },
      'CodeTabs should have correct properties'
    );
  });

  it('creates CodeTabs for CJS/ESM code blocks', () => {
    const treeToTransform = {
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
      ],
    };

    rehypeShikiji()(treeToTransform);

    assert.strictEqual(
      treeToTransform.children.length,
      1,
      'Should group CJS/ESM blocks into a single CodeTabs'
    );
    const codeTabs = treeToTransform.children[0];
    assert.strictEqual(codeTabs.tagName, 'CodeTabs', 'Should create a CodeTabs element');
    assert.deepStrictEqual(
      codeTabs.children,
      [
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
      'CodeTabs should contain both CJS and ESM code blocks'
    );
    assert.deepStrictEqual(
      codeTabs.properties,
      {
        languages: 'cjs|esm',
        displayNames: 'CJS|ESM',
      },
      'CodeTabs should have correct properties'
    );

    const treeToTransformbis = {
      type: 'root',
      children: [
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
      ],
    };

    rehypeShikiji()(treeToTransformbis);

    assert.strictEqual(
      treeToTransformbis.children.length,
      1,
      'Should group ESM/CJS blocks into a single CodeTabs'
    );
    const codeTabsBis = treeToTransformbis.children[0];
    assert.strictEqual(codeTabsBis.tagName, 'CodeTabs', 'Should create a CodeTabs element');
    assert.deepStrictEqual(
      codeTabsBis.children,
      [
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
      ],
      'CodeTabs should contain both ESM and CJS code blocks'
    );
    assert.deepStrictEqual(
      codeTabsBis.properties,
      {
        languages: 'esm|cjs',
        displayNames: 'ESM|CJS',
      },
      'CodeTabs should have correct properties'
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
    assert.deepStrictEqual(
      firstGroup,
      {
        type: 'element', // Added type property
        tagName: 'CodeTabs',
        properties: {
          languages: 'cjs|esm',
          displayNames: 'CJS|ESM',
        },
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
        ],
      },
      'Group 1 should be a CodeTabs group with correct structure'
    );

    // Check second CodeTabs group
    const secondGroup = parent.children[1];
    assert.deepStrictEqual(
      secondGroup,
      {
        type: 'element', // Added type property
        tagName: 'CodeTabs',
        properties: {
          languages: 'cjs|esm',
          displayNames: 'CJS|ESM',
        },
        children: [
          {
            tagName: 'pre',
            children: [
              {
                tagName: 'code',
                data: { meta: 'displayName="CJS"' }, // Ensure this is expected
                properties: { className: ['language-cjs'] },
              },
            ],
          },
          {
            tagName: 'pre',
            children: [
              {
                tagName: 'code',
                data: { meta: 'displayName="ESM"' }, // Ensure this is expected
                properties: { className: ['language-esm'] },
              },
            ],
          },
        ],
      },
      'Group 2 should be a CodeTabs group with correct structure'
    );
  });

  it("if it isn't a sequence of cjs/esm codeblock, it should not pair them", () => {
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

    assert.deepStrictEqual(
      parent.children,
      [
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
      'Children should remain as individual pre/code blocks'
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

    assert.deepStrictEqual(
      parentBis.children,
      [
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
      'Children should remain as individual pre/code blocks for different languages'
    );
  });

  it('should not create CodeTabs for non-JS/TS/CJS/ESM code blocks', () => {
    const treeToTransform = {
      type: 'root',
      children: [
        {
          tagName: 'pre',
          children: [
            {
              tagName: 'code',
              data: { meta: 'displayName="YAML"' },
              properties: { className: ['language-yaml'] },
            },
          ],
        },
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
              data: { meta: 'displayName="JSON"' },
              properties: { className: ['language-json'] },
            },
          ],
        }
      ],
    };

    rehypeShikiji()(treeToTransform);

    assert.strictEqual(
      treeToTransform.children.length,
      3,
      'Should not group non-JS/TS/CJS/ESM blocks into CodeTabs'
    );
    assert.deepStrictEqual(
      treeToTransform.children,
      [
        {
          tagName: 'pre',
          children: [
            {
              tagName: 'code',
              data: { meta: 'displayName="YAML"' },
              properties: { className: ['language-yaml'] },
            },
          ],
        },
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
              data: { meta: 'displayName="JSON"' },
              properties: { className: ['language-json'] },
            },
          ],
        }
      ],
      'Children should remain as individual pre/code blocks for non-JS/TS/CJS/ESM languages'
    );
  });

  it("should create CodeTabs for a sequence n snippet of ESM/CJS code blocks", () => {
    const parent = {
      type: 'root',
      children: [
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
              data: { meta: 'displayName="ESM"' },
              properties: { className: ['language-esm'] },
            },
          ],
        },
      ],
    };

    rehypeShikiji()(parent);


    assert.deepStrictEqual(
      parent.children[0],
      {
        tagName: 'CodeTabs',
        type: 'element',
        properties: {
          languages: 'esm|esm|esm|esm',
          displayNames: 'ESM|ESM|ESM|ESM',
        },
        children: [
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
                data: { meta: 'displayName="ESM"' },
                properties: { className: ['language-esm'] },
              },
            ],
          },
        ],
      },
      'Should create a single CodeTabs with all ESM code blocks'
    );
    assert.strictEqual(
      parent.children.length,
      1,
      'Should create two CodeTabs groups for CJS/ESM pairs'
    );
  })

  it("should create CodeTabs for a sequence n snippet of text code blocks", () => {
    const parent = {
      type: 'root',
      children: [
        {
          tagName: 'pre',
          children: [
            {
              tagName: 'code',
              data: { meta: 'displayName="Text 1"' },
              properties: { className: ['language-text'] },
            },
          ],
        },
        {
          tagName: 'pre',
          children: [
            {
              tagName: 'code',
              data: { meta: 'displayName="Text 2"' },
              properties: { className: ['language-text'] },
            },
          ],
        },
        {
          tagName: 'pre',
          children: [
            {
              tagName: 'code',
              data: { meta: 'displayName="Text 3"' },
              properties: { className: ['language-text'] },
            },
          ],
        },
      ],
    };

    rehypeShikiji()(parent);

    assert.deepStrictEqual(
      parent.children[0],
      {
        tagName: 'CodeTabs',
        type: 'element',
        properties: {
          languages: 'text|text|text',
          displayNames: 'Text 1|Text 2|Text 3',
        },
        children: [
          {
            tagName: 'pre',
            children: [
              {
                tagName: 'code',
                data: { meta: 'displayName="Text 1"' },
                properties: { className: ['language-text'] },
              },
            ],
          },
          {
            tagName: 'pre',
            children: [
              {
                tagName: 'code',
                data: { meta: 'displayName="Text 2"' },
                properties: { className: ['language-text'] },
              },
            ],
          },
          {
            tagName: 'pre',
            children: [
              {
                tagName: 'code',
                data: { meta: 'displayName="Text 3"' },
                properties: { className: ['language-text'] },
              },
            ],
          },
        ],
      },
      'Should create a single CodeTabs with all text code blocks'
    );
    assert.strictEqual(
      parent.children.length,
      1,
      'Should create a single CodeTabs group for text code blocks'
    );
  });

  it("should have a copy button for each code block", () => {
    const treeToTransform = {
      type: 'root',
      data: {
        meta: 'showCopyButton="true"'
      },
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

    assert.strictEqual(treeToTransform.type, 'root');
    assert.strictEqual(treeToTransform.children.length, 2);
    assert.deepStrictEqual(
      treeToTransform.children,
      [
        {
          tagName: 'pre',
          children: [
            {
              tagName: 'code',
              data: { meta: 'displayName="JS"' },
              properties: { className: ['language-js'] },
            }
          ]
        },
        {
          tagName: 'pre',
          children: [
            {
              tagName: 'code',
              data: { meta: 'displayName="TS"' },
              properties: { className: ['language-ts'] },
            }
          ]
        },
      ],
    );
  });
});
