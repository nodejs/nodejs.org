import { ImageResponse } from 'next/og';

import HexagonGrid from '@/components/Icons/HexagonGrid';
import JsIconWhite from '@/components/Icons/Logos/JsIconWhite';
import { DEFAULT_CATEGORY_OG_TYPE } from '@/next.constants.mjs';
import { defaultLocale } from '@/next.locales.mjs';
import tailwindConfig from '@/tailwind.config';
import { hexToRGBA } from '@/util/hexToRGBA';

const CATEGORY_TO_THEME_COLOUR_MAP = {
  announcement: tailwindConfig.theme.colors.green['700'],
  release: tailwindConfig.theme.colors.info['600'],
  vulnerability: tailwindConfig.theme.colors.warning['600'],
};

type Category = keyof typeof CATEGORY_TO_THEME_COLOUR_MAP;

type DynamicStaticPaths = { locale: string; category: Category; title: string };
type StaticParams = { params: Promise<DynamicStaticPaths> };

// This is the Route Handler for the `GET` method which handles the request
// for generating OpenGraph images for Blog Posts and Pages
// @see https://nextjs.org/docs/app/building-your-application/routing/router-handlers
export const GET = async (_: Request, props: StaticParams) => {
  const params = await props.params;

  const categoryColour =
    params.category in CATEGORY_TO_THEME_COLOUR_MAP
      ? CATEGORY_TO_THEME_COLOUR_MAP[params.category]
      : CATEGORY_TO_THEME_COLOUR_MAP[DEFAULT_CATEGORY_OG_TYPE];

  const gridBackground = `radial-gradient(circle, ${hexToRGBA(categoryColour)}, transparent)`;

  return new ImageResponse(
    (
      <div tw="relative flex items-center justify-center bg-black w-[1200px] h-[600px]">
        <HexagonGrid style={{ background: gridBackground }} />

        <div tw="absolute mx-auto flex max-w-xl flex-col text-center text-3xl font-semibold text-white">
          <JsIconWhite width={71} height={80} tw="mx-auto" />

          <h2>{params.title.slice(0, 100)}</h2>
        </div>
      </div>
    ),
    { width: 1200, height: 600 }
  );
};

// This function generates the static paths that come from the dynamic segments
// `[locale]/next-data/og/[category]/[title]` this will return a default value as we don't want to
// statically generate this route as it is compute-expensive.
// Hence we generate a "fake" OG image during build just to satisfy Next.js requirements.
export const generateStaticParams = async () => [
  {
    locale: defaultLocale.code,
    category: 'announcement',
    title: 'Run JavaScript Everywhere',
  },
];

// Enforces that this route is cached and static as much as possible
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = 'force-static';
