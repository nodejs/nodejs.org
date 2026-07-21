import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import remarkParse from 'remark-parse';
import remarkValidateLinks from 'remark-validate-links';
import { unified } from 'unified';

import basePreset from '../index.mjs';

describe('base preset', () => {
  it('reports broken local links', async () => {
    const linkValidator = basePreset.plugins.find(
      plugin => plugin === remarkValidateLinks
    );

    assert.equal(linkValidator, remarkValidateLinks);

    const processor = unified()
      .use(remarkParse)
      .use(linkValidator, { repository: false, root: process.cwd() });
    const tree = processor.parse('# Existing heading\n\n[Missing](#missing)');
    const file = await new Promise((resolve, reject) => {
      processor.run(tree, { path: 'docs/example.md' }, (error, _, vfile) => {
        if (error) {
          reject(error);
        } else {
          resolve(vfile);
        }
      });
    });

    assert.ok(
      file.messages.some(
        message =>
          message.source.startsWith('remark-validate-links') &&
          message.ruleId === 'missing-heading'
      )
    );
  });
});
