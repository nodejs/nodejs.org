import { render, screen } from '@testing-library/react';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import SideBar from '..';
import { findActiveItem } from '../utils';

const groups = [
  {
    groupName: 'API',
    items: [
      { link: '/assert', label: 'Assert' },
      {
        link: '/fs',
        label: 'File system',
        items: [
          { link: '/fs', label: 'File system' },
          { link: '/fs/promises', label: 'Promises API' },
        ],
      },
    ],
  },
];

describe('findActiveItem', () => {
  const items = groups[0].items;

  it('finds a nested item', () => {
    assert.equal(findActiveItem(items, '/fs/promises')?.label, 'Promises API');
  });

  it('returns undefined when nothing matches', () => {
    assert.equal(findActiveItem(items, '/missing'), undefined);
  });
});

describe('SideBar', () => {
  it('summarizes the navigation with the current page', () => {
    render(
      <SideBar title="Navigation" groups={groups} pathname="/fs/promises" />
    );

    const [summary] = screen.getAllByText('Promises API');

    assert.equal(summary.closest('summary') !== null, true);
  });

  it('falls back to the placeholder, then the title', () => {
    const { rerender } = render(
      <SideBar title="Navigation" groups={groups} placeholder="Current page" />
    );

    assert.ok(screen.getByText('Current page').closest('summary'));

    rerender(<SideBar title="Navigation" groups={groups} />);

    assert.ok(screen.getByText('Navigation').closest('summary'));
  });

  it('renders each page once', () => {
    render(<SideBar title="Navigation" groups={groups} pathname="/fs" />);

    assert.equal(screen.getAllByRole('link', { name: 'Assert' }).length, 1);
    assert.equal(
      screen.getAllByRole('link', { name: 'Promises API' }).length,
      1
    );
  });

  it('opens the nested group holding the current page', () => {
    const { container } = render(
      <SideBar title="Navigation" groups={groups} pathname="/fs/promises" />
    );

    const [, nested] = container.querySelectorAll('details');

    assert.equal(nested.open, true);
  });
});
