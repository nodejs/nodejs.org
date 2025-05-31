import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import CircularIcon from '#ui/Common/CircularIcon';

type Story = StoryObj<typeof CircularIcon>;
type Meta = MetaObj<typeof CircularIcon>;

export const Icons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <CircularIcon symbol="B" color="#3b82f6" size="sm" />
      <CircularIcon symbol="G" color="#10b981" size="md" />
      <CircularIcon symbol="R" color="#ef4444" size="lg" />
    </div>
  ),
};

export default { component: CircularIcon } as Meta;
