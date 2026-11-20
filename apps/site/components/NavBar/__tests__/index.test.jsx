import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

import { render, screen } from '@testing-library/react';

mock.module('next-intl/server', {
  namedExports: {
    getTranslations: async () => key => key,
    getLocale: async () => 'en',
  },
});

mock.module('#site/client-context', {
  namedExports: {
    getClientContext: () => ({ pathname: '/about', frontmatter: {} }),
  },
});

mock.module('#site/components/Search', { defaultExport: () => null });
mock.module('../ThemeToggle', { defaultExport: () => null });

const { default: NavBar } = await import('..');

describe('NavBar', () => {
  it('renders the top navigation on the server', async () => {
    render(await NavBar());

    const about = screen.getByRole('link', {
      name: 'components.containers.navBar.links.about',
    });

    assert.equal(about.getAttribute('href'), '/about');
  });
});
