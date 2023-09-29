import Image from 'next/image';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

export const SocialLogos: StoryObj = {};

export default {
  title: 'Design System/Social Logos',
  component: () => {
    return (
      <div>
        <div>
          <Image
            src="/static/images/logos/social-github.svg"
            alt="GitHub Logo"
            width={64}
            height={64}
          />
        </div>
        <div>
          <Image
            src="/static/images/logos/social-linkedin.svg"
            alt="LinkedIn Logo"
            width={64}
            height={64}
          />
        </div>
      </div>
    );
  },
} as MetaObj;
