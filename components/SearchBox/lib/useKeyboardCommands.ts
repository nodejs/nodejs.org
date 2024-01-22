import { useEffect } from 'react';

type KeyboardCommand = 'cmd-k' | 'escape' | 'down' | 'up';

type KeyboardCommandCallback = (key: KeyboardCommand) => void;

export const useKeyboardCommands = (fn: KeyboardCommandCallback) => {
  useEffect(() => {
    document.addEventListener('keydown', event => {
      // Detect ⌘ + k on Mac, Ctrl + k on Windows
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        fn('cmd-k');
      }

      if (event.key === 'Escape') {
        fn('escape');
      }

      if (event.key === 'ArrowDown') {
        fn('down');
      }

      if (event.key === 'ArrowUp') {
        fn('up');
      }
    });

    return () => {
      document.removeEventListener('keydown', () => {});
    };
  }, []);
};
