import { useEffect, useRef } from 'react';

type useClickOutsideType = (_event: MouseEvent | TouchEvent) => void;

export const useClickOutside = <T extends HTMLElement>(
  handler: useClickOutsideType
) => {
  const ref = useRef<T>(null);
  useEffect(() => {
    const clickEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
    const listener = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event);
      }
    };

    document.addEventListener(clickEvent, listener, true);
    return () => document.removeEventListener(clickEvent, listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, handler]);
  return ref;
};
