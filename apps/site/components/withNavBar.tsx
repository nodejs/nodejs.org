'use client';

import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import type { FC, KeyboardEvent } from 'react';
import { useState } from 'react';

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
  const [tabPressed, setTabPressed] = useState(false);

  const locale = useLocale();

  const toggleCurrentTheme = () =>
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  const handleTabPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab') {
      setTabPressed(prev => !prev);
    }
  };

  return (
    <div onKeyDown={handleTabPress}>
      <Button
        className="${tabPressed ? 'translate-y-0' : '-translate-y-16' !fixed left-0 m-3 -translate-y-16 p-3 transition-all focus:translate-y-0"
        aria-hidden={!tabPressed}
        href="#main"
      >
        Skip to main content
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
