import { defineRule } from '../rule.mjs';
import {
  SIGNATURE_TYPES,
  getSignature,
  checkParameters,
} from '../utils/signature.mjs';

export default defineRule({
  name: 'signature-syntax',
  description:
    'Method and constructor signatures use bare parameter names (or literal arguments), `[, optional]` brackets and no defaults or types',
  run(context, _, file) {
    for (const entry of context.entries) {
      if (!SIGNATURE_TYPES.has(entry.data.type)) {
        continue;
      }

      const signature = getSignature(entry);

      if (signature?.params === undefined) {
        continue;
      }

      for (const problem of checkParameters(signature.params)) {
        file.message(problem, signature.code);
      }
    }
  },
});
