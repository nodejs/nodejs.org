import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

import BadgeGroup from '#ui/Common/BadgeGroup';

type Story = StoryObj<typeof BadgeGroup>;
type Meta = MetaObj<typeof BadgeGroup>;

export const Default: Story = {
  args: {
    href: '/',
    children: 'OpenJS Foundation Certification 2023',
    kind: 'default',
    badgeText: 'New',
  },
};

export const SmallDefault: Story = {
  args: {
    href: '/',
    children: 'OpenJS Foundation Certification 2023',
    kind: 'default',
    badgeText: 'New',
    size: 'small',
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

export const Info: Story = {
  args: {
    href: '/',
    children: 'OpenJS Foundation Certification 2023',
    kind: 'info',
    badgeText: 'New',
  },
};

export const Neutral: Story = {
  args: {
    href: '/',
    children: 'OpenJS Foundation Certification 2023',
    kind: 'neutral',
    badgeText: 'New',
  },
};

export default { component: BadgeGroup } as Meta;
