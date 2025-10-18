'use server';

import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { getTranslations } from 'next-intl/server';
import type { FC } from 'react';

import Button from '#site/components/Common/Button';
import Turtle from '#site/components/Common/Turtle';
import GlowingBackdropLayout from '#site/layouts/GlowingBackdrop';

const NotFoundPage: FC = async () => {
  const t = await getTranslations();

  return (
    <GlowingBackdropLayout kind="default">
      <span>404</span>

      <h1 className="special -mt-4 text-center">
        {t('layouts.error.notFound.title')}
      </h1>

      <div className="my-4 flex h-[150px] items-center justify-center md:h-[300px]">
        <Turtle />
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
