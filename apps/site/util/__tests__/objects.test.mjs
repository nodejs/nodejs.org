import assert from 'node:assert/strict';
import { describe, it, beforeEach } from 'node:test';

import { deepMerge, debounce } from '#site/util/objects';

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

describe('debounce', () => {
  beforeEach(t => {
    t.mock.timers.enable();
  });

  it('should call the function only once', t => {
    const fn = t.mock.fn();
    const debouncedFn = debounce(fn, 1000);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    t.mock.timers.runAll();

    assert.equal(fn.mock.callCount(), 1);
  });

  it('should call the function with the last arguments', t => {
    const fn = t.mock.fn();
    const debouncedFn = debounce(fn, 1000);

    debouncedFn(1);
    debouncedFn(2);
    debouncedFn(3);

    t.mock.timers.runAll();

    assert.deepEqual(fn.mock.calls[0].arguments, [3]);
  });

  it('should call the function after the delay', t => {
    const mockFn = t.mock.fn();
    const debouncedFn = debounce(mockFn, 500);

    debouncedFn();
    assert.equal(mockFn.mock.callCount(), 0);

    t.mock.timers.runAll();
    assert.equal(mockFn.mock.callCount(), 1);
  });
});
