import { useState, useEffect } from 'react';

type CallbackFunction = () => void;

export const useBottomScrollListener = (callback: CallbackFunction) => {
  const [bottomReached, setBottomReached] = useState(false);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const height = document.documentElement.scrollHeight;

    const bottomOfWindow = Math.ceil(scrollTop + windowHeight) >= height;

    if (bottomOfWindow) {
      setBottomReached(true);
      callback();
    } else {
      setBottomReached(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return bottomReached;
};
