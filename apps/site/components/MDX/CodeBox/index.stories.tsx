import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import { VFile } from 'vfile';

import { MDXRenderer } from '@/components/mdxRenderer';
import { compileMDX } from '@/next.mdx.compiler.mjs';

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
      const { MDXContent } = await compileMDX(new VFile(args.children), 'mdx');

      return { Content: <MDXRenderer Component={MDXContent} /> };
    },
  ],
} as Meta;
