import { createPreset } from './preset.mjs';
import base from './presets/base.mjs';

export { RULES } from './rules/index.mjs';

/**
 * The base preset
 */
export default createPreset(base, '@node-core/remark-lint');
