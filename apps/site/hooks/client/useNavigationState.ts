'use client';

import { useContext, useEffect, useRef } from 'react';

import { NavigationStateContext } from '#site/providers/navigationStateProvider';

import type { RefObject } from 'react';

const useNavigationState = <T extends HTMLElement>(
  id: string,
  ref: RefObject<T | null>,
  debounceTime = 300
) => {
  const navigationState = useContext(NavigationStateContext);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    // Restore scroll position if saved state exists
    if (navigationState[id] && navigationState[id].y !== element.scrollTop) {
      element.scroll({ top: navigationState[id].y, behavior: 'auto' });
    }

    // Debounced scroll handler
    const handleScroll = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (element) {
          navigationState[id] = {
            x: element.scrollLeft,
            y: element.scrollTop,
          };
        }
      }, debounceTime);
    };

    element.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      element.removeEventListener('scroll', handleScroll);
      // Clear any pending debounced calls
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // We need this effect to run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useNavigationState;
