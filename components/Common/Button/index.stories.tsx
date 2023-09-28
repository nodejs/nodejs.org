import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import Button from './';

type Story = StoryObj<typeof Button>;
type Meta = MetaObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Download Node (LTS)',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Download Node (LTS)',
    disabled: false,
  },
};

export const Special: Story = {
  args: {
    variant: 'special',
    children: 'Download Node (LTS)',
    disabled: false,
  },
};

export default { component: Button } as Meta;
