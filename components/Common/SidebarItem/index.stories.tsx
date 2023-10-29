import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import SidebarItem from '@/components/Common/SidebarItem';

type Story = StoryObj<typeof SidebarItem>;
type Meta = MetaObj<typeof SidebarItem>;

export const Default: Story = {
  args: {
    url: '/item1',
    title: 'item1',
  },
};

export const Active: Story = {
  args: {
    url: '/item1',
    title: 'item1',
    isActive: true,
  },
};

export default { component: SidebarItem } as Meta;
