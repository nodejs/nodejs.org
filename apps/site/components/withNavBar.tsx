'use client';

import classNames from 'classnames';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

import NavBar from '@/components/Containers/NavBar';
import WithBanner from '@/components/withBanner';
import { useSiteNavigation } from '@/hooks';
import { useRouter, usePathname } from '@/navigation.mjs';
import { availableLocales } from '@/next.locales.mjs';

import Button from './Common/Button';

const WithNavBar: FC = () => {
  const { navigationItems } = useSiteNavigation();
  const { resolvedTheme, setTheme } = useTheme();
  const { replace } = useRouter();
  const pathname = usePathname();

  const skipToContent = classNames(
    'absolute left-0 top-0 m-3 -translate-y-16 bg-blue-500 p-3 transition-transform focus:translate-y-0 focus:outline-none'
  );

  const locale = useLocale();
  const t = useTranslations();

  const toggleCurrentTheme = () =>
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  return (
    <div>
      <Button className={skipToContent} href="#main">
        {t('components.containers.navBar.links.skipToContent')}
      </Button>

      <WithBanner section="index" />

      <NavBar
        onThemeTogglerClick={toggleCurrentTheme}
        languages={{
          currentLanguage: locale,
          availableLanguages: availableLocales,
          onChange: locale => replace(pathname!, { locale: locale.code }),
        }}
        navItems={navigationItems.map(([, { label, link, target }]) => ({
          link,
          text: label,
          target,
        }))}
      />
    </div>
  );
};

export default WithNavBar;
