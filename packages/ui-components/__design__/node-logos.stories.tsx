import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import { JsWhite, Nodejs } from '#ui/Icons/Logos';

export const HorizontalLogo: StoryObj = {
  render: () => <Nodejs width={267} height={80} />,
};

export const PrideLogo: StoryObj = {
  render: () => <Nodejs variant="pride" width={267} height={80} />,
};

export const JSSymbols: StoryObj = {
  render: () => (
    <div className="flex flex-row gap-4">
      <JsWhite width={30} height={30} />
    </div>
  ),
};

export default { title: 'Design System' } as MetaObj;
