type DebounceFunction<T = unknown> = (...args: Array<T>) => void;

export const debounce = <T extends DebounceFunction>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
