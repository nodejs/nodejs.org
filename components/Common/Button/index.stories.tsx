import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Button from '@/components/Common/Button';

type Story = StoryObj<typeof Button>;
type Meta = MetaObj<typeof Button>;

export const Primary: Story = {
  args: {
    kind: 'primary',
    children: 'Download Node (LTS)',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    kind: 'secondary',
    children: 'Download Node (LTS)',
    disabled: false,
  },
};

export const Special: Story = {
  args: {
    kind: 'special',
    children: 'Download Node (LTS)',
    disabled: false,
  },
};

export default { component: Button } as Meta;
