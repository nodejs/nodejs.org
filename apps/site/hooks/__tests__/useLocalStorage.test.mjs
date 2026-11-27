import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';

import { act, renderHook } from '@testing-library/react';

import useLocalStorage from '#site/hooks/useLocalStorage';

describe('useLocalStorage', () => {
  afterEach(() => localStorage.clear());

  it('reads the stored value', () => {
    localStorage.setItem('key', 'stored');

    const { result } = renderHook(() => useLocalStorage('key'));

    assert.equal(result.current[0], 'stored');
  });

  it('re-renders with the value it writes', () => {
    const { result } = renderHook(() => useLocalStorage('key'));

    assert.equal(result.current[0], null);

    act(() => result.current[1]('written'));

    assert.equal(result.current[0], 'written');
    assert.equal(localStorage.getItem('key'), 'written');
  });
});
