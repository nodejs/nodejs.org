import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import JsIconGreen from '@/components/Icons/Logos/JsIconGreen';
import JsIconWhite from '@/components/Icons/Logos/JsIconWhite';
import NodejsLogo from '@/components/Icons/Logos/Nodejs';
import NodejsDarkPride from '@/components/Icons/Logos/NodejsDarkPride';
import NodejsLightPride from '@/components/Icons/Logos/NodejsLightPride';
import NodejsStackedBlack from '@/components/Icons/Logos/NodejsStackedBlack';
import NodejsStackedDark from '@/components/Icons/Logos/NodejsStackedDark';
import NodejsStackedLight from '@/components/Icons/Logos/NodejsStackedLight';
import NodejsStackedWhite from '@/components/Icons/Logos/NodejsStackedWhite';

export const HorizontalLogos: StoryObj = {
  render: () => <NodejsLogo width={267} height={80} />,
};

export const PrideLogos: StoryObj = {
  render: () => (
    <div className="flex flex-row gap-4">
      <NodejsDarkPride width={267} height={80} className="block dark:hidden" />
      <NodejsLightPride className="hidden dark:block" width={267} height={80} />
    </div>
  ),
};

export const StackedLogos: StoryObj = {
  render: () => (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col gap-2">
        <NodejsStackedDark
          className="block dark:hidden"
          width={267}
          height={164}
        />

        <NodejsStackedBlack
          className="block dark:hidden"
          width={267}
          height={164}
        />

        <NodejsStackedLight
          className="hidden dark:block"
          width={267}
          height={164}
        />

        <NodejsStackedWhite
          className="hidden dark:block"
          width={267}
          height={164}
        />
      </div>
    </div>
  ),
};

export const JSSymbols: StoryObj = {
  render: () => (
    <div className="flex flex-row gap-4">
      <JsIconWhite className="hidden dark:block" width={30} height={30} />
      <JsIconGreen className="block dark:hidden" width={30} height={30} />
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
