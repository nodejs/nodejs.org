import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import BlogPostCard from '@/components/Common/BlogPostCard';

type Story = StoryObj<typeof BlogPostCard>;
type Meta = MetaObj<typeof BlogPostCard>;

export const Default: Story = {
  args: {
    title: 'Node.js March 17th Infrastructure Incident Post-mortem',
    category: 'vulnerability',
    description:
      'Starting on March 15th and going through to March 17th (with much of the issue being mitigated on the 16th), users were receiving intermittent 404 responses when trying to download Node.js from nodejs.org, or even accessing parts of the website.',
    authors: [
      {
        fullName: 'Hayden Bleasel',
        src: 'https://avatars.githubusercontent.com/u/',
      },
    ],
    slug: '/blog/vulnerability/something',
    date: new Date('17 October 2023'),
  },
  decorators: [
    Story => (
      <div className="max-w-lg">
        <Story />
      </div>
    ),
  ],
};

export const MoreThanOneAuthor: Story = {
  ...Default,
  args: {
    ...Default.args,
    authors: [
      ...(Default.args?.authors ?? []),
      {
        fullName: 'Jane Doe',
        src: 'https://avatars.githubusercontent.com/u/',
      },
    ],
  },
};

export default { component: BlogPostCard } as Meta;
