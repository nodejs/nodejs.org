'use client';

import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Button from '@/components/Common/Button';
import GlowingBackdrop from '@/components/Common/GlowingBackdrop';
import CenteredLayout from '@/layouts/Centered';

const NotFoundPage: FC = () => {
  const t = useTranslations();

  return (
    <CenteredLayout>
      <GlowingBackdrop />

      <main>
        404
        <h1 className="special -mt-4">{t('layouts.error.notFound.title')}</h1>
        <div className="my-4 flex items-center justify-center">
          <Image
            src="/static/images/node-mascot.svg"
            alt="The Node.js mascot"
            height={114.69}
            width={100}
          />
        </div>
        <p className="-mt-4 max-w-sm text-center text-lg">
          {t('layouts.error.notFound.description')}
        </p>
        <Button href="/">
          {t('layouts.error.backToHome')}
          <ArrowRightIcon />
        </Button>
      </main>
    </CenteredLayout>
  );
};

export default NotFoundPage;
