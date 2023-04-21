import {
  exampleRelativePath,
  i18nMockDataEnglish,
  i18nMockDataNonEnglish,
} from './mockDataConstants';
import { LocaleProvider } from '../../../providers/localeProvider';
import EditLink from './index';
import type { Meta as MetaObj, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof EditLink>;
type Meta = MetaObj<typeof EditLink>;

export const Edit: Story = {
  args: {
    relativePath: exampleRelativePath,
  },
  decorators: [
    Story => (
      <LocaleProvider i18nData={i18nMockDataEnglish}>
        <Story />
      </LocaleProvider>
    ),
  ],
};

export const Translate: Story = {
  args: {
    relativePath: exampleRelativePath,
  },
  decorators: [
    Story => (
      <LocaleProvider i18nData={i18nMockDataNonEnglish}>
        <Story />
      </LocaleProvider>
    ),
  ],
};

export const Empty: Story = {};

export default { component: EditLink } as Meta;
