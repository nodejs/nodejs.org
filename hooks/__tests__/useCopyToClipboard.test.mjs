import { render, fireEvent, screen, act } from '@testing-library/react';
import { FormattedMessage } from 'react-intl';
import { IntlProvider } from 'react-intl';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

const mockWriteText = jest.fn();
const originalNavigator = { ...window.navigator };

const testMessages = {
  'components.common.shellBox.copy':
    '{copied, select, true {copied}other {copy}}',
};

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

    const TestComponent = ({ textToCopy }: { textToCopy: string }) => {
      const [copied, copyText] = useCopyToClipboard();

      return (
        <IntlProvider locale="en" messages={testMessages} onError={() => {}}>
          <button onClick={() => copyText(textToCopy)} type="button">
            <FormattedMessage
              id="components.common.shellBox.copy"
              values={{ copied }}
            />
          </button>
        </IntlProvider>
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
