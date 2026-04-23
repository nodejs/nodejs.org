import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const VercelBodyEnd = () => (
  <>
    <Analytics />
    <SpeedInsights />
  </>
);

export default VercelBodyEnd;
