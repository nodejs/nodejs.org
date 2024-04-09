'use client';

import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

import { STORYBOOK_MODE_THEME } from '@/.storybook/constants';
import NavBar from '@/components/Containers/NavBar';
import WithBanner from '@/components/withBanner';
import { useClientContext, useSiteNavigation } from '@/hooks';
import { useRouter } from '@/navigation.mjs';
import { availableLocales } from '@/next.locales.mjs';

const WithNavBar: FC = () => {
  const { navigationItems } = useSiteNavigation();
  const { resolvedTheme, setTheme } = useTheme();
  const { pathname } = useClientContext();
  const { replace } = useRouter();

  const locale = useLocale();

  const toggleCurrentTheme = () =>
    setTheme(
      resolvedTheme === STORYBOOK_MODE_THEME.dark
        ? STORYBOOK_MODE_THEME.light
        : STORYBOOK_MODE_THEME.dark
    );

  return (
    <div>
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
