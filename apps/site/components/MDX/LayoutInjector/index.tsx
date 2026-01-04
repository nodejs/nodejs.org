import { setClientContext } from '#site/client-context';
import WithLayout from '#site/components/withLayout';
import { MatterProvider } from '#site/providers/matterProvider';

import type { MarkdownContext } from '#site/types';
import type { FC, PropsWithChildren } from 'react';

type MarkdownLayoutInjectorProps = MarkdownContext & {
  params: unknown;
  // We don't care about this
  searchParams: unknown;
};

const MDXLayoutInjector: FC<
  PropsWithChildren<MarkdownLayoutInjectorProps>
  /* eslint-disable @typescript-eslint/no-unused-vars */
> = async ({ children, params, searchParams, ...props }) => {
  // Defines a shared Server Context for the Client-Side
  // That is shared for all pages under the dynamic router
  setClientContext(props);

  // The Matter Provider allows Client-Side injection of the data
  // to a shared React Client Provider even though the page is rendered
  // within a server-side context
  return (
    <MatterProvider {...props}>
      <WithLayout layout={props.frontmatter.layout} params={await params}>
        {children}
      </WithLayout>
    </MatterProvider>
  );
};

export default MDXLayoutInjector;
