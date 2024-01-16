'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Button from '@/components/Common/Button';
import CenteredLayout from '@/layouts/New/Centered';
import { ENABLE_WEBSITE_REDESIGN } from '@/next.constants.mjs';

/** @deprecated remove legacy component when website redesign is done */
const LegacyNotFound: FC = () => {
  const t = useTranslations();

  return (
    <div className="container">
      <h2>{t('pages.404.title')}</h2>
      <h3>{t('pages.404.description')}</h3>
    </div>
  );
};

const NotFound: FC = async () => {
  const t = useTranslations();

  return (
    <CenteredLayout>
      <div className="glowingBackdrop" />

      <main>
        404
        <h1 className="special -mt-4">{t('layouts.notFound.title')}</h1>
        <p className="-mt-4 max-w-sm text-center text-lg">
          {t('layouts.notFound.description')}
        </p>
        <Button href="/">{t('layouts.notFound.backToHome')}</Button>
      </main>
    </CenteredLayout>
  );
};

export default ENABLE_WEBSITE_REDESIGN ? NotFound : LegacyNotFound;
