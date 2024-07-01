import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import SidebarItem from '@/components/Containers/Sidebar/SidebarItem';

type Story = StoryObj<typeof SidebarItem>;
type Meta = MetaObj<typeof SidebarItem>;

export const Default: Story = {
  args: {
    label: 'Example Item',
    link: '/example',
  },
};

export default { component: SidebarItem } as Meta;
