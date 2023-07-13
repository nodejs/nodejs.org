import { FormattedMessage } from 'react-intl';
import Image from 'next/image';
import { FaGithub } from 'react-icons/fa';
import LocalizedLink from '@/components/LocalizedLink';
import ActiveLocalizedLink from '@/components/Common/ActiveLocalizedLink';
import DarkModeToggle from '@/components/Common/DarkModeToggle';
import LanguageSelector from '@/components/Common/LanguageSelector';
import type { FC } from 'react';

import styles from './index.module.scss';

const Header: FC = () => (
  <nav aria-label="Primary" className={styles.header}>
    <div className={styles.container}>
      <div className={styles.startWrapper}>
        <LocalizedLink href="/" aria-label="Homepage">
          <div className={styles.logo}>
            <div>
              <Image
                src="static/images/logo-light.svg"
                alt="light-logo"
                className="light-mode-only"
                width="111"
                height="33"
              />
            </div>
            <div>
              <Image
                src="static/images/logo.svg"
                alt="dark-logo"
                className="dark-mode-only"
                width="111"
                height="33"
              />
            </div>
          </div>
        </LocalizedLink>
      </div>

      <ul className={styles.tabs}>
        <li>
          <ActiveLocalizedLink href="/learn" activeClassName={styles.active}>
            <FormattedMessage id="components.sections.newHeader.links.learn" />
          </ActiveLocalizedLink>
        </li>
        <li>
          <ActiveLocalizedLink href="/download" activeClassName={styles.active}>
            <FormattedMessage id="components.sections.newHeader.links.download" />
          </ActiveLocalizedLink>
        </li>
        <li>
          <ActiveLocalizedLink href="/docs" activeClassName={styles.active}>
            <FormattedMessage id="components.sections.newHeader.links.apiDocs" />
          </ActiveLocalizedLink>
        </li>
        <li>
          <ActiveLocalizedLink href="/about" activeClassName={styles.active}>
            <FormattedMessage id="components.sections.newHeader.links.about" />
          </ActiveLocalizedLink>
        </li>
        <li>
          <a href="https://openjsf.org/certification/">
            <FormattedMessage id="components.sections.newHeader.links.certification" />
          </a>
        </li>
      </ul>

      <div className={styles.endWrapper}>
        <ul className={styles.rightContainer}>
          <li>
            <DarkModeToggle />
          </li>
          <li>
            <LanguageSelector />
          </li>
          <li>
            <a
              target="_blank"
              href="https://github.com/nodejs/nodejs.org"
              rel="noopener noreferrer"
              aria-label="Nodejs.org Github Page (opens in new tab)"
            >
              <FaGithub />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;
