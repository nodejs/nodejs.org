'use client';

import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Button from '@/components/Common/Button';
import WithFooter from '@/components/withFooter';
import WithNavBar from '@/components/withNavBar';

import styles from './layouts.module.css';

const NotFoundLayout: FC = () => {
  const t = useTranslations();

  return (
    <>
      <WithNavBar />

      <div className={styles.notFoundLayout}>
        <div className="glowingBackdrop" />

        <main>
          <span>404</span>
          <h1>{t('layouts.notFound.title')}</h1>
          <h2>{t('layouts.notFound.description')}</h2>
          <Button href="/">
            {t('layouts.notFound.backToHome')}
            <ArrowRightIcon />
          </Button>
        </main>
      </div>

      <WithFooter />
    </>
  );
};

export default NotFoundLayout;
