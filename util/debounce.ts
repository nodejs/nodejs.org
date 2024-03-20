type DebounceFunction<T = unknown> = (...args: Array<T>) => void;

let timeoutId: NodeJS.Timeout;

export const debounce =
  <T extends DebounceFunction>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) =>
  (...args: Parameters<T>) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
