import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { FormattedMessage } from 'react-intl';
import { useCopyToClipboard } from '../useCopyToClipboard';
import { LocaleProvider } from '../../providers/localeProvider';
import { AppProps } from '../../types';

const mockWriteText = jest.fn();
const i18nData = { currentLocale: { code: 'en' } } as AppProps['i18nData'];

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
      <LocaleProvider i18nData={i18nData}>
        <button onClick={() => copyText(textToCopy)} type="button">
          <FormattedMessage id="components.codeBox.copy" values={{ copied }} />
        </button>
      </LocaleProvider>
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
