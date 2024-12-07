import { cache } from 'react';

import generateNvmData from '@/next-data/generators/nvmData.mjs';

const nvmData = await generateNvmData();

export default cache(() => nvmData);
