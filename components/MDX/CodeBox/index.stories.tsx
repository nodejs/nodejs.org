import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import { VFile } from 'vfile';

import { MDXRenderer } from '@/components/mdxRenderer';
import { compileMDX } from '@/next.mdx.compiler.mjs';

type Props = { children: string };

type Story = StoryObj<Props>;
type Meta = MetaObj<Props>;

export const SingleFile: Story = {
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

export const MultipleFiles: Story = {
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
\`\`\`cjs displayName="CommonJS"
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
  title: 'MDX/CodeBox',
  render: (_, { loaded: { Content } }) => Content,
  loaders: [
    async ({ args }) => {
      const { MDXContent } = await compileMDX(new VFile(args.children), 'mdx');

      return {
        Content: <MDXRenderer Component={MDXContent} />,
      };
    },
  ],
} as Meta;
