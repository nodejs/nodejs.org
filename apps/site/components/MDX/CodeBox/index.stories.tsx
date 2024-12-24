import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import { VFile } from 'vfile';

import { compile } from '@/next.mdx.compiler.mjs';
import { MDX_COMPONENTS } from '@/next.mdx.components.mjs';

type Props = { children: string };

type Story = StoryObj<Props>;
type Meta = MetaObj<Props>;

export const Default: Story = {
  args: {
    children: `\`\`\`javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(\`Server running at http://\${hostname}:\${port}/\`);
});
\`\`\``,
  },
};

export default {
  title: 'MDX/CodeBox',
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
