'use strict';

import classNames from 'classnames';
import { toString } from 'hast-util-to-string';
import { getHighlighterCore } from 'shikiji/core';
import { getWasmInlined } from 'shikiji/wasm';
import { visit } from 'unist-util-visit';

import { LANGUAGES, DEFAULT_THEME } from './shiki.config.mjs';

// This creates a memoized minimal Shikiji Syntax Highlighter
const memoizedShikiji = await getHighlighterCore({
  themes: [DEFAULT_THEME],
  langs: LANGUAGES,
  loadWasm: getWasmInlined,
});

// This is what Remark will use as prefix within a <pre> className
// to attribute the current language of the <pre> element
const languagePrefix = 'language-';

export default function rehypeShikiji() {
  return async function (tree) {
    visit(tree, 'element', (node, index, parent) => {
      // We only want to process <pre>...</pre> elements
      if (!parent || index == null || node.tagName !== 'pre') {
        return;
      }

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

      // Retrieve the whole <pre> contents as a parsed DOM string
      const preElementContents = toString(preElement);

      // Grabs the relevant alias/name of the language
      const languageId = codeLanguage.slice(languagePrefix.length);

      // Parses the <pre> contents and returns a HAST tree with the highlighted code
      const { children = [{}] } = memoizedShikiji.codeToHast(
        preElementContents,
        { theme: DEFAULT_THEME, lang: languageId }
      );

      // Adds the original language back to the <pre> element
      children[0].properties.class = classNames(
        children[0].properties.class,
        codeLanguage
      );

      // Replaces the <pre> element with the updated one
      parent.children.splice(index, 1, ...children);
    });
  };
}
