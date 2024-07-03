import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import BlogHeader from '@/components/Blog/BlogHeader';

type Story = StoryObj<typeof BlogHeader>;
type Meta = MetaObj<typeof BlogHeader>;

export const Default: Story = {
  args: {
    // See `@/site.json` for the `rssFeeds` object
    category: 'all',
  },
  decorators: [
    // We need to wrap to allow global styles to be applied (markdown styles)
    Story => (
      <main>
        <Story />
      </main>
    ),
  ],
};

export default { component: BlogHeader } as Meta;
