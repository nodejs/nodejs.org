import type { useDetectOS } from '#site/hooks/client';
import type { MarkdownContext } from '#site/types/markdown';

export type ClientSharedServerContext = MarkdownContext &
  ReturnType<typeof useDetectOS>;
