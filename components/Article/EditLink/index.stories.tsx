import EditLink from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof EditLink>;
type Meta = MetaObj<typeof EditLink>;

export const Edit: Story = {
  args: {
    relativePath: 'get-involved/contribute.md',
  },
};

export const Empty: Story = {};

export default { component: EditLink } as Meta;
