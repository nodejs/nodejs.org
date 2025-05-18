'use strict';

import classNames from 'classnames';
import type { Element } from 'hast';
import { toString } from 'hast-util-to-string';
import type { Node } from 'unist';
import { SKIP, visit } from 'unist-util-visit';

import { highlightToHast } from './highlighter';

// Constants
const LANGUAGE_PREFIX = 'language-';
const CODE_TAG = 'code';
const PRE_TAG = 'pre';

type Metadata = undefined | { meta: string };

/**
 * Extracts a parameter value from a meta string
 */
export function getMetaParameter(
  data: Metadata,
  key?: string
): string | undefined {
  if (!data?.meta || !key) return undefined;

  const match = data?.meta.match(new RegExp(`${key}="([^"]*)"`));
  const value = match?.[1];

  return value?.length ? value : undefined;
}

/**
 * Checks if a node is a code block (<pre><code>...</code></pre>)
 */
export function isCodeBlock(node?: Element): boolean {
  if (!node || node.tagName !== PRE_TAG) return false;

  const codeElement = node.children[0] as Element | undefined;
  return Boolean(codeElement?.tagName === CODE_TAG);
}

/**
 * Process code tabs (adjacent code blocks)
 */
export function processCodeTabs(tree: Node): void {
  visit(
    tree,
    'element',
    (node: Element, index: number | null, parent: Element) => {
      if (index === null || !parent) return;

      // Skip if the current element isn't a code block
      if (!isCodeBlock(node)) return;

      const languages: Array<string> = [];
      const displayNames: Array<string> = [];
      const codeTabsChildren: Array<Element> = [];

      let defaultTab = '0';
      let currentIndex = index;

      // Collect consecutive code blocks
      while (isCodeBlock(parent.children[currentIndex] as Element)) {
        const preElement = parent.children[currentIndex] as Element;
        const codeElement = preElement.children[0] as Element;

        // Extract meta information
        const displayName =
          getMetaParameter(
            codeElement.data as Metadata,
            'displayName'
          )?.replaceAll('|', '') || '';
        displayNames.push(displayName);

        // Extract language from class name
        const classNameList = codeElement.properties?.className as
          | Array<string>
          | undefined;
        const langClass = classNameList?.find(c =>
          c.startsWith(LANGUAGE_PREFIX)
        );
        languages.push(
          langClass ? langClass.slice(LANGUAGE_PREFIX.length) : 'text'
        );

        // Store the code block
        codeTabsChildren.push(preElement);

        // Check if this tab should be the default active one
        if (
          getMetaParameter(codeElement.data as Metadata, 'active') === 'true'
        ) {
          defaultTab = String(codeTabsChildren.length - 1);
        }

        // Move to next node
        const nextNode = parent.children[currentIndex + 1];
        currentIndex += nextNode?.type === 'text' ? 2 : 1;
      }

      // If we found multiple code blocks, group them into a CodeTabs component
      if (codeTabsChildren.length >= 2) {
        const codeTabElement: Element = {
          type: 'element',
          tagName: 'CodeTabs',
          children: codeTabsChildren,
          properties: {
            languages: languages.join('|'),
            displayNames: displayNames.join('|'),
            defaultTab,
          },
        };

        // Replace the original code blocks with our new CodeTabs element
        parent.children.splice(index, currentIndex - index, codeTabElement);

        // Skip processing the children - we've already handled them
        return [SKIP];
      }
    }
  );
}

/**
 * Apply syntax highlighting to code blocks
 */
export function processCodeHighlighting(tree: Node): void {
  visit(tree, 'element', (node: Element, index, parent: Element) => {
    if (!parent || index == null || node.tagName !== PRE_TAG) return;

    const codeElement = node.children[0] as Element;
    if (!codeElement?.properties || codeElement.tagName !== CODE_TAG) return;

    // Get language class
    const className = codeElement.properties.className as
      | Array<string>
      | undefined;
    if (!Array.isArray(className) || className.length === 0) return;

    const langClass = className.find(
      c => typeof c === 'string' && c.startsWith(LANGUAGE_PREFIX)
    );
    if (!langClass) return;

    // Get code content and language
    const code = toString(codeElement);
    const language = langClass.slice(LANGUAGE_PREFIX.length);

    // Generate highlighted HTML
    const { children } = highlightToHast(code, language);
    const highlightedCode = children[0] as Element;

    // Preserve language class
    highlightedCode.properties!.class = classNames(
      highlightedCode.properties!.class,
      langClass
    );

    // Add copy button if specified
    const showCopyButton = getMetaParameter(
      codeElement.data as Metadata,
      'showCopyButton'
    );
    if (showCopyButton === 'true' || showCopyButton === 'false') {
      highlightedCode.properties!.showCopyButton = showCopyButton;
    }

    // Replace the original pre element with the highlighted one
    parent.children.splice(index, 1, ...(children as Array<Element>));
  });
}

/**
 * Rehype plugin for code highlighting and code tabs
 */
export default function rehypeShikiji() {
  return function transformer(tree: Node): void {
    processCodeTabs(tree);
    processCodeHighlighting(tree);
  };
}
