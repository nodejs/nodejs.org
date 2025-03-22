import * as TabsPrimitive from '@radix-ui/react-tabs';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import type { FC } from 'react';

import BaseCodeBox from '@node-core/ui-components/Common/BaseCodeBox';
import CodeTabs from '@node-core/ui-components/Common/CodeTabs';

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
  copyText: '[Copy Text]',
  copiedText: '[Copied Text]',
};

const TabsContent: FC = () => (
  <>
    <TabsPrimitive.Content key="mjs" value="mjs">
      <BaseCodeBox language="JavaScript (MJS)" {...boxProps}>
        <code>{mjsContent}</code>
      </BaseCodeBox>
    </TabsPrimitive.Content>
    <TabsPrimitive.Content key="cjs" value="cjs">
      <BaseCodeBox language="JavaScript (CJS)" {...boxProps}>
        <code>{cjsContent}</code>
      </BaseCodeBox>
    </TabsPrimitive.Content>
  </>
);

export const Default: Story = {};

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
