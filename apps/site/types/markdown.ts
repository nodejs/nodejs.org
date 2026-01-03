import type { Layouts } from './layouts';
import type { ServerContext } from './server';
import type { ReactNode } from 'react';

// TODO(@avivkeller): BlogFrontmatter, LearnFrontmatter, etc
export type Frontmatter = {
  layout?: Layouts;
  title?: string;
  labels?: Record<string, string>;
  date?: string;
  author?: string;
  authors?: string;
  category?: string;
  description?: string;
  canonical?: string;
};

export type MarkdownFile = ServerContext & {
  content: ReactNode;
};
