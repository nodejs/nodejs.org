'use client';

import { useTranslations } from 'next-intl';
import type { FC } from 'react';

const WSLMessage: FC = () => {
  const t = useTranslations();
  return (
    <>
      <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
        <h3 className="mb-2 text-lg font-semibold text-blue-800 dark:text-blue-200">
          {t('layouts.download.wsl.title')}
        </h3>
        <p className="text-blue-700 dark:text-blue-300">
          {t('layouts.download.wsl.description')}
        </p>
        <a
          href="https://docs.microsoft.com/en-us/windows/wsl/install"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-blue-600 hover:underline dark:text-blue-400"
        >
          {t('layouts.download.wsl.learnMore')}
        </a>
      </div>
    </>
  );
};
export default WSLMessage;
