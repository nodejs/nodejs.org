
import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';
import type { ComponentProps } from 'react';

import Mermaid from './index';

type Story = StoryObj<typeof Mermaid>;
type Meta = MetaObj<typeof Mermaid>;

const defaultArgs: ComponentProps<typeof Mermaid> = {
  children: 'graph TD;\n  A[Start] --> B[Process];\n  B --> C[End];',
};

export const Flowchart: Story = {};

export const SequenceDiagram: Story = {
  args: {
    children:
      'sequenceDiagram\n  Alice->>Bob: Hello Bob\n  Bob-->>Alice: Hi Alice',
  },
};

export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};

export const InvalidSource: Story = {
  args: {
    children: 'this is not a diagram',
  },
};

export default {
  title: 'MDX/Mermaid',
  component: Mermaid,
  args: defaultArgs,
} as Meta;
