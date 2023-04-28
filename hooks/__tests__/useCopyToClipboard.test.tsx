import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { useCopyToClipboard } from '../useCopyToClipboard';

describe('useCopyToClipboard', () => {
  const HookRenderer = ({ text }: { text: string }) => {
    const [copied, copyText] = useCopyToClipboard();

    return (
      <button onClick={() => copyText(text)} type="button">
        {copied ? 'copied' : 'copy'}
      </button>
    );
  };

  it('should have `copy` text when failed', async () => {
    const navigatorClipboardWriteTextSpy = jest
      .fn()
      .mockImplementation(() => Promise.reject());

    Object.defineProperty(window.navigator, 'clipboard', {
      writable: true,
      value: {
        writeText: navigatorClipboardWriteTextSpy,
      },
    });

    render(<HookRenderer text="test copy" />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button).toHaveTextContent('copy');
  });

  it('should change to `copied` when copy succeeded', async () => {
    jest.useFakeTimers();
    const navigatorClipboardWriteTextSpy = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    Object.defineProperty(window.navigator, 'clipboard', {
      writable: true,
      value: {
        writeText: navigatorClipboardWriteTextSpy,
      },
    });

    render(<HookRenderer text="test copy" />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    await waitFor(() => {
      expect(button).toHaveTextContent('copied');
    });
    jest.advanceTimersByTime(3000);
    await waitFor(() => {
      expect(button).toHaveTextContent('copy');
    });
  });

  it('should call clipboard API with `test` once', () => {
    const navigatorClipboardWriteTextSpy = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    Object.defineProperty(window.navigator, 'clipboard', {
      writable: true,
      value: {
        writeText: navigatorClipboardWriteTextSpy,
      },
    });

    render(<HookRenderer text="test" />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledTimes(1);
    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledWith('test');
  });
});
