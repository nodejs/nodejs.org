export async function register() {
  if (!('Cloudflare' in globalThis)) {
    // Note: we don't need to set up the Vercel OTEL if the application is running on Cloudflare
    const { registerOTel } = await import('@vercel/otel');
    registerOTel({ serviceName: 'nodejs-org' });
  }
}
