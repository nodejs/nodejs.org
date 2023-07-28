import Dropdown from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Dropdown>;
type Meta = MetaObj<typeof Dropdown>;

const items = [...Array(10).keys()].map(item => ({
  title: `Item ${item + 1}`,
  label: `item-${item + 1}`,
  active: false,
  onClick: () => {
    null;
  },
}));

items[2].active = true;

export const Default: Story = {
  args: {
    items: items,
    shouldShow: true,
  },
};

export default { component: Dropdown } as Meta;
