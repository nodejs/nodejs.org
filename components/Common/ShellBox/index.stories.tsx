import ShellBox from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof ShellBox>;
type Meta = MetaObj<typeof ShellBox>;

export const Default: Story = {
  args: {
    children: 'Hello World',
    textToCopy: 'Hello World',
  },
};

export const WithoutTextToCopy: Story = {
  args: {
    children: 'Hello World',
  },
};

export const WithTextToCopyJsx: Story = {
  args: {
    children: (
      <span>
        <strong>$</strong>echo hello worl
      </span>
    ),
    textToCopy: '$echo hello world',
  },
};

export const WithoutTextToCopyJsx: Story = {
  args: {
    children: (
      <span>
        <strong>$</strong>hello world
      </span>
    ),
    textToCopy: 'hello world',
  },
};

export default {
  component: ShellBox,
} as Meta;
