import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import {
  JsGreen,
  JsWhite,
  Nodejs,
  NodejsStackedBlack,
  NodejsStackedDark,
  NodejsStackedLight,
  NodejsStackedWhite,
} from '@node-core/ui-components/Icons/Logos';

export const HorizontalLogo: StoryObj = {
  render: () => <Nodejs width={267} height={80} />,
};

export const PrideLogo: StoryObj = {
  render: () => <Nodejs variant="pride" width={267} height={80} />,
};

export const StackedLogos: StoryObj = {
  render: () => (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col gap-2">
        {[NodejsStackedDark, NodejsStackedBlack].map((Icon, index) => (
          <Icon
            key={index}
            className="block dark:hidden"
            width={267}
            height={164}
          />
        ))}
        {[NodejsStackedLight, NodejsStackedWhite].map((Icon, index) => (
          <Icon
            key={index}
            className="hidden dark:block"
            width={267}
            height={164}
          />
        ))}
      </div>
    </div>
  ),
};

export const JSSymbols: StoryObj = {
  render: () => (
    <div className="flex flex-row gap-4">
      {[JsWhite, JsGreen].map((Icon, index) => (
        <Icon
          key={index}
          className={index === 0 ? 'hidden dark:block' : 'block dark:hidden'}
          width={30}
          height={30}
        />
      ))}
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
