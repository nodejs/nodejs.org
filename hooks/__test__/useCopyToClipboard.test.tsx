import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { FormattedMessage } from 'react-intl';
import { useCopyToClipboard } from '../useCopyToClipboard';
import { IntlProvider } from 'react-intl';
import messages from '../../i18n/locales/en.json';

const mockWriteText = jest.fn();

Object.defineProperty(window, 'navigator', {
  value: {
    clipboard: {
      writeText: mockWriteText,
    },
  },
});

describe('useCopyToClipboard', () => {
  const TestComponent = ({ textToCopy }: { textToCopy: string }) => {
    const [copied, copyText] = useCopyToClipboard();

    return (
      <IntlProvider locale="en" messages={messages}>
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
