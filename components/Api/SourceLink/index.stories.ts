import SourceLink from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof SourceLink>;
type Meta = MetaObj<typeof SourceLink>;

export const Default: Story = {
  args: {
    version: '1.0.0',
    link: 'http://nodejs.org/version/1.0.0',
  },
};

export default { component: SourceLink } as Meta;
