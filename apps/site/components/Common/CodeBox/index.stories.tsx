import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import CodeBox from '@/components/Common/CodeBox';

type Story = StoryObj<typeof CodeBox>;
type Meta = MetaObj<typeof CodeBox>;

const content = `const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(\`Server running at http://\${hostname}:\${port}/\`);
});`;

export const Default: Story = {
  args: {
    language: 'JavaScript (CJS)',
    children: <code>{content}</code>,
  },
};

export const WithCopyButton: Story = {
  args: {
    language: 'JavaScript (CJS)',
    showCopyButton: true,
    children: <code>{content}</code>,
  },
};

export default { component: CodeBox } as Meta;
