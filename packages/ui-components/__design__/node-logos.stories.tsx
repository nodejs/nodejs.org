import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import JsGreenIcon from '@node-core/ui-components/Icons/Logos/JsGreen';
import JsWhiteIcon from '@node-core/ui-components/Icons/Logos/JsWhite';
import NodejsIcon from '@node-core/ui-components/Icons/Logos/Nodejs';
import NodejsStackedBlackIcon from '@node-core/ui-components/Icons/Logos/NodejsStackedBlack';
import NodejsStackedDarkIcon from '@node-core/ui-components/Icons/Logos/NodejsStackedDark';
import NodejsStackedLightIcon from '@node-core/ui-components/Icons/Logos/NodejsStackedLight';
import NodejsStackedWhiteIcon from '@node-core/ui-components/Icons/Logos/NodejsStackedWhite';

export const HorizontalLogo: StoryObj = {
  render: () => <NodejsIcon width={267} height={80} />,
};

export const PrideLogo: StoryObj = {
  render: () => <NodejsIcon variant="pride" width={267} height={80} />,
};

export const StackedLogos: StoryObj = {
  render: () => (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col gap-2">
        <NodejsStackedDarkIcon
          className="block dark:hidden"
          width={267}
          height={164}
        />

        <NodejsStackedBlackIcon
          className="block dark:hidden"
          width={267}
          height={164}
        />

        <NodejsStackedLightIcon
          className="hidden dark:block"
          width={267}
          height={164}
        />

        <NodejsStackedWhiteIcon
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
      <JsWhiteIcon className="hidden dark:block" width={30} height={30} />
      <JsGreenIcon className="block dark:hidden" width={30} height={30} />
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
