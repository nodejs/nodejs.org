import LanguageDropdown from '@node-core/ui-components/Common/LanguageDropDown';
import SkipToContentButton from '@node-core/ui-components/Common/SkipToContentButton';
import NavBarContainer from '@node-core/ui-components/Containers/NavBar';
// TODO(@AvivKeller): I don't like that we are importing styles from another module
import styles from '@node-core/ui-components/Containers/NavBar/index.module.css';
import GitHubIcon from '@node-core/ui-components/Icons/Social/GitHub';
import { availableLocales } from '@node-core/website-i18n';
import { getLocale, getTranslations } from 'next-intl/server';

import { getClientContext } from '#site/client-context';
import Link from '#site/components/Link';
import Search from '#site/components/Search';
import SiteLogo from '#site/components/SiteLogo';
import WebsiteBanner from '#site/components/WebsiteBanner';
import { getTopNavigation } from '#site/util/navigation';

import type { FC } from 'react';

import ThemeToggle from './ThemeToggle';

const NavBar: FC = async () => {
  const t = await getTranslations();
  const locale = await getLocale();
  const { pathname } = getClientContext();

  return (
    <div>
      <SkipToContentButton>
        {t('components.common.skipToContent')}
      </SkipToContentButton>

      <WebsiteBanner section="index" />

      <NavBarContainer
        navItems={getTopNavigation(t).map(
          ({ label, link, target, accent }) => ({
            link,
            text: label,
            target,
            accent,
          })
        )}
        pathname={pathname}
        as={Link}
        Logo={SiteLogo}
        sidebarItemTogglerAriaLabel={t(
          'components.containers.navBar.controls.toggle'
        )}
      >
        <Search />

        <ThemeToggle
          ariaLabel={t('components.header.buttons.theme')}
          themeLabels={{
            system: t('components.header.buttons.themeSystem'),
            light: t('components.header.buttons.themeLightMode'),
            dark: t('components.header.buttons.themeDarkMode'),
          }}
        />

        <LanguageDropdown
          href={pathname}
          as={Link}
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
      </NavBarContainer>
    </div>
  );
};

export default NavBar;
