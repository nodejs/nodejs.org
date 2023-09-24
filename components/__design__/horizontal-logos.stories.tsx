import Image from 'next/image';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

export const HorizontalLogos: StoryObj = {};

export default {
  title: 'Design System/Logos',
  component: () => {
    return (
      <div>
        <div>
          <Image
              src={`/static/images/logos/horizontal-light.svg`}
              alt="Node.js"
              width={267}
              height={80}
          />
        </div>
        <div>
          <Image
              src={`/static/images/logos/horizontal-dark.svg`}
              alt="Node.js"
              width={267}
              height={80}
          />
        </div>
      </div>
    );
  },
} as MetaObj;