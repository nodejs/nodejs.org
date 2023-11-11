import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Sidebar from '@/components/Common/Sidebar';

type Story = StoryObj<typeof Sidebar>;
type Meta = MetaObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    items: [
      {
        groupName: 'Group 1',
        items: [
          {
            url: '',
            title: 'Item 1',
          },
          {
            url: '',
            title: 'Item 2',
            active: true,
          },
          {
            url: '',
            title: 'Item 3',
          },
        ],
      },
      {
        groupName: 'Group 2',
        items: [
          {
            url: '',
            title: 'Item 1',
          },
          {
            url: '',
            title: 'Item 2',
          },
          {
            url: '',
            title: 'Item 3',
          },
        ],
      },
    ],
  },
};

export default { component: Sidebar } as Meta;
