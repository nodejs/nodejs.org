import { VALID_JAVASCRIPT_PROPERTY } from '@doc-kit/core/utils/queries/constants.mjs';
import { UNIST } from '@doc-kit/core/utils/queries/index.mjs';

import { getItemStarter } from '../context.mjs';
import { defineRule } from '../rule.mjs';
import {
  getItemParagraph,
  getItemSubList,
  hasTypeAnnotation,
} from '../utils/typed-list.mjs';

// A computed property name, such as `[Symbol.asyncDispose]`
const COMPUTED_NAME = /^\[[\w$.]+\]$/;

/**
 * Whether the text between a name and its type is a single space or a line
 * break, both of which doc-kit reads through.
 *
 * @param {import('mdast').PhrasingContent | undefined} node
 */
const isSeparator = node =>
  node?.type === 'text' && (node.value === ' ' || /^\n\s*$/.test(node.value));

/**
 * Whether an item is unambiguously typed: `{Type}` first, a `Returns:`-style
 * prefix, or `name` followed by a `{Type}` annotation.
 *
 * @param {import('mdast').ListItem} item
 */
const isStronglyTypedItem = item => {
  const [first, second, third] = getItemParagraph(item)?.children ?? [];

  return Boolean(
    first &&
    (first.type === 'typeAnnotation' ||
      getItemStarter(item) ||
      (first.type === 'inlineCode' &&
        second?.type === 'text' &&
        !second.value.trim() &&
        third?.type === 'typeAnnotation'))
  );
};

/**
 * Whether a list that doc-kit does not treat as typed looks like it was
 * meant to be one: its first item is a `name` with a misplaced annotation,
 * or most of its items are typed while the first is not.
 *
 * @param {import('mdast').List} list
 */
const looksTyped = list => {
  const [first] = list.children;
  const children = getItemParagraph(first)?.children ?? [];

  if (
    children[0]?.type === 'inlineCode' &&
    children.slice(1, 4).some(node => node.type === 'typeAnnotation')
  ) {
    return true;
  }

  const typed = list.children.filter(isStronglyTypedItem).length;

  return typed > 0 && typed * 2 >= list.children.length;
};

export default defineRule({
  name: 'typed-list-item',
  description: 'Typed list items follow the `name` {Type} description form',
  syntax: true,
  run(context, _, file) {
    const checked = new Set();

    /**
     * @param {import('mdast').List} list
     */
    const checkList = list => {
      if (checked.has(list)) {
        return;
      }

      checked.add(list);

      for (const item of list.children) {
        checkItem(item);
      }
    };

    /**
     * @param {import('mdast').ListItem} item
     */
    const checkItem = item => {
      const paragraph = getItemParagraph(item);
      const subList = getItemSubList(item);

      if (subList) {
        checkList(subList);
      }

      if (!paragraph) {
        file.message(
          'Typed list items start with a `name` code span, a `{Type}` annotation, or `Returns:`/`Extends:`/`Type:`',
          item
        );
        return;
      }

      const [first, second, third] = paragraph.children;
      const computed =
        first?.type === 'inlineCode' && COMPUTED_NAME.test(first.value);

      if (!UNIST.isTypedListItem(item) && !computed) {
        const hint =
          first?.type === 'inlineCode'
            ? `; \`${first.value}\` is not a valid parameter name`
            : '';

        file.message(
          `Typed list items start with a \`name\` code span, a \`{Type}\` annotation, or \`Returns:\`/\`Extends:\`/\`Type:\`${hint}`,
          item
        );
        return;
      }

      if (first.type !== 'inlineCode') {
        return;
      }

      if (
        !computed &&
        !VALID_JAVASCRIPT_PROPERTY.test(first.value.trimStart())
      ) {
        file.message(
          `Parameter name \`${first.value}\` is not a valid identifier`,
          first
        );
      }

      if (
        hasTypeAnnotation(paragraph) &&
        !(isSeparator(second) && third?.type === 'typeAnnotation')
      ) {
        file.message(
          `Put the \`{Type}\` annotation right after the name, separated by one space: \`${first.value}\` {Type}`,
          item
        );
      }
    };

    for (const { node, typed, nested } of context.lists) {
      if (typed) {
        checkList(node);
      } else if (!nested && !checked.has(node) && looksTyped(node)) {
        file.message(
          'This list looks like a typed list, but its first item is not typed; start it with `name` {Type}, {Type}, or Returns:/Extends:/Type:',
          node.children[0]
        );
      }
    }
  },
});
