import InlineCode from './index';
import type { FC } from 'react';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type DecoratedInlineCodeProps = { code: string };

const DecoratedInlineCode: FC<DecoratedInlineCodeProps> = ({ code }) => (
  <InlineCode>
    <code>{code}</code>
  </InlineCode>
);

type Story = StoryObj<typeof DecoratedInlineCode>;
type Meta = MetaObj<typeof DecoratedInlineCode>;

const code = 'const a = 1;';

export const Default: Story = { args: { code } };

export default { component: DecoratedInlineCode } as Meta;
