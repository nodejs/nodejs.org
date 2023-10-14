import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import Image from 'next/image';

export const HorizontalLogos: StoryObj = {
  render: () => (
    <div className="flex flex-row gap-4">
      <Image
        src={`/static/images/logos/horizontal-light.svg`}
        className="bg-black"
        alt="Node.js"
        width={267}
        height={80}
      />
      <Image
        src={`/static/images/logos/horizontal-dark.svg`}
        alt="Node.js"
        width={267}
        height={80}
      />
    </div>
  ),
};

export const StackedLogos: StoryObj = {
  render: () => (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col gap-2">
        <Image
          src={`/static/images/logos/stacked-dark.svg`}
          alt="Node.js"
          width={267}
          height={80}
        />
        <Image
          src={`/static/images/logos/stacked-black.svg`}
          alt="Node.js"
          width={267}
          height={80}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Image
          src={`/static/images/logos/stacked-white.svg`}
          alt="Node.js"
          width={267}
          height={80}
        />
        <Image
          src={`/static/images/logos/stacked-light.svg`}
          alt="Node.js"
          width={267}
          height={80}
        />
      </div>
    </div>
  ),
};

export const JSSymbols: StoryObj = {
  render: () => (
    <div className="flex flex-row gap-4">
      <Image
        src={`/static/images/logos/js-white.svg`}
        alt="Node.js"
        width={30}
        height={30}
      />
      <Image
        src={`/static/images/logos/js-green.svg`}
        alt="Node.js"
        width={30}
        height={30}
      />
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
