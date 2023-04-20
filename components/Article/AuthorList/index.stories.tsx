import AuthorList from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof AuthorList>;
type Meta = MetaObj<typeof AuthorList>;

export const Default: Story = {
  args: {
    authors: ['flaviocopes', 'MarkPieszak', 'mcollina', 'unavailable-author'],
  },
};

export default { component: AuthorList } as Meta;
