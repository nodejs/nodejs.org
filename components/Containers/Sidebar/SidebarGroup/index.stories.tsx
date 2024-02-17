import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import SidebarGroup from '@/components/Containers/Sidebar/SidebarGroup';

type Story = StoryObj<typeof SidebarGroup>;
type Meta = MetaObj<typeof SidebarGroup>;

export const Default: Story = {
  args: {
    groupName: 'Example Group',
    items: [
      { label: 'Item 1', link: '/item1' },
      { label: 'Item 2', link: '/item2' },
      { label: 'Item 3', link: '/item3' },
    ],
  },
};

export const CustomGroup: Story = {
  args: {
    groupName: 'Custom Group',
    items: [
      { label: 'Custom Item 1', link: '/custom-item1' },
      { label: 'Custom Item 2', link: '/custom-item2' },
    ],
  },
};

export const EmptyGroup: Story = {
  args: {
    groupName: 'Empty Group',
    items: [],
  },
};

export default { component: SidebarGroup } as Meta;
