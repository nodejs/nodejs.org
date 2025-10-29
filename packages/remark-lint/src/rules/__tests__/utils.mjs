import assert from 'node:assert/strict';
import { mock } from 'node:test';

import remarkParse from 'remark-parse';
import { unified } from 'unified';

/**
 * Tests a markdown rule against a markdown string
 */
export const testRule = (
  rule,
  markdown,
  expected,
  vfileOptions = {},
  ruleOptions = {}
) => {
  // Parse the markdown once
  const tree = unified().use(remarkParse).parse(markdown);

  // Create a mock vfile
  const vfile = {
    ...vfileOptions,
    message: mock.fn(),
    messages: [],
  };

  // Execute the rule
  rule(ruleOptions)(tree, vfile, () => {});

  // Assert that the expected messages were reported
  assert.deepEqual(
    vfile.message.mock.calls.map(call => call.arguments[0]),
    expected
  );
};

/**
 * Tests a YAML rule against a YAML string
 */
export function testYamlRule(rule, input, options = {}, expected) {
  // Create a mock reporter
  const report = mock.fn();

  // Execute the rule
  rule(input, report, options);

  // Assert that the expected messages were reported
  assert.deepEqual(
    report.mock.calls.flatMap(call => call.arguments),
    expected
  );
}
