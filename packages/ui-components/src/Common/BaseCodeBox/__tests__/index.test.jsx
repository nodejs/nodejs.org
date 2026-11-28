import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { fireEvent, render, screen } from '@testing-library/react';

import BaseCodeBox from '../';

navigator.clipboard = { writeText: () => Promise.resolve() };

describe('BaseCodeBox', () => {
  it('copies the rendered textContent by default', async t => {
    const writeText = t.mock.method(navigator.clipboard, 'writeText', () =>
      Promise.resolve()
    );

    render(
      <BaseCodeBox
        language="Bash"
        copyButtonLabel="Copy"
        copiedButtonLabel="Copied"
      >
        <code>{'# comment\nnode -v'}</code>
      </BaseCodeBox>
    );

    fireEvent.click(screen.getByRole('button', { name: /copy/i }));

    assert.equal(writeText.mock.callCount(), 1);
    assert.deepEqual(writeText.mock.calls[0].arguments, [
      '# comment\nnode -v\n',
    ]);
  });

  it('copies custom copyText instead of rendered textContent when provided', async t => {
    const writeText = t.mock.method(navigator.clipboard, 'writeText', () =>
      Promise.resolve()
    );

    render(
      <BaseCodeBox
        language="Bash"
        copyButtonLabel="Copy"
        copiedButtonLabel="Copied"
        copyText="node -v"
      >
        <code>{'# Verify Node.js:\nnode -v # comment'}</code>
      </BaseCodeBox>
    );

    fireEvent.click(screen.getByRole('button', { name: /copy/i }));

    assert.equal(writeText.mock.callCount(), 1);
    assert.deepEqual(writeText.mock.calls[0].arguments, ['node -v']);
  });
});
