import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default () => (
  <>
    <Analytics />
    <SpeedInsights />
  </>
);
