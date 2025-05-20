import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { render } from '@testing-library/react';

describe('ThemeProvider', () => {
  it('renders NextThemeProvider with the correct props', async t => {
    const mockFn = t.mock.fn(
      () => {},
      ({ children }) => children
    );

    t.mock.module('next-themes', {
      namedExports: {
        ThemeProvider: mockFn,
      },
    });

    const { ThemeProvider } = await import('#site/providers/themeProvider');

    const { container } = render(
      <ThemeProvider>
        <div>Mock Component</div>
      </ThemeProvider>
    );

    assert.deepEqual(mockFn.mock.calls[0].arguments, [
      {
        attribute: 'data-theme',
        defaultTheme: 'system',
        enableSystem: true,
        storageKey: 'theme',
        children: <div>Mock Component</div>,
      },
      undefined,
    ]);

    assert.ok(container.firstChild.textContent.includes('Mock Component'));
  });
});
