import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import CircularIcon, { type CircularIconProps } from '#ui/Common/CircularIcon';

type Story = StoryObj<typeof CircularIcon>;
type Meta = MetaObj<typeof CircularIcon>;

export const Icons: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 p-6">
      {['event', 'method', 'property', 'class', 'module', 'classMethod', 'ctor']
        .map(kind =>
          ['sm', 'md', 'lg'].map(size => (
            <div key={`${kind}-${size}`} className="flex justify-center">
              <CircularIcon
                kind={kind as CircularIconProps['kind']}
                size={size as CircularIconProps['size']}
              />
            </div>
          ))
        )
        .flat()}
    </div>
  ),
};

export default { component: CircularIcon } as Meta;
