import { PARAM_EXPRESSION } from '@doc-kit/core/utils/signature/constants.mjs';

// Entry types whose heading carries a call signature (spec §5)
export const SIGNATURE_TYPES = new Set(['method', 'ctor', 'classMethod']);

const PARAMETER_NAME = /^(\.\.\.)?[A-Za-z_$][\w$]*$/;

// A literal argument in a heading documenting one specific call, such as
// `readable.read(0)` or `readable.push('')`
const LITERAL_ARGUMENT = /^(?:-?\d+(?:\.\d+)?|'[^']*'|"[^"]*")$/;

/**
 * The code span holding an entry's signature, and its parameter list text
 * as doc-kit extracts it.
 *
 * @param {import('../context.mjs').Entry} entry
 */
export const getSignature = entry => {
  const code = entry.heading?.children.find(node => node.type === 'inlineCode');

  if (!code) {
    return undefined;
  }

  return { code, params: PARAM_EXPRESSION.exec(code.value)?.[1] };
};

/**
 * Checks a signature's parameter list against §5.
 *
 * @param {string} params
 * @returns {Array<string>} The problems found
 */
export const checkParameters = params => {
  const problems = [];

  if (params.includes('=')) {
    problems.push(
      'Default values must not appear in the signature; document them with `**Default:**` in the typed list'
    );
  }

  if (/[{}]/.test(params)) {
    problems.push(
      'Type annotations must not appear in the signature; document them in the typed list'
    );
  }

  let depth = 0;

  for (let index = 0; index < params.length; index++) {
    const character = params[index];

    if (character === '[') {
      depth++;

      const previous = params[index - 1];
      const next = params[index + 1];

      if (index !== 0 && previous !== '[' && next !== ',') {
        problems.push('Optional parameters are written `[, name]`');
      }
    } else if (character === ']') {
      depth--;

      const next = params[index + 1];
      // A leading optional parameter closes as `[min, ]max`
      const leading = params.slice(index - 2, index) === ', ';

      if (depth < 0) {
        problems.push('Unbalanced optional-parameter brackets');
        break;
      }

      if (next !== undefined && !'[],'.includes(next) && !leading) {
        problems.push('Optional parameters are written `[, name]`');
      }
    }
  }

  if (depth > 0) {
    problems.push('Unbalanced optional-parameter brackets');
  }

  if (/,(?! )/.test(params) || / ,/.test(params)) {
    problems.push('Separate parameters with `, `');
  }

  if (/^\s|\s$/.test(params)) {
    problems.push('Parameters must not be padded with whitespace');
  }

  for (const token of params.split(',')) {
    const name = token.replace(/[[\]\s]/g, '');

    if (!name) {
      problems.push('Empty parameter in the signature');
    } else if (!PARAMETER_NAME.test(name) && !LITERAL_ARGUMENT.test(name)) {
      problems.push(`Invalid parameter \`${name}\``);
    }
  }

  return [...new Set(problems)];
};
