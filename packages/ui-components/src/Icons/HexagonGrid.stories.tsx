import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

import HexagonGrid from '#ui/Icons/HexagonGrid';

type Story = StoryObj<typeof HexagonGrid>;
type Meta = MetaObj<typeof HexagonGrid>;

export const Default: Story = {};

export default { component: HexagonGrid } as Meta;
