import type { Layouts } from './layouts';

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
};
