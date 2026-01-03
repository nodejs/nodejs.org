import type { useDetectOS } from '#site/hooks/client';
import type { Frontmatter } from '#site/types/frontmatter';
import type { Heading } from '@vcarl/remark-headings';
import type { ReadTimeResults } from 'reading-time';

export type ClientSharedServerContext = {
  frontmatter: Frontmatter;
  headings: Array<Heading>;
  pathname: string;
  filename: string;
  readingTime: ReadTimeResults;
} & ReturnType<typeof useDetectOS>;
