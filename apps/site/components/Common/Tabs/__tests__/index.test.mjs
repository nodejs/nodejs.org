import * as TabsPrimitive from '@radix-ui/react-tabs';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Link from '../../../Link';
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

    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('should render the correct tab content when clicked', async () => {
    render(<Sut />);

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Package Manager');

    await userEvent.click(screen.getByRole('tab', { name: 'Source Code' }));

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Source Code');
  });

  it('should render the given addons', async () => {
    render(<Sut addons={<Link href="/">addon</Link>} />);

    expect(screen.getByRole('link', { name: 'addon' })).toBeInTheDocument();
  });
});
