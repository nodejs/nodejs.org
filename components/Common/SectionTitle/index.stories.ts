import SectionTitle from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof SectionTitle>;
type Meta = MetaObj<typeof SectionTitle>;

export const Default: Story = {
  args: {
    path: ['home', 'previous', 'current'],
  },
};

export default { component: SectionTitle } as Meta;
