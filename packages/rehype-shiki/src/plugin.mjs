'use strict';

import classNames from 'classnames';
import { toString } from 'hast-util-to-string';
import { SKIP, visit } from 'unist-util-visit';

import createHighlighter from './index.mjs';

// This is what Remark will use as prefix within a <pre> className
// to attribute the current language of the <pre> element
const languagePrefix = 'language-';

// The regex to match metadata
const rMeta = /(\w+)(?:=(?:"([^"]+)"|(\S+)))?/g;

/**
 * Parses a fenced code block metadata string into a JavaScript object.
 * @param {string} meta - The metadata string from a Markdown code fence.
 * @returns {Record<string, string|boolean>} An object representing the metadata.
 */
function parseMeta(meta) {
  const obj = { __raw: meta };

  if (!meta) {
    return obj;
  }

  let match;

  while ((match = rMeta.exec(meta)) !== null) {
    obj[match[1]] = match[2] ?? match[3] ?? true;
  }

  return obj;
}

/**
 * @typedef {import('unist').Node} Node
 * @property {string} tagName
 * @property {Array<import('unist').Node>} children
 */

/**
 * Checks if the given node is a valid code element.
 *
 * @param {import('unist').Node} node - The node to be verified.
 *
 * @return {boolean} - True when it is a valid code element, false otherwise.
 */
function isCodeBlock(node) {
  return Boolean(
    node?.tagName === 'pre' && node?.children[0].tagName === 'code'
  );
}

/**
 * @param {import('./index.mjs').HighlighterOptions} options
 */
export default function rehypeShikiji(options) {
  let highlighter;

  return async function (tree) {
    highlighter ??= await createHighlighter(options);

    visit(tree, 'element', (_, index, parent) => {
      const languages = [];
      const displayNames = [];
      const codeTabsChildren = [];

      let defaultTab = '0';
      let currentIndex = index;

      while (isCodeBlock(parent?.children[currentIndex])) {
        const codeElement = parent?.children[currentIndex].children[0];
        const meta = parseMeta(codeElement.data?.meta);

        // We should get the language name from the class name
        if (codeElement.properties.className?.length) {
          const className = codeElement.properties.className.join(' ');
          const matches = className.match(/language-(?<language>.*)/);

          languages.push(matches?.groups.language ?? 'text');
        }

        // Map the display names of each variant for the CodeTab
        displayNames.push(meta.displayName?.replaceAll('|', '') ?? '');

        codeTabsChildren.push(parent?.children[currentIndex]);

        // If `active="true"` is provided in a CodeBox
        // then the default selected entry of the CodeTabs will be the desired entry
        if (meta.active === 'true') {
          defaultTab = String(codeTabsChildren.length - 1);
        }

        const nextNode = parent?.children[currentIndex + 1];

        // If the CodeBoxes are on the root tree the next Element will be
        // an empty text element so we should skip it
        currentIndex += nextNode && nextNode?.type === 'text' ? 2 : 1;
      }

      if (codeTabsChildren.length >= 2) {
        const codeTabElement = {
          type: 'element',
          tagName: 'CodeTabs',
          children: codeTabsChildren,
          properties: {
            languages: languages.join('|'),
            displayNames: displayNames.join('|'),
            defaultTab,
          },
        };

        // This removes all the original Code Elements and adds a new CodeTab Element
        // at the original start of the first Code Element
        parent.children.splice(index, currentIndex - index, codeTabElement);

        // Prevent visiting the code block children and for the next N Elements
        // since all of them belong to this CodeTabs Element
        return [SKIP];
      }
    });

    visit(tree, 'element', (node, index, parent) => {
      // We only want to process <pre>...</pre> elements
      if (!parent || index == null || node.tagName !== 'pre') {
        return;
      }

      // We want the contents of the <pre> element, hence we attempt to get the first child
      const preElement = node.children[0];

      // If thereÄs nothing inside the <pre> element... What are we doing here?
      if (!preElement || !preElement.properties) {
        return;
      }

      // Ensure that we're not visiting a <code> element but it's inner contents
      // (keep iterating further down until we reach where we want)
      if (preElement.type !== 'element' || preElement.tagName !== 'code') {
        return;
      }

      // Get the <pre> element class names
      const preClassNames = preElement.properties.className;

      // The current classnames should be an array and it should have a length
      if (typeof preClassNames !== 'object' || preClassNames.length === 0) {
        return;
      }

      // We want to retrieve the language class name from the class names
      const codeLanguage = preClassNames.find(
        c => typeof c === 'string' && c.startsWith(languagePrefix)
      );

      // If we didn't find any `language-` classname then we shouldn't highlight
      if (typeof codeLanguage !== 'string') {
        return;
      }

      // Get the metadata
      const meta = parseMeta(preElement.data?.meta);

      // Retrieve the whole <pre> contents as a parsed DOM string
      const preElementContents = toString(preElement);

      // Grabs the relevant alias/name of the language
      const languageId = codeLanguage.slice(languagePrefix.length);

      // Parses the <pre> contents and returns a HAST tree with the highlighted code
      const { children } = highlighter.highlightToHast(
        preElementContents,
        languageId,
        meta
      );

      // Adds the original language back to the <pre> element
      children[0].properties.class = classNames(
        children[0].properties.class,
        codeLanguage
      );

      // Adds a Copy Button to the CodeBox if requested as an additional parameter
      // And avoids setting the property (overriding) if undefined or invalid value
      if (
        meta.showCopyButton &&
        ['true', 'false'].includes(meta.showCopyButton)
      ) {
        children[0].properties.showCopyButton = meta.showCopyButton;
      }

      // Replaces the <pre> element with the updated one
      parent.children.splice(index, 1, ...children);
    });
  };
}
