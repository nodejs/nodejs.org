import dynamic from 'next/dynamic';
import { useLocale } from '../hooks/useLocale';

const NotFoundPage = () => {
  const { currentLocale } = useLocale();

  const LocalisedNotFoundComponent = dynamic(
    () => import(`../pages/${currentLocale.code}/404.md`)
  );

  return <LocalisedNotFoundComponent />;
};

export default NotFoundPage;
