'use strict';

import classNames from 'classnames';
import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';

import { highlightToHast } from './index.mjs';

// This is what Remark will use as prefix within a <pre> className
// to attribute the current language of the <pre> element
const languagePrefix = 'language-';

/**
 * Retrieve the value for the given meta key.
 *
 * @example - Returns "CommonJS"
 * getMetaParameter('displayName="CommonJS"', 'displayName');
 *
 * @param {any} meta - The meta parameter.
 * @param {string} key - The key to retrieve the value.
 *
 * @return {string | undefined} - The value related to the given key.
 */
function getMetaParameter(meta, key) {
  if (typeof meta !== 'string') {
    return;
  }

  const matches = meta.match(new RegExp(`${key}="(?<parameter>[^"]*)"`));
  const parameter = matches?.groups.parameter;

  return parameter !== undefined && parameter.length > 0
    ? parameter
    : undefined;
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

function getLanguage(codeBlockNode) {
  if (codeBlockNode?.children[0]?.properties?.className) {
    return codeBlockNode.children[0].properties.className
      ?.find(cn => cn.startsWith(languagePrefix))
      ?.substring(languagePrefix.length);
  }
  return undefined;
}

export default function rehypeShikiji() {
  return tree => {
    if (!tree || !tree.children) {
      return tree;
    }

    // First pass: Group adjacent code blocks into <CodeTabs>
    const newChildren = [];
    let i = 0;
    while (i < tree.children.length) {
      const child = tree.children[i];
      let grouped = false;

      if (isCodeBlock(child) && i + 1 < tree.children.length) {
        const nextChild = tree.children[i + 1];
        if (isCodeBlock(nextChild)) {
          const lang1 = getLanguage(child);
          const lang2 = getLanguage(nextChild);

          let canGroup = false;
          if (
            (lang1 === 'cjs' && lang2 === 'esm') ||
            (lang1 === 'esm' && lang2 === 'cjs')
          ) {
            canGroup = true;
            // If a third block exists and breaks the CJS/ESM sequence, do not group the first two.
            if (i + 2 < tree.children.length) {
              const thirdChild = tree.children[i + 2];
              if (isCodeBlock(thirdChild)) {
                const lang3 = getLanguage(thirdChild);
                if (
                  !(
                    (lang2 === 'cjs' && lang3 === 'esm') ||
                    (lang2 === 'esm' && lang3 === 'cjs')
                  )
                ) {
                  canGroup = false;
                }
              } else {
                // Third child is not a code block, so the CJS/ESM pair is effectively isolated or at the end.
                // Allow grouping.
              }
            }
          }

          if (canGroup) {
            const codeBlocksToGroup = [child, nextChild];
            const displayNamesArray = codeBlocksToGroup.map(codeElement =>
              getMetaParameter(
                codeElement.children[0].data?.meta,
                'displayName'
              )
            );
            const actualLanguagesArray = [
              lang1 || 'unknown',
              lang2 || 'unknown',
            ];
            const finalDisplayNames = displayNamesArray
              .map((dn, idx) => dn || actualLanguagesArray[idx].toUpperCase())
              .join('|');

            const codeTabElement = {
              type: 'element',
              tagName: 'CodeTabs',
              properties: {
                displayNames: finalDisplayNames,
                languages: actualLanguagesArray.join('|'),
              },
              children: codeBlocksToGroup.map(block =>
                JSON.parse(JSON.stringify(block))
              ),
            };
            newChildren.push(codeTabElement);
            i += 2;
            grouped = true;
          }
        }
      }

      if (!grouped) {
        newChildren.push(child);
        i++;
      }
    }
    tree.children = newChildren;

    // Second pass: Process individual <pre> blocks for syntax highlighting
    // This will also process <pre> blocks inside the children of <CodeTabs>
    visit(tree, 'element', (node, index, parent) => {
      if (!parent || typeof index !== 'number' || node.tagName !== 'pre') {
        return;
      }

      const preElement = node.children[0];
      if (
        !preElement ||
        preElement.type !== 'element' ||
        preElement.tagName !== 'code' ||
        !preElement.properties
      ) {
        return;
      }

      const lang = preElement.properties.className
        ?.find(cn => cn.startsWith(languagePrefix))
        ?.substring(languagePrefix.length);

      const codeString = toString(preElement);
      // meta is on the <code> element (preElement)
      const displayName = getMetaParameter(
        preElement.data?.meta,
        'displayName'
      );

      const hast = highlightToHast(codeString, lang, displayName);

      // Replace the <pre> node's children with the HAST from Shiki
      node.children = hast.children;
      // Merge properties from Shiki's <pre> (like style) into our <pre>
      if (hast.properties) {
        node.properties = { ...node.properties, ...hast.properties };
      }
      // Add the language class if not already there
      if (
        lang &&
        !node.properties.className?.includes(`${languagePrefix}${lang}`)
      ) {
        node.properties.className = classNames(
          node.properties.className,
          `${languagePrefix}${lang}`
        );
      }
    });

    return tree;
  };
}
