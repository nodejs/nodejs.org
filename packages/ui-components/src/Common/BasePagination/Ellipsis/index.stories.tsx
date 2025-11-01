import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

import Ellipsis from '#ui/Common/BasePagination/Ellipsis';

type Story = StoryObj<typeof Ellipsis>;
type Meta = MetaObj<typeof Ellipsis>;

export const Default: Story = {};

export default { component: Ellipsis } as Meta;
