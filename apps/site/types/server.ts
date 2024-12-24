import type { Heading } from '@vcarl/remark-headings';
import type { ReadTimeResults } from 'reading-time';

import type { useDetectOS } from '@/hooks';
import type { LegacyFrontMatter } from '@/types/frontmatter';

export interface ClientSharedServerContext
  extends ReturnType<typeof useDetectOS> {
  frontmatter: LegacyFrontMatter;
  headings: Array<Heading>;
  pathname: string;
  filename: string;
  readingTime: ReadTimeResults;
}
