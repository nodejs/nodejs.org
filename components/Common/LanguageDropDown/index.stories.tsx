import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import LanguageDropDown from './index';

type Story = StoryObj<typeof LanguageDropDown>;
type Meta = MetaObj<typeof LanguageDropDown>;

export const Default: Story = {
  args: {},
};

export default { component: LanguageDropDown } as Meta;
