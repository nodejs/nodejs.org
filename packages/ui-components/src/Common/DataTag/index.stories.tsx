import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

import DataTag, { type DataTagProps } from '#ui/Common/DataTag';

type Story = StoryObj<typeof DataTag>;
type Meta = MetaObj<typeof DataTag>;

export const DataTags: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 p-6">
      {[
        'event',
        'method',
        'property',
        'class',
        'module',
        'classMethod',
        'ctor',
        'global',
      ]
        .map(kind =>
          ['sm', 'md', 'lg'].map(size => (
            <div
              key={`${kind}-${size}`}
              className="flex justify-center"
              title={kind}
            >
              <DataTag
                kind={kind as DataTagProps['kind']}
                size={size as DataTagProps['size']}
              />
            </div>
          ))
        )
        .flat()}
    </div>
  ),
};

export default { component: DataTag } as Meta;
