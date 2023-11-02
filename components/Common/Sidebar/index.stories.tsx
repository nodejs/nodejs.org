import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Sidebar from '@/components/Common/Sidebar';

type Story = StoryObj<typeof Sidebar>;
type Meta = MetaObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    groups: [
      {
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
      {
        groupName: 'group2',
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
    ],
  },
};

export const ActiveItem: Story = {
  args: {
    groups: [
      {
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
      {
        groupName: 'group2',
        items: [
          {
            url: '/item3',
            title: 'item3',
          },
          {
            url: '/item4',
            title: 'item4',
          },
        ],
      },
    ],
    activeItem: {
      url: '/item2',
      title: 'item2',
    },
  },
};

export default { component: Sidebar } as Meta;
