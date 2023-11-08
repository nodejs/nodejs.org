import type { Meta as MetaObj, StoryObj } from '@storybook/react';

import LanguageDropDown from '@/components/Common/LanguageDropDown';

type Story = StoryObj<typeof LanguageDropDown>;
type Meta = MetaObj<typeof LanguageDropDown>;

export const Default: Story = {
  args: {
    availableLanguages: [
      { name: 'English', code: 'en' },
      { name: 'French', code: 'fr' },
      { name: 'Spanish', code: 'es' },
    ],
    currentLanguage: { name: 'English', code: 'en' },
  },
};

export default { component: LanguageDropDown } as Meta;
