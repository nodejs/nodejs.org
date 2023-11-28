import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Sidebar from '@/components/Common/Sidebar';

type Story = StoryObj<typeof Sidebar>;
type Meta = MetaObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    groups: [
      {
        groupName: 'About Node.js',
        items: [
          {
            url: '/item1',
            title: 'About Node.js',
          },
          {
            url: '/item2',
            title: 'Project Governance',
          },
          {
            url: '/item3',
            title: 'Releases',
          },
          {
            url: '/item4',
            title: 'Branding',
          },
          {
            url: '/item5',
            title: 'Privacy Policy',
          },
          {
            url: '/item6',
            title: 'Security Reporting',
          },
        ],
      },
      {
        groupName: 'Get Involved',
        items: [
          {
            url: '/item7',
            title: 'Get Involved',
          },
          {
            url: '/item8',
            title: 'Collab Summit',
          },
          {
            url: '/item9',
            title: 'Contribute',
          },
          {
            url: '/item10',
            title: 'Code of Conduct',
          },
        ],
      },
      {
        groupName: 'Download',
        items: [
          {
            url: '/item11',
            title: 'Download',
          },
          {
            url: '/item12',
            title: 'Package Manager',
          },
          {
            url: '/item13',
            title: 'Previous Releases',
          },
        ],
      },
    ],
  },
};

export default { component: Sidebar } as Meta;
