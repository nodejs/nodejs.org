import { useState, useEffect } from 'react';

type CallbackFunction = () => void;

export const useBottomScrollListener = (
  callback: CallbackFunction,
  debounceTime = 300
) => {
  const [bottomReached, setBottomReached] = useState(false);
  let timeoutId: NodeJS.Timeout | null = null;

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const height = document.documentElement.scrollHeight;

    const bottomOfWindow = Math.ceil(scrollTop + windowHeight) >= height;

    if (bottomOfWindow) {
      setBottomReached(true);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        callback();
      }, debounceTime);
    } else {
      setBottomReached(false);
    }
  };

  useEffect(() => {
    // Add the event listener with the passive option set to true
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return bottomReached;
};
