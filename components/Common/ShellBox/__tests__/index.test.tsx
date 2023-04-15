import React from 'react';
import { render, screen } from '@testing-library/react';
import { LocaleProvider } from '../../../../providers/localeProvider';
import userEvent from '@testing-library/user-event';
import { AppProps } from '../../../../types';
import ShellBox from '../index';

const mockWriteText = jest.fn();
const i18nData = { currentLocale: { code: 'en' } } as AppProps['i18nData'];

Object.defineProperty(window, 'navigator', {
  value: {
    clipboard: {
      writeText: mockWriteText,
    },
  },
});

describe('ShellBox', () => {
  it('should render', () => {
    const { container } = render(
      <LocaleProvider i18nData={i18nData}>
        <ShellBox>test</ShellBox>
      </LocaleProvider>
    );
    expect(container).toMatchSnapshot();
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

    render(
      <LocaleProvider i18nData={i18nData}>
        <ShellBox textToCopy="test">test</ShellBox>
      </LocaleProvider>
    );
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledTimes(1);
    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledWith('test');
  });
});
