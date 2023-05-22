import Stability from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Stability>;
type Meta = MetaObj<typeof Stability>;

export const Default: Story = {
  args: {
    stability: 0,
    children: 'This is an stability index example',
  },
  argTypes: {
    stability: {
      control: {
        type: 'range',
        min: 0,
        max: 3,
        step: 1,
      },
    },
  },
};

export default { component: Stability } as Meta;
