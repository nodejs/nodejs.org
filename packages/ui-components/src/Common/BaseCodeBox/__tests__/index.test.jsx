import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { render, fireEvent, screen } from '@testing-library/react';

import BaseCodeBox from '../index';

navigator.clipboard = { writeText: () => Promise.resolve() };

describe('BaseCodeBox', () => {
  it('renders code box with language and footer copy button by default', () => {
    render(
      <BaseCodeBox
        language="JavaScript"
        copyButtonLabel="Copy code"
        copiedButtonLabel="Copied!"
      >
        <code>const x = 1;</code>
      </BaseCodeBox>
    );

    assert.ok(screen.getByText('JavaScript'));
    assert.ok(screen.getByText('Copy code'));
  });

  it('renders ghost copy button when no-footer is specified', () => {
    render(
      <BaseCodeBox
        language="bash"
        className="no-footer"
        copyButtonLabel="Copy code"
        copiedButtonLabel="Copied!"
      >
        <code>node --no-deprecation app.js</code>
      </BaseCodeBox>
    );

    // Language in footer toolbar should NOT be rendered
    assert.strictEqual(screen.queryByText('bash'), null);

    // Ghost copy button should be rendered
    const button = screen.getByRole('button');
    assert.ok(button);
    assert.ok(screen.getByText('Copy code'));
  });

  it('copies code content when ghost copy button is clicked', async t => {
    t.mock.method(navigator.clipboard, 'writeText', () => Promise.resolve());

    render(
      <BaseCodeBox
        language="bash"
        className="no-footer"
        copyButtonLabel="Copy code"
        copiedButtonLabel="Copied!"
      >
        <code>node --no-deprecation app.js</code>
      </BaseCodeBox>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    assert.ok(await screen.findByText('Copied!'));
    assert.strictEqual(navigator.clipboard.writeText.mock.callCount(), 1);
  });
});
