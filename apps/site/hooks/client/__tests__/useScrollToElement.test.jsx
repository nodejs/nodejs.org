import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';

import useScrollToElement from '#site/hooks/client/useScrollToElement.js';
import { NavigationStateContext } from '#site/providers/navigationStateProvider';

describe('useScrollToElement', () => {
  let mockElement;
  let mockRef;
  let navigationState;

  beforeEach(() => {
    navigationState = {};
    
    mockElement = {
      scrollTop: 0,
      scrollLeft: 0,
      scroll: mock.fn(),
      addEventListener: mock.fn(),
      removeEventListener: mock.fn(),
    };

    mockRef = { current: mockElement };
  });

  afterEach(() => {
    mock.reset();
  });

  it('should handle scroll restoration with various scenarios', () => {
    const wrapper = ({ children }) => (
      <NavigationStateContext.Provider value={navigationState}>
        {children}
      </NavigationStateContext.Provider>
    );

    // Should restore scroll position on mount if saved state exists
    navigationState.sidebar = { x: 100, y: 200 };
    const { unmount: unmount1 } = renderHook(() => useScrollToElement('sidebar', mockRef), { wrapper });

    assert.equal(mockElement.scroll.mock.callCount(), 1);
    assert.deepEqual(mockElement.scroll.mock.calls[0].arguments, [
      { top: 200, behavior: 'auto' },
    ]);

    unmount1();
    mock.reset();
    mockElement.scroll = mock.fn();

    // Should not restore if no saved state exists
    navigationState = {};
    const { unmount: unmount2 } = renderHook(() => useScrollToElement('sidebar', mockRef), { wrapper });
    assert.equal(mockElement.scroll.mock.callCount(), 0);

    unmount2();
    mock.reset();
    mockElement.scroll = mock.fn();

    // Should not restore if current position matches saved state
    navigationState.sidebar = { x: 0, y: 0 };
    mockElement.scrollTop = 0;
    const { unmount: unmount3 } = renderHook(() => useScrollToElement('sidebar', mockRef), { wrapper });
    assert.equal(mockElement.scroll.mock.callCount(), 0);

    unmount3();
    mock.reset();
    mockElement.scroll = mock.fn();

    // Should restore scroll to element that was outside viewport (deep scroll)
    navigationState.sidebar = { x: 0, y: 1500 };
    mockElement.scrollTop = 0;
    renderHook(() => useScrollToElement('sidebar', mockRef), { wrapper });

    assert.equal(mockElement.scroll.mock.callCount(), 1);
    assert.deepEqual(mockElement.scroll.mock.calls[0].arguments, [
      { top: 1500, behavior: 'auto' },
    ]);
  });

  it('should persist and restore scroll position across navigation', async () => {
    const wrapper = ({ children }) => (
      <NavigationStateContext.Provider value={navigationState}>
        {children}
      </NavigationStateContext.Provider>
    );

    // First render: user scrolls to position 800
    const { unmount } = renderHook(() => useScrollToElement('sidebar', mockRef), { wrapper });

    const scrollHandler = mockElement.addEventListener.mock.calls[0].arguments[1];
    mockElement.scrollTop = 800;
    mockElement.scrollLeft = 0;
    scrollHandler();

    // Wait for debounce
    await new Promise(resolve => setTimeout(resolve, 350));

    // Position should be saved
    assert.deepEqual(navigationState.sidebar, { x: 0, y: 800 });

    // Simulate navigation (unmount)
    unmount();

    // Simulate navigation back (remount with element at top)
    mockElement.scrollTop = 0;
    mock.reset();
    mockElement.scroll = mock.fn();
    mockElement.addEventListener = mock.fn();
    mockElement.removeEventListener = mock.fn();
    mockRef.current = mockElement;

    renderHook(() => useScrollToElement('sidebar', mockRef), { wrapper });

    // Should restore to position 800
    assert.equal(mockElement.scroll.mock.callCount(), 1);
    assert.deepEqual(mockElement.scroll.mock.calls[0].arguments, [
      { top: 800, behavior: 'auto' },
    ]);

    // Also test that scroll position is saved to navigation state during scroll
    mock.reset();
    mockElement.addEventListener = mock.fn();
    mockElement.scroll = mock.fn();
    navigationState = {};

    renderHook(() => useScrollToElement('sidebar', mockRef), { wrapper });

    // Get the scroll handler that was registered
    const scrollHandler2 = mockElement.addEventListener.mock.calls[0].arguments[1];

    // Simulate scroll
    mockElement.scrollTop = 150;
    mockElement.scrollLeft = 50;

    // Call the handler
    scrollHandler2();

    // Wait for debounce (default 300ms)
    await new Promise(resolve => setTimeout(resolve, 350));

    // Check that navigation state was updated
    assert.deepEqual(navigationState.sidebar, { x: 50, y: 150 });
  });
});
