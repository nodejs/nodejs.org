import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { render, screen } from '@testing-library/react';

describe('ErrorPage', () => {
  const setupErrorPage = async (t, showErrorDetails, suffix = '') => {
    t.mock.module('#site/components/Common/Button', {
      defaultExport: ({ children, href }) => <a href={href}>{children}</a>,
    });

    t.mock.module('#site/layouts/GlowingBackdrop', {
      defaultExport: ({ children }) => <main>{children}</main>,
    });

    t.mock.module('#site/next.constants.mjs', {
      namedExports: {
        SHOW_ERROR_DETAILS: showErrorDetails,
      },
    });

    return import(`../app/[locale]/error.tsx${suffix}`);
  };

  it('renders technical details in preview environments', async t => {
    const { default: ErrorPage } = await setupErrorPage(t, true);

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
      screen.getByText('layouts.error.details').textContent,
      'layouts.error.details'
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

  it('hides technical details when the flag is disabled', async t => {
    const { default: ErrorPage } = await setupErrorPage(
      t,
      false,
      '?show-error-details-disabled'
    );

    render(
      <ErrorPage
        error={Object.assign(new Error('Production should stay generic'), {
          digest: 'hidden123',
        })}
      />
    );

    assert.equal(screen.queryByText('layouts.error.details'), null);
    assert.equal(screen.queryByText(/Production should stay generic/), null);
    assert.equal(screen.queryByText(/digest: hidden123/i), null);
  });
});
