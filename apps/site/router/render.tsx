import { setClientContext } from '#site/client-context';
import WithLayout from '#site/components/withLayout';
import { MatterProvider } from '#site/providers/matterProvider';

import type { MarkdownFile } from '../types';
import type { FC } from 'react';

export const renderPage: FC<MarkdownFile> = ({ content, ...props }) => {
  // Defines a shared Server Context for the Client-Side
  // That is shared for all pages under the dynamic router
  setClientContext(props);

  // The Matter Provider allows Client-Side injection of the data
  // to a shared React Client Provider even though the page is rendered
  // within a server-side context
  return (
    <MatterProvider {...props}>
      <WithLayout layout={props.frontmatter.layout!}>{content}</WithLayout>
    </MatterProvider>
  );
};
