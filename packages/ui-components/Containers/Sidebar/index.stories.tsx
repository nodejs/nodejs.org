import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Sidebar from '#ui/Containers/Sidebar';

type Story = StoryObj<typeof Sidebar>;
type Meta = MetaObj<typeof Sidebar>;

const args = {
  groups: [
    {
      groupName: 'About Node.js',
      items: [
        {
          link: '/item1',
          label: 'About Node.js',
        },
        {
          link: '/item2',
          label: 'Project Governance',
        },
        {
          link: '/item3',
          label: 'Releases',
        },
        {
          link: '/item4',
          label: 'Branding',
        },
        {
          link: '/item5',
          label: 'Privacy Policy',
        },
        {
          link: '/item6',
          label: 'Security Reporting',
        },
      ],
    },
    {
      groupName: 'Get Involved',
      items: [
        {
          link: '/item7',
          label: 'Get Involved',
        },
        {
          link: '/item8',
          label: 'Collab Summit',
        },
        {
          link: '/item9',
          label: 'Contribute',
        },
        {
          link: '/item10',
          label: 'Code of Conduct',
        },
      ],
    },
    {
      groupName: 'Download',
      items: [
        {
          link: '/item11',
          label: 'Download',
        },
        {
          link: '/item12',
          label: 'Package Manager',
        },
        {
          link: '/item13',
          label: 'Node.js Releases',
        },
      ],
    },
  ],
  title: 'Sidebar',
  onSelect: console.log,
  pathname: '/item1',
};

export const Default: Story = { args };
export const Progression: Story = {
  args: { ...args, showProgressionIcons: true },
};

export default { component: Sidebar } as Meta;
