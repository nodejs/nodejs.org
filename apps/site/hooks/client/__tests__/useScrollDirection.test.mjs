import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';

import { renderHook, act } from '@testing-library/react';

import useScrollDirection from '#site/hooks/client/useScrollDirection.js';

describe('useScrollDirection', () => {
  let scrollY;
  let originalRAF;

  beforeEach(() => {
    scrollY = 0;

    Object.defineProperty(window, 'scrollY', {
      get: () => scrollY,
      configurable: true,
    });

    originalRAF = window.requestAnimationFrame;
    Object.defineProperty(window, 'requestAnimationFrame', {
      value: cb => {
        cb();
        return 1;
      },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    window.requestAnimationFrame = originalRAF;
  });

  it('should return null initially (at top of page)', () => {
    const { result } = renderHook(() => useScrollDirection());
    assert.equal(result.current, null);
  });

  it('should return "down" when scrolling down past threshold', () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });

    assert.equal(result.current, 'down');
  });

  it('should return "up" when scrolling up past threshold', () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      scrollY = 50;
      window.dispatchEvent(new Event('scroll'));
    });

    assert.equal(result.current, 'up');
  });

  it('should not change direction for scroll less than threshold', () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      scrollY = 5;
      window.dispatchEvent(new Event('scroll'));
    });

    assert.equal(result.current, null);
  });

  it('should return null when scrolling back to top', () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });

    assert.equal(result.current, 'down');

    act(() => {
      scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
    });

    assert.equal(result.current, null);
  });
});
