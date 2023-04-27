import InlineCode from './InlineCode';
import Codebox from './index';
import type { StoryObj } from '@storybook/react';

const code = 'const a = 1;';

export default { component: Codebox };

type Story = StoryObj<typeof Codebox>;

export const Default: Story = {
  args: {
    children: <pre className="language-js">{code}</pre>,
  },
};

export const Inline: Story = {
  render: ({ children }) => <InlineCode>{children}</InlineCode>,
  args: {
    children: <code>{code}</code>,
  },
};
