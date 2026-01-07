import SkipToContentButton from '#ui/Common/SkipToContentButton';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

type Story = StoryObj<typeof SkipToContentButton>;
type Meta = MetaObj<typeof SkipToContentButton>;

export const Default: Story = {
  args: {
    children: 'Skip to content',
  },
};

export default { component: SkipToContentButton } as Meta;
