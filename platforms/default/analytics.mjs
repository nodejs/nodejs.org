/**
 * Analytics for self-hosted deployments: there are none, so this renders
 * nothing. Only Vercel currently provides analytics.
 *
 * Deliberately not a `.tsx` file — keeping it JSX-free means this package
 * needs no React dependency to satisfy the `#platform/*` interface.
 *
 * @type {() => null}
 */
const PlatformAnalytics = () => null;

export default PlatformAnalytics;
