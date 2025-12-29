import NavBar from '#ui/Containers/NavBar';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

type Story = StoryObj<typeof NavBar>;
type Meta = MetaObj<typeof NavBar>;

const common = {
  as: 'a',
  Logo: 'a',
  pathname: '/',

  children: <a>Some other child</a>,
} as const;

export const Default: Story = {
  args: {
    ...common,
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

export const NoNavItems: Story = { args: common };

export default { component: NavBar } as Meta;
