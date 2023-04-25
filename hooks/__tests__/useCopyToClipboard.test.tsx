import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { FormattedMessage } from 'react-intl';
import { useCopyToClipboard } from '../useCopyToClipboard';
import { LocaleProvider } from '../../providers/localeProvider';
import type { AppProps } from '../../types';

const i18nData = { currentLocale: { code: 'en' } } as AppProps['i18nData'];

describe('useCopyToClipboard', () => {
  const HookRenderer = ({ text }: { text: string }) => {
    const [copied, copyText] = useCopyToClipboard();

    return (
      <LocaleProvider i18nData={i18nData}>
        <button onClick={() => copyText(text)} type="button">
          <FormattedMessage id="components.codeBox.copy" values={{ copied }} />
        </button>
      </LocaleProvider>
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
    expect(button).toHaveTextContent('components.codeBox.copy');
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
      expect(button).toHaveTextContent('components.codeBox.copy');
    });
    jest.advanceTimersByTime(3000);
    await waitFor(() => {
      expect(button).toHaveTextContent('components.codeBox.copy');
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
