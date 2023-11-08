import { renderHook } from '@testing-library/react';

import { useMediaQuery } from '..';

describe('useMediaQuery', () => {
  it('should check for matchMedia support', () => {
    const { result } = renderHook(() => useMediaQuery('media-query-mock'));

    expect(result.current).toBe(undefined);
  });

  it('should return true for matched query', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: () => ({
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }),
    });

    const { result } = renderHook(() => useMediaQuery('media-query-mock'));

    expect(result.current).toBe(true);
  });

  it('should return false for not-matched query', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: () => ({
        matches: false,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }),
    });

    const { result } = renderHook(() => useMediaQuery('media-query-mock'));

    expect(result.current).toBe(false);
  });

  it('should subscribe for media changes', () => {
    const listenerMock = jest.fn().mockImplementation((_, handler) => {
      handler();
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: () => ({
        matches: false,
        addEventListener: listenerMock,
        removeEventListener: jest.fn(),
      }),
    });

    renderHook(() => useMediaQuery('media-query-mock'));

    expect(listenerMock).toHaveBeenCalledTimes(1);
  });

  it("should support MediaQueryList's old event listeners", () => {
    const listenerMock = jest.fn().mockImplementation(handler => {
      handler();
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: () => ({
        matches: false,
        addListener: listenerMock,
        removeListener: jest.fn(),
      }),
    });

    renderHook(() => useMediaQuery('media-query-mock'));
    expect(listenerMock).toHaveBeenCalledTimes(1);
  });
});
