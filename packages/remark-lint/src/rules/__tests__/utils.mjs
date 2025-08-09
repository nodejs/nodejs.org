import assert from 'node:assert/strict';
import { mock } from 'node:test';

import remarkParse from 'remark-parse';
import { unified } from 'unified';

export const testRule = (rule, markdown, expected, vfileOptions) => {
  const processor = unified().use(remarkParse);
  const tree = processor.parse(markdown);

  const vfile = {
    ...vfileOptions,
    message: mock.fn(),
    messages: [],
  };

  rule()(tree, vfile, () => {});

  assert.deepEqual(
    vfile.message.mock.calls.map(call => call.arguments[0]),
    expected
  );
};
