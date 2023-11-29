'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';

const LocalizedNotFound: FC = () => {
  const t = useTranslations();

  return (
    <div className="container">
      <h2>{t('pages.404.title')}</h2>
      <h3>{t('pages.404.description')}</h3>
    </div>
  );
};

export default LocalizedNotFound;
