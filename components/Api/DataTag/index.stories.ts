import DataTag from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof DataTag>;
type Meta = MetaObj<typeof DataTag>;

export const Red: Story = {
  args: {
    tag: 'E',
  },
};

export const Yellow: Story = {
  args: {
    tag: 'C',
  },
};

export const Blue: Story = {
  args: {
    tag: 'M',
  },
};

export default { component: DataTag } as Meta;
