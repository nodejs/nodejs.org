'use client';

import { useCallback, useContext, useEffect, useRef } from 'react';

import { NavigationStateContext } from '#site/providers/navigationStateProvider';

import type { RefObject } from 'react';

const useNavigationState = <T extends HTMLElement>(
  id: string,
  ref: RefObject<T | null>,
  debounceTime = 300
) => {
  const navigationState = useContext(NavigationStateContext);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (ref.current) {
        navigationState[id] = {
          x: ref.current.scrollLeft,
          y: ref.current.scrollTop,
        };
      }
    }, debounceTime);
  }, [id, ref, navigationState, debounceTime]);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      if (navigationState[id] && navigationState[id].y !== element.scrollTop) {
        element.scroll({ top: navigationState[id].y, behavior: 'auto' });
      }

      element.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        element.removeEventListener('scroll', handleScroll);
        // Clear any pending debounced calls
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }
    // We need this effect to run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useNavigationState;
