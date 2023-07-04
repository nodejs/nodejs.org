import { useState } from 'react';
import NavigationContainer from './';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import type { FC } from 'react';

type Story = StoryObj<typeof NavigationContainer>;
type Meta = MetaObj<typeof NavigationContainer>;

const Children: FC = () => (
  <ul>
    <li>Navigation item 1</li>
    <li>Navigation item 2</li>
    <li>Navigation item 3</li>
  </ul>
);

export const Default = (): Story => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    args: {
      children: <Children />,
      isOpen: isOpen,
      label: 'Navigation',
      toggleNavigation: () => setIsOpen(!isOpen),
    },
      
  }
};

export default { component: NavigationContainer } as Meta;
