/**
 * Per-platform "body end" slot. Deployment targets can inject DOM at the
 * end of the document body (analytics, tracking scripts, etc.) without
 * adding platform-specific imports to the core layout.
 *
 * `NEXT_PUBLIC_DEPLOY_TARGET` is inlined by Next.js at build time, so on
 * non-matching platforms the dynamic import is unreachable and tree-shaken
 * out of the bundle — the Vercel modules never ship to Cloudflare builds.
 */
export default async function BodyEnd() {
  if (process.env.NEXT_PUBLIC_DEPLOY_TARGET === 'vercel') {
    const { default: VercelBodyEnd } = await import('./body-end.vercel');
    return <VercelBodyEnd />;
  }

  return null;
}
