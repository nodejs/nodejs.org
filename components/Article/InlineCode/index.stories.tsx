import InlineCode from './index';
import type { FC } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

type InlineCodeArgs = {
  code: string;
};

const meta: Meta<FC<InlineCodeArgs>> = {
  component: InlineCode as FC<InlineCodeArgs>,
  decorators: [
    (Story, context) => (
      <InlineCode>
        <code>{context.args.code}</code>
      </InlineCode>
    ),
  ],
};

export default meta;

type Story = StoryObj<FC<InlineCodeArgs>>;

const code = 'const a = 1;';

export const Default: Story = {
  args: { code },
};
