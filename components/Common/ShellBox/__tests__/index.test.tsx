import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import messages from '../../../../i18n/locales/en.json';
import ShellBox from '../index';

const mockWriteText = jest.fn();
const originalNavigator = { ...window.navigator };

describe('ShellBox', () => {
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

  it('should render', () => {
    const { container } = render(
      <IntlProvider locale="en" messages={messages}>
        <ShellBox>test</ShellBox>
      </IntlProvider>
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
      <IntlProvider locale="en" messages={messages}>
        <ShellBox textToCopy="test">test</ShellBox>
      </IntlProvider>
    );
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledTimes(1);
    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledWith('test');
  });
});
