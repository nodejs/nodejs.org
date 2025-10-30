import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { setTimeout } from 'node:timers/promises';

import { render, fireEvent, screen } from '@testing-library/react';

import useCopyToClipboard from '#site/hooks/react-client/useCopyToClipboard';

navigator.clipboard = { writeText: () => {} };

await describe('useCopyToClipboard', async () => {
  let TestComponent;

  beforeEach(() => {
    TestComponent = ({ textToCopy }) => {
      const [copied, copyText] = useCopyToClipboard();

      return (
        <button onClick={() => copyText(textToCopy)} type="button">
          {copied ? 'copied' : 'copy'}
        </button>
      );
    };
  });
  
  await it('should call clipboard API with `test` once', async t => {
    t.mock.method(navigator.clipboard, 'writeText', () => Promise.resolve());

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

  await it('should handle clipboard write text failure', async t => {
    t.mock.method(navigator.clipboard, 'writeText', () => Promise.reject(new Error("fail")));

    render(<TestComponent textToCopy="fail" />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    assert.ok((await screen.findByText(/copy/i)));

    assert.equal(navigator.clipboard.writeText.mock.callCount(), 1);
    assert.deepEqual(navigator.clipboard.writeText.mock.calls[0].arguments, [
      'fail',
    ]);
  });

  await it('should not call clipboard API when text is undefined', async t => {
    t.mock.method(navigator.clipboard, 'writeText', () => Promise.resolve());

    render(<TestComponent textToCopy={undefined} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    assert.equal(navigator.clipboard.writeText.mock.callCount(), 0);
  });
});
