import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import type { FC } from 'react';

import CodeBox from '@/components/Common/CodeBox';
import CodeTabs from '@/components/Common/CodeTabs';

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

const TabsContent: FC = () => (
  <>
    <TabsPrimitive.Content key="mjs" value="mjs">
      <CodeBox language="JavaScript (MJS)" showCopyButton>
        <code>{mjsContent}</code>
      </CodeBox>
    </TabsPrimitive.Content>
    <TabsPrimitive.Content key="cjs" value="cjs">
      <CodeBox language="JavaScript (CJS)" showCopyButton>
        <code>{cjsContent}</code>
      </CodeBox>
    </TabsPrimitive.Content>
  </>
);

export const Default: Story = {};

export const WithMoreOptions: Story = {
  args: {
    linkUrl: 'https://github.com/nodejs/nodejs.org',
    linkText: 'More options',
  },
};

export default {
  component: CodeTabs,
  args: {
    children: <TabsContent />,
    defaultValue: 'mjs',
    tabs: [
      { key: 'mjs', label: 'MJS' },
      { key: 'cjs', label: 'CJS' },
    ],
  },
} as Meta;
