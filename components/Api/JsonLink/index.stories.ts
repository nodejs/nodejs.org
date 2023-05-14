import JsonLink from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof JsonLink>;
type Meta = MetaObj<typeof JsonLink>;

export const Default: Story = {
  args: {
    version: 'v18',
    fileName: 'documentation',
  },
};

export default { component: JsonLink } as Meta;
