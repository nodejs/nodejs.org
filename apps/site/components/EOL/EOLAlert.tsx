import AlertBox from '@node-core/ui-components/Common/AlertBox';
import { useTranslations } from 'next-intl';

import Link from '#site/components/Link';

const EOLAlert = () => {
  const t = useTranslations();
  return (
    <AlertBox level="warning">
      {t.rich('components.eolAlert.message', {
        link: text => <Link href="/about/eol">{text}</Link>,
      })}
    </AlertBox>
  );
};

export default EOLAlert;
