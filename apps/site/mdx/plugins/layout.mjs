import { relative, sep } from 'node:path';
import { join as posixJoin } from 'node:path/posix';

import { valueToEstree } from 'estree-util-value-to-estree';

import { APP_ROOT } from '#site/util/router.mjs';

const createAttribute = (name, value) => ({
  type: 'JSXAttribute',
  name: {
    type: 'JSXIdentifier',
    name,
  },
  value: {
    type: 'JSXExpressionContainer',
    expression: valueToEstree(value),
  },
});

const getAdditionalAttributes = ({ history: [fullPath], data }) => {
  const rel = relative(APP_ROOT, fullPath).replaceAll(sep, '/');

  // Filename is the locale-less filepath
  const filename = rel.substring(rel.indexOf('/'));

  // Derive a URL-like pathnam
  let pathname = posixJoin(filename, '..');

  return [
    createAttribute('filename', filename),
    createAttribute('pathname', pathname),
    createAttribute('headings', data.headings),
  ];
};

/**
 * Workaround for https://github.com/vercel/next.js/discussions/87990
 */
export default () => (tree, vfile) => {
  tree.children.unshift({
    type: 'mdxjsEsm',
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ArrowFunctionExpression',
              params: [
                {
                  type: 'Identifier',
                  name: 'props',
                },
              ],
              body: {
                type: 'JSXElement',
                openingElement: {
                  type: 'JSXOpeningElement',
                  attributes: [
                    // These plugins already export their content on the MDX file directly,
                    ...['frontmatter', 'readingTime'].map(name => ({
                      type: 'JSXAttribute',
                      name: {
                        type: 'JSXIdentifier',
                        name,
                      },
                      value: {
                        type: 'JSXExpressionContainer',
                        expression: {
                          type: 'JSXIdentifier',
                          name,
                        },
                      },
                    })),
                    ...getAdditionalAttributes(vfile),
                    // The children
                    {
                      type: 'JSXSpreadAttribute',
                      argument: {
                        type: 'Identifier',
                        name: 'props',
                      },
                    },
                  ],
                  name: {
                    type: 'JSXIdentifier',
                    name: 'MDXLayoutInjector',
                  },
                  selfClosing: true,
                },
                children: [],
              },
            },
          },
        ],
      },
    },
  });
};
