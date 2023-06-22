import NavigationContainer from './';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import type { FC } from 'react';

type Story = StoryObj<typeof NavigationContainer>;
type Meta = MetaObj<typeof NavigationContainer>;

const NavigationContent: FC = () => (
  <ul>
    <li>Navigation item 1</li>
    <li>Navigation item 2</li>
    <li>Navigation item 3</li>
  </ul>
);

export const Default: Story = {
  args: {
    isOpen: false,
    label: 'Navigation',
    children: <NavigationContent />,
  },
};

export default { component: NavigationContainer } as Meta;
