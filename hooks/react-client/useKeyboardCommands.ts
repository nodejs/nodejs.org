import { useEffect } from 'react';

type KeyboardCommand = 'cmd-k' | 'escape' | 'down' | 'up' | 'enter';

type KeyboardCommandCallback = (key: KeyboardCommand) => void;

const useKeyboardCommands = (fn: KeyboardCommandCallback) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Detect ⌘ + k on Mac, Ctrl + k on Windows
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        fn('cmd-k');
      }

      switch (event.key) {
        case 'Escape':
          fn('escape');
          break;
        case 'Enter':
          fn('enter');
          break;
        case 'ArrowDown':
          fn('down');
          break;
        case 'ArrowUp':
          fn('up');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [fn]);
};

export default useKeyboardCommands;
