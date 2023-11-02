import Image from 'next/image';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import { useMemo } from 'react';

import LanguageDropdown from '@/components/Common/LanguageDropDown';
import ThemeToggle from '@/components/Common/ThemeToggle';
import NavItem from '@/components/sections/NavItem';
import { useLocale } from '@/hooks/useLocale';

import style from './index.module.css';

type NavItem = { key: string; link: string };
type NavbarProps = { navItems: NavItem[] };

const Navbar: FC<NavbarProps> = ({ navItems }) => {
  const { availableLocales, currentLocale } = useLocale();
  const { theme, setTheme } = useTheme();

  const availableLanguages = useMemo(
    () =>
      availableLocales.map(locale => ({
        name: locale.name,
        code: locale.code,
      })),
    [availableLocales]
  );

  const currentLanguage = useMemo(
    () => ({
      name: currentLocale.name,
      code: currentLocale.code,
    }),
    [currentLocale]
  );

  return (
    <nav className={style.container}>
      <div className={style.leftItems}>
        <Image
          className="dark:hidden"
          height={24}
          width={80}
          src="/static/images/logos/horizontal-dark.svg"
          alt="Node.js"
        />
        <Image
          className="hidden dark:block"
          height={24}
          width={80}
          src="/static/images/logos/horizontal-light.svg"
          alt="Node.js"
        />
        <div className={style.navItems}>
          {navItems.map(({ key, link }) => (
            <NavItem key={key} href={link}>
              {key}
            </NavItem>
          ))}
        </div>
      </div>
      <div className={style.rightItems}>
        <ThemeToggle
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />
        <LanguageDropdown
          availableLanguages={availableLanguages}
          currentLanguage={currentLanguage}
        />
        <button className={style.iconWrapper} aria-label="Node.js Github">
          <a href="https://github.com/nodejs/node">
            <Image
              className="dark:hidden"
              alt="Github Icon"
              width={20}
              height={20}
              src="/static/images/logos/social-github-dark.svg"
            />
            <Image
              className="hidden dark:block"
              alt="Github Icon"
              width={20}
              height={20}
              src="/static/images/logos/social-github.svg"
            />
          </a>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
