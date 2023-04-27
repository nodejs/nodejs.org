import InlineCode from './InlineCode';
import Codebox from './index';
import type { StoryObj } from '@storybook/react';

export default { component: Codebox };

type Story = StoryObj<typeof Codebox>;

const singleLangCode = 'const a = 1;';

export const Default: Story = {
  args: {
    children: <pre className="language-js">{singleLangCode}</pre>,
  },
};

const multiLangCode = `const http = require('http');
--------------
import http from 'http';`;

export const MultiLang: Story = {
  args: {
    children: <pre className="language-cjs|language-mjs">{multiLangCode}</pre>,
  },
};

type InlineCodeStory = StoryObj<typeof InlineCode>;

export const Inline: InlineCodeStory = {
  render: ({ children }) => <InlineCode>{children}</InlineCode>,
  args: {
    children: <code>{singleLangCode}</code>,
  },
};
