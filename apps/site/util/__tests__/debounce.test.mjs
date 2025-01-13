import { debounce } from '@/util/debounce';

jest.useFakeTimers();

describe('debounce', () => {
  it('should call the function only once', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 1000);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    jest.runAllTimers();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should call the function with the last arguments', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 1000);

    debouncedFn(1);
    debouncedFn(2);
    debouncedFn(3);

    jest.runAllTimers();

    expect(fn).toHaveBeenCalledWith(3);
  });

  it('should call the function after the delay', () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 500);

    debouncedFn();
    expect(mockFn).not.toBeCalled();

    jest.advanceTimersByTime(500);
    expect(mockFn).toBeCalled();
  });
});
