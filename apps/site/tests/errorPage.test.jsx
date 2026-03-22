import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { render, screen } from '@testing-library/react';

describe('ErrorPage', () => {
  it('renders technical details in preview environments', async t => {
    t.mock.module('#site/components/Common/Button', {
      defaultExport: ({ children, href }) => <a href={href}>{children}</a>,
    });

    t.mock.module('#site/layouts/GlowingBackdrop', {
      defaultExport: ({ children }) => <main>{children}</main>,
    });

    t.mock.module('#site/next.constants.mjs', {
      namedExports: {
        SHOW_ERROR_DETAILS: true,
      },
    });

    const { default: ErrorPage } = await import('../app/[locale]/error.tsx');

    render(
      <ErrorPage
        error={Object.assign(new Error('Preview deployment failed'), {
          digest: 'abc123',
        })}
      />
    );

    assert.equal(
      screen.getByRole('heading').textContent,
      'layouts.error.internalServerError.title'
    );
    assert.equal(
      screen.getByRole('link').textContent,
      'layouts.error.backToHome'
    );
    assert.equal(
      screen.getByText('components.downloadReleasesTable.details').textContent,
      'components.downloadReleasesTable.details'
    );
    assert.match(
      screen.getByText(/Preview deployment failed/).textContent,
      /Preview deployment failed/
    );
    assert.match(
      screen.getByText(/digest: abc123/i).textContent,
      /digest: abc123/i
    );
  });
});
