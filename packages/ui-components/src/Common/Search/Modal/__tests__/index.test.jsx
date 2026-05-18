import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchModal from '..';

describe('SearchModal', () => {
  it('warms search when the trigger receives hover or focus intent', async t => {
    const warmup = t.mock.fn();

    render(
      <SearchModal client={{}} placeholder="Search docs" onWarmup={warmup}>
        <div>Results</div>
      </SearchModal>
    );

    const trigger = screen.getByRole('button', { name: /search docs/i });

    await userEvent.hover(trigger);
    fireEvent.focus(trigger);

    assert.equal(warmup.mock.callCount(), 2);
  });

  it('warms search when the keyboard shortcut is pressed', () => {
    let warmupCalls = 0;

    render(
      <SearchModal
        client={{}}
        placeholder="Search docs"
        onWarmup={() => {
          warmupCalls += 1;
        }}
      >
        <div>Results</div>
      </SearchModal>
    );

    fireEvent.keyDown(document, { key: 'k', ctrlKey: true });

    assert.equal(warmupCalls, 1);
  });
});
