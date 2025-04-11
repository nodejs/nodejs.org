import assert from 'node:assert/strict';
import { describe, it, beforeEach } from 'node:test';

import { debounce } from '@/util/debounce';

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
