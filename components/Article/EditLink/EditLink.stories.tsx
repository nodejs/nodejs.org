import { LocaleProvider } from './../../../providers/localeProvider';
import EditLink from './index';
import {
  exampleRelativePath,
  i18nMockDataEnglish,
  i18nMockDataNonEnglish,
} from './mockDataConstants';

export default { component: EditLink };

export const Edit = {
  args: {
    relativePath: exampleRelativePath,
  },
  render: (args: any) => {
    return (
      <LocaleProvider i18nData={i18nMockDataEnglish}>
        <EditLink {...args} />
      </LocaleProvider>
    );
  },
};

export const Translate = {
  render: () => {
    return (
      <LocaleProvider i18nData={i18nMockDataNonEnglish}>
        <EditLink relativePath={exampleRelativePath} />
      </LocaleProvider>
    );
  },
};

export const Empty = {};
