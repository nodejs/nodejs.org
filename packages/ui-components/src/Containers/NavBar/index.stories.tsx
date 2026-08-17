import Logo from '#ui/Common/NodejsLogo';
import SearchModal from '#ui/Common/Search/Modal';
import NavBar from '#ui/Containers/NavBar';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

type Story = StoryObj<typeof NavBar>;
type Meta = MetaObj<typeof NavBar>;

export const Default: Story = {
  args: {
    as: 'a',
    Logo,
    pathname: '/',
    children: <SearchModal client={null} placeholder="Search the docs..." />,
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
        text: 'Beta Docs',
        link: 'https://beta.docs.nodejs.org/',
        target: '_blank',
        accent: true,
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

export const NoNavItems: Story = {
  args: {
    as: 'a',
    Logo,
    pathname: '/',
    children: <SearchModal client={null} placeholder="Search the docs..." />,
  },
};

export const NoLogo: Story = {
  args: {
    as: 'a',
    pathname: '/',
    children: <SearchModal client={null} placeholder="Search the docs..." />,
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

export const NoLogoNoNavItems: Story = {
  args: {
    as: 'a',
    pathname: '/',
    children: <SearchModal client={null} placeholder="Search the docs..." />,
  },
};

export default { component: NavBar } as Meta;
