import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import GitHub from '@/components/Icons/Social/GitHub';
import LinkedIn from '@/components/Icons/Social/LinkedIn';
import Mastodon from '@/components/Icons/Social/Mastodon';
import Slack from '@/components/Icons/Social/Slack';
import Twitter from '@/components/Icons/Social/Twitter';

export const SocialMediaLogos: StoryObj = {
  render: () => (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col items-center gap-4">
        <GitHub width={64} height={64} />
        <Mastodon width={64} height={64} />
        <LinkedIn width={64} height={64} />
      </div>
      <div className="flex flex-col items-center gap-4">
        <Slack width={64} height={64} />
        <Twitter width={64} height={64} />
      </div>
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
