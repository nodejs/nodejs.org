import type { RefObject } from 'react';
import { useEffect } from 'react';

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  fn: () => void
) => {
  useEffect(() => {
    const element = ref?.current;
    function handleClickOutside(event: Event) {
      if (element && !element.contains(event.target as Node | null)) {
        fn();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, fn]);
};
