import { LocaleProvider } from '../../../providers/localeProvider';
import EditLink from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';
import type { AppProps } from '../../../types';

type Story = StoryObj<typeof EditLink>;
type Meta = MetaObj<typeof EditLink>;

export const Edit: Story = {
  args: {
    relativePath: 'get-involved/contribute.md',
  },
};

export const Empty: Story = {};

export const WithTranslations: Story = {
  args: {
    relativePath: 'get-involved/contribute.md',
  },
  decorators: [
    Story => {
      const i18nDataTranslateMode = {
        currentLocale: {
          code: 'xx',
        },
        localeMessages: {
          'components.article.editLink.title.translate':
            'Interested to help with translations?',
        },
      } as unknown as AppProps['i18nData'];
      return (
        <LocaleProvider i18nData={i18nDataTranslateMode}>
          <Story />
        </LocaleProvider>
      );
    },
  ],
};

export default { component: EditLink } as Meta;
