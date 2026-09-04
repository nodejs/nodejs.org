import { afterEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CodeTabs from '../index';

const tabs = [
  { key: 'mjs', label: 'MJS' },
  { key: 'cjs', label: 'CJS' },
];

const Sut = ({ groupId, defaultValue = 'mjs', addons } = {}) => (
  <CodeTabs
    tabs={tabs}
    defaultValue={defaultValue}
    groupId={groupId}
    addons={addons}
  >
    <div>mjs panel</div>
    <div>cjs panel</div>
  </CodeTabs>
);

const resetHash = () => {
  window.history.replaceState(null, '', '/');
};

describe('CodeTabs', () => {
  afterEach(resetHash);

  it('renders panel content for each tab', () => {
    render(<Sut groupId="hello-world" />);

    assert.ok(screen.getByText('mjs panel'));
    assert.ok(screen.getByText('cjs panel'));
  });

  it('assigns fragment ids and hrefs using groupId', () => {
    render(<Sut groupId="hello-world" />);

    const mjs = screen.getByRole('link', { name: 'MJS' });
    const cjs = screen.getByRole('link', { name: 'CJS' });

    assert.equal(mjs.id, 'hello-world-mjs');
    assert.equal(mjs.getAttribute('href'), '#hello-world-mjs');
    assert.equal(cjs.id, 'hello-world-cjs');
    assert.equal(cjs.getAttribute('href'), '#hello-world-cjs');
  });

  it('marks the first tab as default when no hash is present', () => {
    render(<Sut groupId="hello-world" />);

    assert.equal(
      screen.getByRole('link', { name: 'MJS' }).getAttribute('data-default'),
      'true'
    );
    assert.equal(
      screen.getByRole('link', { name: 'CJS' }).getAttribute('data-default'),
      null
    );
  });

  it('marks the requested default tab when defaultValue is set', () => {
    render(<Sut groupId="hello-world" defaultValue="cjs" />);

    assert.equal(
      screen.getByRole('link', { name: 'CJS' }).getAttribute('data-default'),
      'true'
    );
    assert.equal(
      screen.getByRole('link', { name: 'MJS' }).getAttribute('data-default'),
      null
    );
  });

  it('selects the matching tab as :target on an initial deep link', () => {
    window.history.replaceState(null, '', '/#hello-world-cjs');

    render(<Sut groupId="hello-world" />);

    const target = document.querySelector(':target');

    assert.ok(target);
    assert.equal(target.id, 'hello-world-cjs');
    assert.equal(target, screen.getByRole('link', { name: 'CJS' }));
  });

  it('keeps the default tab when the hash does not match a tab', () => {
    window.history.replaceState(null, '', '/#not-a-code-tab');

    render(<Sut groupId="hello-world" />);

    assert.equal(document.querySelector(':target'), null);
    assert.equal(
      screen.getByRole('link', { name: 'MJS' }).getAttribute('data-default'),
      'true'
    );
  });

  it('updates the URL hash when a tab is clicked', async () => {
    render(<Sut groupId="hello-world" />);

    await userEvent.click(screen.getByRole('link', { name: 'CJS' }));

    assert.equal(window.location.hash, '#hello-world-cjs');
    assert.equal(document.querySelector(':target')?.id, 'hello-world-cjs');
  });

  it('navigates between tab hashes', async () => {
    render(<Sut groupId="hello-world" />);

    await userEvent.click(screen.getByRole('link', { name: 'CJS' }));
    assert.equal(window.location.hash, '#hello-world-cjs');

    await userEvent.click(screen.getByRole('link', { name: 'MJS' }));
    assert.equal(window.location.hash, '#hello-world-mjs');
    assert.equal(document.querySelector(':target')?.id, 'hello-world-mjs');
  });

  it('does not collide when multiple CodeTabs share languages', () => {
    render(
      <>
        <Sut />
        <Sut />
      </>
    );

    const links = screen.getAllByRole('link');
    const ids = links.map(link => link.id).filter(Boolean);

    assert.equal(ids.length, 4);
    assert.equal(new Set(ids).size, ids.length);
    assert.ok(ids.every(id => id.startsWith('codetabs-')));
  });

  it('renders addons in the tab list', () => {
    render(<Sut groupId="hello-world" addons={<a href="/docs">addon</a>} />);

    assert.ok(screen.getByRole('link', { name: 'addon' }).ownerDocument);
  });

  it('uses CSS :target to switch the active tab without JavaScript listeners', () => {
    const css = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), '../index.module.css'),
      'utf8'
    );

    assert.match(css, /:target/);
    assert.match(css, /:has\(\.trigger:target\)/);
    assert.match(css, /\.trigger:target/);
  });
});
