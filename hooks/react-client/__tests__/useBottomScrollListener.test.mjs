import { renderHook } from '@testing-library/react';

import useBottomScrollListener from '@/hooks/react-client/useBottomScrollListener';

describe('useBottomScrollListener', () => {
  const callback = jest.fn();

  it('should call the callback when the bottom of the window is reached', async () => {
    renderHook(() => useBottomScrollListener(callback));

    const mockElement = document.createElement('div');
    mockElement.style.height = '10000px';
    document.body.appendChild(mockElement);

    global.window.scrollTo(0, 10000);
    global.window.dispatchEvent(new Event('scroll'));

    setTimeout(() => {
      expect(callback).toHaveBeenCalled();
    }, 1);
    document.body.removeChild(mockElement);
  });

  it('should not call the callback when the bottom of the window is not reached', () => {
    renderHook(() => useBottomScrollListener(callback));

    const mockElement = document.createElement('div');
    mockElement.style.height = '10000px';
    document.body.appendChild(mockElement);

    global.window.scrollTo(0, 0);
    global.window.dispatchEvent(new Event('scroll'));

    expect(callback).not.toHaveBeenCalled();
    document.body.removeChild(mockElement);
  });
});
