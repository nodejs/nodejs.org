/**
 * A hook for detecting key presses.
 */
import { useEffect, useState } from 'react';

const decorateKey = ({ metaKey, ctrlKey, key }: KeyboardEvent) => {
  if (metaKey) {
    return `meta+${key}`;
  }

  if (ctrlKey) {
    return `ctrl+${key}`;
  }

  return key;
};

interface UseKeyPressProps {
  targetKey: string;
  callback?: () => void;
  preventDefault?: boolean;
}

function useKeyPress({
  targetKey,
  callback,
  preventDefault = false,
}: UseKeyPressProps): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = (e: KeyboardEvent) => {
      if (decorateKey(e) === targetKey) {
        if (preventDefault) {
          e.preventDefault();
        }
        setKeyPressed(true);
        if (typeof callback === 'function') {
          callback();
        }
      }
    };

    const upHandler = (e: KeyboardEvent) => {
      if (decorateKey(e) === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [callback, targetKey, preventDefault]);
  return keyPressed;
}

export default useKeyPress;
