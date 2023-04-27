import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import Codebox, { replaceLabelLanguages, replaceLanguages } from '../index';

const navigatorClipboardWriteTextSpy = jest
  .fn()
  .mockImplementation(() => Promise.resolve());

Object.defineProperty(window.navigator, 'clipboard', {
  writable: true,
  value: {
    writeText: navigatorClipboardWriteTextSpy,
  },
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Replacer tests', (): void => {
  it('replaceLabelLanguages', (): void => {
    expect(replaceLabelLanguages('language-console')).toBe('language-bash');
  });

  it('replaceLanguages', (): void => {
    expect(replaceLanguages('language-mjs')).toBe('language-js');
    expect(replaceLanguages('language-cjs')).toBe('language-js');
    expect(replaceLanguages('language-javascript')).toBe('language-js');
    expect(replaceLanguages('language-console')).toBe('language-bash');
    expect(replaceLanguages('language-shell')).toBe('language-bash');
  });
});

describe('Codebox component (one lang)', (): void => {
  const code = 'const a = 1;';

  it('renders correctly', (): void => {
    const { container } = render(
      <IntlProvider locale="en" onError={() => {}}>
        <Codebox>
          <code className="language-js">{code}</code>
        </Codebox>
      </IntlProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should copy content', async () => {
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Codebox>
          <code className="language-js">{code}</code>
        </Codebox>
      </IntlProvider>
    );

    const buttonElement = screen.getByText('components.codeBox.copy');
    fireEvent.click(buttonElement);

    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledTimes(1);
    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledWith(code);
  });
});

describe('Codebox component (multiple langs)', (): void => {
  const code = `const http = require('http');
  -------
  import http from 'http';`;

  it('renders correctly', (): void => {
    const { container } = render(
      <IntlProvider locale="en" onError={() => {}}>
        <Codebox>
          <code className="language-js|language-js">{code}</code>
        </Codebox>
      </IntlProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('switch between languages', async () => {
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Codebox>
          <code className="language-cjs|language-mjs">{code}</code>
        </Codebox>
      </IntlProvider>
    );

    const buttonElement = screen.getByText('cjs');
    userEvent.click(buttonElement);

    await screen.findByText('cjs');

    expect(screen.getByText('cjs')).toBeInTheDocument();
  });

  it('switch between sync and async', async () => {
    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Codebox>
          <code className="language-async|language-sync">{code}</code>
        </Codebox>
      </IntlProvider>
    );

    const buttonElement = screen.getByText('async');
    userEvent.click(buttonElement);

    await screen.findByText('async');

    expect(screen.getByText('async')).toBeInTheDocument();
  });
});
