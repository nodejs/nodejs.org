import assert from 'node:assert/strict';
import { describe, it, mock } from 'node:test';

import { render, screen } from '@testing-library/react';

const context = {
  pathname: '/about/governance',
  frontmatter: { title: 'Project Governance' },
};

mock.module('next-intl/server', {
  namedExports: { getTranslations: async () => key => key },
});

mock.module('#site/client-context', {
  namedExports: { getClientContext: () => context },
});

const { default: Sidebar } = await import('..');

describe('Sidebar', () => {
  it('renders the navigation of the given sections on the server', async () => {
    render(await Sidebar({ navKeys: ['about', 'getInvolved'] }));

    const link = screen.getByRole('link', {
      name: 'components.navigation.about.links.governance',
    });

    assert.equal(link.getAttribute('href'), '/about/governance');
  });

  it('uses the sub-items of a single section as the groups', async () => {
    const { container } = render(await Sidebar({ navKeys: ['about'] }));

    const groupNames = [...container.querySelectorAll('section > label')].map(
      label => label.textContent
    );

    assert.ok(groupNames.length > 0);
    assert.ok(!groupNames.includes('components.navigation.about.links.about'));
  });
});
