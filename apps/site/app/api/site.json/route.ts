import { NextResponse } from 'next/server';

import { siteConfig } from '#site/next.json.mjs';

export const GET = () => NextResponse.json(siteConfig);

export const dynamic = 'force-static';
