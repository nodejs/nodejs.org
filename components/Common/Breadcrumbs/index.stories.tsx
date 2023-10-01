import Breadcrumbs from './';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Breadcrumbs>;
type Meta = MetaObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {
    links: [
      {
        label: 'Learn',
        href: '/learn',
      },
      {
        label: 'Getting Started',
        href: '/learn/getting-started',
      },
      {
        label: 'Introduction to Node.js',
        href: '/learn/getting-started/intro',
      },
    ],
  },
};

export const Truncate: Story = {
  args: {
    links: [
      {
        label: 'Learn',
        href: '/learn',
      },
      {
        label: 'Getting Started',
        href: '/learn/getting-started',
      },
      {
        label: 'Introduction to Node.js',
        href: '/learn/getting-started/intro',
      },
      {
        label: 'Installation',
        href: '/learn/getting-started/intro/installation',
      },
      {
        label: 'Documentation',
        href: '/learn/getting-started/intro/installation/documentation',
      },
    ],
    maxLength: 1,
  },
};

export default { component: Breadcrumbs } as Meta;
