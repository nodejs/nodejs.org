import { fireEvent, renderHook, act } from '@testing-library/react';

import useBottomScrollListener from '@/hooks/react-client/useBottomScrollListener';

describe('useBottomScrollListener', () => {
  it('should call the callback when the scroll reaches the bottom', () => {
    const callback = jest.fn();
    renderHook(() => useBottomScrollListener(callback));

    act(() => {
      fireEvent.scroll(window, {
        target: { scrollY: 100, innerHeight: 200, scrollHeight: 200 },
      });
    });

    // timout is needed because the callback is called in the next tick
    setTimeout(() => {
      expect(callback).toHaveBeenCalled();
    }, 1);
  });

  it('should not call the callback when the scroll does not reach the bottom', () => {
    const callback = jest.fn();
    renderHook(() => useBottomScrollListener(callback));

    act(() => {
      fireEvent.scroll(window, {
        target: { scrollY: 100, innerHeight: 200, scrollHeight: 300 },
      });
    });

    // timout is needed because the callback is called in the next tick
    setTimeout(() => {
      expect(callback).not.toHaveBeenCalled();
    }, 1);
  });
});
