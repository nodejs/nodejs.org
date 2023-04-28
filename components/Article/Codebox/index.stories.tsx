import Codebox from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import type { FC } from 'react';

type CodeBoxProps = {
  language: string[];
  code: string[];
};

type CodeboxFC = FC<CodeBoxProps>;

type Story = StoryObj<CodeboxFC>;
type Meta = MetaObj<CodeboxFC>;

const singleLangCode = ['const a = 1;'];

export const Default: Story = {
  args: {
    language: ['language-js'],
    code: singleLangCode,
  },
};

const multiLangCode = [
  "const http = require('http');",
  "import http from 'http';",
];

export const MultiLang: Story = {
  args: {
    language: ['language-cjs', 'language-mjs'],
    code: multiLangCode,
  },
};

export default {
  component: Codebox as unknown as CodeboxFC,
  decorators: [
    (_Story, context) => (
      <Codebox>
        <pre className={context.args.language.join('|')}>
          {context.args.code.join('--------------\n')}
        </pre>
      </Codebox>
    ),
  ],
} as Meta;
