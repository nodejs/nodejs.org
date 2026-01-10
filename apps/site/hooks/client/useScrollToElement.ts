'use client';

import { useContext, useEffect } from 'react';

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
    if (!ref.current) {
      return;
    }

    // Restore scroll position if saved state exists
    const savedState = navigationState[id];

    // Scroll only if the saved position differs from current
    if (savedState && savedState.y !== ref.current.scrollTop) {
      ref.current.scroll({ top: savedState.y, behavior: 'auto' });
    }
    // navigationState is intentionally excluded
    // it's a stable object reference that doesn't need to trigger re-runs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, ref]);

  // Save scroll position on scroll
  const handleScroll = (position: { x: number; y: number }) => {
    // Save the current scroll position in the navigation state
    const state = navigationState as Record<string, { x: number; y: number }>;
    state[id] = position;
  };

  // Use the useScroll hook to handle scroll events with debouncing
  useScroll(ref, { debounceTime, onScroll: handleScroll });
};

export default useScrollToElement;
