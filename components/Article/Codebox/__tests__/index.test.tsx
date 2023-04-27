import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import Codebox, { replaceLabelLanguages, replaceLanguages } from '../index';

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
          <pre className="language-js">{code}</pre>
        </Codebox>
      </IntlProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should copy content', async () => {
    const user = userEvent.setup();

    render(
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

    const buttonElement = screen.getByText('components.codeBox.copy');
    await user.click(buttonElement);

    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledTimes(1);
    expect(navigatorClipboardWriteTextSpy).toHaveBeenCalledWith(code);
  });
});

describe('Codebox component (multiple langs)', (): void => {
  const code = `const http = require('http');
--------------
import http from 'http';`;

  it('renders correctly', (): void => {
    const { container } = render(
      <IntlProvider locale="en" onError={() => {}}>
        <Codebox>
          <pre className="language-js|language-js">{code}</pre>
        </Codebox>
      </IntlProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('switch between languages', async () => {
    const user = userEvent.setup();

    render(
      <IntlProvider locale="en" onError={() => {}}>
        <Codebox>
          <pre className="language-cjs|language-mjs">{code}</pre>
        </Codebox>
      </IntlProvider>
    );

    const buttonElement = screen.getByText('cjs');
    await user.click(buttonElement);

    await screen.findByText('mjs');

    expect(screen.getByText('mjs')).toBeInTheDocument();
  });
});
