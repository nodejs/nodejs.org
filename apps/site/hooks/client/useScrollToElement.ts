'use client';

import { useCallback, useContext, useEffect } from 'react';

import { NavigationStateContext } from '#site/providers/navigationStateProvider';

import type { RefObject } from 'react';

import useScroll from './useScroll';

const useScrollToElement = <T extends HTMLElement>(
  id: string,
  ref: RefObject<T | null>,
  debounceTime = 300
) => {
  const navigationState = useContext(NavigationStateContext);

  // Restore scroll position on mount
  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    // Restore scroll position if saved state exists
    const savedState = navigationState[id];

    // Scroll only if the saved position differs from current
    if (savedState && savedState.y !== element.scrollTop) {
      element.scroll({ top: savedState.y, behavior: 'auto' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, ref]);

  // Save scroll position on scroll
  const handleScroll = useCallback(
    (position: { x: number; y: number }) => {
      // Save the current scroll position in the navigation state
      const state = navigationState as Record<string, { x: number; y: number }>;
      state[id] = position;
    },
    [id, navigationState]
  );

  // Use the useScroll hook to handle scroll events with debouncing
  useScroll(ref, { debounceTime, onScroll: handleScroll });
};

export default useScrollToElement;
