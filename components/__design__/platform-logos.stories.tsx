import Image from 'next/image';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

export const PlatformLogos: StoryObj = {};

export default {
  title: 'Design System/Platform Logos',
  component: () => {
    return (
      <div>
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
