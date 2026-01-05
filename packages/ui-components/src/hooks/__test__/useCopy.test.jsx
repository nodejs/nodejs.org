import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { setTimeout } from 'node:timers/promises';

import { render, fireEvent, screen } from '@testing-library/react';

import useCopy from '../useCopy';

navigator.clipboard = { writeText: () => {} };

await describe('useCopyToClipboard', async () => {
  await it('should call clipboard API with `test` once', async t => {
    t.mock.method(navigator.clipboard, 'writeText', () => Promise.resolve());

    const TestComponent = ({ textToCopy }) => {
      const [copied, copyText] = useCopy();

      return (
        <button onClick={() => copyText(textToCopy)} type="button">
          {copied ? 'copied' : 'copy'}
        </button>
      );
    };

    render(<TestComponent textToCopy="test" />);

    const button = screen.getByRole('button');

    fireEvent.click(button);

    assert.ok((await screen.findByText(/copied/i)).ownerDocument);

    // TODO(@avivkeller): Once https://github.com/testing-library/react-testing-library/issues/1393 is resolved, we should move to mocking
    await setTimeout(3000);

    assert.ok((await screen.findByText(/copy/i)).ownerDocument);

    assert.ok(navigator.clipboard.writeText.mock.callCount(), 1);
    assert.deepEqual(navigator.clipboard.writeText.mock.calls[0].arguments, [
      'test',
    ]);
  });
});
