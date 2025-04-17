import { register } from 'node:module';

import '../../../tests/setup.mjs';

register('./loader.mjs', import.meta.url);
