import { afterEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MDXCodeTabs from '../CodeTabs';

const resetHash = () => {
  window.history.replaceState(null, '', '/');
};

describe('MDXCodeTabs', () => {
  afterEach(resetHash);

  it('deep-links to a language tab via groupId', async () => {
    render(
      <MDXCodeTabs languages="js|cjs" groupId="install" defaultTab="0">
        <pre>js source</pre>
        <pre>cjs source</pre>
      </MDXCodeTabs>
    );

    const js = screen.getByRole('link', { name: 'JS' });
    const cjs = screen.getByRole('link', { name: 'CJS' });

    assert.equal(js.id, 'install-js-0');
    assert.equal(cjs.id, 'install-cjs-1');
    assert.equal(js.getAttribute('data-default'), 'true');

    await userEvent.click(cjs);

    assert.equal(window.location.hash, '#install-cjs-1');
    assert.equal(document.querySelector(':target')?.id, 'install-cjs-1');
  });

  it('keeps unique ids when multiple CodeTabs share languages', () => {
    render(
      <>
        <MDXCodeTabs languages="js|cjs">
          <pre>one js</pre>
          <pre>one cjs</pre>
        </MDXCodeTabs>
        <MDXCodeTabs languages="js|cjs">
          <pre>two js</pre>
          <pre>two cjs</pre>
        </MDXCodeTabs>
      </>
    );

    const ids = screen
      .getAllByRole('link')
      .map(link => link.id)
      .filter(Boolean);

    assert.equal(ids.length, 4);
    assert.equal(new Set(ids).size, ids.length);
  });

  it('uses the defaultTab index when no hash is present', () => {
    render(
      <MDXCodeTabs languages="js|cjs" groupId="install" defaultTab="1">
        <pre>js source</pre>
        <pre>cjs source</pre>
      </MDXCodeTabs>
    );

    assert.equal(
      screen.getByRole('link', { name: 'CJS' }).getAttribute('data-default'),
      'true'
    );
  });
});
