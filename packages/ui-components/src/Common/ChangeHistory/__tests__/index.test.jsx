import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ChangeHistory from '../index';

const sampleChanges = [
  {
    label: 'v18.0.0',
    versions: ['v18.0.0'],
    content: 'Initial implementation',
    url: 'https://github.com/nodejs/node/pull/1',
  },
  {
    label: 'v16.0.0',
    versions: ['v16.0.0'],
    content: 'Deprecated feature',
  },
];

describe('ChangeHistory', () => {
  it('renders summary label and changes properly', () => {
    render(<ChangeHistory label="History" changes={sampleChanges} />);

    assert.ok(screen.getByText('History'));
    assert.ok(screen.getByText('Initial implementation'));
    assert.ok(screen.getByText('Deprecated feature'));
  });

  it('closes dropdown when clicking outside', async () => {
    const { container } = render(
      <div>
        <button type="button">Outside Button</button>
        <ChangeHistory label="History" changes={sampleChanges} />
      </div>
    );

    const details = container.querySelector('details');
    assert.ok(details);

    // Open details
    details.setAttribute('open', '');
    assert.equal(details.hasAttribute('open'), true);

    // Click outside
    const outsideButton = screen.getByRole('button', { name: 'Outside Button' });
    fireEvent.pointerDown(outsideButton);

    assert.equal(details.hasAttribute('open'), false);
  });

  it('does not close when clicking inside the details dropdown', async () => {
    const { container } = render(
      <ChangeHistory label="History" changes={sampleChanges} />
    );

    const details = container.querySelector('details');
    assert.ok(details);

    // Open details
    details.setAttribute('open', '');
    assert.equal(details.hasAttribute('open'), true);

    // Click inside
    const insideItem = screen.getByText('Initial implementation');
    fireEvent.pointerDown(insideItem);

    assert.equal(details.hasAttribute('open'), true);
  });
});
