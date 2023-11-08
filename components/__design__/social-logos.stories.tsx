import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import Image from 'next/image';

export const SocialMediaLogos: StoryObj = {
  render: () => (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/static/images/logos/social-github.svg"
          alt="GitHub Logo"
          width={64}
          height={64}
        />
        <Image
          src="/static/images/logos/social-mastodon.svg"
          alt="Mastodon Logo"
          width={64}
          height={64}
        />
        <Image
          src="/static/images/logos/social-linkedin.svg"
          alt="LinkedIn Logo"
          width={64}
          height={64}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/static/images/logos/social-slack.svg"
          alt="Slack Logo"
          width={64}
          height={64}
        />
        <Image
          src="/static/images/logos/social-twitter.svg"
          alt="Twitter Logo"
          width={64}
          height={64}
        />
      </div>
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
