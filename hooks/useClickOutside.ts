import { useEffect, useRef } from 'react';

type useClickOutsideType = (
  // eslint-disable-next-line no-unused-vars
  event: MouseEvent | TouchEvent
) => void;

export const useClickOutside = <T extends HTMLElement>(
  handler: useClickOutsideType
) => {
  const ref = useRef<T>(null);
  useEffect(() => {
    const clickEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener(clickEvent, listener, true);
    return () => document.removeEventListener(clickEvent, listener);
  }, [ref, handler]);
  return ref;
};
