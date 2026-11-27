import SidebarCollapsible from '#ui/Containers/Sidebar/SidebarCollapsible';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

type Story = StoryObj<typeof SidebarCollapsible>;
type Meta = MetaObj<typeof SidebarCollapsible>;

export const Default: Story = {
  args: {
    summary: 'File system',
    children: <p>Content shown when the section is open.</p>,
  },
};

export const Open: Story = {
  args: { ...Default.args, open: true },
};

export default { component: SidebarCollapsible } as Meta;
