import type { useDetectOS } from '#site/hooks';
import type { MarkdownContext } from '#site/types/markdown';

export type ClientSharedServerContext = MarkdownContext &
  ReturnType<typeof useDetectOS>;
