import InlineCode from './InlineCode';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof InlineCode> = {
  title: 'InlineCode',
  component: InlineCode,
};

export default meta;

type Story = StoryObj<typeof InlineCode>;

const code = 'const a = 1;';

export const Default: Story = {
  args: {
    children: <code>{code}</code>,
  },
};
