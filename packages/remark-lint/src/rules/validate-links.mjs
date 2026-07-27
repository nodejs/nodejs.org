import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import createNodeSlugger from '@node-core/doc-kit/src/generators/metadata/utils/slugger.mjs';
import { toString } from 'mdast-util-to-string';
import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';

const directoryCache = new Map();
const urlBase = new URL('https://nodejs.org');
const htmlTag = /<[a-z][^>]*>/giu;
const htmlIdentifier =
  /\s(?:id|name)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/iu;

const decode = value => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const getUrlParts = (value, basePath) => {
  try {
    const url = new URL(value, pathToFileURL(basePath));

    if (url.protocol !== 'file:' || url.host) {
      return;
    }

    return {
      hash: decode(url.hash.slice(1)).toLowerCase(),
      // Don't use the basePath as the base here, since `file:///repo/path/to/file` -> `/target`
      // will not prefix `/repo`.
      pathname: decode(new URL(value, urlBase).pathname),
      rootRelative: value.startsWith('/'),
      targetPath: fileURLToPath(url),
    };
  } catch {
    return;
  }
};

const readDirectory = directory => {
  let entries = directoryCache.get(directory);

  if (!entries) {
    entries = readdir(directory, { withFileTypes: true }).then(
      items => {
        const files = items
          .filter(item => item.isFile())
          .map(item => item.name);
        const result = new Map(files.map(name => [name, name]));

        for (const name of files) {
          const extension = path.extname(name);
          const stem = extension && name.slice(0, -extension.length);

          if (stem && !result.has(stem)) {
            result.set(stem, name);
          }
        }

        return result;
      },
      () => new Map()
    );

    directoryCache.set(directory, entries);
  }

  return entries;
};

const resolveFile = async target => {
  const directory = path.dirname(target);
  const file = (await readDirectory(directory)).get(path.basename(target));

  if (file) {
    return path.join(directory, file);
  }

  const index = (await readDirectory(target)).get('index');

  return index && path.join(target, index);
};

const getHeadings = tree => {
  const headings = new Set();
  const slugger = createNodeSlugger();
  const addIdentifier = identifier => {
    if (identifier) {
      headings.add(String(identifier).toLowerCase());
    }
  };

  visit(tree, node => {
    const properties = node.data?.hProperties;
    const identifier =
      properties?.id ||
      properties?.name ||
      node.data?.id ||
      node.attributes?.find(
        item =>
          (item.name === 'id' || item.name === 'name') &&
          typeof item.value === 'string'
      )?.value;

    if (identifier) {
      addIdentifier(identifier);
    } else if (node.type === 'heading') {
      headings.add(slugger.slug(toString(node)));
    }

    if (node.type === 'html') {
      for (const [tag] of node.value.matchAll(htmlTag)) {
        const match = htmlIdentifier.exec(tag);

        addIdentifier(match?.[1] || match?.[2] || match?.[3]);
      }
    }
  });

  return headings;
};

/**
 * @type {import('unified-lint-rule').Rule}
 */
const validateLinks = async (tree, file, options = {}) => {
  const basePaths = [options.basePaths || '.'].flat();
  const ignoredFiles = [options.ignoreFiles || []].flat();
  const ignoredLinks = [options.ignoreLinks || []].flat();
  const cwd = path.resolve(file.cwd || process.cwd());
  const currentPath = file.path && path.resolve(cwd, file.path);

  if (
    currentPath &&
    ignoredFiles.some(pattern =>
      path.matchesGlob(path.relative(cwd, currentPath), pattern)
    )
  ) {
    return;
  }

  const basePath = currentPath || path.join(cwd, 'index');
  const links = [];
  let headings;

  visit(tree, node => {
    if (
      (node.type === 'link' ||
        node.type === 'image' ||
        node.type === 'definition') &&
      node.url
    ) {
      const parts = getUrlParts(node.url, basePath);

      if (
        parts &&
        !ignoredLinks.some(pattern => path.matchesGlob(parts.pathname, pattern))
      ) {
        links.push([node, parts]);
      }
    }
  });

  for (const [node, parts] of links) {
    const candidates = parts.rootRelative
      ? basePaths.map(base => path.join(cwd, base, parts.pathname))
      : [parts.targetPath];

    let match;

    for (const candidate of candidates) {
      match =
        candidate === currentPath ? currentPath : await resolveFile(candidate);

      if (match) {
        break;
      }
    }

    if (!match) {
      file.message(`Cannot find file for link \`${node.url}\``, node);
    } else if (node.type !== 'image' && parts.hash && match === currentPath) {
      headings ??= getHeadings(tree);

      if (!headings.has(parts.hash)) {
        file.message(`Cannot find heading for \`#${parts.hash}\``, node);
      }
    }
  }
};

export default lintRule('node-core:validate-links', validateLinks);
