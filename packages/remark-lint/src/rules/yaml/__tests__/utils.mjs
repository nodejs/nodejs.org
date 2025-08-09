import assert from 'node:assert/strict';
import { mock } from 'node:test';

export function testRule(rule, yaml, expected) {
  const report = mock.fn();

  rule(yaml, report);

  assert.deepEqual(
    report.mock.calls.flatMap(call => call.arguments),
    expected
  );
}
