'use client';

import LanguageDropdown from '@node-core/ui-components/Common/LanguageDropDown';
import ThemeToggle from '@node-core/ui-components/Common/ThemeToggle';
import NavBar from '@node-core/ui-components/Containers/NavBar';
// TODO(@RedYetiDev): I don't like that we are importing styles from another module
import styles from '@node-core/ui-components/Containers/NavBar/index.module.css';
import GitHubIcon from '@node-core/ui-components/Icons/Social/GitHub';
import type { SimpleLocaleConfig } from '@node-core/ui-components/types';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

import SearchButton from '@/components/Common/Search';
import Link from '@/components/Link';
import WithBanner from '@/components/withBanner';
import WithNodejsLogo from '@/components/withNodejsLogo';
import { useSiteNavigation } from '@/hooks';
import { useRouter, usePathname } from '@/navigation.mjs';
import { availableLocales } from '@/next.locales.mjs';

const WithNavBar: FC = () => {
  const { navigationItems } = useSiteNavigation();
  const { resolvedTheme, setTheme } = useTheme();
  const { replace } = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const locale = useLocale();

  const toggleCurrentTheme = () =>
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  const changeLanguage = (locale: SimpleLocaleConfig) =>
    replace(pathname!, { locale: locale.code });

  return (
    <div>
      <WithBanner section="index" />

      <NavBar
        navItems={navigationItems.map(([, { label, link, target }]) => ({
          link,
          text: label,
          target,
        }))}
        pathname={pathname}
        LinkWrapper={Link}
        Logo={WithNodejsLogo}
      >
        <SearchButton />

        <ThemeToggle
          onClick={toggleCurrentTheme}
          ariaLabel={t('components.common.themeToggle.label')}
        />

        <LanguageDropdown
          onChange={changeLanguage}
          availableLanguages={availableLocales}
          currentLanguage={locale}
          ariaLabel={t('components.common.languageDropdown.label')}
        />

        <Link
          href="https://github.com/nodejs/node"
          aria-label="Node.js Github"
          className={styles.ghIconWrapper}
        >
          <GitHubIcon />
        </Link>
      </NavBar>
    </div>
  );
};

export default WithNavBar;
