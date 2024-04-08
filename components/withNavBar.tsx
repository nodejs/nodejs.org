'use client';

import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

import NavBar from '@/components/Containers/NavBar';
import WithBanner from '@/components/withBanner';
import { useSiteNavigation } from '@/hooks';
import { usePathname, useRouter } from '@/navigation.mjs';
import { availableLocales } from '@/next.locales.mjs';

const WithNavBar: FC = () => {
  const { navigationItems } = useSiteNavigation();
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const { replace } = useRouter();

  const locale = useLocale();

  const toggleCurrentTheme = () =>
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  return (
    <>
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
    </>
  );
};

export default WithNavBar;
