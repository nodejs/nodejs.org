import Author from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Author>;
type Meta = MetaObj<typeof Author>;

export const Default: Story = {
  args: {
    username: 'nodejs',
    size: 60,
  },
};

export const WithourUsername: Story = {
  args: {
    username: '',
    size: 0,
  },
};

export default { component: Author } as Meta;
