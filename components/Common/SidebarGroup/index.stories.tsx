import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import SidebarGroup from '@/components/Common/SidebarGroup';

type Story = StoryObj<typeof SidebarGroup>;
type Meta = MetaObj<typeof SidebarGroup>;

export const Default: Story = {
  args: {
    groupName: 'group1',
    items: [
      {
        url: '/item1',
        title: 'item1',
      },
      {
        url: '/item2',
        title: 'item2',
      },
    ],
  },
};

export default { component: SidebarGroup } as Meta;
