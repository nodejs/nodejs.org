import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

import Badge from '#ui/Common/Badge';

type Story = StoryObj<typeof Badge>;
type Meta = MetaObj<typeof Badge>;

export const Default: Story = {
  args: {
    kind: 'default',
  },
};

export const Error: Story = {
  args: {
    kind: 'error',
  },
};

export const Warning: Story = {
  args: {
    kind: 'warning',
  },
};

export const Info: Story = {
  args: {
    kind: 'info',
  },
};

export const Neutral: Story = {
  args: {
    kind: 'neutral',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export default { component: Badge, args: { children: 'Badge' } } as Meta;
