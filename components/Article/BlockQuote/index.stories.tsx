import BlockQuote from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof BlockQuote>;
type Meta = MetaObj<typeof BlockQuote>;

export const Default: Story = {
  args: { children: 'This is a block quote' },
};

export const MultipleParagraph: Story = {
  args: {
    children: [
      <p key={1}>This is a block quote 1</p>,
      <p key={2}>This is a block quote 2</p>,
    ],
  },
};

export default { component: BlockQuote } as Meta;
