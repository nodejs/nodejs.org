import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import deepMerge from '#site/util/deepMerge';

describe('deepMerge', () => {
  it('should merge nested objects', () => {
    const obj1 = { a: { b: 1 }, c: 2 };
    const obj2 = { a: { d: 3 }, e: 4 };
    const result = deepMerge(obj1, obj2);
    assert.deepEqual(result, { a: { b: 1, d: 3 }, c: 2, e: 4 });
  });

  it('should overwrite primitive properties', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 2 };
    const result = deepMerge(obj1, obj2);
    assert.deepEqual(result, { a: 2 });
  });
});
