'use client';

import classNames from 'classnames';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useState } from 'react';

import { useIsCurrentPathname, useSiteNavigation } from '@/hooks';
import { Link, usePathname } from '@/navigation.mjs';
import { BASE_PATH } from '@/next.constants.mjs';
import { availableLocales } from '@/next.locales.mjs';

const Header = () => {
  const { navigationItems } = useSiteNavigation();
  const { isCurrentLocaleRoute } = useIsCurrentPathname();
  const [showLangPicker, setShowLangPicker] = useState(false);
  const { theme, setTheme } = useTheme();

  const pathname = usePathname();
  const t = useTranslations();

  const getLinkClassName = (href: string) =>
    classNames({ active: isCurrentLocaleRoute(href, href !== '/') });

  const toggleLanguage = t('components.header.buttons.toggleLanguage');
  const toggleDarkMode = t('components.header.buttons.toggleDarkMode');

  return (
    <header aria-label="Primary">
      <div className="container">
        <Link href="/" className="logo">
          <Image
            priority
            width="111"
            height="33"
            src={`${BASE_PATH}/static/images/logo.svg`}
            alt="Node.js"
          />
        </Link>

        <nav aria-label="primary">
          <ul className="list-divider-pipe">
            {navigationItems.map((item, key) => (
              <li key={key} className={getLinkClassName(item.link)}>
                <Link href={item.link}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="switchers">
          <button
            className="dark-theme-switcher"
            type="button"
            title={toggleDarkMode}
            aria-label={toggleDarkMode}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Image
              priority
              width="28"
              height="28"
              className="dark-image"
              src={`${BASE_PATH}/static/images/light-mode.svg`}
              alt="Dark Theme Switcher"
            />

            <Image
              priority
              width="28"
              height="28"
              className="light-image"
              src={`${BASE_PATH}/static/images/dark-mode.svg`}
              alt="Dark Theme Switcher"
            />
          </button>

          <button
            className="lang-picker-toggler"
            type="button"
            title={toggleLanguage}
            aria-label={toggleLanguage}
            onClick={() => setShowLangPicker(!showLangPicker)}
            aria-controls="lang-picker"
            aria-expanded="false"
          >
            <Image
              priority
              width="25"
              height="28"
              src={`${BASE_PATH}/static/images/language-picker.svg`}
              alt="Language Switcher"
            />
          </button>
        </div>

        {showLangPicker && (
          <ul className="lang-picker">
            {availableLocales.map(locale => (
              <li key={locale.code}>
                <Link
                  title={locale.name}
                  locale={locale.code}
                  href={pathname}
                  onClick={() => setShowLangPicker(false)}
                >
                  {locale.localName}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
