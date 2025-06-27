import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import StatelessSelect from '.';

type Story = StoryObj<typeof StatelessSelect>;
type Meta = MetaObj<typeof StatelessSelect>;

// Basic example with default anchor links
export const Default: Story = {
  args: {
    label: 'History',
    values: [
      { href: '#item1', children: 'Item 1' },
      { href: '#item2', children: 'Item 2' },
      { href: '#item3', children: 'Item 3' },
    ],
    children: <span>Select Option</span>,
  },
};

export default {
  component: StatelessSelect,
  decorators: [
    Story => (
      <div className="flex h-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
} as Meta;
