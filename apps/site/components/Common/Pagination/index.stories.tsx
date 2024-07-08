import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Pagination from '@/components/Common/Pagination';

type Story = StoryObj<typeof Pagination>;
type Meta = MetaObj<typeof Pagination>;

export const Default: Story = {
  args: {
    currentPage: 1,
    currentPageSiblingsCount: 1,
    pages: [{ url: '1' }, { url: '2' }, { url: '3' }],
  },
};

export const LeftEllipsis: Story = {
  args: {
    ...Default.args,
    currentPage: 5,
    pages: [
      { url: '1' },
      { url: '2' },
      { url: '3' },
      { url: '4' },
      { url: '5' },
      { url: '6' },
      { url: '7' },
      { url: '8' },
    ],
  },
};

export const RightEllipsis: Story = {
  args: {
    ...LeftEllipsis.args,
    currentPage: 3,
  },
};

export const TwoEllipses: Story = {
  args: {
    ...Default.args,
    currentPage: 5,
    pages: [
      { url: '1' },
      { url: '2' },
      { url: '3' },
      { url: '4' },
      { url: '5' },
      { url: '6' },
      { url: '7' },
      { url: '8' },
      { url: '9' },
      { url: '10' },
    ],
  },
};

export default { component: Pagination } as Meta;
