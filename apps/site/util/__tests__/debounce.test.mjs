import { debounce } from '@/util/debounce';

describe('debounce', () => {
  jest.useFakeTimers();

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

  it('should delay the execution of the function', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 1000);

    debouncedFn();

    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(fn).toHaveBeenCalled();
  });

  it('should execute only once within the delay', () => {
    const fn = jest.fn();
    const debouncedFn = debounce(fn, 1000);

    debouncedFn();
    jest.advanceTimersByTime(500);
    debouncedFn();
    jest.advanceTimersByTime(500);
    debouncedFn();
    jest.advanceTimersByTime(1000);

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
