import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import Button from './';

type Story = StoryObj<typeof Button>;
type Meta = MetaObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
    disabled: false,
    special: false,
  },
};
export default { component: Button } as Meta;
