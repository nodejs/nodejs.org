import { renderHook } from '@testing-library/react';

import useMediaQuery from '@/hooks/react-client/useMediaQuery';

describe('useMediaQuery', () => {
  it('should return undefined initially', () => {
    const { result } = renderHook(() => useMediaQuery('media-query-mock'));
    expect(result.current).toBe(false);
  });

  it('should return true for matched query', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: query => ({
        matches: true,
        media: query,
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
      value: query => ({
        matches: false,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }),
    });

    const { result } = renderHook(() => useMediaQuery('media-query-mock'));
    expect(result.current).toBe(false);
  });

  it('should subscribe for media changes', () => {
    const listenerMock = jest.fn().mockImplementation((_, handler) => {
      handler({ matches: false });
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: query => ({
        matches: false,
        media: query,
        addEventListener: listenerMock,
        removeEventListener: jest.fn(),
      }),
    });

    renderHook(() => useMediaQuery('media-query-mock'));
    expect(listenerMock).toHaveBeenCalledTimes(1);
  });
});
