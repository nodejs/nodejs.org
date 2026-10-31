'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import useMediaQuery from '#site/hooks/useMediaQuery';
import {
  CARBON_ADS_COUNT_IMPRESSIONS,
  CARBON_ADS_URL,
} from '#site/next.constants.mjs';

import type { CSSProperties } from 'react';

export type CarbonAd = Record<string, string>;

export const adColors = (ad: CarbonAd) =>
  ({
    '--ad-bg': ad.backgroundColor,
    '--ad-bg-dark': ad.backgroundColorDark ?? ad.backgroundColor,
    '--ad-text': ad.textColor,
    '--ad-text-dark': ad.textColorDark ?? ad.textColor,
    '--ad-cta-bg': ad.ctaBackgroundColor,
    '--ad-cta-bg-dark': ad.ctaBackgroundColorDark ?? ad.ctaBackgroundColor,
    '--ad-cta-text': ad.ctaTextColor,
    '--ad-cta-text-dark': ad.ctaTextColorDark ?? ad.ctaTextColor,
  }) as CSSProperties;

const useCarbonAd = (zone: string, media?: string) => {
  const [ad, setAd] = useState<CarbonAd | null>(null);
  const ref = useRef<HTMLElement>(null);
  // Layouts persist across navigations, so refetch per page
  const pathname = usePathname();
  const matches = useMediaQuery(media ?? 'all');

  useEffect(() => {
    if (!matches) {
      return;
    }

    const controller = new AbortController();
    const url = new URL(`${zone}.json`, CARBON_ADS_URL);

    if (!CARBON_ADS_COUNT_IMPRESSIONS) {
      url.searchParams.set('ignore', 'yes');
    }

    fetch(url, { signal: controller.signal })
      .then(response => (response.ok ? response.json() : null))
      .then(data => data?.ads?.[0]?.statlink && setAd(data.ads[0]))
      .catch(() => {});

    return () => {
      controller.abort();
      setAd(null);
    };
  }, [zone, matches, pathname]);

  useEffect(() => {
    if (!ad?.statview || !ref.current) {
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      entries => {
        clearTimeout(timer);

        if (entries.at(-1)!.intersectionRatio >= 0.5) {
          timer = setTimeout(() => {
            new Image().src = ad.statview;
            observer.disconnect();
          }, 1000);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [ad]);

  return { ad, ref };
};

export default useCarbonAd;
