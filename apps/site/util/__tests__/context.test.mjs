import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { assignClientContext } from '#site/util/context';

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

    assert.deepEqual(result.frontmatter, mockContext.frontmatter);
    assert.equal(result.pathname, mockContext.pathname);
    assert.deepEqual(result.headings, mockContext.headings);
    assert.deepEqual(result.readingTime, mockContext.readingTime);
    assert.equal(result.filename, mockContext.filename);

    assert.deepEqual(result, mockContext);
  });

  it('should use default values for missing properties', () => {
    const result = assignClientContext({});

    assert.deepEqual(result.frontmatter, {});
    assert.equal(result.pathname, '');
    assert.deepEqual(result.headings, []);
    assert.deepEqual(result.readingTime, {
      text: '',
      minutes: 0,
      time: 0,
      words: 0,
    });
    assert.equal(result.filename, '');
  });
});
