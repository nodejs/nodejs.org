import ShellBox from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof ShellBox>;
type Meta = MetaObj<typeof ShellBox>;

export const Default: Story = {
  args: {
    children: 'echo hello world',
    textToCopy: 'echo hello world',
  },
};

export const WithoutTextToCopy: Story = {
  args: {
    children: 'echo hello world',
  },
};

export const WithTextToCopyJsx: Story = {
  args: {
    children: (
      <span>
        <strong>$</strong>echo hello world
      </span>
    ),
    textToCopy: 'echo hello world',
  },
};

export default { component: ShellBox } as Meta;
