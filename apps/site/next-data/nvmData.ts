import {
  ENABLE_STATIC_EXPORT,
  IS_DEVELOPMENT,
  NEXT_DATA_URL,
  VERCEL_ENV,
} from '@/next.constants.mjs';

export default async function getNvmData(): Promise<`v${string}`> {
  if (ENABLE_STATIC_EXPORT || (!IS_DEVELOPMENT && !VERCEL_ENV)) {
    const { default: provideNvmData } = await import(
      '@/next-data/providers/nvmData'
    );
    provideNvmData();
  }

  return fetch(`${NEXT_DATA_URL}nvm-data`).then(r => r.json());
}
