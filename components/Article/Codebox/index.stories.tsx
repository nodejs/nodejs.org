import Codebox from './index';
import type { Meta, StoryObj } from '@storybook/react';
import type { FC } from 'react';

type CodeBoxProps = {
  language: string[];
  code: string[];
};

type ICodebox = FC<CodeBoxProps>;

const meta: Meta<ICodebox> = {
  component: Codebox as unknown as ICodebox,
  decorators: [
    (_Story, context) => (
      <Codebox>
        <pre className={context.args.language.join('|')}>
          {context.args.code.join('--------------\n')}
        </pre>
      </Codebox>
    ),
  ],
};

type Story = StoryObj<ICodebox>;

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

export default meta;
