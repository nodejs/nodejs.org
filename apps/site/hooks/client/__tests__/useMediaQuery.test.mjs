import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { renderHook } from '@testing-library/react';

import useMediaQuery from '#site/hooks/client/useMediaQuery';

const noop = () => {};

describe('useMediaQuery', () => {
  it('should return undefined initially', () => {
    const { result } = renderHook(() => useMediaQuery('media-query-mock'));
    assert.equal(result.current, false);
  });

  it('should return true for matched query', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: query => ({
        matches: true,
        media: query,
        addEventListener: noop,
        removeEventListener: noop,
      }),
    });

    const { result } = renderHook(() => useMediaQuery('media-query-mock'));
    assert.equal(result.current, true);
  });

  it('should return false for not-matched query', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: query => ({
        matches: false,
        media: query,
        addEventListener: noop,
        removeEventListener: noop,
      }),
    });

    const { result } = renderHook(() => useMediaQuery('media-query-mock'));
    assert.equal(result.current, false);
  });

  it('should subscribe for media changes', t => {
    const listenerMock = t.mock.fn(noop, (_, handler) => {
      handler({ matches: false });
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: query => ({
        matches: false,
        media: query,
        addEventListener: listenerMock,
        removeEventListener: noop,
      }),
    });

    renderHook(() => useMediaQuery('media-query-mock'));
    assert.equal(listenerMock.mock.callCount(), 1);
  });
});
