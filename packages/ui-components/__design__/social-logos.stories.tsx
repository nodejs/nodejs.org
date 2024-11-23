import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import BlueskyIcon from '@node-core/ui-components/Icons/Social/Bluesky';
import GitHubIcon from '@node-core/ui-components/Icons/Social/GitHub';
import LinkedInIcon from '@node-core/ui-components/Icons/Social/LinkedIn';
import MastodonIcon from '@node-core/ui-components/Icons/Social/Mastodon';
import SlackIcon from '@node-core/ui-components/Icons/Social/Slack';
import XIcon from '@node-core/ui-components/Icons/Social/X';

export const SocialMediaLogos: StoryObj = {
  render: () => (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col items-center gap-4">
        <GitHubIcon width={64} height={64} />
        <MastodonIcon width={64} height={64} />
        <LinkedInIcon width={64} height={64} />
      </div>
      <div className="flex flex-col items-center gap-4">
        <SlackIcon width={64} height={64} />
        <XIcon width={64} height={64} />
        <BlueskyIcon width={64} height={64} />
      </div>
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
