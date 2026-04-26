import { registerOTel } from '@vercel/otel';

export const register = () => registerOTel({ serviceName: 'nodejs-org' });
