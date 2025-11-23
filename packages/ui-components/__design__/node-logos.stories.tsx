import { JsWhite, Nodejs } from '#ui/Icons/Logos';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

export const NodejsLogos: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['default', 'pride'] as const).map(variant => (
        <Nodejs key={variant} width={267} height={80} variant={variant} />
      ))}
      <div className="flex flex-row gap-4">
        <JsWhite width={30} height={30} />
      </div>
    </div>
  ),
  name: 'Node.js Logos',
};

export default { title: 'Design System' } as MetaObj;
