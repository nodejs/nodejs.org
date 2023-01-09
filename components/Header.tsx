import Head from 'next/head';
import { useSiteConfig } from '../hooks/useSiteConfig';

const Header = () => {
  const siteConfig = useSiteConfig();

  return (
    <Head>
      <title>{siteConfig.title}</title>
    </Head>
  );
};

export default Header;
