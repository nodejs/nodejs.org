'use strict';

import { htmlComponents, clientMdxComponents } from './next.mdx.use.client.mjs';
import { mdxComponents } from './next.mdx.use.mjs';

/**
 * Combine all MDX Components to be used
 *
 * @type {import('mdx/types').MDXComponents}
 */
export const MDX_COMPONENTS = {
  ...htmlComponents,
  ...clientMdxComponents,
  ...mdxComponents,
};
