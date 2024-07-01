import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import HexagonGrid from '@/components/Icons/HexagonGrid';

type Story = StoryObj<typeof HexagonGrid>;
type Meta = MetaObj<typeof HexagonGrid>;

export const Default: Story = {};

export default { component: HexagonGrid } as Meta;
