import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import Badge from './';
import { component } from '@/types/component';

type Story = StoryObj<typeof Badge>;
type Meta = MetaObj<typeof Badge>;

export const Default: Story = {
  args: {
    href: '/',
    children: 'OpenJS Foundation Certification 2023',
    kind: component.Default,
    badgeText: 'New',
  },
};

export const Error: Story = {
  args: {
    href: '/',
    children: 'OpenJS Foundation Certification 2023',
    kind: component.Error,
    badgeText: 'New',
  },
};

export const Warning: Story = {
  args: {
    href: '/',
    children: 'OpenJS Foundation Certification 2023',
    kind: component.Warning,
    badgeText: 'New',
  },
};

export const Default_Dark: Story = {
  render: () => (
    <div data-theme="dark" className="bg-neutral-900 p-2">
      <Badge href="/" kind={component.Default} badgeText="New">
        OpenJS Foundation Certification 2023
      </Badge>
    </div>
  ),
};

export const Error_Dark: Story = {
  render: () => (
    <div data-theme="dark" className="bg-neutral-900 p-2">
      <Badge href="/" kind={component.Error} badgeText="New">
        OpenJS Foundation Certification 2023
      </Badge>
    </div>
  ),
};

export const Warning_Dark: Story = {
  render: () => (
    <div data-theme="dark" className="bg-neutral-900 p-2">
      <Badge href="/" kind={component.Warning} badgeText="New">
        OpenJS Foundation Certification 2023
      </Badge>
    </div>
  ),
};

export default { component: Badge } as Meta;
