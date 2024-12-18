import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import LanguageDropDown from '@/components/Common/LanguageDropDown';

type Story = StoryObj<typeof LanguageDropDown>;
type Meta = MetaObj<typeof LanguageDropDown>;

export const Default: Story = {
  args: {
    availableLanguages: [
      { name: 'English', code: 'en', localName: 'English' },
      { name: 'French', code: 'fr', localName: 'Français' },
      { name: 'Spanish', code: 'es', localName: 'Español' },
    ],
    currentLanguage: 'en',
  },
};

export default { component: LanguageDropDown } as Meta;
