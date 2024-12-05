'use client';

import type { RefObject } from 'react';
import { useContext, useEffect } from 'react';

import { NavigationStateContext } from '@/providers/navigationStateProvider';
import { debounce } from '@/util/debounce';

const useNavigationState = <T extends HTMLElement>(
  id: string,
  ref: RefObject<T | null>,
  debounceTime = 300
) => {
  const navigationState = useContext(NavigationStateContext);

  const handleScroll = debounce(() => {
    if (ref.current) {
      navigationState[id] = {
        x: ref.current.scrollLeft,
        y: ref.current.scrollTop,
      };
    }
  }, debounceTime);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      if (navigationState[id] && navigationState[id].y !== element.scrollTop) {
        element.scroll({ top: navigationState[id].y, behavior: 'instant' });
      }

      element.addEventListener('scroll', handleScroll, { passive: true });

      return () => element.removeEventListener('scroll', handleScroll);
    }
    // We need this effect to run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useNavigationState;
