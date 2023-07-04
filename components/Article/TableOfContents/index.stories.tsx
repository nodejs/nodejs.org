import { toc1, toc2 } from '../../../__fixtures__/page';
import TableOfContents from './';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof TableOfContents>;
type Meta = MetaObj<typeof TableOfContents>;

export const Default: Story = {
  args: {
    tableOfContents: toc1,
  },
};

export const Second: Story = {
  args: {
    tableOfContents: toc2,
  },
};

export const Blank: Story = {
  args: {
    tableOfContents: [],
  },
};

export default { component: TableOfContents } as Meta;
