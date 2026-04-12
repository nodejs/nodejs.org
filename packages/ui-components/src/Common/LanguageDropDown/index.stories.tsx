import LanguageDropDown from '#ui/Common/LanguageDropDown';

import type { Meta as MetaObj, StoryObj } from '@storybook/react-webpack5';

type Story = StoryObj<typeof LanguageDropDown>;
type Meta = MetaObj<typeof LanguageDropDown>;

export const Default: Story = {
  args: {
    availableLanguages: [
      { name: 'English', code: 'en', localName: 'English', hrefLang: 'en-GB' },
      { name: 'French', code: 'fr', localName: 'Français', hrefLang: 'fr' },
      { name: 'Spanish', code: 'es', localName: 'Español', hrefLang: 'es-ES' },
      { name: 'Japanese', code: 'ja', localName: '日本語', hrefLang: 'ja' },
      {
        name: 'Simplified Chinese',
        code: 'zh-cn',
        localName: '简体中文',
        hrefLang: 'zh-Hans',
      },
      {
        name: 'Traditional Chinese',
        code: 'zh-tw',
        localName: '繁體中文',
        hrefLang: 'zh-Hant',
      },
    ],
    currentLanguage: 'en',
  },
};

export const Japanese: Story = {
  args: {
    ...Default.args,
    currentLanguage: 'ja',
  },
};

export default { component: LanguageDropDown } as Meta;
