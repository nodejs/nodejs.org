import { readFile } from 'node:fs/promises';

import { DEPRECATION_HEADING_REGEX } from '@doc-kit/core/generators/metadata/constants.mjs';
import createNodeSlugger from '@doc-kit/core/generators/metadata/utils/slugger.mjs';
import { transformNodesToString } from '@doc-kit/core/utils/unist.mjs';
import GitHubSlugger from 'github-slugger';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

const HTML_TAG = /<[a-z][^>]*>/giu;
const HTML_IDENTIFIER =
  /\s(?:id|name)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/iu;

// Container prefixes a heading or fence line may carry
const BLOCKQUOTE_PREFIX = /^(?: {0,3}> ?)+/;
const FENCE = /^ {0,3}(`{3,}|~{3,})/;
const ATX_HEADING = /^ {0,3}#{1,6}(?:[ \t]|$)/;

/** @type {Map<string, Promise<Set<string>>>} */
const cache = new Map();

const parser = unified().use(remarkParse).freeze();

/**
 * @typedef {'doc-kit' | 'github'} SluggerFlavor
 */

/**
 * The plain text of phrasing content, as GitHub renders it before slugging
 * (no emphasis or code markers).
 *
 * @param {Array<import('mdast').PhrasingContent>} nodes
 */
const toText = nodes =>
  nodes
    .map(node =>
      'children' in node ? toText(node.children) : (node.value ?? '')
    )
    .join('');

/**
 * Creates a slugger for one flavor.
 *
 * @param {SluggerFlavor} flavor
 * @returns {(children: Array<import('mdast').PhrasingContent>) => string}
 */
const createFlavor = flavor => {
  if (flavor === 'github') {
    const instance = new GitHubSlugger();

    return children => instance.slug(toText(children));
  }

  const instance = createNodeSlugger();

  // doc-kit slugs the heading's source form, and anchors deprecation
  // headings by their code (e.g. `DEP0001`)
  return children => {
    const text = transformNodesToString(children);

    return DEPRECATION_HEADING_REGEX.exec(text)?.[1] ?? instance.slug(text);
  };
};

/**
 * Creates a slugger producing every anchor a heading has under the requested
 * flavor(s).
 *
 * @param {SluggerFlavor | Array<SluggerFlavor>} slugger
 * @returns {(children: Array<import('mdast').PhrasingContent>) => Array<string>}
 */
const createSlugger = slugger => {
  const flavors = [slugger].flat().map(createFlavor);

  return children => flavors.map(slug => slug(children));
};

/**
 * The explicit `id`/`name` attributes in a piece of HTML.
 *
 * @param {string} html
 */
const htmlIdentifiers = function* (html) {
  for (const [tag] of html.matchAll(HTML_TAG)) {
    const match = HTML_IDENTIFIER.exec(tag);
    const id = match?.[1] || match?.[2] || match?.[3];

    if (id) {
      yield id;
    }
  }
};

/**
 * Collects every anchor a parsed document exposes: heading slugs (in
 * document order, so duplicates get the same suffixes doc-kit assigns) and
 * explicit `id`/`name` attributes.
 *
 * @param {import('mdast').Root} tree
 * @param {'doc-kit' | 'github'} slugger
 * @returns {Set<string>}
 */
export const collectAnchors = (tree, slugger) => {
  const anchors = new Set();
  const slug = createSlugger(slugger);

  const walk = node => {
    const properties = node.data?.hProperties;
    const identifier =
      properties?.id ||
      properties?.name ||
      node.data?.id ||
      node.attributes?.find(
        attribute =>
          (attribute.name === 'id' || attribute.name === 'name') &&
          typeof attribute.value === 'string'
      )?.value;

    if (identifier) {
      anchors.add(String(identifier));
    } else if (node.type === 'heading') {
      for (const anchor of slug(node.children)) {
        anchors.add(anchor);
      }
    }

    if (node.type === 'html') {
      for (const id of htmlIdentifiers(node.value)) {
        anchors.add(id);
      }
    }

    if (node.children) {
      for (const child of node.children) {
        walk(child);
      }
    }
  };

  walk(tree);

  return anchors;
};

/**
 * Collects the anchors of a document from its source without parsing the
 * whole file: ATX heading lines (outside fenced code) are found by scanning
 * and parsed individually, which is exact and far cheaper.
 *
 * @param {string} source
 * @param {'doc-kit' | 'github'} slugger
 * @returns {Set<string>}
 */
export const collectAnchorsFromSource = (source, slugger) => {
  const anchors = new Set();
  const slug = createSlugger(slugger);
  let fence;

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.replace(BLOCKQUOTE_PREFIX, '');
    const fenceMatch = FENCE.exec(line);

    if (fence) {
      if (
        fenceMatch &&
        fenceMatch[1][0] === fence[0] &&
        fenceMatch[1].length >= fence.length &&
        !line.slice(fenceMatch[0].length).trim()
      ) {
        fence = undefined;
      }

      continue;
    }

    if (fenceMatch) {
      fence = fenceMatch[1];
      continue;
    }

    if (ATX_HEADING.test(line)) {
      const [heading] = parser.parse(line).children;

      if (heading?.type === 'heading') {
        for (const anchor of slug(heading.children)) {
          anchors.add(anchor);
        }
      }
    }

    if (line.includes('<')) {
      for (const id of htmlIdentifiers(line)) {
        anchors.add(id);
      }
    }
  }

  return anchors;
};

/**
 * The anchors of another document on disk, computed once per process.
 *
 * @param {string} path
 * @param {'doc-kit' | 'github'} slugger
 */
export const loadAnchors = (path, slugger) => {
  const key = `${slugger}\0${path}`;

  if (!cache.has(key)) {
    cache.set(
      key,
      readFile(path, 'utf8').then(
        content => collectAnchorsFromSource(content, slugger),
        () => new Set()
      )
    );
  }

  return cache.get(key);
};
