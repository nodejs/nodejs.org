'use strict';

import Sval from 'sval';

export const createEvaluator = (
  dependencies: Record<string, unknown> = {},
  mode: 'module' | 'script' = 'module'
) => {
  const svalInterpreter = new Sval({
    ecmaVer: 'latest',
    sandBox: true,
    sourceType: mode,
  });

  svalInterpreter.import(dependencies);

  return svalInterpreter;
};
