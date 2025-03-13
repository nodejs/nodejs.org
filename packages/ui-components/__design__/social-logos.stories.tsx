import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import {
  Bluesky,
  Discord,
  GitHub,
  LinkedIn,
  Mastodon,
  Slack,
  X,
} from '@node-core/ui-components/Icons/Social';

const socialIcons = [
  [GitHub, Mastodon, LinkedIn],
  [Slack, X, Bluesky],
  [Discord],
];

export const SocialMediaLogos: StoryObj = {
  render: () => (
    <div className="flex flex-row gap-4">
      {socialIcons.map((group, idx) => (
        <div key={idx} className="flex flex-col items-center gap-4">
          {group.map((Icon, index) => (
            <Icon key={index} width={64} height={64} />
          ))}
        </div>
      ))}
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
