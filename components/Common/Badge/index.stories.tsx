import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import Badge from './';

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

export const Default_Dark: Story = {
  render: () => (
    <div data-theme="dark" className="bg-neutral-900 p-2">
      <Badge href="/" kind="default" badgeText="New">
        OpenJS Foundation Certification 2023
      </Badge>
    </div>
  ),
};

export const Error_Dark: Story = {
  render: () => (
    <div data-theme="dark" className="bg-neutral-900 p-2">
      <Badge href="/" kind="error" badgeText="New">
        OpenJS Foundation Certification 2023
      </Badge>
    </div>
  ),
};

export const Warning_Dark: Story = {
  render: () => (
    <div data-theme="dark" className="bg-neutral-900 p-2">
      <Badge href="/" kind="warning" badgeText="New">
        OpenJS Foundation Certification 2023
      </Badge>
    </div>
  ),
};

export default { component: Badge } as Meta;
