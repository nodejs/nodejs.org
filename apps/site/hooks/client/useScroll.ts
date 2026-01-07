'use client';

import { useEffect, useRef } from 'react';

import type { RefObject } from 'react';

type ScrollPosition = {
  x: number;
  y: number;
};

type UseScrollOptions = {
  debounceTime?: number;
  onScroll?: (position: ScrollPosition) => void;
};

// Custom hook to handle scroll events with optional debouncing
const useScroll = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  { debounceTime = 300, onScroll }: UseScrollOptions = {}
) => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    // Get the current element
    const element = ref.current;

    // Return early if no element or onScroll callback is provided
    if (!element || !onScroll) {
      return;
    }

    // Debounced scroll handler
    const handleScroll = () => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout to call onScroll after debounceTime
      timeoutRef.current = setTimeout(() => {
        if (element) {
          onScroll({
            x: element.scrollLeft,
            y: element.scrollTop,
          });
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
  }, [ref, onScroll, debounceTime]);
};

export default useScroll;
