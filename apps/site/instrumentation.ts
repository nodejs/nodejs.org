export async function register() {
  if (process.env.NEXT_PUBLIC_DEPLOY_TARGET === 'vercel') {
    const { registerOTel } = await import('@vercel/otel');
    registerOTel({ serviceName: 'nodejs-org' });
  }
}
