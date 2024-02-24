/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';

import JsIconWhite from '@/components/Icons/Logos/JsIconWhite';
import tailwindConfig from '@/tailwind.config';

export const runtime = process.env.NEXT_PUBLIC_VERCEL_URL ? 'edge' : false;

const hexToRgba = (hex: string, alpha = 0.9) => {
  hex = hex.replace(/^#/, '');

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const GET = async (request: Request) => {
  try {
    const { searchParams, host, protocol } = new URL(request.url);

    // ?title=<title>
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : undefined;

    //?type=<type>
    const type = searchParams.get('type') ?? 'announcement';

    const typeAttributes: { [key: string]: string } = {
      announcement: tailwindConfig.theme.colors.green['700'],
      release: tailwindConfig.theme.colors.info['600'],
      vulnerability: tailwindConfig.theme.colors.warning['600'],
    };

    return new ImageResponse(
      (
        <div
          tw={`relative flex items-center justify-center bg-black
          `}
          style={{
            width: 1200,
            height: 630,
          }}
        >
          <img
            tw="absolute blur-3xl object-cover block"
            src={`${protocol}//${host}/static/images/patterns/hexagon-grid.svg`}
            alt="hexagon grid"
            style={{
              background: `radial-gradient(circle, ${hexToRgba(
                typeAttributes[type]
              )}, transparent)`,
            }}
          />
          <div tw="z-10 mx-auto flex max-w-xl flex-col gap-12 text-center text-3xl font-semibold text-white">
            <JsIconWhite width={71} height={80} tw="mx-auto" />
            <h2>{title}</h2>
          </div>
        </div>
      )
    );
  } catch (e) {
    console.log((e as Error).message);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
};
