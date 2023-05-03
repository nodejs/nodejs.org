import { useEffect } from 'react';
import type { RefObject, MouseEvent, TouchEvent } from 'react';

// eslint-disable-next-line no-unused-vars
type TypeHandler = (_event: MouseEvent | TouchEvent) => void;

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

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
