import { ImageResponse } from 'next/og';

import HexagonGrid from '@/components/Icons/HexagonGrid';
import JsIconWhite from '@/components/Icons/Logos/JsIconWhite';
import {
  ENABLE_STATIC_EXPORT,
  VERCEL_ENV,
  VERCEL_REVALIDATE,
} from '@/next.constants.mjs';
import { defaultLocale } from '@/next.locales.mjs';
import tailwindConfig from '@/tailwind.config';
import { hexToRGBA } from '@/util/hexToRGBA';

// This is the default type of blog post type that we use for OG
const defaultTypeParam = 'announcement';

// This is the Route Handler for the `GET` method which handles the request
// for generating OpenGrapgh images for Blog Posts and Pages
// @see https://nextjs.org/docs/app/building-your-application/routing/router-handlers
export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  // ?title=<title>
  const hasTitle = searchParams.has('title');
  const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : undefined;

  // ?type=<type> - if undefined default to announcement
  const typeParam = searchParams.get('type') ?? defaultTypeParam;

  const typeAttributes: { [key: string]: string } = {
    announcement: tailwindConfig.theme.colors.green['700'],
    release: tailwindConfig.theme.colors.info['600'],
    vulnerability: tailwindConfig.theme.colors.warning['600'],
  };

  // use the mapped value, or if not found use announcement
  const type = typeAttributes[typeParam] ?? typeAttributes[defaultTypeParam];

  const gridBackground = `radial-gradient(circle, ${hexToRGBA(type)}, transparent)`;

  return new ImageResponse(
    (
      <div tw="relative flex items-center justify-center bg-black w-[1200px] h-[600px]">
        <HexagonGrid style={{ background: gridBackground }} />

        <div tw="absolute mx-auto flex max-w-xl flex-col text-center text-3xl font-semibold text-white">
          <JsIconWhite width={71} height={80} tw="mx-auto" />

          <h2>{title}</h2>
        </div>
      </div>
    ),
    { width: 1200, height: 600 }
  );
};

// This route is fully dynamic hence there shouldn't be any static param
// available to ensure that the route is not statically generated
export const generateStaticParams = async () => [
  { locale: defaultLocale.code },
];

// We want to use `edge` runtime when using Vercel
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#runtime
export const runtime = VERCEL_ENV ? 'edge' : 'nodejs';

// In this case we want to catch-all possible requests. This ensures that we always generate and
// serve the OpenGrapgh images independently on the locale
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamicParams = true;

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = ENABLE_STATIC_EXPORT ? 'force-static' : 'auto';

// Ensures that this endpoint is invalidated and re-executed every X minutes
// so that when new deployments happen, the data is refreshed
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = VERCEL_REVALIDATE;
