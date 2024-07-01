import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Badge from '@/components/Common/Badge';

type Story = StoryObj<typeof Badge>;
type Meta = MetaObj<typeof Badge>;

export const Default: Story = {
  args: {
    href: '/',
    children: 'OpenJS Foundation Certification 2023',
    kind: 'default',
    badgeText: 'New',
  },
};

export const Error: Story = {
  args: {
    href: '/',
    children: 'OpenJS Foundation Certification 2023',
    kind: 'error',
    badgeText: 'New',
  },
};

export const Warning: Story = {
  args: {
    href: '/',
    children: 'OpenJS Foundation Certification 2023',
    kind: 'warning',
    badgeText: 'New',
  },
};

export default { component: Badge } as Meta;
