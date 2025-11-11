import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

import BaseCodeBox from '#ui/Common/BaseCodeBox';

type Story = StoryObj<typeof BaseCodeBox>;
type Meta = MetaObj<typeof BaseCodeBox>;

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

const args = {
  language: 'JavaScript (CJS)',
  children: <code>{content}</code>,
};

export const Default: Story = {
  args,
};

export const WithCopyButton: Story = {
  args: {
    ...args,
    showCopyButton: true,
  },
};

export default { component: BaseCodeBox } as Meta;
