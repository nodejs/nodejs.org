import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

import LanguageDropdown from '@/components/Common/LanguageDropDown';
import ThemeToggle from '@/components/Common/ThemeToggle';
import NavItem from '@/components/sections/NavItem';
import { useLocale } from '@/hooks/useLocale';
import { useNavigation } from '@/hooks/useNavigation';

import style from './index.module.css';

const Navbar: React.FC = () => {
  const { newNavigationItems } = useNavigation();
  const { availableLocales, currentLocale } = useLocale();
  const { theme, setTheme } = useTheme();

  const GHLogoSrc = `/static/images/logos/social-github${
    theme === 'light' ? '-dark' : ''
  }.svg`;

  const NodeLogoSrc = `/static/images/logos/horizontal${
    theme === 'light' ? '-dark' : '-light'
  }.svg`;

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
        <Image height={24} width={80} src={NodeLogoSrc} alt="Node.js" />
        <div className={style.navItems}>
          {newNavigationItems.map(({ text, link, key }) => (
            <NavItem key={key} href={link}>
              {text}
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
        <AccessibleIcon.Root label={'Nodejs.org Github'}>
          <button className={style.iconWrapper}>
            <a href="https://github.com/nodejs/node">
              <Image alt="Github Icon" width={20} height={20} src={GHLogoSrc} />
            </a>
          </button>
        </AccessibleIcon.Root>
      </div>
    </nav>
  );
};

export default Navbar;
