import { useEffect } from 'react';
import type { RefObject } from 'react';

// eslint-disable-next-line no-unused-vars
type TypeHandler = (event: MouseEvent | TouchEvent) => void;

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: TypeHandler
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener, true);
    document.addEventListener('touchstart', listener, true);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
