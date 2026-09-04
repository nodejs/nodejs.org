import { afterEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';

import CodeTabs from '../index';

const tabs = [
  { key: 'mjs', label: 'MJS' },
  { key: 'cjs', label: 'CJS' },
];
const Sut = ({
  groupId = 'hello-world',
  defaultValue = 'mjs',
  addons,
} = {}) => (
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

describe('CodeTabs', () => {
  afterEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('connects each tab to its labelled panel', () => {
    render(<Sut />);
    for (const tab of screen.getAllByRole('tab')) {
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      assert.equal(tab.getAttribute('href'), '#' + panel.id);
      assert.equal(panel.getAttribute('aria-labelledby'), tab.id);
      assert.equal(panel.getAttribute('role'), 'tabpanel');
    }
    assert.equal(
      screen.getByRole('tab', { name: 'MJS' }).getAttribute('aria-selected'),
      'true'
    );
  });

  it('unwraps nested fragments and arrays into separate panels', () => {
    render(
      <CodeTabs tabs={tabs}>
        <>
          {[<div key="mjs">mjs panel</div>]}
          <>
            <div>cjs panel</div>
          </>
        </>
      </CodeTabs>
    );
    assert.deepEqual(
      screen.getAllByRole('tabpanel').map(panel => panel.textContent),
      ['mjs panel', 'cjs panel']
    );
  });

  it('uses the requested default and falls back for an unknown hash', () => {
    window.history.replaceState(null, '', '/#unrelated-heading');
    render(<Sut defaultValue="cjs" />);
    assert.equal(
      screen.getByRole('tab', { name: 'CJS' }).getAttribute('aria-selected'),
      'true'
    );
  });

  it('selects an initial deep link before any click', () => {
    window.history.replaceState(null, '', '/#hello-world-cjs-1');
    render(<Sut />);
    assert.equal(
      screen.getByRole('tab', { name: 'CJS' }).getAttribute('aria-selected'),
      'true'
    );
    assert.equal(
      document.querySelector(':target'),
      screen.getByRole('tabpanel', { name: 'CJS' })
    );
  });

  it('updates the URL and selected state on click', async () => {
    render(<Sut />);
    const cjs = screen.getByRole('tab', { name: 'CJS' });
    await userEvent.click(cjs);
    await waitFor(() =>
      assert.equal(cjs.getAttribute('aria-selected'), 'true')
    );
    assert.equal(window.location.hash, '#hello-world-cjs-1');
    assert.equal(cjs.tabIndex, 0);
    assert.equal(screen.getByRole('tab', { name: 'MJS' }).tabIndex, -1);
  });

  it('supports arrow keys, wrapping, Home, End, and Space', async () => {
    render(<Sut />);
    const mjs = screen.getByRole('tab', { name: 'MJS' });
    const cjs = screen.getByRole('tab', { name: 'CJS' });
    mjs.focus();
    for (const [key, expected] of [
      ['{ArrowLeft}', cjs],
      ['{ArrowRight}', mjs],
      ['{End}', cjs],
      ['{Home}', mjs],
      [' ', mjs],
    ]) {
      await userEvent.keyboard(key);
      await waitFor(() =>
        assert.equal(expected.getAttribute('aria-selected'), 'true')
      );
      assert.equal(document.activeElement, expected);
      assert.equal(window.location.hash, expected.getAttribute('href'));
    }
  });

  it('tracks external hash changes and resets unrelated groups', async () => {
    render(
      <>
        <Sut />
        <Sut groupId="other" />
      </>
    );
    await act(async () => {
      window.location.hash = 'hello-world-cjs-1';
    });
    await waitFor(() =>
      assert.equal(
        screen
          .getAllByRole('tab', { name: 'CJS' })[0]
          .getAttribute('aria-selected'),
        'true'
      )
    );
    await act(async () => {
      window.location.hash = 'other-cjs-1';
    });
    await waitFor(() => {
      assert.equal(
        screen
          .getAllByRole('tab', { name: 'MJS' })[0]
          .getAttribute('aria-selected'),
        'true'
      );
      assert.equal(
        screen
          .getAllByRole('tab', { name: 'CJS' })[1]
          .getAttribute('aria-selected'),
        'true'
      );
    });
  });

  it('keeps generated instance ids unique', () => {
    const { container } = render(
      <>
        <Sut groupId={null} />
        <Sut groupId={null} />
      </>
    );
    const ids = [...container.querySelectorAll('[id]')].map(
      element => element.id
    );
    assert.equal(new Set(ids).size, ids.length);
  });

  it('disambiguates tab keys with the same slug', () => {
    render(
      <CodeTabs
        groupId="languages"
        tabs={[
          { key: 'c++', label: 'C++' },
          { key: 'c#', label: 'C#' },
          { key: 'C', label: 'C' },
        ]}
      >
        {[
          <pre key="cpp">cpp</pre>,
          <pre key="cs">cs</pre>,
          <pre key="c">c</pre>,
        ]}
      </CodeTabs>
    );
    assert.deepEqual(
      screen.getAllByRole('tab').map(tab => tab.getAttribute('href')),
      ['#languages-c-0', '#languages-c-1', '#languages-c-2']
    );
  });

  it('keeps addons outside the tablist', () => {
    render(<Sut addons={<a href="/docs">Documentation</a>} />);
    assert.equal(
      screen
        .getByRole('tablist')
        .contains(screen.getByRole('link', { name: 'Documentation' })),
      false
    );
  });

  it('server-renders native links and all panels without claiming enhanced tab semantics', () => {
    const html = renderToString(<Sut />);
    assert.match(html, /role="navigation"/);
    assert.match(html, /href="#hello-world-cjs-1"/);
    assert.match(html, /id="hello-world-cjs-1"/);
    assert.match(html, /mjs panel/);
    assert.match(html, /cjs panel/);
    assert.doesNotMatch(html, /aria-selected|role="tab"/);
  });
});
