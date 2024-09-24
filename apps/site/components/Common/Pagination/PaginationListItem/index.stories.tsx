import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import PaginationListItem from '@/components/Common/Pagination/PaginationListItem';

type Story = StoryObj<typeof PaginationListItem>;
type Meta = MetaObj<typeof PaginationListItem>;

export const Default: Story = {
  args: {
    url: '#',
    pageNumber: 1,
    currentPage: 2,
    totalPages: 2,
  },
  decorators: [
    Story => (
      <ul className="list-none">
        <Story />
      </ul>
    ),
  ],
};

export const CurrentPage: Story = {
  args: {
    url: '#',
    pageNumber: 1,
    currentPage: 1,
    totalPages: 1,
  },
  decorators: [
    Story => (
      <ul className="list-none">
        <Story />
      </ul>
    ),
  ],
};

export default { component: PaginationListItem } as Meta;
