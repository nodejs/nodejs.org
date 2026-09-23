import { UNIST } from '@doc-kit/core/utils/queries/index.mjs';

/**
 * The first paragraph of a list item, if any.
 *
 * @param {import('mdast').ListItem} item
 */
export const getItemParagraph = item =>
  item.children[0]?.type === 'paragraph' ? item.children[0] : undefined;

/**
 * The nested list documenting an object parameter's properties, as doc-kit
 * finds it.
 *
 * @param {import('mdast').ListItem} item
 */
export const getItemSubList = item =>
  item.children.find(UNIST.isLooselyTypedList);

/**
 * Whether a paragraph's phrasing content contains a type annotation.
 *
 * @param {import('mdast').Paragraph | undefined} paragraph
 */
export const hasTypeAnnotation = paragraph =>
  Boolean(paragraph?.children.some(node => node.type === 'typeAnnotation'));
