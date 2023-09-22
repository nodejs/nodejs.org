import Image from 'next/image';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

export const JSLogos: StoryObj = {};

export default {
  title: 'Design System/Logos',
  component: () => {
    return (
      <div>
        <Image
          src={`/static/images/logos/js-white.svg`}
          alt="Node.js"
          width={30}
          height={30}
        />
      </div>
    );
  },
} as MetaObj;
