import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import NavItem from '@/components/Containers/NavBar/NavItem';

type Story = StoryObj<typeof NavItem>;
type Meta = MetaObj<typeof NavItem>;

export const Default: Story = {
  args: {
    href: '/learn',
    children: 'Learn',
  },
};

export const WithExternalLink: Story = {
  args: {
    href: 'https://nodejs.org/en',
    children: 'Learn',
  },
};

export const WithChildren: Story = {
  args: {
    href: 'https://nodejs.org/en',
    children: <b>Learn</b>,
  },
};

export const FooterItem: Story = {
  args: {
    href: '/about',
    children: 'Trademark Policy',
    type: 'footer',
  },
};

export default { component: NavItem } as Meta;
