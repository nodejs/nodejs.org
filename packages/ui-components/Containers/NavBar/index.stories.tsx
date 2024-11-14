import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import NavBar from '@node-core/ui-components/Containers/NavBar';

type Story = StoryObj<typeof NavBar>;
type Meta = MetaObj<typeof NavBar>;

export const Default: Story = {
  args: {
    LinkWrapper: 'a',
    Logo: 'a',
    pathname: '/',

    children: <a>Some other child</a>,

    navItems: [
      {
        text: 'Learn',
        link: '/',
      },
      {
        text: 'About',
        link: '/about',
      },
      {
        text: 'Docs',
        link: '/docs',
      },
      {
        text: 'Download',
        link: '/download',
      },
      {
        text: 'Blog',
        link: '/blog',
      },
      {
        text: 'Certification',
        link: 'https://openjsf.org/certification',
      },
    ],
  },
};

export default { component: NavBar } as Meta;
