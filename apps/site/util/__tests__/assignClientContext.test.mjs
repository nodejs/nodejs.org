import assert from 'node:assert';
import { describe, it } from 'node:test';

import { assignClientContext } from '@/util/assignClientContext';

const mockContext = {
  frontmatter: { title: 'Sample Title' },
  pathname: '/sample-path',
  headings: ['Heading 1', 'Heading 2'],
  readingTime: {
    text: '2 mins read',
    minutes: 2,
    time: 120000,
    words: 200,
  },
  filename: 'sample-file.md',
  os: 'OTHER',
  architecture: 'x64',
  bitness: 64,
};

describe('assignClientContext', () => {
  it('should assign properties to the client context', () => {
    const result = assignClientContext(mockContext);

    assert.deepStrictEqual(result.frontmatter, mockContext.frontmatter);
    assert.strictEqual(result.pathname, mockContext.pathname);
    assert.deepStrictEqual(result.headings, mockContext.headings);
    assert.deepStrictEqual(result.readingTime, mockContext.readingTime);
    assert.strictEqual(result.filename, mockContext.filename);

    assert.deepStrictEqual(result, mockContext);
  });

  it('should use default values for missing properties', () => {
    const result = assignClientContext({});

    assert.deepStrictEqual(result.frontmatter, {});
    assert.strictEqual(result.pathname, '');
    assert.deepStrictEqual(result.headings, []);
    assert.deepStrictEqual(result.readingTime, {
      text: '',
      minutes: 0,
      time: 0,
      words: 0,
    });
    assert.strictEqual(result.filename, '');
  });
});
