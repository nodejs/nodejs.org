import type { StoryObj } from '@storybook/react';
import Dropdown from '.';

type Story = StoryObj<typeof Dropdown>;

export default {
  component: Dropdown,
};

const items = [...Array(10).keys()].map(item => ({
  title: `Item ${item + 1}`,
  label: `item-${item + 1}`,
  active: false,
  onClick: () => {},
}));

items[2].active = true;

export const withItems: Story = {
  args: {
    items: items,
    shouldShow: true,
  },
};
