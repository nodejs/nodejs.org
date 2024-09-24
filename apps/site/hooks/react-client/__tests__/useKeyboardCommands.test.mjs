import { renderHook, act, fireEvent } from '@testing-library/react';

import useKeyboardCommands from '@/hooks/react-client/useKeyboardCommands';

describe('useKeyboardCommands', () => {
  it('should call the callback function with the correct command', () => {
    const fn = jest.fn();
    renderHook(props => useKeyboardCommands(props), { initialProps: fn });

    act(() => {
      fireEvent.keyDown(document, { key: 'k', metaKey: true });
    });
    expect(fn).toHaveBeenCalledWith('cmd-k');
    fn.mockClear();

    act(() => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });
    expect(fn).toHaveBeenCalledWith('escape');
    fn.mockClear();

    act(() => {
      fireEvent.keyDown(document, { key: 'Enter' });
    });
    expect(fn).toHaveBeenCalledWith('enter');
    fn.mockClear();

    act(() => {
      fireEvent.keyDown(document, { key: 'ArrowDown' });
    });
    expect(fn).toHaveBeenCalledWith('down');
    fn.mockClear();

    act(() => {
      fireEvent.keyDown(document, { key: 'ArrowUp' });
    });
    expect(fn).toHaveBeenCalledWith('up');
    fn.mockClear();
  });

  it('should not call the callback function for unsupported keys', () => {
    const fn = jest.fn();
    renderHook(props => useKeyboardCommands(props), { initialProps: fn });

    act(() => {
      fireEvent.keyDown(document, { key: 'a' });
    });

    expect(fn).not.toHaveBeenCalled();
  });
});
