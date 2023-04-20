import Alert from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Alert>;
type Meta = MetaObj<typeof Alert>;

export const Default: Story = {
  args: {
    children: 'This is an alert',
  },
};

export default { component: Alert } as Meta;
