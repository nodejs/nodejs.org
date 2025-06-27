import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Dropdown from '.';

type Story = StoryObj<typeof Dropdown>;
type Meta = MetaObj<typeof Dropdown>;

// Basic example with default anchor links
export const Default: Story = {
  args: {
    values: [
      { href: '#item1', children: 'Item 1' },
      { href: '#item2', children: 'Item 2' },
      { href: '#item3', children: 'Item 3' },
    ],
    children: <span>Select Option</span>,
  },
};

export default {
  component: Dropdown,
  decorators: [
    Story => (
      <div className="flex h-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
} as Meta;
