import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import NavItem from './index';

type Story = StoryObj<typeof NavItem>;
type Meta = MetaObj<typeof NavItem>;

export const Default: Story = {
  args: {
    href: '/learn',
    label: 'Learn',
  },
};

export const WithExternalLink: Story = {
  args: {
    href: 'https://nodejs.org/en',
    label: 'Learn',
  },
};

export const FooterItem: Story = {
  args: {
    href: '/about',
    label: 'Trademark Policy',
    type: 'footer',
  },
};

export default { component: NavItem } as Meta;
