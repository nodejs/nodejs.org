import { render, fireEvent, screen } from '@testing-library/react';
import { FormattedMessage } from 'react-intl';
import { IntlProvider } from 'react-intl';
import { useCopyToClipboard } from '../useCopyToClipboard';

const mockWriteText = jest.fn();
const originalNavigator = { ...window.navigator };

describe('useCopyToClipboard', () => {
  beforeEach(() => {
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

  const TestComponent = ({ textToCopy }: { textToCopy: string }) => {
    const [copied, copyText] = useCopyToClipboard();

    return (
      <IntlProvider locale="en" onError={() => {}}>
        <button onClick={() => copyText(textToCopy)} type="button">
          <FormattedMessage
            id="components.common.shellBox.copy"
            values={{ copied }}
          />
        </button>
      </IntlProvider>
    );
  };

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

    render(<TestComponent textToCopy="test" />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledTimes(1);
    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledWith('test');
  });
});
