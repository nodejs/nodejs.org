import { renderHook, act } from '@testing-library/react';

import useClickOutside from '@/hooks/react-client/useClickOutside';

describe('useClickOutside', () => {
  it('should call the callback function when clicked outside the element', () => {
    const fn = jest.fn();
    const { rerender } = renderHook(() =>
      useClickOutside({ current: null }, fn)
    );

    const mockEvent = new MouseEvent('click', { bubbles: true });
    const mockElement = document.createElement('div');

    rerender({ current: mockElement }, fn);

    act(() => {
      document.dispatchEvent(mockEvent);
    });

    setTimeout(() => {
      expect(fn).toHaveBeenCalledTimes(1);
    }, 1);
  });

  it('should not call the callback function when clicked inside the element', () => {
    const fn = jest.fn();
    const { rerender } = renderHook(() =>
      useClickOutside({ current: null }, fn)
    );

    const mockEvent = new MouseEvent('click', { bubbles: true });
    const mockElement = document.createElement('div');
    const mockChildElement = document.createElement('button');
    mockElement.appendChild(mockChildElement);

    rerender({ current: mockElement }, fn);

    act(() => {
      mockChildElement.dispatchEvent(mockEvent);
    });

    expect(fn).not.toHaveBeenCalled();
  });
});
