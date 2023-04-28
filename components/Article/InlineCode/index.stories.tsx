import InlineCode from './index';
import type { FC } from 'react';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type InlineCodeProps = {
  code: string;
};

type InlineCodeFC = FC<InlineCodeProps>;

type Story = StoryObj<InlineCodeFC>;
type Meta = MetaObj<InlineCodeFC>;

const code = 'const a = 1;';

export const Default: Story = {
  args: { code },
};

export default {
  component: InlineCode as InlineCodeFC,
  decorators: [
    (_Story, context) => (
      <InlineCode>
        <code>{context.args.code}</code>
      </InlineCode>
    ),
  ],
} as Meta;
