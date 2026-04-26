import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const VercelAnalytics = () => (
  <>
    <Analytics />
    <SpeedInsights />
  </>
);

export default VercelAnalytics;
