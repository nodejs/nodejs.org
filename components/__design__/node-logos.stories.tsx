import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import JsIconGreen from '@/components/Icons/Logos/JsIconGreen';
import JsIconWhite from '@/components/Icons/Logos/JsIconWhite';
import NodejsLogoDark from '@/components/Icons/Logos/NodejsDark';
import NodejsLogoLight from '@/components/Icons/Logos/NodejsLight';
import NodejsStackedBlack from '@/components/Icons/Logos/NodejsStackedBlack';
import NodejsStackedDark from '@/components/Icons/Logos/NodejsStackedDark';
import NodejsStackedLight from '@/components/Icons/Logos/NodejsStackedLight';
import NodejsStackedWhite from '@/components/Icons/Logos/NodejsStackedWhite';

export const HorizontalLogos: StoryObj = {
  render: () => (
    <div className="flex flex-row gap-4">
      <NodejsLogoLight width={267} height={80} className="hidden dark:block" />
      <NodejsLogoDark width={267} height={80} className="block dark:hidden" />
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
