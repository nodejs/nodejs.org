import { useTranslations } from 'next-intl';
import type { FC } from 'react';

const NotFound: FC = () => {
  const t = useTranslations();

  return (
    <div className="container">
      <h2>{t('pages.404.title')}</h2>
      <h3>{t('pages.404.description')}</h3>
    </div>
  );
};

// This is a fallback Not Found Page that in theory should never be requested
export const dynamic = 'force-dynamic';

export default NotFound;
