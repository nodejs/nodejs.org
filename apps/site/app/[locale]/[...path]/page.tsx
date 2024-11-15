import * as basePage from '@/app/[locale]/page';

// This is the default Viewport Metadata
// @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport#generateviewport-function
export const generateViewport = basePage.generateViewport;

// This generates each page's HTML Metadata
// @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const generateMetadata = basePage.generateMetadata;

// This provides all the possible paths that can be generated statically
// + provides all the paths that we support on the Node.js Website
export const generateStaticParams = basePage.generateStaticParams;

// Enforces that this route is used as static rendering
// Except whenever on the Development mode as we want instant-refresh when making changes
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'force-static';

// Ensures that this endpoint is invalidated and re-executed every X minutes
// so that when new deployments happen, the data is refreshed
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = 300;

export default basePage.default;
