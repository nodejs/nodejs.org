import Text from './text';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Text>;
type Meta = MetaObj<typeof Text>;

export const Default: Story = {};

export default { component: Text } as Meta;
