import { createPreset } from './preset.mjs';
import api from './presets/api.mjs';

export { RULES } from './rules/index.mjs';

/**
 * The API documentation preset
 */
export default createPreset(api, '@node-core/remark-lint/api');
