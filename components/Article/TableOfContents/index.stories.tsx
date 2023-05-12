import { mockTableOfContents } from '../../__fixtures__/page';
import TableOfContents from './';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof TableOfContents>;
type Meta = MetaObj<typeof TableOfContents>;

export const Default: Story = {
  args: {
    tableOfContents: mockTableOfContents.items,
  },
};

export const Empty: Story = {
  args: {
    tableOfContents: [],
  },
};

export default { component: TableOfContents } as Meta;
