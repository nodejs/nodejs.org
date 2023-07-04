import type { Heading } from '@vcarl/remark-headings';
import type { LegacyFrontMatter } from './frontmatter';

export interface DynamicStaticProps {
  content?: string;
  frontmatter?: LegacyFrontMatter;
  headings?: Heading[];
}
