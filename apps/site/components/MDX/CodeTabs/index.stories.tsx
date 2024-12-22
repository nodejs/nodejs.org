import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import { VFile } from 'vfile';

import { compile } from '@/next.mdx.compiler.mjs';
import { MDX_COMPONENTS } from '@/next.mdx.components.mjs';

type Props = { children: string };

type Story = StoryObj<Props>;
type Meta = MetaObj<Props>;

export const Default: Story = {
  args: {
    children: `\`\`\`mjs
const { createHmac } = await import('node:crypto');

const secret = 'abcdefg';
const hash = createHmac('sha256', secret)
               .update('I love cupcakes')
               .digest('hex');

console.log(hash);
// Prints:
//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e
\`\`\`

\`\`\`cjs displayName="CommonJS" showCopyButton="true"
const { createHmac } = require('node:crypto');

const secret = 'abcdefg';
const hash = createHmac('sha256', secret)
               .update('I love cupcakes')
               .digest('hex');

console.log(hash);
// Prints:
//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e
\`\`\``,
  },
};

export default {
  title: 'MDX/CodeTabs',
  render: (_, { loaded: { Content } }) => Content,
  loaders: [
    async ({ args }) => {
      const { content } = await compile(
        new VFile(args.children),
        'mdx',
        MDX_COMPONENTS
      );

      return { Content: content };
    },
  ],
} as Meta;
