import AlertBox from '@node-core/ui-components/Common/AlertBox';
import { useTranslations } from 'next-intl';

import Link from '#site/components/Link';

const EOLAlert = () => {
  const t = useTranslations('components.endOfLife');
  return (
    <AlertBox level="warning">
      {t('intro')}{' '}
      <Link href="/eol">
        OpenJS Ecosystem Sustainability Program {t('partner')} HeroDevs
      </Link>
    </AlertBox>
  );
};

export default EOLAlert;
