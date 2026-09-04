import { afterEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MDXCodeTabs from '../CodeTabs';

describe('MDXCodeTabs', () => {
  afterEach(() => window.history.replaceState(null, '', '/'));

  it('deep-links to a language and associates its panel', async () => {
    render(
      <MDXCodeTabs languages="js|cjs" groupId="install">
        <pre>js source</pre>
        <pre>cjs source</pre>
      </MDXCodeTabs>
    );
    const cjs = screen.getByRole('tab', { name: 'CJS' });
    await userEvent.click(cjs);
    await waitFor(() =>
      assert.equal(cjs.getAttribute('aria-selected'), 'true')
    );
    assert.equal(window.location.hash, cjs.getAttribute('href'));
    assert.equal(document.querySelector(':target').textContent, 'cjs source');
  });

  it('keeps repeated languages in a group distinct', () => {
    render(
      <MDXCodeTabs languages="js|js" groupId="install">
        <pre>first</pre>
        <pre>second</pre>
      </MDXCodeTabs>
    );
    const tabs = screen.getAllByRole('tab');
    assert.notEqual(tabs[0].getAttribute('href'), tabs[1].getAttribute('href'));
    assert.equal(tabs[1].textContent, 'JS (2)');
  });

  it('uses defaultTab and falls back for an invalid index', () => {
    const { rerender } = render(
      <MDXCodeTabs languages="js|cjs" defaultTab="1">
        <pre>js</pre>
        <pre>cjs</pre>
      </MDXCodeTabs>
    );
    assert.equal(
      screen.getByRole('tab', { name: 'CJS' }).getAttribute('aria-selected'),
      'true'
    );
    rerender(
      <MDXCodeTabs languages="js|cjs" defaultTab="bad">
        <pre>js</pre>
        <pre>cjs</pre>
      </MDXCodeTabs>
    );
    assert.equal(
      screen.getByRole('tab', { name: 'JS' }).getAttribute('aria-selected'),
      'true'
    );
  });
});
