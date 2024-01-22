import { useState, useEffect } from 'react';

import { debounce } from '@/util/debounce';

type CallbackFunction = () => void;

const useBottomScrollListener = (
  callback: CallbackFunction,
  debounceTime = 300
) => {
  const [bottomReached, setBottomReached] = useState(false);

  const debouncedCallback = debounce(callback, debounceTime);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const height = document.documentElement.scrollHeight;

    const bottomOfWindow = Math.ceil(scrollTop + windowHeight) >= height;

    if (bottomOfWindow) {
      setBottomReached(true);
      debouncedCallback();
    } else {
      setBottomReached(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return bottomReached;
};

export default useBottomScrollListener;
