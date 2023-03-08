// @TODO: These types will be splitted on individual files for better organisation in the future
import type { AppProps as DefaultAppProps } from 'next/app';

import type { LocaleContext } from './i18n';
import type { NodeVersionData } from './nodeVersions';
import type { BlogData } from './blog';

export * from './config';
export * from './frontmatter';
export * from './features';
export * from './layouts';
export * from './navigation';
export * from './nodeVersions';
export * from './blog';
export * from './i18n';

export interface AppProps {
  i18nData: Pick<LocaleContext, 'localeMessages' | 'currentLocale'>;
  nodeVersionData: Array<NodeVersionData>;
  blogData?: BlogData;
  statusCode?: number;
}

export type NextraAppProps = DefaultAppProps<AppProps>;
