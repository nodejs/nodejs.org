import NavItem from '@node-core/ui-components/Containers/NavBar/NavItem';
import { useTranslations } from 'next-intl';

import Link from '#site/components/Link';

import type { FC } from 'react';

type LegalProps = {
  footerLinks: Array<{
    text: string;
    link: string;
    translation: string;
  }>;
};

/**
 * These keys match the following locations, and are kept in sync to lessen duplication:
 * - translation keys within [locale].json components.containers.footer.links
 * - keys within the large [locale].json components.containers.footer.legal paragraph
 * - used directly to find the passed links from navigation.footerLinks
 */
const RICH_TRANSLATION_KEYS = [
  'foundationName',
  'trademarkPolicy',
  'trademarkList',
  'termsOfUse',
  'privacyPolicy',
  'bylaws',
  'codeOfConduct',
  'cookiePolicy',
];

const WithLegal: FC<LegalProps> = ({ footerLinks }) => {
  const t = useTranslations();

  /**
   * Takes the footerLinks from navigation constants and returns the link based on the final part of the translation key.
   *
   * Example:     {
      "link": "https://openjsf.org/",
      "text": "components.containers.footer.links.foundationName"
    },
   *
   *
   * @param key the final part of a translation string
   * @returns the link URL matching the translation key
   */
  const getLinkFromTranslationKey = (key: string) => {
    return footerLinks.find(link => link.text.split('.').pop() === key)?.link;
  };

  const richComponents = RICH_TRANSLATION_KEYS.reduce(
    (acc, key) => {
      acc[key] = (chunks: React.ReactNode) => (
        <Link href={getLinkFromTranslationKey(key)}>{chunks}</Link>
      );
      return acc;
    },
    {} as Record<string, (text: React.ReactNode) => React.ReactNode>
  );

  return (
    <>
      <p>{t.rich('components.containers.footer.legal', richComponents)}</p>

      <p>
        {footerLinks.map(link => (
          <NavItem
            key={link.link}
            type="footer"
            href={link.link}
            as={Link}
            pathname={'/'}
          >
            {link.translation}
          </NavItem>
        ))}
      </p>
    </>
  );
};

export default WithLegal;
