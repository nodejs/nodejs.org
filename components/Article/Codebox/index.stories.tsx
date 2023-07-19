import Codebox from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import type { FC } from 'react';

type DecoratedCodeBoxProps = {
  language: string[];
  code: string[];
  textToCopy?: string[];
  hideHeader?: boolean;
};

const DecoratedCodeBox: FC<DecoratedCodeBoxProps> = ({
  language,
  code,
  textToCopy,
  hideHeader = false,
}) => (
  <Codebox textToCopy={textToCopy} hideHeader={hideHeader}>
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

export const HiddenHeader: Story = {
  args: {
    language: ['language-js'],
    code: singleLangCode,
    hideHeader: true,
  },
};

export const MultiLangWithTextToCopy: Story = {
  args: {
    language: ['language-cjs', 'language-mjs'],
    code: multiLangCode,
    textToCopy: ['cjs example', 'mjs example'],
  },
};

const bashCode = ['$ echo "Hello World"'];

export const Shell: Story = {
  args: {
    language: ['language-shell'],
    code: bashCode,
  },
};

export default { component: DecoratedCodeBox } as Meta;
