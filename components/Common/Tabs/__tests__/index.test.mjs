import * as TabsPrimitive from '@radix-ui/react-tabs';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tabs from '../index';

describe('Tabs', () => {
  const tabs = [
    { key: 'tab-1', label: 'Tab 1' },
    { key: 'tab-2', label: 'Tab 2' },
    { key: 'tab-3', label: 'Tab 3' },
  ];

  beforeEach(() => {
    render(
      <Tabs tabs={tabs}>
        <TabsPrimitive.Content value="package">
          Package Manager
        </TabsPrimitive.Content>
        <TabsPrimitive.Content value="prebuilt">
          Prebuilt Installer
        </TabsPrimitive.Content>
        <TabsPrimitive.Content value="source">
          Source Code
        </TabsPrimitive.Content>
      </Tabs>
    );
  });

  it('renders the correct number of tabs', () => {
    const tabElements = screen.getAllByRole('tab');
    expect(tabElements).toHaveLength(3);
  });

  it('renders the correct tab content when clicked', async () => {
    const user = userEvent.setup();

    render(<Tabs tabs={tabs} defaultValue="tab-1" />);

    const beforeActiveTabPanel = screen.getAllByRole('tabpanel');

    expect(beforeActiveTabPanel).toHaveLength(1);

    expect(beforeActiveTabPanel.at(0)).toHaveTextContent('Content 1');

    const tabElements = screen.getAllByRole('tab');
    await user.click(tabElements.at(-1));

    const afterActiveTabPanel = screen.getAllByRole('tabpanel');

    expect(afterActiveTabPanel).toHaveLength(1);

    expect(afterActiveTabPanel.at(0)).toHaveTextContent('Content 3');
  });
});
