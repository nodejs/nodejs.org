import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import type { FC } from 'react';

const VercelAnalytics: FC = () => (
  <>
    <Analytics />
    <SpeedInsights />
  </>
);

export default VercelAnalytics;
