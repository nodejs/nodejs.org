import AlertBox from '@node-core/ui-components/Common/AlertBox';
import { useTranslations } from 'next-intl';

import Link from '#site/components/Link';

const EOLAlert = () => {
  const t = useTranslations();
  return (
    <AlertBox level="warning">
      {t('components.eolAlert.intro')}{' '}
      <Link href="/eol">
        OpenJS Ecosystem Sustainability Program{' '}
        {t('components.eolAlert.partner')} HeroDevs
      </Link>
    </AlertBox>
  );
};

export default EOLAlert;
