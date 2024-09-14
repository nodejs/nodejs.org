import { compileMDX } from '@node-core/compile-mdx/compiler';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import { VFile } from 'vfile';

import { MDXRenderer } from '@/components/mdxRenderer';
import { NEXT_REHYPE_PLUGINS, NEXT_REMARK_PLUGINS } from '@/mdx.plugins.mjs';

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
      const { MDXContent } = await compileMDX({
        source: new VFile(args.children),
        fileExtension: 'mdx',
        rehypePlugins: NEXT_REHYPE_PLUGINS,
        remarkPlugins: NEXT_REMARK_PLUGINS,
      });

      return { Content: <MDXRenderer Component={MDXContent} /> };
    },
  ],
} as Meta;
