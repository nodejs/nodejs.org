import BaseCodeBox from '#ui/Common/BaseCodeBox';
import CodeTabs from '#ui/Common/CodeTabs';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

type Story = StoryObj<typeof CodeTabs>;
type Meta = MetaObj<typeof CodeTabs>;

const mjsContent = `import * as http from 'http';

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

const cjsContent = `const http = require('http');

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

const boxProps = {
  onCopy: console.log,
  buttonContent: '[Button Text]',
};

const tabsContent = (
  <>
    <BaseCodeBox language="JavaScript (MJS)" {...boxProps}>
      <code>{mjsContent}</code>
    </BaseCodeBox>
    <BaseCodeBox language="JavaScript (CJS)" {...boxProps}>
      <code>{cjsContent}</code>
    </BaseCodeBox>
  </>
);

export const Default: Story = {};

export const WithExtension: Story = {
  args: {
    tabs: [
      { key: 'mjs', label: 'Example', extension: 'MJS' },
      { key: 'cjs', label: 'Example', extension: 'CJS' },
    ],
  },
};

export const WithGroupId: Story = {
  args: {
    groupId: 'hello-world',
  },
};

export default {
  component: CodeTabs,
  args: {
    children: tabsContent,
    defaultValue: 'mjs',
    tabs: [
      { key: 'mjs', label: 'MJS' },
      { key: 'cjs', label: 'CJS' },
    ],
  },
} as Meta;
