import type { Heading } from '@vcarl/remark-headings';

import type { LegacyFrontMatter } from './frontmatter';

export interface ClientSharedServerContext {
  frontmatter: LegacyFrontMatter;
  headings: Heading[];
  pathname: string;
}
