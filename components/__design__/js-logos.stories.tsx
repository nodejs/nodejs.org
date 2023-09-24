import Image from 'next/image';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

export const JSLogos: StoryObj = {};

export default {
  title: 'Design System/JS Logos',
  component: () => {
    return (
      <div>
        <div>
          <Image
            src={`/static/images/logos/js-white.svg`}
            alt="Node.js"
            width={30}
            height={30}
          />
        </div>
        <div>
          <Image
            src={`/static/images/logos/js-green.svg`}
            alt="Node.js"
            width={30}
            height={30}
          />
        </div>
      </div>
    );
  },
} as MetaObj;
