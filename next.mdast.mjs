'use strict';

/// <reference types="remark-parse" />
/// <reference types="remark-stringify" />

/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('unified').Processor<Root>} Processor
 */

import * as autoLinkLiteral from 'mdast-util-gfm-autolink-literal';

// This must be a `function` export for `this` context;
export function remarkAutoLinkLiteral() {
  const self = /** @type {Processor} */ (this);
  const data = self.data();

  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
  const toMarkdownExtensions =
    data.toMarkdownExtensions || (data.toMarkdownExtensions = []);

  fromMarkdownExtensions.push(autoLinkLiteral.gfmAutolinkLiteralFromMarkdown());
  toMarkdownExtensions.push(autoLinkLiteral.gfmAutolinkLiteralToMarkdown());
}
