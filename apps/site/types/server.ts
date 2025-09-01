import type { Heading } from '@vcarl/remark-headings';
import type { ReadTimeResults } from 'reading-time';

import type { useDetectOS } from '#site/hooks';
import type { Frontmatter } from '#site/types/frontmatter';

export type ClientSharedServerContext = {
  frontmatter: Frontmatter;
  headings: Array<Heading>;
  pathname: string;
  filename: string;
  readingTime: ReadTimeResults;
} & ReturnType<typeof useDetectOS>;
