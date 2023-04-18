import { StoryObj } from '@storybook/react';
import DataTag from '.';

export default { component: DataTag };

type Story = StoryObj<typeof DataTag>;

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
