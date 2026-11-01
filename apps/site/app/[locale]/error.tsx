'use client';

import GlowingBackdrop from '@node-core/ui-components/Common/GlowingBackdrop';
import { useTranslations } from 'next-intl';

import Button from '#site/components/Common/Button';
import styles from '#site/layouts/layouts.module.css';

import type { FC } from 'react';

const ErrorPage: FC<{ error: Error }> = () => {
  const t = useTranslations();

  return (
    <div className={styles.centeredLayout}>
      <GlowingBackdrop />

      <main id="main" tabIndex={-1}>
        <span>500</span>

        <h1 className="special -mt-4 text-center">
          {t('layouts.error.internalServerError.title')}
        </h1>

        <p className="-mt-4 max-w-sm text-center text-lg">
          {t('layouts.error.internalServerError.description')}
        </p>

        <Button href="/">{t('layouts.error.backToHome')}</Button>
      </main>
    </div>
  );
};

export default ErrorPage;
