import NavigationContainer from './';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof NavigationContainer>;
type Meta = MetaObj<typeof NavigationContainer>;

export const Default: Story = {
  args: {
    isOpen: false,
    label: 'Navigation',
    children: 'Navigation content',
  },
};

export default { component: NavigationContainer } as Meta;
