import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tabs from '../index';

const Sut = ({ addons }) => {
  const tabs = [
    { key: 'package', label: 'Package Manager' },
    { key: 'prebuilt', label: 'Prebuilt Installer' },
    { key: 'source', label: 'Source Code' },
  ];

  return (
    <Tabs tabs={tabs} defaultValue="package" addons={addons}>
      <TabsPrimitive.Content value="package">
        Package Manager
      </TabsPrimitive.Content>
      <TabsPrimitive.Content value="prebuilt">
        Prebuilt Installer
      </TabsPrimitive.Content>
      <TabsPrimitive.Content value="source">Source Code</TabsPrimitive.Content>
    </Tabs>
  );
};

describe('Tabs', () => {
  it('should render the correct number of tabs', async () => {
    render(<Sut />);

    assert.strictEqual(screen.getAllByRole('tab').length, 3);
  });

  it('should render the correct tab content when clicked', async () => {
    render(<Sut />);

    assert.equal(screen.getByRole('tabpanel').textContent, 'Package Manager');

    await userEvent.click(screen.getByRole('tab', { name: 'Source Code' }));

    assert.equal(screen.getByRole('tabpanel').textContent, 'Source Code');
  });

  it('should render the given addons', async () => {
    render(<Sut addons={<a href="/">addon</a>} />);

    assert.ok(screen.getByRole('link', { name: 'addon' }).ownerDocument);
  });
});
