'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import NotFoundLayout from '@/layouts/New/NotFound';
import { ENABLE_WEBSITE_REDESIGN } from '@/next.constants.mjs';

/** @deprecated remove when website redesign is done */
const LocalizedNotFound: FC = () => {
  const t = useTranslations();

  return (
    <div className="container">
      <h2>{t('pages.404.title')}</h2>
      <h3>{t('pages.404.description')}</h3>
    </div>
  );
};

export default ENABLE_WEBSITE_REDESIGN ? NotFoundLayout : LocalizedNotFound;
