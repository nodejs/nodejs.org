import Codebox from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import type { FC } from 'react';

type DecoratedCodeBoxProps = { language: string[]; code: string[] };

const DecoratedCodeBox: FC<DecoratedCodeBoxProps> = ({ language, code }) => (
  <Codebox>
    <pre className={language.join('|')}>{code.join('--------------\n')}</pre>
  </Codebox>
);

type Story = StoryObj<typeof DecoratedCodeBox>;
type Meta = MetaObj<typeof DecoratedCodeBox>;

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

export default { component: DecoratedCodeBox } as Meta;
