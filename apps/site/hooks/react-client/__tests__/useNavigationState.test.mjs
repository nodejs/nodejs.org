import { renderHook, act } from '@testing-library/react';
import { useRef } from 'react';

import useNavigationState from '@/hooks/react-client/useNavigationState';
import { NavigationStateContext } from '@/providers/navigationStateProvider';

describe('useNavigationState', () => {
  it('should save and restore scroll position', () => {
    const mockElement = {
      scrollLeft: 0,
      scrollTop: 0,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      scroll: jest.fn(),
    };

    const mockRef = { current: mockElement };
    const mockContextValue = {};

    const wrapper = ({ children }) => (
      <NavigationStateContext.Provider value={mockContextValue}>
        {children}
      </NavigationStateContext.Provider>
    );

    renderHook(() => useNavigationState('test-id', mockRef), { wrapper });

    expect(mockElement.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    );

    act(() => {
      mockElement.scrollTop = 100;
      mockElement.scrollLeft = 50;
      mockElement.addEventListener.mock.calls[0][1]();
    });

    expect(mockContextValue['test-id']).toEqual({ x: 50, y: 100 });

    act(() => {
      mockElement.scrollTop = 0;
      mockElement.scrollLeft = 0;
      mockElement.scroll.mock.calls[0][0]();
    });

    expect(mockElement.scroll).toHaveBeenCalledWith({
      top: 100,
      behavior: 'instant',
    });
  });

  it('should add and remove scroll event listener', () => {
    const mockElement = {
      scrollLeft: 0,
      scrollTop: 0,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    const mockRef = { current: mockElement };
    const mockContextValue = {};

    const wrapper = ({ children }) => (
      <NavigationStateContext.Provider value={mockContextValue}>
        {children}
      </NavigationStateContext.Provider>
    );

    const { unmount } = renderHook(() => useNavigationState('test-id', mockRef), {
      wrapper,
    });

    expect(mockElement.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    );

    unmount();

    expect(mockElement.removeEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });
});
