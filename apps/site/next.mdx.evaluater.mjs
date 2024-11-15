'use strict';

import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { default as Sval } from 'sval';

/**
 * List of node types made by `mdast-util-mdx`, which have to be passed
 * through untouched from the mdast tree to the hast tree.
 *
 * @type {const} nodeTypes
 */
export const nodeTypes = [
  'mdxFlowExpression',
  'mdxJsxFlowElement',
  'mdxJsxTextElement',
  'mdxTextExpression',
  'mdxjsEsm',
];

// Defines the React Runtime Components
export const reactRuntime = { Fragment, jsx, jsxs };

/**
 * Creates a JavaScript Evaluater
 *
 * @param {import('mdx/types').MDXComponents} components
 */
export const createSval = components => {
  // Creates a JavaScript Evaluater
  const svalInterpreter = new Sval({ ecmaVer: 'latest', sandBox: true });

  // Import the components into the Sval Interpreter
  svalInterpreter.import(components);

  /**
   * Creates a JavaScript Evaluater
   *
   * @type {import('hast-util-to-jsx-runtime').CreateEvaluater}
   */
  return () => ({
    /**
     * Evaluates a JavaScript Expression
     *
     * @param {import('estree').Expression} expression The expression to evaluate
     * @returns {unknown}
     */
    evaluateExpression(expression) {
      /**
       * Sval only computes Nodes that are full scripts
       * hence we need to wrap the expression in an `ExpressionStatement`
       *
       * @type {import('estree').Program}
       */
      const program = {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'MemberExpression',
                object: { type: 'Identifier', name: 'exports' },
                property: {
                  type: 'Identifier',
                  name: '_evaluateExpressionValue',
                },
                computed: false,
                optional: false,
              },
              right: expression,
            },
          },
        ],
        sourceType: 'module',
      };

      svalInterpreter.run(program);

      const value = svalInterpreter.exports._evaluateExpressionValue;

      svalInterpreter.exports._evaluateExpressionValue = undefined;

      return value;
    },

    /**
     * Evaluates a JavaScript Program
     *
     * @param {import('estree').Program} program The program to evaluate
     * @returns {undefined}
     */
    evaluateProgram(program) {
      svalInterpreter.run(program);
    },
  });
};
