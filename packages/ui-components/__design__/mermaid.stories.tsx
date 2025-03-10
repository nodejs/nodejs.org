import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import dedent from 'dedent';
import { VFile } from 'vfile';

import { compile } from '@/next.mdx.compiler.mjs';

type Props = { children: string };

type Story = StoryObj<Props>;
type Meta = MetaObj<Props>;

export const Mermaid: Story = {
  args: {
    children: dedent`\`\`\`mermaid
                    graph LR
                    A[Client] --> B(Load Balancer)
                    B --> C{Server 1}
                    B --> D{Server 2}
                    \`\`\``,
  },
};

export default {
  title: 'Design System',
  render: (_, { loaded: { Content } }) => Content,
  loaders: [
    async ({ args }) => {
      const { content } = await compile(new VFile(args.children), 'mdx', {});

      return { Content: content };
    },
  ],
} as Meta;
