import { DEPRECATION_HEADING_REGEX } from '@doc-kit/core/generators/metadata/constants.mjs';
import createNodeSlugger from '@doc-kit/core/generators/metadata/utils/slugger.mjs';
import { transformNodeToHeading } from '@doc-kit/core/generators/metadata/utils/transformers.mjs';
import { QUERIES, UNIST } from '@doc-kit/core/utils/queries/index.mjs';
import { transformNodesToString } from '@doc-kit/core/utils/unist.mjs';
import { parseDocument } from 'yaml';

/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Node} Node
 * @typedef {import('mdast').Parent} Parent
 * @typedef {import('vfile').VFile} VFile
 */

/**
 * @typedef Entry a top-level heading and everything up to the next heading
 *   of equal or lesser depth, mirroring doc-kit's `parseApiDoc`.
 * @property {import('mdast').Heading | null} heading
 *   The heading node, or `null` for the content preceding the first heading.
 * @property {number} depth
 * @property {number} index
 *   Root index of the heading
 * @property {number} start
 *   Root index of the first node after the heading.
 * @property {number} end
 *   Root index (exclusive) where the entry's own content stops.
 * @property {Entry | null} parent
 * @property {Array<Entry>} children
 * @property {Array<Node>} nodes
 *   The entry's own top-level nodes (excluding the heading and sub-entries).
 * @property {{ text: string, name: string, type?: string, slug: string }} data
 *   Heading classification, as computed by doc-kit.
 */

/**
 * @typedef Comment
 * @property {import('mdast').Html} node
 * @property {'yaml' | 'directive' | 'tag' | 'html'} kind
 * @property {string} inner
 *   The content between `<!--` and `-->`.
 * @property {Entry} entry
 * @property {number} rootIndex
 * @property {boolean} nested
 * @property {string} [key]
 * @property {string} [value]
 * @property {boolean | number} [padded]
 * @property {boolean} [symmetric]
 * @property {string} [yamlSource]
 * @property {unknown} [yaml]
 * @property {Array<Error>} [yamlErrors]
 */

const HTML_COMMENT = /^<!--([^]*?)-->\s*$/;
const YAML_OPENER = /^[ \t]*YAML(?![^\s-])/;
const DIRECTIVE = /^( ?)([A-Za-z_][\w-]*)=(.*?)( ?)$/;
const LOOSE_STABILITY = /^\s*stability\s*:/i;
const COMMENT_KINDS = new Set(['yaml', 'directive', 'tag']);

const contexts = new WeakMap();

// Whether a heading starts an entry (doc-kit ignores deeper headings).
const isEntryHeading = node => UNIST.isHeading(node);

/**
 * Builds the entries (heading sections) of a document.
 *
 * @param {Root} tree
 */
const buildEntries = tree => {
  const root = tree.children;
  const slugger = createNodeSlugger();

  /** @type {Entry} */
  const preamble = {
    heading: null,
    depth: 0,
    index: -1,
    start: 0,
    end: root.length,
    parent: null,
    children: [],
    nodes: [],
    data: { text: '', name: '', slug: '' },
  };

  const entries = [preamble];
  /** @type {Array<Entry>} */
  const stack = [preamble];
  /** @type {Array<Entry>} */
  const byRoot = new Array(root.length);

  let current = preamble;

  for (let index = 0; index < root.length; index++) {
    const node = root[index];

    if (isEntryHeading(node)) {
      // Close every entry that is not an ancestor of this heading
      while (stack.length > 1 && stack.at(-1).depth >= node.depth) {
        stack.pop().end = index;
      }

      // The content of the previous entry stops here as well
      current.end = Math.min(current.end, index);

      const data = transformNodeToHeading(node);
      const deprecation = DEPRECATION_HEADING_REGEX.exec(data.text);

      data.slug = deprecation ? deprecation[1] : slugger.slug(data.text);

      const parent = stack.at(-1);

      /** @type {Entry} */
      const entry = {
        heading: node,
        depth: node.depth,
        index,
        start: index + 1,
        end: root.length,
        parent,
        children: [],
        nodes: [],
        data,
      };

      parent.children.push(entry);
      entries.push(entry);
      stack.push(entry);
      current = entry;
    } else {
      current.nodes.push(node);
    }

    byRoot[index] = current;
  }

  while (stack.length > 1) {
    stack.pop().end = root.length;
  }

  return { entries, byRoot };
};

/**
 * Classifies an HTML node as a comment of some kind, parsing YAML blocks and
 * directives the way doc-kit does.
 *
 * @param {import('mdast').Html} node
 */
const classifyHtml = node => {
  const match = HTML_COMMENT.exec(node.value);

  if (!match) {
    return { kind: 'html', inner: '' };
  }

  const inner = match[1];
  const yaml = YAML_OPENER.exec(inner);

  if (yaml) {
    const yamlSource = inner.slice(yaml[0].length);
    const document = parseDocument(yamlSource, { version: '1.2' });

    return {
      kind: 'yaml',
      inner,
      // Number of spaces between `<!--` and `YAML`
      padded: /^ +/.exec(inner)?.[0].length ?? 0,
      yamlSource,
      yaml: document.errors.length ? undefined : document.toJS(),
      yamlErrors: document.errors,
    };
  }

  const directive = inner.includes('\n') ? null : DIRECTIVE.exec(inner);

  if (directive) {
    return {
      kind: 'directive',
      inner,
      key: directive[2],
      value: directive[3],
      padded: Boolean(directive[1] || directive[4]),
      symmetric: directive[1] === directive[4],
    };
  }

  return { kind: 'tag', inner };
};

/**
 * Whether a blockquote's first paragraph reads as a stability indicator.
 *
 * @param {import('mdast').Blockquote} node
 */
const classifyBlockquote = node => {
  const paragraph = node.children[0];

  if (paragraph?.type !== 'paragraph') {
    return null;
  }

  const text = transformNodesToString(paragraph.children);
  const match = QUERIES.stabilityIndex.exec(text);

  if (match) {
    return {
      valid: true,
      text,
      index: match[1],
      description: match[2].replace(/\n/g, ' ').trim(),
    };
  }

  if (LOOSE_STABILITY.test(text)) {
    return { valid: false, text };
  }

  return null;
};

/**
 * Computes the shared document index for a file. It is built once per tree
 * and reused by every rule.
 *
 * @param {Root} tree
 * @param {VFile} file
 */
export const getContext = (tree, file) => {
  let context = contexts.get(tree);

  if (context) {
    return context;
  }

  const { entries, byRoot } = buildEntries(tree);

  /** @type {Array<Comment>} */
  const comments = [];
  const stability = [];
  const lists = [];
  const typeAnnotations = [];
  const links = [];
  const definitions = [];
  const images = [];
  const codes = [];
  const headings = [];
  const paragraphs = [];
  /** @type {Map<Node, object>} */
  const meta = new Map();

  /**
   * @param {Parent | Node} node
   * @param {Parent | null} parent
   * @param {number} rootIndex
   * @param {number} depth
   */
  const walk = (node, parent, rootIndex, depth) => {
    const entry = byRoot[rootIndex] ?? entries[0];
    const info = { node, parent, entry, rootIndex, nested: depth > 1 };

    switch (node.type) {
      case 'html': {
        Object.assign(info, classifyHtml(node));
        comments.push(info);
        meta.set(node, info);
        break;
      }

      case 'blockquote': {
        const parsed = classifyBlockquote(node);

        if (parsed) {
          Object.assign(info, parsed);
          stability.push(info);
          meta.set(node, info);
        }

        break;
      }

      case 'list': {
        info.typed = UNIST.isStronglyTypedList(node);
        lists.push(info);
        meta.set(node, info);
        break;
      }

      case 'typeAnnotation': {
        typeAnnotations.push(info);
        break;
      }

      case 'link':
      case 'linkReference': {
        links.push(info);
        break;
      }

      case 'definition': {
        definitions.push(info);
        break;
      }

      case 'image':
      case 'imageReference': {
        images.push(info);
        break;
      }

      case 'code': {
        codes.push(info);
        break;
      }

      case 'heading': {
        headings.push(info);
        break;
      }

      case 'paragraph': {
        paragraphs.push(info);
        break;
      }

      default:
        break;
    }

    if ('children' in node) {
      for (const child of node.children) {
        walk(child, node, rootIndex, depth + 1);
      }
    }
  };

  tree.children.forEach((node, index) => walk(node, tree, index, 1));

  context = {
    tree,
    file,
    entries,
    comments,
    stability,
    lists,
    typeAnnotations,
    links,
    definitions,
    images,
    codes,
    headings,
    paragraphs,
    /**
     * The index info for a `html`, `blockquote` or `list` node.
     *
     * @param {Node} node
     */
    infoOf: node => meta.get(node),
    /**
     * The entry that a root-level node belongs to.
     *
     * @param {number} rootIndex
     */
    entryAt: rootIndex => byRoot[rootIndex] ?? entries[0],
    /**
     * The entry that owns a heading node.
     *
     * @param {Node} node
     */
    entryOf: node => entries.find(entry => entry.heading === node),
    /**
     * Comments of a kind, in document order.
     *
     * @param {Comment['kind']} kind
     */
    commentsOf: kind => comments.filter(comment => comment.kind === kind),
    /**
     * Whether a node is an HTML comment (YAML block, directive or tag).
     *
     * @param {Node} node
     */
    isComment: node => COMMENT_KINDS.has(meta.get(node)?.kind),
    /**
     * Whether a node is metadata rather than prose: a comment or a
     * stability indicator.
     *
     * @param {Node} node
     */
    isMetadata: node => {
      const info = meta.get(node);

      return Boolean(info && (COMMENT_KINDS.has(info.kind) || 'valid' in info));
    },
    /**
     * The first node of an entry, before `node`, that `allowed` rejects —
     * i.e. whatever stands between the heading and `node`.
     *
     * @param {Entry} entry
     * @param {Node} node
     * @param {(sibling: Node) => boolean} allowed
     */
    blockedBy: (entry, node, allowed) =>
      entry.nodes
        .slice(0, entry.nodes.indexOf(node))
        .find(sibling => !allowed(sibling)),
  };

  contexts.set(tree, context);

  return context;
};

/**
 * The typed-list starter of a list item (`Returns`, `Extends` or `Type`), as
 * doc-kit recognizes it: case-sensitive, colon optional.
 *
 * @param {import('mdast').ListItem} item
 */
export const getItemStarter = item => {
  const paragraph = item.children[0];

  if (paragraph?.type !== 'paragraph') {
    return null;
  }

  const first = paragraph.children[0];

  if (first?.type !== 'text') {
    return null;
  }

  const match = QUERIES.typedListStarters.exec(first.value);

  return match ? { word: match[1], node: first } : null;
};
