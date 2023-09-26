import Image from 'next/image';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

export const StackedLogos: StoryObj = {};

export default {
  title: 'Design System/Stacked Logos',
  component: () => {
    return (
      <div>
        <div>
          <Image
            src={`/static/images/logos/stacked-dark.svg`}
            alt="Node.js"
            width={267}
            height={80}
          />
        </div>
      </div>
    );
  },
} as MetaObj;
