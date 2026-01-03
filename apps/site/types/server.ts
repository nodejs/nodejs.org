import type { useDetectOS } from '#site/hooks';
import type { Frontmatter } from '#site/types/markdown';
import type { ReadTimeResults } from 'reading-time';

export type ServerContext = {
  frontmatter: Frontmatter;
  headings: Array<{ depth: number; value: string }>;
  pathname: string;
  filename: string;
  readingTime: ReadTimeResults;
};

export type ClientSharedServerContext = ServerContext &
  ReturnType<typeof useDetectOS>;
