'use client';

import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { FC } from 'react';

import Button from '@/components/Common/Button';
import GlowingBackdropLayout from '@/layouts/GlowingBackdrop';

const NotFoundPage: FC = () => {
  const t = useTranslations();

  return (
    <GlowingBackdropLayout kind="default">
      404
      <h1 className="special -mt-4 text-center">
        {t('layouts.error.notFound.title')}
      </h1>
      <div className="my-4 flex h-[150px] items-center justify-center md:h-[300px]">
        <div className="turtle motion-safe:animate-surf motion-reduce:animate-none">
          <Image
            src="/static/images/node-mascot.svg"
            alt="The Node.js mascot"
            height={114.69}
            width={100}
          />
        </div>
      </div>
      <p className="-mt-4 max-w-sm text-center text-lg">
        {t('layouts.error.notFound.description')}
      </p>
      <Button href="/">
        {t('layouts.error.backToHome')}
        <ArrowRightIcon />
      </Button>
    </GlowingBackdropLayout>
  );
};

export default NotFoundPage;
