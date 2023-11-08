import { render, fireEvent, screen, act } from '@testing-library/react';

import { useCopyToClipboard } from '..';

const mockWriteText = jest.fn();
const originalNavigator = { ...window.navigator };

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    jest.useFakeTimers();

    Object.defineProperty(window, 'navigator', {
      value: {
        clipboard: {
          writeText: mockWriteText,
        },
      },
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
    });
  });

  it('should call clipboard API with `test` once', async () => {
    const navigatorClipboardWriteTextSpy = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    Object.defineProperty(window.navigator, 'clipboard', {
      writable: true,
      value: {
        writeText: navigatorClipboardWriteTextSpy,
      },
    });

    const TestComponent = ({ textToCopy }) => {
      const [copied, copyText] = useCopyToClipboard();

      return (
        <button onClick={() => copyText(textToCopy)} type="button">
          {copied ? 'copied' : 'copy'}
        </button>
      );
    };

    render(<TestComponent textToCopy="test" />);

    const button = screen.getByRole('button');

    await fireEvent.click(button);

    expect(await screen.findByText(/copied/i)).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(3000));

    expect(await screen.findByText(/copy/i)).toBeInTheDocument();

    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledTimes(1);
    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledWith('test');
  });
});
