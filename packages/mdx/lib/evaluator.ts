'use strict';

import Sval from 'sval';

/**
 * Creates a JavaScript Evaluator
 *
 * @param dependencies All sort of dependencies to be passed to the JavaScript context
 * @param mode The mode of the JavaScript execution
 *
 * @returns Returns an Sandboxed instance of a JavaScript interpreter
 */
export default function createSval(
  dependencies: Record<string, unknown> = {},
  mode: 'module' | 'script' = 'module'
): Sval {
  const svalInterpreter = new Sval({
    ecmaVer: 'latest',
    sandBox: true,
    sourceType: mode,
  });

  svalInterpreter.import(dependencies);

  return svalInterpreter;
}
