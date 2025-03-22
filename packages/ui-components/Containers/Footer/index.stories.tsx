import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import Footer from '@node-core/ui-components/Containers/Footer';

type Story = StoryObj<typeof Footer>;
type Meta = MetaObj<typeof Footer>;

export const Default: Story = {
  args: {
    navigation: {
      footerLinks: [
        { link: '/', text: 'Home' },
        { link: 'https://openjsf.org', text: 'OpenJS Foundation' },
      ],
      socialLinks: [
        { icon: 'github', link: 'https://github.com' },
        { icon: 'mastodon', link: 'https://mastodon.social' },
        { icon: 'twitter', link: 'https://twitter.com' },
        { icon: 'slack', link: 'https://slack.com' },
        { icon: 'linkedin', link: 'https://linkedin.com' },
        { icon: 'bluesky', link: 'https://bsky.app' },
      ],
    },
  },
};

export default { component: Footer } as Meta;
