import { cache } from 'react';

import type { ClientSharedServerContext } from '@/types';

// This allows us to have Server-Side Context's of the shared "contextual" data
// which includes the frontmatter, the current pathname from the dynamic segments
// and the current headings of the current markdown context
export const getClientContext = cache(() => {
  const serverSharedContext: ClientSharedServerContext = {
    frontmatter: {},
    pathname: '',
    headings: [],
    readingTime: { text: '', minutes: 0, time: 0, words: 0 },
    filename: '',
  };

  return serverSharedContext;
});

// This is used by the dynamic router to define on the request
// the current set of information we use (shared)
export const setClientContext = (data: ClientSharedServerContext) => {
  getClientContext().frontmatter = data.frontmatter;
  getClientContext().pathname = data.pathname;
  getClientContext().headings = data.headings;
  getClientContext().readingTime = data.readingTime;
  getClientContext().filename = data.filename;
};
