import BlockQuote from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof BlockQuote>;
type Meta = MetaObj<typeof BlockQuote>;

export const Default: Story = {
  args: {
    author: 'Bat Man',
    category: 'category-mock',
    date: '2023-04-21 23:40:56.77',
    slug: '/blog/category-mock/sample-blog',
    title: 'Sample Test Blog',
    readingTime: '1 min read',
  },
};

export default { component: BlockQuote } as Meta;
