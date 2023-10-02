import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import Image from 'next/image';

export const HorizontalLogos: StoryObj = {
  render: () => (
    <div>
      <div>
        <Image
          src={`/static/images/logos/horizontal-light.svg`}
          className="bg-black"
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
  ),
};

export const StackedLogos: StoryObj = {
  render: () => (
    <div>
      <div>
        <Image
          src={`/static/images/logos/stacked-dark.svg`}
          alt="Node.js"
          width={267}
          height={80}
        />
      </div>
      <div>
        <Image
          src={`/static/images/logos/stacked-black.svg`}
          alt="Node.js"
          width={267}
          height={80}
        />
      </div>
      <div>
        <Image
          src={`/static/images/logos/stacked-white.svg`}
          alt="Node.js"
          width={267}
          height={80}
        />
      </div>
      <div>
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
  ),
};

export const HexSymbols: StoryObj = {
  render: () => (
    <div>
      <div>
        <Image
          src={`/static/images/logos/hex-white.svg`}
          alt="Node.js"
          width={64}
          height={64}
        />
      </div>
      <div>
        <Image
          src={`/static/images/logos/hex-black.svg`}
          alt="Node.js"
          width={64}
          height={64}
        />
      </div>
      <div>
        <Image
          src={`/static/images/logos/hex-green.svg`}
          alt="Node.js"
          width={64}
          height={64}
        />
      </div>
    </div>
  ),
};

export default { title: 'Design System/Node.js Logos' } as MetaObj;
