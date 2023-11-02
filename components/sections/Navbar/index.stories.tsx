import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Navbar from './index';

type Story = StoryObj<typeof Navbar>;
type Meta = MetaObj<typeof Navbar>;

export const Default: Story = {
  args: {
    navItems: [
      {
        key: 'about',
        link: '/about',
      },
      {
        key: 'learn',
        link: '/learn',
      },
      {
        key: 'docs',
        link: '/docs',
      },
      {
        key: 'blog',
        link: '/blog',
      },
      {
        key: 'certification',
        link: 'https://openjsf.org/certification',
      },
    ],
  },
};

export default { component: Navbar } as Meta;
