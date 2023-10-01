import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import Image from 'next/image';

export const PlatformLogos: StoryObj = {};

export default {
  title: 'Design System/Platform Logos',
  component: () => {
    return (
      <div>
        <div>
          <Image
            src="/static/images/logos/platform-apple.svg"
            alt="Apple Logo"
            width={64}
            height={64}
          />
        </div>
        <div>
          <Image
            src="/static/images/logos/platform-microsoft.svg"
            alt="Microsoft Logo"
            width={64}
            height={64}
          />
        </div>
        <div>
          <Image
            src="/static/images/logos/platform-homebrew.svg"
            alt="Homebrew Logo"
            width={64}
            height={64}
          />
        </div>
        <div>
          <Image
            src="/static/images/logos/platform-placeholder.svg"
            alt="Placeholder Logo"
            width={64}
            height={64}
          />
        </div>
      </div>
    );
  },
} as MetaObj;
