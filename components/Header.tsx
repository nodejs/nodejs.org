import { useIntl } from 'react-intl';
import Image from 'next/image';
import classNames from 'classnames';

import LocalisedLink from './LocalisedLink';
import { useLocale } from '../hooks/useLocale';
import { useNavigation } from '../hooks/useNavigation';
import { useRouter } from 'next/router';

const Header = () => {
  const { availableLocales, isCurrentLocaleRoute } = useLocale();
  const { navigationItems } = useNavigation();
  const { formatMessage } = useIntl();
  const { asPath } = useRouter();

  const getLinkClassName = (href: string) =>
    classNames({ active: isCurrentLocaleRoute(href, href !== '/') });

  const toggleLanguage = formatMessage({
    id: 'componets.header.buttons.toggleLanguage',
  });

  const toggleDarkMode = formatMessage({
    id: 'components.header.buttons.toggleDarkMode',
  });

  const currentRouteLocalized = (locale: string) =>
    asPath.replace(/^\/[a-zA-Z-]+/, `/${locale}`);

  return (
    <header aria-label="Primary">
      <div className="container">
        <LocalisedLink href="/" className="logo">
          <Image
            priority
            width="111"
            height="33"
            src="/static/images/logo.svg"
            alt="Node.js"
          />
        </LocalisedLink>

        <nav aria-label="primary">
          <ul className="list-divider-pipe">
            {navigationItems.map((item, key) => (
              <li key={key} className={getLinkClassName(item.link)}>
                <LocalisedLink href={item.link}>{item.text}</LocalisedLink>
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
          />

          <button
            className="lang-picker-toggler"
            type="button"
            title={toggleLanguage}
            aria-label={toggleLanguage}
            aria-controls="lang-picker"
            aria-expanded="false"
          />
        </div>

        <ul id="lang-picker" className="lang-picker hidden">
          {availableLocales.map(locale => (
            <li key={locale.code}>
              <a
                data-lang={locale.code}
                title={locale.name}
                href={currentRouteLocalized(locale.code)}
              >
                {locale.localName}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
