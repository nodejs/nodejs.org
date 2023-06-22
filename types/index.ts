import type { AppProps as DefaultAppProps } from 'next/app';

import type { BlogData } from './blog';

export * from './api';
export * from './blog';
export * from './config';
export * from './dropdown';
export * from './features';
export * from './frontmatter';
export * from './i18n';
export * from './layouts';
export * from './navigation';
export * from './prevNextLink';
export * from './releases';
export * from './middlewares';

export interface AppProps {
  blogData?: BlogData;
  statusCode?: number;
}

export type NextraAppProps = DefaultAppProps<AppProps>;
