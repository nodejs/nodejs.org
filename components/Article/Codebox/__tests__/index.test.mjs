import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import Codebox, { replaceLabelLanguages, replaceLanguages } from '..';

describe('Codebox component', () => {
  it('should render Codebox component', async () => {
    const code = 'const a = 1;';
    const { container } = render(
      <Codebox>
        <pre className="language-js">{code}</pre>
      </Codebox>
    );
    await waitFor(() => container.querySelector('pre[tabindex="0"]'));
  });
});

describe('Replacer tests', () => {
  it('replaceLabelLanguages', () => {
    expect(replaceLabelLanguages('language-console')).toBe('bash');
  });

  it('replaceLanguages', () => {
    expect(replaceLanguages('language-mjs')).toBe('language-js');
    expect(replaceLanguages('language-cjs')).toBe('language-js');
    expect(replaceLanguages('language-javascript')).toBe('language-js');
    expect(replaceLanguages('language-console')).toBe('language-bash');
    expect(replaceLanguages('language-shell')).toBe('language-bash');
  });
});

describe('Codebox component (one lang)', () => {
  const code = 'const a = 1;';

  it('should copy content', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <IntlProvider locale="en" onError={() => {}}>
        <Codebox>
          <pre className="language-js">{code}</pre>
        </Codebox>
      </IntlProvider>
    );

    const navigatorClipboardWriteTextSpy = jest.spyOn(
      navigator.clipboard,
      'writeText'
    );

    const buttonElement = container.querySelector('[aria-hidden=true]');

    expect(buttonElement).not.toBeNull();

    await user.click(buttonElement);

    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledTimes(1);
    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledWith(code);
  });

  it('should copy content with textToCopy', async () => {
    const user = userEvent.setup();

    const textToCopy = ['Example code'];

    const { container } = render(
      <IntlProvider locale="en" onError={() => {}}>
        <Codebox textToCopy={textToCopy}>
          <pre className="language-js">{code}</pre>
        </Codebox>
      </IntlProvider>
    );

    const navigatorClipboardWriteTextSpy = jest.spyOn(
      navigator.clipboard,
      'writeText'
    );

    const buttonElement = container.querySelector('button[aria-hidden=true]');

    expect(buttonElement).not.toBeNull();

    await user.click(buttonElement);

    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledTimes(1);
    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledWith(textToCopy[0]);
  });
});

describe('Codebox component (multiple langs)', () => {
  const code = `const http = require('http');
--------------
import http from 'http';`;

  it('switch between languages', async () => {
    const user = userEvent.setup();

    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Codebox>
          <pre className="language-cjs|language-mjs">{code}</pre>
        </Codebox>
      </IntlProvider>
    );

    const firstLanguage = await screen.findByText('cjs');

    expect(firstLanguage).not.toBeNull();
    expect(firstLanguage.getAttribute('data-selected')).toBe('true');

    const secondLanguage = await screen.findByText('mjs');
    expect(secondLanguage).not.toBeNull();

    await user.click(secondLanguage);

    expect(secondLanguage.getAttribute('data-selected')).toBe('true');
  });

  it('should copy content with textToCopy', async () => {
    const user = userEvent.setup();

    const textToCopy = ['Example code 1', 'Example code 2'];

    const { container } = render(
      <IntlProvider locale="en" onError={() => {}}>
        <Codebox textToCopy={textToCopy}>
          <pre className="language-cjs|language-mjs">{code}</pre>
        </Codebox>
      </IntlProvider>
    );

    const navigatorClipboardWriteTextSpy = jest.spyOn(
      navigator.clipboard,
      'writeText'
    );

    const copyButton = container.querySelector('button[aria-hidden=true]');

    expect(copyButton).not.toBeNull();

    await user.click(copyButton);

    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledTimes(1);
    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledWith(textToCopy[0]);

    const buttonElement = await screen.findByText('mjs');
    await user.click(buttonElement);

    await user.click(copyButton);

    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledTimes(2);
    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledWith(textToCopy[1]);
  });
});
