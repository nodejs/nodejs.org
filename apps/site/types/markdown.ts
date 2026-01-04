import type { Layouts } from './layouts';
import type { Heading } from '@vcarl/remark-headings';
import type { ReadTimeResults } from 'reading-time';

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

export type MarkdownContext = {
  frontmatter: Frontmatter;
  headings: Array<Heading>;
  pathname: string;
  filename: string;
  readingTime: ReadTimeResults;
};
