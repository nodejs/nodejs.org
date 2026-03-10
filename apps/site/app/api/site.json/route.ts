import { NextResponse } from 'next/server';

import { siteConfig } from '#site/next.json.mjs';

export const GET = () =>
  NextResponse.json(siteConfig, {
    headers: {
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
    },
  });

export const dynamic = 'force-static';
