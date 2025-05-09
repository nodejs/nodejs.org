import HexagonGrid from '@node-core/ui-components/Icons/HexagonGrid';
import JsWhiteIcon from '@node-core/ui-components/Icons/Logos/JsWhite';
import { ImageResponse } from 'next/og';

import { DEFAULT_CATEGORY_OG_TYPE } from '#site/next.constants.mjs';
import { defaultLocale } from '#site/next.locales.mjs';
import { hexToRGBA } from '#site/util/hexToRGBA';

// TODO: use CSS variables instead of absolute values
const CATEGORY_TO_THEME_COLOUR_MAP = {
  announcement: '#1a3f1d',
  release: '#0c7bb3',
  vulnerability: '#ae5f00',
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
          <JsWhiteIcon width={71} height={80} tw="mx-auto" />

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
