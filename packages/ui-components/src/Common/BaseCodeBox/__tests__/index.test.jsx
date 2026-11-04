import { afterEach, beforeEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { render, fireEvent, screen } from '@testing-library/react';

import BaseCodeBox from '../index';

describe('BaseCodeBox', () => {
  let originalClipboard;

  beforeEach(() => {
    originalClipboard = navigator.clipboard;
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.resolve() },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      writable: true,
      configurable: true,
    });
  });

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

    // Ghost copy button should be rendered with accessible label and no visible text
    const button = screen.getByRole('button', { name: 'Copy code' });
    assert.ok(button);
    assert.strictEqual(screen.queryByText('Copy code'), null);
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

    const button = screen.getByRole('button', { name: 'Copy code' });
    fireEvent.click(button);

    const copiedButton = await screen.findByRole('button', { name: 'Copied!' });
    assert.ok(copiedButton);
    assert.strictEqual(navigator.clipboard.writeText.mock.callCount(), 1);
  });
});
