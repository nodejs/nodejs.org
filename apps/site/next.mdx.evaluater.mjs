'use strict';

import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import Sval from 'sval';

// Defines the React Runtime Components
const reactRuntime = { Fragment, jsx, jsxs };

/**
 * Creates a JavaScript Evaluater
 *
 * @param {import('mdx/types').MDXComponents} components
 * @returns {Sval}
 */
export const createSval = components => {
  const svalInterpreter = new Sval({
    ecmaVer: 'latest',
    sandBox: true,
    sourceType: 'module',
  });

  svalInterpreter.import(components);
  svalInterpreter.import('react/jsx-runtime', reactRuntime);

  return svalInterpreter;
};
