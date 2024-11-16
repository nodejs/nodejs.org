'use client';

import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

import Button from '@/components/Common/Button';
import NavBar from '@/components/Containers/NavBar';
import WithBanner from '@/components/withBanner';
import { useSiteNavigation } from '@/hooks';
import { useRouter, usePathname } from '@/navigation.mjs';
import { availableLocales } from '@/next.locales.mjs';

const WithNavBar: FC = () => {
  const { navigationItems } = useSiteNavigation();
  const { resolvedTheme, setTheme } = useTheme();
  const { replace } = useRouter();
  const pathname = usePathname();

  const locale = useLocale();

  const toggleCurrentTheme = () =>
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  return (
    <div>
      <Button
        className={
          '!fixed left-0 m-3 -translate-y-16 p-3 !transition focus:translate-y-0'
        }
        href="#main-content"
      >
        Skip Navigation
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
      <a id="main-content" />
    </div>
  );
};

export default WithNavBar;
